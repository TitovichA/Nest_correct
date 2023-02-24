import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
const publicPath = './public/';
let path = publicPath;

interface DiskStorageOptionsCb {
  (error: Error | null, destination: string): void;
}

export class HelperFileLoader {
  set path(_path: string) {
    path = publicPath + _path;
  }
  public customFileName(
    req: Request,
    file: Express.Multer.File,
    cb: DiskStorageOptionsCb,
  ) {
    const originalName = file.originalname.split('.');
    const fileExtension = originalName[originalName.length - 1];
    cb(null, `${uuidv4()}.${fileExtension}`);
  }
  public destinationPath(
    req: Request,
    file: Express.Multer.File,
    cb: DiskStorageOptionsCb,
  ) {
    console.log('path:', path);

    cb(null, path);
  }
}

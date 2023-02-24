import {
  Res,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { newsTemplate } from '../../views_data/news';
import { DecrementId } from '../../utils/decrement-id.decorator';
import { NewsDTO } from '../dto/news.dto';
import { NewsService } from '../modules/news/news.service';
import { newsDetail } from '../../views_data/news-detail';
import { drawDocument } from '../../views_data/dcument';
import { NewsIdDto } from '../dto/news-id.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from '../../utils/HelperFileLoader';
import { LoggingInterceptor } from '../modules/logger/logger.interceptor';

const PATH_NEWS = 'news-static/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('create')
  @UseInterceptors(
    LoggingInterceptor,
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    }),
  )
  async createNews(
    @Body() data: NewsDTO,
    @UploadedFile() cover: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    let msg = '';
    let status = 200;
    try {
      let coverPath = '';
      if (cover?.filename?.length > 0) {
        coverPath = PATH_NEWS + cover.filename;
      }

      await this.newsService.createNews({ ...data, cover: coverPath });
      msg = 'Successfully created';
    } catch (e) {
      msg = (<any>e).detail;
      status = 500;
    }
    res.status(status).send(msg);
  }

  @Post('update')
  async updateNews(@Body() data: NewsDTO, @Res() res: Response): Promise<void> {
    let msg = '';
    let status = 200;
    try {
      msg = await this.newsService.updateNews(data);
    } catch (e) {
      msg = (<any>e).message;
      status = 500;
    }
    res.status(status).send(msg);
  }

  @Get('/')
  async getNewsAll(): Promise<string> {
    const news = await this.newsService.getNewsAll();
    return drawDocument(newsTemplate(news));
  }

  @Get('get-one')
  async getNewsOne(
    @Query() @DecrementId(['id']) query: NewsIdDto,
  ): Promise<string> {
    const news = await this.newsService.getNews(query.id);
    return drawDocument(newsDetail(news));
  }

  @Delete('delete')
  async deleteNewsOne(@Body() body: NewsIdDto): Promise<NewsDTO[]> {
    return this.newsService.deleteNews(body.id);
  }
}

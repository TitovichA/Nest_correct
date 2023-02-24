import {
  Res,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Render,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from '../modules/news/news.service';
import { NewsIdDto, NewsUpdateDto } from '../dto/news-id.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from '../../utils/HelperFileLoader';
import { LoggingInterceptor } from '../modules/logger/logger.interceptor';
import { NewsEntity } from '../database/entities/news.entity';

const PATH_NEWS = 'news-static/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('create') // if exist id - update
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
    @Body() data: NewsUpdateDto,
    @UploadedFile() cover: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    const _newsEntity = { ...new NewsEntity(), ...data };
    let msg = '';
    let status = 200;
    try {
      if (cover?.filename?.length > 0) {
        _newsEntity.cover = PATH_NEWS + cover.filename;
      }

      await this.newsService.create(_newsEntity);
      msg = 'Successfully created';
    } catch (e) {
      msg = (<any>e).detail;
      status = 500;
    }
    res.status(status).send(msg);
  }

  @Get('/')
  async getNewsAll(@Res() res: Response): Promise<void> {
    const news = await this.newsService.findAll();
    res.render('news-list', { layout: 'index', news: news });
  }

  @Get('get-one')
  async getNewsOne(
    @Query() query: NewsIdDto,
    @Res() res: Response,
  ): Promise<void> {
    const news = await this.newsService.findByIdWithAll(query.id);
    res.render('news-one', { layout: 'index', news: news });
  }

  @Delete('delete')
  async deleteNews(@Body() body: NewsIdDto): Promise<NewsEntity | undefined> {
    return this.newsService.remove(body.id);
  }
}

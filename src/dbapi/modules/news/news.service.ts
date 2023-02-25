import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { NewsEntity } from '../../../dbapi/database/entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async findAll(): Promise<NewsEntity[]> {
    return await this.newsRepository.find({});
  }

  async create(news: NewsEntity) {
    let old = news.id && (await this.findById(Number(news.id)));
    if (old) {
      old.title = news.title;
      old.description = news.description;
      old.cover = news.cover;
    } else {
      old = { ...news };
    }
    return await this.newsRepository.save(old);
  }

  async saveFile(path: string, data: Buffer) {
    fs.writeFile(path, data, (error) => {
      if (error) throw new Error(error.message);
    });
  }

  async findById(id: number): Promise<NewsEntity | undefined> {
    return await this.newsRepository.findOne({ where: { id: id } });
  }

  async findByIdWithAll(id: number): Promise<NewsEntity | undefined> {
    return await this.newsRepository.findOne({
      where: { id: Number(id) },
      relations: ['comments'],
    });
  }

  async remove(id: number) {
    let out;
    const _news = await this.findById(id);
    if (_news) {
      out = await this.newsRepository.remove(_news);
    }
    return out;
  }
}

import { Injectable } from '@nestjs/common';
import { NewsDTO } from 'src/api/dto/news.dto';
import * as fs from 'fs';

const news: NewsDTO[] = [
  {
    id: 1,
    name: 'fitst',
    description: 'first description',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod perferendis corrupti nostrum nisi, eum reprehenderit temporibus porro tempora repellat. Dolor nemo rem recusandae sit at earum atque temporibus pariatur quibusdam.',
    cover: '',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        id: 1,
        text: 'comment',
        createdAt: new Date(Date.now()),
      },
      {
        id: 2,
        text: 'second comment',
        createdAt: new Date(Date.now()),
      },
    ],
  },
  {
    id: 2,
    name: 'Second',
    description: 'Second description',
    cover: '',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod perferendis corrupti nostrum nisi, eum reprehenderit temporibus porro tempora repellat. Dolor nemo rem recusandae sit at earum atque temporibus pariatur quibusdam.',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [],
  },
];

@Injectable()
export class NewsService {
  async getNewsAll(): Promise<NewsDTO[]> {
    return news;
  }

  async saveFile(path: string, data: Buffer) {
    fs.writeFile(path, data, (error) => {
      if (error) throw new Error(error.message);
    });
  }

  async getNews(id: number): Promise<NewsDTO> {
    return news[id];
  }

  async createNews(data: NewsDTO): Promise<NewsDTO> {
    news.push(data);
    news[news.length - 1].id = news.length;
    return data;
  }

  async updateNews(data: NewsDTO): Promise<string> {
    const n = news.findIndex((el) => el.id === data.id);

    if (n >= 0) {
      news[n] = {
        ...news[n],
        ...data,
      };
    } else {
      throw new Error('News not exist');
    }

    return 'Successfully updated';
  }

  async deleteNews(id: number): Promise<NewsDTO[]> {
    const n = news.findIndex((el) => el.id === id);
    if (n >= 0) return news.splice(n, 1);
    else throw new Error('News not found');
  }
}

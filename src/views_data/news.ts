import { NewsDTO } from '../api/dto/news.dto';

export const newsTemplate = (news: NewsDTO[]): string => {
  if (news.length === 0) {
    return emptyNews();
  }
  let html = '<div class="row">';
  for (const newsItem of news) {
    html += `   
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">${newsItem.name}</h3>
            <div class="card-subtitle mb-2 text-muted">
                Описание: ${newsItem.description}
            </div>
            <div class="card-subtitle mb-2 text-muted">
                Дата создания: ${newsItem.createdAt}
            </div>
            <a href="http://localhost:3000/news/get-one?id=${newsItem.id}">detail</a>
        </div>
    </div>   
    `;
  }
  html += '</div>';
  return html;
};
const emptyNews = () => {
  return `<h1>Список новостей пуст!</h1>`;
};

// import { News } from '../api/dto/news.dto';

export const drawDocument = (body: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        .card {
            border: 1px solid palevioletred;
            margin: 4px;
        }
    </style>
        <title>Document</title>
    </head>
    <body>
    ${body}
    </body>
    </html>
    `;
};

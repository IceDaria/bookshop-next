import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { subject, page } = req.query;
  
      // Формирование параметров запроса к API Google Books
      const getReqParams = new URLSearchParams();

      if (!subject) {
        res.status(400).send({error: true, message: 'Subject is required'});
      } else {
        getReqParams.set('q', `Subject:${subject}`);
      }
      if (!page || typeof page !== 'string') {
        res.status(400).send({error: true, message: 'Page index is required'});

      } else {
        getReqParams.set('startIndex', page.toString());
      }
      getReqParams.set('maxResults', '6');
  
      // Выполнение запроса к API Google Books
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${getReqParams.toString()}&key=AIzaSyAIHP_TkLkxcJSBIxOd9OuZH9rwpR4EaGI`);
      const bookData = await response.json();

       // Вывод отладочной информации в консоль
       console.log(bookData);
       
      // Отправка полученных данных в ответ
      res.status(200).json(bookData.items);
    } catch (error) {
      // Обработка ошибок
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}
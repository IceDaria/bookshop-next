import { APIResponse } from '@/components/shared/Types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { subject, page } = req.query;
  
      // Формирование параметров запроса к API Google Books
      const gbooksReqParams = new URLSearchParams();
      gbooksReqParams.set('q', `subject:${subject}`);
      gbooksReqParams.set('startIndex', String((Number(page) - 1) * 6)); // Параметр startIndex для пагинации
      gbooksReqParams.set('maxResults', '6'); // Максимальное количество результатов
  
      // Выполнение запроса к API Google Books
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${gbooksReqParams.toString()}&key=AIzaSyAIHP_TkLkxcJSBIxOd9OuZH9rwpR4EaGI`);
      const bookData: APIResponse = await response.json();
  
      // Отправка полученных данных в ответ
      res.status(200).json(bookData.items);
    } catch (error) {
      // Обработка ошибок
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
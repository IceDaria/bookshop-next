import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { subject, page } = req.query;
  
      // Проверка наличия параметра subject
      if (!subject) {
        return res.status(400).json({ error: true, message: 'Subject is required' });
      }
      
      // Проверка наличия и валидности параметра page
      const startIndex = typeof page === 'string' ? parseInt(page) : 0;
      if (isNaN(startIndex)) {
        return res.status(400).json({ error: true, message: 'Page index is invalid' });
      }

      // Формирование параметров запроса к API Google Books
      const queryParams = new URLSearchParams({
        q: `subject:${subject}`,
        startIndex: startIndex.toString(),
        maxResults: '6'
      });

      // Выполнение запроса к API Google Books
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${queryParams.toString()}&key=AIzaSyAIHP_TkLkxcJSBIxOd9OuZH9rwpR4EaGI`);
      const bookData = await response.json();
       
      // Отправка полученных данных в ответ
      res.status(200).json(bookData.items);
    } catch (error) {
      // Обработка ошибок
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}
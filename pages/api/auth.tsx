import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: true, message: 'Only POST requests are allowed' });
    }

    const { email, password } = req.body;
    
    // Валидация полей
    if (!isValidEmail(email) || !isValidPassword(password)) {
        return res.status(400).json({ error: true, message: 'Invalid email or password' });
    }

    // Если данные правильные, возвращаем данные об успешной авторизации
    return res.status(200).json({ success: true, token: 'testToken' });
}

// Функция для валидации email
function isValidEmail(email: string): boolean {
    // Пример простой валидации email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для валидации пароля
function isValidPassword(password: string): boolean {
    // Пароль должен быть длиннее 6 символов
    return password.length >= 6;
}
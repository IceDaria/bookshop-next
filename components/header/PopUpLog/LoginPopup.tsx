import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import s from './LoginPopup.module.scss'
import { logOut, loginFailure, loginSuccess, selectError, selectToken } from '@/store/authReducer';

export default function LoginPopup() {
    const dispatch = useDispatch();
    const error = useSelector(selectError) || '';
    const token = useSelector(selectToken);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // обработчик выхода из профиля
    const handleLogout = () => {
        dispatch(logOut());
    };

    // обработчик входа в профиль
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Проверка наличия введенных данных
        if (!email || !password) {
            // Вывести сообщение об ошибке, если email или пароль не введены
            dispatch(loginFailure('Your password must be at least 6 characters long'));
            return;
        }

        // Выполнение действий Redux для авторизации
        try {
            // Ваша логика для отправки запроса авторизации
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Проверка успешности запроса
            if (response.ok) {
                // Получение токена из ответа
                const data = await response.json();
                const token = data.token;

                // Обновление состояния Redux при успешной авторизации
                dispatch(loginSuccess({ token, email }));
            } else {
                // Обработка ошибки авторизации
                const errorData = await response.json();
                dispatch(loginFailure(errorData.message));
            }
        } catch (error) {
            // Обработка сетевых ошибок или других исключений
            if (error instanceof Error) {
                dispatch(loginFailure(error.message));
            } else {
                dispatch(loginFailure('An error occurred'));
            }
        }
    };

    return (
        <div className={s.popup}>
            {/* если есть токе(пользователь авторизован, показываем такой попап) */}
            {token ? (
                <div className={s.logged}>
                    <p className={s.title}>Hello, Daria Ice!</p>
                    <Link href='/profile' className={s.profile} aria-label="Open your prifile"> 
                        View profile
                    </Link>
                    <button className={s.button} onClick={handleLogout} aria-label="Click to log out">Log out</button>
                </div>
            ) : (
                <>
                {/* Если не авторизован, то такой */}
                    <p className={s.title}>Log In</p>
                    <form className={s.form} onSubmit={handleSubmit}>
                        <div className={s.wrapper}>
                            <label htmlFor="email">Email</label>
                            <input 
                                className={s.input}
                                type="email" 
                                placeholder={"Email"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Input your email"
                            />
                        </div>
                        <div className={s.wrapper}>
                            <label htmlFor="password">Password</label>
                            <input 
                                className={s.input} 
                                type="password" 
                                placeholder={"Password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Input your password"
                            />
                        </div>
                        {error && <p className={s.error}>{error}</p>}
                        <button className={s.button} type="submit" aria-label="Click to log in">Log In</button>
                    </form>
                </>
            )}
        </div>
    );
}
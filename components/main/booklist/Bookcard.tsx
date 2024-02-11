import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart, selectCart, selectLogged } from '@/store/authReducer';
import { IbookData } from '@/components/shared/Types';
import s from './Bookcard.module.scss';
import defaultCover from '../../../public/defaultcover.png';
import Image from "next/image";
import { GlobalSVGSelector } from '@/components/shared/GlobalSVGSelector';

interface BookcardProps {
    bookData: IbookData;
}

// Создаём карточку книги
const Bookcard: React.FC<BookcardProps> = ({ bookData }) => {
    // Деструктуризация данных о книге из пропсов
    const { id, volumeInfo, saleInfo } = bookData;
    const { title, authors, description, imageLinks, averageRating, ratingsCount } = volumeInfo;
    
    // Состояние для отображения всплывающего окна
    const [isMassageShown, setMassageShown] = useState(false);
    
    // Получаем функции useDispatch и useSelector из React Redux
    const dispatch = useDispatch();
    const logged = useSelector(selectLogged);

    // Получаем состояние корзины из Redux-хранилища
    const cart = useSelector(selectCart);

    // Округляем средний рейтинг до ближайшего целого числа
    const roundedRating = Math.round(averageRating ?? 0);
    
    // Генерация звезд рейтинга
    const stars = Array.from({ length: 5 }, (_, i) => (
        i + 1 <= roundedRating ? 
        <GlobalSVGSelector key={i} id="yellowstar" /> : 
        <GlobalSVGSelector key={i} id="starwhite" />
    ));

    // Обработчик добавления книги в корзину
    const handleAddToCart = () => {
        if (!logged) {
            setMassageShown(true); // Показываем всплывающее окно о необходимости авторизации
        } else {
            dispatch(addToCart({ book: bookData, quantity: 1 }));
        }
    };

    // Проверяем доступность книги для продажи
    const isBookAvailable = saleInfo && saleInfo.listPrice && saleInfo.listPrice.amount;
    const price = isBookAvailable ? `${saleInfo!.listPrice!.amount} ${saleInfo!.listPrice!.currencyCode}` : 'NOT FOR SALE';

    // Проверяем, добавлена ли книга в корзину
    const isBookInCart = cart.some(cartItem => cartItem.book && cartItem.book.id === id);

    return (
        <div className={s.bookcard}>
            <div className={s.bookcover}>
                <Image
                    src={imageLinks?.thumbnail || defaultCover} 
                    className={s.bookcover}
                    alt={title}
                    width={200}
                    height={283}
                /> {/* Если обложки книги нет, используем стандартную заглушку */}
            </div>
            <div className={s.bookinfo}>
                <div className={s.author}>{authors?.join(', ')}</div>
                <div className={s.name} title={title}>{title}</div>
                <div className={s.rating}>
                    <div className={s.stars}>{stars}</div>
                    <p className={s.review}>{`${ratingsCount ? `${ratingsCount} ${ratingsCount === 1 ? 'review' : 'reviews'}` : 'no reviews yet'}`}</p>
                </div>
                <div className={s.description}>{description}</div>
                <div className={s.price}>{price}</div>
                {/* Дисэйблим кнопку покупки, если у книги нет цены и если она в корзине */}
                <button
                    className={`${s.buybutton} ${(!isBookAvailable || isBookInCart) && s.disabledButton}`}
                    onClick={handleAddToCart}
                    aria-label="Click to add in card"
                    disabled={!isBookAvailable || isBookInCart}>
                    {isBookInCart ? 'In the cart' : isBookAvailable ? 'Buy Now' : 'Not for sale'}
                </button> 
                {/* Выводим сообщение о необходимости войти в профиль, чтобы купить книгу*/}
                {isMassageShown && 
                <div className={s.wrapper}>
                    <p className={s.message}>Please, log in to add book in the cart</p>
                    <button onClick={() => setMassageShown(false)} className={s.close}></button>
                </div>
                }
            </div>
        </div>
    );
}

export default Bookcard;
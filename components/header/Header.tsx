import Link from 'next/link';
import { GlobalSVGSelector } from '../shared/GlobalSVGSelector';
import s from './Header.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useLoginPopupToggle from '../shared/CustomHooks';
import LoginPopup from './PopUpLog/LoginPopup';

// Создаеём компонент header
export default function Header() {
    // Получаем состояние для открытия/закрытия всплывающего окна входа
    const [isLoginPopupOpen, toggleLoginPopup] = useLoginPopupToggle();
    
    // Получаем данные о корзине из Redux-стейта
    const cart = useSelector((state: RootState) => state.auth.cart);

    return (
        <div className={`${s.header__content} container`}>
            <Link href="/" className={s.logo} aria-label="Open main page">Bookshop</Link>
            
            <nav>
                <ul className={s.nav}>
                    <li><Link href="/" className={s.link} aria-label="Open books page">books</Link></li>
                    <li><a href="#" className={s.link}>audiobooks</a></li>
                    <li><a href="#" className={s.link}>Stationery & gifts</a></li>
                    <li><a href="#" className={s.link}>blog</a></li>
                </ul>
            </nav>
            
            <div className={s.buttons}>
                {/* Кнопка для открытия всплывающего окна входа */}
                <button onClick={toggleLoginPopup} className={s.button} aria-label="Open your profile page">
                    <GlobalSVGSelector id="user" />
                </button>
                {isLoginPopupOpen && <LoginPopup />}

                <button className={s.button}>
                    <GlobalSVGSelector id="search" aria-label="Open search bar" />
                </button>

                <Link href='/cart' className={`${s.button} ${s.cart}`} aria-label="Open cart">
                    <GlobalSVGSelector id="cart" />
                    {/* Отображение количества товаров в корзине */}
                    {cart.length > 0 && <div className={s.counter}>{cart.length}</div>}
                </Link>
            </div>
            
            {/* Бургер-меню для мобильной версии */}
            <div className={s.burgerMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}
import Link from 'next/link';
import { GlobalSVGSelector } from '../shared/GlobalSVGSelector';
import s from './Header.module.scss';

export default function Header() {
    return (
        <div className={`${s.header__content} container`}>
            <Link href="/" className={s.logo}>Bookshop</Link>
            <nav>
                <ul className={s.nav}>
                    <li><Link href="/" className={s.link}>books</Link></li>
                    <li><a href="#" className={s.link}>audiobooks</a></li>
                    <li><a href="#" className={s.link}>Stationery & gifts</a></li>
                    <li><a href="#" className={s.link}>blog</a></li>
                </ul>
            </nav>
            <div className={s.buttons}>
                <Link href='/profile' className={s.button}><GlobalSVGSelector id="user" /></Link>

                <button className={s.button}><GlobalSVGSelector id="search" /></button>

                <Link href='/cart' className={`${s.button} ${s.cart}`}>
                    <GlobalSVGSelector id="cart" />
                    <div className={s.cart__counter}>0</div>
                </Link>
            </div>
            <div className={s.burgerMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}
import { useSelector } from 'react-redux';

import s from './Cart.module.scss';
import Item from './Item/Item';
import { selectCart, selectLogged } from '@/store/authReducer';

// Создаём компонент страницы корзины
export default function Cart() {
    const cart = useSelector(selectCart);
    const logged = useSelector(selectLogged);
    // Функция для вычисления общей стоимости всех книг в корзине
    const getTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach(cartItem => {
            if (cartItem.book && cartItem.book.saleInfo && cartItem.book.saleInfo.listPrice && cartItem.book.saleInfo.listPrice.amount) {
                totalPrice += cartItem.book.saleInfo.listPrice.amount * cartItem.quantity;
            }
        });
        return totalPrice.toFixed(2);
    };

    // Функция для получения валюты
    const getCurrency = () => {
        if (cart.length > 0 && cart[0].book && cart[0].book.saleInfo && cart[0].book.saleInfo.listPrice && cart[0].book.saleInfo.listPrice.currencyCode) {
            // Берем валюту из первой книги в корзине
            return cart[0].book.saleInfo.listPrice.currencyCode;
        }
        return ''; // Возвращаем пустую строку, если корзина пуста или валюта не определена
    };

    return (
        <div className={`${s.cart} container`}>
            <h1 className={s.header}>shopping cart</h1>
            <div className={s.main}>
                <div className={s.table}>
                    <div className={s.item}>item</div>
                    <div className={s.quantity}>quantity</div>
                    <div className={s.price}>price</div>
                    <div className={s.delivery}>delivery</div>
                </div>
                {/* Если пользователь авторизован, показываем корзинку */}
                {logged ? (
                    cart.length === 0 ? (
                        <div className={s.empty}>Cart is empty</div>
                    ) : (
                        <div className={s.books}>
                            {cart.map((cartItem, index) => (
                                <Item key={index} book={cartItem.book} quantity={cartItem.quantity} />
                            ))}
                        </div>
                    )
                ) : (
                    <div className={s.loginMessage}><span className={s.log}>Log In</span> to add books in the cart</div> // Отображаем сообщение, если пользователь не авторизован
                )}
                <div className={s.footer}>
                    <div className={s.price}>
                        <p className={s.f_title}>total price: </p>
                        <div className={s.total}>{getTotalPrice()} {getCurrency()}</div>
                    </div>
                    <button className={s.buy}>checkout</button>
                </div>
            </div>
        </div>
    );
}
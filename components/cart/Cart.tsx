import s from './Cart.module.scss';
import Item from './Item/Item';

export default function Cart() {
    return (
        <div className={`${s.cart} container`}>
            <div className={s.header}>shopping cart</div>
            <div className={s.main}>
                <div className={s.table}>
                    <div className={s.item}>item</div>
                    <div className={s.quantity}>quantity</div>
                    <div className={s.price}>price</div>
                    <div className={s.delivery}>delivery</div>
                </div>
                <div className={s.book}>
                    <Item />
                </div>
            </div>
            <div className={s.footer}>
                <div className={s.price}>
                    <p className={s.f_title}>total price: </p>
                    <div className={s.total}>55.55</div>
                </div>
                <button className={s.buy}>checkout</button>
            </div>
        </div>
    )

}
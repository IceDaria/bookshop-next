import s from '../Cart.module.scss'
import cover from '../../../public/defaultcover.png';
import Image from "next/image";
import Quantity from './Quantity';

export default function Item() {
    return(
        <div className={s.wrapper}>
            <div className={s.item}>
                <div className={s.bookcover}><Image src={cover} alt="Book Cover" width={102.5} height={145.05}/></div>
                <div className={s.bookinfo}>
                    <div className={s.name}>Ytbpdtcnysq Fdnjh</div>
                    <div className={s.author}>Ytbpdtcny yfpdfybrt</div>
                    <div className={s.rating}>400 reviews</div>
                </div>
            </div>
            <div className={s.quantity}><Quantity /></div>
            <div className={s.price}>24.45</div>
            <div className={s.delivery}>Shipping: delivery</div>
        </div>
    )
}
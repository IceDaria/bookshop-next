import { IbookData } from '@/components/shared/Types';
import s from '../Cart.module.scss'; 
import Image from "next/image";
import defaultCover from '../../../public/defaultcover.png';
import Quantity from './Quantity';
import { GlobalSVGSelector } from '@/components/shared/GlobalSVGSelector';
import { useDispatch } from 'react-redux';
import { updateCartQuantity } from '@/store/authReducer';

interface ItemProps {
  book: IbookData;
  quantity: number; 
}

// Создаём единицу товара в корзине
const Item: React.FC<ItemProps> = ({ book, quantity }) => {
  const dispatch = useDispatch();

  // обработчик изменения числа товара(книги) в корзине
  const handleQuantityChange = (newQuantity: number) => {
    dispatch(updateCartQuantity({ book, quantity: newQuantity }));
}

    if (!book) {
        return null;
    }
    
    const { volumeInfo, saleInfo } = book;
    const { title, authors, imageLinks, averageRating, ratingsCount } = volumeInfo;

    // Округляем средний рейтинг до ближайшего целого числа, или устанавливаем 0, если рейтинг не определен
    const roundedRating = Math.round(averageRating ?? 0);

    // Создаем массив звезд рейтинга
    const stars = Array.from({ length: 5 }, (_, i) => (
      i + 1 <= roundedRating ? 
      <GlobalSVGSelector key={i} id="yellowstar" /> : 
      <GlobalSVGSelector key={i} id="starwhite" />
  ));

    // Обновление цены при изменении количества единицы товара
    const updatedPrice = saleInfo?.listPrice?.amount !== undefined ? saleInfo.listPrice.amount * quantity : undefined;
    const price = updatedPrice !== undefined ? `${updatedPrice} ${saleInfo?.listPrice?.currencyCode}` : undefined;

  return (
    <div className={s.wrapper}>
      <div className={s.item}>
        <div className={s.bookcover}>
            <Image 
            src={imageLinks?.thumbnail || defaultCover} 
            alt="Book Cover" 
            width={102.5} 
            height={145.05}/>
        </div> {/* Если обложки книги нет, используем стандартную заглушку */}
        <div className={s.bookinfo}>
          <div className={s.name}>{title}</div>
          <div className={s.author}>{authors?.join(', ')}</div>
          <div className={s.rating}>
                <div className={s.stars}>{stars}</div>
                <p className={s.review}>{`${ratingsCount ? `${ratingsCount} ${ratingsCount === 1 ? 'review' : 'reviews'}` : 'no reviews yet'}`}</p>
            </div>
        </div>
      </div>
      <div className={s.quantity}>
        <Quantity value={quantity} onChange={handleQuantityChange} />
      </div>
      <div className={s.price}>{price}</div>
      <div className={s.delivery}>Shipping: delivery</div>
    </div>
  )
}

export default Item;
import { IbookData } from '@/components/shared/Types';
import s from './Bookcard.module.scss';
import defaultCover from '../../../public/defaultcover.png'
import Image from "next/image"
import { GlobalSVGSelector } from '@/components/shared/GlobalSVGSelector';

interface BookcardProps {
    bookData: IbookData;
}

const Bookcard: React.FC<BookcardProps> = ({ bookData }) => {
    const { volumeInfo, saleInfo } = bookData;
    const { title, authors, description, imageLinks, averageRating, ratingsCount } = volumeInfo;

    // Округляем средний рейтинг до ближайшего целого числа, или устанавливаем 0, если рейтинг не определен
    const roundedRating = Math.round(averageRating ?? 0);

    // Создаем массив звезд рейтинга
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        // Определяем, должна ли быть звезда заполнена (желтая) или пустая (белая)
        const starComponent = i <= roundedRating ? <GlobalSVGSelector key={i} id="yellowstar" /> : <GlobalSVGSelector key={i} id="starwhite" />;
        stars.push(<div key={i} className={s.star}>{starComponent}</div>);
    }

    return (
        <div className={s.bookcard}>
            <div className={s.bookcover}>
                <Image
                    src={imageLinks?.thumbnail || defaultCover}
                    alt={title}
                    width={200}
                    height={283}
                />
            </div>
            <div className={s.bookinfo}>
                <div className={s.author}>{authors?.join(', ')}</div>
                <div className={s.name} title={title}>{title}</div>
                <div className={s.rating}>
                    <div className={s.stars}>{stars}</div>
                    <p className={s.review}>{ratingsCount ? `${ratingsCount} reviews` : 'no reviews yet'}</p>
                </div>
                <div className={s.description}>{description}</div>
                <div className={s.price}>{saleInfo?.listPrice?.amount || 'NOT FOR SALE'} {saleInfo?.listPrice?.currencyCode}</div>
                <button className={s.buybutton}>Buy Now</button>
            </div>
        </div>
    );
}

export default Bookcard;
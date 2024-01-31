import { bookData } from '@/components/shared/Types';
import s from './Bookcard.module.scss';
import defaultCover from '../../../public/defaultcover.png'
import Image from "next/image"

interface BookcardProps {
    bookData: bookData;
  }

const Bookcard: React.FC<BookcardProps> = ({ bookData }) => {
    if (!bookData || !bookData.volumeInfo) {
        return <div>No data available</div>;
    }

    const coverUrl = bookData.volumeInfo.imageLinks?.thumbnail || defaultCover;
 
    return (
        <div className={s.bookcard}>
            <div className={s.bookcover}>
            <Image
                src={coverUrl}
                alt={bookData.volumeInfo.title}
                width={212}
                height={295}
            />
            </div>
            <div className={s.bookinfo}>
                <div className={s.author}>{bookData.volumeInfo.authors?.join(', ')}</div>
                <div className={s.name}>{bookData.volumeInfo.title}</div>
                <div className={s.rating}>
                    <div className={s.stars}></div>
                    <div className={s.text}>{bookData.volumeInfo.averageRating}</div>
                </div>
                <div className={s.description}>{bookData.volumeInfo.description}</div>
                <div className={s.price}>
                    {
                        bookData.saleInfo?.listPrice ?
                        `${bookData.saleInfo.listPrice.amount} ${bookData.saleInfo.listPrice.currencyCode}` :
                        'Not for sale'
                    }
                </div>
                <button className={s.buybutton}>Buy Now</button>
            </div>
        </div>
    );
}

export default Bookcard;
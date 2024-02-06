import banner from '../../public/banner.png';
import banner2 from '../../public/banner2.png';
import banner3 from '../../public/banner3.png';

export const images = [
    {
        src: banner
    },
    {
        src: banner2
    },
    {
        src: banner3
    }
];

export interface Slide {
    src: string;
}

export interface IbookData {
    id: string;
    subject: string;
    volumeInfo: {
        title: string;
        authors?: Array<string>;
        description?: string;
        imageLinks: {
            smallThumbnail: string;
            thumbnail: string;
        };
        averageRating?: number;
        ratingsCount?: number;
    };
    saleInfo: {
        saleability: string;
        listPrice?: {
            amount: number;
            currencyCode: string;
        };
    };
}



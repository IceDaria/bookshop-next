import { useEffect, useState } from 'react';
import Image from 'next/image';
import s from './Slider.module.scss';

import banner from '../../../public/banner.png';
import banner2 from '../../../public/banner2.png';
import banner3 from '../../../public/banner3.png';
import { GlobalSVGSelector } from '@/components/shared/GlobalSVGSelector';

const Slider = () => {
    // Массив изображений для слайдера
    const images = [banner, banner2, banner3];
    // Состояние для отслеживания текущего слайда
    const [currentSlide, setCurrentSlide] = useState(0);
    // Состояние для автоматического пролистывания слайдов
    const [autoSlide, setAutoSlide] = useState(true);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        // Функция для автоматического пролистывания слайдов
        const autoSlideHandler = () => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        };

        // Функция для запуска автоматического пролистывания
        const startAutoSlide = () => {
            intervalId = setInterval(autoSlideHandler, 5000);
        };

        // Запускаем автоматическое пролистывание при монтировании компонента
        if (autoSlide) {
            startAutoSlide();
        }

        // Очищаем интервал при размонтировании компонента
        return () => {
            clearInterval(intervalId);
        };
    }, [autoSlide, images.length]);
    
 // Обработчик клика по точке слайдера
    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
        setAutoSlide(false);
        setTimeout(() => {
            setAutoSlide(true);
        }, 15000);
    };

    return (
        <div>
            <div className='container'>
                <div className={s.main_slider}>
                    <div className={s.slider__images}>
                        {images.map((slide, index) => (
                            <div
                            key={index}
                            className={`${s.image} n${index} ${currentSlide === index ? s.active : ''}`}
                        >
                            <Image 
                            src={slide} 
                            alt={`Slide ${index}`} 
                            height={0}
                            width={0}
                            style={{width:'100%', height: "100%" }} />
                        </div>
                            ))}
                    </div>
                    <div className={s.slider__dots}>
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`${s.dot} n${index} ${currentSlide === index ? s.active : ''}`}
                                onClick={() => handleDotClick(index)}>
                            </div>
                        ))}
                    </div>
                    <div className={s.promo_stiker}>
                        <a href="#">
                            <span className={s.sticker__first}>
                                <span className={s.sticker__text}>
                                Change<br/>old book<br/>on new
                                </span>
                                <div className={s.sticker__svg}><GlobalSVGSelector id='promoArrow'/></div>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            <div className={s.promo_stikers}>
                <div className={s.promo_stiker}>
                    <a href="#">
                        <span className={s.sticker__second}>
                            <span className={s.sticker__text}>
                            top<br/>100<br/>books<br/> 2022
                            </span>
                            <div className={s.sticker__svg}><GlobalSVGSelector id='promoArrow'/></div>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Slider;
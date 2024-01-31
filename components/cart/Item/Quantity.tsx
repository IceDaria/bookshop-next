import { ChangeEvent, useState } from 'react';
import s from '../Cart.module.scss';
import { GlobalSVGSelector } from '@/components/shared/GlobalSVGSelector';

export default function Quantity() {
    const [value, setValue] = useState(0);

    const handlePlus = () => {
        setValue(value + 1);
    }

    const handleMinus = () => {
        setValue(value - 1);
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    }


    return (
        <div className={s.wrapper}>
            <button className={s.button} onClick={handleMinus} aria-label="Уменьшить количество"><GlobalSVGSelector id="minus" /></button>
            <input type={"number"} value={value} onChange={handleInput} min={0}/>
            <button className={s.button} onClick={handlePlus} aria-label="Увеличить количество"><GlobalSVGSelector id="plus" /></button>
        </div>
    );
}
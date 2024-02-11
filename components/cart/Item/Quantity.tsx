import { ChangeEvent } from 'react';
import s from '../Cart.module.scss';
import { GlobalSVGSelector } from '@/components/shared/GlobalSVGSelector';

interface QuantityProps {
    value: number;
    onChange: (newValue: number) => void;
}

// создаём компонент количества единицы товара
export default function Quantity({ value, onChange }: QuantityProps) {
    // Обработчик изменения количества книг
    const handleQuantityChange = (newValue: number) => {
        // Проверяем, что newValue не меньше 0
        onChange(newValue >= 0 ? newValue : 0);
    }

    // Обработчик увеличения количества книг
    const handleIncrement = () => {
        handleQuantityChange(value + 1);
    }

    // Обработчик уменьшения количества книг
    const handleDecrement = () => {
        if (value > 0) {
            handleQuantityChange(value - 1);
        }
    }

    // Обработчик ввода нового значения количества книг
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        // Преобразуем значение в число
        const newValue = parseInt(e.target.value);
        // Проверяем, что newValue не NaN
        if (!isNaN(newValue)) {
            handleQuantityChange(newValue);
        }
    }

    return (
        <div className={s.quantityWrapper}>
            <button className={s.button} onClick={handleDecrement} aria-label="Decrease quantity">
                <GlobalSVGSelector id="minus" />
            </button>
            <input
                type="number"
                value={value}
                onChange={handleInput}
                min={0}
                className={s.quantityInput}
                aria-label="Quantity"
            />
            <button className={s.button} onClick={handleIncrement} aria-label="Increase quantity">
                <GlobalSVGSelector id="plus" />
            </button>
        </div>
    );
}
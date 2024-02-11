import s from './Sidebar.module.scss';
import { useState } from 'react';

interface SidebarProps {
    handleCategoryClick: (subject: string) => void;
}

// Создаём сайдбар с "навигацией" по категориям книг
const Sidebar: React.FC<SidebarProps> = ({ handleCategoryClick }) => {
    const [activeCategory, setActiveCategory] = useState('Architecture'); // Состояние для активной категории

    // Функция для обработки клика по категории
    const handleClick = (subject: string) => {
        setActiveCategory(subject); // Установка активной категории
        handleCategoryClick(subject); // Вызов функции из пропсов для обработки клика по категории
    };
  
    // Список категорий
    const categories = [
        "Architecture",
        "Art & Fashion",
        "Biography & Autobiography",
        "Business",
        "Crafts & Hobbies",
        "Drama",
        "Fiction",
        "Food & Drink",
        "Health & Fitness",
        "History & Politics",
        "Humor",
        "Poetry",
        "Psychology",
        "Science",
        "Technology",
        "Travel & Maps"
    ];
  
    return (
        <div className={s.sidebar}>
            <div className={s.background}></div>
            <nav>
                <ul className={s.navSidebar}> {/* Список категорий */}
                    {categories.map((category) => (
                        <li key={category} className={`${s.sidebarListItem} ${activeCategory === category ? s.active : ''}`}> {/* Элемент списка */}
                            <div className={s.sidebarLink} onClick={() => handleClick(category)}> {/* Обработчик клика */}
                                {category} {/* Название категории */}
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
  
export default Sidebar;
import router from 'next/router';
import s from './Sidebar.module.scss';
import { useState } from 'react';

interface SidebarProps {
    handleCategoryClick: (subject: string) => void;
  }
  
  const Sidebar: React.FC<SidebarProps> = ({ handleCategoryClick }) => {
    const [activeCategory, setActiveCategory] = useState('Architecture');
  
    const handleClick = (subject: string) => {
      setActiveCategory(subject);
      handleCategoryClick(subject);
    };
  
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
      <div className={`${s.sidebar}`}>
        <div className={s.background}></div>
        <nav>
          <ul className={s.navSidebar}>
            {categories.map((category, index) => (
              <li key={index} className={`${s.sidebarListItem} ${activeCategory === category ? s.active : ''}`}>
                <a className={s.sidebarLink} onClick={() => handleClick(category)}>{category}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
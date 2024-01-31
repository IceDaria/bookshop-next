import s from './Sidebar.module.scss';

export default function Sidebar() {
    return (
        <div className={`${s.sidebar}`}>
        <div className={s.background}></div>
            <nav>
            <ul className={s.navSidebar}>
            <li className={`${s.sidebarListItem} ${s.active}`}><a className={s.sidebarLink} data-category="Architecture">Architecture</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Art">Art & Fashion</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Biography & Autobiography">Biography</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Business">Business</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Crafts & Hobbies">Crafts & Hobbies</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Drama">Drama</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Fiction">Fiction</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Cooking">Food & Drink</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Health & Fitness">Health & Wellbeing</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="History">History & Politics</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Humor">Humor</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Poetry">Poetry</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Psychology">Psychology</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Science">Science</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Technology">Technology</a></li>
            <li className={s.sidebarListItem}><a className={s.sidebarLink} data-category="Travel">Travel & Maps</a></li>
        </ul>
            </nav>
        </div>

    )
}
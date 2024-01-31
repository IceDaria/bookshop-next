import s from './Profile.module.scss';
import Image from "next/image";
import avatar from '../../public/profile.png';

export default function Profile() {
    return (
        <div className={`${s.profile} container`}>
            <div className={s.main_info}>
                <div className={s.head}>profile</div>
                <div className={s.user}>
                    <div className={s.avatar}>
                        <Image src={avatar} alt={"Your avatar"} priority width={235} height={235} />
                    </div>
                    <div className={s.info}>
                        <div className={s.wrapper}>
                            <div className={s.title}>your name</div>
                            <div className={s.data}>Jonh Dow</div>
                        </div>

                        <div className={s.wrapper}>
                            <div className={s.title}>your email</div>
                            <div className={s.data}>example@gmail.com</div>
                        </div>
                        <button className={s.edit}>edit profile</button>
                    </div>
                </div>

            </div>

            <div className={s.aboutme}>
                <div className={s.title}>about me</div>
                <p className={s.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat, ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor quis ipsum. Proin mollis pellentesque nulla ac varius.</p>
            </div>
        </div>
    )
}
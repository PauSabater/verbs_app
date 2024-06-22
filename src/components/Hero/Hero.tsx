import { fontTitles } from '@/app/fonts'
import styles from './hero.module.scss'
import { ExerciseGenerate } from '../ExerciseGenerate/ExerciseGenerate'


interface IHero {
    title: string,
    // children: ReactNode,
    // bg: string
}

export function Hero() {

    return  (
        <div className={`${styles.container}`}>
            <div className={styles.formAndTitle}>
                <h1 className={`${fontTitles.className} ${styles.title}`}>Learn and practise any german<br></br> verb conjugation</h1>

                <ExerciseGenerate />

            </div>

            <GradientOne />

            <img
                src={'/img/webp/hero-bg.webp'}
                className={styles.imgBg}
            ></img>
        </div>

    )
}

const GradientOne = ()=> {
    return (
        <svg data-gradient-one viewBox="0 0 376 720" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.2" cx="369.5" cy="350.5" r="369.5" fill="url(#paint0_radial_277_420)"/>
            <defs>
            <radialGradient id="paint0_radial_277_420" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(369.5 350.5) rotate(90) scale(369.5)">
            <stop stopColor="#580DD9"/>
            <stop offset="1" stopColor="#2224BC" stopOpacity="0"/>
            </radialGradient>
            </defs>
        </svg>
    )
}
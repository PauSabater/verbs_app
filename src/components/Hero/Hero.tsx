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
                <h1 className={`${fontTitles.className} ${styles.title}`}>Learn and practise german<br></br> verb conjugations</h1>

                <p className={styles.subtitle}>From A1 to C2, set your exercise and start mastering all the verbs tenses</p>

                {/* <p>Set your exercise and start mastering verbs!</p> */}

                <ExerciseGenerate
                    isSearchBarOption={false}
                    component='hero'
                />

            </div>

            <GradientOne />

            {/* <img
                src={'/img/webp/hero-bg.webp'}
                className={styles.imgBg}
            ></img> */}

            <svg className={styles.svgCentral} viewBox="0 0 326 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M192.335 0.518827C230.084 2.31952 271.507 9.23812 297.106 31.1561C323.961 54.149 329.242 85.1637 322.936 112.339C316.879 138.44 296.507 161.554 264.186 173.023C234.509 183.553 198.402 173.107 163.463 168.927C123.711 164.171 79.9044 168.424 49.8173 147.374C15.9641 123.689 -9.64706 86.5846 4.56941 57.7577C18.2344 30.0491 73.8372 33.783 111.498 22.3022C138.938 13.9374 161.025 -0.974722 192.335 0.518827Z" fill="var(--c-primary)"/>
            </svg>

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
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
                <h1 className={`${fontTitles.className} ${styles.title}`}>Master German verb conjugations</h1>

                {/* <p className={styles.subtitle}>From A1 to C2, set your exercise and start mastering all the verbs tenses</p> */}

                {/* <p>Set your exercise and start mastering verbs!</p> */}
            </div>
            <div className={styles.exerciseContainer}>
                {/* <BackgroundForm /> */}
                {/* <p className={`${fontTitles.className} ${styles.intro}`}>Set your exercise and start improving your conjugation skills</p> */}
                <div className={styles.formContainer}>
                    <ExerciseGenerate
                        isSearchBarOption={false}
                        component='hero'
                    />
                </div>
            </div>
            {/* <GradientOne /> */}

            {/* <img
                src={'/img/webp/hero-bg.webp'}
                className={styles.imgBg}
            ></img> */}

            {/* <svg className={styles.svgCentral} viewBox="0 0 326 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M192.335 0.518827C230.084 2.31952 271.507 9.23812 297.106 31.1561C323.961 54.149 329.242 85.1637 322.936 112.339C316.879 138.44 296.507 161.554 264.186 173.023C234.509 183.553 198.402 173.107 163.463 168.927C123.711 164.171 79.9044 168.424 49.8173 147.374C15.9641 123.689 -9.64706 86.5846 4.56941 57.7577C18.2344 30.0491 73.8372 33.783 111.498 22.3022C138.938 13.9374 161.025 -0.974722 192.335 0.518827Z" fill="var(--c-tertiary)"/>
            </svg> */}

        </div>

    )
}

const BackgroundForm = ()=> {
    return (
        // <svg className={styles.bgForm} viewBox="0 0 514 495" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M107.346 154.5C118.392 154.5 127.346 145.546 127.346 134.5V20C127.346 8.95431 136.301 0 147.346 0H494C505.046 0 514 8.95431 514 20V475C514 486.046 505.046 495 494 495H20C8.95431 495 0 486.046 0 475V174.5C0 163.454 8.95431 154.5 20 154.5H107.346Z" fill="#3A0891"/>
        // </svg>
        // <svg className={styles.bgForm} viewBox="0 0 514 495" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M456.5 81.5C445.454 81.5 436.5 72.5457 436.5 61.5V20C436.5 8.9543 427.546 0 416.5 0H20C8.95432 0 0 8.95431 0 20V475C0 486.046 8.9543 495 20 495H494C505.046 495 514 486.046 514 475V101.5C514 90.4543 505.046 81.5 494 81.5H456.5Z" fill="#3A0891"/>
        // </svg>
        // <svg className={styles.bgForm} viewBox="0 0 514 495" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M439.5 105C428.454 105 419.5 96.0457 419.5 85V20C419.5 8.9543 410.546 0 399.5 0H20C8.9543 0 0 8.95431 0 20V475C0 486.046 8.9543 495 20 495H494C505.046 495 514 486.046 514 475V125C514 113.954 505.046 105 494 105H439.5Z" fill="#3A0891"/>
        // </svg>
        // <svg className={styles.bgForm} viewBox="0 0 514 495" fill="none" xmlns="http://www.w3.org/2000/svg">
        // <path d="M373.5 161C362.454 161 353.5 152.046 353.5 141V20C353.5 8.9543 344.546 0 333.5 0H20C8.95431 0 0 8.95431 0 20V475C0 486.046 8.9543 495 20 495H494C505.046 495 514 486.046 514 475V181C514 169.954 505.046 161 494 161H373.5Z" fill="#3A0891"/>
        // <path d="M391 45L391 120L468 120" stroke="#949393" stroke-width="2" stroke-linecap="round"/>
        // <path d="M391 120L451 59" stroke="#949393" stroke-width="2" stroke-linecap="round"/>
        // </svg>
        <svg className={styles.bgForm}  viewBox="0 0 514 451" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M353.5 117H222.5H20C8.9543 117 0 125.954 0 137V431C0 442.046 8.9543 451 20 451H494C505.046 451 514 442.046 514 431V137C514 125.954 505.046 117 494 117H353.5Z" fill="#3A0891"/>
<path d="M391 0.999997L391 76L468 76" stroke="#949393" stroke-width="2" stroke-linecap="round"/>
<path d="M391 76L451 15" stroke="#949393" stroke-width="2" stroke-linecap="round"/>
</svg>




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
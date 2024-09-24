import styles from './specialCharacters.module.scss'
import Image from 'next/image'
import information from '../../../../assets/svgFiles/information.svg'
import keyboard from '../../../../assets/svgFiles/keyboard.svg'


interface ISpecialCharacters {
    callbackOnClick: Function,
    isActive: boolean
}

export default function SpecialCharacters(props: ISpecialCharacters) {

    const specialChars = ['ä', 'ö', 'ü', 'ß']

    return (
        <div className={`${styles.container}`} data-is-active={props.isActive}>
            { specialChars.map((char, index) => {
                return (
                    <button className={styles.button} key={index} onClick={()=> props.callbackOnClick(char)}>
                        {char}
                    </button>
                )
            }) }
            {/* <Image
                src={keyboard}
                width={20}
                height={20}
                alt="keyboard"
            /> */}
        </div>
    )
}
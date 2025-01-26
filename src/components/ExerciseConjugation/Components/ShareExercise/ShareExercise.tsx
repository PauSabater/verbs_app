import { useContext, useState } from 'react'
import styles from './shareExercise.module.scss'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'
import { ButtonShare } from '@/components/ButtonShare/ButtonShare'
import Image from 'next/image'
import svgShare from '../../../../assets/svgFiles/share.svg'
import { iconImgSize } from '@/utils/constants'


export const ShareExercise = ()=> {

    const context = useContext(ExerciseConjugationContext)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className={styles.container}
        >
            <button className={styles.buttonTrigger} onClick={() => setIsOpen(!isOpen)}>
                <p>Share</p>
                <Image
                    src={svgShare}
                    width={iconImgSize}
                    height={iconImgSize}
                    alt="settings"
                />
            </button>

            <div className={styles.iconContainer} data-is-open={isOpen}>

                <ButtonShare icon={'mail'}/>
                <ButtonShare icon={'facebook'}/>
                <ButtonShare icon={'whatsapp'}/>
                <ButtonShare icon={'x'}/>
                <ButtonShare icon={'linkedIn'}/>

            </div>

        </div>
    )
}
import { useContext } from 'react'
import styles from './verbInfo.module.scss'
import { ExerciseConjugationContext } from '../../ExerciseConjugation'
import { sanitize } from 'isomorphic-dompurify'
import VerbTitle from '@/components/VerbHeader/Components/VerbTitle/VerbTitle'
import VerbDetails from '@/components/VerbHeader/Components/VerbDetails/VerbDetails'


export const VerbInfo = ()=> {

    const context = useContext(ExerciseConjugationContext)

    // if (!context?.currentVerbProps) return

    return (
        <div className={styles.container}>
            {/* <p className={styles.title} dangerouslySetInnerHTML={{__html: sanitize(context?.currentVerbProps?.verbHTML || '')}}></p> */}
            <VerbTitle verbHTML={context?.currentVerbProps?.verbHTML || ''} />
            <p className={styles.translation}>
                {context?.currentVerbProps?.translations.en.trimStart() || ''}
            </p>
            <VerbDetails
                level={context?.currentVerbProps?.level}
                isIrregular={context?.currentVerbProps?.isIrregular}
                isModal={context?.currentVerbProps?.isModal}
                isAuxiliary={context?.currentVerbProps?.isAuxiliary}
                isSeparable={context?.currentVerbProps?.isSeparable}
                prefixed={context?.currentVerbProps?.prefixed}
                reflexive={context?.currentVerbProps?.reflexive}
                smallFormat={true}
            />
        </div>
    )
}
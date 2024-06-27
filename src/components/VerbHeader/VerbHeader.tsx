import styles from './verbHeader.module.scss'
import VerbTitle from './Components/VerbTitle/VerbTitle'
import VerbStemFormation from './Components/VerbStemFormation/VerbStemFormation'
import VerbDetails from './Components/VerbDetails/VerbDetails'
import { Button } from '../Button/Button'
import { sanitize } from 'isomorphic-dompurify'
import { getOptionsDropdown, isAuxliaryVerb, isModalVerb } from '@/utils/utils'
import { ISelectorDropdownOptions } from '../Selector/Selector'
import { VerbDescription } from './Components/VerbDescription/VerbDescription'


interface IVerbHeader {
    verb: string,
    level: string,
    verbHTML: string,
    stemFormationHTML: string,
    isIrregular: boolean,
    isSeparable: boolean,
    prefixed: boolean,
    reflexive: boolean,
    button: string,
    description: string,
    translation: string,
    callbackOnBtnClick: Function,
    listBtnTenses: ISelectorDropdownOptions[]
}

export default function VerbHeader(props: IVerbHeader) {

    console.log(props.translation)

    const propsVerbDetails = {
        number: 1,
        level: props.level,
        isIrregular: props.isIrregular,
        isSeparable: props.isSeparable,
        isReflexive: props.reflexive,
        isAuxiliary: isAuxliaryVerb(props.verb),
        prefixed: props.prefixed,
        isModal: isModalVerb(props.verb)
    }

    const handleBtnClick = ()=> {
        props.callbackOnBtnClick(props.listBtnTenses)
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <VerbTitle verbHTML={props.verbHTML} />
            </div>
            <VerbDetails {...propsVerbDetails}/>
            <VerbStemFormation stemFormationHTML={props.stemFormationHTML} />
            <p className={styles.translation}>{props.translation}</p>
            <VerbDescription text={props.description}></VerbDescription>
            {/* <p className={styles.description} dangerouslySetInnerHTML={{__html: sanitize(props.description)}}></p> */}
            <Button
                text={props.button.replace("&", props.verb)}
                icon={"exercise"}
                callback={handleBtnClick}
            ></Button>
        </div>
    )
}
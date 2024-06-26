import Image from 'next/image'
import styles from './page.module.scss'
import '../styles/variables.scss';
import { Hero } from '@/components/Hero/Hero';

export default function Home() {
    return (
        <main className={styles.main}>
            <Hero/>
        </main>
    )
}

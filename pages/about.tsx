import Head from "next/head";
import Link from "next/link";
import styles from "../styles/About.module.css";

export default function About() {
    return (
        <div>
            <Head>
                <title>About</title>
            </Head>
            <Link href="/"></Link>
            <br />
            <div className={styles.annexes}>
                <h1>Notre vidéo "Mon projet industrie en 180s"</h1>
                <video width="90%" controls>
                    <source
                        src="files/a_remplacer_video_180s.mp4"
                        type="video/mp4"
                    />
                </video>
                <h1>Notre rapport de projet industrie</h1>
                <iframe
                    src="files/rapport_projet.pdf"
                    width="90%"
                    height="500px"
                ></iframe>
            </div>
        </div>
    );
}

import Head from "next/head";
import Link from "next/link";

export default function AboutUs() {
    return (
        <div>
            <Head>
                <title>About Us</title>
            </Head>
            ABOUT US
            <br />
            <Link href="/">Back to home</Link>
            <br />
            &quot;// TO DO : ecrire la description de nous&quot;
        </div>
    );
}

import clientPromise from "../lib/mongodb";

export default function Datas({ datas }) {
    return (
        <div>
            <h1>Datas</h1>
            <ul>
                {datas.map((data) => (
                    <li>
                        <h2>{data.Temperature}</h2>
                        <p>{data.Humidity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps() {
    try {
        const client = await clientPromise;
        const db = client.db("dhtTemp");

        const datas = await db
            .collection("tempHum")
            .find({})
            .limit(20)
            .toArray();

        return {
            props: { datas: JSON.parse(JSON.stringify(datas)) },
        };
    } catch (e) {
        console.error(e);
    }
}

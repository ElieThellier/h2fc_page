import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("dhtTemp");

        const datas = await db
            .collection("tempHum")
            .find({})
            .limit(10)
            .toArray();

        res.json(datas);
    } catch (e) {
        console.error(e);
    }
};

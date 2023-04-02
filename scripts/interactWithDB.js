import { MongoClient } from "mongodb";
// Connection URL
const url = "mongodb://0.0.0.0:27017";

// Database Name
const dbName = "dhtTemp";

async function getData(type) {
    // Use connect method to connect to the server
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("tempHum");

    const data = collection.find({}).project({ _id: 0, [type]: 1 });
    await client.close();

    return data.toArray();
}

export async function getDataValue(type) {
    const data = await getData(type);
    return data[0][type];
}

// update the database with the new data from the serial port
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

export async function updateDB() {
    const port = new SerialPort({
        path: "COM3",
        baudRate: 9600,
        parser: new ReadlineParser("\n"),
    });
    const parser = port.pipe(new ReadlineParser("\n"));
    // Use connect method to connect to the server
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("tempHum");

    parser.on("data", (data) => {
        const newData = {
            Time: new Date(),
            Temperature: parseFloat(data.substr(0, 5)),
            Humidity: parseFloat(data.substr(5, 10)),
        };
        collection.insertOne(newData).then(async () => {
            await collection.deleteMany({
                Time: {
                    $lt: new Date(Date.now() - 2 * 1000),
                },
            });
        });
    });
    await client.close();
    port.close();
}

export async function resetDB() {
    // Use connect method to connect to the server
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("tempHum");

    collection.deleteMany({});
    await client.close();
}

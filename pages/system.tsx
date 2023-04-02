import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import styles from "../styles/System.module.css";
import NoSsr from "../components/NoSsr.js";
import clientPromise from "../lib/mongodb";
/* import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
const port = new SerialPort({
    path: "COM3",
    baudRate: 9600,
});
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" })); */

const data_line = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt" as const,
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter" as const,
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        },
    ],
};

const data_hist = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

export default function System({ datas }: any) {
    displayName: "BarExample";
    return (
        <div>
            <Head>
                <title>System</title>
            </Head>
            SYSTEM
            <br />
            <Link href="/">Back to home</Link>
            <div className={styles.wrapper}>
                <div className={styles.one}>
                    <h2>Main variables</h2>
                    <table>
                        <thead>
                            <tr>
                                <td className={styles.col}>
                                    <div>
                                        {datas.map((data: any) => (
                                            <p>{data.Temperature}°C</p>
                                        ))}
                                    </div>
                                </td>
                                <td className={styles.col}>
                                    <div>
                                        {datas.map((data: any) => (
                                            <p>{data.Humidity}%</p>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className={styles.two}>
                    <h2>Command Panel</h2>
                </div>
                <div className={styles.three}>
                    <h2>Data Table</h2>
                    <table>
                        <thead>
                            <tr>
                                <th className={styles.col}>IN</th>
                                <th className={styles.col}>OUT</th>
                                <th className={styles.col}>FUEL CELL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    bla ={" "}
                                    {
                                        // on affiche le dernier element de la data
                                        data_line.datasets[0].data[
                                            data_line.datasets[0].data.length -
                                                1
                                        ]
                                    }
                                </td>
                                <td>
                                    P<sub>out</sub> ={" "}
                                    <NoSsr>
                                        {Math.floor(100 * Math.random())}
                                    </NoSsr>
                                </td>
                                <td>
                                    T<sub>pile</sub> ={" "}
                                    <NoSsr>
                                        {Math.floor(100 * Math.random())}
                                    </NoSsr>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.four}>
                    <h2>Line Example</h2>
                    <Line data={data_line} width={400} height={200} />
                </div>
                <div className={styles.five}>
                    <h2>Bar Example</h2>
                    <Bar data={data_hist} width={400} height={200} />
                </div>
            </div>
        </div>
    );
}

/* export async function updateDB() {
    try {
        const client = await clientPromise;
        const db = client.db("dhtTemp");
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
    } catch (e) {
        console.error(e);
    }
} */

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("dhtTemp");

        const datas = await db
            .collection("tempHum")
            .find({})
            .limit(1)
            .toArray();

        return {
            props: { datas: JSON.parse(JSON.stringify(datas)) },
        };
    } catch (e) {
        console.error(e);
    }
}

/* export async function resetDB() {
    try {
        const client = await clientPromise;
        const db = client.db("dhtTemp");
        const collection = db.collection("tempHum");

        collection.deleteMany({});
    } catch (e) {
        console.error(e);
    }
} */

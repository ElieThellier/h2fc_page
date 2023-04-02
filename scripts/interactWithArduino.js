import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const port = new SerialPort({
    path: "COM3",
    baudRate: 9600,
    parser: new ReadlineParser("\n"),
});
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

let temperature = null;
let humidity = null;

parser.on("data", (data) => {
    try {
        const { temperature: t, humidity: h } = JSON.parse(data);
        temperature = t;
        humidity = h;
    } catch (error) {
        console.error(`Error parsing data: ${data}`);
    }
});

// Now you can access the temperature and humidity variables elsewhere in your program:
console.log(`Temperature: ${temperature}C, Humidity: ${humidity}%`);

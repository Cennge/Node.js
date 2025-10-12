import { delay, time } from "./helper.js";
import { EventEmitter } from 'node:events';

const processor = new EventEmitter();
processor.on(
  "start",
  () => console.log(time(), "Start event dispatched")
);
processor.on("data", onDataEvent);

function onDataEvent(data) {
  console.log(time(), "Data event dispatched with: ", data);
}

const onStopEvent =()=>console.log(time(),"Stop event dispatched");
processor.on("stop",onStopEvent);

console.log(time(), "Program start");
await Promise.all([
delay(1000).then(() => processor.emit("start")),
delay(2000).then(() => processor.emit("data", "Event Data1")),
delay(3000).then(() => processor.emit("data", "Event Data2")),
delay(4000).then(() => processor.emit("stop"))
]);
console.log(time(), "Program stop");

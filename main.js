/* Задача: є два сервіси
   - дані про товар з ціною у доларах
   - дані про курс долара.
   Необхідно вивести дані про ціну товару у грн, запустивши
   дві задачі асинхронно. 
*/
import { delay, time } from "./timehelper.js";
import { EventEmitter } from 'node:events';

const processor = new EventEmitter();

function onRateEvent(rate) {
    processor.rate = rate;
    console.log(time(), "Got rate = ", rate);
    processor.emit('data');
}
function onPriceEvent(price) {
    processor.price = price;
    console.log(time(), "Got price = ", price);
    processor.emit('data');
}
function onDataEvent() {
    if(typeof processor.rate  != 'undefined' && 
       typeof processor.price != 'undefined') {
            const hrn = processor.rate * processor.price;
            console.log(`Final price: ${processor.price} x ${processor.rate} = ${hrn}`);
        }
}

processor.on('rate',  onRateEvent );
processor.on('price', onPriceEvent);
processor.on('data',  onDataEvent );

await Promise.race([
    Promise.all([
        delay(Math.random() * 20000).then(() => processor.emit('rate', 42)),
        delay(Math.random() * 20000).then(() => processor.emit('price', 100)),
    ]),
    delay(5000).then(() => console.log(time(), "Timeout: no data after 5s")),
]);

processor.off('rate',  onRateEvent );
processor.off('price', onPriceEvent);
processor.off('data',  onDataEvent );
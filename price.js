import { delay, time } from "./helper.js";
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
    if (typeof processor.rate != 'undefined' &&
        typeof processor.price != 'undefined') {
        const hrn = processor.rate * processor.price;
        console.log(`Final price: ${processor.price} x ${processor.rate} = ${hrn}`);
    }
}

processor.on('rate', onRateEvent);
processor.on('price', onPriceEvent);
processor.on('data', onDataEvent);

const TIMEOUT_LIMIT = 15000;

async function main() {
    let timeoutId;
    const timeout = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error("Timeout! Tasks cancelled."));
        }, TIMEOUT_LIMIT);
    });

    const tasks = Promise.all([
        delay(Math.random() * 20000).then(() => processor.emit('rate', 42)),
        delay(Math.random() * 20000).then(() => processor.emit('price', 100)),
    ]);

    try {
        await Promise.race([tasks, timeout]);
        console.log("All tasks completed in time.");
    } catch (err) {
        console.error(err.message);
    } finally {
        clearTimeout(timeoutId); 
    }

    processor.off('rate', onRateEvent);
    processor.off('price', onPriceEvent);
}

main();

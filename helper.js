const time = () => new Date().toTimeString().substring(0, 8)
function delay(timeout, isOk = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            isOk ? resolve() : reject()
        }, timeout);
    })
}

console.log(time() + " start")
delay(4000)
.then(() => { console.log(time() + " resolved") })
.catch(() => { console.log(time() + " rejected") })
.finally(() => { console.log(time() + " finalized") })
console.log(time() + " after delay")

module.exports = { time, delay }
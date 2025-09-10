// Створіть файл конфігурації «config.ini»
// Заповніть файл тестовими даними
// Залиште «недосконалості»: порожній рядок, різні пробіли навколо «=»
// Складіть програму, яка «зчитує» даний файл та перетворює його в об'єкт JS, а також виводить створений об'єкт на екран
// Передбачте, що файлу може не існувати або він може бути захищений від читання. У такому разі виведіть на екран відповідне повідомлення.


import * as fs from 'node:fs/promises'

const filename = "config.ini";

fs.access(filename)
    .then(() => {
        console.log("file exist");

        fs.open(filename, 'r')
            .then(async file => {
                const leftColumn = [];
                const rightColumn = [];
                for await (let line of file.readLines()) {
                    const [key, value] = line.split('=');
                    if (key && value) {
                        leftColumn.push(key.trim());
                        rightColumn.push(value.trim());
                    }
                }
            console.log("left colum:" + leftColumn);
            console.log("right colum:" + rightColumn);
            })
    })
    .catch(async err => {
        console.log("file not exist");
        let file = await fs.open(filename, 'w');
        file.close();
    })
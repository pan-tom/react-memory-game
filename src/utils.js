import shuffle from 'shuffle-array';

export const generateBoardMap = num => {
    return shuffle(Array.from(Array(num).keys()).map((val, i) => {
        return {
            id: i+1,
            value: Math.floor(i/2) + 1,
            status: '', // ['', 'opened', 'done']
        }
    }));
};

export const removeByValue = (array, ...values) => {
    values.forEach(val => {
        const i = array.indexOf(val);
        if (i > -1) {
            array.splice(i, 1);
        }
    });
    return array;
};

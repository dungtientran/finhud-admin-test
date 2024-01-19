export const splitArray = (arr) => {
    const maxlength = 1000;
    const amountChildrenArr = Math.ceil(arr.length / maxlength);

    if (arr.length <= maxlength) {
        return [arr];
    } else {
        const childrenArr = [];
        let start = 0;

        for (let i = 0; i < amountChildrenArr - 1; i++) {
            const newChildrenArr = arr.slice(start, start + maxlength);
            childrenArr.push(newChildrenArr);
            start += maxlength;
        }

        const latestArr = arr.slice(start);

        childrenArr.push(latestArr);

        return childrenArr;
    }
}
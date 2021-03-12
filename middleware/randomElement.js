class RandomElement {
    static returnRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }
    static filterElement(el, arr) {
        return arr.filter(e => e !== el);
    };
};

module.exports = RandomElement;

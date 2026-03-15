export function getFileName(filePath) {
    const fileName = filePath.split('/').pop();
    return fileName;
}
export function getTotalPrice(items) {
    const totalPrice = items.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return total + price;
    }, 0);
    return totalPrice;
}

export function getRandom(randomArray) {
    const value = randomArray[Math.floor(Math.random() * randomArray.length)];
    return value;
}

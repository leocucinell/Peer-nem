module.exports = function parseAddress(address) {
    const arr = address.split(",");
    const num = arr[0].match(/(\d+)/)[0];
    const street = arr[0].replace(`${Num} `, '');
    const city = arr[1];
    const state = arr[2];
    return {
        number: num,
        street,
        city,
        state
    }
}
/**
 * 
 * @param {string} address 
 * @returns object containing address information
 */
module.exports = function parseAddress(address) {
    const arr = address.split(",");
    const num = arr[0].match(/(\d+)/)[0];
    const street = arr[0].replace(`${num} `, '');
    const city = arr[1].replace(" ", "");
    const state = arr[2].replace(" ", "");
    return {
        number: num,
        street,
        city,
        state
    }
}
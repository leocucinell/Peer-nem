module.exports = function buildAddress(fields) {
    return `${fields.addressNum} ${fields.streetName}, ${fields.city}, ${fields.state}`
}
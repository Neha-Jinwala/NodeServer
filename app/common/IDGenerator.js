function generateID() {
    var num = Math.random() * 10000;
    num *= Math.random() * 10000;
    num = num << 0;
    num = Math.abs(num);
    return new Date().getTime() + "_" + num
}

module.exports = {
    generateCustomerID: () => {
        return "cust_" + generateID()
    },
    generateCPLinkID: () => {
        return "cpl_" + generateID()
    }
}

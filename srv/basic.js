const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
    this.on('ping', () => {
        return "pong"
    });
    this.on('hello', req => {
        const to = req.data.to; // Get the 'to' parameter from the request
        return `Hello ${to}!`
        
    });

    this.on('sum', req => {
        const {a,b} = req.data; // Extract the 'a' and 'b' parameters from the request
        const sum = a + b; 
        // Return the JSON response with the sum
        return  sum
       
    });
    
});


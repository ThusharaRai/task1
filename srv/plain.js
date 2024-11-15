const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

    // Implementation of the 'theAnswer' function
    this.on('theAnswer',() => {
        return 42;  // The answer to life, the universe, and everything
    });

    this.on('findMax', async (req) => {
        // Get the list of integers from the request data
        const { numbers } = req.data;

        // If no numbers are provided, return an error
        if (!numbers || numbers.length === 0) {
            return req.error(400, 'No numbers provided');
        }

        // Find the maximum number from the array
        const maxNumber = Math.max(...numbers);

        // Return the maximum number
        return maxNumber;
    });

});


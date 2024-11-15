module.exports = cds.service.impl(async function () {
    const { Products } = this.entities;
//   const db = await cds.connect.to('db')
//   const { Products } = db.entities

    this.on('productInfo', async (req) => {
        const productId = req.data.id;

        const result = await SELECT.one`
            ProductName, 
            Supplier.CompanyName as supplierName
        `
        .from(Products)  // From the Products entity
        .where({ ProductID: productId })  // Filter by the provided ProductID
        .limit(1);  // Only get one result

        if (!result) {
            req.error(404, `Product with ID ${productId} not found`);
        }

       return `${result.ProductName} by '${result.supplierName}'`;
      // req.reply(`${result.ProductName} '${result.supplierName}'`);
        
    });
    this.on('selectProduct', async (req) => {
        const { communityid } = req.data;

        // Step 1: Convert `communityid` to lowercase and sum ASCII values of each character
        const asciiTotal = communityid.toLowerCase().split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

        console.log(asciiTotal);

        // Step 2: Determine the total number of products in the dataset
        const totalProductsResult = await SELECT.one`count(*) as count`.from(Products);
        const totalProducts = totalProductsResult.count;

        console.log(totalProducts)

        // Step 3: Calculate the product ID using modulo arithmetic, ensuring it's within the range
        const productId = (asciiTotal % totalProducts) + 1;

        console.log(productId)

        // Step 4: Retrieve the product name for the calculated product ID
        const product = await SELECT.one`ProductName`.from(Products).where({ ProductID: productId });

        console.log(product)

        if (product) {
            return product.ProductName;
        } else {
            req.error(404, `Product with ID ${productId} not found`);
        }
    });

    this.on("stockValue", Products, async (req) => {
        // Destructure the ProductID from the request parameters
        const { ProductID } = req.params[0];

        // Fetch the product details from the Products entity
        const product = await SELECT.one.from(Products).where({ ProductID });

        // Calculate the stock value
        const stockValue = product.UnitPrice * product.UnitsInStock;

        return stockValue;
    });

});


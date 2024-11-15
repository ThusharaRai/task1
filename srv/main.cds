using northwind from '../db/schema';

//@path: '/odata/v4/northbreeze'
service northbreeze {

    entity Products as projection on northwind.Products actions
    {
        function stockValue() returns Decimal;
    }

    entity Suppliers  as projection on northwind.Suppliers;
    entity Categories as projection on northwind.Categories;

    entity TotalProducts as select from Products {
        count( ProductID ) as count
    };

    function stockValue() returns Decimal;

   function productInfo(id: Integer) returns String;
   //action productInfo(id: Integer) returns String;
   action selectProduct(communityid: String) returns String;
}

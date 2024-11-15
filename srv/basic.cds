@path: '/basic'
service BasicService {
    //     entity Books {
    //     key ID : Integer;
    //     title : String;
    // }
    function ping() returns String;
    function hello(to: String) returns String;
    function sum(a: Integer, b: Integer) returns Integer;
}



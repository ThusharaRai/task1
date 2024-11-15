service PlainService @(path:'/rest/plain') {
    entity Books {
        key ID : Integer;
        title : String;
    }
    function theAnswer() returns Integer;
    // Define the unbound action
    action findMax(numbers: array of Integer) returns Integer;
}



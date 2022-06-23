<?php

$connection = mysqli_connect('localhost','root','','jadar');

if($connection){
    // echo "We are connected to the database";
}
else{
    echo("Database connection failed");
}

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$contactEmail = $_POST['contactEmail'];
$address = $_POST['address'];
$phone = $_POST['phone'];
$userEmail = $_POST['userEmail'];
$id = $_POST['id'];

// $query = "INSERT INTO todos(todo)
//         VALUES(".'"'.$textField.'"'.")";

$query = "UPDATE contacts SET first_name="."'".$firstName."',"."last_name="."'".$lastName."',"."contactEmail="."'".$contactEmail."',"."address="."'".$address."',"."phone="."'".$phone."'"."WHERE id="."'".$id."'";


$result = mysqli_query($connection,$query);

if(!$result){
    die('Query failed');
}


function JSONParse($data)
{
    $i = 0;
    $string = "";

    while($row = mysqli_fetch_assoc($data))
    {
        if($i == 0)
            $string = JSONParseStatement($row);
        else
            $string = $string.','.JSONParseStatement($row);

        $i++;
    }

    return "[".$string."]";

}

function JSONParseStatement($data)
{
    $i = 0;
    $string = "";
    
    foreach($data as $datum => $datum_value){

        if($i++ != count($data)-1)
            $string = $string.
                '"'.$datum. '"'.":"."\"".$datum_value."\"".",";
        else
            $string = $string.
                '"'.$datum. '"'.":"."\"".$datum_value."\"";   
    }

    return '{'.$string.'}';
}


?>
<?php

$connection = mysqli_connect('localhost','root','','jadar');

if($connection){
    // echo "We are connected to the database";
}
else{
    echo("Database connection failed");
}

$userEmail = $_POST['userEmail'];

// $query = "INSERT INTO todos(todo)
//         VALUES(".'"'.$textField.'"'.")";

$query = "SELECT * FROM users WHERE email = '".$userEmail."'";

$result = mysqli_query($connection,$query);

if(!$result){
    die('Query failed');
}
else
{
    $row = mysqli_fetch_assoc($result);

    $id = $row["id"];

    $query = "SELECT * FROM contacts WHERE username_id = '".$id."'";
    $result = mysqli_query($connection,$query);

    if(!$result){
        die('Query failed');
    }
    else
    {
        $string = JSONParse($result);
        echo $string;
    }

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
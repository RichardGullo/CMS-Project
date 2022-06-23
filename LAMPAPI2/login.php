<?php

$connection = mysqli_connect('localhost','root','','jadar');

$payload = array("error" => "", "success" => "");

if(!$connection){
    $payload['error'] = 'Could not connect to database';
    echo json_encode($payload);
    exit();
}

$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE email = '".$username."'AND pass ='".$password."'";

$result = mysqli_query($connection,$query);

if(!$result){
    $payload['error'] = 'Query to database failed';
    echo json_encode($payload);
    exit();
}
else
{
    $rows = array();
    while($r = mysqli_fetch_assoc($result)){
        $rows[] = $r;
    }

    echo json_encode($rows);

}

?>
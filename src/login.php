<?php

session_start();

require_once __DIR__ . '/helpers.php';

// data getting form db
$login= $_POST['login'];
$password = $_POST['password'];

//write data to db
$connect = getDB();

$sql = "SELECT * FROM `users` WHERE `login` = ('login') AND `password` = ('password')";

$result = $connect->query($sql);

//print_r($result);


//print_r($result->fetch_assoc());

if($result -> num_rows > 0){
    while($row = $result->fetch_assoc()){
        //echo $row['id'];
        //echo $row['login'];

        $_SESSION['user']['id'] = $row['id']; 

        header(header: "Location: /profile.html ")
    }
} else {
    echo 'incorrect password or id'
}


//print_r("test")
?>
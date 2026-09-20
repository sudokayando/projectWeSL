<?php

require_once __DIR__ . '/helpers.php';

// data getting form db
$login= $_POST['login'];
$password = $_POST['password'];

echo $login . '-' . $password;


//write data to db
$connect = getDB();
$sql = "INSERT INTO `users` (login, password) VALUES('$login, $password')";

if ($connect -> query($sql) === TRUE) {
    echo 'registrated';
} else {
    echo 'this user already registrated';
}
?>
<?php

const DB_HOST = 'localhost';
const DB_NAME = 'projectWeSL';
const DB_USER = 'root';
const DB_PASS = '';
    

function getDB(): bool|mysqli {
    return mysqli_connect(hostname: DB_HOST, username: DB_USER,password: DB_PASS, database: DB_NAME);
}
?>
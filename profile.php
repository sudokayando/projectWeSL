<?php

require_once __DIR__ . '/src/helpers.php';

$connect = getDB();

$idUser = $_SESSION['user']['id'];

if($idUser == '') {
    header(header: "Location: /index.html ")
}

$sql = "SELECT * FROM `users` WHERE `login` = ('login');

$result = mysqli_query_($connect, $sql);
$result = mysql_fetch_all($result);

$login;

foreach($result ad $item) {
    $login = $item[1];
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
</head>
<body>
    <main>
        <h2>Personal</h2>

        <p>welcome <?= $login ?> </p>

        <a gref="src/logout.php">exit</a>

    </main>
</body>
</html>














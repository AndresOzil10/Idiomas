<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

include 'conexion.php';
$con = conectarDB();
$con->set_charset('utf8');

$sql = $con->query("SELECT id, user, email FROM usuario WHERE languageexpense = 3");

$res = array();
while($row=$sql->fetch_assoc()){
    $res[] = array(
        'id' => $row['id'],
        'user' => $row['user'],
        'nombre' => $row['email'],
    );
}

echo json_encode($res);

mysqli_close($con);
?>
<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

include 'conexion.php';
$con = conectarDB();
$con->set_charset('utf8');

$sql = $con->query("SELECT id, laguage, costxclass FROM laguage");

$res = array();
while($row=$sql->fetch_assoc()){
    $res[] = array(
        'id' => $row['id'],
        'language' => $row['laguage'],
        'costxclass' => $row['costxclass'],
    );
}

echo json_encode($res);

mysqli_close($con);

?>
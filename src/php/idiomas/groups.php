<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

include 'conexion.php';

$con = conectarDB();
$con->set_charset('utf8');

$sql = $con->query("SELECT groups.id, laguage, level, schedule, days FROM groups INNER JOIN laguage ON id_language = laguage.id");

$res = array();
while($row=$sql->fetch_assoc()){
    $res[] = array(
        'id' => $row['id'],
        'language' => $row['laguage'],
        'level' => $row['level'],
        'schedule' => $row['schedule'],
        'days' => $row['days']
    );
}

echo json_encode($res);

mysqli_close($con);

?>
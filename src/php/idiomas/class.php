<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

include 'conexion.php';
$con = conectarDB();
$con->set_charset('utf8');

$sql = $con->query("SELECT c.id, l.laguage, g.level, g.schedule, g.days, c.nn, c.name, c.ceco FROM class c INNER JOIN laguage l ON c.id_language = l.id INNER JOIN groups g ON c.id_group = g.id");

$res = array();
while($row=$sql->fetch_assoc()){
    $res[] = array(
        'id' => $row['id'],
        'language' => $row['laguage'],
        'nn' => $row['nn'],
        'name' => $row['name'],
        'idioma'=> $row['laguage'],
        'group'=> $row['level']." ".$row['schedule']." ".$row['days'],
        'ceco'=> $row['ceco'],
    );
}

echo json_encode($res);

mysqli_close($con);

?>
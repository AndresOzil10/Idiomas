<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods:GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json; charset=utf-8");

date_default_timezone_set('America/Mexico_City');

$method = $_SERVER['REQUEST_METHOD'];

include 'conexion.php';
$con = conectarDB();


$JSONData = file_get_contents("php://input");
$dataObject = json_decode($JSONData);
$con->set_charset('utf8');

$aksi = $dataObject->aksi;

    if($aksi == "addLanguage"){
        $language = $dataObject->language;
        $cost = $dataObject->costxclass;

        $query = "INSERT INTO laguage (laguage, costxclass) VALUES ('$language', '$cost')";
        if($con->query($query)){
            echo json_encode(['repuesta' => true, 'success' => 'Language added successfully.']);
        } else {
            echo json_encode(['respuesta' => false, 'error' => 'Error adding language: ']);
        }
    } else {
        echo json_encode(['respuesta' => false, 'error' => 'Invalid action.']);
    }


?>
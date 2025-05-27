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
    } elseif($aksi == "deletedLanguage"){
        $id = $dataObject->id;
        $query = "DELETE FROM laguage WHERE id = '$id'";
        if($con->query($query)){
            echo json_encode(['respuesta' => true, 'success' => 'Language deleted successfully.']);
        } else {
            echo json_encode(['respuesta' => false, 'error' => 'Error deleting language: ']);
        }
    } elseif($aksi == "addGroup"){
        $language = $dataObject->language;
        $level = $dataObject->level;
        $days = $dataObject->days;
        $schedule = $dataObject->schedule;
        $from = $dataObject->from;
        $horario = $schedule."-".$from;
        $query = "INSERT INTO groups (id_language, level, days, schedule) VALUES ('$language', '$level', '$days', '$horario')";
        if($con->query($query)){
            echo json_encode(['respuesta' => true, 'success' => 'Group added successfully.']);
        } else {
            echo json_encode(['respuesta' => false, 'error' => 'Error adding group: ']);
        }
    } elseif($aksi == "deletedGroup"){
        $id = $dataObject->id;
        $query = "DELETE FROM groups WHERE id = '$id'";
        if($con->query($query)){
            echo json_encode(['respuesta' => true, 'success' => 'Group deleted successfully.']);
        } else {
            echo json_encode(['respuesta' => false, 'error' => 'Error deleting group: ']);
        }
    } elseif($aksi == "addNewStudent"){
        //$conexion = 
        $nomina = $dataObject->nomina;
        $language = $dataObject->language;
        $grupo = $dataObject->grupo;

        $query = "SELECT Nombre, ApellidoP, ApellidoM, CeCo FROM usuarios WHERE Nomina = '$nomina'";
        $result = $con->query($query);
        if($result->num_rows > 0){
            $row = $result->fetch_assoc();
            $nombre = $row['Nombre']." ".$row['ApellidoP']." ".$row['ApellidoM'];
            $ceco = $row['CeCo'];

            $query = "INSERT INTO class ( id_language, id_group, nn, name, ceco) VALUES ('$language', '$grupo', '$nomina', '$nombre', '$ceco')";
            if($con->query($query)){
                echo json_encode(['respuesta' => true, 'success' => 'Student added successfully.']);
            } else {
                echo json_encode(['respuesta' => false, 'error' => 'Error adding student: ']);
            }

        } else {
            echo json_encode(['respuesta' => false, 'error' => 'User not found.']);
        }

    } elseif($aksi == "deletedStudent"){
        $id = $dataObject->id;
        $query = "DELETE FROM class WHERE id = '$id'";
        if($con->query($query)){
            echo json_encode(['respuesta' => true, 'success' => 'Student deleted successfully.']);
        } else {
            echo json_encode(['respuesta' => false, 'error' => 'Error deleting student: ']);
        }
    } elseif($aksi == "deletedUsers"){
        $id = $dataObject->id;
        $query = "DELETE FROM usuario WHERE id = '$id'";
        if($con->query($query)){
            echo json_encode(['respuesta' => true, 'success' => 'User deleted successfully.']);
        } else {
            echo json_encode(['respuesta' => false, 'error' => 'Error deleting user: ']);
        }
    } elseif($aksi == "addTeacherUser"){
        $username = $dataObject->user;
        $contra = $dataObject->password;
        $password = password_hash($contra, PASSWORD_BCRYPT);
        $name = $dataObject->name;

        $query = "INSERT INTO usuario ( user, contra, email, languageexpense) VALUES ('$username', '$password', '$name', '3')";
        if($con->query($query)){
            echo json_encode(['respuesta' => true, 'success' => 'User added successfully.']);
        } else {
            echo json_encode(['respuesta' => false, 'error' => 'Error adding user: ']);
        }
    } elseif($aksi == "ChargeCeCo"){ 
        $query = "SELECT ceco FROM costos";
        $result = $con->query($query);
        while($row = $result->fetch_assoc()){
            $ceco = $row['ceco'];
            $query2 = "SELECT COUNT(*) as count FROM class WHERE CeCo = '$ceco'";
        }

    }


?>
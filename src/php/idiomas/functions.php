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
        $semana = date('W');
        $query = "SELECT id, ceco FROM costos";
        $result = $con->query($query);
        while($row = $result->fetch_assoc()){
            $ceco = $row['id'];
            $name = $row['ceco'];
            $suma = 0;
            $query2 = "SELECT id_language, id_group FROM class WHERE ceco = '$ceco'";
            $result2 = $con->query($query2);
            while($row2 = $result2->fetch_assoc()){
                $id_language = $row2['id_language'];
                $id_group = $row2['id_group'];
                $query3 = "SELECT COUNT(*) as count FROM class WHERE id_group = '$id_group'";
                $result3 = $con->query($query3);
                $row3 = $result3->fetch_assoc();
                $count = $row3['count'];
                $query4 = "SELECT costxclass FROM laguage WHERE id = '$id_language'";
                $result4 = $con->query($query4);
                $row4 = $result4->fetch_assoc();
                $costxclass = $row4['costxclass'];
                $suma = $suma + ($costxclass * 2)/ $count;
            }
            $promedio = $suma * $semana;
            $numFormated = number_format($promedio, 2);
            $resultados[] = [
                'name' => $name,
                'promedio' => $numFormated
            ];
        }

        echo json_encode(['estado' => true, 'data' => $resultados]);

    } elseif($aksi == "getGroups"){
        $data = [];
        $id_teacher = $dataObject->id_teacher;
        $query = "SELECT * FROM groups WHERE id_teacher = '$id_teacher'";
        $result = $con->query($query);
        while($row = $result->fetch_assoc()){
            $id = $row['id'];
            $level = $row['level'];
            $schedule = $row['schedule'];
            $group = [
                'id' => $id,
                'level' => $level,
                'schedule' => $schedule,
                'members' => []
            ];

            $query1 = "SELECT nn, name FROM class WHERE id_group = '$id'";
            $result1 = $con->query($query1);
            while($row1 = $result1->fetch_assoc()){
                $group['members'][] = [
                    'nn' => $row1['nn'],
                    'name' => $row1['name']
                ];
            }

            $data[] = $group;
        }
        echo json_encode(['estado' => true, 'data' => $data]);
    } elseif($aksi == "Asistencia"){
        $data = $dataObject->info;
        $group = $dataObject->grupo;
        $request = "SELECT id FROM groups WHERE level = '$group'";
        $result = $con->query($request);
        $row = $result->fetch_assoc();
        $id_group = $row['id'];

        echo $id_group."\n";

        foreach($data as $obj) { 
            $nn = $obj-> nn ?? null;
            $name = $obj->name ?? null;

            // $query = "UPDATE class SET asistencia = 1 WHERE nn = '$nn' AND id_group = '$id_group'";
        }  
        echo json_encode(['estado' => true, 'success' => 'Attendance recorded successfully.']);
    } elseif($aksi == "login"){
        $user = $dataObject->username;
        $password = $dataObject->password;

        $query = "SELECT contra FROM usuario WHERE user = '$user'";
        $result = $con->query($query);
        if($result->num_rows > 0){
            $row = $result->fetch_assoc();
            $hashedPassword = $row['contra'];

            if(password_verify($password, $hashedPassword)){
                $query = "SELECT id, user, email, languageexpense FROM usuario WHERE user = '$user'";
                $result = $con->query($query);
                $userData = $result->fetch_assoc();
                echo json_encode(['estado' => true, 'data' => 'Usuario autenticado correctamente.']);
            } else {
                echo json_encode(['estado' => false, 'error' => 'Invalid password.']);
            }
        } else {
            echo json_encode(['estado' => false, 'error' => 'User not found.']);
        }
    }


?>
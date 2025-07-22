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
        $data = $dataObject->checked;
        $unchecked = $dataObject->unchecked;
        $group = $dataObject->grupo;
        $request = "SELECT id FROM groups WHERE level = '$group'";
        $result = $con->query($request);
        $row = $result->fetch_assoc();
        $id_group = $row['id'];

        echo $id_group."\n";

        //checked mebers
        foreach($data as $obj) { 
            $nn = $obj-> nn ?? null;
            $name = $obj->name ?? null;
            $asistencia = "SELECT asistencia FROM class WHERE nn = '$nn' AND id_group = '$id_group'";
            $result = $con->query($asistencia);
            $asistenciaRow = $result->fetch_assoc();


            // $query = "UPDATE class SET asistencia = 1 WHERE nn = '$nn' AND id_group = '$id_group'";

            echo $nn." ".$name."\n";
            
        }  
        // echo $unchecked;
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
                $query = "SELECT id, languageexpense FROM usuario WHERE user = '$user'";
                $result = $con->query($query);
                $userData = $result->fetch_assoc();
                echo json_encode(['estado' => true, 'message' => 'Usuario autenticado correctamente.', 'tipo' => $userData['languageexpense'], 'id' => $userData['id'], 'username' => $user]);
            } else {
                echo json_encode(['estado' => false, 'error' => 'Invalid password.']);
            }
        } 
    } elseif($aksi == "updateStudent"){
        $id = $dataObject->id;
        $language = $dataObject->language;
        $grupo = $dataObject->grupo;
        $ceco = $dataObject->ceco;

        $query = "SELECT  FROM costos WHERE ceco = '$ceco'";


        $query = "UPDATE class SET id_language = '$language', id_group = '$grupo', ceco = '$ceco' WHERE id = '$id'";
        if($con->query($query)){
            echo json_encode(['estado' => true, 'success' => 'Student updated successfully.']);
        } else {
            echo json_encode(['estado' => false, 'error' => 'Error updating student: ']);
        }
    } elseif($aksi == "getStudents"){
        $sql = $con->query("SELECT Nomina, ApellidoP, ApellidoM, Nombre FROM usuarios ");
        $res = array();
        while($row=$sql->fetch_assoc()){
            $res[] = array(
                'nomina' => $row['Nomina'],
                'nombre' => $row['ApellidoP']." ".$row['ApellidoM']." ".$row['Nombre'],
            );
        }
        echo json_encode(['estado' => true, 'data' => $res]);
    } elseif($aksi == "getLanguages"){
        $query = "SELECT id, laguage, costxclass FROM laguage";
        $result = $con->query($query);
        $languages = [];
        while($row = $result->fetch_assoc()){
            $languages[] = [
                'id' => $row['id'],
                'language' => $row['laguage'],
                'costxclass' => $row['costxclass']
            ];
        }
        echo json_encode(['estado' => true, 'data' => $languages]);
    } elseif($aksi == "getGroupsList"){
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

        echo json_encode(['estado' => true, 'data' => $res]);
    } elseif($aksi == "getClassList"){
        $sql = $con->query("SELECT c.id, l.laguage, g.level, g.schedule, g.days, c.nn, u.ApellidoP, u.ApellidoM, u.Nombre, ce.ceco FROM class c INNER JOIN laguage l ON c.id_language = l.id INNER JOIN groups g ON c.id_group = g.id INNER JOIN usuarios u ON c.nn = u.Nomina INNER JOIN costos ce ON c.ceco = ce.id ORDER BY c.id ASC");

        $res = array();
        while($row=$sql->fetch_assoc()){
            $res[] = array(
                'id' => $row['id'],
                'language' => $row['laguage'],
                'nn' => $row['nn'],
                'name' => $row['ApellidoP']." ".$row['ApellidoM']." ".$row['Nombre'],
                'idioma'=> $row['laguage'],
                'group'=> $row['level']." ".$row['schedule']." ".$row['days'],
                'ceco'=> $row['ceco'],
            );
        }

        echo json_encode(['estado' => true, 'data' => $res]);
    } elseif($aksi == "getTeachersUsers"){
        $sql = $con->query("SELECT id, user, email FROM usuario WHERE languageexpense = 3");
        $res = array();
        while($row=$sql->fetch_assoc()){
            $res[] = array(
                'id' => $row['id'],
                'user' => $row['user'],
                'nombre' => $row['email']
            );
        }
        echo json_encode(['estado' => true, 'data' => $res]);
    } elseif($aksi == "updateLanguage"){
        $id = $dataObject->id;
        $language = $dataObject->language;
        $costxclass = $dataObject->costxclass;

        $query = "UPDATE laguage SET laguage = '$language', costxclass = '$costxclass' WHERE id = '$id'";
        if($con->query($query)){
            echo json_encode(['estado' => true, 'success' => 'Language updated successfully.']);
        } else {
            echo json_encode(['estado' => false, 'error' => 'Error updating language: ']);
        }
    } elseif($aksi == "UpdateLevel"){
        $id = $dataObject->id;
        $level = $dataObject->level;
        $days = $dataObject->days;
        $schedule = $dataObject->schedule;

        $query = "UPDATE groups SET level = '$level', days = '$days', schedule = '$schedule' WHERE id = '$id'";
        if($con->query($query)){
            echo json_encode(['estado' => true, 'success' => 'Group updated successfully.']);
        } else {
            echo json_encode(['estado' => false, 'error' => 'Error updating group: ']);
        }
    }
    mysqli_close($con);


?>
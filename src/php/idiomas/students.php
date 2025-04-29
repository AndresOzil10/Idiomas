<?php
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Content-Type: text/html; charset=utf-8");
    header("Access-Control-Allow-Origin: *");

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $con = new mysqli('localhost', 'root', '', 'rh');

    $sql = $con->query("SELECT Nomina, ApellidoP, ApellidoM, Nombre FROM usuarios ");
    $res = array();
    while($row=$sql->fetch_assoc()){
        $res[] = array(
            'nomina' => $row['Nomina'],
            'nombre' => $row['ApellidoP']." ".$row['ApellidoM']." ".$row['Nombre'],
        );
    }

    echo json_encode($res);

    mysqli_close($con);



?>
<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: application/json; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];


function conectarDB(){

	$servidor = "10.144.13.5";
	$usuario = "root";
	$password = "";
	$bd = "control";
	//$bd = "cajaherr_datos";
	
  
	  $conexion = mysqli_connect($servidor, $usuario, $password,$bd);
  
		  if($conexion){
			  echo "";
		  }else{
			  echo 'Ha sucedido un error inexperado en la conexion de la base de datos
  ';
		  }
  
	  return $conexion;
  }

?>
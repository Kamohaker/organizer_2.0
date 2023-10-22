<?php
	require_once "dbconfig.php";
	$con = new mysqli('localhost','root','','organizer');
	$method = $_SERVER['REQUEST_METHOD'];
	$id='';
	$nazwa='';
	$opis='';
	switch($method){
		
	case'GET':
		$query="SELECT * FROM notatnik ";
		break;
		
	case'POST':
	$json=file_get_contents('php://input');
	$obj=json_decode($json);
   
		$nazwa = $obj->nazwa;
		$opis = $obj->opis;
		
		$query = "insert into notatnik (nazwa,opis) values ('{$nazwa}','${opis}')";
	    break;
		
	case'PUT':
	$json=file_get_contents('php://input');
	$obj=json_decode($json);
   
		$nazwa = $obj->nazwa;
		$opis = $obj->opis;
		
		
		$query = "update notatnik set opis='${opis}' where nazwa='{$nazwa}'";
	    break;
	
	case'DELETE':
	$json=file_get_contents('php://input');
	$obj=json_decode($json);
   
		$nazwa = $obj->nazwa;
		$opis = $obj->opis;
		
		
		$query = "delete from notatnik where nazwa='{$nazwa}' ";
	    break;

	
	}
	
	
	
	$result = mysqli_query($con,$query);
	
	if($method =='GET'){
		if(!$id) echo '[';
		for ($i=0; $i<mysqli_num_rows($result);$i++){
			echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
		}
		if(!$id) echo ']';
		  
	}
	elseif ($method == 'POST'){
		echo json_encode($result);
	}
	elseif ($method == 'PUT'){
		echo json_encode($result);
	}	
	elseif ($method == 'DELETE'){
		echo json_encode($result);
	}
	else{
		echo mysqli_affected_rows($con);
	}
?>

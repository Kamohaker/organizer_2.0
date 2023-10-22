<?php
	require_once "dbconfig.php";
	$con = new mysqli('localhost','root','','organizer');
	$method = $_SERVER['REQUEST_METHOD'];
	$id='';
	$nazwa='';
	$num_telefonu='';
	$num_konta='';
	switch($method){
		
	case'GET':
		$query="SELECT * FROM portfel ";
		break;
		
	case'POST':
	$json=file_get_contents('php://input');
	$obj=json_decode($json);
   
		$nazwa = $obj->nazwa;
		$num_telefonu=$obj->num_telefonu;
		$num_konta=$obj->num_konta;
		
		$query = "insert into portfel (nazwa,num_telefonu,num_konta) values ('{$nazwa}','${num_telefonu}','${num_konta}')";
	break;
	
	case'PUT':
	$json=file_get_contents('php://input');
	$obj=json_decode($json);
   
		$nazwa = $obj->nazwa;
		$num_konta = $obj->num_konta;
		$num_telefonu = $obj->num_telefonu;
		
		$query = "update portfel set num_konta='${num_konta}' , num_telefonu='${num_telefonu}' where nazwa='{$nazwa}'";
	    break;
		
	case'DELETE':
		$json=file_get_contents('php://input');
		$obj=json_decode($json);
   
		$nazwa = $obj->nazwa;
		$num_konta = $obj->num_konta;
		$num_telefonu = $obj->num_telefonu;
		
		
		$query = "delete from portfel where nazwa='{$nazwa}' ";
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

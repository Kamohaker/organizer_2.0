<?php
	require_once "dbconfig.php";
	$con = new mysqli('localhost','root','','organizer');
	$method = $_SERVER['REQUEST_METHOD'];
	$id='';
	$nazwa='';
	$kiedy='';
	switch($method){
		
	case'GET':
		$query="SELECT * FROM plan ";
		break;
		
	case'POST':
	$json=file_get_contents('php://input');
	$obj=json_decode($json);
   
		$nazwa = $obj->nazwa;
		$kiedy = $obj->kiedy;
		
		$query = "insert into plan (nazwa,kiedy) values ('{$nazwa}','${kiedy}')";
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
	else{
		echo mysqli_affected_rows($con);
	}
?>

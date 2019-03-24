<?php
$id = $_POST["ID"];
$products = explode(',', $_POST["products"]);
$code = $_POST["code"];
date_default_timezone_set('UTC');
$today = date("Y-m-d");

$servername = "servername";
$username = "username";
$password = "password";
$dbname = "dbname";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection to database failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO Transactions (ClientIT, ProductID, VerificationCode, Date) VALUES ";

foreach ($products as $value) {
	if (is_numeric($value)) {
		$sql = $sql . "(" . $id . ", " . $value . ", '" . $code . "', " . $today . "), ";	
	}	
}
$sql = rtrim($sql,", ");
$result = $conn->query($sql);

if ($result) {
	$output_message = "OK";
}
else {
	$output_message = "Error: " .$sql . " |||| " .$conn->error;
}

$conn->close();

echo $output_message;
?>

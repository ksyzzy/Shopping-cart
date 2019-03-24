<?php
$id = $_POST["ID"];
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

$sql = "SELECT ProductID, Price FROM Products";

if (!empty($id)) {
	$sql2 = "SELECT ProductID FROM Transactions WHERE ClientID = " . $id;
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
		$data = $data . $row["ProductID"]. ",";
		$data2 = $data2 . $row["Price"]. ",";
		
    }
} else {
    echo "0 results";
}

if (!empty($id)) {
	$result = $conn->query($sql2);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$data3 = $data3 . $row["ProductID"]. ",";
		}
	}
	$output_data->specific=rtrim($data3,", ");
}
$output_data->id=rtrim($data,", ");
$output_data->price=rtrim($data2,", ");
$conn->close();

echo json_encode($output_data);
?>

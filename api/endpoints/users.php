<?php
include_once '../config/database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $user->getAll();
        $users = array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $user_item = array(
                "id" => $row['id'],
                "username" => $row['username'],
                "type" => $row['type'],
                "name" => $row['name']
            );
            array_push($users, $user_item);
        }
        
        http_response_code(200);
        echo json_encode($users);
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        $user->username = $data->username;
        $user->password = $data->password;
        $user->type = $data->type;
        $user->name = $data->name;
        
        if($user->create()) {
            http_response_code(201);
            echo json_encode(array("message" => "User created successfully"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create user"));
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
?>

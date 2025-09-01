<?php
include_once '../config/database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if($data->action === 'login') {
            if($user->login($data->username, $data->password)) {
                $user_arr = array(
                    "id" => $user->id,
                    "username" => $user->username,
                    "type" => $user->type,
                    "name" => $user->name
                );
                
                http_response_code(200);
                echo json_encode(array("success" => true, "user" => $user_arr));
            } else {
                http_response_code(401);
                echo json_encode(array("success" => false, "message" => "Invalid credentials"));
            }
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
?>

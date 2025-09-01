<?php
include_once '../config/database.php';
include_once '../models/Equipment.php';

$database = new Database();
$db = $database->getConnection();
$equipment = new Equipment($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if(isset($_GET['code'])) {
            $result = $equipment->getByCode($_GET['code']);
            if($result) {
                http_response_code(200);
                echo json_encode($result);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Equipment not found"));
            }
        } else {
            $stmt = $equipment->getAll();
            $equipment_list = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $equipment_item = array(
                    "id" => $row['id'],
                    "name" => $row['name'],
                    "code" => $row['code'],
                    "type" => $row['type'],
                    "status" => $row['status'],
                    "position" => array(
                        "x" => floatval($row['position_x']),
                        "y" => floatval($row['position_y'])
                    ),
                    "tableNumber" => $row['table_number'],
                    "side" => $row['side'],
                    "row" => $row['row_number'],
                    "seat" => $row['seat'],
                    "room" => $row['room'],
                    "building" => $row['building'],
                    "floor" => $row['floor']
                );
                array_push($equipment_list, $equipment_item);
            }
            
            http_response_code(200);
            echo json_encode($equipment_list);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        $equipment->name = $data->name;
        $equipment->code = $data->code;
        $equipment->type = $data->type;
        $equipment->status = $data->status ?? 'working';
        $equipment->position_x = $data->position->x ?? 0;
        $equipment->position_y = $data->position->y ?? 0;
        $equipment->table_number = $data->tableNumber;
        $equipment->room = $data->room;
        $equipment->building = $data->building;
        $equipment->floor = $data->floor;
        
        if($equipment->create()) {
            http_response_code(201);
            echo json_encode(array("message" => "Equipment created successfully"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create equipment"));
        }
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        
        $equipment->id = $data->id;
        $equipment->name = $data->name;
        $equipment->type = $data->type;
        $equipment->status = $data->status;
        $equipment->position_x = $data->position->x;
        $equipment->position_y = $data->position->y;
        $equipment->table_number = $data->tableNumber;
        $equipment->room = $data->room;
        $equipment->building = $data->building;
        $equipment->floor = $data->floor;
        
        if($equipment->update()) {
            http_response_code(200);
            echo json_encode(array("message" => "Equipment updated successfully"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update equipment"));
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
?>

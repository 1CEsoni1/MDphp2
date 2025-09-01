<?php
include_once '../config/database.php';
include_once '../models/RepairRequest.php';

$database = new Database();
$db = $database->getConnection();
$repair_request = new RepairRequest($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if(isset($_GET['technician_id'])) {
            $stmt = $repair_request->getByTechnician($_GET['technician_id']);
        } else {
            $stmt = $repair_request->getAll();
        }
        
        $requests = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $request_item = array(
                "id" => $row['id'],
                "equipmentCode" => $row['equipment_code'],
                "equipmentName" => $row['equipment_name'],
                "location" => $row['location'],
                "status" => $row['status'],
                "description" => $row['description'],
                "reporter" => $row['reporter'],
                "assignedTo" => $row['assigned_to'],
                "assignedToName" => $row['assigned_to_name'],
                "priority" => $row['priority'],
                "createdDate" => $row['created_date'],
                "assignedDate" => $row['assigned_date'],
                "completedDate" => $row['completed_date'],
                "images" => json_decode($row['images']),
                "notes" => json_decode($row['notes'])
            );
            array_push($requests, $request_item);
        }
        
        http_response_code(200);
        echo json_encode($requests);
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        $repair_request->equipment_code = $data->equipmentCode;
        $repair_request->equipment_name = $data->equipmentName;
        $repair_request->location = $data->location;
        $repair_request->description = $data->description;
        $repair_request->reporter = $data->reporter;
        $repair_request->priority = $data->priority ?? 'medium';
        $repair_request->images = json_encode($data->images ?? []);
        
        if($repair_request->create()) {
            http_response_code(201);
            echo json_encode(array("message" => "Repair request created successfully"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create repair request"));
        }
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        
        $repair_request->id = $data->id;
        $repair_request->status = $data->status;
        $repair_request->assigned_to = $data->assignedTo;
        $repair_request->notes = json_encode($data->notes ?? []);
        $repair_request->assigned_date = ($data->status === 'assigned') ? date('Y-m-d H:i:s') : $data->assignedDate;
        $repair_request->completed_date = ($data->status === 'completed') ? date('Y-m-d H:i:s') : $data->completedDate;
        
        if($repair_request->update()) {
            http_response_code(200);
            echo json_encode(array("message" => "Repair request updated successfully"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update repair request"));
        }
        break;
        
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $repair_request->id = $data->id;
        
        if($repair_request->delete()) {
            http_response_code(200);
            echo json_encode(array("message" => "Repair request deleted successfully"));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to delete repair request"));
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}
?>

<?php
class RepairRequest {
    private $conn;
    private $table_name = "repair_requests";

    public $id;
    public $equipment_code;
    public $equipment_name;
    public $location;
    public $status;
    public $description;
    public $reporter;
    public $assigned_to;
    public $priority;
    public $created_date;
    public $assigned_date;
    public $completed_date;
    public $images;
    public $notes;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT r.*, u.name as assigned_to_name 
                  FROM " . $this->table_name . " r 
                  LEFT JOIN users u ON r.assigned_to = u.id 
                  ORDER BY r.created_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getByTechnician($technician_id) {
        $query = "SELECT r.*, u.name as assigned_to_name 
                  FROM " . $this->table_name . " r 
                  LEFT JOIN users u ON r.assigned_to = u.id 
                  WHERE r.assigned_to = ? 
                  ORDER BY r.created_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $technician_id);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET equipment_code=:equipment_code, equipment_name=:equipment_name, 
                      location=:location, description=:description, reporter=:reporter, 
                      priority=:priority, images=:images";
        $stmt = $this->conn->prepare($query);

        $this->equipment_code = htmlspecialchars(strip_tags($this->equipment_code));
        $this->equipment_name = htmlspecialchars(strip_tags($this->equipment_name));
        $this->location = htmlspecialchars(strip_tags($this->location));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->reporter = htmlspecialchars(strip_tags($this->reporter));
        $this->priority = htmlspecialchars(strip_tags($this->priority));

        $stmt->bindParam(":equipment_code", $this->equipment_code);
        $stmt->bindParam(":equipment_name", $this->equipment_name);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":reporter", $this->reporter);
        $stmt->bindParam(":priority", $this->priority);
        $stmt->bindParam(":images", $this->images);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET status=:status, assigned_to=:assigned_to, notes=:notes,
                      assigned_date=:assigned_date, completed_date=:completed_date
                  WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":assigned_to", $this->assigned_to);
        $stmt->bindParam(":notes", $this->notes);
        $stmt->bindParam(":assigned_date", $this->assigned_date);
        $stmt->bindParam(":completed_date", $this->completed_date);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>

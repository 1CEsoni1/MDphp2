<?php
class Equipment {
    private $conn;
    private $table_name = "equipment";

    public $id;
    public $name;
    public $code;
    public $type;
    public $status;
    public $position_x;
    public $position_y;
    public $table_number;
    public $side;
    public $row_number;
    public $seat;
    public $room;
    public $building;
    public $floor;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY name";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getByCode($code) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE code = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $code);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET name=:name, code=:code, type=:type, status=:status, 
                      position_x=:position_x, position_y=:position_y, 
                      table_number=:table_number, room=:room, building=:building, floor=:floor";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->code = htmlspecialchars(strip_tags($this->code));
        $this->type = htmlspecialchars(strip_tags($this->type));
        $this->status = htmlspecialchars(strip_tags($this->status));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":code", $this->code);
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":position_x", $this->position_x);
        $stmt->bindParam(":position_y", $this->position_y);
        $stmt->bindParam(":table_number", $this->table_number);
        $stmt->bindParam(":room", $this->room);
        $stmt->bindParam(":building", $this->building);
        $stmt->bindParam(":floor", $this->floor);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET name=:name, type=:type, status=:status, 
                      position_x=:position_x, position_y=:position_y, 
                      table_number=:table_number, room=:room, building=:building, floor=:floor
                  WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->type = htmlspecialchars(strip_tags($this->type));
        $this->status = htmlspecialchars(strip_tags($this->status));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":position_x", $this->position_x);
        $stmt->bindParam(":position_y", $this->position_y);
        $stmt->bindParam(":table_number", $this->table_number);
        $stmt->bindParam(":room", $this->room);
        $stmt->bindParam(":building", $this->building);
        $stmt->bindParam(":floor", $this->floor);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>

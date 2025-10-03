<?php
class User {
    private $conn;
    private $table_name = "tb_users";

    public $id;
    public $username;
    public $password;
    public $type;
    public $name;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login($username, $password) {
        $query = "SELECT id, username, password, type_id, name FROM " . $this->table_name . " WHERE username = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $username);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($row && password_verify($password, $row['password'])) {
            $this->id = $row['id'];
            $this->username = $row['username'];
            $this->type = $row['type_id'];
            $this->name = $row['name'];
            return true;
        }
        return false;
    }

    public function getAll() {
        $query = "SELECT id, username, type_id, name FROM " . $this->table_name . " ORDER BY name";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET username=:username, password=:password, type=:type, name=:name";
        $stmt = $this->conn->prepare($query);

        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        $this->type = htmlspecialchars(strip_tags($this->type));
        $this->name = htmlspecialchars(strip_tags($this->name));

        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":name", $this->name);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>

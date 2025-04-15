<?php
    class Conectar{
        private $data = array();
        public $rows = array();
        private $conn;
        function __construct(){
          $this->data = array("host" => "localhost",
                              "user"=>"root",
                              "pass"=>"sanguisetcinis",
                              "database"=>"reporte_empresas");
          $this->conn = new mysqli($this->data["host"],$this->data["user"],$this->data["pass"],$this->data["database"]);
        }
        private function close_connection() {
          $this->conn->close();
        }
        public function consultaSimple($sql) {
            $this->conn->query($sql);
            $this->close_connection();
            return true;
        }
        public function consultaRetorno($sql) {
            $result = $this->conn->query($sql);
            while ($this->rows[] = $result->fetch_assoc());
            $result->close();
            $this->close_connection();
            array_pop($this->rows);
            return $this->rows;
        }
    }
 ?>
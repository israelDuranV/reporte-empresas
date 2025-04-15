<?php
ini_set('memory_limit', '-1');
try {
  require_once '../Core/Conectar.php';
  class DataReporteEmpresas extends Conectar
  {
    public function getEmpleados(){
      return $this->consultaRetorno('CALL sp_consultaEmpleados(0,0,"INDEX","","","","",0,"1997-01-01","",0,"","","",0,0,0,0);');
    }
    public function getEmpresas(){
      return $this->consultaRetorno("SELECT * FROM empresas");
    }
    public function getDepartamentos(){
      return $this->consultaRetorno("SELECT * FROM departamentos");
    }
    public function getCargos(){
      return $this->consultaRetorno("SELECT * FROM cargos");
    }
    public function actualizarEmpleado($datos){
      return $this->consultaRetorno("CALL sp_consultaEmpleados($datos->id,$datos->idDireccion,'UPDATE', '$datos->nombre','$datos->paterno', '$datos->materno', '$datos->email', '$datos->telefono', 
              '$datos->nacimiento','$datos->calle','$datos->numero','$datos->ciudad','$datos->estado','$datos->pais',
              $datos->salario,$datos->empresa,$datos->departamento,$datos->cargo);");
    }
    public function guardarEmpleado($datos){
      return $this->consultaRetorno("CALL sp_consultaEmpleados(0,0,'STORE', '$datos->nombre','$datos->paterno', '$datos->materno', '$datos->email', '$datos->telefono', 
              '$datos->nacimiento','$datos->calle','$datos->numero','$datos->ciudad','$datos->estado','$datos->pais',
              $datos->salario,$datos->empresa,$datos->departamento,$datos->cargo);");
    }
    public function eliminarEmpleado($id){
      return $this->consultaRetorno("CALL sp_consultaEmpleados($id,0,'DELETE','','','','',0,'1997-01-01','',0,'','','',0,0,0,0);");
    }
  }
}catch (Exception $e) {
  return $e->getMessage();
}



?>
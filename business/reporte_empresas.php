<?php

  require_once '../data/reporte_empresas.php';

  class businessReporteEmpresas extends DataReporteEmpresas
  {
    public function init()
    {
      try {
        $objRespuesta = new stdClass;
         $datos        = json_decode($_POST['datosRegistro']);
         $accion       = $datos->accion;
         switch ($accion) {
             case 'tablaEmpleados':
               $datosRetorno = $this->getEmpleados();
               $msj          = "Empleados consultados correctamente.";
             break;
             case 'getEmpresas':
              $datosRetorno = $this->getEmpresas();
              $msj          = "Empresas consultadas correctamente.";
            break;
            case 'getDepartamentos':
              $datosRetorno = $this->getDepartamentos();
              $msj          = "Departamentos consultadas correctamente.";
            break;
            case 'getCargos':
              $datosRetorno = $this->getCargos();
              $msj          = "Departamentos consultadas correctamente.";
            break;
            case 'editarEmpleado':
              $datosRetorno = $this->actualizarEmpleado($datos);
              $msj          = "Empleado editado correctamente.";
            break;
            case 'guardarEmpleado':
              $datosRetorno = $this->guardarEmpleado($datos);
              $msj          = "Empleado ingresado correctamente.";
            break;
            case 'eliminarEmpleado':
              $datosRetorno = $this->eliminarEmpleado($datos->id);
              $msj          = "Empleado ingresado correctamente.";
            break;
           default:
             throw new Exception("Acción no definida");
         }

         $objRespuesta->Error      = false;
         $objRespuesta->Contador   = count($datosRetorno);
         $objRespuesta->Mensaje    = $msj;
         $objRespuesta->Datos      = $datosRetorno;
      }
      catch (Exception $e) {
       $objRespuesta->Error   = true;
       $objRespuesta->Mensaje = $e->getMessage();
      }

      echo json_encode($objRespuesta);
    }

  }

  $businness = new businessReporteEmpresas();
  $businness->init();

?>

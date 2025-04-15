try {
    var $tbodyEmpleados = $('tbody#tbodyEmpleados');
    var $urlController = 'business/reporte_empresas.php';
    var $empresas = $("#empresas");
    var $departamentos = $("#departamentos");
    var $cargos = $("#cargos");

    var $fnJS = {
        ajaxModulo: function(accion, obj) {
            // defino variables comunes
            let objRetorno, Error, Mensaje, html, Contador;
            let _this = this;
            // creacion de objeto con una accion
            let datosRegistro = { 'accion': accion };
            switch (accion) { // switch accion
                case 'tablaEmpleados':
                    datosRegistro.idProyecto = 1;
                    //datosRegistro.idProyecto = obj.idProyecto;
                break;
                case 'getEmpresas':
                    datosRegistro.idProyecto = 1;
                    //datosRegistro.idProyecto = obj.idProyecto;
                break;
                case 'selectDepartamentos':
                    datosRegistro.idProyecto = 1;
                    //datosRegistro.idProyecto = obj.idProyecto;
                break;
                case 'selectCargos':
                    datosRegistro.idProyecto = 1;
                    //datosRegistro.idProyecto = obj.idProyecto;
                break;
                case 'eliminarEmpleado':
                    datosRegistro.id = obj.id;
                break;
                case 'editarEmpleado':
                    datosRegistro.id = obj.id;
                    datosRegistro.idDireccion = obj.idDireccion;
                    datosRegistro.nombre = obj.nombre;
                    datosRegistro.paterno = obj.paterno;
                    datosRegistro.materno = obj.materno;
                    datosRegistro.email = obj.email;
                    datosRegistro.telefono = obj.telefono;
                    datosRegistro.nacimiento = obj.nacimiento;
                    datosRegistro.calle = obj.calle;
                    datosRegistro.numero = obj.numero;
                    datosRegistro.ciudad = obj.ciudad;
                    datosRegistro.estado = obj.estado;
                    datosRegistro.pais = obj.pais;
                    datosRegistro.salario = obj.salario;
                    datosRegistro.empresa = obj.empresa;
                    datosRegistro.departamento = obj.departamento;
                    datosRegistro.cargo = obj.cargo;
                break;
                case 'guardarEmpleado':
                    datosRegistro.nombre = obj.nombre;
                    datosRegistro.paterno = obj.paterno;
                    datosRegistro.materno = obj.materno;
                    datosRegistro.email = obj.email;
                    datosRegistro.telefono = obj.telefono;
                    datosRegistro.nacimiento = obj.nacimiento;
                    datosRegistro.calle = obj.calle;
                    datosRegistro.numero = obj.numero;
                    datosRegistro.ciudad = obj.ciudad;
                    datosRegistro.estado = obj.estado;
                    datosRegistro.pais = obj.pais;
                    datosRegistro.salario = obj.salario;
                    datosRegistro.empresa = obj.empresa;
                    datosRegistro.departamento = obj.departamento;
                    datosRegistro.cargo = obj.cargo;
                break;
            }
            // Llamado ajax
            $.ajax({
                beforeSend: function() { console.log("enviando..") },
                url: $urlController,
                data: { 'datosRegistro': JSON.stringify(datosRegistro) },
                type: 'POST',
                dataType: 'json',
                success: function(p, estado, xhr) { // success
                    // Asigna el objeto de retorno
 
                    objRetorno = JSON.parse(p);
                    Datos = objRetorno.Datos;
                    Mensaje = objRetorno.Mensaje;
                    Error = objRetorno.Error;
                    Contador = Number(objRetorno.Contador);
                   
                    // Valida la existencia de registros
                    if (Contador === 0) { $alert('No existen registros.'); return false; }
                    
                    switch (accion) { // switch accion
                        case 'tablaEmpleados':
                            console.log(Datos);
                            $tbodyEmpleados.html("");
                             $.each(Datos, function(index, i) {
                                html += `<tr>
                                            <td>${i.id}</td>
                                            <td>${i.nombre}</td>
                                            <td>${i.paterno}</td>
                                            <td>${i.materno}</td>
                                            <td>${i.email}</td>
                                            <td>${i.telefono}</td>
                                             <td><button type="button" class="btn btn-warning btn-editar" 
                                                 data-id="${i.id}"
                                                 data-nombre="${i.nombre}"
                                                 data-paterno="${i.paterno}"
                                                 data-materno="${i.materno}"
                                                 data-email="${i.email}"
                                                 data-telefono="${i.telefono}"
                                                data-nacimiento="${i.fecha_nacimiento}"
                                                 data-calle="${i.calle}"
                                                 data-numero="${i.numero}"
                                                 data-ciudad="${i.ciudad}"
                                                 data-estado="${i.estado}"
                                                data-pais="${i.pais}"
                                                 data-salario="${i.salario}"
                                                 data-departamento="${i.departamento_id}"
                                                 data-empresa="${i.empresa_id}"
                                                 data-cargo="${i.cargos_id}"
                                                 data-direccionid="${i.direccion_id}"
                                                  data-bs-toggle="modal" 
                                                  data-bs-target="#editarEmpleadoModal">
                                                    Editar
                                                </button>
                                                <button class="btn btn-danger btn-eliminar"
                                                   data-id="${i.id}">Eliminar
                                                </button>
                                            </td>
                                            </tr>`;
                            });
                            /*var table = $tbodyEmpleados.parent().DataTable();
                            table.destroy();
                            */$tbodyEmpleados.html(html);
                            /*
                            $tbodyEmpleados.parent().DataTable({
                                "language": { "url": "config/Spanish.json" },
                                "pageLength": 50
                            });*/
                            break;
                            case 'getEmpresas':
                                console.log(Datos);
                                const selectEmpresas = document.getElementById("empresa");
                                const selectEmpresasEditar = document.getElementById("empresaEditar");
                                $.each(Datos, function(index, i) {
                                    let option = document.createElement("option");
                                    option.value = i.id;
                                    option.textContent = i.nombre;
                                    selectEmpresas.appendChild(option);
                                    selectEmpresasEditar.appendChild(option);
                                });
                            break;
                            case 'getDepartamentos':
                                console.log(Datos);
                                const selectDepartamentos = document.getElementById("departamento");
                                const selectDepartamentosEditar = document.getElementById("departamentoEditar");
                                $.each(Datos, function(index, i) {
                                    let option = document.createElement("option");
                                    option.value = i.id;
                                    option.textContent = i.name;
                                    selectDepartamentos.appendChild(option);
                                    selectDepartamentosEditar.appendChild(option);
                                });
                            break;
                            case 'getCargos':
                                console.log(Datos);
                                const selectCargos = document.getElementById("cargo");
                                const selectCargosEditar = document.getElementById("cargoEditar");

                                $.each(Datos, function(index, i) {
                                    let option = document.createElement("option");
                                    option.value = i.id;
                                    option.textContent = i.name;
                                    selectCargos.appendChild(option);
                                    selectCargosEditar.appendChild(option);
                                });
                            break;
                            case 'eliminarEmpleado':
                            case 'editarEmpleado':
                            case 'guardarEmpleado':
                                let obj = {};
                                $fnJS.ajaxModulo('tablaEmpleados', obj);
                            break;
                    }
                }, // success
                // Informa el error interno al usuario
                error: function(xhr, estado, errata) {
                    console.log(xhr.statusText);
                    $gl.closeLoad();
                    return false;
                },
                dataType: 'html'
            }); // Termina la llamada AJAX
        }
    };

    jQuery(document).ready(function($) {
        let obj = {};
        $fnJS.ajaxModulo('getEmpresas', obj);
        $fnJS.ajaxModulo('getDepartamentos', obj);
        $fnJS.ajaxModulo('getCargos', obj);
        $fnJS.ajaxModulo('tablaEmpleados', obj);
    });
    let formatoDate = (fechaOriginal)=>{
        const fecha = new Date(fechaOriginal);

        // Obtener los valores formateados
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Asegurar dos dígitos
        const dia = String(fecha.getDate()).padStart(2, '0');

        return `${anio}-${mes}-${dia}`;

    };
    $(document).on('click','button.btn-editar',(event)=>{
        event.preventDefault();
        let id = event.target.attributes['data-id'].nodeValue;
        let nombre = event.target.attributes['data-nombre'].nodeValue;
        let paterno = event.target.attributes['data-paterno'].nodeValue;
        let materno = event.target.attributes['data-materno'].nodeValue;
        let email = event.target.attributes['data-email'].nodeValue;
        let telefono = event.target.attributes['data-telefono'].nodeValue;
        let nacimiento = event.target.attributes['data-nacimiento'].nodeValue;
        let calle = event.target.attributes['data-calle'].nodeValue;
        let numero = event.target.attributes['data-numero'].nodeValue;
        let ciudad = event.target.attributes['data-ciudad'].nodeValue;
        let estado = event.target.attributes['data-estado'].nodeValue;
        let pais = event.target.attributes['data-pais'].nodeValue;
        let salario = event.target.attributes['data-salario'].nodeValue;
        let empresa = event.target.attributes['data-empresa'].nodeValue;
        let departamento = event.target.attributes['data-departamento'].nodeValue;
        let cargo = event.target.attributes['data-cargo'].nodeValue;
        let idDireccion = event.target.attributes['data-direccionid'].nodeValue;

        $("#idEditar").val(id);
        $("#idDireccion").val(idDireccion);
        $("#nombreEditar").val(nombre);
        $("#paternoEditar").val(paterno);
        $("#maternoEditar").val(materno);
        $("#emailEditar").val(email);
        $("#telefonoEditar").val(telefono);
        $("#nacimientoEditar").val(formatoDate(nacimiento));
        $("#calleEditar").val(calle);
        $("#numeroEditar").val(numero);
        $("#ciudadEditar").val(ciudad);
        $("#estadoEditar").val(estado);
        $("#paisEditar").val(pais);
        $("#salarioEditar").val(salario);
        $("#empresaEditar").val(empresa);
        $("#departamentoEditar").val(departamento);
        $("#cargoEditar").val(cargo);
    });
    $(document).on('click','button.btn-eliminar',(event)=>{
        let id = event.target.attributes['data-id'].nodeValue;
        let obj = {};
        obj.id = id;
        $fnJS.ajaxModulo('eliminarEmpleado', obj);
    });
    $("#enviarEditarEmpleado").on("click",function(){
        let obj = {};
        obj.id = $("#idEditar").val();
        obj.idDireccion = $("#idDireccion").val();
        obj.nombre = $("#nombreEditar").val();
        obj.paterno = $("#paternoEditar").val();
        obj.materno = $("#maternoEditar").val();
        obj.email = $("#emailEditar").val();
        obj.telefono = $("#telefonoEditar").val();
        obj.nacimiento = $("#nacimientoEditar").val();
        obj.calle = $("#calleEditar").val();
        obj.numero = $("#numeroEditar").val();
        obj.ciudad = $("#ciudadEditar").val();
        obj.estado = $("#estadoEditar").val();
        obj.pais = $("#paisEditar").val();
        obj.salario = $("#salarioEditar").val();
        obj.empresa = $("#empresaEditar").val();
        obj.departamento = $("#departamentoEditar").val();
        obj.cargo = $("#cargoEditar").val();
        $fnJS.ajaxModulo('editarEmpleado', obj);
    });
    $("#guardarNuevoEmpledo").on("click",function(){
        let obj = {};
        obj.nombre = $("#nombre").val();
        obj.paterno = $("#paterno").val();
        obj.materno = $("#materno").val();
        obj.email = $("#email").val();
        obj.telefono = $("#telefono").val();
        obj.nacimiento = $("#nacimiento").val();
        obj.calle = $("#calle").val();
        obj.numero = $("#numero").val();
        obj.ciudad = $("#ciudad").val();
        obj.estado = $("#estado").val();
        obj.pais = $("#pais").val();
        obj.salario = $("#salario").val();
        obj.empresa = $("#empresa").val();
        obj.departamento = $("#departamento").val();
        obj.cargo = $("#cargo").val();
        $fnJS.ajaxModulo('guardarEmpleado', obj);
    });
} catch (err) {
    console.log('reporte_empresas.js: ' + err.message)
}
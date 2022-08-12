var UrlClientes='http://20.216.41.245:90/G2_20/controller/Cliente.php?opc=GetClientes';
var UrlInsertCliente='http://20.216.41.245:90/G2_20/controller/Cliente.php?opc=InsertCliente';
var UrlGetCliente='http://20.216.41.245:90/G2_20/controller/Cliente.php?opc=GetCliente';
var UrlUpdateCliente='http://20.216.41.245:90/G2_20/controller/Cliente.php?opc=UpdateCliente';
var UrlDeleteCliente='http://20.216.41.245:90/G2_20/controller/Cliente.php?opc=DeleteCliente'

$(document).ready(function(){
    CargarClientes();
});

function CargarClientes(){
    $.ajax({
        url: UrlClientes,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores= '';

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].Numero_Cliente +'</td>'+
                '<td>'+ MiItems[i].Nombre +'</td>'+
                '<td>'+ MiItems[i].Apellidos +'</td>'+
                '<td>'+ MiItems[i].Fecha_Registro +'</td>'+
                '<td>'+ MiItems[i].Direccion_Cliente +'</td>'+
                '<td>'+ MiItems[i].RTN +'</td>'+
                '<td>'+ MiItems[i].Email +'</td>'+
                '<td>'+ 
                '<button class="btn btn-info" onclick="CargarCliente('+ MiItems[i].Numero_Cliente +')">EDITAR</button>'+
                '</td>'+
                '<td>'+ 
                '<button class="btn btn-danger" onclick="EliminarCliente('+MiItems[i].Numero_Cliente+')">ELIMINAR</button>'+
                '</td>'+
            '</tr>';
            $('#DataClientes').html(Valores);
            }

        }

    });
}

function AgregarCliente(){
    var datoscliente = {
        Numero_Cliente: $('#Numero_Cliente').val(),
        Nombre: $('#Nombre').val(),
        Apellidos: $('#Apellidos').val(),
        Fecha_Registro: $('#Fecha_Registro').val(),
        Direccion_Cliente: $('#Direccion_Cliente').val(),
        RTN: $('#RTN').val(),
        Email:$('#Email').val()
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlInsertCliente,
        type: 'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Cliente Agregado Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar cliente'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarCliente(cliente){

    var datoscliente={
        Numero_Cliente:cliente
    };
    var datosclientejson=JSON.stringify(datoscliente);
    

    $.ajax({
        url:UrlGetCliente,
        type:'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            var MiItems=reponse;
            $('#Numero_Cliente').val(MiItems[0].Numero_Cliente);
            $('#Nombre').val(MiItems[0].Nombre);
            $('#Apellidos').val(MiItems[0].Apellidos);
            $('#Fecha_Registro').val(MiItems[0].Fecha_Registro);
            $('#Direccion_Cliente').val(MiItems[0].Direccion_Cliente);
            $('#RTN').val(MiItems[0].RTN);
            $('#Email').val(MiItems[0].Email);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarCliente('+MiItems[0].Numero_Cliente+')"'+
            'value="Actualizar Cliente" class="btn btn-primary"></input>';
            $('#btnagregarcliente').html(btnactualizar);
        }


    });
}

function ActualizarCliente(cliente){
    var datoscliente = {
        Numero_Cliente:cliente,
        Nombre: $('#Nombre').val(),
        Apellidos: $('#Apellidos').val(),
        Fecha_Registro: $('#Fecha_Registro').val(),
        Direccion_Cliente: $('#Direccion_Cliente').val(),
        RTN: $('#RTN').val(),
        Email:$('#Email').val()
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlUpdateCliente,
        type: 'PUT',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Cliente Actualizado');
        },
        error: function(textStatus, errorThrown){
            alert('Error al actualizar cliente'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarCliente(cliente){
    var datoscliente = {
        Numero_Cliente:cliente
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlDeleteCliente,
        type: 'DELETE',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse)
        },
        Error:function(textStatus, errorthrown ){
            alert('Error al eliminar Cliente'+ textStatus + errorthrown);
        }
    });
    alert("Cliente Eliminado");
    CargarClientes();
}
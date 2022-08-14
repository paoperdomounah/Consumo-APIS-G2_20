var UrlPedidos = 'http://20.216.41.245:90/G2_20/controller/pedido.php?opc=GetPedidos';
var UrlInsertPedido = 'http://20.216.41.245:90/G2_20/controller/pedido.php?opc=InsertPedido';
var UrlGetPedido = 'http://20.216.41.245:90/G2_20/controller/pedido.php?opc=Getpedido';
var UrlUpdatePedido = 'http://20.216.41.245:90/G2_20/controller/pedido.php?opc=UpdatePedido';
var UrlDeletePedido = 'http://20.216.41.245:90/G2_20/controller/pedido.php?opc=DeletePedido';

$(document).ready(function(){
    CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MisItems = reponse;
            var Valores = '';

            for(i=0; i<MisItems.length; i++){
                Valores +=  '<tr>' +
                '<td>'+ MisItems[i].Numero_Pedido + '</td>'+
                '<td>'+ MisItems[i].Numero_Cliente + '</td>'+
                '<td>'+ MisItems[i].Empresa + '</td>'+
                '<td>'+ MisItems[i].Fecha_Pedido + '</td>'+
                '<td>'+ MisItems[i].Direccion + '</td>'+
                '<td>'+ MisItems[i].Tipo_Pago + '</td>'+
                '<td>'+ MisItems[i].Monto_Total + '</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarPedido('+ MisItems[i].Numero_Pedido +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarPedido('+ MisItems[i].Numero_Pedido +')">Eliminar</button>'+
                '</td>'+
            '</tr>';   
            $('#DataPedidos').html(Valores);
            }
        }
    });
}

function AgregarPedido(){
    var datospedido = {
        Numero_Pedido :$('#Numero_Pedido').val(),
        Numero_Cliente:$('#Numero_Cliente').val(),
        Empresa:$('#Empresa').val(),
        Fecha_Pedido:$('#Fecha_Pedido').val(),
        Direccion:$('#Direccion').val(),
        Tipo_Pago:$('#Tipo_Pago').val(),
        Monto_Total:$('#Monto_Total').val()
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlInsertPedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Pedido Agregado con Exito');
        },
        error: function(textStatus, errorThrown ){
            alert('El Pedido no se pudo Agregar'+ textStatus + errorThrown);

        }

    });
    alert('Aviso');
}

function CargarPedido(numeropedido){
    var datospedido ={
        Numero_Pedido: numeropedido 
    };

    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlGetPedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            var MisItems = response;
            $('#Numero_Pedido').val(MisItems[0].Numero_Pedido);
            $('#Numero_Cliente').val(MisItems[0].Numero_Cliente);
            $('#Empresa').val(MisItems[0].Empresa);
            $('#Fecha_Pedido').val(MisItems[0].Fecha_Pedido);
            $('#Direccion').val(MisItems[0].Direccion);
            $('#Tipo_Pago').val(MisItems[0].Tipo_Pago);
            $('#Monto_Total').val(MisItems[0].Monto_Total);

            var btnactualizar = '<input type= "submit" id="btn_actualizar" onclick="ActualizarPedido(' + MisItems[0].Numero_Pedido + ')"'+
            'value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('#btnagregarpedido').html(btnactualizar);
        }

    });
}

function ActualizarPedido (numeropedido){
    var datospedido ={
        Numero_Pedido : numeropedido,
        Numero_Cliente:$('#Numero_Cliente').val(),
        Empresa:$('#Empresa').val(),
        Fecha_Pedido:$('#Fecha_Pedido').val(),
        Direccion:$('#Direccion').val(),
        Tipo_Pago:$('#Tipo_Pago').val(),
        Monto_Total:$('#Monto_Total').val()
    };

    var datospedidojson = JSON.stringify(datospedido);

    $.ajax ({
        url: UrlUpdatePedido,
        type: 'PUT',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Pedido Actualizado con Exito");
        },
        error: function(textStatus, errorThrown){
            alert('Error al Actualizar el Pedido'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarPedido(numeropedido){
    var datospedido ={
        Numero_Pedido : numeropedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlDeletePedido,
        type: 'DELETE',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);
        }
    });
    alert("Pedido Eliminado con Exito");
    CargarPedidos();
}
var UrlPagos='http://20.216.41.245:90/G2_20/controller/pago.php?opc=get_pagos';
var UrlInsertPago='http://20.216.41.245:90/G2_20/controller/pago.php?opc=insert_Pago';
var UrlPago='http://20.216.41.245:90/G2_20/controller/pago.php?opc=get_pago';
var UrlUpdatePago='http://20.216.41.245:90/G2_20/controller/pago.php?opc=update_pago';
var UrlDeletePago='http://20.216.41.245:90/G2_20/controller/pago.php?opc=delete_pago'

$(document).ready(function(){
    CargarPagos();
});

function CargarPagos(){
    $.ajax({
        url:UrlPagos,
        type:'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems=reponse;
            var Valores='';

            for(i=0; i<MiItems.length; i++){

                Valores +=   '<tr>'+
                '<td>'+ MiItems[i].NumeroPago +'</td>'+
                '<td>'+ MiItems[i].FechaPago +'</td>'+
                '<td>'+ MiItems[i].MontoPago +'</td>'+
                '<td>'+ MiItems[i].TipoPago +'</td>'+
                '<td>'+ MiItems[i].Numero_Pedido +'</td>'+
                '<td>'+ MiItems[i].Empresa +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarPago('+ MiItems[i].NumeroPago+')">EDITAR</button>'+
                '<td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarPago('+ MiItems[i].NumeroPago+')">ELIMINAR</button>'+
                '<td>'+
           
            '</tr>';
            $('#DataPagos').html(Valores);
            }
        }
    });
    
}

function AgregarPago(){
    var datospago={

        NumeroPago:$('#NumeroPago').val(),
        FechaPago:$('#FechaPago').val(),
        MontoPago:$('#MontoPago').val(),
        TipoPago:$('#TipoPago').val(),
        Numero_Pedido:$('#Numero_Pedido').val(),
        Empresa:$('#Empresa').val()
    
    };
    var datospagojson=JSON.stringify(datospago);


    $.ajax({
        url:UrlInsertPago,
        type:'POST',
        data: datospagojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Pago agregado correctamente');
        },
        Error:function(textStatus, errorthrown ){
            alert('Error al agregar pago'+ textStatus + errorthrown);
        }
    });
    alert('Aviso');

}

function CargarPago(NumeroPago){

    var datospago={
        NumeroPago:NumeroPago
    };
    var datospagojson=JSON.stringify(datospago);

    $.ajax({
        url:UrlPago,
        type:'POST',
        data: datospagojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            var MiItems=reponse;
            $('#NumeroPago').val(MiItems[0].NumeroPago);
            $('#FechaPago').val(MiItems[0].FechaPago);
            $('#MontoPago').val(MiItems[0].MontoPago);
            $('#TipoPago').val(MiItems[0].TipoPago);
            $('#Numero_Pedido').val(MiItems[0].Numero_Pedido);
            $('#Empresa').val(MiItems[0].Empresa);
            var btnActualizar='<input type="submit" id="btn_actualizar" onclick="ActualizarPago('+MiItems[0].NumeroPago+')"'+
            'value="Actualizar Pago" class="btn btn-primary"><input>';
            $('#btnagregarpago').html(btnActualizar);
        }
       
    });

}

function ActualizarPago (NumeroPago){

    var datospago={

        NumeroPago:NumeroPago,
        FechaPago:$('#FechaPago').val(),
        MontoPago:$('#MontoPago').val(),
        TipoPago:$('#TipoPago').val(),
        Numero_Pedido:$('#Numero_Pedido').val(),
        Empresa:$('#Empresa').val()
    
    };
    var datospagojson=JSON.stringify(datospago);

    $.ajax({
        url: UrlUpdatePago,
        type:'PUT',
        data: datospagojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Pago actualizado correctamente');
        },
        Error:function(textStatus, errorthrown ){
            alert('Error al actualizar pago'+ textStatus + errorthrown);
        }
    });
    alert('Aviso');


}

function EliminarPago(NumeroPago){

    var datospago={

        NumeroPago:NumeroPago
    };
    var datospagojson=JSON.stringify(datospago);

    $.ajax({
        url: UrlDeletePago,
        type:'DELETE',
        data: datospagojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        Error:function(textStatus, errorthrown ){
            alert('Error al eliminar pago'+ textStatus + errorthrown);
        }
       
    });
    alert('Pago eliminado');
   CargarPagos();

}
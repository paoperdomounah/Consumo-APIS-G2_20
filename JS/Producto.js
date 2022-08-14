var UrlProductos = 'http://20.216.41.245:90/G2_20/controller/producto.php?opc=get_productos';
var UrlInsertProductos = 'http://20.216.41.245:90/G2_20/controller/producto.php?opc=insert_Producto';
var UrlProducto = 'http://20.216.41.245:90/G2_20/controller/producto.php?opc=get_producto';
var UrlDeleteProducto = 'http://20.216.41.245:90/G2_20/controller/producto.php?opc=delete_producto';
var UrlUpdateProducto = 'http://20.216.41.245:90/G2_20/controller/producto.php?opc=update_producto';

$(document).ready(function(){
    CargarProductos();
});

function CargarProductos(){
    $.ajax({
        url: UrlProductos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = ' ';

            for(i=0; i<MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>'+ MiItems[i].Numero_Pedido +'</td>'+
                '<td>'+ MiItems[i].Nombre_Articulo +'</td>'+
                '<td>'+ MiItems[i].Precio_Unitario +'</td>'+
                '<td>'+ MiItems[i].Fecha_Pedido +'</td>'+
                '<td>'+ MiItems[i].Cantidad_Articulo +'</td>'+
                '<td>'+ MiItems[i].Monto_Total +'</td>'+
                '<td>'+ MiItems[i].Aplica_Impuesto +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarProducto('+ MiItems[i].Numero_Pedido +')">Editar</button>'+
                '<td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarProducto('+ MiItems[i].Numero_Pedido +')">Eliminar</button>'+
                '<td>'+

            '</tr>';
            $('#DataProductos').html(Valores);
            }
        }
    });
}

function AgregarProducto(){
    var datosproducto={
        Numero_Pedido:$('#Numero_Pedido').val(),
        Nombre_Articulo:$('#Nombre_Articulo').val(),
        Precio_Unitario:$('#Precio_Unitario').val(),
        Fecha_Pedido:$('#Fecha_Pedido').val(),
        Cantidad_Articulo:$('#Cantidad_Articulo').val(),
        Monto_Total:$('#Monto_Total').val(),
        Aplica_Impuesto:$('#Aplica_Impuesto').val()
    };
    var datosproductojson = JSON.stringify(datosproducto);

    $.ajax({
        url:UrlInsertProductos,
        type:'POST',
        data:datosproductojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Producto agregado correctamente');
        },
        error:function(textStatus, errorthrown ){
            alert('Error al agregar producto'+ textStatus + errorthrown);
        }
    });
    alert('Aviso');

}

function CargarProducto(NumeroPedido){
    var datosproducto={
        Numero_Pedido:NumeroPedido
    };
    var datosproductojson=JSON.stringify(datosproducto);

    $.ajax({
        url:UrlProducto,
        type:'POST',
        data: datosproductojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            var MiItems=reponse;
            $('#Numero_Pedido').val(MiItems[0].Numero_Pedido);
            $('#Nombre_Articulo').val(MiItems[0].Nombre_Articulo);
            $('#Precio_Unitario').val(MiItems[0].Precio_Unitario);
            $('#Fecha_Pedido').val(MiItems[0].Fecha_Pedido);
            $('#Cantidad_Articulo').val(MiItems[0].Cantidad_Articulo);
            $('#Monto_Total').val(MiItems[0].Monto_Total);
            $('#Aplica_Impuesto').val(MiItems[0].Aplica_Impuesto);
            var btnActualizar='<input type="submit" id="btn_actualizar" onclick="ActualizarProducto('+MiItems[0].Numero_Pedido+')"'+
            'value="Actualizar Producto" class="btn btn-primary"><input>';
            $('#btnagregarproducto').html(btnActualizar);
        }
       
    });
}

function ActualizarProducto(NumeroPedido){

    var datosproducto={

        Numero_Pedido:NumeroPedido,
        Nombre_Articulo:$('#Nombre_Articulo').val(),
        Precio_Unitario:$('#Precio_Unitario').val(),
        Fecha_Pedido:$('#Fecha_Pedido').val(),
        Cantidad_Articulo:$('#Cantidad_Articulo').val(),
        Monto_Total:$('#Monto_Total').val(),
        Aplica_Impuesto:$('#Aplica_Impuesto').val()
    
    };
    var datosproductojson=JSON.stringify(datosproducto);

    $.ajax({
        url: UrlUpdateProducto,
        type:'PUT',
        data: datosproductojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Producto actualizado correctamente');
        },
        error:function(textStatus, errorthrown ){
            alert('Error al actualizar producto'+ textStatus + errorthrown);
        }
    });
    alert('Aviso');


}

function EliminarProducto(NumeroPedido){

    var datosproducto={

        Numero_Pedido:NumeroPedido
    };
    var datosproductojson=JSON.stringify(datosproducto);

    $.ajax({
        url: UrlDeleteProducto,
        type:'DELETE',
        data: datosproductojson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error:function(textStatus, errorthrown ){
            alert('Error al eliminar producto'+ textStatus + errorthrown);
        }
       
    });
    alert('Producto eliminado');
   CargarProductos();

}



$(document).ready(function(){
    let url = '/api/v1/biblioteca/bitacora';

    let id_bitacora,tabla, antes, despues, accion;
    //Mostrar
    let tablaLibros = $('#tablaLibros').DataTable({
        "ajax":{
            "url": url,
            "dataSrc":""
        },
        language: {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing":"Procesando...",
        },

        dom: 'Bfrtilp',
        buttons:[ 
            {
                extend:    'pdfHtml5',
                text:      '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger'
            },
            {
                extend:    'print',
                text:      '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
        ],
        "columns":[
            {"data":"id_bitacora"},
            {"data":"tabla"},
            {"data":"antes"},
            {"data":"despues"},
            {"data":"accion"}
        ],
        "columnDefs":[{

        }]
    });
});

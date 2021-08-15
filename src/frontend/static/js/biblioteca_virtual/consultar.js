(()=>{

 
    $(document).ready(function(){
        let url = '/api/v1/biblioteca/';
        let opcion = null;
        let id_libro, isbn, titulo, edicion, descripcionl, img, pdf_new, idioma, editorial, categoria, descripcionc, autor, nacionalidad, premios, ranking, fila;
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
                {"data":"id_libro"},
                {"data":"isbn"},
                {"data":"titulo"},
                {"data":"edicion"},
                {"data":"descripcion_libro"},
                {"data":"img"},
                {"data":"pdf_new"},
                {"data":"idioma"},                
                {"data":"nombre_autor"},
                {"data":"nacionalidad"},
                {"data":"premios"},
                {"data":"ranking"},
                {"data":"nombre_categoria"},
                {"data":"descripcion"},
                {"data":"nombre_editorial"},
                {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditar'>editar</button><button class='btn btn-danger btn-sm btnBorrar'>eliminar</button></div></div>"}
            ],
            "columnDefs":[{

            }]
        });
    });

         //CREAR
            $("#btnCrear").click(function(){
            opcion='crear';            
            id_libro=null;
            $("#formLibros").trigger("reset");
            $(".modal-header").css( "background-color", "#23272b");
            $(".modal-header").css( "color", "white" );
            $(".modal-title").text("Registrar Libro");
            $('#modalCRUD').modal('show');	    
        }); 



          //EDITAR        
    $(document).on("click", ".btnEditar", function(){
        		            
        opcion='editar';
        fila = $(this).closest("tr");	        
        id_libro = parseInt(fila.find('td:eq(0)').text());
            isbn = fila.find('td:eq(1)').text();
            titulo = fila.find('td:eq(2)').text();
            edicion = fila.find('td:eq(3)').text();
            descripcionl = fila.find('td:eq(4)').text();
            img = fila.find('td:eq(5)').text();
            pdf_new = fila.find('td:eq(6)').text();
            idioma = fila.find('td:eq(7)').text();
            autor = fila.find('td:eq(8)').text();
            nacionalidad = fila.find('td:eq(9)').text();
            premios = fila.find('td:eq(10)').text();
            ranking = fila.find('td:eq(11)').text();
            categoria = fila.find('td:eq(12)').text();
            descripcionc = fila.find('td:eq(13)').text();
            editorial = fila.find('td:eq(14)').text();            
        $("#id_libro").val(id_libro);
            $("#isbn").val(isbn);
            $("#titulo").val(titulo);
            $("#edicion").val(edicion); 
            $("#descripcionl").val(descripcionl);
            $("#img").val(img);
            $("#pdf_new").val(pdf_new);
            $("#idioma").val(idioma);
            $("#autor").val(autor); 
            $("#nacionalidad").val(nacionalidad); 
            $("#premios").val(premios); 
            $("#ranking").val(ranking);    
            $("#categoria").val(categoria); 
            $("#descripcionc").val(descripcionc); 
            $("#editorial").val(editorial);            
        $(".modal-header").css("background-color", "#7303c0");
        $(".modal-header").css("color", "white" );
        $(".modal-title").text("Editar Libro");		
        $('#modalCRUD').modal('show');	

    });

     //BORRAR
    $(document).on("click", ".btnBorrar", function(){
        fila = $(this);          
        id_libro = parseInt($(this).closest('tr').find('td:eq(0)').text());            
        Swal.fire({
            title: '¿Confirma eliminar el registro?',                
            showCancelButton: true,
            cancelButtonText: "Cancelar",   
            confirmButtonText: `Confirmar`,                
            }).then((result) => {               
            if (result.isConfirmed) {
                fetch('/api/v1/biblioteca/'+id_libro,{   
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({USR_REGISTRO:"jona"}),
                    success: function() {
                        tablaLibros.row(fila.parents('tr')).remove().draw();                  
                    }
                });
                Swal.fire({title: '¡Registro Eliminado!',type: 'success',confirmButtonText: `Aceptar`})
            } 
            })
    });     

      //submit para el CREAR y EDITAR
        $('#formLibros').on('submit',function(e){                                     
        e.preventDefault();
        id_libro = $.trim($('#id_libro').val()); 

        isbn = $.trim($('#isbn').val());
        titulo = $.trim($('#titulo').val());
        edicion = $.trim($('#edicion').val()); 
        descripcionl = $.trim($('#descripcionl').val());
        img = $.trim($('#img').val());
        pdf_new = $.trim($('#pdf_new').val());
        idioma = $.trim($('#idioma').val()); 
        autor = $.trim($('#autor').val()); 
        nacionalidad = $.trim($('#nacionalidad').val()); 
        premios = $.trim($('#premios').val()); 
        ranking = $.trim($('#ranking').val());  
        categoria = $.trim($('#categoria').val()); 
        descripcionc = $.trim($('#descripcionc').val());
        editorial = $.trim($('#editorial').val());   

        if(opcion=='crear'){                
            fetch('/api/v1/biblioteca/',{ 
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ISBN: isbn,
                    TITULO: titulo,
                    EDICION: edicion,
                    DESCRIPCION_LIBRO: descripcionl,
                    IMG: img,
                    PDF_NEW: pdf_new,
                    IDIOMA: idioma,
                    NOMBRE_EDITORIAL: editorial,
                    NOMBRE_CATEGORIA: categoria,
                    DESCRIPCION: descripcionc,
                    NOMBRE_AUTOR: autor,
                    NACIONALIDAD: nacionalidad,
                    PREMIOS: premios,
                    RANKING: ranking,
                    USR_REGISTRO: "Josue"}),
                success: function(data) {                       
                    tablaLibros.fetch.reload(null, false);                        
                }
            });	
        }
        if(opcion=='editar'){
            console.log("editar");
            fetch('/api/v1/biblioteca/'+id_libro,{                                
                method: 'PUT',                                        
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ID_LIBRO: id_libro,
                    ISBN: isbn,
                    TITULO: titulo,
                    EDICION: edicion,
                    DESCRIPCION_LIBRO: descripcionl,
                    IMG: img,
                    PDF_NEW: pdf_new,
                    IDIOMA: idioma,
                    NOMBRE_EDITORIAL: editorial,
                    NOMBRE_CATEGORIA: categoria,
                    DESCRIPCION: descripcionc,
                    NOMBRE_AUTOR: autor,
                    NACIONALIDAD: nacionalidad,
                    PREMIOS: premios,
                    RANKING: ranking,
                    USR_REGISTRO: "Josue"}),                     
                success: function(data) {                       
                    tablaLibros.fetch.reload(null, false);                        
                }
            });	
            
        }        		        
        $('#modalCRUD').modal('hide');

        
    });



    $("#btnCancelar").click(function(){
        Swal.fire({
            title: '¿Esta seguro que quiere salir?', 
            text:  'Perdera todos los datos',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        })
    })



})();

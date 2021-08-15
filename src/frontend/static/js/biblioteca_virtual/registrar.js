(() =>{


// subida de imagenes a cloudinary
    let ruta=[];// variable para el almacenamiento de la ruta de imagen
    let public=[];
 
//subida de la imagen a un servidor externo
    const imageUploader = document.getElementById('imgfile');

    const claudinary_url ='https://api.cloudinary.com/v1_1/biblioteca/image/upload'; //url de nuestro servidor externo de img
    const cloudinary_preset = 'biblioteca';
    // funcion para subir imagen
    imageUploader.addEventListener('change', async (e)=>{
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinary_preset);

    //
    const res = await axios.post(claudinary_url, formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

        console.log(res);
        ruta = res.data.secure_url;
        public=res.data.public_id;

});

    let rutadepdf=[];
    const pdfUploader = document.getElementById('pfile');
    // funcion para subir PDF
    pdfUploader.addEventListener('change', async (e)=>{
        const file = e.target.files[0];
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinary_preset);
    
        //
        const ress = await axios.post(claudinary_url, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    
            console.log(ress);
            rutadepdf = ress.data.secure_url;
            publicdepdf=ress.data.public_id;
    
    });


document.getElementById('save').addEventListener('click', registrarlibro);

async function registrarlibro(){
    
    const pdfnew = String(rutadepdf);
    const img = String(ruta);
    const public_id =  String(public); 
    const public_idpdf = String(publicdepdf);

    console.log("Registrado");
    const create = await fetch('/api/v1/biblioteca/',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            
            ISBN: `${isbn.value}`,
            TITULO: `${titulo.value}`,
            EDICION: `${edicion.value}`,
            DESCRIPCION_LIBRO: `${descripcionl.value}`,
            IMG: img,
            PDF_NEW: pdfnew,
            PUBLIC_ID: public_id,
            PUBLIC_IDPDF: public_idpdf,
            IDIOMA: `${idioma.value}`,
            NOMBRE_EDITORIAL: `${editorial.value}`,
            NOMBRE_CATEGORIA: `${categoria.value}`,
            DESCRIPCION: `${descripcionc.value}`,
            NOMBRE_AUTOR: `${autor.value}`,
            NACIONALIDAD: `${nacionalidad.value}`,
            PREMIOS: `${premios.value}`,
            RANKING: `${ranking.value}`,
            USR_REGISTRO: "Jonatan" 
        })
    })
    .then (res => res.json())
    .then(json => console.log(json))
    .catch(error => console.error(error));

}


$("#save").click(function(){
    Swal.fire({
        title: 'Libro registrado exitosamente', 
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
    })
})

})();

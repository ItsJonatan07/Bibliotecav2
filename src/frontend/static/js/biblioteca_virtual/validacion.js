const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    isbn: /^\d{10,13}$/, // 10 a 13 numeros.
	titulo: /^[a-zA-ZÀ-ÿ\s]{5,100}$/, // Letras y espacios, pueden llevar acentos.
    edicion: /^[a-zA-Z0-9-ZÀ-ÿ\s\_\-]{5,100}$/, // Letras, numeros, guion y guion_bajo
    descripcionl: /^[a-zA-ZÀ-ÿ\s]{5,150}$/, // Letras y espacios, pueden llevar acentos.
    idioma: /^[a-zA-ZÀ-ÿ\s]{5,100}$/, // Letras y espacios, pueden llevar acentos.
    editorial: /^[a-zA-ZÀ-ÿ\s]{5,100}$/, // Letras y espacios, pueden llevar acentos.
    descripcionc: /^[a-zA-ZÀ-ÿ\s]{5,150}$/, // Letras y espacios, pueden llevar acentos.
    autor: /^[a-zA-ZÀ-ÿ\s]{1,100}$/, // Letras y espacios, pueden llevar acentos.
    nacionalidad: /^[a-zA-ZÀ-ÿ\s]{5,100}$/, // Letras y espacios, pueden llevar acentos.
    premios: /^[a-zA-ZÀ-ÿ\s]{5,100}$/, // Letras y espacios, pueden llevar acentos.
    ranking: /^[a-zA-Z0-9\s\_\-\.]{5,100}$/, // Letras, numeros, guion y guion_bajo
}

const campos = {
	isbn: false,
	titulo: false,
	edicion: false,
	descripcionl: false,
	idioma: false,
    editorial: false,
    decripcionc: false,
    autor: false,
    nacionalidad: false,
    premios: false,
    ranking: false
}

const validarFormulario = (e) =>{
    switch (e.target.name){
        case"isbn":
            validarCampo(expresiones.isbn, e.target, 'isbn');
        break;
        case"titulo":
            validarCampo(expresiones.titulo, e.target, 'titulo');
        break;
        case"edicion":
            validarCampo(expresiones.edicion, e.target, 'edicion');
        break;
        case"descripcionl":
            validarCampo(expresiones.descripcionl, e.target, 'descripcionl');
        break;
        case"idioma":
            validarCampo(expresiones.idioma, e.target, 'idioma');
        break;
        case"editorial":
            validarCampo(expresiones.editorial, e.target, 'editorial');
        break;
        case"descripcionc":
            validarCampo(expresiones.descripcionc, e.target, 'descripcionc');
        break;
        case"autor":
            validarCampo(expresiones.autor, e.target, 'autor');
        break;
        case"nacionalidad":
            validarCampo(expresiones.nacionalidad, e.target, 'nacionalidad');
        break;
        case"premios":
            validarCampo(expresiones.premios, e.target, 'premios');
        break;
        case"ranking":
            validarCampo(expresiones.ranking, e.target, 'ranking');
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

    if(campos.isbn && campos.titulo && campos.edicion && campos.descripcionl && campos.idioma && campos.editorial  && campos.descripcionc && campos.autor  && campos.nacionalidad && campos.premios && campos.ranking){
		formulario.reset();
        
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
    
});
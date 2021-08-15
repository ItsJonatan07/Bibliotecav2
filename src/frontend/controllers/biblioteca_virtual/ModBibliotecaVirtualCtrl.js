exports.pantalla_bibliteca_consultar = (req, res) => {
    res.render('modulos/biblioteca-virtual/biblioteca_consultar', {
        nombrePagina: 'biblioteca',
        bibliotecaVirtualConsultar: true
    })
}

exports.pantalla_bibliteca_descargar = (req, res) => {
    res.render('modulos/biblioteca-virtual/biblioteca_descargar', {
        nombrePagina: 'biblioteca',
        bibliotecaVirtualDescargar: true
    })
}


exports.pantalla_bibliteca_registrar = (req, res) => {
    res.render('modulos/biblioteca-virtual/biblioteca_registrar', {
        nombrePagina: 'biblioteca',
        bibliotecaVirtual: true
    })
}

exports.pantalla_biblioteca_mantenimiento = (req, res) => {
    res.render('modulos/biblioteca-virtual/biblioteca_mantenimiento', {
        nombrePagina: 'biblioteca',
        bibliotecaVirtualMantenimiento: true
    })
}

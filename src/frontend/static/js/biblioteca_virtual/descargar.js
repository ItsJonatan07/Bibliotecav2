(() =>{
    const postsList = document.querySelector('.grid-fluid');
    let output = '';
    const url = '/api/v1/biblioteca/';

    const renderPosts = (posts) =>{
        posts.forEach(post => {
            output +=`
            <div class="p card mt-4 col-md-6 bg-ligt" style="width: 18rem;">
                <img   src="${post.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${post.titulo}</h5>
                    <br>
                    <br>
                    <h6 class="card-subtitle mb-2 text-muted"> Descripcion</h6>
                    <p class="card-text">${post.descripcion_libro}</p>
                <a href="${post.pdf_new}" class="card-link"><i class="fas fa-download fa-lg mr-2"></i>Descargar</a>
                </div>
            </div>
            `;
        });
        postsList.innerHTML = output;
    }
        
    fetch(url)
        .then(res => res.json())
        .then(data => renderPosts(data))
        .catch(error => console.error(error));










})();

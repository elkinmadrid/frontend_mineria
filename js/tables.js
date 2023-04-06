let listar_motos = async () => {
    let motos;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://mineria-api.onrender.com/api/v1/info-moto',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    await axios(config).then(function (res) {
        motos = res.data.data;
    })
        .catch(function (err) {
            console.log(err);
        });
    return motos;
};

const tbody = document.querySelector('#userList tbody');
let mostrar_datos = async () => {
    let productos = await listar_motos();
    let html = '';

    productos.forEach(dato => {
        html += `
          <tr>
            <th scope="row">${dato.id}</th>
            <td>${dato.precio}</td>
            <td>${dato.marca}</td>
            <td>${dato.modelo}</td>
            <td>${dato.anio}</td>
            <td>${dato.color}</td>
            <td>${dato.kilometraje}</td>
            <td>
              <a href="#"><i title="Editar" class="fas fa-edit"></i></a> |
              <a class="eliminar" href="#"><i title="Eliminar" data-id="${dato.id}" class="fas fa-trash"></i></a>
            </td>
          </tr>
        `;
    });

    tbody.innerHTML = html;

    document.querySelectorAll('a.eliminar').forEach(el => {
        el.addEventListener('click', e => {
          e.preventDefault();
          const id = e.target.dataset.id;
          const confirmacion = confirm('¿Está seguro de que desea eliminar este elemento?');
          if (confirmacion) {
            eliminarRegistro(id);
          }
        });
      });

};


function eliminarRegistro(id) {

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `https://mineria-api.onrender.com/api/v1/info-moto/${id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.request(config)
        .then((response) => {
            let diag = document.getElementById('diag')
            if (response.status === 200) {
                diag.innerHTML = response.data.message

            } else {
                diag.innerHTML = response.data.message + ': comuniquese con el admin'
            }
            $('#informationModal').modal({ show: true });

            console.log(JSON.stringify(response.data));
            mostrar_datos()
        })
        .catch((error) => {
            console.log(error);
        });

}

mostrar_datos();
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
              <a href="#"><i title="Eliminar" class="fas fa-trash"></i></a>
            </td>
          </tr>
        `;
    });

    tbody.innerHTML = html;

};

mostrar_datos();
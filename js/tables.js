const url_base = 'https://mineria-api.onrender.com';


let listar_motos = async () => {
    let motos;
    let config = {
        method: 'get',
        withCredentials: true,
        maxBodyLength: Infinity,
        url: url_base + '/api/v1/info-moto',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Cookie': document.cookie
        }
    };
    await axios(config).then(function (res) {
        motos = res.data.data;
    })
        .catch(function (err) {
            console.log(err);
            if (err.response.status == 401) {
                window.location.href = '/frontend_mineria/index.html';
            }
        });
    console.log(document.cookie);
    return motos;
};

const tbody = document.querySelector('#userList tbody');
var idActualizar = 0
let mostrar_datos = async () => {
    let motos = await listar_motos();
    let html = '';

    motos.forEach(dato => {
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
              <a class="actualizar" href="#"><i title="Editar"  data-id="${dato.id}" class="fas fa-edit"></i></a> |
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

    document.querySelectorAll('a.actualizar').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const id = e.target.dataset.id;
            idActualizar = id


            let moto = motos.filter(item => item.id == id)

            var precio = document.getElementById('precio')
            var modelo = document.getElementById('modelo')
            var marca = document.getElementById('marca')
            var anio = document.getElementById('anio')
            var kilometraje = document.getElementById('kilometraje')
            var color = document.getElementById('color')


            precio.value = moto[0].precio
            modelo.value = moto[0].modelo
            marca.value = moto[0].marca
            anio.value = moto[0].anio
            kilometraje.value = moto[0].kilometraje
            color.value = moto[0].color

            console.log(moto);
            $('#fm_actualizar').modal({ show: true });
        });
    });

};


function eliminarRegistro(id) {

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${url_base}/api/v1/info-moto/${id}`,
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


function actualizarRegistro() {

    var precio = document.getElementById('precio').value
    var modelo = document.getElementById('modelo').value
    var marca = document.getElementById('marca').value
    var anio = document.getElementById('anio').value
    var kilometraje = document.getElementById('kilometraje').value
    var color = document.getElementById('color').value

    console.log(` Registro que vamos a actualizar ${idActualizar} `);


    let data = JSON.stringify({
        "anio": anio,
        "color": color,
        "kilometraje": kilometraje,
        "marca": marca,
        "modelo": modelo,
        "precio": precio
    });

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${url_base}/api/v1/info-moto/${idActualizar}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {

            let diag = document.getElementById('diag')
            if (response.status === 200) {
                $('#fm_actualizar').modal('hide');
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
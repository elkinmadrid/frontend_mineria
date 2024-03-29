function limpiar() {
    document.getElementById("precio").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("anio").value = "";
    document.getElementById("color").value = "";
    document.getElementById("kilometraje").value = "";
}


function saveForm() {

    precio = document.getElementById("precio").value;
    marca = document.getElementById("marca").value;
    modelo = document.getElementById("modelo").value;
    anio = document.getElementById("anio").value;
    color = document.getElementById("color").value;
    kilometraje = document.getElementById("kilometraje").value;

    let formValues = {
        "anio": anio,
        "color": color,
        "kilometraje": kilometraje,
        "marca": marca,
        "modelo": modelo,
        "precio": precio
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: 'https://mineria-api.onrender.com/api/v1/info-moto',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Cookie': document.cookie
        },
        data: formValues
    };

    axios.request(config).then(function (response) {
        console.log(response);
        let diag = document.getElementById('diag')
        if (response.status === 201) {            
            diag.innerHTML = response.data.message
            limpiar()

        } else {
            diag.innerHTML = response.data.message + ': comuniquese con el admin'
        }
        $('#informationModal').modal({ show: true });
    })
    .catch((error) => {
        console.log(error);
        if (err.response.status == 401) {
            window.location.href = '/frontend_mineria/index.html';
        }
    });

}
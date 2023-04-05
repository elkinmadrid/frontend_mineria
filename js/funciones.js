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
        url: 'https://mineria-api.onrender.com/api/v1/info-moto',
        headers: {
            'Content-Type': 'application/json'
        },
        data: formValues
    };

    axios.request(config).then(function (response) {
        console.log(response);
        if (response.status === 201) {

            console.log(response);

        }
    })

}
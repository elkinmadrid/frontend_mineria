var motos;

let get_motos = async () => {

    const url_base = 'https://mineria-api.onrender.com';
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


let myPieChart = async () => {


    marcas = motos.map(obj => obj.marca)

    labels_ = marcas.filter((marca, index) => marcas.indexOf(marca) === index)

    contador = {}
    count = motos.forEach(item => {
        const marca = item.marca
        if (!contador[marca]) {
            contador[marca] = 1;
        }
        else {
            contador[marca]++;
        }
    })

    values = Object.values(contador)

    console.log(labels_)

    background_Color = color_background(labels_.length)
    hover_BackgroundColor = color_background(labels_.length)



    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels_,
            datasets: [{
                data: values,
                backgroundColor: background_Color,
                hoverBackgroundColor: hover_BackgroundColor,
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                position: 'left'
            },
            cutoutPercentage: 80,
        },
    });



};



let myBarChart = async (buttonClicked) => {

    const data = {};
    if (buttonClicked === 'marcas') {
        document.querySelector('#btn-marcas').classList.add('active');
        document.querySelector('#btn-anio').classList.remove('active');
        for (const moto of motos) {
            const marca = moto.marca.toUpperCase();
            if (marca in data) {
                data[marca] += 1;
            } else {
                data[marca] = 1;
            }
        }
    } else if (buttonClicked === 'anio') {
        document.querySelector('#btn-anio').classList.add('active');
        document.querySelector('#btn-marcas').classList.remove('active');
        for (const moto of motos) {
            const anio = moto.anio;
            if (anio in data) {
                data[anio] += 1;
            } else {
                data[anio] = 1;
            }
        }
    }


    const etiquetas = Object.keys(data);
    const valores = Object.values(data);

    var ctx = document.getElementById("myBarChart");
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Cantidad de motocicletas',
                data: valores,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }],
        },
        options: {
            legend: {
                display: true,
                position: 'bottom'
            },
            cutoutPercentage: 80,
        },
    });


}

let myCircularChart = async () => {

    // Obtener el canvas del HTML y crear el contexto 2D
    const ctx = document.getElementById('myChart').getContext('2d');

    colorCount = countByColor(motos)



    // Obtener los colores y los valores de cada dato
    const colors = Object.keys(colorCount);
    const values = Object.values(colorCount);
    console.log(`Colores ${Object.values(colorCount)}    -   valores de ${Object.keys(colorCount)}`);

    colors_charts = color_background(colors.length)

    // Crear el gráfico circular
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: colors,
            datasets: [{
                label: 'Distribución de motocicletas por color',
                data: values,
                backgroundColor: colors_charts,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });


}


function color_background(amout_labels) {
    colors = []

    var colors = [];
    for (var i = 0; i < amout_labels; i++) {
        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(color);
    }
    return colors;
}

function countByColor(json) {
    const data = json;
    const count = {};
    for (let i = 0; i < data.length; i++) {
        const color = data[i].color;
        if (count[color]) {
            count[color]++;
        } else {
            count[color] = 1;
        }
    }
    return count;
}



async function main() {
    await get_motos();
    await myPieChart();
    await myBarChart();
    await myCircularChart();
}

main();
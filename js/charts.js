var motos;
let myBarChart_ = new Chart();
let myDynamicChat = new Chart();

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



    var ctxMyPieChart = document.getElementById("myPieChart").getContext('2d');
    var myPieChart = new Chart(ctxMyPieChart, {
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

            cutoutPercentage: 80,
        },
    });



};



let myBarChart = async (buttonClicked) => {

    const data = {};

    let etiquetas = [];
    let valores = [];
    if (buttonClicked === 'marcas') {
        myBarChart_.destroy();
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
        myBarChart_.destroy();
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
    } else {
        myBarChart_.destroy();
        createChartBar(etiquetas, valores);
        return data;
    }


    etiquetas = Object.keys(data);
    valores = Object.values(data);


    createChartBar(etiquetas, valores);
}


function createChartBar(etiquetas, valores) {
    var ctxmyBarChart = document.getElementById("myBarChart");
    myBarChart_ = new Chart(ctxmyBarChart, {
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

let myCircularChart = async (typeGrafic) => {

    let type_ = typeGrafic
    let colors = [];
    let values = [];


    console.log(`Valore de type ${typeGrafic}`);

    
    if (typeGrafic === undefined) {
        type_ = 'line'
        createDynamicChart(colors, values, type_, []);

    }
    colorCount = countByColor(motos)



    // Obtener los colores y los valores de cada dato
    colors = Object.keys(colorCount);
    values = Object.values(colorCount);
    console.log(`Colores ${Object.values(colorCount)}    -   valores de ${Object.keys(colorCount)}`);

    colors_charts = color_background(colors.length)
    createDynamicChart(colors, values, type_, colors_charts);



}


function createDynamicChart(colors, values, type_, colors_charts) {
    myDynamicChat.destroy();
    var ctxMyChart = document.getElementById('myChart');
    myDynamicChat = new Chart(ctxMyChart, {
        type: type_,
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


let myScatterChart = async () => {


    const precio_motos = motos.filter(moto => moto.precio).map(moto => moto.precio)
    const kilometraje_motos = motos.filter(moto => moto.kilometraje).map(moto => moto.kilometraje)

    const data = []

    precio_motos.forEach((element, index) => {
        data.push({
            x: kilometraje_motos[index],
            y: precio_motos[index]
        });
    });

    console.log(`Data array ${data}`);
    const ctxsCatterChart = document.getElementById('scatterChart').getContext('2d');

    const scatterChart = new Chart(ctxsCatterChart, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Precio vs Kilometraje',
                data: data
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });

}






async function main() {
    await get_motos();
    await myPieChart();
    await myBarChart();
    await myCircularChart();
    await myScatterChart();
}

main();
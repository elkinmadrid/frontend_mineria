function login() {

    const url_base = 'https://mineria-api.onrender.com';


    const fromulario = document.querySelector('form')

        

    const username = fromulario.elements.username.value
    const password = fromulario.elements.password.value

    let body = {
        username: username,
        password: password
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        withCredentials: true,
        url: `${url_base}/login`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*'
        },
        data: body
    };

    axios.request(config).then(function (response) {
        console.log(response);
        if (response.data.message === 'You are logged in successfully') {
            console.log(document.cookie);
            window.location.href = '/frontend_mineria/tables.html';
        } else {
            alert('Bad Request - invalid credentials');
        }
    })
    .catch((error) => {
        console.log(error);
        alert('Intente de nuevo, usuario o contraseña invalida.');
    });
}
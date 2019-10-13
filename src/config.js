if (process.env.NODE_ENV !== 'development'){
    config = {
        authApiUrl: 'https://api-tuckermillerdev.herokuapp.com/',
        url: 'https://app-spotify-app.herokuapp.com/'
    }
}else{
    var config = {
        authApiUrl: 'http://localhost:3100',
        url: 'http://localhost:3000'
    }
}

module.exports = config;
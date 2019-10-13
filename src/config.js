if (process.env.NODE_ENV !== 'development'){
    config = {
        authApiUrl: 'https://api-tuckermillerdev.herokuapp.com/'
    }
}else{
    var config = {
    authApiUrl: 'http://localhost:3100'
    }
}

module.exports = config;
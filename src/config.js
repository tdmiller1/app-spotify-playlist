var config = {
    authApiUrl: 'http://localhost:3100'
}

if (process.env.NODE_ENV !== 'development'){
    config = {
        authApiUrl: 'https://api-tuckermillerdev.herokuapp.com/'
    }
}

module.exports = config;
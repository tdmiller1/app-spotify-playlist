if (process.env.NODE_ENV !== 'development'){
    var config = {
        authApiUrl: 'https://api-tuckermillerdev.herokuapp.com',
        url: 'https://app-spotify-playlist.herokuapp.com'
    }
}else{
    config = {
        authApiUrl: 'http://localhost:3100',
        url: 'http://localhost:3000'
    }
}

module.exports = config;
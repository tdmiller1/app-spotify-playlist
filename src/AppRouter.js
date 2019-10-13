import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import purple from '@material-ui/core/colors/purple';

import Home from "./Home";
import LinkedIn from "./Linkedin";
import Choose from "./Choose";
import Quiz from "./Quiz";
import Playlist from "./Playlist";

import axios from 'axios'
import * as moment from 'moment'
import config from './config'


let now = moment().format('LLLL');

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: purple[500],
    },
  },
});

export default class AppRouter extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tokenExpiration:null
    }
  }

  componentDidMount(){
    var url = window.location.href
    var parametersIndex = url.search("callback?")
    if(parametersIndex !== -1) {
      var urlStripped = url.slice(parametersIndex+14)
      var codeIndex = urlStripped.search("&");
      var code = urlStripped.slice(0,codeIndex)

      axios({
        url: config.authApiUrl + '/auth',
        params: {
          code: code,
        },
        method: 'get',
        timeout: '8000'
      }).then(function (response) {
        localStorage.setItem('access_token',response.data.access_token)
        localStorage.setItem('expires_in',response.data.expires_in)
        localStorage.setItem('refresh_token',response.data.refresh_token)
        localStorage.setItem('scope',response.data.scope)
        window.location.replace('/#/choose')
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    var expiresInSeconds = localStorage.getItem('expires_in')
    if(expiresInSeconds){
        
      if(this.state.tokenExpiration === null){
        ///Token aquired not set date
        var expirationTime = moment(now).add(1, 'hours').format('LLLL');
        this.setState({tokenExpiration: expirationTime})
        this.setState({signedIn: true})
      }else{
        ///Token aquired and already set date
        this.setState({signedIn: true})
      }
    }else{
      //No Token
      console.log('no token')
      this.setState({signedIn: false})
    }
  }

  render(){
      return (
        <div>
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route path="/playlist" exact component={Playlist} />
                <Route path="/quiz" exact component={Quiz} />
                <Route path="/callback" component={LinkedIn} />
                <Route path="/choose" exact component={Choose} />
                <Route path="/" exact component={Home} />
              </Switch>
            </Router>
          </ThemeProvider>
        </div>
      )
  }
}
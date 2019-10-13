import * as React from "react";
import PropTypes from 'prop-types'
import {
  Button, Grid, withStyles } from '@material-ui/core';
import config from './config'

async function authorize(){
  var client_id = process.env.client_id
  var redirect_uri = config.url + '/callback'
  var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id + '&response_type=code&redirect_uri=' + redirect_uri + '&scope=user-top-read%20user-read-private%20user-read-email&state=34fFs29kd09'
 
  window.location.href = url

}

const styles = theme => ({
  root: {
    height: '100vh',
    backgroundColor: '#222326',
  },
  spotifyButton: {
    backgroundColor:'#1DB954',
    color:'white'
  }
})



class Home extends React.Component {

  render(){
    const { classes } = this.props;
  
    return (
      <div>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          className={classes.root}>
          <Grid item>
            <div>{process.env.NODE_ENV}</div>
            <Button className={classes.spotifyButton} onClick={authorize}>Login</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home)
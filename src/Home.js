import * as React from "react";
import PropTypes from 'prop-types'
import {
  Button, Grid, withStyles } from '@material-ui/core';

async function authorize(){
  var client_id = '2a6d55192d964ad0b1fd997a986eb8d3'
  var redirect_uri = 'http://localhost:3000/callback'
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
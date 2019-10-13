import * as React from "react";
import PropTypes from 'prop-types'
import {
  Button, Grid, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    height: '100vh',
    backgroundColor: '#222326',
  },
  button: {
    height: '100vh',
    width:'50vw',
    backgroundColor:'#1DB954',
    color:'white'
  }
})

class Choose extends React.Component {

  state = {}

  componentDidMount(){
    this.setState({
      access_token: localStorage.getItem('access_token'),
      expires_in: localStorage.getItem('expires_in'),
      refresh_token: localStorage.getItem('refresh_token'),
      scope: localStorage.getItem('scope'),
    })
  }

  render() {
    const { classes } = this.props;
    
    return (
        <div>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          className={classes.root}>
          <Grid item>
            <Button onClick={() => this.props.history.push('playlist')} className={classes.button}>Make a Playlist</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => this.props.history.push('quiz')} className={classes.button}>Take a Quiz</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Choose.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Choose)
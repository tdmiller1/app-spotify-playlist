import * as React from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Grid, withStyles, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Button, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    height: '100vh',
    backgroundColor:'#222326',
  },
  button: {
    backgroundColor:'#1DB954',
    color:'white',
    margin:'20px'
  },
  checkbox: {
    color:'white'
  },
  checkboxRow: {
    width:'100vw',
    backgroundColor:'#222326',
    color:'white',
    "&:hover": {
      backgroundColor: '#1DB954'
    }
  }
})

class Choose extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selected: [],
      error: true
    }

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(artistId) {
    var selected = this.state.selected

    if(selected.indexOf(artistId) === -1){
      selected.push(artistId)
    }else{
      var index = selected.indexOf(artistId)
      selected.splice(index,1)
    }

    if(selected.length === 0 || selected.length > 5){
      this.setState({error: true, selected: selected})
    }else{
      this.setState({error: false, selected: selected})
    }
   }

  componentDidMount(){

    console.log(this.state)
    axios({
      url: 'https://api.spotify.com/v1/me',
      headers : {
        'Authorization':'Bearer ' + localStorage.getItem('access_token')
      },
      method: 'get',
      timeout: '8000'
    }).then((response) => {
      localStorage.setItem("user_id", response.data.id)
      this.setState({user_id: response.data.id})
    })

    axios({
      url: 'https://api.spotify.com/v1/me/top/artists?limit=10',
      headers : {
        'Authorization':'Bearer ' + localStorage.getItem('access_token')
      },
      method: 'get',
      timeout: '8000'
    }).then((response) => {
      this.setState({artists: response.data.items})
      console.log(this.state)
    })

    axios({
      url: 'https://api.spotify.com/v1/me/playlists',
      headers : {
        'Authorization':'Bearer ' + localStorage.getItem('access_token')
      },
      method: 'get',
      timeout: '8000'
    }).then((response) => {
      this.setState({playlists: response.data.items})
    })

    this.setState({
      access_token: localStorage.getItem('access_token'),
      expires_in: localStorage.getItem('expires_in'),
      refresh_token: localStorage.getItem('refresh_token'),
      scope: localStorage.getItem('scope'),
    })
  }

  render() {

    const { classes } = this.props;
    var ARTISTS = <div></div>
    const ZERO = 0
    if(this.state.artists !== undefined){
      ARTISTS = this.state.artists.map((artist, index) => (
        <div key={artist.name}>
            <FormControlLabel 
              control=
              {
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                className={classes.checkboxRow}>
                  <Grid item>
                    <img alt={artist.name} height="75" width="75" src={artist.images[ZERO].url}></img>
                  </Grid>
                  <Grid item>
                    <Checkbox className={classes.checkbox} checked={artist.selected} onChange={() => this.handleChange(index)} value={artist.name} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{artist.name}</Typography>
                  </Grid>
                </Grid>
              }
              />
        </div>
      ))
    }
    
    return (
      <div>
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}>
          <Grid item>
            <Button className={classes.button} disabled={this.state.error}>Submit Choices</Button>
          </Grid>
          <Grid item>
            {this.state.artists && 
            <FormControl required error={this.state.error} component="fieldset">
              <FormLabel component="legend">Pick up to 5 artists</FormLabel>
              <FormGroup>
                {ARTISTS}
              </FormGroup>
            </FormControl>
            }
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
import * as React from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Grid, withStyles, Slider, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Button, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
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
    backgroundColor:'#222326',
    width:'100vw',
    color:'white',
    "&:hover": {
      backgroundColor: '#1DB954'
    },
  },
  playlistSelction:{
    height:'100vh',
    padding:'20px'
  },
  marginZero: {
    margin:'0px'
  },
  text: {
    color:'white'
  }
})

function valuetext(value) {
  return `${value}°C`;
}

class Choose extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: false,
      slider1: {
        min: 1,
        max: 50,
        default: 45,
        step: 1
      },
      selected: [],
      error: true,
      sizeSelection: null
    }

    this.handleChange = this.handleChange.bind(this);
  }

  submitPlaylistSize(){
    console.log(this.state.value)
  }
  
  logout = () => {
    localStorage.clear()
    window.location.href = "/"
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
              className={classes.marginZero} 
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

    const handleSliderChange = (event, newValue) => {
      this.setState({value: newValue})
    };
    
    return (
      <div>
        
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}>
          {
          !this.state.sizeSelection && (
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.root}>
              <Grid item>
                <Button className={classes.button} onClick={()=>this.setState({sizeSelection: this.state.selected.length})} disabled={this.state.error}>Submit Choices</Button>
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
              <Grid item>
                <Button onClick={() => this.logout()} className={classes.button}>Log out</Button>
              </Grid>
            </Grid>
          )
          }
          {
            this.state.sizeSelection && (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.playlistSelction}>
                <Grid item>
                <Button className={classes.button} onClick={()=>this.submitPlaylistSize()} disabled={this.state.error}>Submit Selection</Button>
                </Grid>
                <Typography className={classes.text}>
                  Slide to select the amount of songs you want
                </Typography>
                <Slider
                  value={typeof this.state.value === 'number' ? this.state.value : 0}
                  onChange={handleSliderChange}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  defaultValue={this.state.slider1.default}
                  step={this.state.slider1.step}
                  min={this.state.slider1.min}
                  max={this.state.slider1.max}
                />
                {
                  this.state.value && (
                    <Typography variant="h4" component="h4" className={classes.text}>
                      {this.state.value} Songs
                    </Typography>
                  )
                }
                <Grid item>
                  <Button onClick={() => this.logout()} className={classes.button}>Log out</Button>
                </Grid>
              </Grid>
            )
          }
        </Grid>
      </div>
    );
  }
}

Choose.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Choose)
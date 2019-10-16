import * as React from "react";
import PropTypes from 'prop-types'
import {
  Grid,  
  withStyles, 
  Slider,
  FormControlLabel,
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  TextField,
  Checkbox } from '@material-ui/core';

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
    marginZero: {
      margin:'0px'
    }
  })
  
class Choose extends React.Component {

    
  state = {}
    
  render() {
    const { classes } = this.props;
    const artist = this.props.artist
    const index = this.props.index
    const ZERO = 0
    return (
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
                {/* <Checkbox className={classes.checkbox} checked={artist.selected} onChange={() => this.handleChange(index)} value={artist.name} /> */}
                </Grid>
                <Grid item>
                <Typography variant="h6">{artist.name}</Typography>
                </Grid>
            </Grid>
            }
            />
    </div>
    )
  }
}


Choose.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(Choose)
import * as React from "react";
import PropTypes from 'prop-types'
import {
  Grid,  
  withStyles, 
  Slider, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  TextField } from '@material-ui/core';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  button: {
    height: '100vh',
    width:'50vw',
    backgroundColor:'#1DB954',
    color:'white'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
})

function valuetext(value) {
  return `${value}°C`;
}

class Choose extends React.Component {

  state = {
    slider1: {
      min: 0,
      max: 100,
      default: 45,
      step: 1
    },
    values: {
      age: '',
      name: 'hai',
      labelWidth: 0
    },
    inputValues: {
      name: 'Cat in the Hat',
      age: '',
      multiline: 'Controlled',
      currency: 'EUR',
    },
    inputValue: "tits"
  }

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

    const handleInputChange = (event) => {
      console.log(event)
      var inputValues = {...this.state.inputValues}
      inputValues.age = event.target.value
      this.setState({ inputValues });
      console.log(this.state)
    };

    const handleSelectChange = (event) => {
      var values = {...this.state.values}
      values.age = event.target.value
      this.setState({values})
      console.log(this)
    };



    return (
        <div>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          className={classes.root}>

          <Grid item>
            <Typography id="discrete-slider" gutterBottom>
              Slider Full Width
            </Typography>
              <Slider
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                defaultValue={this.state.slider1.default}
                step={this.state.slider1.step}
                min={this.state.slider1.min}
                max={this.state.slider1.max}
              />
          </Grid>

          <Grid item>
            <Typography id="discrete-slider" gutterBottom>
              Slider Full Width
            </Typography>
              <Slider
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                defaultValue={this.state.slider1.default}
                step={this.state.slider1.step}
                min={this.state.slider1.min}
                max={this.state.slider1.max}
              />
          </Grid>

          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-helper">Age</InputLabel>
              <Select
                value={this.state.values.age}
                onChange={handleSelectChange}
                inputProps={{
                  name: 'age',
                  id: 'age-helper',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Some important helper text</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item>
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={this.state.inputValue}
            onChange={handleInputChange}
            onBlur={() => this.props.actions.updateInput(this.state.inputValue)}
            margin="normal"
          />
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
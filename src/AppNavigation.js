import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Divider,
  Typography,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  List,
  Toolbar,
  AppBar,
  CssBaseline,
  Grid,
  Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Home from "@material-ui/icons/Home";
import Work from "@material-ui/icons/Work";
import School from "@material-ui/icons/School";
import DeveloperBoard from "@material-ui/icons/DeveloperBoard";

import AppRouter from './AppRouter';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    background: "#eeeded"
  },
  title:{
    marginTop:'12px'
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    marginTop: 64,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: `calc(100vh - 64px)`
  },
});

class AppNavigation extends React.Component {
  state = {
    mobileOpen: false
  };

  handleClick = text => {
    window.location = '#/' + text.text
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <AppRouter />
        </main>
      </div>
    );
  }
}

AppNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AppNavigation);

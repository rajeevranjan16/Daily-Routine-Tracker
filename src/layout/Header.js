import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  colorLink: {
    color: "white",
    textDecoration: "none",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Typography variant="h6" color="inherit">
              <Link to="/" className={classes.colorLink}>
                Home
              </Link>
            </Typography>
          </Box>
          <Box mx={2}>
            <Typography variant="h6">
              <Link to="/create" className={classes.colorLink}>
                Create New
              </Link>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  showForm: {
    backgroundColor: "grey",
    width: "50%",
    position: "absolute",
    marginLeft: "400px",
    borderRadius: "40px",
  },
}));

const Design = (props) => {
  const classes = useStyles();
  return (
    <Paper elevation={10} className={classes.showForm}>
      {props.children}
    </Paper>
  );
};

Design.propTypes = {};

export default Design;

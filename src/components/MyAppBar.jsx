import React from "react";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#4a4a4a",
  },
  title: {
    fontWeight: "bold",
  },
});

const MyAppBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h4">
          Noldy's Homepage
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;

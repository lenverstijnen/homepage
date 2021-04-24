import React from 'react'
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '30px',
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
}))

const MyAppBar = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root} color="primary" position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h4">
          Noldy's Homepage
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default MyAppBar

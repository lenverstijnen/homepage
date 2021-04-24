import React from 'react'
import { makeStyles, Paper, Typography, Divider } from '@material-ui/core'
import Todos from './Todos'

const useStyles = makeStyles({
  root: {
    width: '40%',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '10px',
  },
})

const TodoList = () => {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={5}>
      <Typography variant="h5" className={classes.title}>
        Todo list
      </Typography>
      <Divider />
      <Todos />
    </Paper>
  )
}

export default TodoList

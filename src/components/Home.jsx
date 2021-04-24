import React from 'react'
import TodoList from './todoList/TodoList'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
})

const Home = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TodoList />
    </div>
  )
}

export default Home

import React, { useContext } from 'react'
import { TodosContext } from '../context/todos'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Badge,
} from '@material-ui/core'
import { FormatListBulleted } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '30px',
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  icon: {
    marginLeft: 'auto',
  },
}))

const MyAppBar = () => {
  const classes = useStyles()
  const [todos, setTodos] = useContext(TodosContext)

  const calculateUnfulfilledTodos = () => {
    const unfulfilledTodos = todos.filter((t) => t.isDone === false)
    return unfulfilledTodos.length
  }

  return (
    <AppBar className={classes.root} color="primary" position="static">
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h4">
          Noldy's Homepage
        </Typography>
        <div className={classes.icon}>
          <Badge badgeContent={calculateUnfulfilledTodos()} color="error">
            <FormatListBulleted fontSize="large" />
          </Badge>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default MyAppBar

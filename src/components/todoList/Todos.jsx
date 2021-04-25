import React, { useEffect, useState, useContext } from 'react'
import { TodosContext } from '../../context/todos'
import {
  makeStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core'
import {
  RadioButtonUnchecked,
  RadioButtonChecked,
  AddCircleOutline,
  Edit,
  Delete,
} from '@material-ui/icons'
import axios from 'axios'
import EditTodoDialog from './EditTodoDialog'

const useStyles = makeStyles({
  todoTextDone: {
    textDecoration: 'line-through',
  },
  input: {
    margin: '0px 20px 0px 20px',
  },
})

const Todos = () => {
  const classes = useStyles()
  const [todos, setTodos] = useContext(TodosContext)
  const [input, setInput] = useState({ addTodo: '', editTodo: '' })
  const [hover, setHover] = useState(null)
  const [editedTodo, setEditedTodo] = useState(null)

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos } = await axios.get(
        `${process.env.REACT_APP_NODE_API_URI}api/todos`
      )
      setTodos(todos)
    }

    fetchTodos()
  }, [setTodos])

  const handleInputChange = ({ currentTarget: input }) => {
    setInput({ ...input, [input.name]: input.value })
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleAdd()
    }
  }

  const handleAdd = async () => {
    const newTodo = { text: input.addTodo, isDone: false }
    const newTodos = [...todos, newTodo]

    setTodos(newTodos)
    setInput({ ...input, addTodo: '' })

    await axios.post(`${process.env.REACT_APP_NODE_API_URI}api/todos`, newTodo)
  }

  const handleToggle = async (todo) => {
    const newTodo = { ...todo, isDone: !todo.isDone }
    const index = todos.indexOf(todo)
    const todoArr = [...todos]
    todoArr.splice(index, 1, newTodo)

    setTodos(todoArr)

    await axios.put(
      `${process.env.REACT_APP_NODE_API_URI}api/todos/${todo._id}`,
      newTodo
    )
  }

  const handleEdit = async (event, todo) => {
    setInput({ ...input, editTodo: todo.text })
    setEditedTodo(todo)
    event.stopPropagation()
  }

  const handleCloseEdit = () => {
    setInput({ ...input, editTodo: '' })
    setEditedTodo(null)
  }

  const handleUpdate = async () => {
    const index = todos.indexOf(editedTodo)
    const newTodo = { ...editedTodo, text: input.editTodo }
    const todoArr = [...todos]
    todoArr.splice(index, 1, newTodo)
    setTodos(todoArr)

    await axios.put(
      `${process.env.REACT_APP_NODE_API_URI}api/todos/${newTodo._id}`,
      newTodo
    )

    handleCloseEdit()
  }

  const handleDelete = async (event, todo) => {
    const oldTodos = [...todos]
    const todoArr = oldTodos.filter((t) => t !== todo)
    setTodos(todoArr)
    event.stopPropagation()

    await axios.delete(
      `${process.env.REACT_APP_NODE_API_URI}api/todos/${todo._id}`
    )
  }

  return (
    <List>
      {todos.map((t) => {
        return (
          <ListItem
            button
            disableRipple
            key={t._id || t.text}
            onClick={() => handleToggle(t)}
            onMouseEnter={() => setHover(t._id)}
            onMouseLeave={() => setHover(null)}
          >
            <ListItemIcon>
              {t.isDone ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
            </ListItemIcon>
            <ListItemText
              className={t.isDone ? classes.todoTextDone : null}
              key={t._id || t.text}
              primary={t.text}
            />
            <ListItemIcon>
              {hover === t._id && (
                <IconButton
                  size="small"
                  onClick={(event) => handleEdit(event, t)}
                >
                  <Edit />
                </IconButton>
              )}
            </ListItemIcon>
            <ListItemIcon>
              {hover === t._id && (
                <IconButton
                  size="small"
                  onClick={(event) => handleDelete(event, t)}
                >
                  <Delete />
                </IconButton>
              )}
            </ListItemIcon>
          </ListItem>
        )
      })}
      {todos.length > 0 && <Divider />}
      <ListItem key="addTodo">
        <TextField
          className={classes.input}
          name="addTodo"
          fullWidth
          color="secondary"
          placeholder="Add todo..."
          value={input.addTodo}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<AddCircleOutline />}
          onClick={() => handleAdd()}
        >
          Add
        </Button>
      </ListItem>
      <EditTodoDialog
        isOpen={Boolean(editedTodo)}
        input={input.editTodo}
        onInputChange={handleInputChange}
        onClose={handleCloseEdit}
        onUpdate={handleUpdate}
      />
    </List>
  )
}

export default Todos

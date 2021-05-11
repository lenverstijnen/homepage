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
  LinearProgress,
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
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true)
      const { data: todos } = await axios.get(
        `${process.env.REACT_APP_NODE_API_URI}api/todos`
      )
      setTodos(todos)
      setIsLoading(false)
    }

    fetchTodos()
  }, [setTodos])

  const handleInputChange = ({ currentTarget }) => {
    setInput({ ...input, [currentTarget.name]: currentTarget.value })
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleAdd()
    }
  }

  const handleAdd = async () => {
    setIsLoading(true)
    const newTodo = { text: input.addTodo, isDone: false }

    setInput({ ...input, addTodo: '' })
    try {
      const { data: addedTodo } = await axios.post(
        `${process.env.REACT_APP_NODE_API_URI}api/todos`,
        newTodo
      )
      setTodos([...todos, addedTodo])
    } catch (err) {
      alert('Request failed...')
    }

    setIsLoading(false)
  }

  const handleToggle = async (todo) => {
    const newTodo = { ...todo, isDone: !todo.isDone }
    const index = todos.indexOf(todo)
    let todoArr = [...todos]

    try {
      const { data: toggledTodo } = await axios.put(
        `${process.env.REACT_APP_NODE_API_URI}api/todos/${todo._id}`,
        newTodo
      )
      todoArr.splice(index, 1, toggledTodo)
      setTodos(todoArr)
    } catch (err) {
      alert('Request failed...')
    }
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
    setIsUpdating(true)
    const newTodo = { ...editedTodo, text: input.editTodo }
    const index = todos.indexOf(editedTodo)
    let todoArr = [...todos]

    try {
      const { data: updatedTodo } = await axios.put(
        `${process.env.REACT_APP_NODE_API_URI}api/todos/${newTodo._id}`,
        newTodo
      )
      todoArr.splice(index, 1, updatedTodo)
      setTodos(todoArr)
    } catch (err) {
      alert('Request failed...')
    }

    handleCloseEdit()
    setIsUpdating(false)
  }

  const handleDelete = async (event, todo) => {
    event.stopPropagation()
    setIsLoading(true)
    const todoArr = [...todos]

    try {
      const { data: deletedTodo } = await axios.delete(
        `${process.env.REACT_APP_NODE_API_URI}api/todos/${todo._id}`
      )
      const newTodoArr = todoArr.filter((t) => t._id !== deletedTodo._id)
      setTodos(newTodoArr)
    } catch (err) {
      alert('Request failed...')
    }

    setIsLoading(false)
  }

  return (
    <div>
      <List>
        {todos.map((t) => (
          <ListItem
            button
            key={t._id}
            onClick={() => handleToggle(t)}
            onMouseEnter={() => setHover(t._id)}
            onMouseLeave={() => setHover(null)}
          >
            <ListItemIcon>
              {t.isDone ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
            </ListItemIcon>
            <ListItemText
              className={t.isDone ? classes.todoTextDone : null}
              key={t._id}
              primary={t.text}
            />
            <ListItemIcon>
              {hover === t._id && (
                <IconButton
                  disabled={isLoading}
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
                  disabled={isLoading}
                  size="small"
                  onClick={(event) => handleDelete(event, t)}
                >
                  <Delete />
                </IconButton>
              )}
            </ListItemIcon>
          </ListItem>
        ))}
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
          <div>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<AddCircleOutline />}
              onClick={() => handleAdd()}
              disabled={isLoading}
            >
              Add
            </Button>
          </div>
        </ListItem>
        <EditTodoDialog
          isOpen={Boolean(editedTodo)}
          input={input.editTodo}
          onInputChange={handleInputChange}
          onClose={handleCloseEdit}
          onUpdate={handleUpdate}
          isUpdating={isUpdating}
        />
      </List>
      {isLoading && <LinearProgress color="secondary" />}
    </div>
  )
}

export default Todos

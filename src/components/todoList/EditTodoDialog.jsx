import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  DialogContent,
  Divider,
} from '@material-ui/core'
import { Cancel, Save } from '@material-ui/icons'

const EditTodoDialog = ({
  isOpen,
  input,
  onInputChange,
  onClose,
  onUpdate,
}) => {
  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <DialogTitle>Edit todo</DialogTitle>
      <Divider />
      <DialogContent>
        <TextField
          fullWidth
          name="editTodo"
          color="secondary"
          value={input}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<Cancel />}
          variant="outlined"
          color="inherit"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          startIcon={<Save />}
          variant="outlined"
          color="inherit"
          onClick={onUpdate}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditTodoDialog

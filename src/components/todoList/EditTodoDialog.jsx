import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  DialogContent,
  Divider,
  LinearProgress,
} from '@material-ui/core'
import { Cancel, Save } from '@material-ui/icons'

const EditTodoDialog = ({
  isOpen,
  input,
  onInputChange,
  onClose,
  onUpdate,
  isUpdating,
}) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onUpdate()
    }
  }

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose}>
      <DialogTitle>Edit todo</DialogTitle>
      <Divider />
      <DialogContent>
        <TextField
          fullWidth
          onKeyDown={handleKeyDown}
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
      {isUpdating && <LinearProgress color="secondary" />}
    </Dialog>
  )
}

export default EditTodoDialog

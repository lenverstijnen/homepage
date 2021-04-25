import React, { createContext, useState } from 'react'

const TodosContext = createContext([])

const TodosContextProvider = (props) => {
  const [todos, setTodos] = useState([])

  return (
    <TodosContext.Provider value={[todos, setTodos]}>
      {props.children}
    </TodosContext.Provider>
  )
}

export { TodosContext, TodosContextProvider }

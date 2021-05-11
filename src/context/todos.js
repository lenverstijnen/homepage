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

// Jo man, hier kun je een hook maken, useTodos en die exporteren. Dan hoef je in je components niet steeds
// de useContext hook te implementeren. 

// voorbeeld: export const useTodos = useContext(TodosContext) 

export { TodosContext, TodosContextProvider }

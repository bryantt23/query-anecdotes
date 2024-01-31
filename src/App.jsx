import AnecdoteList from "./components/AnecdoteList"
import NotificationContext from './NotificationContext'
import { useReducer } from "react"

const initialState = {
  message: "",
  visible: false
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return { ...state, visible: true, message: action.message };
    case "HIDE_NOTIFICATION":
      return { ...state, visible: false };
    default:
      return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <AnecdoteList />
    </NotificationContext.Provider>
  )
}

export default App

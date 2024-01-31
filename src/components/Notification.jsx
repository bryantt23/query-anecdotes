import NotificationContext from '../NotificationContext'
import { useContext, useEffect } from 'react'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  useEffect(() => {
    let timeout
    if (notification.visible) {
      timeout = setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" })
      }, 5000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [notification.visible]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (!notification.visible) return null

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification

const useNotification = () => {
  const notification = (
    noti,
    type,
    title,
    message,
    placement = 'bottomLeft'
  ) => {
    if (type === 'error') {
      for (let i = 0; i < message.length; i++) {
        noti[type]({
          message: title,
          description: message[i],
          placement,
        })
      }
    } else if (type === 'success') {
      noti[type]({
        message: title,
        description: message,
        placement,
      })
    }
  }

  return { notification }
}

export default useNotification

import { message } from 'ant-design-vue'
const useMessage = () => {
  const errorMessage = (errorCodeList) => {
    const errorMessageList = errorCodeList.map((error) => error.code)
    errorMessageList.forEach((element) => {
      message.error($nuxt.$t(`error.${element}`))
    })
  }
  return { errorMessage }
}

export default useMessage

export async function useFetch(axios: any) {
  try {
    const a = axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=8')
      .then((res: any) => res.data)

    const b = axios
      .get('https://jsonplaceholder.typicode.com/posts?_limit=8')
      .then((res: any) => res.data)

    return await Promise.all([a, b])
  } catch (error) {
    console.log(error)
    throw error
  }
}

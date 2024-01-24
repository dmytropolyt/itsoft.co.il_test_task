import { useEffect } from "react"
import { Header } from "./components/Header"
import { Content } from "./components/Content"
import { useAppDispatch } from "./AppContext"

function App() {
  const dispatch =  useAppDispatch();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const isAuthenticated = !!access_token;

    dispatch({ type: 'LOGIN', payload: isAuthenticated });
  }, [])

  return (
    <>
      <Header />
      <Content />
    </>
  )
}

export default App

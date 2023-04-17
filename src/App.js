import './App.css'
import { useState, useEffect } from 'react'
import { fetchUser } from './api'
import { Routes, Route } from 'react-router-dom'
import UserCard from './components/UserCard'
import Articles from './components/Articles'
import Article from './components/Article'

function App() {

  const [userName, setUserName] = useState('tickle122')
  const [user, setUser] = useState({})

  useEffect(() => {
    fetchUser(userName)
    .then((data) => {
      setUser(data)
    })
  }, [userName])

  return (
    <div className="App">
      <header className="App-header">
        <UserCard username={user.username} name={user.name} avatarURL={user.avatar_url} />
        <h1>NC News</h1>
      </header>
      <main className="App-body">
        <Routes>
          <Route path='/' element={<Articles />} />
          <Route path='/articles' element={<Articles />}/>
          <Route path='/:topic_name' element={<Articles />} />
          <Route path='/articles/:article_id' element={<Article />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
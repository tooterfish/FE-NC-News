import './App.css'

import { useState, useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from './contexts/UserProvider'

import { fetchUser } from './api'
import { fetchTopics } from './api'

import UserCard from './components/UserCard'
import TitleCard from './components/TitleCard'
import TopicNav from './components/TopicNav'
import Articles from './components/Articles'
import Article from './components/Article'

function App() {
  const {setUser} = useContext(UserContext)
  const [topics, setTopics] = useState({})

  useEffect(() => {
    fetchUser('tickle122')
    .then((data) => {
      setUser(data)
    })
  }, [setUser])

  useEffect(() => {
    fetchTopics()
    .then(({topics}) => {
      const topicRef = {}
      topics.forEach(topic => {
        topicRef[topic.slug] = topic.description
      })
      setTopics(topicRef)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <UserCard />
        <TitleCard />
        <TopicNav topics={topics}/>
      </header>
      <main className="App-body">
        <Routes>
          <Route path='/' element={<Articles topics={topics}/>} />
          <Route path='/articles' element={<Articles topics={topics}/>}/>
          <Route path='/:topic_name/*' element={<Articles topics={topics}/>} />
          <Route path='/articles/:article_id' element={<Article topics={topics}/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
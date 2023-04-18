import './App.css'

import { useState, useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import { fetchUser } from './api'
import { fetchTopics } from './api'

import UserCard from './components/UserCard'
import TitleCard from './components/TitleCard'
import TopicNav from './components/TopicNav'
import Articles from './components/Articles'
import Article from './components/Article'
import { UserContext } from './contexts/UserProvider'


function App() {
  const {setUser} = useContext(UserContext)
  const [topics, setTopics] = useState({})

  useEffect(() => {
    fetchUser('tickle122')
    .then((data) => {
      setUser(data)
    })
  })

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
import './App.css'
import { useState, useEffect } from 'react'
import { fetchUser } from './api'
import { Routes, Route } from 'react-router-dom'
import { fetchTopics } from './api'
import UserCard from './components/UserCard'
import TitleCard from './components/TitleCard'
import TopicNav from './components/TopicNav'
import Articles from './components/Articles'
import Article from './components/Article'


function App() {

  const [userName, setUserName] = useState('tickle122')
  const [user, setUser] = useState({})
  const [topics, setTopics] = useState({})

  useEffect(() => {
    fetchUser(userName)
    .then((data) => {
      setUser(data)
    })
  }, [userName])

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
        <UserCard username={user.username} name={user.name} avatarURL={user.avatar_url} />
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
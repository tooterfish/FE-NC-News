import { Link } from 'react-router-dom'

export default function TopicNav({topics}) {
  const topicArray = Object.keys(topics)
  return <div className="topic-nav">
        <ul>
        {
        topicArray.map((topic) => {
          return <li key={topic}>
            <Link to={`/${topic}`}>{topic}</Link>
          </li>
        })
        }
      </ul>
    </div>
    
}
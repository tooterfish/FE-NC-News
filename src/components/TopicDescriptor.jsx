import { useParams } from 'react-router-dom'

export default function TopicDescriptor({topics}) {
  const { topic_name } = useParams()

  return <div className="topic-descriptor">
    {(!topics[topic_name]) ? <h3>Reading is good!</h3>: <h3>{topics[topic_name]}</h3>}
  </div>
}
import { useEffect, useState } from "react"
import { fetchArticles, fetchTopics } from "../api"
import { useParams } from "react-router-dom"

import ArticleList from "./ArticleList"
import Pageinator from "./Paginator"
import TopicDescriptor from "./TopicDescriptor"

export default function Articles({ topic }) {
  const [currentPage, setPage] = useState('1')
  const [currentTopic, setTopic ] = useState(topic)
  const [topics, setTopics] = useState({})
  const [articleList, setArticleList] = useState([])
  const [totalArticles, setTotalArticles] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const { topic_name } = useParams()

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

  useEffect(() => {
    if (topic_name) setTopic(topic_name)
    setIsLoading(true)
    fetchArticles(currentTopic, currentPage)
    .then((data) => {
      setArticleList(data.articles)
      setTotalArticles(data.total_count)
    })
    setIsLoading(false)
  }, [currentTopic, currentPage, topic_name])

  return <div className="articles">
    <TopicDescriptor description={topics[currentTopic]}/>
    <Pageinator currentPage={currentPage} setPage={setPage} itemsPerPage={10} totalItems={totalArticles}/>
    <ArticleList articleList={articleList}/>
    <Pageinator currentPage={currentPage} setPage={setPage} itemsPerPage={10} totalItems={totalArticles}/>
  </div>
}
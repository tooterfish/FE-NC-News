import { useEffect, useState } from "react"
import { fetchArticles, fetchTopics } from "../api"
import { useParams } from "react-router-dom"

import ArticleList from "./ArticleList"
import Pageinator from "./Paginator"
import TopicDescriptor from "./TopicDescriptor"

export default function Articles({ topic }) {

  const { topic_name } = useParams()

  const [currentPage, setPage] = useState('1')
  const [topics, setTopics] = useState({})
  const [articleList, setArticleList] = useState([])
  const [totalArticles, setTotalArticles] = useState()
  const [isLoading, setIsLoading] = useState(true)


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

    setIsLoading(true)
    fetchArticles(topic_name, currentPage)
    .then((data) => {
      setArticleList(data.articles)
      setTotalArticles(data.total_count)
    })
    setIsLoading(false)
  }, [currentPage, topic_name])

  return <div className="articles">
    <TopicDescriptor description={topics[topic_name]}/>
    <Pageinator currentPage={currentPage} setPage={setPage} itemsPerPage={10} totalItems={totalArticles}/>
    {isLoading ? <h3>Loading...</h3> : <ArticleList articleList={articleList}/>}
    <Pageinator currentPage={currentPage} setPage={setPage} itemsPerPage={10} totalItems={totalArticles}/>
  </div>
}
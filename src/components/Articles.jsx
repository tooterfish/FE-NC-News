import { useEffect, useState } from "react"
import { fetchArticles, fetchTopics } from "../api"
import { useParams, useSearchParams } from "react-router-dom"

import ArticleList from "./ArticleList"
import Pageinator from "./Paginator"
import TopicDescriptor from "./TopicDescriptor"
import ArticleSortForm from "./ArticleSortForm"

export default function Articles({ topic }) {

  const { topic_name } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  // const [sortBy, setSortBy] = useState('')
  // const [sortOrder, setSortOrder] = useState('')

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

  //on first page load ensure default params set
  useEffect(() => {
    if (searchParams.get('p') === null) {
      searchParams.set('p', 1)
      setSearchParams(searchParams)
    }
  })

  useEffect(() => {
    setIsLoading(true)
    fetchArticles(topic_name, searchParams.get('p'))
    .then((data) => {
      setArticleList(data.articles)
      setTotalArticles(data.total_count)
    })
    setIsLoading(false)
  }, [topic_name, searchParams])

  return <div className="articles">
    <TopicDescriptor description={topics[topic_name]}/>
    <Pageinator itemsOnPage={articleList.length} totalItems={totalArticles}/>
    {isLoading ? <h3>Loading...</h3> : <ArticleList articleList={articleList}/>}
    <Pageinator itemsOnPage={articleList.length} totalItems={totalArticles}/>
  </div>
}
import { useEffect, useState } from "react"
import { fetchArticles } from "../api"
import { useParams, useSearchParams } from "react-router-dom"

import ArticleList from "./ArticleList"
import Pageinator from "./Paginator"
import TopicDescriptor from "./TopicDescriptor"
import ArticleSortForm from "./ArticleSortForm"

export default function Articles({ topics }) {

  const { topic_name } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [articleList, setArticleList] = useState([])
  const [totalArticles, setTotalArticles] = useState()
  const [isLoading, setIsLoading] = useState(true)

  //on first page load ensure default params set
  useEffect(() => {
    let changed = false
    if (searchParams.get('p') === null) {
      searchParams.set('p', 1)
      changed = true
    }
    if (searchParams.get('sort_by') === null) {
      searchParams.set('sort_by', 'created_at')
      changed = true
    }
    if (searchParams.get('order') === null) {
      searchParams.set('order', 'DESC')
      changed = true
    }
    if (changed) setSearchParams(searchParams)
  })

  useEffect(() => {
    setIsLoading(true)
    fetchArticles(topic_name, searchParams.get('p'), searchParams.get('sort_by'), searchParams.get('order'))
    .then((data) => {
      setArticleList(data.articles)
      setTotalArticles(data.total_count)
      setIsLoading(false)
    })
  }, [topic_name, searchParams])

  return <div className="articles">
    <TopicDescriptor topics={topics}/>
    <ArticleSortForm />
    <Pageinator itemsOnPage={articleList.length} totalItems={totalArticles}/>
    {isLoading ? <h3>Loading...</h3> : <ArticleList articleList={articleList}/>}
    <Pageinator itemsOnPage={articleList.length} totalItems={totalArticles}/>
  </div>
}
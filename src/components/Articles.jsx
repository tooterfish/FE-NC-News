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

  const [articleList, setArticleList] = useState()
  const [totalArticles, setTotalArticles] = useState()
  const [err, setErr] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [inactive, setInactive] = useState(true)

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
    setInactive(true)
    fetchArticles(topic_name, searchParams.get('p'), searchParams.get('sort_by'), searchParams.get('order'))
    .then((data) => {
      setArticleList(data.articles)
      setTotalArticles(data.total_count)
      setIsLoading(false)
      setInactive(false)
    })
    .catch((err) => {
      setErr(err)
      setIsLoading(false)
    })
  }, [topic_name, searchParams])

  return <div className="articles">
    <TopicDescriptor topics={topics}/>
    <ArticleSortForm />
    <Pageinator inactive={inactive} itemsPerPage={10} totalItems={totalArticles}/>
    { isLoading ? <div className="loader"></div>: 
      articleList === undefined ? <><h3>oops, something went wrong!</h3><h4>{err.message}: {err.response.data.msg}</h4></> :
    <>
    <ArticleList articleList={articleList}/>
    </>
    }
    <Pageinator inactive={inactive} itemsPerPage={10} totalItems={totalArticles}/>
  </div>
}
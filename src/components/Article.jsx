import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchArticle } from "../api"


export default function Article() {
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const {article_id} = useParams()

  useEffect(() => {
    setIsLoading(true)
    fetchArticle(article_id)
    .then(({article}) => {
      setArticle(article)
    })
    setIsLoading(false)
  }, [article_id])

  return <div className="article">
    <h2>{article.title}</h2>
    <h3>{article.topic}</h3>
    <h3>by {article.author}</h3>
    <img src={article.article_img_url} />
    <p>{article.body}</p>
  </div>
  
}
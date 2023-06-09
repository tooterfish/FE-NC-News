import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchArticle, voteOnArticle } from "../api"

import Comments from './Comments'
import VoteButton from './VoteButton'
import ArticleContents from "./ArticleContents"


export default function Article() {
  const [article, setArticle] = useState({})
  const [err, setErr] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const {article_id} = useParams()

  useEffect(() => {
    setIsLoading(true)
    fetchArticle(article_id)
    .then(({article}) => {
      setArticle(article)
      setIsLoading(false)
    })
    .catch((err) => {
      setErr(err)
      setIsLoading(false)
    })
  }, [article_id])

  return <div className="article">
    { isLoading ? <div className="loader"></div> : 
    article.body === undefined ? <><h3>oops, something went wrong!</h3><h4>{err.message}: {err.response.data.msg}</h4></> :
    <>
    <ArticleContents article={article}/>
    <VoteButton initVotes={article.votes} id={article_id} voteFunc={voteOnArticle}/>
    <Comments articleId={article_id} totalComments={article.comment_count}/>
    </>
    }
  </div>
  
}
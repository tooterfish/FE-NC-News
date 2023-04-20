import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchArticle, voteOnArticle } from "../api"

import Comments from './Comments'
import VoteButton from './VoteButton'
import ArticleContents from "./ArticleContents"


export default function Article() {
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const {article_id} = useParams()

  useEffect(() => {
    setIsLoading(true)
    fetchArticle(article_id)
    .then(({article}) => {
      setArticle(article)
      setIsLoading(false)
    })
  }, [article_id])

  return <div className="article">
    { isLoading ? <h3>Loading...</h3> : <>
    <ArticleContents article={article}/>
    <VoteButton initVotes={article.votes} id={article_id} voteFunc={voteOnArticle}/>
    <Comments articleId={article_id} totalComments={article.comment_count}/>
    </>
    }
  </div>
  
}
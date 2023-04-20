import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchArticle, voteOnArticle } from "../api"

import Comments from './Comments'
import VoteButton from './VoteButton'
import ArticleContents from "./ArticleContents"


export default function Article() {
  const [article, setArticle] = useState({})
  const [votes, setVotes] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const {article_id} = useParams()

  useEffect(() => {
    setIsLoading(true)
    fetchArticle(article_id)
    .then(({article}) => {
      setArticle(article)
      setVotes(article.votes)
      setIsLoading(false)
    })
  }, [article_id])

  function addVote() {
    setVotes(votes => votes + 1)
    voteOnArticle(article_id)
    .then(() => {

    })
    .catch(() => {
      setVotes(votes => votes - 1)
    })
  }

  return <div className="article">
    { isLoading ? <h3>Loading...</h3> : <>
    <ArticleContents article={article}/>
    <VoteButton votes={votes} addVote={addVote}/>
    <Comments articleId={article_id} totalComments={article.comment_count}/>
    </>
    }
  </div>
  
}
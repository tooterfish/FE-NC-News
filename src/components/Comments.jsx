import { useEffect, useState } from 'react'
import { fetchComments } from '../api'

import CommentForm from './CommentForm'
import CommentCard from './CommentCard'

export default function Comments({ articleId, totalComments }) {
  const [commentList, setCommentList] = useState([])
  const [currentPage, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [moreCommentsFound, setMoreCommentsFound] = useState(true)

  useEffect(() => {
    loadMoreComments()
  }, [])


  //will use this function to try to make a fancy infinite scroll later, for now its a button
  function loadMoreComments() {
    setLoadingMore(true)
    fetchComments(articleId, currentPage).then((response) => {
      if(response.comments.length !== 0) {
        const newCommentList = [...commentList].concat(response.comments)
        setCommentList(newCommentList)
        setPage(currentPage + 1)
        setMoreCommentsFound(true)
        setLoadingMore(false)
      }
      else {
        setLoadingMore(false)
        setMoreCommentsFound(false)
      }
    })
  }

  return <div className="comments">
    <CommentForm articleId={articleId} setCommentList={setCommentList}/>
    <ul>
    {
    commentList.map((comment) => {
      return <CommentCard key={comment.comment_id} comment={comment}/>
    })
    }
    </ul>
    {loadingMore ? <div className="loader"></div>: <button onClick={loadMoreComments}>{moreCommentsFound ? <>Load more comments</> : <>No more comments</>}</button>}
  </div>
}
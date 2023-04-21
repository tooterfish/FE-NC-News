import { useEffect, useState } from 'react'
import { fetchComments } from '../api'

import CommentForm from './CommentForm'
import CommentCard from './CommentCard'

export default function Comments({ articleId }) {
  const [commentList, setCommentList] = useState([])
  const [currentPage, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [moreCommentsFound, setMoreCommentsFound] = useState(true)

  useEffect(() => {
    if (commentList.length === 0) loadMoreComments()

    function onScroll() {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        loadMoreComments()}
    }

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

    window.addEventListener('scroll', onScroll)
    return () => { window.removeEventListener('scroll', onScroll)}
  }, [currentPage, articleId, commentList])

  return <div className="comments">
    <CommentForm articleId={articleId} setCommentList={setCommentList}/>
    <ul>
    {
    commentList.map((comment) => {
      return <CommentCard key={comment.comment_id} comment={comment}/>
    })
    }
    </ul>
    {(loadingMore && moreCommentsFound) ? <div className="loader"></div> : <div></div>}
  </div>
}
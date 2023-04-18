import { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserProvider'
import { postComment } from '../api'

export default function CommentForm({articleId, setCommentList}) {

  const {user} = useContext(UserContext)
  const [newCommentText, setCommentText] = useState('')

  function validateComment() {
    const minCharacters = 5
    //comment is less than minimum allowed
    if (newCommentText.length < minCharacters) return true
    //comment is only whitespace
    if (!/\S/.test(newCommentText)) return true
    return false
  }

  function handleChange(e) {
    setCommentText(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (newCommentText !== '') {
      postComment(articleId, user.username, newCommentText).then((comment) => {
        setCommentList((commentList) => {
          setCommentText('')
          return [comment, ...commentList]
        })
      })
    }
  }

  return <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="new-comment">Post new comment </label>
      <input id="new-comment" type="text" onChange={handleChange} />
      <input disabled={validateComment()} type="submit" value="Submit"/>
    </form>
}
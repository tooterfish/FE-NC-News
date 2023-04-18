import { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserProvider'
import { postComment } from '../api'

export default function CommentForm({articleId, setCommentList}) {

  const {user} = useContext(UserContext)
  const [newCommentText, setCommentText] = useState('')
  const [disableSubmit, setDisable] = useState(false)

  function validateComment() {
    const minCharacters = 5
    //comment length is less than minimum allowed characters
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
    setDisable(true)
    postComment(articleId, user.username, newCommentText)
    .then((comment) => {
      setCommentList((commentList) => {
        return [comment, ...commentList]
      })
      setDisable(false)
      setCommentText('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="new-comment">Post new comment </label>
      <input id="new-comment" type="text" value={newCommentText} onChange={handleChange} />
      <input disabled={(validateComment() || disableSubmit)} type="submit" value="Submit"/>
    </form>
}
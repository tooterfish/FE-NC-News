import { useState } from 'react'

export default function CommentForm({articleId, setCommentList}) {
  const [newCommentText, setCommentText] = useState('')

  function handleChange(e) {
    setCommentText(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return <div className="comment-form">
    <label htmlFor="new-comment-input">Post new comment </label>
      <input id="new-comment-input" type="text" onChange={handleChange}></input>
      <button onSubmit={handleSubmit}>Submit</button>
  </div>
}
import { UserContext } from '../contexts/UserProvider'
import { useContext, useState } from 'react'
import { deleteComment } from '../api'

export default function CommentCard({comment}) {

  const [isDeleted, setDeleted] = useState(false)
  const [overlay, setOverlay] = useState('hide')
  const [overlayText, setOverlayText] = useState('')

  const {user} = useContext(UserContext)
  const date = new Date(comment.created_at)

  function disappearComment() {
    setDeleted(true)
  }

  function handleDelete(e) {
    setOverlay('show')
    setOverlayText('deleting comment...')
    deleteComment(e.target.value)
    .then(() => {
      setTimeout(disappearComment, 2000)
    })
    .catch((err) => {
      setOverlayText('oops, something went wrong!')
      setOverlay('hide')
    })
  }

  return <> { (isDeleted) ? <></> : <li className={`comment-card`}>
    <span className="overlay-text">{overlayText}</span>
    <div className={overlay}>
    <h4>{comment.author}</h4>
    <span>posted on {date.toLocaleDateString()} at {date.toLocaleTimeString()}</span>
    <p>{comment.body}</p>
    <span>votes: {comment.votes}</span>
    { (user.username !== comment.author || overlay === 'show') ? <></> : <button id="delete-comment" value={comment.comment_id} onClick={handleDelete}>Delete</button>}
    </div>
  </li>
  } </> 
  
}
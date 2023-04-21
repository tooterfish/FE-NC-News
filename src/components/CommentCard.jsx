import { UserContext } from '../contexts/UserProvider'
import { useContext, useState } from 'react'
import { deleteComment } from '../api'

export default function CommentCard({comment}) {

  const [isDeleted, setDeleted] = useState(false)
  const [visible, setVisible] = useState('hidden')
  const [overlayText, setOverlayText] = useState('')

  const {user} = useContext(UserContext)
  const date = new Date(comment.created_at)

  function disappearComment() {
    setDeleted(true)
  }

  function handleDelete(e) {
    setVisible('visible')
    deleteComment(e.target.value)
    .then(() => {
      setTimeout(disappearComment, 1000)
    })
    .catch((err) => {
      setOverlayText('oops, something went wrong!')
      setVisible('hidden')
    })
  }

  return <> { (isDeleted) ? <></> : <li className={`comment-card`}>
    <span className="overlay-text">{overlayText}</span>
    <div className="loader" style={{position:'absolute', margin:'auto', left:'50%', visibility:visible}}></div>
    <div className={visible}>
    <h4>{comment.author}</h4>
    <span>posted on {date.toLocaleDateString()} at {date.toLocaleTimeString()}</span>
    <p>{comment.body}</p>
    <span>votes: {comment.votes}</span>
    { (user.username !== comment.author || visible === 'visible') ? <></> : <button id="delete-comment" value={comment.comment_id} onClick={handleDelete}>Delete</button>}
    </div>
  </li>
  } </> 
  
}
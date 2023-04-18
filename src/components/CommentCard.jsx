export default function CommentCard({comment}) {
  const date = new Date(comment.created_at)
  return <li className="comment-card">
    <h4>{comment.author}</h4>
    <span>posted on {date.toLocaleDateString()} at {date.toLocaleTimeString()}</span>
    <p>{comment.body}</p>
    <span>votes: {comment.votes}</span>
  </li>
}
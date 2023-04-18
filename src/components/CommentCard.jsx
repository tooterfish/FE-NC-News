export default function CommentCard({comment}) {
  return <li className="comment-card">
    <h4>{comment.author}</h4>
    <span>posted on {comment.created_at}</span>
    <span>votes {comment.votes}</span>
    <p>{comment.body}</p>
  </li>
}
export default function CommentCount({commentCount}) {
  return <div className="comment-count">
    <div className="sym">&#128488;</div>
    <div className="num">{commentCount}</div>
  </div>
}
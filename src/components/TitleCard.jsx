import { Link } from 'react-router-dom'

export default function TitleCard() {
  return <div className="title">
      <Link to="/">
        <h1>NC News</h1>
      </Link>
    </div>
}
import { Link } from 'react-router-dom'

import VoteButton from './VoteButton'
import { voteOnArticle } from '../api'

export default function ArticleStub({article}) {
  const date = new Date(article.created_at)

  return <div className="article-stub">
          <Link to={`/articles/${article.article_id}`}><h2>{article.title}</h2></Link>
          <h3>{article.topic}</h3>
          <h3>by {article.author}</h3>
          <span>comments: {article.comment_count}</span>
          <VoteButton votes={article.votes} id={article.article_id} voteFunc={voteOnArticle}/>
          <span>posted on {date.toLocaleDateString()}</span>
        </div>
}
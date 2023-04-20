import { Link } from 'react-router-dom'

import VoteButton from './VoteButton'
import { voteOnArticle } from '../api'
import CommentCount from './CommentCount'

export default function ArticleStub({article}) {
  const date = new Date(article.created_at)

  return <div className="article-stub">
          <Link to={`/articles/${article.article_id}`}><h2>{article.title}</h2></Link>
          <h4>{article.topic}</h4>
          <span>posted on {date.toLocaleDateString()}</span>
          <h4>by {article.author}</h4>
          <div className="icon-container">
          <CommentCount commentCount={article.comment_count}/>
          <VoteButton initVotes={article.votes} id={article.article_id} voteFunc={voteOnArticle}/>
          </div>
        </div>
}
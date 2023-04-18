import { Link } from 'react-router-dom'

export default function ArticleList({ articleList }) {
  return <ul className="article-list">
    {
    articleList.map((article) => {
      return <li key={article.article_id}>
        <Link to={`/articles/${article.article_id}`}><h2>{article.title}</h2></Link>
        <h3>{article.topic}</h3>
        <h3>by {article.author}</h3>
        <span>comments: {article.comment_count}</span>
        <span>votes: {article.votes}</span>
      </li>
    })
    }
  </ul>
}
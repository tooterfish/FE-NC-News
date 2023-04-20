import ArticleStub from './ArticleStub'

export default function ArticleList({ articleList }) {
  return <ul className="article-list">
    {
    articleList.map((article) => {
      return <li key={article.article_id}>
                <ArticleStub article={article}/>
      </li>
    })
    }
  </ul>
}
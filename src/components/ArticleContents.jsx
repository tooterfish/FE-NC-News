export default function ArticleContents({article}) {
  return <>
    <h2>{article.title}</h2>
    <h3>{article.topic}</h3>
    <h3>by {article.author}</h3>
    <img src={article.article_img_url} alt={`${article.title}`}/>
    <p>{article.body}</p>
  </>
}
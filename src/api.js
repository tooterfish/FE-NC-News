import axios from 'axios'

const baseURL = 'https://nc-news-1jvx.onrender.com/api'

const newsAPI = axios.create({baseURL})

export async function fetchUser(userName) {
  const {data} = await newsAPI.get(`/users/${userName}`)
  return data.user
}

export async function fetchArticles(topic, page, sortBy, orderBy) {
  let topicQuery = ''
  if (topic) topicQuery = `&topic=${topic}`
  const searchQuery = `&sort_by=${sortBy}&order=${orderBy}`
  const {data} = await newsAPI.get(`/articles?p=${page}${topicQuery}${searchQuery}`)
  return data
}

export async function fetchTopics() {
  const {data} = await newsAPI.get(`/topics`)
  return data
}

export async function fetchArticle(articleId) {
  const {data} = await newsAPI.get(`/articles/${articleId}`)
  return data
}

export async function fetchComments(articleId, page) {
  const {data} = await newsAPI.get(`/articles/${articleId}/comments?p=${page}`)
  return data
}

export async function postComment(articleId, username, body) {
  const {data} = await newsAPI.post(`/articles/${articleId}/comments`, { username, body })
  return data.comment
}

export async function deleteComment(commentId) {
  await newsAPI.delete(`/comments/${commentId}`)
  return
}
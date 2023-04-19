import { UserContext } from '../contexts/UserProvider'
import { useContext } from 'react'

export default function UserCard() {
  const { user } = useContext(UserContext)

  const isUser = () => {
    if (user.username) return false
    return true
  }

  return <div className="user-card">
    { isUser() ? <h3>Loading...</h3> : <>
    <img src={user.avatar_url} alt={`${user.name}'s avatar`}/>
    <h4>{user.username}</h4> </>}
  </div>
}
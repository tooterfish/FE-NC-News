import { UserContext } from '../contexts/UserProvider'
import { useContext } from 'react'

export default function UserCard() {
  const { user } = useContext(UserContext)

  return <div className="user-card">
    <img src={user.avatar_url} alt={`${user.name}'s avatar`}/>
    <h4>{user.username}</h4>
  </div>
}
export default function UserCard({ username, name, avatarURL }) {

  return <div className="user-card">
    <img src={avatarURL} alt="avatar"/>
    <h4>{username}</h4>
  </div>
}
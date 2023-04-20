import { useState, useEffect } from "react"

export default function VoteButton({votes, id, voteFunc}) {

  const [currentVotes, setVotes] = useState()
  const [voted, setVoted] = useState(false)

  useEffect(() => {
    setVotes(votes)
  }, [])

  function handleVote() {
    setVotes(votes => votes + 1)
    setVoted(true)
    voteFunc(id)
    .then(() => {
    })
    .catch(() => {
      setVotes(votes => votes - 1)
      setVoted(false)
    })
  }
  return <button disabled={voted} onClick={handleVote} className="vote-button">
          <div className="sym">
            &#11088;
          </div>
          <div className="num">
            {currentVotes}
          </div>
        </button>
}
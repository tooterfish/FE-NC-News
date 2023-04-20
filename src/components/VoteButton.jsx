import { useState, useEffect } from "react"

export default function VoteButton({votes, id, voteFunc}) {

  const [currentVotes, setVotes] = useState()

  useEffect(() => {
    setVotes(votes)
  }, [])

  function handleVote() {
    setVotes(votes => votes + 1)
    voteFunc(id)
    .then(() => {
    })
    .catch(() => {
      setVotes(votes => votes - 1)
    })
  }
  return <button onClick={handleVote} className="vote-button">
          <div className="vote-sym">
            &#11088;
          </div>
          <div className="vote-num">
            {currentVotes}
          </div>
        </button>
}
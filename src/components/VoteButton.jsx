import { useState } from "react"

export default function VoteButton({initVotes, id, voteFunc}) {

  const [currentVotes, setVotes] = useState(initVotes)
  const [voted, setVoted] = useState(false)

  function handleVote() {
    setVotes(votes => votes + 1)
    setVoted(true)
    voteFunc(id)
    .then(() => {
    })
    .catch((err) => {
      setVotes(votes => votes - 1)
      setVoted(false)
      alert(`Oops, something went wrong: ${err.message}`)
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
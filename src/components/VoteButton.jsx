export default function VoteButton({votes, addVote}) {
  return <button onClick={addVote} className="vote-button">
          <div className="vote-sym">
            &#11088;
          </div>
          <div className="vote-num">
            {votes}
          </div>
        </button>
}
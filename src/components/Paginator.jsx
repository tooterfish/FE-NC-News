export default function Pageinator({currentPage, itemsPerPage, totalItems, setPage}) {
  //WIP paginator

  function decPage(e) {
    if (currentPage !== 0) setPage(+currentPage - 1)
  }

  function incPage(e) {
    setPage(+currentPage + 1)
  }

  return <div className="paginator">
    <button onClick={decPage}>-</button>
    <span>{currentPage}</span>
    <button onClick={incPage}>+</button>
  </div>
}
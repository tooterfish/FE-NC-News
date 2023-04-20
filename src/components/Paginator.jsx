import { useSearchParams } from "react-router-dom"

export default function Pageinator({itemsOnPage, totalItems}) {
  //WIP paginator
  const [searchParams, setSearchParams] = useSearchParams()

  function decPage(e) {
    const page = +searchParams.get('p')
    if (page > 1) {
      searchParams.set('p', page - 1)
      setSearchParams(searchParams)
    }
  }

  function incPage(e) {
    const page = +searchParams.get('p')
    searchParams.set('p', page + 1)
    setSearchParams(searchParams)
  }

  return <div className="paginator">
    <button onClick={decPage}>-</button>
    <span>{searchParams.get('p')}</span>
    <button onClick={incPage}>+</button>
    {/* <span>items on page: {itemsOnPage} total: {totalItems}</span> */}
  </div>
}
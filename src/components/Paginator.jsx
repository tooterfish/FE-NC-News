// import { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom"

export default function Pageinator({itemsOnPage, itemsPerPage, totalItems}) {
  //WIP paginator
  const [searchParams, setSearchParams] = useSearchParams()

  const numPages = Math.ceil(totalItems/itemsPerPage)
  let pageNums = []
  if (numPages > 0) pageNums = Array.from(new Array(numPages), (_, i) => i + 1)

  function changePage(e) {
    searchParams.set('p', e.target.value)
    setSearchParams(searchParams)
  }

  return <div className="paginator">
    {/* <button disabled={+searchParams.get('p') === 1} value={1} onClick={changePage}>&laquo;</button> */}
    <button disabled={+searchParams.get('p') === 1} value={String(+searchParams.get('p') - 1)} onClick={changePage}>&lsaquo;</button>
    { 
    pageNums.map((pageNum) => {
      return <button className={(+searchParams.get('p') === pageNum) ? 'current' : ''} key={pageNum} value={pageNum} onClick={changePage}>{pageNum}</button>
    }) 
    }
    <button disabled={+searchParams.get('p') === numPages} value={String(+searchParams.get('p') + 1)} onClick={changePage}>&rsaquo;</button>
    {/* <button disabled={+searchParams.get('p') === numPages} value={String(numPages)} onClick={changePage}>&raquo;</button> */}
  </div>
}
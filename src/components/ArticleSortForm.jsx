import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ArticleSortForm({query}) {
  const { sortBy, setSortBy, sortOrder, setSortOrder } = query
  //could alter backend to get these programatically
  const allowedSorts = [
    // { label: '...', value: '' },
    { label: 'title', value: 'title' },
    { label: 'topic', value: 'topic' },
    { label: 'author', value: 'author' },
    { label: 'posted on', value: 'created_at' },
    { label: 'votes', value: 'votes' },
    { label: 'comments', value: 'comment_count' }
  ]

  const allowedOrders = [
    // { label: '...', value: '' },
    { label: 'ascending', value: 'ASC' },
    { label: 'descending', value: 'DESC' }
  ]

  function handleSortByChange(e) {
    setSortBy(e.target.value)
  }

  function handleOrderChange(e) {
    setSortOrder(e.target.value)
  }

  // useEffect(() => {
  //   const newQuery = { sortBy: null, sortOrder: null}
  //   if (sortBy) {
  //     newQuery.sortBy = sortBy
  //     if (sortOrder) newQuery.sortOrder = sortOrder
  //   }
  //   setQuery(newQuery)
  // }, [sortBy, sortOrder])

  return <div className="article-sort-form">
    <label htmlFor="select-sort-by">Sort By</label>
    <select value={sortBy} id="select-sort-by" onChange={handleSortByChange}>
      {
      allowedSorts.map((sort) => {
        return <option key={sort.label} value={sort.value}>{sort.label}</option>
      })
      }
    </select>
    <label htmlFor="select-order">Order By</label>
    <select value={sortOrder} id="select-order" onChange={handleOrderChange}>
      {
        allowedOrders.map((order) => {
          return <option key={order.label} value={order.value}>{order.label}</option>
        })
      }
    </select>
  </div>
}
import { useSearchParams } from 'react-router-dom'

export default function ArticleSortForm() {
  const [searchParams, setSearchParams] = useSearchParams()

  //could alter backend to get these programatically
  const allowedSorts = [
    { label: 'title', value: 'title' },
    { label: 'topic', value: 'topic' },
    { label: 'author', value: 'author' },
    { label: 'posted on', value: 'created_at' },
    { label: 'votes', value: 'votes' },
    { label: 'comments', value: 'comment_count' }
  ]

  const allowedOrders = [
    { label: 'ascending', value: 'ASC' },
    { label: 'descending', value: 'DESC' }
  ]

  function handleSortByChange(e) {
    searchParams.set('sort_by', e.target.value)
    setSearchParams(searchParams)
  }

  function handleOrderChange(e) {
    searchParams.set('order', e.target.value)
    setSearchParams(searchParams)
  }

  function handleNull(param) {
    if (param) return param
    else return '...'
  }

  return <div className="article-sort-form">
    <div className="select-container">
    <label htmlFor="select-sort-by">Sort By</label>
    <select value={handleNull(searchParams.get('sort_by'))} id="select-sort-by" onChange={handleSortByChange}>
      {
      allowedSorts.map((sort) => {
        return <option key={sort.label} value={sort.value}>{sort.label}</option>
      })
      }
    </select>
    </div>
    <div className="select-container">
    <label htmlFor="select-order">Order</label>
    <select value={handleNull(searchParams.get('order'))} id="select-order" onChange={handleOrderChange}>
      {
        allowedOrders.map((order) => {
          return <option key={order.label} value={order.value}>{order.label}</option>
        })
      }
    </select>
    </div>
  </div>
}
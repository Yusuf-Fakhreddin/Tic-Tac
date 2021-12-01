import React from 'react'

const Pagination = () => {
  return (
    <Pagination
    page={page}
    count={10}
    renderItem={(item) => (
      <PaginationItem
        component={Link}
        to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
        {...item}
      />
  )
}

export default Pagination

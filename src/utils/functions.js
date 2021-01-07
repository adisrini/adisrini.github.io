import React from "react"
import _ from "lodash"

export const getTags = post => _.concat(
    post.frontmatter.bookish ? ['bookish'] : [],
    post.frontmatter.tags || []
)

export const renderTag = (tag, index, onClick, withDelete) =>
    <small
      key={tag}
      onClick={onClick && (() => onClick(tag))}
      onKeyDown={onClick && (() => onClick(tag))}
      role="button"
      tabIndex={index}
      className={['tag', `tag-${tag}`, onClick ? 'tag-clickable' : ''].join(' ')}>
      <strong>{tag}</strong>
      {withDelete && ' x'}
    </small>


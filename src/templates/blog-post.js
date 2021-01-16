import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { getTags, renderTag } from "../utils/functions"

const joinEnglish = (array) => {
  return array.reduce((acc, curr, i) => [
    ...acc,
    i === 0 ? '' : i < array.length - 1 ? ', ' : ', and ',
    <strong>{curr}</strong>
  ], [])
}

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const bookishHeader = post.frontmatter.bookish &&
    <div className="bookish-header">
      <p>
        This post is part of a series called <strong>Bookish</strong> in which I talk about some
        of the interesting ideas contained in the books I’m currently reading.
      </p>

      {post.frontmatter.bookish.length > 0 &&
        <span>
          It contains spoilers for {joinEnglish(post.frontmatter.bookish)}.
        </span>}
    </div>

  const tags = getTags(post)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}{post.frontmatter.draft && " [DRAFT]"}</h1>
          <div>
            <span>{post.frontmatter.published_on}</span> • <FontAwesomeIcon icon={faHourglassHalf} /> {post.fields.readingTime.text} <br />
            {post.frontmatter.updated_on && <span className="updated-on">Last updated: {post.frontmatter.updated_on}</span>}
          </div>
          <div className="tags">{tags.map((tag, index) => renderTag(tag, index))}</div>
        </header>
        {bookishHeader}
        <div className="blog-post-body">
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        published_on(formatString: "MMMM DD, YYYY")
        updated_on(formatString: "MMMM, DD, YYYY")
        description
        tags
        draft
        bookish
      }
      fields {
        readingTime {
          text
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

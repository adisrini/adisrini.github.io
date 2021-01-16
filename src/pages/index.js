import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import _ from "lodash"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { getTags, renderTag } from "../utils/functions"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allPosts = data.allMdx.nodes
  const allPublishedPosts = allPosts.filter(post => !post.frontmatter.draft)

  const [activeTags, setActiveTags] = useState([])

  const addActiveTag = (tag) => setActiveTags(_.uniq([...activeTags, tag]))
  const removeActiveTag = (tag) => setActiveTags(_.uniq(activeTags.filter(x => x !== tag)))
  
  const allTags = _.uniq(_.flatten(allPosts.map(post => getTags(post))))

  const posts =
    activeTags.length > 0
    ? allPublishedPosts.filter(post =>_.some(activeTags, tag => post.frontmatter[tag] || _.find(post.frontmatter.tags, x => x === tag)))
    : allPublishedPosts;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found.
        </p>
      </Layout>
    )
  }

  console.log(allTags)
  console.log(activeTags)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
        <span><strong>Categories</strong></span><br />
        <small>Select one or more to filter posts.</small>
        <div className="tags">{allTags.map((tag, index) => {
          const isActive = _.some(activeTags, activeTag => activeTag === tag)
          const action = isActive ? removeActiveTag : addActiveTag
          return renderTag(tag, index, action, !isActive)
        })}</div>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          const tags = getTags(post)

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.published_on} • {post.fields.readingTime.text}</small>
                  <div className="tags">{tags.map((tag, index) => renderTag(tag, index, addActiveTag))}</div>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___published_on], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          published_on(formatString: "MMMM DD, YYYY")
          title
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
    }
  }
`

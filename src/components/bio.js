/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faGoodreads, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            goodreads
            github
            linkedin
            email
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  const socialLink = (link, icon) => (
    <a key={link} className="bio-social-link" href={link} target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={icon} />
    </a>
  )

  const links = [
    socialLink(`https://twitter.com/${social?.twitter || ``}`, faTwitter)
  , socialLink(`https://github.com/${social?.github || ``}`, faGithub)
  , socialLink(`https://linkedin.com/in/${social?.linkedin || ``}`, faLinkedin)
  , socialLink(`https://goodreads.com/${social?.goodreads || ``}`, faGoodreads)
  , socialLink(`mailto:${social?.email || ``}`, faEnvelope)
  ]

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && social && (
        <p>
          <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          {links}
        </p>
      )}
    </div>
  )
}

export default Bio

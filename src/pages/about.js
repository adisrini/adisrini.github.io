import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About Me" />
      <Bio />
      <p>
          I'm passionate about software development,
          theoretical computer science, mathematics,
          economics, and philosophy.
      </p>
      <p>
          Contact me via e-mail at `aditya [dot] srinivasan 11 [at] gmail`.
      </p>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

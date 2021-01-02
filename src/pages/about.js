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
        I'm passionate about topics in software development, computer
        science, mathematics, finance, and philosophy.
      </p>
      <p>
        In my free time I like to read and write, consume and produce music,
        and exercise.
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

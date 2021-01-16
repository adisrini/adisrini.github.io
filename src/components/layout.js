import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      cv: file(absolutePath: { regex: "/AdityaSrinivasanCV.pdf/" }) {
        publicURL
      }
    }
  `)

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <h4>{title}</h4>
        <Link to="/about">
          About
        </Link>
        <Link to="/">
          Blog
        </Link>
        <a href={data.cv.publicURL} target="_blank" rel="noreferrer">
          CV
        </a>
        <Link to="/projects">
          Projects
        </Link>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Powered by
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout

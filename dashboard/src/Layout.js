import React from 'react'
import SideBar from './components/SideBar/SideBar'

const Layout = (props) => {
  return (
    <React.Fragment>
    <main>
        <SideBar />
        {props.children}
    </main>

      </React.Fragment>
  )
}

export default Layout

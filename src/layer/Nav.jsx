import React from 'react'


const Nav = () => {
  return (
    <div>
      <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Add</Link></li>
           
        </ul>
      </nav>
    </div>
  )
}

export default Nav

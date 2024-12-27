import React from 'react'
import { Link } from 'react-router-dom'
import Index from '../component/Index'

const Navbar = () => {
  return (
    <div>
      <nav>
        
            <li><Link to= '/'>Home</Link></li>
            <li><Link to= '/member/add'>Create</Link></li>
            
        
      </nav>
    </div>
  )
}

export default Navbar

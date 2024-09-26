import React from 'react'
import './header.css'

export default function index() {
  return (
    <div className='header'>
        <h1 className='name'>Clear The Points</h1>
        <div className='navbar'>
        <img
              src="./logo.png" 
              alt="logo"
              className="circle-image"  
              style={{
                width: '50px',
                height: '50px',
              }}
            />
        
        <strong>Intern, Nguyen Duc Anh</strong>
        </div>
        
    </div>

  )
}

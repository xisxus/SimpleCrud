import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './layer/Footer';
import Navbar from './layer/Navbar';
import Index from './component/Index';
import Create from './component/Create';
import Edit from './component/Edit';
import Details from './component/Details';


function App() {
  

  return (
    <>
      

        <div>
        


          <BrowserRouter>
            <Navbar/>
              <Routes>
                <Route path='/' element={<Index/>}/>
                <Route path='/member' element={<Index/>}/>
                <Route path='/member/add' element={<Create/>}/>
                <Route path='/member/edit/:id' element={<Edit/>}/>
                <Route path='/member/details/:id' element={<Details/>}/>
              </Routes>
             
            <Footer/>
          </BrowserRouter>


          
        </div>


    </>
  )
}

export default App

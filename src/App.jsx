import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Works from './pages/Works'
import AboutPage from './pages/AboutPage.jsx'
import Connect from './pages/Connect'
import Land from './content/Land'
import FairCampus from './pages/FairCampus'



const App = () => {
  return (
    <BrowserRouter>
        <div className='fixed z-[999]'>
          <Header/>
        </div>
            <Routes>
              <Route path='/' element={<Land/>}/>
              <Route path='/works' element={<Works/>}/>
              <Route path='/about' element={<AboutPage/>}/>
              <Route path='/connect' element={<Connect/>}/>
              <Route path='/works/faircampus' element={<FairCampus/>}/>
            </Routes>
      </BrowserRouter>
  )
}

export default App



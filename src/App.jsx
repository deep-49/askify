
import React from 'react'
import Sidebar from './pages/sidebar'
import MainBody from './pages/main'
import Header from './components/Header'


function App() {
 

  return (
    <>
  
    <div className="grid grid-cols-5 h-screen ">
     
      <div className="col-span-1  ">
        <Sidebar />

      </div>
      <div className="col-span-4 h-screen ">
       <Header/>
       <MainBody />
      </div>
    </div>
      
    </>
  )
}

export default App

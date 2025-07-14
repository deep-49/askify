
import React from 'react'
import Sidebar from './pages/sidebar'
import MainBody from './pages/main'


function App() {
 

  return (
    <>
    <div className="grid grid-cols-5 h-screen ">
      <div className="col-span-1 bg-zinc-800 text-white text-center h-screen p-5  ">
        <Sidebar />

      </div>
      <div className="col-span-4 h-screen ">
       <MainBody />
      </div>
    </div>
      
    </>
  )
}

export default App

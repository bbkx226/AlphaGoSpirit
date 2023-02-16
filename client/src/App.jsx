import React from 'react'
import { Navbar, Welcome, Footer, Services, Transaction, QrCode } from './components'

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <QrCode />
      <Transaction />
      <Footer />
    </div>
  )
}

export default App
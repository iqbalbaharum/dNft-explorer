import './App.css'
import { Routes, Route } from 'react-router-dom'
import { MainExplorer, TransactionDetails, TransactionsExplorer } from './pages'
import { NavbarLayout } from './components'

function App() {
  return (
    <div className="App h-screen">
      <NavbarLayout />
      <div className="container mx-auto">
        <Routes>
          <Route element={<MainExplorer />} path="search" />
          <Route path="/:token_address/:token_id/:chain_id" element={<MainExplorer />} />
          <Route index path="/txs" element={<TransactionsExplorer />} />
          <Route path="/tx/:hash" element={<TransactionDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

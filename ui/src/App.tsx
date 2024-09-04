import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FoodFacilitiesList from './pages/food-facilities/FoodFacilitiesList'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FoodFacilitiesList />} />
      </Routes>
    </Router>
  )
}

export default App

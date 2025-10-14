import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout'
import Homepage from './pages/Homepage';
import SingleExercise from './pages/SingleExercise';
import GymCard from './pages/GymCard';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path='/' Component={Homepage} />
            <Route path='/exercise/:id' Component={SingleExercise} />
            <Route path='/exercise/gym-card' Component={GymCard} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext'
import DefaultLayout from './layout/DefaultLayout'
import Homepage from './pages/Homepage';
import SingleExercise from './pages/SingleExercise';


function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path='/' Component={Homepage} />
              <Route path='/exercise:id' Component={SingleExercise} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App

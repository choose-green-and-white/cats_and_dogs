import './App.css'
import { Route, Routes } from "react-router-dom";
import CatsPage from './Pages/CatsPage/CatsPage';
import DogsPage from './Pages/DogsPage/DogsPage';
import Header from './Components/Header/Header';
import FoxPage from './Pages/FoxPage/FoxPage';
import FavoritesPage from './Pages/FavoritesPage/FavoritesPage';

function App() {

  return (
    <>
      <div>
      <Header/>
      <Routes>
        <Route path="/" element={<CatsPage/>} />
        <Route path="/dogs" element={<DogsPage/>} />
        <Route path="/fox" element={<FoxPage/>} />
        <Route path="/favorites" element={<FavoritesPage/>} />
      </Routes>
      </div>
    </>
  )
}

export default App

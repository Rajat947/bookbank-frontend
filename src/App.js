import './App.css';
import {Routes, Route } from "react-router-dom";
import Landing from './Components/Landing/LandingPage'
import SignIn from './Components/Signin/SigninPage'
import Home from './Components/Home/HomePage';
import Signup from './Components/Signup/Signup'
import MyCollection from './Components/MyCollection/MyCollection';
import AddNewBook from './Components/AddNewBook/AddNewBook'

const isAdmin = true;

function App() {
  return (
    <div className="App">
      <Routes>
            <Route path="" element={<Landing></Landing>} />
            <Route path="/signup" element={<Signup></Signup>}/>
            <Route path="/signin" element={<SignIn></SignIn>} />
            <Route path="/home" element={<Home></Home>} />
            <Route path="/mycollection" element={<MyCollection></MyCollection>} />
            <Route path="/addnewbook" element={<AddNewBook></AddNewBook>}/>
      </Routes>
      {/* <h1>Hll</h1> */}
    </div>
  );
}

export default App;
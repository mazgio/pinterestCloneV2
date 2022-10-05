import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider.js";
import './App.css';
import Header from "./components/Navbar/Header";
import Mainboard from "./components/Mainboard";
import unsplash from './api/unsplash';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';

function App() {

  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [pins, setNewPins] = useState([]);

  const getImages = (term) => {
    return unsplash.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: term
      }
    });
  };

  const getNewPins = () => {
    let promises = [];
    let pinData = [];

    let pins = ['ocean', 'Tokyo', 'dogs', 'cats', 'Bali'];

    pins.forEach((pinTerm) => {
      promises.push(
        getImages(pinTerm).then((res) => {
          let results = res.data.results;


          pinData = pinData.concat(results);

          pinData.sort(function (a, b) {
            return 0.5 - Math.random();
          });
        })
      );
    });

    Promise.all(promises).then(() => {
      setNewPins(pinData);
    });
  };

  useEffect(() => {
    getNewPins();
  }, []);


  const onSearchSubmit = (term) => {
    getImages(term).then((res) => {
      let results = res.data.results;
      console.log(results);

      let newPins = [
        ...results,
        ...pins,
      ];

      newPins.sort(function (a, b) {
        return 0.5 - Math.random();
      });
      setNewPins(newPins);
    });
  };

  return (
    <div className="app">
      <Header onSubmit={onSearchSubmit} />
      <Routes>
        <Route path="/signin" element={<Signin setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pins" element={<Mainboard pins={pins} />} />
      </Routes>


    </div>
  );
}

export default App;

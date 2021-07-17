import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter,Route } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar';
import SecondNavBar from './components/SecondNavBar';
import Footer from './components/Footer';
import Details from './components/Details';
import AddProduct from './components/AddProduct';
import User from './components/User';
import Cart from './components/Cart';
import { useState } from 'react';

function App() {

  const [filter, setFilter ] = useState('')
  const [ cart, setCart ] = useState()

  const updated = (val) => {
    setFilter(val)
    console.log(val);
  }

  const added = (newVal) => {
    setCart(newVal)
  }

  return (
    <BrowserRouter>
      <NavBar search={updated} basket={cart}/>

      <SecondNavBar/>
    
      <Route exact path="/" render={(routerProps)=> <Home {...routerProps} search={filter} />} />

      <Route exact path="/details/:id" render={(routerProps)=> <Details basket={added} {...routerProps} />}/>

      <Route exact path="/newProduct" render={(routerProps)=> <AddProduct {...routerProps} />}/>

      <Route exact path="/signIn" render={(routerProps)=> <User {...routerProps} />}/>

      <Route exact path="/cart" render={(routerProps)=> <Cart {...routerProps} />}/>

      <Footer/>
    </BrowserRouter>
  )
}

export default App;

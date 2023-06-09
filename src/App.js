import {BrowserRouter , Route, Routes } from 'react-router-dom';
import Login from './Component.js/Login';
import Home from './Component.js/Home';
import Frame from './Component.js/Frame';
import Dashboard from './Component.js/Dashboard';
import Orders from './Component.js/Orders';
import Products from './Component.js/Products';
import Framestyle from './Component.js/Framestyle';
import Producttheme from './Component.js/Productthame';
import Simplecontextprovider from './Component.js/Simplecontext';
import City from './Component.js/City';
import Frameprice from './Component.js/Frameprice';
import OrderProducts from './Component.js/OrderProducts';

function App() {
  return (
    <div  >
      <BrowserRouter>
      <Simplecontextprovider>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route path="/" element={< Home />}>
          <Route  exact path="frame" element={<Frame/>} />
          <Route index   element={<Dashboard/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="product" element={<Products/>}/>
          <Route path="frametype" element={<Framestyle/>}/>
          <Route path="producttheme" element={<Producttheme/>}/>
          <Route path="city" element={<City/>}/>
          <Route path="frameprice" element={<Frameprice/>}/>
          <Route path="orderproduct" element={<OrderProducts/>}/>
          
        </Route>
      </Routes>
      </Simplecontextprovider>
      </BrowserRouter>
    </div>
  );
}

export default App;

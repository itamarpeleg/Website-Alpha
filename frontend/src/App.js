import FirstPage from "./pages/FirstPage";
import Home from "./pages/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from './utils/PrivateRoute'
import { AuthProvider } from "./context/AuthContext";

function App() {

  const change = (e) => {
    let dde = document.documentElement;
    dde.addEventListener("mousemove", e => {
    let ow = dde.offsetWidth; 
    let oh = dde.offsetHeight; 
    dde.style.setProperty('--mouseX', e.clientX * 10 / ow + "px");
    dde.style.setProperty('--mouseY', e.clientY * 0.3 / oh + "px");
    
    });
  } 
  
  return (
    <>
      <div className="" onMouseMove={e => (change(e))}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={ <PrivateRoutes/> }>
                  <Route element={<FirstPage/>} path="/"></Route>
                  <Route path="app" element={ <Home/> }></Route>
              </Route>
              <Route path="login" element={ <LoginPage/> }></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

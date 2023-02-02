import './App.css';
import {BrowserRouter, Switch , Route} from "react-router-dom";
import ReturnLandingPage from "./componentes/LandingPage/LandingPage"

function App() {
  return (
   
    <BrowserRouter>
    
      <div>

        <Switch>
            <Route exact path = "/" component={ReturnLandingPage} /> 
        </Switch>

      </div>
    
    </BrowserRouter>

  );
}

export default App;

import './App.css';
import {BrowserRouter, Switch , Route} from "react-router-dom";
import ReturnLandingPage from "./componentes/LandingPage/LandingPage"
import ReturnHome from './componentes/Home/Home';
import CreateActivity from './componentes/ActivityCreate/ActivityCreate'
import Detail from "./componentes/Detail/Detail"

function App() {
  return (
   
    <BrowserRouter>
    
      <div>

        <Switch>
            <Route exact path = "/" component={ReturnLandingPage} /> 
            <Route exact path = "/home" component={ReturnHome} /> 
            <Route exact path = "/activity" component={CreateActivity} /> 
            <Route exact path = "/country/:id" component={Detail} /> 
        </Switch>

      </div>
    
    </BrowserRouter>

  );
}

export default App;

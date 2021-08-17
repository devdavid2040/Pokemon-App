import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landingPage/LandingPage";
import Create from "./components/create/Create";
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import ErrorPage from "./components/errorPage/ErrorPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/pokemons/:id" component={Detail} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

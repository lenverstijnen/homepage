import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;

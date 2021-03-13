import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import MainPage from "./pages/main-page/main-page";

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Route path="/" exact>
          <MainPage></MainPage>
        </Route>
      </div>
    </HashRouter>
  );
}

export default App;

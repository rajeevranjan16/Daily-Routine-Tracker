import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ShowRecord from "./components/ShowRecord";
import CreateRecord from "./components/CreateRecord";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UpdateRecord from "./components/UpdateRecord";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <ShowRecord />
          </Route>
          <Route path="/create" exact>
            <CreateRecord />
          </Route>
          <Route path="/edit/:id" component={UpdateRecord} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

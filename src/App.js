import { Provider } from "react-redux";
import "./App.css";
import BeersContainer from "./components/BeerContainer";
import store from "./redux/redux-store"

function App() {
  return  <Provider store={store}><BeersContainer /></Provider>;
}

export default App;

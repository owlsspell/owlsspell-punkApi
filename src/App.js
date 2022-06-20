import { Provider } from "react-redux";
import "./App.css";
import BeersContainer from "./components/BeerContainer";
import store from "./redux/redux-store";
import { useEffect, useState } from "react";
import spinner from "./assets/Spinner-1s-200px.svg";


function App() {
  const [loading, setLoading] = useState(true);

  const onPageLoad = () => {
    if (document.readyState == "complete") {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.addEventListener("load", onPageLoad);
    return () => window.removeEventListener("load", onPageLoad);
  }, []);
  return (
    <Provider store={store}>
      {loading ? (
        <div className="spinner_container">
          <img src={spinner} alt="" />
        </div>
      ) : (
        <BeersContainer />
      )}
    </Provider>
  );
}

export default App;

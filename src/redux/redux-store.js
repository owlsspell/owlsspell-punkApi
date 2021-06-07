import bearReduser from "./bear-reduser";

import { combineReducers } from "redux";

const { createStore } = require("redux");

let redusers = combineReducers({
  bearReduser: bearReduser,
});

let store = createStore(redusers);

window.store = store;

export default store;

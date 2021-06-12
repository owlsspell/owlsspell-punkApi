import * as axios from "axios";

const instanse = axios.create({
  baseURL: "https://api.punkapi.com/v2/",
});
let count = 25;

export const getBeersByFood = (food) => {
  return instanse
    .get(`beers?${food !== "all" ? "food=" + food : ""}&per_page=80`)
    .then((response) => response);
};

export const getBeersByFoodInPage = (food) => {
  return instanse
    .get(`beers?${food !== "all" ? "food=" + food : ""}&per_page=${count}`)
    .then((response) => response);
};

export const getPage = (page, food) => {
  return instanse
    .get(
      `beers?${
        food !== "all" ? "food=" + food : ""
      }&page=${page}&per_page=${count}`
    )
    .then((response) => response);
};

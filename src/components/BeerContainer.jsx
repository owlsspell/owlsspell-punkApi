import React from "react";
import { connect } from "react-redux";
import Beers from "./Beers";

import {
  getBeer,
  onSort,
  setBeers,
  changeCurrentPage,
  changePagesCount,
} from "../redux/bear-reduser";
import { getBeersByFood, getBeersByFoodInPage, getPage } from "../api/api";

let BeersContainer = (props) => {
  let combined = (food) => {
    getBeersByFood(food).then((response) => {
      props.changePagesCount(response.data.length);
    });
    getBeersByFoodInPage(food).then((response) =>
      props.setBeers(response.data)
    );
  };
  let changePage = (page, food) => {
    getPage(page, food).then((response) => props.setBeers(response.data));
  };

  return (
    <Beers
      beers={props.beers}
      changeCurrentPage={props.changeCurrentPage}
      currentPage={props.currentPage}
      getBeer={props.getBeer}
      onSort={props.onSort}
      pagesCount={props.pagesCount}
      combined={combined}
      changePage={changePage}
    />
  );
};

let mapStateToProps = (state) => {
  return {
    beers: state.bearReduser.beers,
    currentPage: state.bearReduser.currentPage,
    pagesCount: state.bearReduser.pagesCount,
  };
};

export default connect(mapStateToProps, {
  setBeers,
  getBeer,
  onSort,
  changeCurrentPage,
  changePagesCount,
})(BeersContainer);

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

let BeersContainer = (props) => {
  return <Beers props={{ ...props }} />;
};

let mapStateToProps = (state) => {
  return {
    beers: state.bearReduser,
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

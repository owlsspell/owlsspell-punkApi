import _ from "lodash";

const SET_BEERS = "SET_BEERS";
const GET_BEER = "GET_BEER";
const ON_SORT = "ON_SORT";
const CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE";
const CHANGE_PAGES_COUNT = "CHANGE_PAGES_COUNT";

let initialState = {
  beers: [],
  currentPage: 1,
  pagesCount: 0,
};

const bearReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEERS: {
      return { ...state, beers: [...action.beers] };
    }
    case GET_BEER: {
      return {
        ...state,
        beers: state.beers.map((b) => {
          if (b.id === action.beerId) {
            return { ...b };
          }
          return b;
        }),
      };
    }
    case ON_SORT: {
      let beersArr = [...state.beers];
      let clone = [..._.orderBy(beersArr, action.sortField, action.sortType)];

      return {
        ...state,
        beers: [...clone],
      };
    }
    case CHANGE_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case CHANGE_PAGES_COUNT: {
      return { ...state, pagesCount: action.pagesCount };
    }
    default:
      return state;
  }
};

export const setBeers = (beers) => ({ type: SET_BEERS, beers });
export const getBeer = (beerId) => ({ type: GET_BEER, beerId });
export const onSort = (sortField, sortType) => ({
  type: ON_SORT,
  sortField,
  sortType,
});
export const changeCurrentPage = (currentPage) => ({
  type: CHANGE_CURRENT_PAGE,
  currentPage,
});
export const changePagesCount = (pagesCount) => ({
  type: CHANGE_PAGES_COUNT,
  pagesCount,
});

export default bearReduser;

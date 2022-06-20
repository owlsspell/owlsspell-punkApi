import React from "react";
import { useEffect, useState } from "react";

import { useSwipeable } from "react-swipeable";
import MainTabPanel from "./MainTabPanel";
import BeersBlock from "./BeersBlock";
import FilterTabPanel from "./FilterTabPanel";
import Paginator from "./Paginator";
import { colorPalette } from "./color";
import { withStyles } from "@mui/styles";

const styles = {
  pagesContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px 0 10px",
    background:`linear-gradient(${colorPalette[1]},${colorPalette[2]},${colorPalette[3]})`,
    marginBottom: 20
  },
  fixedTabMain:{
    maxWidth: 900,
    width: '100%',
    position: 'fixed',
    opacity: 1,
    zIndex:100,
    marginTop: 10
  }
};


let Beers = (props) => {
  const { classes,pagesCount,currentPage,beers,changeCurrentPage,combined,changePage,onSort } = props;
 
  let count = 25;

  let pages = [];
  let resultPagesCount = Math.ceil(pagesCount / count);
  for (let i = 1; i <= resultPagesCount; i++) {
    pages.push(i);
  }

  const [isActiveFilter, changeActiveFilter] = useState("all");

  const [beerNum, changeBeer] = useState(beers[1]);

  const [sortType, chengeSort] = useState("asc");

  let [currentTab, changeCurrentTab] = useState(2);

  useEffect(() => {
    changeCurrentPage(1);
  }, [pagesCount]);

  useEffect(() => {
    switch (currentTab) {
      case 0: {
        combinedWithPizza();
        break;
      }
      case 1: {
        combinedWithSteak();
        break;
      }
      case 2: {
        showAllBear(currentPage);
        break;
      }
      default: return
    }
  }, [currentTab]);

  let showBeerInfo = (beer) => {
    changeBeer(beer);
  };

  let onPageChanged = (page, isActiveFilter) => {
    changeCurrentPage(page);
    changePage(page, isActiveFilter);
  };

  let combinedWithPizza = () => {
    combined("pizza");
    if (isActiveFilter !== "pizza") {
      changeActiveFilter("pizza");
    }
  };
  let combinedWithSteak = () => {
    combined("steak");

    if (isActiveFilter !== "steak") {
      changeActiveFilter("steak");
    }
  };
  let showAllBear = () => {
    combined("all");
    if (isActiveFilter !== "all") {
      changeActiveFilter("all");
    }
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {

      if (eventData.deltaX < 0) {
        if (currentTab === 0) {
          changeCurrentTab(2);
        } else {
          changeCurrentTab(currentTab - 1);
        }
      }
      if (eventData.deltaX > 0) {
        if (currentTab === 2) {
          changeCurrentTab(0);
        } else {
          changeCurrentTab(currentTab + 1);
        }
      }
    },
  });

  let onSortFunc = (sortField, sortType) => {
    let orderType = sortType === "asc" ? "desc" : "asc";
    chengeSort(orderType);
    onSort(sortField, sortType);
  };

  return (
    <div>
      <div className="container">
        <div {...handlers}>
          <div className={classes.fixedTabMain}>
          <MainTabPanel
            isActiveFilter={isActiveFilter}
            combinedWithPizza={combinedWithPizza}
            combinedWithSteak={combinedWithSteak}
            showAllBear={showAllBear}
          />

          <FilterTabPanel onSort={onSortFunc} sortType={sortType} />

          <div
            className={classes.pagesContainer}
          >
            <Paginator
              pages={pages}
              isActiveFilter={isActiveFilter}
              onPageChanged={onPageChanged}
              currentPage={currentPage}
            />
          </div>
          </div>
          <BeersBlock
            beers={beers}
            showBeerInfo={showBeerInfo}
            beerNum={beerNum}
          />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Beers);

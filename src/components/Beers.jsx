import React from "react";
import { useEffect, useState } from "react";

import Modal from "./ModalContent";
import { useSwipeable } from "react-swipeable";
import MainTabPanel from "./MainTabPanel";
import BeersBlock from "./BeersBlock";
import Filters from "./Filters";
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
  const { classes } = props;

  let count = 25;

  let pages = [];
  let pagesCount = Math.ceil(props.pagesCount / count);
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const [isActiveFilter, changeActiveFilter] = useState("all");

  const [modalActive, changeModalActive] = useState(false);

  const [beerNum, changeBeer] = useState(props.beers[1]);

  const [sortType, chengeSort] = useState("asc");

  let [currentTab, changeCurrentTab] = useState(2);

  useEffect(() => {
    props.changeCurrentPage(1);
  }, [props.pagesCount]);

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
        showAllBear(props.currentPage);
        break;
      }
    }
  }, [currentTab]);

  let showBeerInfo = (beer) => {
    changeBeer(beer);
  };

  let onPageChanged = (page, isActiveFilter) => {
    props.changeCurrentPage(page);
    props.changePage(page, isActiveFilter);
  };

  let combinedWithPizza = () => {
    props.combined("pizza");
    if (isActiveFilter !== "pizza") {
      changeActiveFilter("pizza");
    }
  };
  let combinedWithSteak = () => {
    props.combined("steak");

    if (isActiveFilter !== "steak") {
      changeActiveFilter("steak");
    }
  };
  let showAllBear = () => {
    props.combined("all");
    if (isActiveFilter !== "all") {
      changeActiveFilter("all");
    }
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      console.log(currentTab);

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

  let onSort = (sortField, sortType) => {
    let orderType = sortType === "asc" ? "desc" : "asc";
    chengeSort(orderType);
    props.onSort(sortField, sortType);
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

          <FilterTabPanel onSort={onSort} sortType={sortType} />

          <div
            className={classes.pagesContainer}
          >
            <Paginator
              pages={pages}
              isActiveFilter={isActiveFilter}
              onPageChanged={onPageChanged}
              currentPage={props.currentPage}
            />
          </div>
          </div>
          <BeersBlock
            beers={props.beers}
            changeModalActive={changeModalActive}
            showBeerInfo={showBeerInfo}
            beerNum={beerNum}
          />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Beers);

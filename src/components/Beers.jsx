import React from "react";
import { useEffect, useState } from "react";

import Modal from "./Modal";
import { useSwipeable } from "react-swipeable";
import Header from "./Header";
import BeersBlock from "./BeersBlock";
import Filters from "./Filters";

let Beers = (props) => {
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

  let showBeerInfo = (beerId) => {
    changeBeer(beerId);
    props.getBeer(beerId);
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
          <Header
            isActiveFilter={isActiveFilter}
            combinedWithPizza={combinedWithPizza}
            combinedWithSteak={combinedWithSteak}
            showAllBear={showAllBear}
          />

          <Filters onSort={onSort} sortType={sortType} />

          <div className="tabs pages__container">
            {pages.map((page) => {
              return (
                <button
                  key={page}
                  className={`page__button ${
                    props.currentPage === page ? "active" : ""
                  }`}
                  onClick={() => {
                    onPageChanged(page, isActiveFilter);
                  }}
                >
                  {page}
                </button>
              );
            })}
          </div>
          <BeersBlock
            beers={props.beers}
            changeModalActive={changeModalActive}
            showBeerInfo={showBeerInfo}
          />
        </div>
      </div>
      <Modal
        active={modalActive}
        changeModalActive={changeModalActive}
        beer={beerNum}
      />
    </div>
  );
};

export default Beers;

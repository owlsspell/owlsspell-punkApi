import React from "react";
import * as axios from "axios";
import { useEffect, useState } from "react";

import notImg from "../assets/image.png";
import Modal from "./Modal";
import { useSwipeable } from "react-swipeable";

let Beers = (props) => {
  const instanse = axios.create({
    baseURL: "https://api.punkapi.com/v2/",
  });

  props = props.props;

  let count = 25;
  let pagesCount = Math.ceil(props.pagesCount / count);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const [isActivePizza, changeActivePizza] = useState(false);
  const [isActiveSteak, changeActiveSteak] = useState(false);
  const [isActiveAll, changeActivAll] = useState(true);

  const [modalActive, changeModalActive] = useState(false);

  const [beerNum, changeBeer] = useState(props.beers.beers[1]);

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

  let onPageChanged = (page) => {
    props.changeCurrentPage(page);
    instanse
      .get(`beers?page=${page}&per_page=${count}`)
      .then((response) => props.setBeers(response.data));
  };

  let combinedWithPizza = () => {
    instanse.get(`beers?food=pizza&per_page=80`).then((response) => {
      props.changePagesCount(response.data.length);
    });

    instanse
      .get(`beers?food=pizza&per_page=${count}`)
      .then((response) => props.setBeers(response.data));
    if (isActivePizza === false) {
      changeActivePizza(true);
      changeActiveSteak(false);
      changeActivAll(false);
    }
  };
  let combinedWithSteak = () => {
    instanse.get(`beers?food=steak&per_page=80`).then((response) => {
      props.changePagesCount(response.data.length);
    });

    instanse.get(`beers?food=steak&per_page=${count}`).then((response) => {
      props.setBeers(response.data);
    });

    if (isActiveSteak === false) {
      changeActiveSteak(true);
      changeActivePizza(false);
      changeActivAll(false);
    }
  };

  let showAllBear = (currentPage) => {
    instanse
      .get(`beers?page=${currentPage}&per_page=80`)
      .then((response) => props.changePagesCount(response.data.length));

    instanse
      .get(`beers?page=${currentPage}&per_page=${count}`)
      .then((response) => props.setBeers(response.data));

    if (isActiveAll === false) {
      changeActivAll(true);
      changeActivePizza(false);
      changeActiveSteak(false);
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

  let onSort = (sortField, sortType) => {
    let orderType = sortType === "asc" ? "desc" : "asc";
    chengeSort(orderType);
    props.onSort(sortField, sortType);
  };

  return (
    <div>
      <div className="container">
        <div className="tabs" {...handlers}>
          <div
            className={
              // "tab__item with__pizza"
              "tab__item with__pizza" + (isActivePizza ? " active" : "")
            }
            onClick={combinedWithPizza}
          >
            <h3>With pizza</h3>
          </div>
          <div
            className={
              "tab__item with__steak " + (isActiveSteak ? " active" : "")
            }
            onClick={() => {
              combinedWithSteak();
            }}
          >
            <h3>With steak</h3>
          </div>
          <div
            className={"tab__item all__beers" + (isActiveAll ? " active" : "")}
            onClick={() => {
              showAllBear(props.currentPage);
            }}
          >
            <h3>All beers</h3>
          </div>
        </div>

        <div className="tabs">
          <div
            className="tab__item"
            onClick={onSort.bind(null, "name", sortType)}
          >
            Name
          </div>

          <div
            className="tab__item"
            onClick={onSort.bind(null, "abv", sortType)}
          >
            Abv
          </div>
        </div>

        <div className="tabs pages__container">
          {pages.map((page) => {
            return (
              <button
                key={page}
                className={`page__button ${
                  props.currentPage === page ? "active" : ""
                }`}
                onClick={() => {
                  onPageChanged(page);
                }}
              >
                {page}
              </button>
            );
          })}
        </div>
        <div className="beers">
          {props.beers.beers.map((beer) => (
            <div
              key={beer.id}
              className="beer"
              onClick={() => {
                changeModalActive(true);
                showBeerInfo(beer);
              }}
            >
              {beer.image_url === null ? (
                <img
                  src={notImg}
                  style={{ width: 40 + "%" }}
                  alt={beer.name}
                ></img>
              ) : (
                <img src={beer.image_url} alt={beer.name}></img>
              )}

              <h4>{beer.name}</h4>

              <p>{beer.abv}</p>
            </div>
          ))}
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

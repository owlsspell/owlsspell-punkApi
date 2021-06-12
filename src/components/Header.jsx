import React from "react";

let Header = (props) => {
  return (
    <div className="tabs">
      <div
        className={
          "tab__item with__pizza" +
          (props.isActiveFilter === "pizza" ? " active" : "")
        }
        onClick={() => {
          props.combinedWithPizza();
        }}
      >
        <h3>With pizza</h3>
      </div>
      <div
        className={
          "tab__item with__steak " +
          (props.isActiveFilter === "steak" ? " active" : "")
        }
        onClick={() => {
          props.combinedWithSteak();
        }}
      >
        <h3>With steak</h3>
      </div>
      <div
        className={
          "tab__item all__beers" +
          (props.isActiveFilter === "all" ? " active" : "")
        }
        onClick={() => {
          props.showAllBear(props.currentPage);
        }}
      >
        <h3>All beers</h3>
      </div>
    </div>
  );
};

export default Header;

import { useState } from "react";

let Modal = ({ active, changeModalActive, beer = {} }) => {
  let styleText = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  };

  const [isActiveStyleDescr, changeActiveStyleDesc] = useState(false);
  const [isActiveStyleFood, changeActiveStyleFood] = useState(false);
  let showDescription = () => {
    if (!isActiveStyleDescr) {
      changeActiveStyleDesc(true);
    } else {
      changeActiveStyleDesc(false);
    }
  };
  let showFoodPairing = () => {
    if (!isActiveStyleFood) {
      changeActiveStyleFood(true);
    } else {
      changeActiveStyleFood(false);
    }
  };

  return (
    <div className={active ? "modal__overlay active" : "modal__overlay"}>
      <div className={active ? "modal active" : "modal"}>
        <button
          className="close"
          onClick={() => {
            changeModalActive(false);
          }}
        >
          X
        </button>
        <div className="modal__content">
          <div className="modal__img">
            <img src={beer.image_url} alt="" />
          </div>
          <div className="modal__info">
            <div>
              <h4>Name:</h4> <p>{beer.name}</p>
              <div />
              <div>
                <h4>Tagline:</h4> <p> {beer.tagline}</p>
              </div>
              <div>
                <h4>Abv :</h4> <p>{beer.abv}</p>
              </div>
              <div>
                <h4>Description :</h4>

                <p
                  style={isActiveStyleDescr ? null : styleText}
                  onClick={showDescription}
                >
                  {beer.description}
                </p>
              </div>
              <div>
                <h4>Food pairing :</h4>
                <p
                  style={isActiveStyleFood ? null : styleText}
                  onClick={showFoodPairing}
                >
                  {beer.food_pairing
                    ? beer.food_pairing.map((i) => {
                        return <li key={i}>{i}</li>;
                      })
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

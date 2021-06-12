import notImg from "../assets/image.png";

const BeersBlock = (props) => {
  return (
    <div className="beers">
      {props.beers.map((beer) => (
        <div
          key={beer.id}
          className="beer"
          onClick={() => {
            props.changeModalActive(true);
            props.showBeerInfo(beer);
          }}
        >
          {beer.image_url === null ? (
            <img src={notImg} style={{ width: 40 + "%" }} alt={beer.name}></img>
          ) : (
            <img src={beer.image_url} alt={beer.name}></img>
          )}

          <h4>{beer.name}</h4>

          <p>{beer.abv}</p>
        </div>
      ))}
    </div>
  );
};

export default BeersBlock;

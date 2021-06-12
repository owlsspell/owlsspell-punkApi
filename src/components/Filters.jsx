const Filters = (props) => {
  return (
    <div className="tabs">
      <div
        className="tab__item"
        onClick={props.onSort.bind(null, "name", props.sortType)}
      >
        Name
      </div>

      <div
        className="tab__item"
        onClick={props.onSort.bind(null, "abv", props.sortType)}
      >
        Abv
      </div>
    </div>
  );
};

export default Filters;

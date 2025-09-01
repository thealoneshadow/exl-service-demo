const Options = (props) => {
  const isMenuSelectedByUser = props.state.menuSelected;
  return isMenuSelectedByUser ? null : (
    <div className="options">
      <div className="options-container">
        {props.options.map((option) => {
          return (
            <div
              className="option-item"
              onClick={option.handler}
              key={option.id}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;

const SubMenu1 = (props) => {
  const isInvoiceStatusSendToAP = props.state.isSendToAPinvoiceStatus;

  return isInvoiceStatusSendToAP ? (
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
  ) : null;
};

export default SubMenu1;

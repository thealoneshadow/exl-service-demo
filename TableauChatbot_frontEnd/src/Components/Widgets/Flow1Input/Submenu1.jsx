import SubMenu1 from "./SubmenuComponent";

const Submenu1Options = (props) => {
  const handleSubmenuBackSelection = () => {
    props.actionProvider.handleOptions({ withAvatar: true });
  };

  const handleSubMenu1InvoiceNumber = () => {
    props.actionProvider.handleSubMenu1InvoiceNumber(
      props.state.requestId,
      "What is the Invoice Id?", 'Invoice Number'
    );
  };

  const handleSubMenu1InvoiceAmount = () => {
    props.actionProvider.handleSubMenu1InvoiceNumber(
      props.state.requestId,
      "What is the InvoiceAmount?", 'Invoice Amount'
    );
  };

  const handleSubMenu1APDate = () => {
    props.actionProvider.handleSubMenu1InvoiceNumber(
      props.state.requestId,
      "What is the ApprovedDate?", 'Sent to AP Date'
    );
  };

  const handleSubMenu1PaymentStatus = () => {
    props.actionProvider.handleSubMenu1InvoiceNumber(
      props.state.requestId,
      "What is the Invoice Status?", 'Payment Status'
    );
  };

  const options = [
    {
      name: "📃 Invoice Number",
      handler: handleSubMenu1InvoiceNumber,
      id: 1,
    },
    {
      name: "💲 Invoice Amount",
      handler: handleSubMenu1InvoiceAmount,
      id: 2,
    },
    {
      name: "📅 Sent to AP Date",
      handler: handleSubMenu1APDate,
      id: 3,
    },
    {
      name: "💲 Payment Status",
      handler: handleSubMenu1PaymentStatus,
      id: 4,
    },
    {
      name: "⬅ Back to Menu",
      handler: handleSubmenuBackSelection,
      id: 5,
    },
  ];
  return <SubMenu1 options={options} title="Options" {...props} />;
};

export default Submenu1Options;

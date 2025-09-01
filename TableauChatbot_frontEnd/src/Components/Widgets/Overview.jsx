import Options from "./Options";

const GeneralOptions = (props) => {
  const options = [
    {
      name: "Claim Status",
      handler: props.actionProvider.handleClaimStatusSelection,
      id: 1,
    },
    {
      name: "Check Balance",
      handler: props.actionProvider.handleCheckBalanceSelection,
      id: 2,
    },
    {
      name: "Eligible & Non-Eligible",
      handler: props.actionProvider.handleAllowedOrNotSelection,
      id: 3,
    },
    {
      name: "Payment Status",
      handler: props.actionProvider.handlePaymentStatusSelection,
      id: 4,
    },
    {
      name: "Submit Claim",
      handler: props.actionProvider.handleInvoiceUploadSelection,
      id: 5,
    },
    {
      name: "FAQ",
      handler: props.actionProvider.handleFAQSelection,
      id: 6,
    },
  ];
  return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;

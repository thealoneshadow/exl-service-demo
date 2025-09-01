import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function Flow4Input(props) {
  const [reqId, setReqIdValue] = useState("");
  const [isVisible, setIsVisibleValue] = useState(true);

  const handleSubmit = (e) => {
    // console.log(props.state);
    e.preventDefault();
    setIsVisibleValue(false);
    props.actionProvider.handleFlow4Query(
      "What is the status of payment?",
      props.state,
      reqId
    );
  };
  return isVisible ? (
    <form onSubmit={handleSubmit}>
      <div className="card flex justify-content-center ">
        <InputText
          id="reqId"
          value={reqId}
          onChange={(e) => setReqIdValue(e.target.value)}
          className="p-inputtext-sm"
          placeholder="Reference number"
        />
      </div>
      <br></br>
      <div className="card flex justify-content-center">
        <Button
          label="Submit"         
          text
          raised
          size="small"
          disabled={reqId === ""}
        />
      </div>
    </form>
  ) : null;
}

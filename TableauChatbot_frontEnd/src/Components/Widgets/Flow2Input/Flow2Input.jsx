import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./../widgets.css";

export default function Flow2Input(props) {
  const [reqId, setReqIdValue] = useState("");
  const [isVisible, setIsVisibleValue] = useState(true);

  const handleSubmit = (e) => {
    console.log(props);
    e.preventDefault();
    setIsVisibleValue(false);
    props.actionProvider.handleFlow2UserInputs(
      {
        reqId: reqId,
      },
      props.state
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
          placeholder="User Id"
        />
      </div>
      <br></br>
      <div className="card flex justify-content-center">
        <Button
          label="Submit"
          className="submit-btn"
          text
          raised
          size="small"
          disabled={reqId === ""}
        />
      </div>
    </form>
  ) : null;
}

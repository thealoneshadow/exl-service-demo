import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";

export default function InvoiceUploadInput(props) {
  const [submittersName, setSubmittersNameValue] = useState("");
  const [isVisible, setIsVisibleValue] = useState(true);
  const [fileName, setFileNameValue] = useState("Browse");
  const [invoiceFile, setInvoiceFileValue] = useState(null);
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  const onUpload = async (event) => {
    if (event.files) {
      const file = event.files[0];
      setFileNameValue(file.name);
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        setInvoiceFileValue(file);
      };
    }

    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const handleClearFileSelection = () => {
    setInvoiceFileValue(null);
    setFileNameValue("Browse");
    fileUploadRef.current.clear();
  };
  const handleSubmit = (e) => {
    // console.log(props.state);
    e.preventDefault();
    setIsVisibleValue(false);
    const formData = new FormData();
    formData.append("file", invoiceFile);
    formData.append("submitterName", submittersName);
    console.log(formData);
    props.actionProvider.handleFlow5UserInputs(
      invoiceFile,
      formData,
      props.state
    );
  };
  return isVisible ? (
    <form onSubmit={handleSubmit}>
      <div className="card flex justify-content-center ">
        <InputText
          id="email"
          type="email"
          value={submittersName}
          onChange={(e) => setSubmittersNameValue(e.target.value)}
          className="p-inputtext-sm"
          placeholder="Submitter Email"
        />
      </div>
      <Toast ref={toast}></Toast>
      <FileUpload
        ref={fileUploadRef}
        mode="basic"
        name="demo[]"
        url="/api/upload"
        accept="file/*"
        maxFileSize={1000000}
        customUpload
        auto
        uploadHandler={onUpload}
        chooseLabel={fileName}
      />

      <div className="card flex justify-content-center">
        {invoiceFile ? (
          <Button
            label="Clear"
            
            text
            raised
            size="small"
            onClick={handleClearFileSelection}
          />
        ) : null}
        &nbsp;<Button 
          label="Submit"
          
          text
          raised
          size="small"
          disabled={submittersName === "" || invoiceFile == null}
        />
      </div>
    </form>
  ) : null;
}

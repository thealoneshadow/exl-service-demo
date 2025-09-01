import {
  validateRequestId,
  validateDate,
  validatePolicyDate,
  validatePolicyDateFormat,
} from "../../Utility/Utility";

import axios from "axios";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  makeApiCall = async (request) => {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const parsedResponse = await response.json();
    if (response.status > 299 || !response.ok) {
      return parsedResponse.error || "Unknown error";
    }

    return parsedResponse;
  };

  handleOptions = (
    options,
    alternateMessage = "Below are some possible options."
  ) => {
    this.setState((state) => ({
      ...state,
      selectedChoice: -1,
      menuSelected: false,
      isSendToAPinvoiceStatus: false,
    }));

    localStorage.setItem("selectedChoice", "-1");
    window.dispatchEvent(new Event("selectedChoiceChanged"));

    const message = this.createChatBotMessage(alternateMessage, {
      widget: "menu",
      loading: true,
      terminateLoading: true,
      ...options,
    });

    this.addMessageToState(message);
  };

  makeFileUploadApiCall = async (formData, uploadedFile) => {
    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/uploadInvoice",
      data: formData,
      files: uploadedFile,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(response);

    return response.data;
  };

  handleHelp = (isNoActionsMatched, options) => {
    const text = isNoActionsMatched
      ? `This is not a valid query. Please choose a correct option to begin with. 
    Send 'Menu'/'start'/'options' for getting options or help for more details.`
      : `To get options send 'Menu' or 'Options'. \n 
    Restart the bot in case of any unexpected behavior.`;
    const message = this.createChatBotMessage(text, {
      ...options,
    });

    this.addMessageToState(message);
  };

  //#region Medicare query

  handleMedicareQuery = async (query, messageHistory, state) => {
    const approach = "rrr";
    const userQuery = `${query}.`;

    const dashboardId = localStorage.getItem("dashboardId");

    const request = {
      history: messageHistory.map(
        (message) => `${message.type}: ${message.message}.`
      ),
      approach: approach,
      query: userQuery,
      FlowNumber: 11,
      dashboardId: dashboardId,
    };
    const waitingMessage = this.createChatBotMessage(
      <div className="chatbot-loader-container">
        <svg
          id="dots"
          width="50px"
          height="21px"
          viewBox="0 0 132 58"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" fill="none">
            <g id="chatbot-loader" fill="#fff">
              <circle id="chatbot-loader-dot1" cx="25" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot2" cx="65" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot3" cx="105" cy="30" r="13"></circle>
            </g>
          </g>
        </svg>
      </div>
    );
    this.addMessageToState(waitingMessage, {
      ...{ withAvatar: true },
    });

    const response = await this.makeApiCall(request);
    const apiResponse = this.createChatBotMessage(`${response.answer}`, {
      ...{ withAvatar: true },
    });
    this.addMessageToState(apiResponse);
    await this.sleep(3 * 1000);
  };
  //#endregion

  // #region Flow 1 methods

  handleClaimStatusSelection = () => {
    this.setState((state) => ({
      ...state,
      selectedChoice: 1,
      menuSelected: true,
    }));

    localStorage.setItem("selectedChoice", "Claim Status");
    window.dispatchEvent(new Event("selectedChoiceChanged"));

    const userSelectionMessage = this.createClientMessage("Claim Status");
    this.addMessageToState(userSelectionMessage);

    const message = this.createChatBotMessage(
      "Please provide following information(s):",
      {
        widget: "flow1Input",
        loading: true,
        terminateLoading: true,
        ...{ withAvatar: true },
      }
    );

    this.addMessageToState(message);
  };

  handleFlow1UserInputs = (Flow1FormValues, currentState) => {
    const reqIdsList = validateRequestId(Flow1FormValues.reqId);
    if (reqIdsList.length !== 0) {
      this.setState((state) => ({
        ...state,
        requestId: reqIdsList.join(","),
      }));

      this.handleFlow1Query(
        "What is the status of claim?",
        reqIdsList.join(",")
      );
    } else {
      const message = this.createChatBotMessage(
        "Please provide correct Reference number.",
        {
          widget: "flow1Input",
          loading: true,
          terminateLoading: true,
        }
      );

      this.addMessageToState(message, {
        ...{ withAvatar: true },
      });
    }
  };

  handleFlow1Query = async (query, reqId) => {
    // collect required information(s)
    // console.log(currentState);

    const approach = "rrr";
    const userQuery = `For DCN(s) ${reqId}, I want to know ${query}.`;

    const payload = {
      reqIds: reqId,
    };
    const request = {
      history: [],
      approach: approach,
      query: userQuery,
      FlowNumber: 1,
      payload: payload,
    };
    const waitingMessage = this.createChatBotMessage(
      <div className="chatbot-loader-container">
        <svg
          id="dots"
          width="50px"
          height="21px"
          viewBox="0 0 132 58"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" fill="none">
            <g id="chatbot-loader" fill="#fff">
              <circle id="chatbot-loader-dot1" cx="25" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot2" cx="65" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot3" cx="105" cy="30" r="13"></circle>
            </g>
          </g>
        </svg>
      </div>
    );
    this.addMessageToState(waitingMessage, {
      ...{ withAvatar: true },
    });

    const response = await this.makeApiCall(request);
    const apiResponse = this.createChatBotMessage(`${response.answer}`, {
      ...{ withAvatar: true },
    });
    this.addMessageToState(apiResponse);
    await this.sleep(3 * 1000);
    this.handleOptions({ withAvatar: true });

    // if (response.answer.includes("Sent to AP")) {
    //   this.setState((state) => ({
    //     ...state,
    //     isSendToAPinvoiceStatus: true,
    //   }));
    //   await this.sleep(3 * 1000);
    //   const subMenuMessage = this.createChatBotMessage(
    //     "Please choose from following options for further query or select 'Back to Menu' to go back to main menu .",
    //     {
    //       widget: "subMenu1",
    //       loading: true,
    //       terminateLoading: true,
    //       withAvatar: true,
    //     }
    //   );

    //   this.addMessageToState(subMenuMessage);
    // }
  };

  // #endregion

  // #region Flow 2 methods

  handleCheckBalanceSelection = () => {
    this.setState((state) => ({
      ...state,
      selectedChoice: 2,
      menuSelected: true,
    }));

    localStorage.setItem("selectedChoice", "Check Balance");
    window.dispatchEvent(new Event("selectedChoiceChanged"));

    const userSelectionMessage = this.createClientMessage("Check Balance");
    this.addMessageToState(userSelectionMessage);

    const message = this.createChatBotMessage("Please provide User Id", {
      widget: "flow2Input",
      loading: true,
      terminateLoading: true,
      ...{ withAvatar: true },
    });

    this.addMessageToState(message);
  };

  handleFlow2UserInputs = (Flow2FormValues, currentState) => {
    // console.log(currentState);
    const reqIdsList = validateRequestId(Flow2FormValues.reqId);
    if (reqIdsList.length !== 0) {
      this.setState((state) => ({
        ...state,
        requestId: reqIdsList.join(","),
      }));

      this.handleFlow2Query(
        "What is the available balance?",
        reqIdsList.join(",")
      );
    } else {
      const message = this.createChatBotMessage(
        "Please provide correct Reference number.",
        {
          widget: "flow2Input",
          loading: true,
          terminateLoading: true,
        }
      );

      this.addMessageToState(message, {
        ...{ withAvatar: true },
      });
    }
  };

  handleFlow2Query = async (query, reqId) => {
    console.log("Inside query");
    const approach = "rrr";
    const userQuery = `For userId(s) ${reqId}, I want to know ${query}.`;

    const payload = {
      reqIds: reqId,
    };
    const request = {
      history: [],
      approach: approach,
      query: userQuery,
      FlowNumber: 2,
      payload: payload,
    };

    console.log(request);
    const waitingMessage = this.createChatBotMessage(
      <div className="chatbot-loader-container">
        <svg
          id="dots"
          width="50px"
          height="21px"
          viewBox="0 0 132 58"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" fill="none">
            <g id="chatbot-loader" fill="#fff">
              <circle id="chatbot-loader-dot1" cx="25" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot2" cx="65" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot3" cx="105" cy="30" r="13"></circle>
            </g>
          </g>
        </svg>
      </div>
    );
    this.addMessageToState(waitingMessage, {
      ...{ withAvatar: true },
    });

    const response = await this.makeApiCall(request);
    const apiResponse = this.createChatBotMessage(`${response.answer}`, {
      ...{ withAvatar: true },
    });
    this.addMessageToState(apiResponse);

    await this.sleep(3 * 1000);
    this.handleOptions({ withAvatar: true });
  };

  handleAllowanceStatusOrUpdateSelection = () => {
    this.setState((state) => ({
      ...state,
      selectedChoice: 4,
      menuSelected: true,
    }));

    localStorage.setItem("selectedChoice", "Check Balance");
    window.dispatchEvent(new Event("selectedChoiceChanged"));

    const userSelectionMessage = this.createClientMessage("Check Balance");
    this.addMessageToState(userSelectionMessage);

    const message = this.createChatBotMessage(
      "Please provide following information(s):",
      {
        widget: "input",
        loading: true,
        terminateLoading: true,
        ...{ withAvatar: true },
      }
    );

    this.addMessageToState(message);
  };

  // #endregion

  // #region Flow 3
  handleAllowedOrNotSelection = () => {
    this.setState((state) => ({
      ...state,
      selectedChoice: 3,
      menuSelected: true,
    }));

    localStorage.setItem("selectedChoice", "Eligible & Non-Eligible");
    window.dispatchEvent(new Event("selectedChoiceChanged"));

    const userSelectionMessage = this.createClientMessage(
      "Eligible & Non-Eligible"
    );
    this.addMessageToState(userSelectionMessage);

    const message = this.createChatBotMessage(
      "What allowance information do you want?",
      {
        ...{ withAvatar: true },
      }
    );

    this.addMessageToState(message);
  };

  handleFlow3Query = async (query, currentState, options) => {
    const history = currentState.messages.map(
      (message) => `${message.type}: ${message.message}`
    );
    const approach = "rrr";
    const userQuery = `I want to know ${query}.`;
    const FlowNumber = currentState.selectedChoice;
    const request = {
      history: history,
      approach: approach,
      query: userQuery,
      FlowNumber: FlowNumber,
    };
    const waitingMessage = this.createChatBotMessage(
      <div className="chatbot-loader-container">
        <svg
          id="dots"
          width="50px"
          height="21px"
          viewBox="0 0 132 58"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" fill="none">
            <g id="chatbot-loader" fill="#fff">
              <circle id="chatbot-loader-dot1" cx="25" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot2" cx="65" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot3" cx="105" cy="30" r="13"></circle>
            </g>
          </g>
        </svg>
      </div>,
      {
        ...{ withAvatar: true },
      }
    );
    this.addMessageToState(waitingMessage);

    const response = await this.makeApiCall(request);
    const apiResponse = this.createChatBotMessage(`${response.answer}`, {
      ...{ withAvatar: true },
    });
    this.addMessageToState(apiResponse);
  };
  // #endregion

  //#region Flow 4 methods
  handlePaymentStatusSelection = () => {
    this.setState((state) => ({
      ...state,
      selectedChoice: 4,
      menuSelected: true,
    }));

    localStorage.setItem("selectedChoice", "Payment Status");
    window.dispatchEvent(new Event("selectedChoiceChanged"));

    const userSelectionMessage = this.createClientMessage("Payment Status");
    this.addMessageToState(userSelectionMessage);

    const message = this.createChatBotMessage("Please provide request Id", {
      widget: "flow4Input",
      loading: true,
      terminateLoading: true,
      ...{ withAvatar: true },
    });

    this.addMessageToState(message);
  };

  handleFlow4Query = async (query, currentState, reqId) => {
    // collect required information(s)
    const history = currentState.messages.map(
      (message) => `${message.type}: ${message.message}`
    );
    const approach = "rrr";
    const userQuery = `For DCN numbers ${reqId}, I want to know ${query}.`;
    const FlowNumber = currentState.selectedChoice;
    const payload = {
      reqIds: reqId,
    };
    const request = {
      history: history,
      approach: approach,
      query: userQuery,
      FlowNumber: FlowNumber,
      payload: payload,
    };
    const waitingMessage = this.createChatBotMessage(
      <div className="chatbot-loader-container">
        <svg
          id="dots"
          width="50px"
          height="21px"
          viewBox="0 0 132 58"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" fill="none">
            <g id="chatbot-loader" fill="#fff">
              <circle id="chatbot-loader-dot1" cx="25" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot2" cx="65" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot3" cx="105" cy="30" r="13"></circle>
            </g>
          </g>
        </svg>
      </div>,
      {
        ...{ withAvatar: true },
      }
    );
    this.addMessageToState(waitingMessage);

    const response = await this.makeApiCall(request);
    const apiResponse = this.createChatBotMessage(`${response.answer}`, {
      ...{ withAvatar: true },
    });
    this.addMessageToState(apiResponse);
    await this.sleep(3 * 1000);
    this.handleOptions({ withAvatar: true });
  };

  //#endregion

  //#region Flow 5 Invoice upload

  handleInvoiceUploadSelection = () => {
    this.setState((state) => ({
      ...state,
      selectedChoice: 5,
      menuSelected: true,
    }));

    localStorage.setItem("selectedChoice", "Submit Claim");
    window.dispatchEvent(new Event("selectedChoiceChanged"));

    const userSelectionMessage = this.createClientMessage("Submit Claim");
    this.addMessageToState(userSelectionMessage);

    const message = this.createChatBotMessage(
      "Please fill out following information",
      {
        widget: "invoiceUploadInput",
        loading: true,
        terminateLoading: true,
        ...{ withAvatar: true },
      }
    );

    this.addMessageToState(message);
  };

  handleFlow5UserInputs = async (invoiceFile, formData, currentState) => {
    // collect required information(s)

    const waitingMessage = this.createChatBotMessage(
      <div className="chatbot-loader-container">
        <svg
          id="dots"
          width="50px"
          height="21px"
          viewBox="0 0 132 58"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" fill="none">
            <g id="chatbot-loader" fill="#fff">
              <circle id="chatbot-loader-dot1" cx="25" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot2" cx="65" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot3" cx="105" cy="30" r="13"></circle>
            </g>
          </g>
        </svg>
      </div>,
      {
        ...{ withAvatar: true },
      }
    );
    this.addMessageToState(waitingMessage);
    const response = await this.makeFileUploadApiCall(formData, invoiceFile);
    const apiResponse = this.createChatBotMessage(`${response.answer}`, {
      ...{ withAvatar: true },
    });
    this.addMessageToState(apiResponse);

    // sendMail(apiResponse);
    await this.sleep(3 * 1000);
    this.handleOptions({ withAvatar: true });
  };

  //#endregion

  //#region SubMenu 1.1

  handleSubMenu1InvoiceNumber = async (reqId, query, menuSelected) => {
    this.addMessageToState(this.createClientMessage(`${menuSelected}`));

    const payload = {
      reqIds: reqId,
    };
    const request = {
      history: [],
      approach: "rrr",
      query: query,
      FlowNumber: 1.1,
      payload: payload,
    };
    const waitingMessage = this.createChatBotMessage(
      <div className="chatbot-loader-container">
        <svg
          id="dots"
          width="50px"
          height="21px"
          viewBox="0 0 132 58"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" fill="none">
            <g id="chatbot-loader" fill="#fff">
              <circle id="chatbot-loader-dot1" cx="25" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot2" cx="65" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot3" cx="105" cy="30" r="13"></circle>
            </g>
          </g>
        </svg>
      </div>
    );
    this.addMessageToState(waitingMessage, {
      ...{ withAvatar: true },
    });

    const response = await this.makeApiCall(request);

    const apiResponse = this.createChatBotMessage(`${response.answer}`, {
      ...{ withAvatar: true },
    });

    this.addMessageToState(apiResponse);

    await this.sleep(1.5 * 1000);
    const subMenuMessage = this.createChatBotMessage(
      "Please choose from following options for further query or select 'Back to Menu' to go back to main menu .",
      {
        widget: "subMenu1",
        loading: true,
        terminateLoading: true,
        withAvatar: true,
      }
    );

    this.addMessageToState(subMenuMessage);
  };
  //#endregion

  // #region Flow 6
  handleFAQSelection = () => {
    this.setState((state) => ({
      ...state,
      selectedChoice: 6,
      menuSelected: true,
    }));

    localStorage.setItem("selectedChoice", "FAQ");
    window.dispatchEvent(new Event("selectedChoiceChanged"));

    const userSelectionMessage = this.createClientMessage("FAQ");
    this.addMessageToState(userSelectionMessage);

    const message = this.createChatBotMessage("What is your query?", {
      ...{ withAvatar: true },
    });

    this.addMessageToState(message);
  };

  handleFlow6Query = async (query, currentState, options) => {
    const history = currentState.messages.map(
      (message) => `${message.type}: ${message.message}`
    );
    const approach = "rrr";
    const userQuery = `I want to know ${query}.`;
    const FlowNumber = currentState.selectedChoice;
    const request = {
      history: history,
      approach: approach,
      query: userQuery,
      FlowNumber: FlowNumber,
    };
    const waitingMessage = this.createChatBotMessage(
      <div className="chatbot-loader-container">
        <svg
          id="dots"
          width="50px"
          height="21px"
          viewBox="0 0 132 58"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" fill="none">
            <g id="chatbot-loader" fill="#fff">
              <circle id="chatbot-loader-dot1" cx="25" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot2" cx="65" cy="30" r="13"></circle>
              <circle id="chatbot-loader-dot3" cx="105" cy="30" r="13"></circle>
            </g>
          </g>
        </svg>
      </div>,
      {
        ...{ withAvatar: true },
      }
    );
    this.addMessageToState(waitingMessage);

    const response = await this.makeApiCall(request);
    const apiResponse = this.createChatBotMessage(`${response.answer}`, {
      ...{ withAvatar: true },
    });
    this.addMessageToState(apiResponse);
  };
  // #endregion
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  fimsg = (msg) => {
    // console.log(msg.message!="Looking for the information you want ..");
    return typeof msg.message == "string";
  };

  addMessageToState = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages.filter(this.fimsg), message],
    }));
  };
}

export default ActionProvider;

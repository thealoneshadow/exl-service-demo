import { createChatBotMessage } from "react-chatbot-kit";
import Overview from "./../Widgets/Overview";
import CoBotAvatar from "./../BotAvatar/BotAvatar";
import UserInput from "./../Widgets/UserInput/UserInput";
import Flow1Input from "./../Widgets/Flow1Input/Flow1Input";
import Flow4Input from "../Widgets/Flow4Input/Flow4Input";
import Flow2Input from "../Widgets/Flow2Input/Flow2Input";
import UserChatMessage from "./../UserChatMessage/UserChatMessage";
import ChatbotHeader from "./../Header/Header";
import InvoiceUploadInput from "../Widgets/Invoice Upload/InvoiceUpload";
import Submenu1Options from "../Widgets/Flow1Input/Submenu1";

const config = {
  lang: "no",
  botName: "Meri Bot",
  customStyles: {
    chatButton: {
      backgroundColor: "#0f5faf",
    },
  },
  initialMessages: [
    createChatBotMessage(
      "Welcome to Medicare Sales Bot! Please ask your query to begin with."
    ),
  ],
  state: {
    selectedChoice: -1,
    requestId: "NA",
    customerName: "NA",
    startDate: "NA",
    menuSelected: false,
    submenu1Selected: false,
    isSendToAPinvoiceStatus: false,
  },
  customComponents: {
    botAvatar: (props) => <CoBotAvatar {...props} />,
    userChatMessage: (props) => <UserChatMessage {...props} />,
    header: (props) => <ChatbotHeader botName={`Medicare Sales Bot `} />,
  },
  //  ${localStorage.getItem("selectedChoice")

  widgets: [
    {
      widgetName: "menu",
      widgetFunc: (props) => <Overview {...props} />,
      mapStateToProps: ["selectedChoice"],
    },
    {
      widgetName: "flow1Input",
      widgetFunc: (props) => <Flow1Input {...props} />,
      mapStateToProps: ["customerName", "startDate"],
    },
    {
      widgetName: "flow2Input",
      widgetFunc: (props) => <Flow2Input {...props} />,
      mapStateToProps: ["customerName", "startDate"],
    },
    {
      widgetName: "flow4Input",
      widgetFunc: (props) => <Flow4Input {...props} />,
      mapStateToProps: ["customerName", "startDate"],
    },
    {
      widgetName: "input",
      widgetFunc: (props) => <UserInput {...props} />,
      mapStateToProps: ["customerName", "startDate"],
    },
    {
      widgetName: "invoiceUploadInput",
      widgetFunc: (props) => <InvoiceUploadInput {...props} />,
      mapStateToProps: [],
    },
    {
      widgetName: "subMenu1",
      widgetFunc: (props) => <Submenu1Options {...props} />,
      mapStateToProps: [],
    },
  ],
};

export default config;

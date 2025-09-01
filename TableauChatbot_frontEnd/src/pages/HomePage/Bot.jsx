import { useEffect, useState } from "react";
import useComponentVisible from "../../Hooks/OutSideClick";
import Chatbot from "react-chatbot-kit";
import config from "../../Components/ChatBot/config";
import MessageParser from "../../Components/ChatBot/MessageParser";
import ActionProvider from "../../Components/ChatBot/ActionProvider";
import BotAvatar from "../../Components/BotIcon/BotIconLight";
import "../../css/bot.css";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

const Bot = ({ showBot, toggleBot, dashboardId }) => {
  const [clickedRefresh, setClickedRefresh] = useState(0);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true, toggleBot);

  useEffect(() => {}, [clickedRefresh]);

  if (showBot) {
    localStorage.setItem("selectedChoice", "-1");
    dashboardId && localStorage.setItem("dashboardId", dashboardId);
  }
  return (
    <div ref={ref} style={{ position: "fixed", zIndex: "999" , float: 'right'}}>
      <div
        className="app-chatbot-container"
        style={{ display: showBot && isComponentVisible ? "block" : "none" }}
      >
        {clickedRefresh % 2 === 0 ? (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            placeholderText="What is your query?"
          />
        ) : null}
        {clickedRefresh % 2 !== 0 ? (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            placeholderText="What is your query?"
          />
        ) : null}
      </div>
      {showBot && (
        <button
          className="app-chatbot-refresh-button"
          onClick={() => setClickedRefresh((curr) => curr + 1)}
        >
          <RefreshOutlinedIcon />
        </button>
      )}

      <button
        className="app-chatbot-button"
        onClick={() => {
          toggleBot((prev) => !prev);
          setIsComponentVisible(true);
        }}
      >
        {/* {<div><small></small></div> } */}
        <div className="rounded">
          <BotAvatar></BotAvatar>
        </div>
        {/*  <svg viewBox="0 0 640 512" className="app-chatbot-button-icon">
          <path d="M192,408h64V360H192ZM576,192H544a95.99975,95.99975,0,0,0-96-96H344V24a24,24,0,0,0-48,0V96H192a95.99975,95.99975,0,0,0-96,96H64a47.99987,47.99987,0,0,0-48,48V368a47.99987,47.99987,0,0,0,48,48H96a95.99975,95.99975,0,0,0,96,96H448a95.99975,95.99975,0,0,0,96-96h32a47.99987,47.99987,0,0,0,48-48V240A47.99987,47.99987,0,0,0,576,192ZM96,368H64V240H96Zm400,48a48.14061,48.14061,0,0,1-48,48H192a48.14061,48.14061,0,0,1-48-48V192a47.99987,47.99987,0,0,1,48-48H448a47.99987,47.99987,0,0,1,48,48Zm80-48H544V240h32ZM240,208a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,240,208Zm160,0a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,400,208ZM384,408h64V360H384Zm-96,0h64V360H288Z"></path>
      </svg>*/}
      </button>
    </div>
  );
};

export default Bot;

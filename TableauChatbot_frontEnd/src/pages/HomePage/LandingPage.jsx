import { useEffect, useState } from "react";
import { CaretDownFill } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import Chatbot from "react-chatbot-kit";
import config from "../../Components/ChatBot/config";
import MessageParser from "../../Components/ChatBot/MessageParser";
import ActionProvider from "../../Components/ChatBot/ActionProvider";
import "../../css/bootstrap.min.css";
import "react-chatbot-kit/build/main.css";
import "../../Components/ChatBot/ChatBot.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import $ from "jquery";
import BotAvatar from "../../Components/BotIcon/BotIconLight";

import "../../css/style.css";
import "../../lib/animate/animate.min.css";
import "../../lib/owlcarousel/assets/owl.carousel.min.css";
import Bot from "./Bot";
import links from "../../Components/Dashboard";

const LandingPage = () => {
  const { id: dashboardId } = useParams();
  const [showBot, toggleBot] = useState(false);
  const [dashboardInfo, setDashboardInfo] = useState(null);

  console.log(dashboardInfo);
  useEffect(() => {
    if (dashboardId && links.length >= dashboardId) {
      setDashboardInfo(links[dashboardId - 1]);
    }
  }, [dashboardId]);

  if (!dashboardInfo) return <h1>Invalid Dashboard Selection</h1>;

  return (
    <div className="App">
      <div
        className="tableauContainer"
        style={{ opacity: `${showBot ? "0.7" : "1"}` }}
      >
        <script
          type="module"
          src="https://bi-reports.exlservice.com/javascripts/api/tableau.embedding.3.latest.min.js"
        ></script>
        <tableau-viz
          id="tableau-viz"
          src={dashboardInfo?.link}
          width="2000"
          height="790"
          hide-tabs
          toolbar="bottom"
        ></tableau-viz>
      </div>

      <Bot showBot={showBot} toggleBot={toggleBot} dashboardId={dashboardId} />
    </div>
  );
};

window.addEventListener("closeBotIconClicked", () => {
  $(".btn-bot")[0].click();
});

export default LandingPage;

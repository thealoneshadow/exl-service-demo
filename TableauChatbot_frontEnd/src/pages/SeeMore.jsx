import React, { useState, useEffect } from "react";
import "./../css/SeeMore.css";
import seeMore from "./../Utility/seeMore";
import { useLocation, useNavigate } from "react-router-dom";
import dashboradIcon from "./../assets/icons/icons8-dashboard-50.png";
import { Carousel } from "antd";
import { getShuffledInsights } from "../Utility/Utility";
import dataArr from "../Utility/data";
import Bot from "./HomePage/Bot";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const SeeMore = () => {
  const location = useLocation();
  const name = location.state.data.name;
  const linkArr = location.state.data.link;
  console.log("link arr", linkArr);
  const [selected, setSelected] = useState(0); // State to track the selected item
  const [showBot, toggleBot] = useState(false);

  const handleItemClick = (index) => {
    setSelected(index); // Update the selected state when an item is clicked
    navigate("/seemore", { state: { data: dataArr[index] } }); // Navigate to '/seemore' with corresponding data
  };

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seeMoreData = seeMore[0];
  const navigate = useNavigate();

  const changeDash = (newUrl, name) => {
    navigate("/dashboard", { state: { dashURL: newUrl, name: name } });
  };

  // back to top function
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/searchResults?searchQuery=${searchQuery}`);
    }
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <div className="logo">
            <img src="https://www.cvshealth.com/content/dam/enterprise/cvs-enterprise/logos/CVS_Health_logo.svg"></img>
          </div>
          <a
            class="navbar-brand"
            href="/"
            style={{ fontSize: "13px", marginRight: "10px" }}
          >
            Home
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                className={selected == 0 ? "nav-item" : "nav-link-active"}
                style={{ cursor: "pointer" }}
                onClick={() => handleItemClick(0)}
              >
                <a
                  class="nav-link active"
                  aria-current="page"
                  style={{ fontSize: "13px", marginRight: "10px" }}
                >
                  Acquisition
                </a>
              </li>
              <li
                className="nav-item"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/seemore", {
                    state: {
                      data: dataArr[1],
                    },
                  })
                }
              >
                <a
                  class="nav-link active"
                  aria-current="page"
                  style={{ fontSize: "13px", marginRight: "10px" }}
                >
                  Retention
                </a>
              </li>
              <li
                className="nav-item"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/seemore", {
                    state: {
                      data: dataArr[2],
                    },
                  })
                }
              >
                <a
                  class="nav-link active"
                  aria-current="page"
                  style={{ fontSize: "13px", marginRight: "10px" }}
                >
                  Conversion
                </a>
              </li>
              <li
                className="nav-item"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate("/seemore", {
                    state: {
                      data: dataArr[3],
                    },
                  })
                }
              >
                <a
                  class="nav-link active"
                  aria-current="page"
                  style={{ fontSize: "13px", marginRight: "10px" }}
                >
                  Advanced Analytics
                </a>
              </li>
              {/* <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              ></input>
              <button
                class="btn btn-outline-success"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="seemore-container">
        <Bot showBot={showBot} toggleBot={toggleBot} dashboardId={2} />
        <p className="main-heading">{name}</p>

        <Carousel autoplay>
          {getShuffledInsights()
            .slice(3)
            .map((insight, index) => (
              <div key={index}>
                <h3 style={contentStyle}>{insight}</h3>
              </div>
            ))}
        </Carousel>
        <p className="description">{seeMoreData.description}</p>
        <div className="seemore-content">
          <p className="content-heading">{seeMoreData.Headings[0].name}</p>
          <p className="content-description">
            {seeMoreData.Headings[0].description}
          </p>

          <div className="wrap-image-content">
            {linkArr.map((data) => (
              <div className="img-content-container">
                <div className="image-container">
                  <a href={data.link}>
                    <img
                      className="image"
                      src="https://public.tableau.com/static/images/Go/GolfSuperstorePerformanceOverview/GolfSuperstorePerformanceOverview/4_3.png"
                      alt="icon"
                    />
                  </a>
                </div>
                <p className="dashboard-name">{name}</p>
                <p className="dashboard-date">
                  {"Last Updated - "}
                  <span className="span">{"22/12/1234"}</span>
                </p>
                <p className="dashboard-owner">
                  {"Owner - "}
                  <span className="span">{"ABC"}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          className="backToTop"
          onClick={scrollToTop}
          style={{ display: visible ? "inline" : "none" }}
        >
          Back To Top
        </button>
      </div>
    </>
  );
};

export default SeeMore;

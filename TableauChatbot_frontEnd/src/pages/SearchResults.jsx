import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import "../css/SearchResult.css";
import axios from "axios";
import { Card, Col, Divider, Row, Spin, Typography } from "antd";
import { Padding } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import Bot from "./HomePage/Bot";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [showBot, toggleBot] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchQuery")
  );
  const [dashBoardInfo, setDashBoardInfo] = useState(null);

  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [isFileSearchLoading, setIsFileSearchLoading] = useState(false);
  const getSearchResults = async (query) => {
    // const response = await fetch("http://127.0.0.1:5000/search", {
    //   searchQuery: query,
    // });
    setIsDashboardLoading(true);
    const response = await axios({
      method: "GET",
      url: "http://127.0.0.1:5000/search",
      params: {
        searchQuery: query,
      },
      data: { searchQuery: query },
    });

    console.log("res from search dashboard calledd with query ", query);
    const parsedResponse = await response.data.result;

    var lookup = {};
    var items = parsedResponse;
    var result = [];

    for (var item, i = 0; (item = items[i++]); ) {
      var name = item.Dashboard;

      if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(item);
      }
    }

    console.log("res from search", parsedResponse);
    setDashBoardInfo(result);
    setIsDashboardLoading(false);
  };

  const [fileInfo, setFileInfo] = useState(null);

  const getSearchResultsOfFiles = async (query) => {
    // const response = await fetch("http://127.0.0.1:5000/search", {
    //   searchQuery: query,
    // });
    setIsFileSearchLoading(true);
    const response = await axios({
      method: "GET",
      url: "http://127.0.0.1:5000/searchFiles",
      params: {
        searchQuery: query,
      },
      data: { searchQuery: query },
    });

    const parsedResponse = await response.data.result;
    console.log("File searhed for query: ", query);
    console.log("res from search Files", parsedResponse);
    setFileInfo(parsedResponse);
    setIsFileSearchLoading(false);
  };

  const handleSearch = (e) => {
    console.log(searchQuery);
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      refreshPage(searchQuery);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getSearchResults(searchQuery);
    getSearchResultsOfFiles(searchQuery);
  }, []);

  const navigate = useNavigate();

  const refreshPage = (query) => {
    getSearchResults(searchQuery);
    getSearchResultsOfFiles(searchQuery);
  };

  const logActivity = async (dashboardName, link) => {
    const response = await axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logActivity",
      params: {
        description:
          "Opened dashboard: " + dashboardName + " for query " + searchQuery,
        link: link,
      },
    });

    console.log("Log Insertion Res: ", response.data);
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

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <span className="logo">
            <img src="https://www.cvshealth.com/content/dam/enterprise/cvs-enterprise/logos/CVS_Health_logo.svg"></img>
          </span>
          <a
            className="navbar-brand"
            href="/"
            style={{ fontSize: "13px", marginRight: "10px" }}
          >
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{ fontSize: "13px", marginRight: "10px" }}
                >
                  Acquisition
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{ fontSize: "13px", marginRight: "10px" }}
                >
                  Retention
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{ fontSize: "13px", marginRight: "10px" }}
                >
                  Conversion
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{ fontSize: "13px", marginRight: "10px" }}
                >
                  Advanced Analytics
                </a>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      <div className="searchbar" style={{ marginBottom: "20px" }}>
        <form className="d-flex" role="search" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MicIcon
            style={{
              marginRight: "10px",
              verticalAlign: "middle",
              height: "35px",
            }}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>
      <div>
        <Bot showBot={showBot} toggleBot={toggleBot} dashboardId={2} />
      </div>
      <div>
        <Row>
          <Col span={24}></Col>
        </Row>
      </div>
      {/* -------------------- Files display -------------------- */}

      {/* -------------------- Dashboard display -------------------- */}
      <Row style={{ marginTop: "10px", justifyContent: "center" }}>
        <Col span={7}>
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <Typography.Title
                level={5}
                style={{
                  margin: 0,
                  color: "#0f3774",
                }}
              >
                {dashBoardInfo
                  ? ` ${dashBoardInfo.length} Dashboard found`
                  : "0 File found"}
              </Typography.Title>
            </Col>
          </Row>
          <div
            style={{ height: "500px", overflowY: "scroll", marginTop: "10px" }}
          >
            {isDashboardLoading ? (
              <Spin style={{ width: "100%", marginTop: "30px" }} />
            ) : (
              <>
                {dashBoardInfo &&
                  dashBoardInfo.slice(0, 4).map((res, i) => (
                    <Row key={i}>
                      <Col span={24}>
                        <Card
                          title={`${res.Dashboard}`}
                          style={{ margin: "30px" }}
                          bordered={true}
                        >
                          <p>{`KPI: ${res.Description}`}</p>
                          <Link
                            to={`/dashboard/${res.ID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button
                              className="btn btn-outline-success"
                              type="submit"
                              onClick={() =>
                                logActivity(
                                  res.Dashboard,
                                  `/dashboard/${res.ID}`
                                )
                              }
                            >
                              View Dashboard
                            </button>
                          </Link>
                        </Card>
                      </Col>
                    </Row>
                  ))}
              </>
            )}
          </div>
        </Col>

        <Col span={15}>
          <Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <Typography.Title
                level={5}
                style={{
                  margin: 0,
                  color: "#0f3774",
                }}
              >
                {fileInfo ? ` ${fileInfo.length} File found` : "0 File found"}
              </Typography.Title>
            </Col>
          </Row>
          <div
            style={{ height: "500px", overflowY: "scroll", marginTop: "10px" }}
          >
            {isFileSearchLoading ? (
              <Spin style={{ width: "100%", marginTop: "30px" }} />
            ) : (
              <>
                {fileInfo &&
                  fileInfo.slice(0, 4).map((res, i) => (
                    <Card
                      type="inner"
                      title={res.file_name}
                      style={{ margin: "30px" }}
                      extra={
                        <a href={`/src/assets/data/${res.file_name}`} download>
                          Download
                        </a>
                      }
                    >
                      {res.sentence}
                    </Card>
                  ))}
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SearchResult;

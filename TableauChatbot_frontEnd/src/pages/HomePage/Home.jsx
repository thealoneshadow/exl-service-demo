import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "./../../css/Home.css";
import carouselLeft from "../../assets/icons/left-arrow.png";
import carouselRight from "../../assets/icons/right-arrow.png";
import arrowLeft from "../../assets/icons/left-arrow.png";
import links from "../../Components/Dashboard";
import { Avatar, Spin, Tag } from "antd";
import axios from "axios";
import video from "./../../assets/icons/3163534-uhd_3840_2160_30fps.mp4";
import dataArr from "./../../Utility/data";
import MicIcon from "@mui/icons-material/Mic";
import {
  getDashboardRecommendation,
  randomFilters,
} from "../../Utility/Utility";
import Bot from "./Bot";

const Home = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBot, toggleBot] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const handleItemClick = (index) => {
    setSelected(index);
    navigate("/seemore", { state: { data: dataArr[index] } });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/searchResults?searchQuery=${searchQuery}`);
    }
  };

  const [isOpen, setIsOpen] = useState([
    { value: true },
    { value: false },
    { value: false },
    { value: false },
    { value: false },
    { value: false },
  ]);
  const toggleAccordian = (value, object) => {
    let arr = [
      { value: false },
      { value: false },
      { value: false },
      { value: false },
      { value: false },
    ];
    arr[value] = { value: true };
    setIsOpen(arr);
    setData(object);
  };

  // back to top function
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getLogActivity();
  }, []);

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

  const carousel2Arr = [
    {
      heading: "How do we make new Sales?",
      description: "Learn how we use Marketing",
    },
    {
      heading: "How do we make new Cusotmers?",
      description: "Learn how we use Marketing",
    },
    {
      heading: "How do we help new Customers?",
      description: "Learn how we use Marketing",
    },
    {
      heading: "How do we help existing Customers?",
      description: "Learn how we use Marketing",
    },
  ];

  const accordianArray = [
    {
      heading: "Our products such as MA, DSNP, etc.",
      description:
        "Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.",
      buttonName: "businessModel",
      imageURL:
        "https://static01.nyt.com/images/2018/10/11/science/11CVSAETNA-print/merlin_145042911_257a9787-24f2-4a7b-b54b-12810556c09f-superJumbo.jpg",
      arrowImage: { arrowLeft },
    },
    {
      heading: "Our products such as MA, DSNP, etc.",
      description:
        "Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.",
      buttonName: "Products",
      imageURL:
        "https://static01.nyt.com/images/2018/10/11/science/11CVSAETNA-print/merlin_145042911_257a9787-24f2-4a7b-b54b-12810556c09f-superJumbo.jpg",
      arrowImage: { arrowLeft },
    },
    {
      heading: "Our products such as MA, DSNP, etc.",
      description:
        "Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.",
      buttonName: "OrganizationStructure",
      imageURL:
        "https://static01.nyt.com/images/2018/10/11/science/11CVSAETNA-print/merlin_145042911_257a9787-24f2-4a7b-b54b-12810556c09f-superJumbo.jpg",
      arrowImage: { arrowLeft },
    },
    {
      heading: "Our products such as MA, DSNP, etc.",
      description:
        "Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.",
      buttonName: "KeyTimePeriods",
      imageURL:
        "https://static01.nyt.com/images/2018/10/11/science/11CVSAETNA-print/merlin_145042911_257a9787-24f2-4a7b-b54b-12810556c09f-superJumbo.jpg",
      arrowImage: { arrowLeft },
    },
    {
      heading: "Our products such as MA, DSNP, etc.",
      description:
        "Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.Loreum ipsum doler sit amet, consectutu adipiscing elit.",
      buttonName: "Customers",
      imageURL:
        "https://static01.nyt.com/images/2018/10/11/science/11CVSAETNA-print/merlin_145042911_257a9787-24f2-4a7b-b54b-12810556c09f-superJumbo.jpg",
      arrowImage: { arrowLeft },
    },
  ];

  const [data, setData] = useState(accordianArray[0]);

  const [dataForCarousel, setDataForCarousel] = useState([
    carousel2Arr[0],
    carousel2Arr[1],
  ]);

  const carouselNext = () => {
    let arrIndex = carousel2Arr.findIndex(
      (index) => index.heading === dataForCarousel[1].heading
    );
    let arr = [];
    if (arrIndex !== -1) {
      if (carousel2Arr[arrIndex + 1]) {
        arr.push(dataForCarousel[1]);
        arr.push(carousel2Arr[arrIndex + 1]);
        setDataForCarousel(arr);
      }
    }
  };

  const [loggedActivity, setLoggedActivity] = useState([]);
  const getLogActivity = async (dashboardName) => {
    setIsLoading(true);
    const response = await axios({
      method: "GET",
      url: "http://127.0.0.1:5000/logActivity",
      params: {
        description:
          "Opened dashboard: " + dashboardName + " for query " + searchQuery,
      },
    });

    console.log("Log activity Res: ", response.data.logActivities);
    setLoggedActivity(response.data.logActivities);
    setIsLoading(false);
  };

  const carouselPrev = () => {
    let arrIndex = carousel2Arr.findIndex(
      (index) => index.heading === dataForCarousel[0].heading
    );
    let arr = [];
    if (arrIndex !== -1) {
      if (carousel2Arr[arrIndex - 1]) {
        arr.push(carousel2Arr[arrIndex - 1]);
        arr.push(dataForCarousel[0]);
        setDataForCarousel(arr);
      }
    }
  };

  const carouselArrForRecentlyViewed = [
    {
      imageURL:
        "https://static01.nyt.com/images/2018/10/11/science/11CVSAETNA-print/merlin_145042911_257a9787-24f2-4a7b-b54b-12810556c09f-superJumbo.jpg",
      heading: "Retention war room",
      lastUpdate: "20 March",
      owner: "John Marshal",
    },
    {
      imageURL:
        "https://static01.nyt.com/images/2018/10/11/science/11CVSAETNA-print/merlin_145042911_257a9787-24f2-4a7b-b54b-12810556c09f-superJumbo.jpg",
      heading: "Retention war room",
      lastUpdate: "20 April",
      owner: "John Marshal",
    },
    {
      imageURL:
        "https://static01.nyt.com/images/2018/10/11/science/11CVSAETNA-print/merlin_145042911_257a9787-24f2-4a7b-b54b-12810556c09f-superJumbo.jpg",
      heading: "Retention war room",
      lastUpdate: "20 May",
      owner: "John Marshal",
    },
  ];

  const [dataForCarouselRecently, setDataForCarouselRecentlyViewed] = useState([
    carouselArrForRecentlyViewed[0],
    carouselArrForRecentlyViewed[1],
  ]);

  const carouselNextRecently = () => {
    let arrIndex = carouselArrForRecentlyViewed.findIndex(
      (index) => index.imageURL === dataForCarouselRecently[1].imageURL
    );
    let arr = [];
    if (arrIndex !== -1) {
      if (carouselArrForRecentlyViewed[arrIndex + 1]) {
        arr.push(dataForCarouselRecently[1]);
        arr.push(carouselArrForRecentlyViewed[arrIndex + 1]);
        setDataForCarouselRecentlyViewed(arr);
      }
    }
  };

  const carouselPrevRecently = () => {
    let arrIndex = carouselArrForRecentlyViewed.findIndex(
      (index) => index.imageURL === dataForCarouselRecently[0].imageURL
    );
    let arr = [];
    if (arrIndex !== -1) {
      if (carouselArrForRecentlyViewed[arrIndex - 1]) {
        arr.push(carouselArrForRecentlyViewed[arrIndex - 1]);
        arr.push(dataForCarouselRecently[0]);
        setDataForCarouselRecentlyViewed(arr);
      }
    }
  };

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
              <li
                className={selected == 0 ? "nav-item" : "nav-link-active"}
                onClick={() => handleItemClick(0)}
                style={{ cursor: "pointer" }}
              >
                <a
                  className="nav-link active"
                  aria-current="page"
                  style={{ fontSize: "13px", marginRight: "5px" }}
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
                  className="nav-link active"
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
                  className="nav-link active"
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
                  className="nav-link active"
                  aria-current="page"
                  style={{ fontSize: "13px", marginRight: "10px" }}
                >
                  Advanced Analytics
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              ></input>
              <MicIcon
                style={{
                  marginRight: "50px",
                  verticalAlign: "middle",
                  height: "35px",
                }}
              />
              <div
                style={{
                  width: "300px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "10px" }}>Hi, John Doe</span>
                <Avatar style={{ width: "30px" }} icon={<UserOutlined />} />
              </div>
            </form>
          </div>
        </div>
      </nav>

      {showDashboard == true && (
        <tableau-viz
          id="tableau-viz"
          src="https://bi-reports.exlservice.com/t/CNO/views/MedicareCommanCenter/LeadSummary"
          width="1200"
          height="790"
          hide-tabs
          toolbar="bottom"
        ></tableau-viz>
      )}

      {showDashboard == false && (
        <>
          <div className="home-Main">
            <div className="first-section">
              <div className="how-to-use">
                <h1>How To Use</h1>
              </div>

              <div className="how-to-use-Iframe">
                <iframe
                  width="35-"
                  height="300"
                  src={video}
                  frameborder="0"
                  allowfullscreen
                ></iframe>
                <p>Watch above video to understand</p>
              </div>
            </div>

            <div className="divider-firstHome"></div>

            <div className="carousel-Main">
              <div className="recently-viewed">
                <h1>Recently Viewed</h1>
              </div>

              <div
                className="how-to-use-Iframe"
                style={{
                  marginTop: "40px",
                  height: "300px",
                  width: "500px",
                  border: "solid grey 2px",
                  overflowY: "scroll",
                  marginLeft: "140px",
                  borderRadius: "5px",
                }}
              >
                {isLoading ? (
                  <Spin
                    size="large"
                    style={{ width: "100%", marginTop: "60px" }}
                  />
                ) : (
                  <div style={{ margin: "15px" }}>
                    {loggedActivity.map((data, index) => (
                      <div
                        key={index}
                        style={{
                          marginLeft: "20px",

                          width: "90%",
                        }}
                      >
                        <b>{`[${data.Timestamp}] `}</b>
                        <br />
                        <p style={{ textAlign: "justify" }}>
                          {data.Description}
                        </p>
                        <div
                          style={{ marginBottom: "20px", marginTop: "-10px" }}
                        >
                          {randomFilters(index).map((el, ind) => (
                            <Tag key={ind}>{el}</Tag>
                          ))}
                        </div>
                        <div
                          style={{ marginBottom: "20px", marginTop: "-10px" }}
                        >
                          <Link
                            to={data.Link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button
                              className="btn btn-outline-success"
                              type="submit"
                            >
                              View Dashboard
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="carousel-Main">
              <div className="recently-viewed">
                <h1 style={{ marginLeft: "-30px" }}>Recommendation</h1>
              </div>
              <Bot showBot={showBot} toggleBot={toggleBot} dashboardId={1} />
              <div
                className="how-to-use-Iframe"
                style={{
                  marginTop: "40px",
                  height: "300px",
                  width: "260px",
                  border: "solid grey 2px",
                  overflowY: "scroll",
                  marginLeft: "10px",
                  borderRadius: "5px",
                }}
              >
                <div style={{ marginTop: "30px" }}>
                  <div style={{ textAlign: "center", margin: "15px" }}>
                    Recommended dashboards based on your activities
                  </div>
                  {getDashboardRecommendation().map((data, index) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "10px",
                      }}
                      key={index}
                    >
                      <Link
                        to={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                        >
                          {data.Name}
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="about-Medicare">
            <img src="https://www.shutterstock.com/image-photo/chandler-arizona-april-08-2023cvs-600w-2286487997.jpg"></img>

            <div className="about-Medicare-inner">
              <h1>About Medicare</h1>
              <p>
                Discover the peace of mind Medicare brings with our tailored
                plans. Unmatched coverage, affordable premiums, and hassle-free
                enrollment await you. Protect your health and finances with our
                comprehensive Medicare options. Join thousands who trust us for
                reliable healthcare solutions. Secure your future with Medicare
                today. With our Medicare plans, you'll access a vast network of
                healthcare providers, ensuring you receive top-notch care when
                you need it most. Enjoy personalized support from our
                knowledgeable agents who are dedicated to finding the perfect
                plan for your unique needs. Don't wait; prioritize your health
                and well-being with us today. With our Medicare plans, you'll
                access a vast network of healthcare providers, ensuring you
                receive top-notch care when you need it most. Enjoy personalized
                support from our knowledgeable agents who are dedicated to
                finding the perfect plan for your unique needs. Don't wait;
                prioritize your health and well-being with us today.
              </p>
            </div>
          </div>

          <div className="accordian-div">
            <div className="button-side">
              <button
                onClick={() => toggleAccordian(0, accordianArray[0])}
                className={
                  !isOpen[0].value
                    ? "button-accordian"
                    : "button-selected-accordian"
                }
              >
                {" "}
                Business Model{" "}
                <img
                  src={carouselRight}
                  alt="icon"
                  className={!isOpen[0].value ? "arrow-icon" : "arrow-icon-rev"}
                ></img>
              </button>
              <button
                onClick={() => toggleAccordian(1, accordianArray[1])}
                className={
                  !isOpen[1].value
                    ? "button-accordian"
                    : "button-selected-accordian"
                }
              >
                {" "}
                Products{" "}
                <img
                  src={carouselRight}
                  alt="icon"
                  className={!isOpen[1].value ? "arrow-icon" : "arrow-icon-rev"}
                ></img>
              </button>
              <button
                onClick={() => toggleAccordian(2, accordianArray[2])}
                className={
                  !isOpen[2].value
                    ? "button-accordian"
                    : "button-selected-accordian"
                }
              >
                {" "}
                Organization Structure{" "}
                <img
                  src={carouselRight}
                  alt="icon"
                  className={!isOpen[2].value ? "arrow-icon" : "arrow-icon-rev"}
                ></img>
              </button>
              <button
                onClick={() => toggleAccordian(3, accordianArray[3])}
                className={
                  !isOpen[3].value
                    ? "button-accordian"
                    : "button-selected-accordian"
                }
              >
                {" "}
                Key Time Periods{" "}
                <img
                  src={carouselRight}
                  alt="icon"
                  className={!isOpen[3].value ? "arrow-icon" : "arrow-icon-rev"}
                ></img>
              </button>
              <button
                onClick={() => toggleAccordian(4, accordianArray[4])}
                className={
                  !isOpen[4].value
                    ? "button-accordian"
                    : "button-selected-accordian"
                }
              >
                {" "}
                Customers{" "}
                <img
                  src={carouselRight}
                  alt="icon"
                  className={!isOpen[4].value ? "arrow-icon" : "arrow-icon-rev"}
                ></img>
              </button>
            </div>

            <div className="accordian-side">
              <div className="accordian-side-text-image">
                <div className="accordian-side-text">
                  <p className="p1">{data.heading}</p>
                  <p className="p2">
                    Health insurance provides financial protection against
                    medical expenses. It typically covers costs like doctor
                    visits, hospital stays, and medications. Having health
                    insurance ensures access to quality healthcare without
                    worrying about large bills. Policies vary in coverage and
                    cost, offering different plans to suit individual needs,
                    from basic to comprehensive coverage.
                  </p>
                </div>
                <div className="accordian-side-image">
                  <img
                    alt="image3"
                    src={data.imageURL}
                    className="accordian-side-image-img"
                  ></img>
                </div>
              </div>
            </div>
          </div>

          <div className="how-do-we-carousel-main">
            <img
              onClick={() => carouselPrev()}
              src={carouselLeft}
              alt="icon"
              className="carousel-left-right-arrow"
            ></img>
            <div className="how-do-we-first">
              <h1>{dataForCarousel[0].heading}</h1>
              <p>{dataForCarousel[0].description}</p>
            </div>
            <div className="how-do-we-second">
              <h1>{dataForCarousel[1].heading}</h1>
              <p>{dataForCarousel[1].description}</p>
            </div>
            <img
              onClick={() => carouselNext()}
              src={carouselRight}
              alt="icon"
              className="carousel-left-right-arrow"
            ></img>
          </div>

          <div className="acquistion-conversion-data">
            <div className="acquistion-and-conversion">
              <div className="acquistion">
                <h1>Acquistion</h1>
                <p>
                  {" "}
                  Health insurance provides financial protection against medical
                  expenses. It typically covers costs like doctor visits,
                  hospital stays, and medications. Having health insurance
                  ensures access to quality healthcare without worrying about
                  large bills. Policies vary in coverage and cost, offering
                  different plans to suit individual needs, from basic to
                  comprehensive coverage.
                </p>

                <div className="image-and-button-acquistion-data">
                  <img
                    alt="image2"
                    className="imageAcquistion"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrLZ_F13bOiUgI5So7J4NnXs1KDYBSXQPVrhrXOwWE-A&s"
                  ></img>
                  <div className="kpi">
                    <button className="kpiButton">KPI 1</button>
                    <button className="kpiButton">KPI 2</button>
                    <button className="kpiButton">KPI 3</button>

                    <div className="seeMore">
                      <button
                        onClick={() =>
                          navigate("/seemore", {
                            state: {
                              data: dataArr[0],
                            },
                          })
                        }
                      >
                        See More
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider-acquistion-conversion-inner"></div>
              <div className="acquistion">
                <h1>Conversion</h1>
                <p>
                  {" "}
                  Health insurance provides financial protection against medical
                  expenses. It typically covers costs like doctor visits,
                  hospital stays, and medications. Having health insurance
                  ensures access to quality healthcare without worrying about
                  large bills. Policies vary in coverage and cost, offering
                  different plans to suit individual needs, from basic to
                  comprehensive coverage.
                </p>

                <div className="image-and-button-acquistion-data">
                  <img
                    alt="image_1"
                    className="imageAcquistion"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrLZ_F13bOiUgI5So7J4NnXs1KDYBSXQPVrhrXOwWE-A&s"
                  ></img>
                  <div className="kpi">
                    <button className="kpiButton">KPI 1</button>
                    <button className="kpiButton">KPI 2</button>
                    <button className="kpiButton">KPI 3</button>

                    <div className="seeMore">
                      <button
                        onClick={() =>
                          navigate("/seemore", {
                            state: {
                              data: dataArr[1],
                            },
                          })
                        }
                      >
                        See More
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider-acquistion-conversion"></div>

            <div className="retention-and-productAnalysis">
              <div className="acquistion-lower-1">
                <h1>Retention</h1>
                <p>
                  Health insurance provides financial protection against medical
                  expenses. It typically covers costs like doctor visits,
                  hospital stays, and medications. Having health insurance
                  ensures access to quality healthcare without worrying about
                  large bills. Policies vary in coverage and cost, offering
                  different plans to suit individual needs, from basic to
                  comprehensive coverage.
                </p>

                <div className="image-and-button-acquistion-data">
                  <img
                    alt="icon"
                    className="imageAcquistion"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrLZ_F13bOiUgI5So7J4NnXs1KDYBSXQPVrhrXOwWE-A&s"
                  ></img>
                  <div className="kpi">
                    <button className="kpiButton">KPI 1</button>
                    <button className="kpiButton">KPI 2</button>
                    <button className="kpiButton">KPI 3</button>

                    <div className="seeMore">
                      <button
                        onClick={() =>
                          navigate("/seemore", {
                            state: {
                              data: dataArr[2],
                            },
                          })
                        }
                      >
                        See More
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="acquistion-lower">
                <h1>Product Analytics</h1>
                <p>
                  {" "}
                  Health insurance provides financial protection against medical
                  expenses. It typically covers costs like doctor visits,
                  hospital stays, and medications. Having health insurance
                  ensures access to quality healthcare without worrying about
                  large bills. Policies vary in coverage and cost, offering
                  different plans to suit individual needs, from basic to
                  comprehensive coverage.
                </p>

                <div className="image-and-button-acquistion-data">
                  <img
                    alt="icon"
                    className="imageAcquistion"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrLZ_F13bOiUgI5So7J4NnXs1KDYBSXQPVrhrXOwWE-A&s"
                  ></img>
                  <div className="kpi">
                    <button className="kpiButton">KPI 1</button>
                    <button className="kpiButton">KPI 2</button>
                    <button className="kpiButton">KPI 3</button>

                    <div className="seeMore">
                      <button
                        onClick={() =>
                          navigate("/seemore", {
                            state: {
                              data: dataArr[3],
                            },
                          })
                        }
                      >
                        See More
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="backToTopHome"
            onClick={scrollToTop}
            style={{ display: visible ? "inline" : "none" }}
          >
            Back To Top
          </button>

          <div className="footer">Copyrigh0@2024</div>
        </>
      )}
    </>
  );
};

export default Home;

import insureImage from "../../Resources/img/icon/icon-02-primary.png";
import carousel2Image from "../../Resources/img/carousel-2.jpg";
import { NavLink } from "react-router-dom";

export default function Login() {
  const handleSubmit = (e) => {
    // console.log(props.state);
    e.preventDefault();
    console.log("hello");
    // setIsVisibleValue(false);
    // props.actionProvider.handleFlow1UserInputs(
    //   {
    //     reqId: reqId,
    //   },
    //   props.state
    // );
  };

  return (
    <div>
      {/* <!-- Navbar Start -- */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-1 ">
        <a href="index.html" className="navbar-brand d-flex align-items-center">
          <h1 className="m-0">
            <img className="img-fluid me-3" src={insureImage} alt=""></img>
            Insure
          </h1>
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>

      <div
        className="container-fluid p-0 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div>
              <img className="w-100" src={carousel2Image} alt="Image"></img>
              <div className="carousel-caption login-section mt-5">
                {/* <div className="row">
                              <h1 className="m-0"><img className="img-fluid me-3" src={insureImage} alt=""></img>Insure</h1>
                          </div> */}
                <div className="row bg-transparent">
                  <div className="col-12 col-lg-8">
                    <div className="bg-dark rounded p-5 m-5 text-light ">
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-sm-12">
                            <div>User ID</div>
                          </div>
                          <div className="col-sm-12">
                            <div>
                              <input
                                type="text"
                                className="form-control "
                                id="userid"
                              />
                              {/* <label for="gname">Your Name</label> */}
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div>Password</div>
                          </div>
                          <div className="col-sm-12">
                            <div>
                              <input
                                type="password"
                                className="form-control"
                                id="pwd"
                              />
                              {/* <label for="cname">Your Mobile</label> */}
                            </div>
                          </div>
                          <div className="col-8"></div>
                          <div className="col-4">
                            <NavLink to="/home">
                              <button
                                className="btn btn-primary py-3 px-5"
                                type="submit"
                              >
                                Login
                              </button>
                            </NavLink>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import moment from "moment";

const validateRequestId = (userReqId) => {
  var re = new RegExp("REQ[0-9]{3}", "gi");
  let reqIdsMatches = re.exec(userReqId);
  let reqIdsList = [];
  while (reqIdsMatches !== null) {
    reqIdsList.push(reqIdsMatches[0]);
    reqIdsMatches = re.exec(userReqId);
  }
  return userReqId.split(",");
};

const validateDate = (userDate) => {
  return moment(userDate).isValid();
};

const validatePolicyDate = (userDate) => {
  const now = moment();
  const policyDate = moment(userDate);
  // console.log("Now", now);
  // console.log("policyDate", policyDate);

  const duration = moment.duration(now.diff(policyDate));

  return duration.as("years") >= -1.0 && duration.as("years") <= 1.0;
};

const validatePolicyDateFormat = (userDate) => {
  return moment(userDate, "YYYY-MM-DD").format("YYYY-MM-DD");
};
export {
  validateRequestId,
  validateDate,
  validatePolicyDate,
  validatePolicyDateFormat,
};

export const getShuffledInsights = () => {
  const insights = [
    "30% yoy growth in medicare advantage plans",
    "0 premium plans have 5% higher yoy growth this year",
    "Pennsylvania has 7% higher enrollments",
    "Warm transfer leads have 40% higher conversation rates in comparison to traditional channels",
    "Zhealth is the top performing vendor partner constituting 30% of total enrollments",
    "We are 20% higher on forecasted sales in 2024 in comparison to goals",
  ];

  return insights
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const randomFilters = (index) => {
  const filterList = [
    ["MA MIX > 10", "Enrollments > 20%", "State in (PA, AZ, NY)"],
    ["Enrollments > 20%", "State in ( AZ, NY)"],
    ["MA MIX > 10", "Year =2022", "State in (PA, AZ, NY)"],
    ["Year =2022", "MA MIX <= 40", "Enrollments != 0"],
    ["State in (PA, AZ, NY)"],
  ];

  return filterList[index];
};

export const getDashboardRecommendation = () => {
  const recommendationList = [
    {
      Name: "Lead Generation Summary",
      link: "http://localhost:3000/dashboard/2",
    },
    {
      Name: "Lead Summary",
      link: "http://localhost:3000/dashboard/1",
    },
    {
      Name: "Medicare Sales Portfolio",
      link: "http://localhost:3000/dashboard/7",
    },
  ];

  return recommendationList;
};

import axios from "axios";

// const url = "https://covid19.mathdro.id/api";
const url = "http://localhost:8080/stats";

// export const fetchData = async (region) => {
//   let changeableUrl = url;

//   if (region) {
//     changeableUrl = `${url}/regions/${region}`;
//   }
//   try {
//     const {
//       data: { confirmed, recovered, deaths, lastUpdate },
//     } = await axios.get(changeableUrl);

//     const modifiedData = {
//       confirmed,
//       recovered,
//       deaths,
//       lastUpdate,
//     };
//     return modifiedData;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchData = async (region) => {
  let changeableUrl = url;

  let modifiedData = {};
  if (region) {
    changeableUrl = `${url}/search?${region}`;
    try {
      const { data } = await axios.get(changeableUrl);
      data.reverse();
      const val = region;
      const index = data.findIndex(function (item, i) {
        return item.region === val;
      });
      console.log(index);
      if (region) {
        modifiedData = {
          confirmed: data[index].infections,
          deaths: data[index].deathsAmount,
          recovered: data[index].recovers,
          tests: data[index].testsAmount,
          lastUpdate: data[index].datestamp,
        };
      }
      return modifiedData;
    } catch (error) {}
  } else {
    try {
      const { data } = await axios.get(changeableUrl);
      modifiedData = {
        confirmed: data[data.length - 1].infections,
        deaths: data[data.length - 1].deaths,
        recovered: data[data.length - 1].recovers,
        tests: data[data.length - 1].tests,
        lastUpdate: data[data.length - 1].datestamp,
      };

      return modifiedData;
    } catch (error) {}
  }
};

export const fetchDailyData = async () => {
  try {
    // const { data } = await axios.get(`${url}/daily`);
    const { data } = await axios.get(url);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.infections,
      recovered: dailyData.recovers,
      deaths: dailyData.deaths,
      tests: dailyData.tests,
      date: dailyData.datestamp,
    }));

    return modifiedData;
  } catch (error) {
    return error;
  }
};

export const fetchRegions = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/regions`);
    return data.map((region) => region.name);
  } catch (error) {
    return error;
  }
};

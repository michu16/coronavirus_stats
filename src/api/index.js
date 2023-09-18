import axios from "axios";

const url = process.env.REACT_APP_KEY;
export const fetchData = async (region) => {
  let changeableUrl = url;

  let modifiedData = {};
  if (region) {
    changeableUrl = `${url}/search?${region}`;
    try {
      const { data } = await axios.get(changeableUrl);
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
    } catch (error) { }
  } else {
    try {
      const { data } = await axios.get(changeableUrl);
      modifiedData = {
        confirmed: data[0].infections,
        deaths: data[0].deaths,
        recovered: data[0].recovers,
        tests: data[0].tests,
        lastUpdate: data[0].datestamp,
      };

      return modifiedData;
    } catch (error) { }
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(url);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.infections,
      recovered: dailyData.recovers,
      deaths: dailyData.deaths,
      tests: dailyData.tests,
      date: dailyData.datestamp,
    }));
    return
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

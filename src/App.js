import React from "react";

import { Cards, Chart, RegionPicker } from "./Components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import image from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
    region: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleRegionChange = async (region) => {
    const fetchedData = await fetchData(region);
    this.setState({ data: fetchedData, region: region });
  };
  render() {
    const { data, region } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <RegionPicker handleRegionChange={this.handleRegionChange} />
        <Chart data={data} region={region} />
      </div>
    );
  }
}

export default App;

import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./RegionPicker.module.css";

import { fetchRegions } from "../../api";

const Regions = ({ handleRegionChange }) => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setRegions(await fetchRegions());
    };

    fetchAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleRegionChange(e.target.value)}
      >
        {regions.map((region, i) => (
          <option key={i} value={region}>
            {region}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Regions;

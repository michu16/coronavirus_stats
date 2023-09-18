import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import styles from "./Cards.module.css";

const Cards = ({
  data: { confirmed, recovered, deaths, lastUpdate, tests },
}) => {
  if (!confirmed) {
    return "Ładowanie...";
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={4} justifyContent="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={2}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Zainfekowani
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed}
                duration={2.5}
                separator=","
              ></CountUp>
            </Typography>
            <Typography color="textSecondary">
              {new Intl.DateTimeFormat(
                Intl.DateTimeFormat().resolvedOptions().locale
              ).format(new Date(lastUpdate))}
            </Typography>
            <Typography variant="body2">
              Liczba aktywnych przypadków COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={2}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Ozdrowieńcy
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered}
                duration={2.5}
                separator=","
              ></CountUp>
            </Typography>
            <Typography color="textSecondary">
              {new Intl.DateTimeFormat(
                Intl.DateTimeFormat().resolvedOptions().locale
              ).format(new Date(lastUpdate))}
            </Typography>
            <Typography variant="body2">
              Liczba uzdrowionych z COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={2}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Zgony
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={deaths}
                duration={2.5}
                separator=","
              ></CountUp>
            </Typography>
            <Typography color="textSecondary">
              {new Intl.DateTimeFormat(
                Intl.DateTimeFormat().resolvedOptions().locale
              ).format(new Date(lastUpdate))}
            </Typography>
            <Typography variant="body2">
              Liczba zgonów spowodowanych przez COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={2}
          className={cx(styles.card, styles.tests)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Testy
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={tests}
                duration={2.5}
                separator=","
              ></CountUp>
            </Typography>
            <Typography color="textSecondary">
              {new Intl.DateTimeFormat(
                Intl.DateTimeFormat().resolvedOptions().locale
              ).format(new Date(lastUpdate))}
            </Typography>
            <Typography variant="body2">
              Liczba wykonanych testów na COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;

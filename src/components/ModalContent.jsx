import { useState } from "react";
import notImg from "../assets/image.png";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { withStyles } from "@mui/styles";

const styles = {
  Card: {
    padding: 20,
  },
  cardActionArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
  },
  cardImgContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    paddingRight: 20,
  },
  image: {
    objectFit: "contain!important",
    height: "auto",
    minWidth: "130px",
    maxHeight: 500,
  },
  cursor: { cursor: "pointer" },
};

const Modal = (props) => {
  const { classes, beer } = props;

  let styleText = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  };

  const [isActiveStyleDescr, changeActiveStyleDesc] = useState(false);
  const [isActiveStyleFood, changeActiveStyleFood] = useState(false);
  let showDescription = () => {
    if (!isActiveStyleDescr) {
      changeActiveStyleDesc(true);
    } else {
      changeActiveStyleDesc(false);
    }
  };
  let showFoodPairing = () => {
    if (!isActiveStyleFood) {
      changeActiveStyleFood(true);
    } else {
      changeActiveStyleFood(false);
    }
  };

  return (
    <Card key={beer.id} className={classes.Card}>
      <div className={classes.cardActionArea}>
        <div className={classes.cardContainer}>
          <CardActions className={classes.cardImgContainer}>
            {beer.image_url === null ? (
              <img
                src={notImg}
                style={{ width: 40 + "%" }}
                alt={beer.name}
              ></img>
            ) : (
              <CardMedia
                className={classes.image}
                component="img"
                height="140px"
                width="auto"
                image={beer.image_url}
                alt="beer"
              />
            )}
          </CardActions>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {beer.name}
            </Typography>
            <p>{beer.abv} %</p>
            <div>
              <h4>Name:</h4> <p>{beer.name}</p>
              <div />
              <div>
                <h4>Tagline:</h4> <p> {beer.tagline}</p>
              </div>
              <div>
                <h4>Abv :</h4> <p>{beer.abv}</p>
              </div>
              <div className={classes.cursor}>
                <h4>Description :</h4>

                <p
                  style={isActiveStyleDescr ? null : styleText}
                  onClick={showDescription}
                >
                  {beer.description}
                </p>
              </div>
              <div className={classes.cursor}>
                <h4>Food pairing :</h4>
                <p
                  style={isActiveStyleFood ? null : styleText}
                  onClick={showFoodPairing}
                >
                  {beer.food_pairing
                    ? beer.food_pairing.map((i) => {
                        return <li key={i}>{i}</li>;
                      })
                    : ""}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default withStyles(styles)(Modal);

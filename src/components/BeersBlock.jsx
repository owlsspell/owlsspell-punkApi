import notImg from "../assets/image.png";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import ModalContent from "./ModalContent";
import { colorPalette } from "./color";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const styles = {
  Card: {
    height: "100%",
    "@media (max-width:600px)": {
      margin: "0 20px",
    },
  },
  cardActionArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "start!important",
    height: "100%",
    width: "100%",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: "10px",
  },
  cardImgContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "5px",
    "& img": {
      objectFit: "contain",
    },
  },

  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #000",
    boxShadow: 24,
    padding: 4,
    border: "none",
  },
  read_more: {
    position: "absolute!important",
    bottom: 0,
    left: 0,
    color: `${colorPalette[1]} !important`,
  },
  zoom: {
    transition: 'all .5s  ease-in-out',
    // transition: 'margin .5s  ease-in-out',
   
    '&:hover': {
      transform: 'scale(1.2)',
      transition: 'all .5s  ease-in-out',
  

      marginLeft:'20px',
      marginBottom:'0',
      left: 20,
      bottom: 0
    }
  }
};

const BeersBlock = (props) => {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={2} className="beers">
      {props.beers.map((beer) => (
        <Grid item xs={12} sm={6} md={6} lg={4} key={beer.id}>
          <Card
            onClick={() => {
              // props.changeModalActive(true);
              props.showBeerInfo(beer);
            }}
            className={classes.Card}
          >
            <CardActionArea className={classes.cardActionArea}>
              <div className={classes.cardContainer}>
                <CardActions className={classes.cardImgContainer}>
                  {beer.image_url === null ? (
                    <img
                      src={notImg}
                      style={{ width: 40 + "%" }}
                      alt={beer.name}
                      className={classes.zoom}
                    ></img>
                  ) : (
                    <CardMedia
                      className={classes.image + " " + classes.zoom}
                      component="img"
                      height="140"
                      width="auto"
                      image={beer.image_url}
                      alt="beer"
                    />
                  )}
                </CardActions>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className={classes.zoom}>
                    {beer.name}
                  </Typography>
                  <p>{beer.abv} %</p>
                </CardContent>
              </div>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={handleOpen}
                  className={classes.read_more}
                >
                  Read More
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalStyle}>
          <ModalContent beer={props.beerNum} />
        </Box>
      </Modal>
    </Grid>
  );

};

export default withStyles(styles)(BeersBlock);

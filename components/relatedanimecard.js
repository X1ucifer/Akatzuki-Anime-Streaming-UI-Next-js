import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    // display:"flex"
    margin: "20px",
    background: "linear-gradient(to right, #000000, #434343)",
    color: "white",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:"50%",
    backgroundColor: "black",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MediaControlCard({ value }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleClick = (title) => {
   
   
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(title.toLowerCase() )
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
          setOpen(true);
        }).catch((error) => console.log(error));
    }
  }

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 1,
    }
  }

  return (
    <div className=' flex flex-wrap p-10'>

      <Card className={classes.root} >
        <CardHeader

          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              A
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={value.title}

        />
        <CardMedia
          className={classes.media}
          image={value.image_url}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" style={{ color: "white" }}>
            {value.synopsis}
          </Typography>
        </CardContent>
        <CardActions disableSpacing >
          <IconButton aria-label="add to favorites">
            <Tooltip title="Play Trailer">
              <PlayArrowIcon onClick={() => handleClick(value.title)} style={{ color: "white" }} />
            </Tooltip>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon style={{ color: "white" }} />
          </IconButton>

        </CardActions>

      </Card>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
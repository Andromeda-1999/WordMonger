import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import * as storyactions from "./../../../Redux/stories/actions";
import * as useractions from "./../../../Redux/users/actions";
import * as genreactions from "./../../../Redux/genres/actions";
import * as ratingactions from "../../../Redux/ratings/actions";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';
import InputBase from '@material-ui/core/InputBase';
import defaultImage from "./../../../assets/images/no_cover.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    alignItems: 'center',
    height: 240,
    width: 200,
  },
  control: {
    alignItems: 'center',
    padding: theme.spacing(8),
  },
  heading: {
    textAlign: 'center',
    width: '188 %'
  },
  img: {
    alignItems: 'center',
    width: 38,
    height: 88,

  },
}));
//and specify what properties user wants
const List = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();

  const [rating, setRating] = useState({});
  const [hover, setHover] = useState({});
  const [searchParams, setSearchParams] = useState({});
  const {books, users, allratings, genres, individual} = useSelector(
    (state) => ({
      books: state.stories.entities,
      users: state.Users.entities,
      chapters: state.chapters.entities,
      allratings: state.ratings.entities,
      genres: state.genres.entities,
      storygenre: state.storygenre.entities,
      ReadersProgress: state.ReadersProgress.entities,
      individual: state.stories.individual
    }),
    shallowEqual
  );

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  useEffect(() => {
    dispatch(storyactions.fetchStories());
    dispatch(useractions.fetchUsers());
    dispatch(genreactions.fetchGenres());
    if (id) {
      dispatch(storyactions.fetchStoriesByID(id));
      dispatch(useractions.fetchUsersByID(id));
    }
  }, [id]);

  const onChangeFilter = (key, value) => {
    setSearchParams({
      ...searchParams,
      [key]: value
    })
  }

  const onFilter = () => {
    dispatch(storyactions.fetchStories(searchParams));
  }

  return (
    <div className="library" style={{margin: "20px"}}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search by Story Title"
              value={searchParams.name}
              onChange={(event) => onChangeFilter("name", event.target.value)}
            />
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search by Chapter Title"
              value={searchParams.chapter}
              onChange={(event) => onChangeFilter("chapter", event.target.value)}
            />
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Select
            name="genre"
            isMulti
            placeholder="Genres"
            styles={{width: "100%", padding: "0"}}
            options={(genres || []).map(item => ({value: item.idGenre, label: item.genreName}))}
            className="basic-multi-select"
            classNamePrefix="select"
            value={searchParams.genre}
            onChange={(event) => onChangeFilter("genre", event.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <Button variant="contained" color="primary" style={{width: "100%"}} onClick={onFilter}>
            Filter
          </Button>
        </Grid>
      </Grid>

      <div className={classes.control} style={{padding: "25px 5px"}}>
        <Grid container spacing={3}>
          {(books || []).map(book => (
            <Grid item xs={3}>
              {/*<div className={classes.root}>*/}
              <Paper className={classes.paper} style={{width: "100%", padding: "10px"}}>
                <Typography className={classes.heading}>{book.storyTitle}</Typography>
                <Typography className={classes.heading}>{book.user}</Typography>

                <img
                  src={book.storyCover || defaultImage}
                  alt="book cover"
                  className={classes.img}
                  style={{
                    height: "85px",
                    width: "100%",
                    display: "block"
                  }}/>
                <div className="rating"
                     style={{
                       display: "block",
                       textAlign: "center"
                     }}>
                  <Rating
                    name={`hover-feedback${book.idStory}`}
                    value={rating[book.idStory]}
                    precision={0.5}

                    onChange={(event, newValue) => {
                      console.log(book.idStory, newValue)
                      setRating({
                        user: 8,
                        story: book.idStory,
                        rating: newValue
                      });
                      dispatch(ratingactions.createRatings({
                        user: 8,
                        story: book.idStory,
                        rating: newValue
                      }));

                    }}
                    onChangeActive={(event, newHover) => {

                      setHover({...hover, [book.idStory]: newHover});
                    }}

                  />
                  <Box
                    style={{
                      height: '2px',
                      fontSize: '20px'
                    }}
                    ml={2}>
                    {labels[hover[book.id] !== -1 ? hover[book.id] : rating[book.id]]}
                  </Box>
                </div>

                <Box textAlign="center" m={3} style={{margin: "12px"}}>
                  <Button
                    variant="outlined"
                    style={{color: "pink", display: "inline-block"}}
                    onClick={() => history.push(`/app/stories/view/${book.idStory}`)}>
                    View Story
                  </Button>
                  {localStorage.getItem('userId') === book?.user.toString() ? (
                    <Button
                      variant="outlined"
                      style={{color: "pink", marginLeft: "10px", display: "inline-block"}}
                      onClick={() => history.push(`/app/stories/edit/${book.idStory}`)}>
                      Edit Story
                    </Button>
                  ) : null}

                </Box>
              </Paper>
              {/*</div>*/}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default List;

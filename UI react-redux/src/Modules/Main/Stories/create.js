import ReactTypingEffect from 'react-typing-effect';
import ProfileImage from "@daym3l/react-profile-image";
import Box from '@material-ui/core/Box';
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill from 'react-quill'; // ES6
import { useHistory, useParams } from "react-router-dom";
import addcover from '../../../assets/images/cover.png';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as storyActions from "./../../../Redux/stories/actions";
import * as genreActions from "./../../../Redux/genres/actions";
import * as storyGenreActions from "./../../../Redux/storygenre/actions";
import * as chapterActions from "./../../../Redux/chapters/actions";
import * as readersProgressActions from "./../../../Redux/ReadersProgress/actions";
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CreateChapter from './createChapter';
import {toast} from "react-toastify";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteChaptersByID } from "./../../../Redux/chapters/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
  paper1: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft: '60px',
    height: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '100%',
    color: theme.palette.text.secondary
  },
}));

const Create = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  // to keep track of the input textarea and select dropdown
  const [storyTitle, setTitle] = useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const [storyCover, setImage] = useState('');
  const [isShowChapter, setIsShowChapter] = useState(false);
  const [idChapter, setIdChapter] = useState("");
  const [selectedChapter, setSelectedChapter] = useState('');
  const getImages = (storyCover) => {
    setImage(storyCover);
  };

  const handleChangeEditor = (editorHtml) => {
    setEditorHtml(editorHtml);
  }

  const {entityForEdit, genres, individual, individualchapter, chapters} = useSelector(
    (state) => ({
      individual: state.stories.individual,
      entityForEdit: state.stories.entityForEdit,
      genres: state.genres.entities,
      chapters: state.chapters.entities,
      individualchapter: state.chapters.individual,
    }),
    shallowEqual
  );
  console.log(chapters);
  useEffect(() => {
    dispatch(genreActions.fetchGenres());
    if (id) {
      dispatch(chapterActions.fetchChapters(id));
      dispatch(storyActions.fetchStoriesByID(id));
      // dispatch(chapterActions.fetchChaptersByID(id));
    }
  }, [id]);

  useEffect(() => {
    if (individual) {
      if (id) {
        if (individual?.genreIds) {
          dispatch(storyGenreActions.updateAllStoryGenres({
            story_id: individual.idStory,
            genre_id: individual?.genreIds
          }));
        }
        history.push("/app/stories");
      } else {
        if (individual?.genreIds) {
          individual?.genreIds?.forEach((genre_id, index) => {
            dispatch(storyGenreActions.createStory_Genre({
              story_id: individual.idStory,
              genre_id
            }))

            if (index === individual?.genreIds.length - 1) {
              history.push("/app/stories")
            }
          });
        } else {
          history.push("/app/stories")
        }
      }
    }
  }, [individual]);

  useEffect(() => {
    if (entityForEdit) {
      setTitle(entityForEdit.storyTitle);
      setEditorHtml(entityForEdit.storyDescription);
      setImage(entityForEdit.storyCover);
      setselectedGenres(entityForEdit.genreIds || []);
    }
  }, [entityForEdit]);

  const modules = {
    toolbar: [
      [{'header': '1'}, {'header': '2'}, {'font': []}],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
        {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  //create a loading message while the data is being fetched
  const [isPending, setIsPending] = useState(false);
  const [selectedGenres, setselectedGenres] = useState([]);

  const handleChange = (values) => {
    setselectedGenres(values);
  };

  const saveStory = () => {
    console.log(selectedGenres)
    const story = {
      storyTitle,
      user: Number(localStorage.getItem('userId')),
      storyDescription: editorHtml,
      storyCover,
      genreIds: (selectedGenres || []).map(item => item.value)
    };

    if (id) {
      dispatch(storyActions.updateStories({story: {...story, idStory: id}}))
      // dispatch(storyGenreActions.updateStory_Genre({ story: { ...story, idStory: id } }))
    } else {
      dispatch(storyActions.createStories({story}))
    }
  };
  const onBookmark = (chapterId) => {
    dispatch(readersProgressActions.createReadersProgress({
      story: Number(id),
      chapter: chapterId
    }));
  }

  return (
    <>
      {isShowChapter ? (
        <CreateChapter
          isShowChapter={isShowChapter}
          setIsShowChapter={setIsShowChapter}
          story={id}
          idChapter={idChapter}
          selectedChapter={selectedChapter}
        />
      ) : (
        <div className="create">
          <Box textAlign="center" m={1} style={{fontSize: '25px', marginTop: "5px"}}>
            <ReactTypingEffect
              text={"STORY!"}
              cursorRenderer={cursor => <h1>{cursor}</h1>}
              displayTextRenderer={(text, i) => {
                return (
                  <h1>
                    {text.split('').map((char, i) => {
                      const key = `${i}`;
                      return (
                        <span
                          key={key}
                          style={{color: ' purple'}}
                        >{char}</span>
                      );
                    })}
                  </h1>
                );
              }}
            />
          </Box>
          <br/>
          <br/>
          <div className={classes.root}>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <Paper className={classes.paper1}>
                  <div className="upload-file">
                    <ProfileImage
                      required
                      camera={false}
                      clearPreview={!Boolean(storyCover)}
                      className="upload-button"
                      uploadBtnProps={{variant: "contained", label: "+storyCover"}}
                      defaultImage={addcover}
                      styles={{margin: "auto", height: '180px'}}
                      returnImage={getImages}
                    />
                  </div>
                </Paper>
              </Grid>

              <br/>
              <Grid item xs={8}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <Typography variant="h5" gutterBottom>
                        Story Details
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <label>Title</label>
                          <input
                            type="text"
                            required
                            value={storyTitle}
                            //function that envokes setTitle to set it to a new value
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <label>Genre</label>
                          <Select
                            value={selectedGenres}
                            onChange={handleChange}
                            name="genre"
                            isMulti
                            options={(genres || []).map(item => ({value: item.idGenre, label: item.genreName}))}
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <label>Description:</label>
                          <div className="quill">
                            <ReactQuill
                              theme="snow"
                              required
                              onChange={handleChangeEditor}
                              value={editorHtml}
                              modules={modules}
                              formats={formats}
                              bounds={'.app'}
                              placeholder="Write your story"
                              style={{backgroundColor: "white",}}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          {id ? (
                            <button onClick={saveStory} disabled={isPending}>
                              {isPending ? "Updating Book...." : "Update Story"}
                            </button>
                          ) : (
                            <button onClick={saveStory} disabled={isPending}>
                              {isPending ? "Adding Book...." : "Save Story Details"}
                            </button>
                          )}
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <Typography variant="h5" gutterBottom>
                        Chapters
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          {chapters?.map(chapter => (
                            <List dense={false}>
                              <ListItem onClick={() =>{
                                  setIdChapter(chapter.idChapter)
                                  setIsShowChapter(true);
                                  setSelectedChapter(chapter);
                              }}>
                                <ListItemAvatar>
                                  <Avatar>
                                    <img src={chapter.chapterImage || ""} alt="book cover"/>
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={chapter.chapterTitle}

                                />
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="bookmark"
                                              onClick={() => {
                                                dispatch(deleteChaptersByID({idChapter: chapter?.idChapter})).then(res => {
                                                  toast.success('Chapter deleted successfully');
                                                  dispatch(chapterActions.fetchChapters(id));
                                                  dispatch(storyActions.fetchStoriesByID(id));
                                                })
                                              }}>
                                    <DeleteIcon/>
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            </List>
                          ))}
                        </Grid>
                        <Grid item xs={12}>
                          {id ? (
                            <button
                              onClick={() => {
                                  setIdChapter('');
                                  setSelectedChapter({});
                                  setIsShowChapter(!isShowChapter)
                              }}
                              disabled={isPending}>Add Chapter
                            </button>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
}

export default Create;

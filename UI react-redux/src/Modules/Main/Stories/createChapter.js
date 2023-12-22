import ReactTypingEffect from 'react-typing-effect';
import ProfileImage from "@daym3l/react-profile-image";
import Box from '@material-ui/core/Box';
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill from 'react-quill'; // ES6
import addcover from '../../../assets/images/cover.png';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as chapterActions from "./../../../Redux/chapters/actions";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import * as storyActions from "../../../Redux/stories/actions";
import { toast } from 'react-toastify';

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

const CreateChapter = ({
                         setIsShowChapter,
                         isShowChapter,
                         story,
                         idChapter,
                         selectedChapter
                       }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // to keep track of the input textarea and select dropdown
  const [chapterTitle, setTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [chapterImage, setChapterImage] = useState('');

  const getImages = (value) => {
    setChapterImage(value);
  };

  const handleChangeEditor = (value) => {
    setChapterContent(value);
  }

  const {entityForEdit, individual} = useSelector(
    (state) => ({
      entityForEdit: state.chapters.entityForEdit,
    }),
    shallowEqual
  );

  // useEffect(() => {
  //     if (idChapter) {
  //         dispatch(chapterActions.fetchChaptersByID(idChapter));
  //     }
  // }, [idChapter]);


  useEffect(() => {
    if (entityForEdit) {
      setTitle(entityForEdit.chapterTitle);
      setChapterContent(entityForEdit.chapterContent);
      setChapterImage(entityForEdit.chapterImage);
    }
  }, [entityForEdit]);

  useEffect(() => {
    if (selectedChapter) {
      setTitle(selectedChapter.chapterTitle);
      setChapterContent(selectedChapter.chapterContent);
      setChapterImage(selectedChapter.chapterImage);

    }
  }, [selectedChapter]);

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
  console.log(selectedChapter)
  const saveChapter = () => {
    const chapter = {
      chapterTitle,
      story,
      chapterContent,
      chapterImage,
    };

    if (idChapter) {
      dispatch(chapterActions.updateChapters({chapter: {...chapter, idChapter}})).then(res => {
        toast.success('Chapter edited successfully');
        dispatch(chapterActions.fetchChapters(story));
        dispatch(storyActions.fetchStoriesByID(story));
      });
    } else {
      dispatch(chapterActions.createChapters({chapter})).then(res => {
        toast.success('Chapter created successfully');
        dispatch(chapterActions.fetchChapters(story));
        dispatch(storyActions.fetchStoriesByID(story));
      });
    }

    setIsShowChapter(!isShowChapter);
  };

  return (
    <div className="create">
      <Box textAlign="center" m={1} style={{fontSize: '25px', marginTop: "5px"}}>
        <ReactTypingEffect
          text={"CREATE CHAPTER!"}
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
                  clearPreview={!Boolean(chapterImage)}
                  className="upload-button"
                  uploadBtnProps={{variant: "contained", label: "+chapterImage"}}
                  defaultImage={addcover}
                  styles={{margin: "auto", height: '180px'}}
                  returnImage={getImages}
                />
              </div>
            </Paper>
          </Grid>

          <br/>
          <Grid item xs={8}>
            <Paper className={classes.paper}>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <label>Title</label>
                  <input
                    type="text"
                    required
                    value={chapterTitle}
                    //function that envokes setTitle to set it to a new value
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <label>Content</label>
                  <div className="quill">
                    <ReactQuill
                      theme="snow"
                      required
                      onChange={handleChangeEditor}
                      value={chapterContent || ''}
                      modules={modules}
                      formats={formats}
                      bounds={'.app'}
                      placeholder="Write your chapter content"
                      style={{backgroundColor: "white",}}
                    />
                  </div>
                </Grid>

                <Grid item xs={8}></Grid>

                <Grid item xs={2}>
                  <button onClick={() => setIsShowChapter(!isShowChapter)} disabled={isPending}>Back</button>
                </Grid>

                <Grid item xs={2}>
                  {idChapter ? (
                    <button onClick={saveChapter} disabled={isPending}>
                      {isPending ? "Updating ...." : "Update"}
                    </button>
                  ) : (
                    <button onClick={saveChapter} disabled={isPending}>
                      {isPending ? "Adding ...." : "Proceed"}
                    </button>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default CreateChapter;

import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({


  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontFamily: "Lucida Handwriting",
    fontWeight: "fontWeightBold",
    color: "gold"

  },
  description: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontFamily: "Times New Roman",
    color: "#03a9f4"
  },
  story: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontFamily: "Georgia",
    color: "#212121"
  },


}));

const BookDetails = () => {
  const classes = useStyles();
  // this allows as to grab parameters from the route


  return (
    <div className="book-details">


      {/*{book && (*/}

      {/*  <List style={{ padding: "0 50px", }}>*/}
      {/*    <Box textAlign="center" m={1}>*/}


      {/*      <Typography variant="h3" fontFamily="Lucida Handwriting" className={classes.title}>*/}
      {/*        {book.title || "N/A"}*/}
      {/*      </Typography>*/}
      {/*    </Box>*/}
      {/*    <br />*/}
      {/*    <Box textAlign="center" m={1}>*/}
      {/*      <Typography variant="h5" className={classes.title}>*/}
      {/*        {book.author || "N/A"}*/}
      {/*      </Typography>*/}
      {/*    </Box>*/}
      {/*    <br />*/}
      {/*    <Divider />*/}
      {/*    <br />*/}
      {/*    <Box textAlign="center" m={1}>*/}
      {/*      <Typography variant="h6" className={classes.description}>*/}
      {/*        {book.description || "N/A"}*/}
      {/*      </Typography>*/}
      {/*    </Box>*/}
      {/*    <br />*/}
      {/*    <Divider />*/}
      {/*    <br />*/}
      {/*    <Box textAlign="center" m={1}>*/}
      {/*      <Typography variant="h6" className={classes.story}>*/}
      {/*        {book.editorHtml && ReactHtmlParser(book.editorHtml)}*/}
      {/*      </Typography>*/}
      {/*    </Box>*/}
      {/*    <br />*/}
      {/*    <br />*/}
      {/*    <Divider />*/}

      {/*    <button onClick={handleClick}>Delete</button>*/}
      {/*  </List>*/}


    </div>

  );
}

export default BookDetails;

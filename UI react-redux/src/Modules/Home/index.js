import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ReactTypingEffect from 'react-typing-effect';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';


import './styles.css';

//components


import Login from './Login';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function PaperComponentAbout(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}


const useStyles = makeStyles((theme) => ({

  navigationContainerimg: {
    cursor: 'pointer',
  },
  menuItems: {


    color: '#fff',
    padding: "50px 50px"
  },


}));
const Home = () => {
  const classes = useStyles();
  const [openLogin, setOpenLogin] = React.useState(false);



  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const [openAbout, setOpenAbout] = React.useState(false);

  const handleClickOpenAbout = () => {
    setOpenAbout(true);
  };

  const handleCloseAbout = () => {
    setOpenAbout(false);
  };
  return (
    <>
      <div class="container" style={{ height: "100%", width: "100%" }}>
        <div id="slideshow">
          <div class="elemnt"><span></span></div>
          <div class="elemnt1"><span></span></div>
          <div class="elemnt2"><span></span></div>
          <div class="elemnt3"><span></span></div>
          <div class="elemnt4"><span></span></div>

          <div class="introduction">
            <div class="form">
              <Box textAlign="center" m={1} style={{ fontSize: '60px', marginleft: ' 0px', marginTop: "5px" }}>
                <h1>Word Monger</h1>


                <Box textAlign="center" m={1} style={{ fontSize: '35px', marginleft: ' 0px', marginTop: "5px" }}>

                  <ReactTypingEffect
                    text={"Where Stories Come To Life!"}
                    cursorRenderer={cursor => <h1>{cursor}</h1>}
                    displayTextRenderer={(text, i) => {
                      return (
                        <h1>
                          {text.split('').map((char, i) => {
                            const key = `${i}`;
                            return (
                              <span
                                key={key}
                                style={{ color: ' #00bfa5' }}
                              >{char}</span>
                            );
                          })}
                        </h1>
                      );
                    }}
                  />

                </Box>
                <div className={classes.menuItems}>
                  {

                    <div style={{ alignItems: "center" }}>
                      <Button color="inherit" className="Button" variant="outlined" onClick={handleClickOpenAbout} style={{ align: "center", margin: "20px 20px", width: '10%', height: '45px', fontSize: '15px' }}>About</Button>

                      <Button color="inherit" className="Button" variant="outlined" onClick={handleClickOpenLogin} style={{ align: "center", margin: "20px 20px", background: '#bf005f', width: '10%', height: '45px', fontSize: '15px' }}>Login</Button>

                    </div>

                  }
                </div>

              </Box>
            </div>

          </div>


        </div>
      </div>


      <Dialog
        open={openLogin}
        onClose={handleCloseLogin}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"

      >
        <DialogTitle style={{ cursor: 'move', background: '#00bfa5' }} id="draggable-dialog-title">

        </DialogTitle>
        <DialogContent style={{ background: '#00bfa5' }}>
          <DialogContentText>
            <Login />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ background: '#00bfa5' }}>
          <Button autoFocus onClick={handleCloseLogin} color="white">
            Cancel
          </Button>

        </DialogActions>
      </Dialog>




      <Dialog
        open={openAbout}
        onClose={handleCloseAbout}
        PaperComponent={PaperComponentAbout}
        aria-labelledby="draggable-dialog-title"

      >
        <DialogTitle style={{ cursor: 'move', background: '#ff1493' }} id="draggable-dialog-title">

        </DialogTitle>
        <DialogContent style={{ background: '#ff1493' }}>
          <DialogContentText style={{ color: "white" }}>
            <p>Word Monger is a website and app for writers to publish new user-generated stories.
            It aims to create social communities around stories for both amateur
              and established writers.</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ background: '#ff1493' }}>
          <Button autoFocus onClick={handleCloseAbout}>
            Close
          </Button>

        </DialogActions>
      </Dialog>
    </>

  );
}

export default Home;

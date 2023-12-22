import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useState } from "react";
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import ReactTypingEffect from 'react-typing-effect';
import * as useractions from "./../../../Redux/users/actions";
import { loginUser } from "./../../../Redux/users/actions";
import { toast } from "react-toastify";


// import { ToastContainer } from "react-toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('signIn');
  const [data, setData] = useState({});
  const [editorHtml, setEditorHtml] = useState('');
  const [base64Image, setImage] = useState('');
  const getImages = (base64Image) => {
    setImage(base64Image);
  };
  const handleChangeEditor = (editorHtml) => {
    setEditorHtml(editorHtml);
  }

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
  const history = useHistory();
  const {entityForEdit} = useSelector(
    (state) => ({
      entityForEdit: state.Users.entityForEdit,
    }),
    shallowEqual
  );
  const preventDefault = (event) => event.preventDefault();

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("YOU USERNAME AND PASSWORD", data?.username, data?.password);
    if (mode === 'signIn') {
      dispatch(loginUser({...data})).then(res => {
        if (res?.status === 200) {
          localStorage.setItem("isLoggedIn", "Yes");
          localStorage.setItem('userId', res?.data?.idUser);
          history.push('/app/stories');
        } else {
          toast.error('Invalid username or password, please try again');
        }
      });
    } else {
      dispatch(useractions.createUsers({...data})).then(res => {
        if (!res?.data?.message) {
          toast.success('User created successfully!');
          setMode('signIn');
          setData({});
        } else {
          console.log(res)
          toast.error(res?.data?.message);
        }
      });
    }
  }
  const handleChange = (value, name) => {
    setData({...data, [name]: value});
  }

  // Create onSubmit function which you console [console.log(username, password)]
  return (
    <div className="Login">
      <Box textAlign="center" m={1} style={{fontSize: '20px', marginleft: ' 0px', marginTop: "5px"}}>
        <ReactTypingEffect
          text={mode === 'signIn' ? "Sign In!" : "Sign Up!"}
          cursorRenderer={cursor => <h1>{cursor}</h1>}
          displayTextRenderer={(text, i) => {
            return (
              <h1>
                {text.split('').map((char, i) => {
                  const key = `${i}`;
                  return (
                    <span
                      key={key}
                      style={{color: ' white'}}
                    >{char}</span>
                  );
                })}
              </h1>
            );
          }}
        />

      </Box>

      <form onSubmit={onSubmit}>
        <div className="row">
          <>
            <div className="col-lg-12">
              <TextField
                required
                id="username"
                label="Username"
                variant="filled"
                value={data?.username || ''}
                onChange={(e) => handleChange(e?.target?.value, 'username')}
                style={{width: "100%", backgroundColor: "white",}}
              />
            </div>
            <br/>
            <div className="col-lg-12">
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                value={data?.password || ''}
                autoComplete="current-password"
                onChange={(e) => handleChange(e?.target?.value, 'password')}
                variant="filled"
                style={{width: "100%", backgroundColor: "white",}}
              />
            </div>
            <br/>
          </>
          {mode !== 'signIn' ? (
            <div className="col-lg-12">
              <TextField
                required
                id="email"
                label="Email"
                type="email"
                value={data?.email || ''}
                autoComplete="valid-email"
                onChange={(e) => handleChange(e?.target?.value, 'email')}
                variant="filled"
                style={{width: "100%", backgroundColor: "white",}}
              />
            </div>
          ) : null}
        </div>
        <br/>
        {/*<br />*/}
        {/*<div className="upload-file">*/}
        {/*  <ProfileImage*/}
        {/*    required*/}
        {/*    camera={false}*/}
        {/*    clearPreview={!Boolean(base64Image)}*/}
        {/*    className="upload-button"*/}
        {/*    uploadBtnProps={{ variant: "contained", label: "Profile Image" }}*/}
        {/*    defaultImage={addcover}*/}
        {/*    styles={{ borderRadius: '4px', margin: "auto", height: '180px' }}*/}
        {/*    returnImage={getImages}*/}
        {/*  />*/}
        {/*</div>*/}

        {/*<label>About:</label>*/}
        {/*<div className="quill">*/}
        {/*  <ReactQuill*/}

        {/*    theme="snow"*/}
        {/*    required*/}
        {/*    onChange={handleChangeEditor}*/}
        {/*    value={editorHtml}*/}
        {/*    modules={modules}*/}
        {/*    formats={formats}*/}
        {/*    bounds={'.app'}*/}
        {/*    placeholder="Write your story"*/}
        {/*    style={{ backgroundColor: "black", }}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<br />*/}
        <div className="row">
          <div className="col-lg-12">
            <Button
              className="button"
              variant="contained"

              type="submit"
              style={{width: "100%"}}

            >
              {mode === 'signIn' ? 'Start Reading': 'Create Account'}
            </Button>
          </div>

        </div>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            typography: 'body1',
            '& > :not(style) + :not(style)': {
              ml: 1,
            },
          }}
          style={{marginTop: "10px", marginBottom: "10px"}}
          onClick={preventDefault}
        >
          <h8> {mode === 'signIn' ? "Dont have an account?" : 'Go back to'}
            <Button onClick={() => {
              setData({});
              setMode(mode === 'signIn' ? "signUp" : 'signIn');
            }} href="#" underline="hover">
              {'Sign Up'}
            </Button>
          </h8>
        </Box>
      </form>
    </div>


  );
}

export default Login;

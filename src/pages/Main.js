import React, { useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = 384;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  name: {
    marginLeft: 4,
  },
  listContr: {
    flex: 1,
  },
  greeting: {
    height: 48,
    minHeight: 48,
  },
  signOut: {
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
  },
  info: {
    height: 48,
    minHeight: 48,
  },
  chat: {
    display: 'flex',
    paddingBottom: 32,
    flex: 1,
    minHeight: 0,
  },
  messages: {
    flex: 1,
    overflow: 'auto',
  },
  inputContr: {
    display: 'flex',
    height: 48, 
    minHeight: 48,
    padding: '8px 32px',
    justifyContent: 'center',
    aligItems: 'center',
  },
  input: {
    flex: 1,
  },
  inputBtn: {
  },
});

export default () => {
  const classes = useStyles();
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [curMessage, setCurMessage] = useState("");
  const sendMessage = () => {
    messages.push({
      name: 's101',
      message: curMessage,
      date: Date.now(),
    });
    setMessages(messages);
    setCurMessage("");
  };
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  });
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Grid
          className={classes.greeting}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <AccountCircleIcon />
          <span className={classes.name}>s101</span>
        </Grid>
        <Divider />
        <Grid
          className={classes.listContr}
        >
          <List>
            {Array(3).fill(0).map((text, index) => (
              <ListItem button key={`Channel #${index}`}>
                <ListItemIcon><ChatBubbleOutlineIcon /></ListItemIcon>
                <ListItemText primary={`Channel #${index}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Divider />
        <Button
          className={classes.signOut}
          color="secondary"
          size="large"
        >
          登出
        </Button>
      </Drawer>
      <div className={classes.main}>
        <Grid
          className={classes.info}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          Channel #1
        </Grid>
        <Divider />
        <Grid
          className={classes.chat}
          container
          direction="column"
        >
          <div
            className={classes.messages}
          >
            <List>
              {messages.map(({ name, message, date }, index) => (
                <ListItem key={`Channel #${index}`}>
                  <ListItemAvatar>
                    <AccountCircleIcon color="primary" fontSize="large" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={message}
                    secondary={`${name} @ ${(new Date(date)).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
            <div ref={bottomRef} />
          </div>
          <div
            className={classes.inputContr}
          >
            <TextField
              className={classes.input}
              label="在此輸入訊息"
              value={curMessage}
              onChange={({ target: { value } }) => setCurMessage(value)}
              onKeyPress={(ev => {
                if (ev.key === 'Enter') {
                  sendMessage();
                  ev.preventDefault();
                }
              })}
              autoFocus
            />
            <IconButton
              className={classes.inputBtn}
              onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>
          </div>
        </Grid>
      </div>
    </div>
  );
};

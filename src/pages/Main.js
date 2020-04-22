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
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { getUser, getDBOnce, getDBRef, signOut } from '../utils/firebase-helper';

const drawerWidth = 240;

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
  boldText: {
    fontWeight: 'bold',
  },
});

export default () => {
  const usePrevious = (value) => {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
  };
  const name = getUser().email.split('@')[0];
  const uid = getUser().uid;
  const classes = useStyles();
  const bottomRef = useRef(null);
  const [channels, setChannels] = useState({});
  const [channel, setChannel] = useState("");
  const [message, setMessage] = useState("");
  const [counts, setCounts] = useState({});
  const [updated, setUpdated] = useState({});
  const prevCounts = usePrevious(counts);

  const getMessages = () => (
    channel.length !== 0
      ? (channels[channel].messages || {})
      : {}
  );

  const sendMessage = () => {
    getDBRef(`channels/${channel}/messages`).push().set({
      name,
      message,
      date: Date.now(),
    });
    setMessage("");
  };

  const switchChannel = (chan) => {
    setChannel(chan);
    setUpdated({ ...updated, [chan]: false });
  };

  const listenChannel = (chan) => {
    getDBRef(`channels/${chan}`)
      .on('value', function(snapshot) {
      const msgs = snapshot.val();
      if (msgs !== null) {
        setChannels({
          [chan]: msgs,
        });
        setCounts({
          [chan]: Object.keys(msgs.messages || {}).length,
        });
        setChannel(chan);
      }
    });
  };

  const listenAllChannels = () => {
    getDBRef('channels')
      .on('value', function(snapshot) {
      const chans = snapshot.val();
      if (chans !== null) {
        setChannels(chans);
        setCounts(Object.keys(chans).reduce((acc, k) => {
          acc[k] = Object.keys(chans[k].messages || {}).length;
          return acc;
        }, {}));
      }
    });
  };

  useEffect(() => {
    let u = { ...updated };
    Object.keys(channels).forEach((id) => {
      if (typeof prevCounts[id] !== 'undefined' && prevCounts[id] !== counts[id] && id !== channel) {
        u[id] = true;
      }
    });
    setUpdated(u);
  }, [counts]);

  useEffect(() => {
    getDBOnce('channels')
      .then(() => {
        listenAllChannels();
      })
      .catch(() => {
        listenChannel(uid);
      });
  }, [uid]);

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
          <span className={classes.name}>{name}</span>
        </Grid>
        <Divider />
        <Grid
          className={classes.listContr}
        >
          <List>
            {Object.keys(channels).map((id) => (
              <ListItem
                key={id}
                button
                onClick={() => switchChannel(id)}
              >
                <ListItemIcon>
                  {updated[id] && channel !== id ? <ChatBubbleIcon color="secondary"/> : <ChatBubbleOutlineIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span className={channel === id ? classes.boldText : ''}>
                      {`${channels[id].name} (${counts[id]})`}
                    </span>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Divider />
        <Button
          className={classes.signOut}
          color="secondary"
          size="large"
          onClick={() => signOut()}
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
          {channel.length !== 0 ? channels[channel].name : ""}
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
              {Object.keys(getMessages()).map((id) => { 
                const { name: n, message: m, date } = getMessages()[id];
                return (
                  <ListItem key={id}>
                    <ListItemAvatar>
                      <AccountCircleIcon
                        color={name === n ? 'primary' : 'default'}
                        fontSize="large"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={m}
                      secondary={`${n} @ ${(new Date(date)).toLocaleString()}`}
                    />
                  </ListItem>
                );
              })}
            </List>
            <div ref={bottomRef} />
          </div>
          <div
            className={classes.inputContr}
          >
            <TextField
              className={classes.input}
              label="在此輸入訊息"
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={(ev => {
                if (ev.key === 'Enter') {
                  sendMessage();
                  ev.preventDefault();
                }
              })}
              autoFocus
              disabled={channel.length === 0}
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

import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { ctx } from "../store";
import { useHistory } from "react-router-dom";

import { CHANGE_ROOM } from "../store";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    margin: "30px",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  rooms: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid gray"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  inputArea: {
    width: "85%"
  }
}));

const Chat = () => {

  const classes = useStyles();
  let history = useHistory();

  const { state, sendChatAction, dispatch } = useContext(ctx);
  if (!state.name) {
    history.push("/");
  }
  if (!state.room){
    history.push("/rooms")
  }
  console.log(state)
  const activeRoom = state.room
  const rooms = Object.keys(state.rooms);
  console.log(rooms)

  const [msgText, setMsgText] = useState("");
  const changeRoom = e => {
    const { innerText } = e.target;
    dispatch({ type: CHANGE_ROOM, prevRoom: activeRoom, room: innerText });
  };
  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h3" component="h3" gutterBottom>
        Chat
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        {activeRoom}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.rooms}>
          <List component="nav" aria-label="main mailbox folders">
            {rooms.map(room => (
              <ListItem button key={room} onClick={changeRoom}>
                <ListItemText primary={room} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.chatWindow}>
          {state.rooms[activeRoom].map((chatMsg, idx) => (
            <div className={classes.flex} key={idx}>
              <Chip label={chatMsg.name} />
              <Typography variant="body1">{chatMsg.text}</Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.flex}>
        <TextField
          id="outlined-multiline-flexible"
          label="Write your message..."
          multiline
          rowsMax="4"
          value={msgText}
          onChange={e => setMsgText(e.target.value)}
          variant="outlined"
          className={classes.inputArea}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            sendChatAction({
              name: state.name,
              text: msgText,
              room: activeRoom
            });
            setMsgText("");
          }}
        >
          Отправить
        </Button>
      </div>
    </Paper>
  );
};

export default Chat;
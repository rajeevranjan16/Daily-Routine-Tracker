//importing the packages
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Box, Button, CardMedia, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FileBase from "react-file-base64";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { postRecord } from "./../api/api";
import Design from "../ui/Design";
import { useHistory } from "react-router-dom";

//writing style content

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
  showForm: {
    backgroundColor: "grey",
    width: "49%",
    position: "absolute",
    marginLeft: "400px",
    borderRadius: "40px",
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
    border: "1px solid black",
  },
}));

const CreateRecord = () => {
  const [details, setDetails] = useState({
    firstName: "",
    task: "",
    description: "",
    photo: "",
    priority: "",
    is_completed: false,
  });
  const classes = useStyles();
  let history = useHistory();

  const pushPriority = (e) => {
    setDetails({ ...details, priority: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await postRecord(details);
    console.log(response.data);
    history.push("/");
  };
  return (
    <Design>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          <Typography variant="h3" color="textPrimary">
            Assign a task
          </Typography>
        </FormLabel>
        <form
          onSubmit={onSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <Box>
            {/*console.log(details.firstName)*/}
            <TextField
              id="firstName"
              label="Name"
              value={details.firstName}
              onChange={(e) =>
                setDetails({ ...details, firstName: e.target.value })
              }
            />
          </Box>
          <Box>
            {/*console.log(details.task)*/}
            <TextField
              id="task"
              label="Task"
              value={details.task}
              onChange={(e) => setDetails({ ...details, task: e.target.value })}
            />
          </Box>
          <Box>
            {/*console.log(details.description)*/}
            <TextField
              id="description"
              label="Description"
              value={details.description}
              onChange={(e) =>
                setDetails({ ...details, description: e.target.value })
              }
            />
          </Box>
          <Box>
            <CardMedia
              className={classes.media}
              image={details.photo}
              title="Paella dish"
            />
          </Box>
          <Box>
            <FileBase
              id="photo"
              type="file"
              multiple={false}
              onDone={({ base64 }) => setDetails({ ...details, photo: base64 })}
            />
          </Box>
          <Box>
            {/*console.log(details.priority)*/}
            <FormLabel component="legend">
              <Typography variant="h4" color="textPrimary">
                Priority
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-label="priority"
              name="priority1"
              value={details.priority}
              onChange={pushPriority}
            >
              <Box style={{ display: "flex" }}>
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="Medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="High"
                  control={<Radio />}
                  label="High"
                />
              </Box>
            </RadioGroup>
          </Box>
          <Box>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </FormControl>
    </Design>
  );
};

export default CreateRecord;

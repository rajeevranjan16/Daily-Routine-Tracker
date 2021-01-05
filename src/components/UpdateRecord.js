import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Box, Button, CardMedia, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FileBase from "react-file-base64";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { updateRecord } from "./../api/api";
import Design from "../ui/Design";
import { useHistory } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { updateRecordInDatabase } from "./../api/api";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
  showForm: {
    backgroundColor: "grey",
    width: "50%",
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

const UpdateRecord = ({ match }) => {
  const [details, setDetails] = useState([
    {
      firstName: "",
      task: "",
      description: "",
      photo: "",
      priority: "",
      is_completed: false,
    },
  ]);
  const classes = useStyles();
  let history = useHistory();

  const pushPriority = (e) => {
    setDetails({ ...details, priority: e.target.value });
  };
  useEffect(() => {
    async function fetchData() {
      console.log("Id inside update record use effect = ", match.params.id);
      const data = await updateRecord(match.params.id);
      setDetails(data);
    }
    fetchData();
  }, []);
  async function onSubmit(e) {
    e.preventDefault();
    const data = await updateRecordInDatabase(details, match.params.id);
    console.log("Update data is here...", data);
    history.push("/");
  }
  return (
    <Design>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          <Typography variant="h3" color="textPrimary">
            Update the Task
          </Typography>
        </FormLabel>
        <form
          onSubmit={onSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <Box>
            {console.log(details.firstName)}
            <TextField
              id="firstName"
              value={details.firstName ? details.firstName : null}
              onChange={(e) =>
                setDetails({ ...details, firstName: e.target.value })
              }
            />
          </Box>
          <Box>
            {console.log(details.is_completed)}
            <TextField
              id="task"
              value={details.task ? details.task : null}
              onChange={(e) => setDetails({ ...details, task: e.target.value })}
            />
          </Box>
          <Box>
            {/*console.log(details.description)*/}
            <TextField
              id="description"
              value={details.description ? details.description : null}
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
            <FormLabel component="legend">
              <Typography variant="h4" color="textPrimary">
                Priority
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-label="priority"
              name="priority1"
              value={details.priority ? details.priority : ""}
              onChange={pushPriority}
            >
              <Box style={{ display: "flex" }}>
                <FormControlLabel
                  value="Low"
                  control={<Radio />}
                  label="Low"
                  checked={details.priority === "Low"}
                />
                <FormControlLabel
                  value="Medium"
                  control={<Radio />}
                  label="Medium"
                  checked={details.priority === "Medium"}
                />
                <FormControlLabel
                  value="High"
                  control={<Radio />}
                  label="High"
                  checked={details.priority === "High"}
                />
              </Box>
            </RadioGroup>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  label="done?"
                  checked={details.is_completed}
                  onChange={() =>
                    setDetails({ ...details, is_completed: true })
                  }
                  name="checkedB"
                  color="primary"
                />
              }
              label="Check if completed ?"
            />
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

export default UpdateRecord;

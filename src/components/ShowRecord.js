import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { showRecord, deleteRecord } from "./../api/api";
import { CardMedia } from "@material-ui/core";
import Design from "../ui/Design";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: "grey",
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
    border: "1px solid black",
  },
  tableRow: {
    color: "red",
  },
});

const ShowRecord = (props) => {
  const classes = useStyles();
  const history = useHistory();
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
  useEffect(() => {
    async function fetchData() {
      const data = await showRecord();
      setDetails(data);
    }
    fetchData();
  }, []);
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <Design>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Task</TableCell>
              <TableCell align="right">Description&nbsp;</TableCell>
              <TableCell align="right">Priority&nbsp;</TableCell>
              <TableCell align="right">Photo&nbsp;</TableCell>
              <TableCell align="right">Action&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details.map((detail) => {
              return (
                <TableRow key={detail.firstName}>
                  <TableCell
                    style={{
                      color: detail.is_completed ? "red" : "yellow",
                    }}
                    align="right"
                  >
                    {detail.firstName}
                  </TableCell>
                  <TableCell
                    style={{
                      color: detail.is_completed ? "red" : "yellow",
                    }}
                    align="right"
                  >
                    {detail.task}
                  </TableCell>
                  <TableCell
                    style={{
                      color: detail.is_completed ? "red" : "yellow",
                    }}
                    align="right"
                  >
                    {detail.description}
                  </TableCell>
                  <TableCell
                    style={{
                      color: detail.is_completed ? "red" : "yellow",
                    }}
                    align="right"
                  >
                    {detail.priority}
                  </TableCell>
                  <TableCell
                    style={{
                      color: detail.is_completed ? "red" : "yellow",
                    }}
                    align="right"
                  >
                    <CardMedia
                      className={classes.media}
                      title="pic"
                      image={detail.photo}
                    />
                  </TableCell>
                  <TableCell
                    style={{
                      color: detail.is_completed ? "red" : "yellow",
                    }}
                    align="right"
                  >
                    <Button>
                      <Link
                        to={"/edit/" + detail._id}
                        style={{ textDecoration: "none", color: "Highlight" }}
                      >
                        UPDATE
                      </Link>
                    </Button>
                    <Button
                      onClick={() => {
                        deleteRecord(detail._id);
                        history.push("/");
                        refreshPage();
                      }}
                    >
                      <Link
                        to={"/delete/" + detail._id}
                        style={{ textDecoration: "none", color: "Highlight" }}
                      >
                        Delete
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Design>
  );
};

ShowRecord.propTypes = {};

export default ShowRecord;

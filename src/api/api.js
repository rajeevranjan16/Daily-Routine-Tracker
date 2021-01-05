import axios from "axios";

export const postRecord = (record) => {
  const response = axios.post(
    "http://localhost:4000/todo/create/",
    record
  ); /* .then((response) => {
    console.log(response.data);
  }); */
  return response;
};

export const showRecord = async () => {
  const data = await axios.get("http://localhost:4000/todo/show");
  console.log(data.data);
  return data.data;
};

export const updateRecord = async (id) => {
  const data = await axios.get("http://localhost:4000/todo/" + id);
  console.log(data.data);
  return data.data;
};

export const updateRecordInDatabase = async (myData, id) => {
  const data = await axios.post("http://localhost:4000/todo/" + id, myData);
  console.log(data.data);
  return data.data;
};

export const deleteRecord = async (id) => {
  axios.delete("http://localhost:4000/todo/" + id).then((response) => {
    console.log(response);
  });
};

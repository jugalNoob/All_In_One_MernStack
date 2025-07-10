import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [fname, setFName] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const setdata = (e) => {
    setFName(e.target.value);
  };

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  const addUserData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fname", fname);

    try {
      const response = await fetch('http://localhost:9000/register', {
        method: 'POST',
        body: formData
      });

      const res = await response.json();

      console.log(res)

      if (res.status === 401 || !res) {
        console.log("error" , res);
      } else {
     console.log("success")
      }
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  };

  return (
    <div className="container mt-3">
      <h1>Upload Your Image Here</h1>
      <Form className="mt-3" onSubmit={addUserData} encType='"multipart/form-data"'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control type="text" name="fname" onChange={setdata} placeholder="" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Select Your Image</Form.Label>
          <Form.Control type="file" onChange={setimgfile} name="file" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Upload;

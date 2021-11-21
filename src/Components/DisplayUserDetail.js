import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "../cssFiles/Displayuser.css";
import { Button, Accordion, Card, Modal, Form } from "react-bootstrap";

function DisplayUserDetail() {
  const [photos, setphotos] = useState({});
  const [Posts, setPosts] = useState([]);
  const [userposts, setuserposts] = useState();
  const [comments, setcomments] = useState([]);
  const [show, setShow] = useState(false);
  const [postcomments, setpostcomments] = useState([]);
  const [editcomments, seteditcomments] = useState(false);
  const [editcommentsInput, seteditcommentsInput] = useState();
  const [editInputContent, seteditInputContent] = useState();
  const [isloading, setloading] = useState(true);

  let location = useLocation();
  let userName = location.state.username;
  let name = location.state.name;
  let phone = location.state.phone;
  let website = location.state.website;
  let email = location.state.email;
  let city = location.state.address.city;
  let companyname = location.state.company.name;
  let id = location.state.id;

  useEffect(() => {
    const fetchData = async () => {
      const photos = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      );

      const posts = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      const comments = await axios.get(
        `https://jsonplaceholder.typicode.com/comments`
      );
      setphotos(photos.data);
      setPosts(posts.data);
      setcomments(comments.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
      if (Posts.length > 0) {
          setloading(false);
      const filtereduserposts = Posts.filter((obj) => {
        if (obj.userId === id) {
          return obj;
        }
      });
        setuserposts(filtereduserposts);
    }
  }, [Posts]);


  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log(id);
    setShow(true);
    const postComments = comments.filter((obj) => {
      if (obj.postId === id) {
        return obj;
      }
    });
    setpostcomments(postComments);
  };

  const handleEditComments = (editObj) => {
    seteditcomments(true);
    seteditcommentsInput(editObj.id);
    seteditInputContent(editObj.body);

    console.log("edit", editObj.id);
  };

  const handleChangeEdit = (event) => {
    seteditInputContent(event.target.value);
  };

  const handleDeleteComments = (deleteObj) => {
    const newPostcomments = postcomments.filter((obj) => {
      if (deleteObj.id !== obj.id) {
        return obj;
      }
    });
    setpostcomments(newPostcomments);
  };

  const showEditData = () => {
    seteditcomments(false);
    alert(editInputContent);
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-lg-3 ">
          <div className="usernameDiv">
            <p className="username" style={{ textAlign: "center" }}>
              {" "}
              {userName}
            </p>
          </div>
          <div>
            <img
              src={photos.url}
              className="rounded-circle "
              width="100px"
              alt="Cinque Terre"
            />
          </div>
          <div className="bio">
            <pre>{name}</pre>
            <pre>{phone}</pre>
            <pre>{website}</pre>
            <pre>{email}</pre>
            <pre>{city}</pre>
            <pre>{companyname}</pre>
          </div>
        </div>
        <div className="col-lg-9 accordion"></div>
      </div>

      <div className="row cardDiv">
              {isloading ? <div>Loading...</div> :
                  userposts &&
          userposts.map((obj, postIndex) => (
            <div className="col-lg-4  col-xs-12 " key={postIndex}>
              <Card className="mycardcss">
                <Card.Body>
                  <Card.Title>{obj.title}</Card.Title>
                  <Card.Text>{obj.body}</Card.Text>
                  <Button
                    variant="info"
                    className="buttonInfo"
                    onClick={() => handleShow(obj.id)}
                  >
                    comments
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        {postcomments.map((obj) => (
          <div>
            <Modal.Body>
              {editcomments && obj.id === editcommentsInput ? (
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      as="textarea"
                      value={editInputContent}
                      onChange={(event) => handleChangeEdit(event)}
                      placeholder="Edit content"
                    />
                  </Form.Group>
                  <Button onClick={showEditData} variant="success" size="sm">
                    Done
                  </Button>
                </Form>
              ) : (
                <>
                  <div className="usernameModal"> {obj.email}</div>
                  <div className="commentbodyModal"> {obj.body} </div>
                </>
              )}

              <div className="editDelete">
                <Button
                  className="editModalBtn"
                  variant="primary"
                  size="sm"
                  onClick={() => handleEditComments(obj)}
                >
                  edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteComments(obj)}
                >
                  delete
                </Button>
              </div>
            </Modal.Body>
          </div>
        ))}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DisplayUserDetail;

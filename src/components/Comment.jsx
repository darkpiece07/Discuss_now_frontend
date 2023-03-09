
import React, { useState, memo } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import axios from "axios";

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const Comment = ({ comment, postId }) => {

  const [votecnt, setVoteCnt] = useState(comment.upvote)
  const [votedncnt, setVoteDnCnt] = useState(comment.downvote)
  
  const upvoteOnComment = () => {

    axios.post('https://nonbe.vercel.app/post/comment/upvote', { postId, commentID: comment._id })
      .then((res) => {
        setVoteCnt(votecnt + 1);
        
      })
      .catch((e) => {
        console.log(e);
      })
  }
  
  const downvoteOnComment = () => {

    axios.post('https://nonbe.vercel.app/post/comment/downvote', { postId, commentID: comment._id })
      .then((res) => {
        setVoteDnCnt(votedncnt + 1);
        
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <>

      <Container
        fluid
        className="border border-2"
        style={{ width: "100%", padding: "1rem 1rem" }}
      >
        <Row>
          <Col md={1} xs={1} className="d-flex align-items-center">
            <Image
              roundedCircle
              src={comment.userAvatar}
              style={{ width: "2rem", height: "2rem" }}
            />
          </Col>
          <Col md={11} xs={11} className="px-3">
            <Row>
              <Col md={12} xs={12}>
                <h6 style={{ paddingTop: "0.5rem", marginBottom: "0px" }}>
                  {comment.email}
                </h6>
              </Col>
            </Row>
            <Row>
              <span style={{ fontSize: "0.8rem" }}>{timeAgo.format(new Date(comment.date))}</span>
            </Row>
          </Col>
        </Row>
        <Row>
          <p style={{ lineHeight: "1.2rem" }}>
            {comment.answer}
          </p>
        </Row>
        <div className="d-flex">
          <Button
            className="border-1 bg-light d-flex align-items-center mx-2 text-dark "
            style={{ width: "10%", height: "1.5rem", padding: "1px" }}
            onClick={upvoteOnComment}
          >
            <BiUpvote className="text-success" />
            <span style={{ fontSize: "0.8rem" }}>{votecnt} </span>

          </Button>
          <Button
            className="border-1 bg-light d-flex align-items-center mx-2 text-dark "
            style={{ width: "10%", height: "1.5rem", padding: "1px" }}
            onClick={downvoteOnComment}
          >
            <BiDownvote className="text-danger" />
            <span style={{ fontSize: "0.8rem" }}>{votedncnt} </span>
          </Button>
        </div>
      </Container>
    </>
  );
};

export default memo(Comment);;

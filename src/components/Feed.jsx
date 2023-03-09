import React from "react";
import PostCard from "./PostCard";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import NavBar from "./NavBar"

const Land = () => {
  return (
    <>
      <NavBar/>
      <Container
        fluid
        className="m-auto py-4 bg-info"
        style={{ height: "100%" , }}
      >
        <Row>
          <Col md={3} className="my-2 mx-4">
            <ListGroup className="sticky-top">
              <ListGroup.Item className="bg-secondary">
                Sort Feed
              </ListGroup.Item>
              <ListGroup.Item action variant="info">
                Development
              </ListGroup.Item>
              <ListGroup.Item action variant="info">
                Competitive Programming
              </ListGroup.Item>
              <ListGroup.Item action variant="info">
                Class Related Queries
              </ListGroup.Item>
              <ListGroup.Item action variant="info">
                DSA
              </ListGroup.Item>
              <ListGroup.Item action variant="info">
                Others
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <PostCard />
          </Col>
          <Col md={3}>
            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Land;

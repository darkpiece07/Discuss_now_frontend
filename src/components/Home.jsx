import React from "react";
import { Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {
  return (
    <>
      <Container
        fluid
        className="text-center p-4 bg-light"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Container
          className="bg-dark text-light shadow-lg rounded"
          style={{ height: "90vh", padding: "8%" }}
        >
          <h1 style={{ fontSize: "100px" }}>Discuss now</h1>
          <p style={{ fontSize: "20px" }}>
            Placing you in your dream job and supporting your ongoing career
            growth in our community.
          </p>
          <h2>Are you a part of NON Community? </h2>
          <LinkContainer to="/login">
            <Button>Login</Button>
          </LinkContainer>
          <h2>Still Not? Wanna Join? Sign Up Now.</h2>
          <LinkContainer to="/signup">
            <Button>Signup</Button>
          </LinkContainer>
        </Container>
      </Container>
    </>
  );
};

export default Home;

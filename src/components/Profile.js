import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row, Container, Card, Image } from 'react-bootstrap'
import NavBar from './NavBar'

export default function Profile() {
  const params = useParams()

  const [data, setdata] = useState([])

  useEffect(() => {
    axios
      .get(`https://nonbe.vercel.app/posts/${params.id}`)
      .then((res) => {
        setdata(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <>
      <NavBar />
      <h2 style={{textAlign : "center"}}>All Question asked by this user</h2>
      {data.length &&
        data.map((data) => (
          <Container className="" key={data._id}>
            <Card
              style={{ width: '60%', margin: 'auto' }}
              className="border border-2 border-dark my-2"
            >
              <Card.Body>
                <Row>
                  <Col md={2} xs={2} className="d-flex align-items-center">
                    <Image
                      roundedCircle
                      src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                      style={{ width: '4rem', height: '4rem' }}
                    />
                  </Col>
                  <Col md={10} xs={10} className="px-3">
                    <Row>
                      <Col md={8} xs={8}>
                        <h4 style={{ paddingTop: '1rem', marginBottom: '0px' }}>
                          {data._id}
                        </h4>
                      </Col>
                      <Col md={4} xs={4}>
                        <div style={{ paddingTop: '1rem' }}></div>
                      </Col>
                    </Row>
                    
                  </Col>
                </Row>
                <Card.Title>{data.title} </Card.Title>
                <span className="text-danger">{data.category}</span>
                <Card.Text>{data.description}</Card.Text>
              </Card.Body>
              <Card.Img variant="down" src={data.image} alt="No Image" />
            </Card>
          </Container>
        ))}
    </>
  )
}

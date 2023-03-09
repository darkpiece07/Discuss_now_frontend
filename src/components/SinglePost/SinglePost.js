import React, { useEffect, useState } from 'react'
import {
  Card,
  Row,
  Col,
  Image,
  Table,
  Button,
  Form,
  Container,
} from 'react-bootstrap'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { AiOutlineComment } from 'react-icons/ai'
import Comment from '../Comment'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { v4 } from 'uuid'

const SinglePost = ({ val }) => {
  const userAvatar =
    'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'

  const userD = useSelector((state) => state.profile)

  const [answer, setAnswer] = useState('')
  const [commentOfSinglePost, setCommentOfSinglePost] = useState(val.comments)
  const [totalvote, setTotalVote] = useState(0)
  const [totaldnvote, setTotalDnVote] = useState(0)
  

  useEffect(() => {
    commentOfSinglePost.reverse()
    totalVote()
    totalDnVote()
  }, [])

  const addComment = async (e) => {
    e.preventDefault()

    await axios
      .post('https://nonbe.vercel.app/post/comment', {
        answer,
        userId: userD.userId,
        email: userD.user,
        postId: val._id,
        userAvatar,
      })
      .then((res) => {
        console.log(res.data)
        const newC = res.data
        const ID = v4()
        newC._id = ID
        newC.date = new Date()
        setCommentOfSinglePost([newC, ...commentOfSinglePost])
        setAnswer('')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const [showComments, setShowComments] = useState(false)
  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const totalVote = () => {
    var sum = 0
    commentOfSinglePost.forEach((val) => (sum += val.upvote))
    setTotalVote(sum)
  }

  const totalDnVote = () => {
    var sum = 0
    commentOfSinglePost.forEach((val) => (sum += val.downvote))
    setTotalDnVote(sum)
  }

  return (
    <>
      <Card
        style={{ width: '80%' }}
        className="border border-2 border-dark my-2"
      >
        <Card.Body>
          <Row>
            <Col md={2} xs={2} className="d-flex align-items-center">
              <Link to={`/user/${val.userId}`}>
                <Image
                  roundedCircle
                  src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                  style={{ width: '4rem', height: '4rem' }}
                />
              </Link>
            </Col>
            <Col md={10} xs={10} className="px-3">
              <Row>
                <Col md={8} xs={8}>
                  <h4 style={{ paddingTop: '1rem', marginBottom: '0px' }}>
                    {val.userId}
                  </h4>
                </Col>
                <Col md={4} xs={4}>
                  <div style={{ paddingTop: '1rem' }}>
                    <Link to="/">Follow</Link>
                  </div>
                </Col>
              </Row>
              
            </Col>
          </Row>
          <Card.Title>{val.title}</Card.Title>
          <span className="text-danger">{val.category}</span>
          <Card.Text>{val.description}</Card.Text>
        </Card.Body>

        {val.image !== '' && <img variant="down" src={val.image} />}

        <Row className="mx-2">
          <Col md={8} xs={6}>
            <Table
              className="striped border border-dark border-2"
              style={{ width: '60%' }}
            >
              <tbody>
                <tr>
                  <td className="striped border border-dark border-2">
                    <BiUpvote
                      className="text-success"
                      style={{ cursor: 'pointer' }}
                    />
                    {totalvote}
                  </td>
                  <td>
                    <BiDownvote
                      className="text-danger"
                      style={{ cursor: 'pointer' }}
                    />
                    {totaldnvote}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={4} xs={5} style={{ marginLeft: 'auto' }}>
            <Button
              className="text-center bg-light text-dark"
              style={{ paddingTop: '0.5rem' }}
              onClick={toggleComments}
            >
              <AiOutlineComment
                className="text-primary"
                style={{ cursor: 'pointer' }}
              />
              {commentOfSinglePost.length} Discuss
            </Button>
          </Col>
        </Row>

        <Container>
          <Form>
            <Row>
              <Col md={1} xs={1} className="d-flex align-items-center">
                <Image
                  roundedCircle
                  src="https://cdn-icons-png.flaticon.com/512/1381/1381552.png"
                  style={{ width: '2rem', height: '2rem' }}
                />
              </Col>
              <Col
                md={7}
                xs={7}
                className="d-flex align-items-center"
                style={{ marginLeft: '4px', paddingRight: '0px' }}
              >
                <Form.Control
                  type="text"
                  placeholder="Add a comment"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </Col>
              <Col md={3} xs={3} className="d-flex align-items-center">
                <Button
                  className="border-radius-1 mx-0 bg-secondary"
                  style={{ fontSize: 'small', width: '25rem' }}
                  onClick={addComment}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <Container className="d-flex justify-content-end my-1">
          <Button>Sort by upvotes</Button>
        </Container>

        {showComments &&
          commentOfSinglePost.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={val._id} />
          ))}
      </Card>
    </>
  )
}

export default SinglePost

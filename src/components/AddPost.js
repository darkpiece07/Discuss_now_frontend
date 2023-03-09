import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from './NavBar'
import '.././css/AddPost.css'
import Resizer from 'react-image-file-resizer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AddPost() {
  const navigate = useNavigate()

  const options = [
    'Others',
    'Development',
    'Competetive Programming',
    'Class Related Queries',
    'DSA',
    'System Design',
  ]
  const [category, setCategory] = useState(options[0])

  const [avatar, setAvatar] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const user = useSelector((state) => state.profile)
  // console.log(user);

  const addPost = async (e) => {
    e.preventDefault()
    if (title === '' || description === '') {
      return toast.error('title and description are mandatory fields', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    await axios
      .post('https://nonbe.vercel.app/addpost', {
        title,
        description,
        category,
        userId: user.userId,
        image: avatar,
      })
      .then(() => {
        navigate('/')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const uploadAvatar = async (event) => {
    try {
      const file = event.target.files[0]
      const image = await resizeFile(file)
      setAvatar(image)
    } catch (err) {
      console.log(err)
    }
  }

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        'JPEG',
        60,
        0,
        (uri) => {
          resolve(uri)
        },
        'base64',
      )
    })

  const handleCategory = (e) => {
    setCategory(e)
  }

  return (
    <>
      <ToastContainer />
      <NavBar />

      <Container
        fluid
        className="m-auto py-4 bg-info"
        style={{ height: '100%' }}
      >
        <Container
          className="d-flex justify-content-center align-items-center fm_inside rounded"
          style={{ marginTop: '3rem' }}
        >
          <div className="container fluid ">
            <Form>
              <Form.Group
                className="mb-3 fm-inside "
                controlId="formBasicEmail"
              >
                <Form.Label className="fm-title margin">
                  Problem Title *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g - What is the time complexity of lower_bound ?"
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />
                <Form.Text className="text-muted">
                  Be specific and imagine you are asking a question to another
                  person.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 margin" controlId="formBasicEmail">
                <Form.Label className="fm-title margin">
                  What are the details of your problem? *
                </Form.Label>

                <Form.Control
                  as="textarea"
                  placeholder="Problem Description"
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ height: '100px' }}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formGridState"
                    className="category"
                  >
                    <Form.Label className="fm-title margin">
                      Category
                    </Form.Label>
                    <Form.Select
                      defaultValue="Others"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {options.map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <label
                    htmlFor="formFileMultiple"
                    className="form-label fm-title margin"
                  >
                    Upload Images
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    id="formFileMultiple"
                    onChange={uploadAvatar}
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-center align-items-center margin">
                <Button
                  variant="dark"
                  type="submit"
                  className="margin"
                  onClick={addPost}
                >
                  Add Question
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </Container>
    </>
  )
}

import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function hello() {
  return (
    <>
    
    <div>
      
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://media.istockphoto.com/id/1097490360/vector/vector-illustration-of-cute-black-cat.jpg?s=1024x1024&w=is&k=20&c=0HwS_8CgL3CpNedInIUuxjvSb9DA_fYgXQEUKGvyhM8=" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
    </>
  )
}

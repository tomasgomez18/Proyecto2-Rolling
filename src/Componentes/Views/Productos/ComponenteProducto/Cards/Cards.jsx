import React from 'react'
import './Cards.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Col, Container, Form, FormLabel, Row } from 'react-bootstrap';


const imgCard = new URL('/Productos/imgCard.jpg', import.meta.url).href;
const imgCard2 = new URL('/Productos/imgCard2.jpg', import.meta.url).href;


const Cards = () => {
  return (
    <Container>
      <Row  className='rounded-3' style ={{backgroundColor: '#ebebebff', color:'#636262'}}>
        <h1 className='text-center fw-light' >Rolling Motors<hr /></h1>
        <p className='text-center fs-6 fw-bolder'>un poco de nuestra historia</p>
      <Col lg={12} md={6} sm={12} >
        <div className=' d-flex justify-content-center flex-row '>
          <p className=' my-5 mx-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam ipsam reprehenderit dolorem dicta error, perferendis quidem accusantium recusandae quas ducimus sint fugiat dolores cupiditate esse labore dignissimos blanditiis commodi? Quibusdam officia, facere sapiente mollitia modi tempora consequatur eos fuga voluptatibus necessitatibus, quia velit ut laboriosam ea. Nisi quas fugiat, id, ex quia esse facere quasi reiciendis cumque, sequi placeat officia! Neque, libero. Tempora distinctio obcaecati corrupti quae. Laboriosam accusamus iste ea natus dolores eius ipsa esse autem commodi quos nisi tempore praesentium rerum vero dolorum eos iusto distinctio, voluptatum exercitationem architecto eaque voluptates dicta voluptas. Blanditiis ipsa quidem corrupti vero!</p>
          <img src={imgCard} className='card-img'/>
        </div>
      </Col>
      <Col lg={12} md={6} sm={12} >
        <div className=' d-flex justify-content-center flex-row'>
          <img src={imgCard2} className='card-img'/>
          <p className='text-end mx-4  my-5 '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime fuga voluptas incidunt minus eveniet voluptates, ut omnis, nisi cumque excepturi dolorum autem assumenda exercitationem ex quo corporis iusto? Ipsa nam, impedit ad, explicabo officia consectetur magni recusandae iste excepturi, reprehenderit earum? Assumenda vitae sapiente voluptates ab dicta, possimus facere. Expedita veritatis debitis adipisci sequi distinctio voluptatibus illo corrupti ipsam ad nobis, aperiam dolores itaque error ea veniam consequuntur nam ratione harum suscipit. Asperiores alias laboriosam ex qui aut iste quas optio dolore delectus dignissimos debitis beatae vel, maxime eligendi, nostrum tempore omnis sunt. Accusantium corporis, tempore corrupti debitis deleniti unde.</p>
        </div>
      </Col>
      </Row>
      <Row  className='rounded-3 my-3 text-center' style ={{backgroundColor: '#ebebebff', color:'#636262'}}>
        <p className='fs-2 fw-bolder'>Sumate a nuestras rodadas <hr /></p>
<Form>
    <Form.Label>Ingresa tu correo electronico</Form.Label>
    <Form.Control type="email" placeholder="Ingrese su correo electrónico" />
      <Form.Group className="mb-3" controlId="formBasicConsulta">
        <Form.Label>Tu Consulta</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Escribe aquí tu consulta..." />
      </Form.Group>
      <Button variant="primary" type="submit">Quiero sumarme!</Button>
    </Form>
    </Row>
    </Container>
  )
}

export default Cards

import { React, useState } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './login.css';

const Login = ({ onStateChange }) => {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const
    adminEmail = 'jorgesn293@hotmail.com',
    adminPassword = 'pass123';

  const handleLogin = e => {
    e.preventDefault();

    let
      email = document.getElementById('email').value,
      password = document.getElementById('password').value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
      redirect: "follow"
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.hasOwnProperty('message')) {
          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading()
            },
            willClose: () => {
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: result.message,
                showConfirmButton: true
              })
            }
          })
        } else {
          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              localStorage.setItem('is_authenticated', true);
              localStorage.setItem('token', result.access_token);
              localStorage.setItem('user_email', email);
              if (adminEmail === email) localStorage.setItem('is_admin', true);
              onStateChange(true);
              Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                showConfirmButton: false,
                timer: 1500,
              });
              window.location.reload()
            },
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Button className="btn-default me-2" variant="primary" onClick={handleShow}>
        Acceder/Registrarse
      </Button>
      <Modal
        id="login-signup"
        centered
        show={show}
        onHide={handleClose}>
        <Modal.Body>
          <h6 className="mb-0 pb-3 text-center"><span>Acceder </span><span>Registrarse</span></h6>
          <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
          <label htmlFor="reg-log"></label>
          <div className="card-3d-wrap mx-auto">
            <div className="card-3d-wrapper">
              <div className="card-front">
                <i className="btnclose bi bi-x position-relative" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></i>
                <div className="center-wrap">
                  <div className="text-center">
                    <h4 className="mb-4 pb-3">Acceder</h4>
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <input id="email" type="email" name="email" placeholder="Su correo" className="form-style" />
                        <i className="input-icon bi bi-at"></i>
                      </div>
                      <div className="form-group mt-2">
                        <input id="password" type="password" name="password" placeholder="Su contraseña" className="form-style" />
                        <i className="input-icon bi bi-lock"></i>
                      </div>
                      <button type="submit" className="btn mt-4">Ingresar</button>
                    </form>
                    <p className="mb-0 mt-4 text-center"><a href="#0" className="link">¿Olvidaste la contraseña?</a></p>
                  </div>
                </div>
              </div>
              <div className="card-back">
                <i className="btnclose bi bi-x position-relative" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></i>
                <div className="center-wrap">
                  <div className="text-center">
                    <h4 className="mb-4 pb-3">Registrarse</h4>
                    <div className="form-group">
                      <input type="text" name="logname" className="form-style" placeholder="Su nombre completo" id="logname" autoComplete="off" />
                      <i className="input-icon bi bi-person"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input type="email" name="logemail" className="form-style" placeholder="Su correo" id="logemail" autoComplete="off" />
                      <i className="input-icon bi bi-at"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input type="password" name="logpass" className="form-style" placeholder="Su contraseña" id="logpass" autoComplete="off" />
                      <i className="input-icon bi bi-lock"></i>
                    </div>
                    <a href="#" className="btn mt-4">Registrarme</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;

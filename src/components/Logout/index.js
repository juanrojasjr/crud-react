import React from 'react';
import Swal from 'sweetalert2';
import { Outlet, Link } from "react-router-dom";

const Logout = ({ onStateChange }) => {
  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Cerrar sesión',
      text: '¿Seguro que quiere cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('user_email', '');
            localStorage.setItem('token', '');
            localStorage.setItem('is_authenticated', false);
            localStorage.setItem('is_admin', false)
            onStateChange(false);
            window.location.reload()
          },
        });
      }
    });
  };

  return (
    <>
      <Link to="/Cotizaciones" className="btn btn-outline me-3">Cotizaciones</Link>
      
      <button
        className="btn-profile p-0"
        onClick={handleLogout}
      >
        <img src="https://picsum.photos/200" alt="Profile image" className="img-fluid" />
      </button>
    </>
  );
};

export default Logout;

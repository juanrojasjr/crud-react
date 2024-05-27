import { React, useState, useEffect } from "react";
import Swal from 'sweetalert2';

const Cotizaciones = () => {
    const [cotizaciones, setCotizaciones] = useState([]);

    // Variables para obtener datos del LocalStorage
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('is_admin');
    const isAuthenticated = localStorage.getItem('is_authenticated');

    // Función encargada de actualizar el contenido del modal con el del elemento seleccionado
    const modalVerFs = (e) => {
        let verCotizacionModal = document.querySelector('#modal-ver'),
            parent = e.target.closest(".card"),
            title = parent.querySelector(".title").textContent,
            description = parent.querySelector(".description").textContent,
            state = parent.querySelector(".state").textContent,
            status = state,
            response = parent.querySelector(".response").textContent;

        switch (status) {
            case "Creado":
                verCotizacionModal.querySelector('.state').classList.remove("bg-danger");
                verCotizacionModal.querySelector('.state').classList.add("bg-warning");
                verCotizacionModal.querySelector('.response').closest('.mb-3').classList.add('d-none');
                break;
            case "Cerrado":
                verCotizacionModal.querySelector('.state').classList.add("bg-danger");
                verCotizacionModal.querySelector('.state').classList.remove("bg-warning");
                verCotizacionModal.querySelector('.response').textContent = response;
                verCotizacionModal.querySelector('.response').closest('.mb-3').classList.remove('d-none');
                break;

            default:
                break;
        }

        verCotizacionModal.querySelector('.title').textContent = title;
        verCotizacionModal.querySelector('.description').textContent = description;
        verCotizacionModal.querySelector('.state').textContent = state;
    };

    // Función encargada de crear nuevas cotizaciones
    const modalCrearFs = () => {
        let
            getTitle = document.querySelector('#crear-titulo').value,
            getDescription = document.querySelector('#crear-description').value;

        if (getTitle === '' || getDescription === '') {
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
                        text: 'Los campos "Título" y/o "Descripción" no pueden estar vacíos',
                        showConfirmButton: true
                    })
                }
            })
        } else {
            fetch("http://127.0.0.1:8000/cotizaciones", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title": getTitle,
                    "description": getDescription
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
                                Swal.showLoading();
                            },
                            willClose: () => {
                                Swal.fire({
                                    icon: 'success',
                                    title: '¡Creado!',
                                    text: result.message,
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                refreshPage();
                            },
                        });
                    }
                })
                .catch((error) => {
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
                                text: error,
                                showConfirmButton: true
                            })
                        }
                    })
                });
        }
    }

    // Función encargada de actualizar el ID en el modal de aprobación
    const modalApproveFs = (e) => {
        let parent = e.target.closest(".card"),
            getID = parent.getAttribute("data-card");
        document.querySelector('#approve-id').val = getID;
    }

    // Función encargada de actualizar la cotizacion en la base de datos
    const approveFs = () => {
        let
            getValue = document.querySelector('#approve-value').value,
            getResponse = document.querySelector('#approve-response').value,
            getID = document.querySelector('#approve-id').val;
        
        if (getValue === '' || getResponse === '') {
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
                        text: 'Los campos "Valor" y/o "Respuesta" no pueden estar vacíos',
                        showConfirmButton: true
                    })
                }
            })
        } else {
            fetch("http://127.0.0.1:8000/cotizacion/respond", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id": parseInt(getID),
                    "response": getResponse
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
                                Swal.showLoading();
                            },
                            willClose: () => {
                                Swal.fire({
                                    icon: 'success',
                                    title: '¡Creado!',
                                    text: result.message,
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                refreshPage();
                            },
                        });
                    }
                })
                .catch((error) => {
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
                                text: error,
                                showConfirmButton: true
                            })
                        }
                    })
                });
        }
    }

    // Función encargada de ocultar los elementos en el DOM
    const eliminarFs = (e) => {
        let parent = e.target.closest(".card")
        parent.classList.add('d-none')
    }

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    // Hook encargado de consultar y almacenar los items en objeto
    useEffect(() => {
        fetch("http://127.0.0.1:8000/cotizaciones", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((response) => response.json())
            .then((result) => {
                //Ordenar elementos por fecha
                result.cotizaciones.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setCotizaciones(result.cotizaciones)
            })
            .catch((error) => console.error(error));
    }, [])

    return (
        <>
            <section className="breadcrumbs">
                <div className="container">
                    <ol>
                        <li><a href="index.html">Home</a></li>
                        <li>Cotizaciones</li>
                    </ol>
                    <h2>Cotizaciones</h2>
                </div>
            </section>
            <section className="inner-page">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 mb-4 d-flex justify-content-end">
                            <a href="#" className="btn-default" data-bs-toggle="modal" data-bs-target="#modal-crear">Agregar nueva cotización</a>
                        </div>
                        {
                            cotizaciones.length > 0 ?
                                cotizaciones.map(cotizacion => {
                                    let status = 'badge text-bg-secondary p-2';
                                    let btnShow1 = (!isAdmin) ? 'btn btn-success mx-2 d-none' : 'btn btn-success mx-2';
                                    let btnShow2 = (!isAdmin) ? 'btn btn-danger d-none' : 'btn btn-danger';
                                    switch (cotizacion.state) {
                                        case "Creado":
                                            status += " bg-warning";
                                            break;

                                        case "Cerrado":
                                            status += " bg-danger";
                                            break;

                                        default:
                                            status += cotizacion.state;
                                            break;
                                    }
                                    return <>
                                        <div className="col-12 col-md-10 mb-4" key={cotizacion.id}>
                                            <div className="card" data-card={cotizacion.id}>
                                                <div className="card-body">
                                                    <h5 className="card-title fw-bold position-relative py-3 mb-0">
                                                        <span className="title">{cotizacion.title}</span>
                                                        <div className="status position-absolute top-0 end-0 d-flex align-items-center">
                                                            <span className={status}><span className="visually-hidden">New alerts</span></span>
                                                        </div>
                                                    </h5>
                                                    <p className="description card-text">{cotizacion.description}</p>
                                                </div>
                                                <div className="d-flex justify-content-end">
                                                    <a href="#" className="btn btn-primary" id="btnVer" data-bs-toggle="modal" data-bs-target="#modal-ver" onClick={modalVerFs}>Ver</a>
                                                    <a href="#" className={btnShow1} id="btnApprove" data-bs-toggle="modal" data-bs-target="#modal-approve" onClick={modalApproveFs}>Resolver</a>
                                                    <a href="#" className={btnShow2} id="btnDelete" data-bs-toggle="modal" data-bs-target="#modal-eliminar" onClick={eliminarFs}>Eliminar</a>
                                                </div>
                                                <div className="data d-none">
                                                    <p className="state">{cotizacion.state}</p>
                                                    <p className="response">{cotizacion.response}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                })
                            :
                                null
                        }
                    </div>
                </div>
            </section>

            {/* Modales */}
            {/* Modal de aprobación */}
            <div className="modal fade" id="modal-approve" tabIndex="-1" aria-labelledby="modal-approve" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Aprobar cotización</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 d-none">
                                <input id="approve-id" type="number" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="approve-value" className="form-label fw-bold">Valor aproximado</label>
                                <input id="approve-value" type="number" className="form-control" aria-label="Titulo" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="approve-response" className="form-label fw-bold">Descripción del desarrollo a realizar</label>
                                <textarea id="approve-response" rows={5} type="text" className="form-control" aria-label="Descripcion" />
                            </div>
                            <div className="mb-3 text-center">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                                <button type="button" className="btn btn-default" onClick={approveFs}>Aprobar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal de creación */}
            <div className="modal fade" id="modal-crear" tabIndex="-1" aria-labelledby="modal-crear" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Crear cotización</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="crear-titulo" className="form-label fw-bold">Título</label>
                                <input id="crear-titulo" type="text" className="form-control" aria-label="Titulo" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="crear-description" className="form-label fw-bold">Descripción</label>
                                <textarea id="crear-description" rows={5} type="text" className="form-control" aria-label="Descripcion" />
                            </div>
                            <div className="mb-3 text-center">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                                <button type="button" className="btn btn-default" onClick={modalCrearFs}>Crear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal de visualización */}
            <div className="modal fade" id="modal-ver" tabIndex="-1" aria-labelledby="modal-ver" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Ver cotización</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Título</label>
                                <p className="title"></p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Descripción</label>
                                <p className="description"></p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Estado</label>
                                <span className="state d-table badge"></span>
                            </div>
                            <div className="mb-3 d-none">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Respuesta</label>
                                <p className="response"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Cotizaciones;
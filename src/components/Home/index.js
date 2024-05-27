import React from 'react';

import logo from './../../assets/img/hero-img.png';
import about from './../../assets/img/about.jpg';
import features from './../../assets/img/features-3.png';
import logo1 from './../../assets/img/logos/kotlin-logo.png';
import logo2 from './../../assets/img/logos/Java.png';
import logo3 from './../../assets/img/logos/JavaScript.png';
import logo4 from './../../assets/img/logos/angular.png';
import logo5 from './../../assets/img/logos/mysql.png';
import logo6 from './../../assets/img/logos/react.png';

const Home = () => {
    return (
        <>
            <section id="hero" className="hero d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 d-flex flex-column justify-content-center">
                            <h1 data-aos="fade-up">Soluciones de software a la medida</h1>
                            <h2 data-aos="fade-up" data-aos-delay="400">Mejora la productividad de tu empresa con los mejores desarrollos
                                que se adecuan a tu negocio.</h2>
                            <div data-aos="fade-up" data-aos-delay="600">
                                <div className="text-center text-lg-start">
                                    <a href="#about"
                                        className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                                        <span>Registrarse</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
                            <img src={logo} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="about" className="about">
                <div className="container" data-aos="fade-up">
                    <div className="row gx-0">
                        <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                            <div className="content">
                                <h2>Nuestra Historia</h2>
                                <p>
                                    La empresa Bellumware S.A.S. fue fundada en el año 2019, con el objetivo de generar desarrollos de
                                    software modernos y que favorecieran en cuanto a costos y calidad, el crecimiento, productividad y
                                    eficiencia de las empresas, negocios o personas que adquirieran un
                                    servicio.
                                </p>
                                <p>En la actualidad continuamos ofreciendo servicios de desarrollo de alta competitividad en el mercado,
                                    que, gracias a la profesionalidad, tecnologías de vanguardia y facilidad para gestionar desarrollos
                                    somos la mejor opción para tus ideas.</p>
                                {/* <div className="text-center text-lg-start">
                                    <a href="/" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                                        <span>Leer más</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </a>
                                </div> */}
                            </div>
                        </div>

                        <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                            <img src={about} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="services" className="services">
                <div className="container" data-aos="fade-up">
                    <header className="section-header">
                        <h2>Servicios</h2>
                        <p>¿Qué desarrollo necesitas?</p>
                    </header>

                    <div className="row gy-4">
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                            <div className="service-box blue">
                                <i className="ri-discuss-line icon"></i>
                                <h3>Soluciones para empresas, negocios y startups</h3>
                                <p>Afrontamos desafíos técnicos y de diseño, identificamos riesgos y creamos una base sólida para su
                                    producto, garantizando la alineación con el presupuesto, el cronograma y las tecnologías avanzadas.</p>
                                <a href="/" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                            <div className="service-box orange">
                                <i className="ri-discuss-line icon"></i>
                                <h3>Web & Mobile App Development</h3>
                                <p>Nuestros equipos de desarrollo están capacitados para aprovechar la IA junto con lenguajes como
                                    Javascript, Python, Kotlin entre otros, garantizando la entrega a tiempo de aplicaciones escalables que
                                    respaldan la mejora continua.</p>
                                <a href="/" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                            <div className="service-box green">
                                <i className="ri-discuss-line icon"></i>
                                <h3>Diseño de producto</h3>
                                <p>
                                    Las experiencias digitales innovadoras son el núcleo del desarrollo de nuestras aplicaciones, con
                                    información basada en inteligencia artificial que informa los esquemas, los flujos de usuarios y la
                                    creación de prototipos para una experiencia de usuario impactante.
                                </p>
                                <a href="/" className="read-more"><span>Read More</span> <i className="bi bi-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="features">
                <div className="container" data-aos="fade-up">
                    <header className="section-header">
                        <h2>Beneficios</h2>
                        <p>¿Por qué elegir a BELLUMWARE?</p>
                    </header>

                    <div className="row feature-icons mt-0" data-aos="fade-up">
                        <div className="row">
                            <div className="col-xl-4 text-center" data-aos="fade-right" data-aos-delay="100">
                                <img src={features} className="img-fluid p-4" alt="" />
                            </div>

                            <div className="col-xl-8 d-flex content">
                                <div className="row align-self-center gy-4">
                                    <div className="col-md-6 icon-box" data-aos="fade-up">
                                        <i className="ri-line-chart-line"></i>
                                        <div>
                                            <h4>Seguridad</h4>
                                            <p>Contamos con aplicaciones seguras y confiables</p>
                                        </div>
                                    </div>

                                    <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                                        <i className="ri-stack-line"></i>
                                        <div>
                                            <h4>Tecnología</h4>
                                            <p>Las mejores y más actuales tecnologías</p>
                                        </div>
                                    </div>

                                    <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                                        <i className="ri-brush-4-line"></i>
                                        <div>
                                            <h4>Velocidad</h4>
                                            <p>Desarrollamos en tiempos cortos sus aplicaciones</p>
                                        </div>
                                    </div>

                                    <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                                        <i className="ri-magic-line"></i>
                                        <div>
                                            <h4>Calidad</h4>
                                            <p>Contamos con los mejores profesionales para el desarrollo de software</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="tecnology" className="tecnology">
                <div className="container" data-aos="fade-up">
                    <header className="section-header">
                        <h2>Tecnologías</h2>
                        <p>Tecnologías para el desarrollo</p>
                    </header>

                    <div className="gy-4">
                        <div className="owl-carousel logos-carousel">
                            <div className="logos-carousel--item" data-bs-toggle="tooltip" data-bs-title="Kotlin">
                                <img src={logo1} alt="" />
                            </div>
                            <div className="logos-carousel--item" data-bs-toggle="tooltip" data-bs-title="Java">
                                <img src={logo2} alt="" />
                            </div>
                            <div className="logos-carousel--item" data-bs-toggle="tooltip" data-bs-title="Javascript">
                                <img src={logo3} alt="" />
                            </div>
                            <div className="logos-carousel--item" data-bs-toggle="tooltip" data-bs-title="Angular">
                                <img src={logo4} alt="" />
                            </div>
                            <div className="logos-carousel--item" data-bs-toggle="tooltip" data-bs-title="MySql">
                                <img src={logo5} alt="" />
                            </div>
                            <div className="logos-carousel--item" data-bs-toggle="tooltip" data-bs-title="React">
                                <img src={logo6} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
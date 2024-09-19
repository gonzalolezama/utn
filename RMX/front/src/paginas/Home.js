import './../styles/home.css'
const Home = (props) => {
    return (
        <main className="holder">
            <div className="homeimg">
            <img src="img/home/img01.jpg" alt="avion"/>
            </div>
            <div className="columnas">
                <div className="bienvenidos">
                    <h2>Bienvenidos</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus deleniti eum ducimus,
                        dolorem sed amet pariatur provident doloremque nihil nostrum excepturi possimus itaque molestiae ea
                        quis incidunt delectus. Ipsa, dolor.</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque error accusantium, assumenda dolores
                        officia minima quas, cupiditate eos doloremque quo enim voluptatem dicta vero pariatur libero
                        voluptatum illo ipsa ad.

                    </p>
                </div>
                <div className="testimonios">
                    <h2>Testimonios</h2>
                    <div className="testimonio">
                        <span className="cita">Compramos nuestra vivienda familiar en RMX</span>
                        <p className="reseña">Juan Rodriguez</p>

                    </div>
                </div>
            </div>

        </main>
    )
}

export default Home;

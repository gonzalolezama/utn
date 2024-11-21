import { useState, useEffect } from 'react';
import axios from 'axios';
import ComprarItem from '../componentes/comprar/ComprarItem';

const Comprar = (props) => {
    const [loading, setLoading] = useState(false);
    const [comprar, setComprar] = useState([]);

    useEffect(() => {
        const cargarComprar = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/comprar');
            setComprar(response.data);
            setLoading(false);
        };
        cargarComprar();
    }, []);

    return (
        <section className="holder">
            <h2>Comprar</h2>
            {
                loading ? (
                    <p>Cargando...</p>
                ) : (
                    comprar.map(item => <ComprarItem key={item.id}
                        ti={item.titulo} zo={item.zona} ub={item.ubicacion} tip={item.tipo} imagen={item.imagen} pr={item.precio} des={item.descripcion} />)
                )
            }
        </section>

    )
};

export default Comprar;
import './../styles/nav.css';
import { NavLink } from "react-router-dom";

const Nav = (props) => {
    return (
        <nav>
<div>
<ul className='holder'>
    <li><NavLink to="/" className={({ isActive }) => isActive ? "activo" : undefined}>Home</ NavLink></li>
    <li><NavLink to="/novedades" className={({ isActive }) => isActive ? "activo" : undefined}>Novedades</ NavLink></li>
       <li><NavLink to="/comprar" className={({ isActive }) => isActive ? "activo" : undefined}>Comprar</ NavLink></li>
    <li><NavLink to="/vender" className={({ isActive }) => isActive ? "activo" : undefined}>Vender</ NavLink></li>
    <li><NavLink to="/contacto" className={({ isActive }) => isActive ? "activo" : undefined}>Contacto</ NavLink></li>
 </ul>

</div>

        </nav>
    )
}

export default Nav;
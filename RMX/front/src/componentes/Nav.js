import { Link, NavLink } from "react-router-dom"
import './../styles/nav.css'
const Nav = (props) => {
    return (
        <nav>
<div>
<ul>
    <li><NavLink to="/" className={({ isActive }) => isActive ? "activo" : undefined}>Home</ NavLink></li>
    <li><NavLink to="/comprar" className={({ isActive }) => isActive ? "activo" : undefined}>Comprar</ NavLink></li>
    <li><NavLink to="/vender" className={({ isActive }) => isActive ? "activo" : undefined}>Vender</ NavLink></li>
    <li><NavLink to="/contacto" className={({ isActive }) => isActive ? "activo" : undefined}>Contacto</ NavLink></li>
</ul>

</div>

        </nav>
    )
}

export default Nav;
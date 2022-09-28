import {
    NavLink
  } from "react-router-dom";
import Search from "./Search";
import './styles/AppBar.scss';

export default function AppBar() {
    
  return (
    <>
        <header>
        <nav class="nav">
            <h2 class="nav__logo">Stocking</h2>
            <Search/>
        <div class="Periods">
            <ul>
                <NavLink exact to="/daily">
                    <li>Daily</li>
                </NavLink>
                <NavLink exact to="/weekly">
                    <li>Weekly</li>
                </NavLink>
                <NavLink exact to="/monthly">
                    <li>Monthly</li>
                </NavLink>
            </ul>
        </div>
        </nav>
        </header>
    </>
  )
}

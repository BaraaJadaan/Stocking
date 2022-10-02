import Search from "./Search";
import './styles/AppBar.scss';

export default function AppBar() {
    
  return (
    <>
        <header>
        <nav className="nav">
            <h2 className="nav__logo">Stocking</h2>
            <Search/>
        </nav>
        </header>
    </>
  )
}

import Search from "./Search";
import './styles/AppBar.scss';

export default function AppBar() {
    
  return (
    <>
        <header>
        <nav class="nav">
            <h2 class="nav__logo">Stocking</h2>
            <Search/>
        </nav>
        </header>
    </>
  )
}

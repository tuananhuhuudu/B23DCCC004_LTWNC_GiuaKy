import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <aside className="sidebar">
      <h1>Mini Library</h1>

      <nav>
        <Link to="/" className={pathname === '/' ? 'nav-link active' : 'nav-link'}>
          Danh sách sách
        </Link>
        <Link to="/stats" className={pathname === '/stats' ? 'nav-link active' : 'nav-link'}>
          Thống kê
        </Link>
      </nav>

      <button className="theme-button" onClick={toggleTheme}>
        {theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}
      </button>
    </aside>
  );
}

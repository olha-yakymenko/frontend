import '../../styles/3.css'
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/pokemon">Pokemon</Link></li>
        <li><Link href="/favorites">Favorites</Link></li>
      </ul>
    </nav>
  );
}

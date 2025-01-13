import Link from 'next/link';
import '../../css/2.css'
export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/pokemon">Pokemony</Link>
      <Link href="/favorites">Ulubione</Link>
      <Link href="/pokemon/compare">Porownanie</Link>
    </nav>
  );
}

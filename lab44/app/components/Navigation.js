import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/pokemon">Pokemony</Link>
      <Link href="/favorites">Ulubione</Link>
      <Link href="/pokemon/compare">Porownanie</Link>
    </nav>
  );
}

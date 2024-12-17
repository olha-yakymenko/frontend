import Breadcrumbs from '../../components/Breadcrumbs';

export default function PokemonDetailLayout({ children, params }) {
  const { id } = params; 

  return (
    <div>
      <Breadcrumbs id={id} />
      <div>{children}</div>
    </div>
  );
}
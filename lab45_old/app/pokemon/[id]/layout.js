import Breadcrumbs from '../../components/Breadcrumbs';


export default function PokemonDetailLayout({ children, params = {} }) {
    const { id } = params || {}; // Użyj domyślnego obiektu, aby uniknąć błędu destrukturyzacji
  
    if (!id) {
      return <div>Error: Pokemon ID not provided.</div>;
    }
  
    return (
      <div>
        <Breadcrumbs id={id} />
        <div>{children}</div>
      </div>
    );
  }
  
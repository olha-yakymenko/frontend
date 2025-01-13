import PreferencesForm from "../PreferencesForm";
import { StatsProvider } from "../StatsContext";
export default function PokemonLayout({ children }) {
    return (
      <StatsProvider>
      <div>
              {/* <PreferencesForm/> */}
        <div>{children}</div>
      </div>
      </StatsProvider>
    );
  }
  
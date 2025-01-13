// import Navigation from './components/Navigation';
// import { StatsContext } from './StatsContext';

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head />
//       <body>
//         <StatsContext>
//         <Navigation />
//         {children}
//         </StatsContext>
//       </body>
//     </html>
//   );
// }

import Navigation from './components/Navigation';
import PreferencesForm from './PreferencesForm';
import { StatsProvider } from './StatsContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <StatsProvider>
          <Navigation />
          {/* <PreferencesForm /> Dodanie formularza preferencji */}
          {children}
        </StatsProvider>
      </body>
    </html>
  );
}

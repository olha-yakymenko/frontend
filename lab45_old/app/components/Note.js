

// 'use client';

// import { useState, useEffect } from 'react';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';

// export default function Note({ pokemon }) {
//   const [notes, setNotes] = useState([]);
//   const [editingNote, setEditingNote] = useState(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
//       const pokemonNotes = storedNotes.filter(note => note.pokemonId === pokemon.id);
//       setNotes(pokemonNotes);
//     }
//   }, [pokemon.id]);

//   const NoteFormSchema = Yup.object().shape({
//     tacticName: Yup.string().required('Nazwa taktyki jest wymagana').min(5, 'Minimum 5 znaków').max(50, 'Maksymalnie 50 znaków'),
//     strategy: Yup.string().required('Opis strategii jest wymagany').min(10, 'Minimum 10 znaków'),
//     effectiveness: Yup.number().required('Wybierz skuteczność').min(1).max(5),
//     conditions: Yup.string().required('Warunki użycia są wymagane').min(10, 'Minimum 10 znaków'),
//     trainingDate: Yup.date().required('Data treningu jest wymagana'),
//     opponents: Yup.array().of(Yup.string()).min(1, 'Wybierz co najmniej jednego przeciwnika'),
//   });

//   const handleAddNote = (note) => {
//     const newNote = {
//       ...note,
//       id: Date.now().toString(), // Generujemy unikalne id
//       pokemonId: pokemon.id,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     const updatedNotes = [...notes, newNote];
//     setNotes(updatedNotes);
//     if (typeof window !== 'undefined') {
//       const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
//       localStorage.setItem('notes', JSON.stringify([...allNotes, newNote]));
//     }
//   };

//   const handleEditNote = (note) => {
//     const updatedNotes = notes.map((existingNote) =>
//       existingNote.id === note.id ? { ...existingNote, ...note, updatedAt: new Date().toISOString() } : existingNote
//     );
//     setNotes(updatedNotes);
//     if (typeof window !== 'undefined') {
//       const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
//       localStorage.setItem('notes', JSON.stringify(allNotes.map(existingNote => 
//         existingNote.id === note.id ? { ...existingNote, ...note, updatedAt: new Date().toISOString() } : existingNote
//       )));
//     }
//     setEditingNote(null);
//   };

//   const handleDeleteNote = (noteId) => {
//     const updatedNotes = notes.filter(note => note.id !== noteId);
//     setNotes(updatedNotes);
//     if (typeof window !== 'undefined') {
//       const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
//       localStorage.setItem('notes', JSON.stringify(allNotes.filter(note => note.id !== noteId)));
//     }
//   };

//   const opponentTypes = ['fire', 'water', 'grass', 'normal'];

//   return (
//     <div className="pokemon-details">
//       <h1>{pokemon.name}</h1>
//       <img src={pokemon.image} alt={pokemon.name} />

//       <h2>{editingNote ? 'Edytuj notatkę' : 'Dodaj notatkę treningową'}</h2>
//       <Formik
//         initialValues={
//           editingNote || {
//             tacticName: '',
//             strategy: '',
//             effectiveness: '',
//             conditions: '',
//             trainingDate: '',
//             opponents: [],
//           }
//         }
//         validationSchema={NoteFormSchema}
//         onSubmit={(values, { resetForm }) => {
//           if (editingNote) {
//             handleEditNote({ ...values, id: editingNote.id });  // Zapisujemy edytowaną notatkę z właściwym id
//           } else {
//             handleAddNote(values);  // Dodajemy nową notatkę
//           }
//           resetForm();
//           setEditingNote(null);
//         }}
//         enableReinitialize
//       >
//         {({ values, errors, touched }) => (
//           <Form>
//             <div>
//               <label>Nazwa taktyki:</label>
//               <Field name="tacticName" placeholder="Nazwa taktyki" />
//               {errors.tacticName && touched.tacticName && <div>{errors.tacticName}</div>}
//             </div>
//             <div>
//               <label>Opis strategii:</label>
//               <Field name="strategy" as="textarea" placeholder="Opis strategii" />
//               {errors.strategy && touched.strategy && <div>{errors.strategy}</div>}
//             </div>
//             <div>
//               <label>Skuteczność:</label>
//               <Field name="effectiveness" as="select">
//                 <option value="">Wybierz skuteczność</option>
//                 {[1, 2, 3, 4, 5].map(value => (
//                   <option key={value} value={value}>{value}</option>
//                 ))}
//               </Field>
//               {errors.effectiveness && touched.effectiveness && <div>{errors.effectiveness}</div>}
//             </div>
//             <div>
//               <label>Warunki użycia:</label>
//               <Field name="conditions" as="textarea" placeholder="Warunki użycia" />
//               {errors.conditions && touched.conditions && <div>{errors.conditions}</div>}
//             </div>
//             <div>
//               <label>Data treningu:</label>
//               <Field name="trainingDate" type="date" />
//               {errors.trainingDate && touched.trainingDate && <div>{errors.trainingDate}</div>}
//             </div>
//             <div>
//               <label>Przeciwnicy:</label>
//               {opponentTypes.map(type => (
//                 <div key={type}>
//                   <label>
//                     <Field type="checkbox" name="opponents" value={type} checked={values.opponents.includes(type)} />
//                     {type}
//                   </label>
//                 </div>
//               ))}
//               {errors.opponents && touched.opponents && <div>{errors.opponents}</div>}
//             </div>
//             <button type="submit">{editingNote ? 'Zapisz zmiany' : 'Dodaj notatkę'}</button>
//             {editingNote && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditingNote(null);
//                 }}
//               >
//                 Anuluj edycję
//               </button>
//             )}
//           </Form>
//         )}
//       </Formik>

//       <h2>Notatki treningowe</h2>
//       {notes.length > 0 ? (
//         notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(note => (
//           <div key={note.id}>
//             <h3>{note.tacticName}</h3>
//             <p><strong>Strategia:</strong> {note.strategy}</p>
//             <p><strong>Skuteczność:</strong> {note.effectiveness}</p>
//             <p><strong>Warunki:</strong> {note.conditions}</p>
//             <p><strong>Data treningu:</strong> {note.trainingDate}</p>
//             <p><strong>Przeciwnicy:</strong> {note.opponents.join(', ')}</p>
//             <button onClick={() => setEditingNote(note)}>Edytuj</button>
//             <button onClick={() => handleDeleteNote(note.id)}>Usuń</button>
//           </div>
//         ))
//       ) : (
//         <p>Brak notatek.</p>
//       )}
//     </div>
//   );
// }







// 'use client';

// import { useState, useEffect } from 'react';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';

// export default function PokemonDetails({ pokemon }) {
//   const [notes, setNotes] = useState([]);
//   const [editingNote, setEditingNote] = useState(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
//       const pokemonNotes = storedNotes.filter(note => note.pokemonId === pokemon.id);
//       setNotes(pokemonNotes);
//     }
//   }, [pokemon.id]);

//   const NoteFormSchema = Yup.object().shape({
//     tacticName: Yup.string().required('Nazwa taktyki jest wymagana').min(5, 'Minimum 5 znaków').max(50, 'Maksymalnie 50 znaków'),
//     strategy: Yup.string().required('Opis strategii jest wymagany').min(10, 'Minimum 10 znaków'),
//     effectiveness: Yup.number().required('Wybierz skuteczność').min(1).max(5),
//     conditions: Yup.string().required('Warunki użycia są wymagane').min(10, 'Minimum 10 znaków'),
//     trainingDate: Yup.date().required('Data treningu jest wymagana'),
//     opponents: Yup.array().of(Yup.string()).min(1, 'Wybierz co najmniej jednego przeciwnika'),
//   });

//   const handleAddNote = (note) => {
//     const newNote = {
//       ...note,
//       id: Date.now().toString(), // Generujemy unikalne id
//       pokemonId: pokemon.id,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     const updatedNotes = [...notes, newNote];
//     setNotes(updatedNotes);
//     if (typeof window !== 'undefined') {
//       const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
//       localStorage.setItem('notes', JSON.stringify([...allNotes, newNote]));
//     }
//   };

//   const handleEditNote = (note) => {
//     const updatedNotes = notes.map((existingNote) =>
//       existingNote.id === note.id ? { ...existingNote, ...note, updatedAt: new Date().toISOString() } : existingNote
//     );
//     setNotes(updatedNotes);
//     if (typeof window !== 'undefined') {
//       const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
//       localStorage.setItem('notes', JSON.stringify(allNotes.map(existingNote => 
//         existingNote.id === note.id ? { ...existingNote, ...note, updatedAt: new Date().toISOString() } : existingNote
//       )));
//     }
//     setEditingNote(null);
//   };

//   const handleDeleteNote = (noteId) => {
//     const updatedNotes = notes.filter(note => note.id !== noteId);
//     setNotes(updatedNotes);
//     if (typeof window !== 'undefined') {
//       const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
//       localStorage.setItem('notes', JSON.stringify(allNotes.filter(note => note.id !== noteId)));
//     }
//   };

//   const opponentTypes = ['fire', 'water', 'grass', 'normal'];

//   return (
//     <div className="pokemon-details">
//       <h1>{pokemon.name}</h1>
//       <img src={pokemon.image} alt={pokemon.name} />

//       <h2>{editingNote ? 'Edytuj notatkę' : 'Dodaj notatkę treningową'}</h2>
//       <Formik
//         initialValues={
//           editingNote || {
//             tacticName: '',
//             strategy: '',
//             effectiveness: '',
//             conditions: '',
//             trainingDate: '',
//             opponents: [],
//           }
//         }
//         validationSchema={NoteFormSchema}
//         onSubmit={(values, { resetForm }) => {
//           if (editingNote) {
//             handleEditNote({ ...values, id: editingNote.id });  // Zapisujemy edytowaną notatkę z właściwym id
//           } else {
//             handleAddNote(values);  // Dodajemy nową notatkę
//           }
//           resetForm();
//           setEditingNote(null);
//         }}
//         enableReinitialize
//       >
//         {({ values, errors, touched }) => (
//           <Form>
//             <div>
//               <label>Nazwa taktyki:</label>
//               <Field name="tacticName" placeholder="Nazwa taktyki" />
//               {errors.tacticName && touched.tacticName && <div>{errors.tacticName}</div>}
//             </div>
//             <div>
//               <label>Opis strategii:</label>
//               <Field name="strategy" as="textarea" placeholder="Opis strategii" />
//               {errors.strategy && touched.strategy && <div>{errors.strategy}</div>}
//             </div>
//             <div>
//               <label>Skuteczność:</label>
//               <Field name="effectiveness" as="select">
//                 <option value="">Wybierz skuteczność</option>
//                 {[1, 2, 3, 4, 5].map(value => (
//                   <option key={value} value={value}>{value}</option>
//                 ))}
//               </Field>
//               {errors.effectiveness && touched.effectiveness && <div>{errors.effectiveness}</div>}
//             </div>
//             <div>
//               <label>Warunki użycia:</label>
//               <Field name="conditions" as="textarea" placeholder="Warunki użycia" />
//               {errors.conditions && touched.conditions && <div>{errors.conditions}</div>}
//             </div>
//             <div>
//               <label>Data treningu:</label>
//               <Field name="trainingDate" type="date" />
//               {errors.trainingDate && touched.trainingDate && <div>{errors.trainingDate}</div>}
//             </div>
//             <div>
//               <label>Przeciwnicy:</label>
//               {opponentTypes.map(type => (
//                 <div key={type}>
//                   <label>
//                     <Field type="checkbox" name="opponents" value={type} checked={values.opponents.includes(type)} />
//                     {type}
//                   </label>
//                 </div>
//               ))}
//               {errors.opponents && touched.opponents && <div>{errors.opponents}</div>}
//             </div>
//             <button type="submit">{editingNote ? 'Zapisz zmiany' : 'Dodaj notatkę'}</button>
//             {editingNote && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditingNote(null);
//                 }}
//               >
//                 Anuluj edycję
//               </button>
//             )}
//           </Form>
//         )}
//       </Formik>

//       <h2>Notatki treningowe</h2>
//       {notes.length > 0 ? (
//         notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(note => (
//           <div key={note.id}>
//             <h3>{note.tacticName}</h3>
//             <p><strong>Strategia:</strong> {note.strategy}</p>
//             <p><strong>Skuteczność:</strong> {note.effectiveness}</p>
//             <p><strong>Warunki:</strong> {note.conditions}</p>
//             <p><strong>Data treningu:</strong> {note.trainingDate}</p>
//             <p><strong>Przeciwnicy:</strong> {note.opponents.join(', ')}</p>
//             <button onClick={() => setEditingNote(note)}>Edytuj</button>
//             <button onClick={() => handleDeleteNote(note.id)}>Usuń</button>
//           </div>
//         ))
//       ) : (
//         <p>Brak notatek.</p>
//       )}
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid'; // Importujemy funkcję do generowania UUID

export default function PokemonDetails({ pokemon }) {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      const pokemonNotes = storedNotes.filter(note => note.pokemonId === pokemon.id);
      setNotes(pokemonNotes);
    }
  }, [pokemon.id]);

  // Walidacja z Yup
  const NoteFormSchema = Yup.object().shape({
    tacticName: Yup.string().required('Nazwa taktyki jest wymagana').min(5, 'Minimum 5 znaków').max(50, 'Maksymalnie 50 znaków'),
    strategy: Yup.string().required('Opis strategii jest wymagany').min(10, 'Minimum 10 znaków'),
    effectiveness: Yup.number().required('Wybierz skuteczność').min(1).max(5),
    conditions: Yup.string().required('Warunki użycia są wymagane').min(10, 'Minimum 10 znaków'),
    trainingDate: Yup.date().required('Data treningu jest wymagana'),
    opponents: Yup.array().of(Yup.string()).min(1, 'Wybierz co najmniej jednego przeciwnika'),
  });

  // Funkcja do dodawania notatki
  const handleAddNote = (note) => {
    const newNote = {
      ...note,
      id: uuidv4(), // Generowanie unikalnego UUID dla id
      pokemonId: pokemon.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    if (typeof window !== 'undefined') {
      const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      localStorage.setItem('notes', JSON.stringify([...allNotes, newNote]));
    }
  };

  // Funkcja do edytowania notatki
  const handleEditNote = (note) => {
    const updatedNotes = notes.map((existingNote) =>
      existingNote.id === note.id ? { ...existingNote, ...note, updatedAt: new Date().toISOString() } : existingNote
    );
    setNotes(updatedNotes);
    if (typeof window !== 'undefined') {
      const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      localStorage.setItem('notes', JSON.stringify(allNotes.map(existingNote => 
        existingNote.id === note.id ? { ...existingNote, ...note, updatedAt: new Date().toISOString() } : existingNote
      )));
    }
    setEditingNote(null);
  };

  // Funkcja do usuwania notatki
  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    if (typeof window !== 'undefined') {
      const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      localStorage.setItem('notes', JSON.stringify(allNotes.filter(note => note.id !== noteId)));
    }
  };

  const opponentTypes = ['fire', 'water', 'grass', 'normal'];

  return (
    <div className="pokemon-details">
      {/* <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} /> */}

      <h2>{editingNote ? 'Edytuj notatkę' : 'Dodaj notatkę treningową'}</h2>
      <Formik
        initialValues={
          editingNote || {
            tacticName: '',
            strategy: '',
            effectiveness: '',
            conditions: '',
            trainingDate: '',
            opponents: [],
          }
        }
        validationSchema={NoteFormSchema}
        onSubmit={(values, { resetForm }) => {
          if (editingNote) {
            handleEditNote({ ...values, id: editingNote.id });  // Zapisujemy edytowaną notatkę z właściwym id
          } else {
            handleAddNote(values);  // Dodajemy nową notatkę
          }
          resetForm();
          setEditingNote(null);
        }}
        enableReinitialize
      >
        {({ values, errors, touched }) => (
          <Form>
            <div>
              <label>Nazwa taktyki:</label>
              <Field name="tacticName" placeholder="Nazwa taktyki" />
              {errors.tacticName && touched.tacticName && <div>{errors.tacticName}</div>}
            </div>
            <div>
              <label>Opis strategii:</label>
              <Field name="strategy" as="textarea" placeholder="Opis strategii" />
              {errors.strategy && touched.strategy && <div>{errors.strategy}</div>}
            </div>
            <div>
              <label>Skuteczność:</label>
              <Field name="effectiveness" as="select">
                <option value="">Wybierz skuteczność</option>
                {[1, 2, 3, 4, 5].map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </Field>
              {errors.effectiveness && touched.effectiveness && <div>{errors.effectiveness}</div>}
            </div>
            <div>
              <label>Warunki użycia:</label>
              <Field name="conditions" as="textarea" placeholder="Warunki użycia" />
              {errors.conditions && touched.conditions && <div>{errors.conditions}</div>}
            </div>
            <div>
              <label>Data treningu:</label>
              <Field name="trainingDate" type="date" />
              {errors.trainingDate && touched.trainingDate && <div>{errors.trainingDate}</div>}
            </div>
            <div>
              <label>Przeciwnicy:</label>
              {opponentTypes.map(type => (
                <div key={type}>
                  <label>
                    <Field type="checkbox" name="opponents" value={type} checked={values.opponents.includes(type)} />
                    {type}
                  </label>
                </div>
              ))}
              {errors.opponents && touched.opponents && <div>{errors.opponents}</div>}
            </div>
            <button type="submit">{editingNote ? 'Zapisz zmiany' : 'Dodaj notatkę'}</button>
            {editingNote && (
              <button
                type="button"
                onClick={() => {
                  setEditingNote(null);
                }}
              >
                Anuluj edycję
              </button>
            )}
          </Form>
        )}
      </Formik>

      <h2>Notatki treningowe</h2>
      {notes.length > 0 ? (
        notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(note => (
          <div key={note.id}>
            <h3>{note.tacticName}</h3>
            <p><strong>Strategia:</strong> {note.strategy}</p>
            <p><strong>Skuteczność:</strong> {note.effectiveness}</p>
            <p><strong>Warunki:</strong> {note.conditions}</p>
            <p><strong>Data treningu:</strong> {note.trainingDate}</p>
            <p><strong>Przeciwnicy:</strong> {note.opponents.join(', ')}</p>
            <button onClick={() => setEditingNote(note)}>Edytuj</button>
            <button onClick={() => handleDeleteNote(note.id)}>Usuń</button>
          </div>
        ))
      ) : (
        <p>Brak notatek.</p>
      )}
    </div>
  );
}

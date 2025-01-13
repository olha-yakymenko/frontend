// 'use client'
// import React, { useState } from 'react';
// import { useStats } from './StatsContext'; // Korzystamy z kontekstu

// const PreferencesForm = () => {
//   const { numberFormat, sortBy, viewType, updatePreferences } = useStats(); // Hook do kontekstu
//   const [localNumberFormat, setLocalNumberFormat] = useState(numberFormat);
//   const [localSortBy, setLocalSortBy] = useState(sortBy);
//   const [localViewType, setLocalViewType] = useState(viewType);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updatePreferences({
//       numberFormat: localNumberFormat,
//       sortBy: localSortBy,
//       viewType: localViewType,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Number Format:</label>
//         <select
//           value={localNumberFormat}
//           onChange={(e) => setLocalNumberFormat(e.target.value)}
//         >
//           <option value="percentage">Percentage</option>
//           <option value="decimal">Decimal</option>
//           <option value="rounded">Rounded</option>
//         </select>
//       </div>

//       <div>
//         <label>Sort By:</label>
//         <select
//           value={localSortBy}
//           onChange={(e) => setLocalSortBy(e.target.value)}
//         >
//           <option value="date">Date</option>
//           <option value="name">Name</option>
//         </select>
//       </div>

//       <div>
//         <label>View Type:</label>
//         <select
//           value={localViewType}
//           onChange={(e) => setLocalViewType(e.target.value)}
//         >
//           <option value="table">Table</option>
//           <option value="cards">Cards</option>
//         </select>
//       </div>

//       <button type="submit">Save Preferences</button>
//     </form>
//   );
// };

// export default PreferencesForm;



// 'use client';
// import React, { useContext } from 'react';
// import { StatsContext } from './StatsContext';

// const PreferencesForm = () => {
//   const { numberFormat, sortBy, viewType, updatePreferences } = useContext(StatsContext);

//   const handleUpdate = (e) => {
//     const { name, value } = e.target;
//     updatePreferences({ [name]: value });
//   };

//   return (
//     <div>
//       <h2>Preferences</h2>
//       <form>
//         <label>
//           Number Format:
//           <select name="numberFormat" value={numberFormat} onChange={handleUpdate}>
//             <option value="percentage">Percentage</option>
//             <option value="decimal">Decimal</option>
//             <option value="rounded">Rounded</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           Sort By:
//           <select name="sortBy" value={sortBy} onChange={handleUpdate}>
//             <option value="date">Date</option>
//             <option value="name">Name</option>
//             <option value="value">Value</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           View Type:
//           <select name="viewType" value={viewType} onChange={handleUpdate}>
//             <option value="table">Table</option>
//             <option value="cards">Cards</option>
//           </select>
//         </label>
//       </form>
//     </div>
//   );
// };

// export default PreferencesForm;



'use client';
import React, { useContext } from 'react';
import { StatsContext } from './StatsContext';

const PreferencesForm = () => {
  const { numberFormat, sortBy, viewType, updatePreferences } = useContext(StatsContext);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    updatePreferences({ [name]: value });
  };

  return (
    <div>
      <h2>Preferences</h2>
      <form>
        <label>
          Number Format:
          <select name="numberFormat" value={numberFormat} onChange={handleUpdate}>
            <option value="percentage">Percentage</option>
            <option value="decimal">Decimal</option>
            <option value="rounded">Rounded</option>
          </select>
        </label>
        <br />
        <label>
          Sort By:
          <select name="sortBy" value={sortBy} onChange={handleUpdate}>
            <option value="id">id</option>
            <option value="name">Name</option>
            <option value="attack">Attack</option>
          </select>
        </label>
        <br />
        <label>
          View Type:
          <select name="viewType" value={viewType} onChange={handleUpdate}>
            <option value="table">Table</option>
            <option value="cards">Cards</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default PreferencesForm;

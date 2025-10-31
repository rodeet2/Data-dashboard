import { useEffect, useState } from "react"; 

function App() {
const [pets, setPets] = useState([]);
const [token, setToken] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const [loading, setLoading] = useState(false);
const [attributes, setAttributes] = useState(null);
const [searchURL, setsearchURL] = useState("https://api.petfinder.com/v2/animals?sort=recent&limit=14")

async function getRecentPets() {
    setLoading(true);

    const CLIENT_ID = 'We8Wqz2DTs3kxfX3JWXVIlpnpiyMh4aIHgiuGK1blASidqBshT';
    const CLIENT_SECRET = 'fCTk6MaKXMugMEUHNdpY8tIobC4nlzuBRUlDLZFo';

    const tokenResponse = await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const petsResponse = await fetch(searchURL, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    const petsData = await petsResponse.json();
setPets(petsData.animals);
console.log(petsData);
  setLoading(false);  
}

useEffect(() => { 
  getRecentPets();
}, [searchURL]); 

useEffect(() => {
  const result = calculateAttributes(pets);
  setAttributes(result);
}, [pets]);


function calculateAttributes(pets) {
  if (!pets || pets.length === 0) return null;

  const typeCount = pets.reduce((acc, pet) => {
    acc[pet.type] = (acc[pet.type] || 0) + 1;
    return acc;
  }, {});

  const mostCommonType = Object.keys(typeCount).reduce((a, b) =>
    typeCount[a] > typeCount[b] ? a : b
  );

  const mostRecent = pets.reduce((latest, pet) => {
    const date = new Date(pet.published_at);
    return !latest || date > latest ? date : latest;
  }, null);

  const totalText = pets.length < 15 ? pets.length.toString() : "15+";

  return {
    mostCommonType,
    mostRecent: mostRecent ? mostRecent.toLocaleString() : "N/A",
    totalText,
  };
}

  return (
    <>
    <div className="main">

    <div className="sectionLeftSide">

      <h1>Pet Dashboard</h1>
      <span className="item">Dashboard</span>
      <span className="item">Search</span>
      <span className="item">About</span>

    </div>

    <div className="sectionRightSide">

      <div className="sectionAttributes">

<div className="attibutes">
  <span>Most Recent:</span>
  <h2>{attributes?.mostRecent || "N/A"}</h2>
</div>

<div className="attibutes">
    <span>Most Common type:</span>
  <h2>{attributes?.mostCommonType || "N/A"}</h2>
</div>

<div className="attibutes">
      <span>Total results:</span>
  <h2>{attributes?.totalText + '+' || "N/A"}</h2>
</div>

      </div>

      <div className="sectionMainList">
        <div className="searchOptions">
<input
  type="text"
  placeholder="Find by name"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>  

  <div className="filterbyage">
  <label>
    <input
      type="radio"
      name="age"
      value="baby"
      onClick={() =>
        setsearchURL("https://api.petfinder.com/v2/animals?sort=recent&limit=14&age=baby")
      }
    />{" "}
    Baby
  </label>

  <label>
    <input
      type="radio"
      name="age"
      value="young"
      onClick={() =>
        setsearchURL("https://api.petfinder.com/v2/animals?sort=recent&limit=14&age=young")
      }
    />{" "}
    Young
  </label>

  <label>
    <input
      type="radio"
      name="age"
      value="adult"
      onClick={() =>
        setsearchURL("https://api.petfinder.com/v2/animals?sort=recent&limit=14&age=adult")
      }
    />{" "}
    Adult
  </label>

  <label>
    <input
      type="radio"
      name="age"
      value="old"
      onClick={() =>
        setsearchURL("https://api.petfinder.com/v2/animals?sort=recent&limit=14&age=old")
      }
    />{" "}
    Old
  </label>
</div>


        </div>

{loading ? (
  <p>Updating pets...</p>
) : pets.length > 0 ? (
  <table style={{ width: '100%', marginLeft: '20px' }}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Age</th>
        <th>Size</th>
        <th>Status</th>
        <th>Learn More</th>
      </tr>
    </thead>
    <tbody>
      {pets
      .filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(pet => (
        <tr key={pet.id}>
          <td>{pet.name}</td>
          <td>{pet.type}</td>
          <td>{pet.age}</td>
          <td>{pet.size}</td>
          <td>{pet.status}</td>
          <td>
            <button onClick={() => window.open(pet.url, '_blank')}>
              Learn More
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p>No pets found.</p>
)}

  </div>
      
    </div>

    </div>  
    </>
  )
}

export default App

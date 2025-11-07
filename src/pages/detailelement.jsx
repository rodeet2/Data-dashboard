import { useLocation } from "react-router-dom";


export default function DetailElement() {
  const location = useLocation();
  const { pet } = location.state || {}; 

  if (!pet) return <p>No pet data passed!</p>;

const petImageUrl = pet.primary_photo_cropped.small;

  return (
    <div className="detailedpet">
      <p>Name: {pet.name}</p>
      <img src={petImageUrl} alt={pet.name} width={200}/>
      <p>Type: {pet.type}</p>
      <p>Age: {pet.age}</p>
      <p>Size: {pet.size}</p>
      <p>Description: {pet.description}</p>
      <p>Status: {pet.status}</p>

      <button onClick={() => window.open(pet.url, '_blank')}>
        View Full Profile
      </button>
    </div>
  );
}

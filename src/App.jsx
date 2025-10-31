
import getRecentBooks from "./getrecent.js";
import { useEffect } from "react";

API_KEY= We8Wqz2DTs3kxfX3JWXVIlpnpiyMh4aIHgiuGK1blASidqBshT;
APIKEY_secret = fCTk6MaKXMugMEUHNdpY8tIobC4nlzuBRUlDLZFo;

function App() {

  return (
    <>
    <div className="main">

    <div className="sectionLeftSide">

      <h1>Books Dashboard</h1>
      <span className="item">Dashboard</span>
      <span className="item">Search</span>
      <span className="item">About</span>

    </div>

    <div className="sectionRightSide">

      <div className="sectionAttributes">

       <div className="attibutes">
       
       </div>

        <div className="attibutes">
       
       </div>

       <div className="attibutes">
       
       </div>

      </div>

      <div className="sectionMainList">
        <div className="searchOptions">
        <input type="text" id="myTextInput" name="myTextInput" placeholder="Enter your text here"></input>
        <input type="range" min="1" max="100" id="myRange"></input>
        <button>Search</button>
        </div>

      </div>

    </div>

    </div>  
    </>
  )
}

export default App

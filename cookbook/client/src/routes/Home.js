import React from 'react';
import homeStyles from "../css/home.module.css";

function Home() {
 
  return (
    <div className={homeStyles.container}>
      <div className={homeStyles.text}>Vymazlená kuchařka</div>
    </div>
  );
}

export default Home;
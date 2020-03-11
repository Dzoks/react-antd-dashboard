import React from 'react';
import { Link } from 'react-router-dom';

function Home(props){
    return <div className="page-container">Hello there <Link to="/parameterized/5">Go to Parameterized</Link></div>
}

export default Home;
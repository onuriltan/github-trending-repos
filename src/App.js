import React from 'react';
import NavBar from './components/nav-bar/NavBar'
import TrendingReposList from './components/trending-repos-list/container/TrendingReposListContainer';

const App = () =>{
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <TrendingReposList/>
      </div>
    </div>
  );
}

export default App;

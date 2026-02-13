import './App.css'

// components
import Header from './components/Header';
import Details from './components/Details';
import Filters from './components/Filters';
import Results from './components/Results';


function App() {

    return (
      <>
        <Header />
        <Filters />
        <Results />
        <Details />
      </>
    );
}

export default App

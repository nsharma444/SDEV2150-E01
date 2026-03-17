import { useState } from 'react';
import { useResources } from './hooks/useResources';
import { useSelectedResource } from './hooks/useSelectedResource';

import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';
import { useEffect } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  // const [selectedResource, setSelectedResource] = useState(null);
  const [selectedResource, setSelectedResource] = useSelectedResource();
  const [virtualOnly, setVirtualOnly] = useState(false);

  const { resources, isLoading, error, refetch } = useResources();

  // Student exercise: log to the console whenever the selected resource changes
  useEffect(() => {
    console.log('Selected resource has changed', selectedResource);
  }, [selectedResource]);

  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>

    </PageLayout>
  );
}

export default App;

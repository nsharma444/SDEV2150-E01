import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:3000'

/* we'll make an overall custom hook using both useState and useEffect
   to fetch data, control loading state, display errors, and basically everything
   responsive we want to happen during & after grabbing API data
*/
export function useResources() {

  const [resources, setResources] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);

  async function fetchResources() {
    console.log('starting API fetch!')
    // whenever I initiate a fetch, I'm now waiting for results, so I'll default my loading/error states:
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/resources`);

      if (!res.ok) { // res.ok is a boolean property that evals whether response status code was 200/20*/30*
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setResources(data);

    } catch (err) {
      if (err.name) {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  /* useEffect is for 'side-effecting': anytime we want to interact with something outside of 
    pure React rendering, e.g. fetching data from an API (since that's external to React) *but*
    still want our UI to respond automatically.

    Pattern:
      useEffect(callback, [dependencies])

    1. Dependency array is []:            effect will fire only on initial load.
    2. Dependency array is [values, ...]: effect will fire anytime those values change.
    3. No dependency array supplied (no 2nd argument): effect fires anytime component re-renders.
  */
  useEffect(
    // 1. callback: will be fetching our API data
    () => {
      fetchResources();
    },
    // 2. dependencies: [], i.e. when page loads
    []
  );

  function refetch() {

  }

  // from this hook, we return:
  return { resources, isLoading, error, refetch }
}
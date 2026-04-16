import { getResources, getResourceById } from '../api/resources';

export async function ResourceDirectoryLoader() {
  const resources = await getResources();
  return { resources };
  /* The point of a loader function is to grab some data,
     and return an object with all of that data (might be multiple things)
     showing up in named properties.

     In the component, we'll use this like:
       import { useLoaderData } from 'react-router';

       const data = useLoaderData(); // grabs whatever data is at that route automatically
       console.log(data.resources)
  */
}

export async function AdminLoader({ params }) {
  // params is a built-in keyword for URL params that react-router loader functions can use

  // 1. we still need the entire list of resources
  const resources = await getResources();

  /* 2. we also want a by-ID fetch/loader:
        - make sure we're not loading sta`le data
        - replicate norms in REST API design where list results usually only have
          summary info, and you have to query specific items for full details
  */

  if (!params.resourceId) { // here's us consuming our route info via params named argument
    // first, handle the case where we're at '/admin/', looking to creat a new resource
    return {
      resources,
      resourceId: null,
      selectedResource: null,
    }
  }

  // otherwise, try/assume that we're editing an existing one
  const selectedResource = await getResourceById(params.resourceId);

  return {
    resources,
    resourceId: params.resourceId,
    selectedResource,
  }
}
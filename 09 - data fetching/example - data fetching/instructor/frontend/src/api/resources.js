const API_BASE_URL = 'http://localhost:3000';

export async function getResources() {
  const res = await fetch(`${API_BASE_URL}/resources`);

  if (!res.ok) {
    throw new Error(`Could not load resources: ${res.status}`);
  }

  return res.json();
}

export async function getResourceById(resourceId) {
  const res = await fetch(`${API_BASE_URL}/resources/${resourceId}`);

  if (!res.ok) {
    throw new Error(`Could not load resource: ${res.status}`);
  }

  return res.json();
}

export async function saveResource(resourceId, payload) {

  const isEditing = Boolean(resourceId);

  const method = isEditing ? 'PUT' : 'POST'

  let url = `${API_BASE_URL}/resources`
  if (resourceId) {
    url += `/${resourceId}`  
  }

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  // console.log(res);
  if (!res.ok) {
    throw new Error(`Could not ${isEditing ? 'update' : 'create'} resource`);
  }

  // I don't have to await what I'm directly returning from an async function
  return res.json();
}


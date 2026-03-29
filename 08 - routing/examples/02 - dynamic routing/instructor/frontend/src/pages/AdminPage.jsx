// react hooks
import { useEffect, useState } from 'react';

// react-router hooks
import { useNavigate, useParams } from 'react-router';

// our custom hooks
import { useResources } from '../hooks/useResources';

// our components
import Card from '../components/ui/Card';


const EXAMPLE_RESOURCE = {
  title: 'Study Group',
  category: 'Wellness',
  summary: 'Studying in a group (of people).',
  location: 'NAIT Campus',
  hours: 'Mon-Fri 08:00-13:00',
  contact: 'niceperson@nait.ca',
  virtual: false,
  openNow: false,
}


export default function AdminPage() {

  const { resourceId } = useParams();  // consume dynamic props from URL/route
  const navigate = useNavigate()       // lets us programmatically 'push' the user to some page

  // console.log(resourceId)

  const { resources, isLoading, error, refetch } = useResources();

  {/* 
    You'll notice that the onChange -> setter syntax is a little different
    in the bound inputs in the JSX.

    First of all, we're using an object that holds all our fields instead of
    multiple state variables (yay).

    Second, remember — state variables are immutable, meaning we can't just change
    e.g. one little property in an object; we need to completely reconstruct it
    and somehow supply our new values/modifications while doing that.

    So we use the spread operator (which works for any sequenced/serialised data type,
    not just arrays) to pull all the properties/values of the existing object,
    and then specifically overwrite (by supplying a more recent value) one field/property.

       const newData = {...oldData, field: newValue}

    where ...oldData already includes field: oldValue; we're just overwriting it with recency.
  */}


    {/* Example implementation of some form inputs. 

        Note (refresher on spread operator) the onChange handler:
          onChange={
            (e) => setFormData(
              { ...formData, title: e.target.value }
            )
          }

        Similar to spreading an array:
          const arr1 = [1, 2, 3]
          const arr2 = [4, 5, 6]
          const both = [...arr1, ...arr2]

        The spread operator is used to flatten any sequenceable type
        into a series that can be inserted into another sequence.

        We can do this with objects, not just arrays, and we must fully
        reconstruct the value/object/etc. when passing to state setter,
        because the state variable is *immutable* (need to be completely overwritten).

        So here, we're saying, "get all of the properties, then overwrite title specifically"
        (most recent value is what is used).  

    */}

  const [formData, setFormData] = useState(EXAMPLE_RESOURCE)

  async function createResource(e) {
    e.preventDefault();
    
    const res = await fetch('http://localhost:3000/resources',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok) {
      throw new Error('Error creating resource.'); // kept simple for time's sake
    }

    // finally (since we've posted a result), refetch using the function we supplied from
    // our useResources() hook -> refetches data incl. newly created -> re-renders
    refetch();
  }

  const resetForm = () => {
    setFormData({
        title: '',
        category: '',
        summary: '',
        location: '',
        hours: '',
        contact: '',
        virtual: false,
        openNow: false,
    })
  }

  // set up an effect to prepopulate the form data with whatever object corresponds
  // to the ID at that URL route (e.g. /admin/tutoring)
  useEffect(

    () => {

      if (!resourceId) { // basically, if we're at admin/ (with no :resourceId)
        // notice how this overwrites the initial state - proof that effects happen after pure rendering
        resetForm();
        return;
      }

      const resource = resources.find((item) => item.id === resourceId);
      // if there's no matching resource for the ID, leave the form blank
      if (!resource) return;

      setFormData({
        title: resource.title,
        category: resource.category,
        summary: resource.summary,
        location: resource.location,
        hours: resource.hours,
        contact: resource.contact,
        virtual: resource.virtual,
        openNow: resource.openNow,
      });

    },

    [resources, resourceId]  // when this was empty, we weren't getting data
                             // which tells us that react-router state isn't present
                             // right when the component mounts; we need to watch params.
  )

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Resource Form">
          <div className="card-body">
            <form onSubmit={createResource} id="frm-add-resource" className="space-y-4">

              <div className="space-y-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  {['Academic', 'Wellness', 'Financial', 'Tech'].map(
                    (label) => { 
                      return <option key={label} value={label}>{label}</option>
                    }
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                  Summary
                </label>
                <input
                  id="summary"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                  Hours
                </label>
                <input
                  id="hours"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource hours (e.g. Mon-Fri 08:00-13:00)"
                  value={formData.hours}
                  onChange={(e) => setFormData({...formData, hours: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  id="contact"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource contact (e.g. email@nait.ca)"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                />
              </div>

              <div className="flex gap-6">
                <div className="space-y-1">
                  <label htmlFor="virtual" className="block text-sm font-medium text-gray-700">
                    Virtual (online-only)
                  </label>
                  <input
                    id="virtual"
                    type="checkbox"
                    className="rounded border border-gray-300 text-sm"
                    checked={formData.virtual}
                    onChange={(e) => setFormData({...formData, virtual: e.target.checked})}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="open-now" className="block text-sm font-medium text-gray-700">
                    Open Now
                  </label>
                  <input
                    id="open-now"
                    type="checkbox"
                    className="rounded border border-gray-300 text-sm"
                    checked={formData.openNow}
                    onChange={(e) => setFormData({...formData, openNow: e.target.checked})}
                  />
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="flex gap-2">
                <button
                  type="reset"
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  onClick={() => resetForm()}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </Card>
      </section>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            {isLoading && <p>Loading resources...</p>}

            {error && (
              <div className="alert alert-error">
                <span>{error.message}</span>
                <button className="btn btn-sm" onClick={refetch}>Try again</button>
              </div>
            )}
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.id} className="rounded border border-gray-200 p-3">
                  <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-base-content/70">{resource.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
}



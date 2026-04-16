import { saveResource } from '../api/resources';

export async function AdminAction({ request, params }) {
    // request & params are again named keywords;
    // the request has all of the request data (surprise!),
    // and the params has the URL params just like before.

    const formData = await request.formData() // built-in via react-router

    // there are cleaner ways to do this, but I'll just leave it explicit
    const payload = {
      title: formData.get('title'),
      category: formData.get('category'),
      summary: formData.get('summary'),
      location: formData.get('location'),
      hours: formData.get('hours'),
      contact: formData.get('contact'),
      virtual: formData.get('virtual') === 'on', // checkbox is posted as 'on', not t/f
      openNow: formData.get('openNow') === 'on',
    };

    const savedResource = await saveResource(params.resourceId, payload)
    return redirect(`/admin/${savedResource.id}`);
}
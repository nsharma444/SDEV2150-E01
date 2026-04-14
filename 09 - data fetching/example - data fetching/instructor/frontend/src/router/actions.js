import { saveResource } from '../api/resources';

export async function AdminAction({ request, params }) {
    // request & params are again named keywords;
    // the request has all of the request data (surprise!),
    // and the params has the URL params just like before.

    const formData = await request.formData() // built-in via react-router

    const payload = {
        // skeleton for now, I'm going to digest from form data obj to build payload 
    }

    const savedResource = await saveResource(params.resourceId, payload)
    return redirect(`/admin/${savedResource.id}`);
}
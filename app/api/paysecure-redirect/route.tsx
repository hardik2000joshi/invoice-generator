export async function POST (request: Request) {

    try {
        const body = await request.json();
        const direct_post_url = body.direct_post_url?.toString();

        if (!direct_post_url) {
              return new Response('Missing direct_post_url', { status: 400 });
        }

        return new Response(null, {
            status: 307,
            headers: { 
                Location: direct_post_url,
            },
        });
    } catch (err) {
        console.error('Redirect Error:', err);
        return new Response(null, {
            status: 307,
            headers: { Location: '/'}
        });
    }
}
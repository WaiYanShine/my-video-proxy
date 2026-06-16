export const config = { runtime: 'edge' };

export default async function handler(req) {
  const r2Base = "https://pub-3c15e32839f440a6bbcc0d356c9d9fb4.r2.dev";
  const url = new URL(req.url);
  const targetUrl = r2Base + url.pathname;

  const range = req.headers.get('range');
  const headers = new Headers();
  if (range) headers.set('range', range);

  try {
    const response = await fetch(targetUrl, { headers });

    // R2 ထံမှ Error (404, 500) များလာပါက ထိုအတိုင်း ပြန်ပို့ပေးရန်
    if (!response.ok && response.status !== 206) {
      return new Response("Error fetching file", { status: response.status });
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (err) {
    // Network Error များအတွက်
    return new Response("Internal Proxy Error", { status: 502 });
  }
}

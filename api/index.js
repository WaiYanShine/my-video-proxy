export const config = { runtime: 'edge' };

export default async function handler(req) {
  const r2Base = "https://pub-3c15e32839f440a6bbcc0d356c9d9fb4.r2.dev";
  const url = new URL(req.url);
  const targetUrl = r2Base + url.pathname;

  // Browser ဆီကလာတဲ့ Range Header ကို R2 ဆီ ပို့ပေးခြင်း
  const range = req.headers.get('range');
  const headers = new Headers();
  if (range) {
    headers.set('range', range);
  }

  const response = await fetch(targetUrl, { headers });

  // R2 ဆီက ရလာတဲ့ response ကို ပြန်ပို့ပေးခြင်း
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

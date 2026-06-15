export default async function handler(req, res) {
  const { url } = req.query; // Query parameter အနေနဲ့ သုံးခြင်း
  const targetUrl = "https://pub-3c15e32839f440a6bbcc0d356c9d9fb4.r2.dev" + req.url;
  
  const response = await fetch(targetUrl);
  const buffer = await response.arrayBuffer();
  
  res.setHeader('Content-Type', response.headers.get('Content-Type'));
  res.send(Buffer.from(buffer));
}

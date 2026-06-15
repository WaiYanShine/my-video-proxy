export default async function handler(req, res) {
  const targetUrl = "https://pub-3c15e32839f440a6bbcc0d356c9d9fb4.r2.dev" + req.url;
  try {
    const response = await fetch(targetUrl);
    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', response.headers.get('Content-Type'));
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Error ဖြစ်နေပါတယ်");
  }
}

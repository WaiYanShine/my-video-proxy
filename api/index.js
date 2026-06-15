export default async function handler(req, res) {
  // R2 bucket လိပ်စာ
  const r2Base = "https://pub-3c15e32839f440a6bbcc0d356c9d9fb4.r2.dev";
  const targetUrl = r2Base + req.url;
  
  try {
    const response = await fetch(targetUrl);
    
    // Header တွေကို Copy ကူးခြင်း
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
}

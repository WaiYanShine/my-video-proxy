export default async function handler(req, res) {
  // URL path ကို ဖြတ်ယူခြင်း
  const path = req.url.replace('/api/proxy', '');
  const targetUrl = "https://pub-3c15e32839f440a6bbcc0d356c9d9fb4.r2.dev" + path;
  
  try {
    const response = await fetch(targetUrl);
    
    // Header တွေကို Copy ကူးခြင်း
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    
    // ဖိုင်ကို ပြန်ပို့ခြင်း
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
}

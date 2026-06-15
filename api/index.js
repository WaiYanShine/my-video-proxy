export default async function handler(req, res) {
  const r2Base = "https://pub-3c15e32839f440a6bbcc0d356c9d9fb4.r2.dev";
  const targetUrl = r2Base + req.url;
  
  const response = await fetch(targetUrl);
  
  // Header များကို ပြန်လည်ပေးပို့ခြင်း
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }
  
  // ဖိုင်ကို stream အနေဖြင့် ပြန်လည်ပို့ဆောင်ခြင်း
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(value);
  }
  res.end();
}

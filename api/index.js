export default async function handler(req, res) {
  const r2Base = "https://pub-3c15e32839f440a6bbcc0d356c9d9fb4.r2.dev";
  const targetUrl = r2Base + req.url;
  
  const response = await fetch(targetUrl);
  
  // Header တွေကို Copy ကူးခြင်း
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }
  
  // ဖိုင်တစ်ခုလုံးကို Buffer မလုပ်ဘဲ stream ပြန်ပေးခြင်း
  const stream = response.body;
  stream.pipe(res);
}

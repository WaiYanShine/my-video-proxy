export const config = { runtime: 'edge' };

export default async function handler(req) {
  const r2Base = "https://pub-3c15e32839f440a6bbcc0d356c9d9fb4.r2.dev";
  const url = new URL(req.url);
  const targetUrl = r2Base + url.pathname;
  
  const response = await fetch(targetUrl);
  return response; // Edge function က fetch response ကို တိုက်ရိုက် return ပေးလို့ရပါတယ်
}

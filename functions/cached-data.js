export async function onRequest(context) {
  const cacheKey = "external-api-data";
  let data = await context.env.MY_KV.get(cacheKey, { type: "json" });

  if (!data) {
    const response = await fetch("https://api.example.com/data");
    data = await response.json();
    await context.env.MY_KV.put(cacheKey, JSON.stringify(data), { expirationTtl: 60 });
  }

  return Response.json(data);
}

export default async function extractRequestBody(request: Request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

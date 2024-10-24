export async function huggingFaceOAuthTokenEndpointRequest<T extends object>(
  requestPayload: T
) {
  const payload = {
    client_id: process.env.HF_CLIENT_ID,
    client_secret: process.env.HF_CLIENT_SECRET,
    ...requestPayload,
  };

  let encodedFormBody = Object.entries(payload)
    .map(
      ([key, value]) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(value)
    )
    .join("&");

  const response = await fetch("https://huggingface.co/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodedFormBody,
  });

  return {
    success: response.ok && response.status,
    payload: await response.json(),
  };
}

export async function getHuggingfaceAccessTokens(code: string) {
  return await huggingFaceOAuthTokenEndpointRequest({
    code,
    grant_type: "authorization_code",
    redirect_uri: process.env.HF_AUTH_REDIRECT_URL,
  });
}

export async function refreshAccessToken(refreshToken: string) {
  return await huggingFaceOAuthTokenEndpointRequest({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
}

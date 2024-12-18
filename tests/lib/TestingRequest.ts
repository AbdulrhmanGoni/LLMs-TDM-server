import type { Server } from "bun";

export default class TestingRequest {
  constructor(private server: Server) { }

  async returnResponse(res: Response) {
    return {
      resBody: await res.json(),
      status: res.status,
    };
  }

  async GET(path: string) {
    return fetch(`${this.server.url.origin}/${path}`).then(this.returnResponse);
  }

  async POST(path: string, body: Record<string, any> | string) {
    const init: FetchRequestInit = {
      body: JSON.stringify(body),
      method: "POST",
    };
    return fetch(`${this.server.url.origin}/${path}`, init).then(
      this.returnResponse
    );
  }

  async DELETE(path: string) {
    const init: FetchRequestInit = {
      method: "DELETE",
    };
    return fetch(`${this.server.url.origin}/${path}`, init).then(
      this.returnResponse
    );
  }

  async PATCH(path: string, body: Record<string, any> | string) {
    const init: FetchRequestInit = {
      body: JSON.stringify(body),
      method: "PATCH",
    };
    return fetch(`${this.server.url.origin}/${path}`, init).then(
      this.returnResponse
    );
  }

  async PUT(path: string, body: Record<string, any> | string) {
    const init: FetchRequestInit = {
      body: JSON.stringify(body),
      method: "PUT",
    };
    return fetch(`${this.server.url.origin}/${path}`, init).then(
      this.returnResponse
    );
  }
}

import type { Server } from "bun";

export default class TestingRequest {
  constructor(private server: Server) {}

  async returnRespons(res: Response) {
    return {
      resBody: await res.json(),
      status: res.status,
    };
  }

  async GET(path: string) {
    return fetch(`${this.server.url.origin}/${path}`).then(this.returnRespons);
  }

  async POST(path: string, body: Record<string, any> | string) {
    const init: FetchRequestInit = {
      body: JSON.stringify(body),
      method: "POST",
    };
    return fetch(`${this.server.url.origin}/${path}`, init).then(
      this.returnRespons
    );
  }

  async DELETE(path: string) {
    const init: FetchRequestInit = {
      method: "DELETE",
    };
    return fetch(`${this.server.url.origin}/${path}`, init).then(
      this.returnRespons
    );
  }

  async PATCH(path: string, body: Record<string, any> | string) {
    const init: FetchRequestInit = {
      body: JSON.stringify(body),
      method: "PATCH",
    };
    return fetch(`${this.server.url.origin}/${path}`, init).then(
      this.returnRespons
    );
  }

  async PUT(path: string, body: Record<string, any> | string) {
    const init: FetchRequestInit = {
      body: JSON.stringify(body),
      method: "PUT",
    };
    return fetch(`${this.server.url.origin}/${path}`, init).then(
      this.returnRespons
    );
  }
}

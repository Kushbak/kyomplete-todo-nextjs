import { objectToSearchParams } from "@/utils";

interface FetcherParams {
  base_url: string;
}

export default class Fetcher {
  base_url: string;

  constructor({ base_url }: FetcherParams) {
    this.base_url = base_url;
  }

  async get<T>(
    url: string,
    params: Record<string, any> = {},
    init: RequestInit = {}
  ): Promise<T> {
    const paramsStr = objectToSearchParams(params).toString();
    const data = await this.fetcher(`${url}/?${paramsStr}`, {
      ...init,
    });
    return data;
  }

  async post<T>(
    url: string,
    body: Record<string, any>,
    init: RequestInit = {}
  ): Promise<T> {
    const data = await this.fetcher(url, {
      ...init,
      method: "POST",
      body: JSON.stringify(body),
    });
    return data;
  }

  async patch<T>(
    url: string,
    body: Record<string, any>,
    init: RequestInit = {}
  ): Promise<T> {
    const data = await this.fetcher(url, {
      ...init,
      method: "PATCH",
      body: JSON.stringify(body),
    });

    return data;
  }

  async delete(url: string): Promise<void> {
    await this.fetcher(url, {
      method: "DELETE",
    });
  }

  private async fetcher(url: string, options: RequestInit) {
    try {
      const res = await fetch(`${this.base_url}/${url}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
      throw e
    }
  }
}

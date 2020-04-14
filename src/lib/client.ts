/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import got, {Got} from 'got';
import {HTTPVerb, ResourceName, HTTPPayload, Versions} from './types';

const BASE_URL = 'https://api.buttondown.email';
const DEFAULT_VERSION = 'v1';
const DEFAULT_TIMEOUT = 10000;
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'User-Agent': 'buttondown;nodejs'
};

export const VERBS: {[key: string]: HTTPVerb} = {
  GET: 'GET',
  POST: 'POST',
  PATH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

class Client {
  public timeout: number;
  private apiKey: string;
  private readonly got: Got;

  constructor(g = got) {
    this.timeout = DEFAULT_TIMEOUT;
    this.got = g;
  }

  /**
   * Set the Buttondown API key
   *
   * @param apiKey - Buttondown API key
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;

    if (apiKey.length === 0) {
      console.warn(`API key is empty.`);
    }
  }

  /**
   * Spawn a request to Buttondown API
   *
   * @param verb - HTTP verb
   * @param resource - resource to request
   * @param payload - (Optional) payload to send as request body
   */
  async request<T>(
    verb: HTTPVerb,
    resource: ResourceName,
    payload?: HTTPPayload
  ): Promise<T> {
    const url = createUrl(resource);
    try {
      const {body} = await this.got({
        method: verb,
        url,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Token ${this.apiKey}`
        },
        timeout: this.timeout,
        json: payload,
        responseType: 'json'
      });

      return body as T;
    } catch (error) {
      // Attach useful error information
      error.url = url;
      error.method = verb;
      error.payload = payload;
      throw error;
    }
  }
}

function createUrl(
  resource: ResourceName,
  version: Versions = DEFAULT_VERSION
): string {
  return `${BASE_URL}/${version}/${resource}`;
}

export default new Client();

/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */
import got, {CancelableRequest, Response} from 'got';
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

  constructor() {
    this.timeout = DEFAULT_TIMEOUT;
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
   * @param payload - payload to send as request body
   */
  request(
    verb: HTTPVerb,
    resource: ResourceName,
    payload?: HTTPPayload
  ): CancelableRequest<Response<string>> {
    return got({
      method: verb,
      url: createUrl(resource),
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: `Token ${this.apiKey}`
      },
      timeout: this.timeout,
      json: payload
    });
  }
}

function createUrl(
  resource: ResourceName,
  version: Versions = DEFAULT_VERSION
): string {
  return `${BASE_URL}/${version}/${resource}`;
}

export default new Client();

/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import got, {Got} from 'got';
import {HTTPVerb, ResourceName, Versions, ClientPayload} from './types';

const BASE_URL = 'https://api.buttondown.email';
const DEFAULT_VERSION = 'v1';
const DEFAULT_TIMEOUT = 10000;
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'User-Agent': 'buttondown;nodejs'
};

function createUrl(
  resource: ResourceName,
  version: Versions,
  resourcePath = ''
): string {
  return resourcePath
    ? `${BASE_URL}/${version}/${resource}/${resourcePath}`
    : `${BASE_URL}/${version}/${resource}`;
}

export const VERBS: Record<string, HTTPVerb> = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

// Resources are aliased to singular as well as plural,
// eg. RESOURCES.EMAIL and RESOURCES.EMAILS are equivalent.
export const RESOURCES: Record<string, ResourceName> = {
  DRAFTS: 'drafts',
  DRAFT: 'drafts',
  EMAILS: 'emails',
  EMAIL: 'emails',
  IMAGES: 'images',
  IMAGE: 'images',
  NEWSLETTERS: 'newsletters',
  NEWSLETTER: 'newsletters',
  PING: 'ping',
  SCHEDULED_EMAILS: 'scheduled-emails',
  SCHEDULED_EMAIL: 'scheduled-emails',
  SUBSCRIBERS: 'subscribers',
  SUBSCRIBER: 'subscribers',
  TAGS: 'tags',
  TAG: 'tags',
  UNSUBSCRIBERS: 'unsubscribers',
  UNSUBSCRIBER: 'unsubscribers'
};

export class Client {
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

    if (!apiKey) {
      console.warn(`API key is empty.`);
    }
  }

  /**
   * Spawn a request to Buttondown API
   *
   * @param verb - HTTP verb
   * @param resource - resource to request
   * @param payload - (Optional) payload to define, extra fields, eg. resource id, payload in body,
   */
  async request<T>(
    verb: HTTPVerb,
    resource: ResourceName,
    {
      resourcePath = '',
      query = {},
      payload,
      version = DEFAULT_VERSION
    }: ClientPayload = {}
  ): Promise<T> {
    const url = createUrl(resource, version, resourcePath);
    try {
      const {body} = await this.got({
        responseType: 'json',
        method: verb,
        url,
        headers: {
          ...DEFAULT_HEADERS,
          Authorization: `Token ${this.apiKey}`
        },
        timeout: this.timeout,
        json: payload,
        searchParams: query
      });

      return body as T;
    } catch (error) {
      // Attach useful error information
      error.url = url;
      error.method = verb;
      error.query = query;
      error.payload = payload;
      throw error;
    }
  }

  notImplemented<T>(
    verb: HTTPVerb,
    resource: ResourceName,
    payload: ClientPayload = {}
  ): T {
    const error = new Error(`${verb} ${resource} - Not Implemented`) as any;
    error.payload = payload;
    throw error;
  }
}

export default new Client();

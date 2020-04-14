export type HTTPVerb = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export type HTTPPayload = Record<string, any>;
export type HTTPSearchParams = Record<string, any>;
export type ResourceName =
  | 'drafts'
  | 'emails'
  | 'images'
  | 'newsletters'
  | 'ping'
  | 'scheduled-emails'
  | 'subscribers'
  | 'tags'
  | 'unsubscribers';
export type Versions = 'v1';

export interface ClientPayload {
  readonly resourcePath?: string;
  readonly query?: HTTPSearchParams;
  readonly payload?: HTTPPayload;
  readonly version?: Versions;
}

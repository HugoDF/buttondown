export type HTTPVerb = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export type HTTPPayload = {[key: string]: object};
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

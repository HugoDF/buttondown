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

export interface ViewSetResponse<T> {
  readonly results: T[];
  readonly next: string;
  readonly prev: string;
  readonly count: number;
}

export interface EmailCreateFields {
  readonly included_tags?: string[];
  readonly excluded_tags?: string[];
  readonly subject: string;
  readonly body: string;
}

export interface ScheduledEmailCreateFields extends EmailCreateFields {
  readonly publish_date: string;
}

export interface EmailRecord extends EmailCreateFields {
  readonly id: string;
  readonly creation_date: string;
  readonly modification_date: string;
  readonly email_type?: string;
  readonly secondary_id?: number;
  readonly publish_date: string;
  readonly slug?: string;
}

export type EmailList = EmailRecord[];

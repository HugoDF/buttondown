This documentation provides examples for specific Buttondown v1 API use cases in Node.js. Please [open an issue](https://github.com/HugoDF/buttondown/issues) or make a pull request for any email use cases you would like us to document here. Thank you!


## Table of contents/resource list

- [drafts](#drafts)
- [emails](#emails)
- **Not Implemented** images
- **Beta** [newsletters](#newsletters)
- [ping](#ping)
- [scheduled-emails](#scheduled-emails)
- [subscribers](#subscribers)
- [tags](#tags)
- [unsubscribers](#unsubscribers)

## Drafts

Drafts supports the following operations:

- list
- create
- get

For type information see [./src/drafts.ts](https://github.com/HugoDF/buttondown/blob/master/src/drafts.ts)

### drafts.list(): Get existing drafts

drafts.list support a "page" parameter (defaults to 1) and responds with the list of drafts.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
const page = 1;
buttondown.drafts.list(page);
```

### drafts.create(): Create a new draft

Both the "subject" and "body" fields are optional for drafts.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
const draft = {
  subject: 'Creating a new Buttondown draft',
  body: '<strong>and easy to do from Node.js</strong>',
};
buttondown.drafts.create(draft);
```

### drafts.get(): Get a single existing draft

`drafts.get` gets a single draft by id (**required**).

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
const draftId = 'some-uuid';
buttondown.drafts.get(draftId);
```

## Emails

Emails support the following operations:

- list
- create
- get

For type information see [./src/emails.ts](https://github.com/HugoDF/buttondown/blob/master/src/emails.ts)

### emails.list(): Get existing emails

emails.list support a "page" parameter (defaults to 1) and responds with the list of emails.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
const page = 1;
buttondown.emails.list(page);
```

### emails.create(): Create a new email

Both the "subject" and "body" fields are **required** for emails.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
const email = {
  subject: 'Creating a new Buttondown draft',
  body: '<strong>and easy to do from Node.js</strong>',
};
buttondown.emails.create(email);
```

### emails.get(): Get a single existing email

`emails.get` gets a single email by id (**required**).

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
const emailId = 'some-uuid';
buttondown.emails.get(emailId);
```

## Newsletters

> **Warning**: Newsletter API Access is in **Beta** and by default will **not work**, contact Justin (support@buttondown.email) to get access.

Newsletters support the following operations:

- list
- create
- get
- put
- patch

For type information see [./src/newsletters.ts](https://github.com/HugoDF/buttondown/blob/master/src/newsletters.ts)

### newsletters.list(): list existing newsletters

List supports a page parameter (defaults to 1).

> Examples to come when this resource is out of Beta

### newsletters.create(): create a new newsletter

"username", "name" and "description" are **required**.

> Examples to come when this resource is out of Beta

### newsletters.get(): get an existing newsletter

> Examples to come when this resource is out of Beta

### newsletters.put(): replace a complete newsletter

> Examples to come when this resource is out of Beta

### newsletters.patch(): update part of a newsletter

> Examples to come when this resource is out of Beta

## Ping

Ping is a function that pings the Buttondown API. Useful for testing that you are authenticated correctly.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.ping();
```

For type information see [./src/ping.ts](https://github.com/HugoDF/buttondown/blob/master/src/ping.ts)

## Scheduled Emails

Scheduled Emails support the following operations:

- list: get scheduled emails by page
- create: create a new scheduled email
- get: get a single scheduled email by id

For type information see [./src/scheduled-emails.ts](https://github.com/HugoDF/buttondown/blob/master/src/scheduled-emails.ts).

### scheduledEmails.create(): Create a new email

Both the "subject", "body" and "publish_date" fields are **required** for emails.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
const scheduledEmail = {
  subject: 'Creating a new Buttondown draft',
  body: '<strong>and easy to do from Node.js</strong>',
  publish_date: '2020-04-14T16:30:00Z'
};
buttondown.scheduledEmails.create(scheduledEmail);
```

### scheduledEmails.get(): Get a single existing scheduled email

`scheduledEmails.get` gets a single scheduled email by id (**required**).

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
const emailId = 'some-uuid';
buttondown.scheduledEmails.get(emailId);
```

## Subscribers

Subscribers support the following operations:

- list
- create
- get
- put
- patch
- remove

For type information see [./src/subscribers.ts](https://github.com/HugoDF/buttondown/blob/master/src/subscribers.ts)

### subscribers.list(): list existing subscribers

List supports a page parameter (defaults to 1) and a query object to filter by that supports the following fields:

- type (SubscriberType), one of 'regular' | 'unactivated' | 'unpaid' | 'removed'
- email, string
- tag, string

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.subscribers.list(2, {
  type: 'unactivated',
  email: 'user-email@example.tld',
  tag: 'latest',
});
```

### subscribers.create(): create a new subscriber

Create a new subscriber, pass an object containing:

- "email" **required**, string.
- notes, string
- referrer_url, string
- tags, array of string (TS `string[]`);

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.subscribers.create({
  email: 'user-email@example.tld'
});
```

### subscribers.get(): get an existing subscriber

"id" is **required**.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.subscribers.get('subscriber-id');
```

### subscribers.put(): replace a complete subscriber

Supports 2 params:

- id is **required**
- subscriber to update to, must have an **email** value (supports same fields as `subscribers.create()`)

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.subscribers.put('subscriber-id', {
  email: 'new-email'
});
```

### subscribers.patch(): update part of a subscriber

Supports 2 params:

- id is **required**
- subset of subscriber to update, must be non-empty (supports same fields as `subscribers.create()`)

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.subscribers.patch('subscriber-id', {
  tags: ['new', 'tags']
});
```

### subscribers.remove(): delete a subscriber

Supports 2 params:

- id is **required**
- query object, in which the subscriber's email is **required**, also supports notes and tags array.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.subscribers.remove('subscriber-id', {
  email: 'subscriber@example.tld'
});
```

## Tags

Tags support the following operations:

- list
- create
- get
- put
- patch
- remove

For type information see [./src/tags.ts](https://github.com/HugoDF/buttondown/blob/master/src/tags.ts)


### tags.list(): list existing tags

List supports a page parameter (defaults to 1).

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.tags.list(2);
```

### tags.create(): create a new tag

Create a new subscriber, pass an object containing:

- name **required**, string.
- color, string
- description, string

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.tags.create({
  name: 'super-awesome-tag'
});
```

### tags.get(): get an existing tag

"id" is **required**.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.tags.get('tag-id');
```

### tags.put(): replace a complete tag

Supports 2 params:

- id is **required**
- tags to update to, must have a **name** value (supports same fields as `tags.create()`)

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.tags.put('tag-id', {
  name: 'super-awesome-tag'
});
```

### tags.patch(): update part of a tag

Supports 2 params:

- id is **required**
- subset of tag to update, must be non-empty (supports same fields as `tags.create()`)

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.tags.patch('tag-id', {
  color: '#ffffff'
});
```

### tags.remove(): delete a tag

Supports 2 params:

- id is **required**
- query object, in which the tag's name is **required**, also supports color and description.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.tags.remove('tag-id', {
  name: 'super-awesome-tag'
});
```

## Unsubscribers

Unsubscribers support the following operations:

- list
- get

For type information see [./src/unsubscribers.ts](https://github.com/HugoDF/buttondown/blob/master/src/unsubscribers.ts)


### unsubscribers.list(): Get existing unsubscribers

`unsubscribers.list` support a "page" parameter (defaults to 1) and responds with the list of unsubscribers.

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.unsubscribers.list(1);
```

### unsubscribers.get(): Get a single existing unsubscriber

`unsubscribers.get` gets a single unsubscribers by id (**required**).

```js
const buttondown = require('buttondown');
buttondown.setApiKey(process.env.BUTTONDOWN_API_KEY);
buttondown.unsubscribers.get('unsubscriber-id');
```

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

- list: get drafts by page
- create: create a new draft
- get: get a single draft by id

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

- list: get emails by page
- create: create a new email
- get: get a single email by id

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

- list: list existing newsletters
- create: create a new newsletter
- get: get an existing newsletter
- put: replace a complete newsletter
- patch: update part of a newsletter

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

## Scheduled Emails

Scheduled Emails support the following operations:

- list: get scheduled emails by page
- create: create a new scheduled email
- get: get a single scheduled email by id

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

## Tags

## Unsubscribers

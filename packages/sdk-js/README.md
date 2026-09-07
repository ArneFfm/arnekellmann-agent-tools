# Arne Kellmann JavaScript / TypeScript SDK and CLI

JavaScript / TypeScript package for the anonymous, read-only consulting services API.
SDK integration source is distributed separately from the
private website repository at [arnekellmann-agent-tools](https://github.com/ArneFfm/arnekellmann-agent-tools).
No open-source license has been granted.

Requires Node.js 20 or later:

```sh
npm install @arnek/arnekellmann-sdk
npx arnekellmann --help
npx arnekellmann services de
```

```ts
import { ArneKellmannClient, ServicesApiError } from '@arnek/arnekellmann-sdk';

try {
  const catalog = await new ArneKellmannClient().listServices('en');
  console.log(catalog.services);
} catch (error) {
  if (error instanceof ServicesApiError) {
    console.error(error.status, error.retryAfter);
  }
  throw error;
}
```

`listServices(language = 'en')` accepts `en` or `de` and returns the complete
catalog: `language`, `services` (`id`, `name`, `description`, `url`), `pricing`
(custom quote, no published rates), and `contactUrl`. TypeScript declarations
are included. No pagination is needed for this small catalog.

CLI output is JSON on stdout; failures go to stderr with exit code 1. `--help`
and `--version` work offline. To use a local development server:

```sh
npx arnekellmann services en --base-url http://localhost:4321
```

The constructor accepts the same HTTP(S) base URL; API paths resolve from its
origin. URLs containing credentials are rejected. Requests send
`Accept: application/json`, time out after ten seconds, and are never retried
automatically. HTTP errors include `status` and the raw `retryAfter` header
(seconds or HTTP date, or null). Fetch/network and JSON parsing errors propagate.

There are no credentials, contact submission, booking or payment methods. A
contact URL is informational; opening it does not send an enquiry.

Package validation: `npm pack --dry-run` from this directory. Installing the
result of `npm pack` exercises the same CLI and included type declarations.

[API documentation](https://arnekellmann.de/developers) ·
[OpenAPI](https://arnekellmann.de/api/openapi.json)

# Arne Kellmann Python SDK

Python package for the anonymous, read-only consulting services API. SDK integration source is distributed separately from the
private website repository at [arnekellmann-agent-tools](https://github.com/ArneFfm/arnekellmann-agent-tools).
No open-source license has been granted.

Requires Python 3.10 or later. No runtime dependencies. Install version 0.1.1 from PyPI:

```sh
python -m pip install arnekellmann-sdk==0.1.1
```

```python
from arnekellmann import Client
from urllib.error import HTTPError

try:
    catalog = Client().list_services("de")
    print(catalog["services"])
except HTTPError as error:
    print(error.code, error.headers.get("Retry-After"))
    raise
```

`list_services(language="en")` accepts `en` or `de` and returns the complete
catalog as a dictionary: `language`, `services` (`id`, `name`, `description`,
`url`), `pricing` (custom quote based on EUR 120/hour net for all services: `publishedRates: true`,
`hourlyRate: 120`, `currency: "EUR"`, `unit: "hour"`, `vatIncluded: false`), and `contactUrl`. No
pagination is needed for this small catalog.

For development: `Client("http://localhost:4321")`. API paths resolve from the
base URL's origin. HTTP(S) URLs are required and embedded credentials are
rejected. Requests send `Accept: application/json` and time out after ten
seconds. HTTP, network and JSON parsing errors propagate to the caller.
There are no automatic retries; HTTP errors preserve their status and headers.

No credentials, contact delivery, bookings or payments are supported. A contact
URL is informational; reading it does not send an enquiry.

Tests from the repository root:
`PYTHONPATH=packages/sdk-python python -m unittest discover -s packages/sdk-python/tests`.
Build wheel and source distribution with `python -m build packages/sdk-python`
after installing the optional `build` development tool.

[API documentation](https://arnekellmann.de/developers) ·
[OpenAPI](https://arnekellmann.de/api/openapi.json)

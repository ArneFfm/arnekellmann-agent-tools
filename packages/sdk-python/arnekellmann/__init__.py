"""Read-only client. No contact delivery or automatic retries."""
import json
from typing import Any
from urllib.parse import urlsplit
from urllib.request import Request, urlopen


class Client:
    def __init__(self, base_url: str = "https://arnekellmann.de"):
        parsed = urlsplit(base_url)
        if parsed.scheme not in ("http", "https") or not parsed.hostname or parsed.username or parsed.password:
            raise ValueError("Use an HTTP(S) base URL without credentials.")
        self.base_url = f"{parsed.scheme}://{parsed.netloc}"

    def list_services(self, language: str = "en") -> dict[str, Any]:
        if language not in ("en", "de"):
            raise ValueError("Use language en or de.")
        request = Request(
            f"{self.base_url}/api/v1/services?language={language}",
            headers={"Accept": "application/json", "User-Agent": "arnekellmann-sdk/0.1.1 (+https://arnekellmann.de/developers)"},
        )
        with urlopen(request, timeout=10) as response:
            return json.load(response)

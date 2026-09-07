/** Read-only client. No contact submission or automatic retries. */
export class ArneKellmannClient {
  constructor(baseUrl = 'https://arnekellmann.de') {
    this.baseUrl = new URL(baseUrl);
    if (
      !['http:', 'https:'].includes(this.baseUrl.protocol) ||
      this.baseUrl.username ||
      this.baseUrl.password
    ) {
      throw new Error('Use an HTTP(S) base URL without credentials.');
    }
  }
  async listServices(language = 'en') {
    if (!['en', 'de'].includes(language)) throw new Error('Use language en or de.');
    const response = await fetch(new URL(`/api/v1/services?language=${language}`, this.baseUrl), {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      throw new ServicesApiError(response.status, response.headers.get('Retry-After'));
    return response.json();
  }
}

export class ServicesApiError extends Error {
  constructor(status, retryAfter = null) {
    super(`Services API returned HTTP ${status}`);
    this.name = 'ServicesApiError';
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

export type Language = 'en' | 'de';
export interface Service {
  id: string;
  name: string;
  description: string;
  url: string;
}
export interface ServicesResponse {
  language: Language;
  services: Service[];
  pricing: { type: 'custom_quote'; publishedRates: false; url: string };
  contactUrl: string;
}
export declare class ArneKellmannClient {
  constructor(baseUrl?: string);
  baseUrl: URL;
  listServices(language?: Language): Promise<ServicesResponse>;
}
export declare class ServicesApiError extends Error {
  constructor(status: number, retryAfter?: string | null);
  status: number;
  /** Raw Retry-After header, either seconds or an HTTP date; null when absent. */
  retryAfter: string | null;
}

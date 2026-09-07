import io
import unittest
from unittest.mock import patch
from urllib.error import HTTPError
from arnekellmann import Client


class ClientTests(unittest.TestCase):
    def test_language_timeout_and_base_origin(self):
        with patch('arnekellmann.urlopen', return_value=io.BytesIO(b'{"language":"de","services":[]}')) as request:
            result = Client('http://localhost:4321/docs').list_services('de')
        self.assertEqual(result['language'], 'de')
        self.assertEqual(request.call_args.args[0].full_url, 'http://localhost:4321/api/v1/services?language=de')
        self.assertEqual(request.call_args.args[0].get_header('Accept'), 'application/json')
        self.assertIn('arnekellmann-sdk/', request.call_args.args[0].get_header('User-agent'))
        self.assertEqual(request.call_args.kwargs['timeout'], 10)

    def test_rejects_invalid_language_without_request(self):
        with patch('arnekellmann.urlopen') as request:
            with self.assertRaises(ValueError):
                Client().list_services('fr')
        request.assert_not_called()

    def test_rejects_unsafe_base_urls(self):
        for url in ('file:///tmp/catalog', 'https://user:secret@example.com', 'invalid'):
            with self.assertRaises(ValueError):
                Client(url)

    def test_http_errors_propagate_without_retry(self):
        error = HTTPError('https://example.com', 429, 'Limited', {'Retry-After': '60'}, None)
        with patch('arnekellmann.urlopen', side_effect=error) as request:
            with self.assertRaises(HTTPError) as result:
                Client().list_services()
        self.assertEqual(result.exception.headers['Retry-After'], '60')
        request.assert_called_once()


if __name__ == '__main__':
    unittest.main()

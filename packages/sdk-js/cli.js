#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { ArneKellmannClient } from './index.js';

const usage = `Usage: arnekellmann services [en|de] [--base-url URL]
       arnekellmann --help
       arnekellmann --version

Reads public consulting services as JSON. No credentials or writes.
Default URL: https://arnekellmann.de. Requests time out after 10 seconds.`;

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' },
      'base-url': { type: 'string' },
    },
  });
  if (values.help) {
    console.log(usage);
  } else if (values.version) {
    console.log(
      JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')).version
    );
  } else {
    const [command, language = 'en', ...extra] = positionals;
    if (command !== 'services' || extra.length) throw new Error(usage);
    console.log(
      JSON.stringify(
        await new ArneKellmannClient(values['base-url']).listServices(language),
        null,
        2
      )
    );
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

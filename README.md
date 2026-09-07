# Arne Kellmann agent integrations

Official integration artifacts for [Arne Kellmann](https://arnekellmann.de), an independent AI architecture consulting practice.

## Connect

Public, anonymous Streamable HTTP MCP:

- Services and documents: https://arnekellmann.de/mcp
- Documentation search: https://arnekellmann.de/mcp/docs

No account or API key is required. Tools read published information; none sends email, books services or makes payments.

## Install the consulting skill

```sh
npx skills add ArneFfm/arnekellmann-agent-tools --skill assess-architecture-fit
```

Review the skill before installation. It compares a project with published services and prepares an enquiry for human review.

## Agent Plugin

The root plugin.json and mcp.json use Agent Plugins 1.0.0. Install this repository in a compatible plugin client. Client-native MCP configuration may use a different transport label.

## SDK and CLI

- JavaScript/TypeScript and CLI: packages/sdk-js
- Python: packages/sdk-python

Install from the source directories as described in their READMEs. npm and PyPI registry publication is not yet confirmed.

## Documentation

- [Developer portal](https://arnekellmann.de/developers)
- [OpenAPI](https://arnekellmann.de/api/openapi.json)
- [Authentication](https://arnekellmann.de/auth.md)
- [Pricing and limits](https://arnekellmann.de/pricing.md)
- [Smithery](https://smithery.ai/servers/arnekellmann/consulting)

Consulting is individually scoped; no fixed rates or availability are published. The website source repository is private and is not part of this distribution.

## License

No open-source license is granted at this checkpoint. Package metadata is UNLICENSED; public visibility does not grant additional redistribution rights.

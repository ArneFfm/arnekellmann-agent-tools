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

Install the official registry packages:

```sh
npm install @arnek/arnekellmann-sdk
npx --package @arnek/arnekellmann-sdk arnekellmann services en
python -m pip install arnekellmann-sdk
```

[npm](https://www.npmjs.com/package/@arnek/arnekellmann-sdk) · [PyPI](https://pypi.org/project/arnekellmann-sdk/)

Python releases use the manually triggered publish-pypi.yml workflow on main and a repository-bound PyPI trusted publisher.

## Documentation

- [Developer portal](https://arnekellmann.de/developers)
- [OpenAPI](https://arnekellmann.de/api/openapi.json)
- [Authentication](https://arnekellmann.de/auth.md)
- [Pricing and limits](https://arnekellmann.de/pricing.md)
- [Smithery](https://smithery.ai/servers/arnekellmann/consulting)

Consulting is individually scoped; no fixed rates or availability are published. The website source repository is private and is not part of this distribution.

## License

No open-source license is granted at this checkpoint. Package metadata is UNLICENSED; public visibility does not grant additional redistribution rights.

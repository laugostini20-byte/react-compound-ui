# react-compound-ui

My personal React component library for future apps, documented with [Storybook](https://storybook.js.org/) and published as a GitHub Package.

**Live docs:** https://laugostini20-byte.github.io/react-compound-ui/

## Installation

The package lives on the GitHub Packages npm registry under `@laugostini20-byte`. In the app that uses it, add a `.npmrc`:

```
@laugostini20-byte:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

`GITHUB_TOKEN` must be a GitHub personal access token (classic) with the `read:packages` scope. Then:

```bash
npm install @laugostini20-byte/react-compound-ui
```

## Usage

```tsx
import { Button, Card, Tabs } from '@laugostini20-byte/react-compound-ui';
import '@laugostini20-byte/react-compound-ui/styles.css';

export function Example() {
  return (
    <Card>
      <Card.Header><Card.Title>Hello</Card.Title></Card.Header>
      <Card.Body>Composable pieces.</Card.Body>
      <Card.Footer><Button>Save</Button></Card.Footer>
    </Card>
  );
}
```

Theme it by overriding the `--rcu-*` CSS variables (see `src/styles/tokens.css`). Add `data-theme="dark"` to an ancestor for dark mode.

## Components

| Component | Parts |
|-----------|-------|
| `Button`  | variants `primary`, `secondary`, `ghost`, `danger`; sizes `sm`, `md`, `lg` |
| `Card`    | `Card.Header`, `Card.Title`, `Card.Body`, `Card.Footer` |
| `Tabs`    | `Tabs.List`, `Tabs.Trigger`, `Tabs.Panel` (keyboard accessible) |

## Development

```bash
npm install
npm run storybook   # docs + playground at http://localhost:6006
npm test            # runs every story as a test in a real browser
npm run build       # builds the package into dist/
```

### Adding a component

1. Create `src/components/Name/` with `Name.tsx`, `Name.css`, `Name.stories.tsx`, `index.ts`.
2. Export it from `src/index.ts`.
3. Use the `--rcu-*` tokens for all colors, spacing and radii.

## Releasing

Create a GitHub Release with a tag like `v0.2.0`. The publish workflow sets that version and publishes it to GitHub Packages. Storybook redeploys to GitHub Pages on every push to `main`.

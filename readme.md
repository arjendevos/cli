# `Cli tool`

This is a CLI tool for opening projects or creating a new next-ts project with my own boilerplate

## Getting started

The Open action will probably not (yet) work on your System because it is custom made for my own System.

To make it work change the start directory inside `directory.ts`:

```ts
private startDir = "C:/Users/arvoc/Documents/Home"
```

You can build the tool with:

```sh
# Build the entire tool
npm run build

# Remove old bin and compile typescript
npm run clean

# Install globally
npm run global
```

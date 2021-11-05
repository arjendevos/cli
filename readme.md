# `Cli tool`

This is a CLI tool for opening projects or creating a new next-ts project with my own boilerplate

## Getting started

The OPEN action will probably not work on your system but you can try to change the start directory inside `directory.ts`:
The start directory is the directory where it start with searching.

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

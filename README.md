# Space Traders API Project

## Prerequisite
1. pnpm

## Setup

1. install dependencies
```
pnpm install
```

2. generate client (using autorest)

```
cd packages/api-client-gen
pnpm run generate
cd ../api-client
pnpm install
```
client will be generated in `/packages/api-client`

## Scripts
### Fetch Galaxy Map

this will take long time (from root)
```
cd packages/scripts
pnpm exec tsx src/fetch.ts
```

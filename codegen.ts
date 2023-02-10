import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://main--spacex-l4uc6p.apollographos.net/graphql",
  documents: ["src/**/*.gql"],
  generates: {
    "src/schema-types.ts": {
      plugins: ["typescript"],
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: { extension: ".tsx", baseTypesPath: "schema-types.ts" },
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};
export default config;

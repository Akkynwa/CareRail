{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@carerail/ui/*": ["../../packages/ui/*"],
      "@carerail/db/*": ["../../packages/db/*"],
      "@carerail/auth/*": ["../../packages/auth/*"],
      "@carerail/utils/*": ["../../packages/utils/*"],
      "@carerail/qr/*": ["../../packages/qr/*"]
    },
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  },
  "include": [
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx",
    "../../packages"
  ]
}
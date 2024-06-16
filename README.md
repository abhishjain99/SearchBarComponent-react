## KEEP IN MIND THIS BEFORE CREATING THE RECT APP
```
npm create-react-app searchbar --template typescript
```

## Installations
- npm install react-redux @reduxjs/toolkit
  - ( If you already have typescript installed, npm uninstall ts-node typescript @types/node )
- npm install axios
- npm install --save-dev @types/lodash @types/jest @testing-library/react
- npm install --save typescript @types/node @types/react @types/react-dom

## Testing
run `npm test` OR to test coverage run `CI=true npm test -- --coverage`

## Flow
- `debounce` and `throttle` are called from lodash library OR
- `debounce` and `throttle` are called from their respective tsx files
- Just comment or uncomment

## package.json updates
Remember to replace "scripts" of `package.json` following lines:
```
"scripts": {
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "start": "node ./src/components/SearchBarComponent/BackEnd/server.js",
  "express:server": "nodemon ./src/components/SearchBarComponent/BackEnd/server.js",
  "react:client": "react-scripts start",
  "dev": "npm run express:server & npm run react:client"
},
```

## Add tsconfig.json in root directory
```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```
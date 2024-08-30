# REST Server con Clean Architecture

### Configuración de Typescript
```bash
npm init -y
npm i -D typescript @types/node ts-node-dev rimraf
npx tsc --init --outDir dist/ --rootDir src
```

### Paquetes utilizados
```bash
npm i express
npm i --save-dev @types/express
npm i dotenv env-var
npm i mongoose
npm i bcryptjs
npm i --save-dev @types/bcryptjs
npm i jsonwebtoken
npm i --save-dev @types/jsonwebtoken
```

### Recursos
* [JWT](https://jwt.io/)
* Generar semilla: *openssl rand -hex 32*
* [Repo ejemplos](https://github.com/Klerith/linkedin-node-clean/tree/main)

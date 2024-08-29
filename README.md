npm init -y

npm i -D typescript @types/node ts-node-dev rimraf

npx tsc --init --outDir dist/ --rootDir src


npm i express
npm i --save-dev @types/express
npm i dotenv env-var
npm i mongoose
npm i bcryptjs
npm i jsonwebtoken
npm i --save-dev @types/jsonwebtoken

Recursos
* https://jwt.io/
* Generar semilla: openssl rand -hex 32

# AWS -LAMBDA

# Pre-requisitos ✅
- MongoDB/MongoDB Atlas
- Cuenta AWS

# Variables a Configurar

En el archivo reto-aws/.env:

- `AWS_ACCESS_KEY_ID`, Clave de acceso para AWS 
- `AWS_SECRET_ACCESS_KEY` Clave secreta de acceso para AWS

En el archivo config/.env:
- `DB_URL`, URI de la base de datos MongoDB
- `DB_NAME`, Nombre de la Base de Datos
- `DB_CARDS_COLLECTION`, Nombre de la coleccion

# Instalacion

```
git clone https://github.com/anibal-vergaray-unmsm/reto-aws
cd reto-aws
npm install
npm run dev

```
# Scripts

- `lint`, Para verificar la sintaxis del codigo
- `e2e`, Test end-to-end (Configurar la variable URL del script y mantener desplegado el proyecto localmente o en la nube)
- `dev`, Despliegue en servidor local
- `deploy`, Despliegue en la nube de AWS

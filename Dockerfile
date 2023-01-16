FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

COPY tsconfig.json ./

COPY src/Infra/Database/Prisma/schema.prisma /usr/app/src/Infra/Database/Prisma/

COPY vitest.config.ts ./

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD npm run web:serve

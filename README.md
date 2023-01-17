# Docker
# Montar imagem do banco MYSQL
- sudo docker build -t gym-db/mysql-image -f src/Infra/Database/Dockerfile .

# Subir container do banco
- sudo docker run -d --rm -p 4567:3306 --name gym-db gym-db/mysql-image

# Rodar script de dump dentro do container do banco e povoar ele com dados
- sudo docker exec -i gym-db mysql -uroot -p123456 < src/Infra/Database/Dump/script.sql

# Montar imagem do app NODE/TYPESCRIPT
- sudo docker build -t gym-app/node-image .

# Subir container do app
- sudo docker run -d --rm -p 49000:4000 -d --name gym-app gym-app/node-image

# SUBIR COM DOCKER COMPOSE
- sudo docker compose up --build
- sudo docker exec -it gym-app sh 
- sudo npx prisma generate
- sudo npm run web:serve
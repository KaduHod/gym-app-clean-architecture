# Docker
# Montar imagem do banco MYSQL
sudo docker build -t gym-db/mysql-image -f src/Infra/Database/Dockerfile .

# Subir container do banco
sudo docker run -d --rm -p 4567:3306 --name gym-db gym-db/mysql-image

# Rodar script de dump dentro do container do banco e povoar ele com dados
sudo docker exec -i gym-db mysql -uroot -p123456 < src/Infra/Database/script.sql

# Montar imagem do app NODE/TYPESCRIPT
docker build -t gym-app/node-image .

# Subir container do app
docker run -d --rm -p 49000:4000 -d --name gym-app gym-app/node-image

# SUBIR COM DOCKER COMPOSE
- docker compose up --build
- docker exec -it gym-app sh 
- npx prisma generate
- npm run web:serve
# Docker
# Montar imagem do banco MYSQL
sudo docker build -t gym-db-image -f src/Infra/Database/Dockerfile .

# Subir container do banco
sudo docker run -d --rm -p 4567:3306 --name gym-db gym-db-image

# Rodar script de dump dentro do container do banco e povoar ele com dados
sudo docker exec -i gym-db mysql -uroot -p123456 < src/Infra/Database/script.sql

# Montar imagem do app NODE
docker build -t gym-app/node-image .

# Subir container
docker run -d --rm -p 49672:3000 -d --name gym-app gym-app/node-image
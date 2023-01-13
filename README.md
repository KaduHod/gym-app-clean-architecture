# Docker
# Montar imagem do banco MYSQL
docker build -t mysql-image -f src/Infra/Database/Dockerfile .

# Subir container do banco
docker run -d --rm -p 4567:3306 --name gym-db mysql-image

# Rodar script de dump dentro do container do banco e povoar ele com dados
docker exec -i gym-db mysql -uroot -p123456 < src/Infra/Database/script.sql
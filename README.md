"# gym-app-clean-architecture" 
# Docker
# Montar imagem do banco MYSQL
docker build -t mysql-image -f src/infra/database/Dockerfile .

# Subir container do banco
docker run -d --rm -p 4567:3306 --name gym-db mysql-image

# Rodar script de dump dentro do container do banco e povoar ele com dados
docker exec -i gym-db -uroot -p123456 < src/infra/database/script.sql
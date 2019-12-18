# gobarber

## Container Database
```
Executar:
docker run --name database -e POSTGRES_PASSWORD={mysecretpassword} -p {5432}:{5432} -d postgres:11
```
GUI POSTBIRD -> https://electronjs.org/apps/postbird

## Configurações de acesso ao banco de dados
```
Com o docker rodando utilizar as seguintes configurações para acesso ao banco de dados
host: localhost
port: {porta definida}
userName: postgres
password: {senha definida}
```
Após realizar a conexao com o banco de dados:
## Criar DATABASE
```
Criar database:
Name = gobarber
Template = sem template
Encoding = UTF-8
```
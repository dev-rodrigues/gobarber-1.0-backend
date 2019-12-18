# gobarber

## CONFIGURAÇÃO DO BANCO DE DADOS
```
Executar:
docker run --name database -e POSTGRES_PASSWORD={mysecretpassword} -p {5432}:{5432} -d postgres:11
```
## Recomendo utilizar a GUI Client Postbird
URL -> https://electronjs.org/apps/postbird
```
Com o docker rodando utilizar as seguintes configurações para acesso ao banco de dados
host: localhost
port: {porta definida}
userName: postgres
password: {senha definida}
```

## Criar DATABASE
```
Após realizar a conexao com o banco de dados:
Criar database:
Name = gobarber
Template = sem template
Encoding = UTF-8
```
# gobarber

## CONFIGURAÇÃO DO BANCO DE DADOS
```
Executar:
docker run --name database -e POSTGRES_PASSWORD={mysecretpassword} -p {5432}:{5432} -d postgres:11
```
## Recomendo utilizar a GUI Client Postbird
```
URL -> https://electronjs.org/apps/postbird
* Com o docker rodando
host: localhost
port: {porta definida}
userName: postgres
password: {senha definida}
```
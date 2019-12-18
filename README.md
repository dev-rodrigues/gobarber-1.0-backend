# gobarber

## CONFIGURAÇÃO DO BANCO DE DADOS
```
Executar:
docker run --name database -e POSTGRES_PASSWORD={mysecretpassword} -p 5432:5432 -d postgres:11
```
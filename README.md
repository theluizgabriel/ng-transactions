
## 📋 Executando o app

Primeiramente entre na pasta inicial do projeto, depois através do terminal digite:

```
docker-compose up -d
```

Espere o docker concluir o carregamento dos containers e dar o start. Depois dê os seguintes comandos:

```
docker exec -it app_backend //bin/sh
```
```
npm run db:reset
```

## 📄 FRONTEND
Abra o projeto completo através do link:

```
https://localhost:3000/
```

## 🔎 Rotas


<details>
<summary><strong>REGISTER</strong></summary>
  
  > <strong>POST /register</strong>

   • Cadastrar uma conta na base de dados.

   <b>O endpoint deve receber a seguinte estrutura (Token deve ser passado no Header com a chave Authorization):</b>
   
```json
  {
    "username": "string",
    "password": "string"
  }
```
</details>
<details>
<summary><strong>LOGIN</strong></summary>
  
  > <strong>POST /login</strong>
  
   • Se o login for feito com sucesso retorna um token para o usuário.
   <b>O endpoint deve receber a seguinte estrutura:</b>
   
```json
  {
    "username": "string",
    "password": "string"
  }
```
</details>
<details>
<summary><strong>BALANCE</strong></summary>
  > <strong>GET /balance</strong>
  
  • Visualizar a quantia da conta logada
</details>

<details>
  <summary><strong>TRANSACTIONS</strong></summary>
  
  > <strong>GET /transactions</strong>
  
   • Retorna todas as transações ligadas a conta logada.
   
  > <strong>GET /transactions/:filter</strong>
    
     Filter = "cred" ou "deb"
     
   • Retorna a tabela filtrada por receber ou pagar

    exemplo: /transactions/cred retorna transações pagas pelo usuário logado
   
  
  > <strong>POST /transactions</strong>
     
   • Cadastra uma nova transação recebendo o usuário para quem quer transferir e a quantia com o seguinte corpo:
   ```json
  {
    "creditedAccountUser": "string",
    "value": "number"
  }
```
</details>
<details>
<summary><strong>USERS</strong></summary>
  > <strong>GET /user/:id</strong>
  Id » id do usuário a qual quer ver o username
  
  • Visualizar o nome do usuário pelo seu id
</details>

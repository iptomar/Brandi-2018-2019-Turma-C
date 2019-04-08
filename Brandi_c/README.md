# Brandi_c
# WEB SERVICES:
## GET /user/info
###### para ver se autenticado
### Recebe:
	nada
### Devolve:
	se com sucesso
	{
	   "error": 0,
	   "message": "Bem-vindo Teste Teste",
	   "res": {
	       "full_name": "Teste Teste",
	       "email": "teste123456@ipt.pt",
	       "address": "Teste",
	       "birthday": "02/04/1992",
	       "cellphone": "910123456",
	       "type_user": "User",
	       "id_type_user": 2
	   }
	}
se sem sucesso:
{
   "error": 1,
   "message": "Por favor efectue autenticação",
   "res": {}
} (edited) 

POST /auth - para se autenticar
recebe:
email - email do utilizador a autenticar
password - password do utilizador a autenticar
devolve:
se com sucesso
{
   "error": 0,
   "message": "Autenticado com sucesso",
   "res": {
       "full_name": "Teste Teste",
       "email": "teste123456@ipt.pt",
       "address": "Teste",
       "birthday": "02/04/1992",
       "cellphone": "910123456",
       "type_user": "User",
       "id_type_user": 2
   }
}
se sem sucesso:
{
   "error": 1,
   "message": "Ocurreu um erro na autenticaçăo, verifique se todos os campos săo válidos",
   "res": {}
} (edited) 
GET /logout- para sair
recebe:
-nada
devolve sempre:
{
   "error": 0,
   "message": "Sessão terminada com sucesso",
   "res": {}
}

Foram posteriormente adicionados 2 novos webservices:
POST /api/register:
recebe:
email - email a registar (obrigatório)
password - password do utilizador (obrigatório)
fullname - nome total do utilizador (obrigatório)
address - morada do utilizador
birthday - data de nascimento do utilizador deve conter esta estrutura: (yyyy-mm-dd)
cellphone - número de telemovel do utilizador
usertypeid - id do tipo de utilizador referente aos tipos de utilizador(neste momento 1 - Admin, 2 - User)
devolve:
se não forem dados todos os campos obrigatórios:
{
   "error": 1,
   "message": "Insira todos os campos obrigatórios",
   "res": {}
}
se ocorrer um erro ou introduzirem campos inválidos(ex: não respeitar formato da data):
{
   "error": 1,
   "message": "Ocorreu um erro no registo, verifique se todos os campos săo válidos",
   "res": {}
}
se for registado com sucesso:
{
   "error": 0,
   "message": "Registado com sucesso",
   "res": {
       "id": 22,
       "full_name": "Teste Registo",
       "email": "testee_registdo@ipt.pt",
       "address": "Rua do teste",
       "birthday": "1993-02-15",
       "cellphone": "",
       "type_user": "User",
       "id_type_user": 2,
       "last_login": "2019-03-09T19:28:40.913Z"
   }
}
se já estiver a ser utilizado esse email:
{
   "error": 1,
   "message": "Esse email já se encontra em utilização",
   "res": {}
}
se já se encontra autenticado neste momento:
{
   "error": 0,
   "message": "Utilizador já se encontra autenticado",
   "res": {
       "id": 22,
       "full_name": "Teste Registo",
       "email": "testee_registdo@ipt.pt",
       "address": "Rua do teste",
       "birthday": "1993-02-15",
       "cellphone": "",
       "type_user": "User",
       "id_type_user": 2,
       "last_login": "2019-03-09T19:28:40.913Z"
   }
}
GET /api/userlist:
(este ainda vai ser editado par asó os Admins possam ver)
recebe:
nada
devolve:
{
   "error": 0,
   "message": "",
   "res": {
       "users": [
           {
               "id": 2,
               "full_name": "Teste Teste",
               "email": "teste123456@ipt.pt",
               "address": "Teste",
               "birthday": "02/04/1992",
               "cellphone": "910123456",
               "type_user": "User",
               "id_type_user": 2,
               "last_login": "2019-03-09T19:26:37.000Z"
           },
           {
               "id": 20,
               "full_name": "Teste Registo",
               "email": "teste_registo@ipt.pt",
               "address": "Rua do teste",
               "birthday": "15/02/1993",
               "cellphone": "",
               "type_user": "User",
               "id_type_user": 2,
               "last_login": "2019-03-09T03:31:07.000Z"
           }
       ]
   }
}

Brandi_c

O back-end consiste no servidor responder a pedidos do cliente, estando a ser desenvolvido com Node.js e MariaDB 
Todos os webservices foram alterados para /api/ 
Foram adicionados 2 novos campos aos webservices que devolviam os dados do utilizador, sendo estes: 
id -> id do utilizador 
last_login -> data de �ltimo login do utilizador 

os webservices s�o: 
GET /auth - para ver se autenticado 
recebe: 
-nada 
devolve: 
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
"message": "Por favor efectue autentica��o", 
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
"message": "Ocurreu um erro na autentica�ao, verifique se todos os campos sao v�lidos", 
"res": {} 
} (edited) 
GET /logout- para sair 
recebe: 
-nada 
devolve sempre: 
{ 
"error": 0, 
"message": "Sess�o terminada com sucesso", 
"res": {} 
} 

Foram posteriormente adicionados 2 novos webservices: 
POST /api/register: 
recebe: 
email - email a registar (obrigat�rio) 
password - password do utilizador (obrigat�rio) 
fullname - nome total do utilizador (obrigat�rio) 
address - morada do utilizador 
birthday - data de nascimento do utilizador deve conter esta estrutura: (yyyy-mm-dd) 
cellphone - n�mero de telemovel do utilizador 
usertypeid - id do tipo de utilizador referente aos tipos de utilizador(neste momento 1 - Admin, 2 - User) 
devolve: 
se n�o forem dados todos os campos obrigat�rios: 
{ 
"error": 1, 
"message": "Insira todos os campos obrigat�rios", 
"res": {} 
} 
se ocorrer um erro ou introduzirem campos inv�lidos(ex: n�o respeitar formato da data): 
{ 
"error": 1, 
"message": "Ocorreu um erro no registo, verifique se todos os campos sao v�lidos", 
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
se j� estiver a ser utilizado esse email: 
{ 
"error": 1, 
"message": "Esse email j� se encontra em utiliza��o", 
"res": {} 
} 
se j� se encontra autenticado neste momento: 
{ 
"error": 0, 
"message": "Utilizador j� se encontra autenticado", 
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
(este ainda vai ser editado par as� os Admins possam ver) 
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
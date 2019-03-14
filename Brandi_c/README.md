# Brandi_c
<br/>O back-end consiste no servidor responder a pedidos do cliente, estando a ser desenvolvido com Node.js e MariaDB
<br/>Todos os webservices foram alterados para /api/<webservice>
<br/>Foram adicionados 2 novos campos aos webservices que devolviam os dados do utilizador, sendo estes:
<br/>id -> id do utilizador
<br/>last_login -> data de último login do utilizador
<br/>
<br/>os webservices são:
<br/>GET /auth - para ver se autenticado
<br/>recebe:
<br/>-nada
<br/>devolve:
<br/>se com sucesso
<br/>{
<br/>   "error": 0,
<br/>   "message": "Bem-vindo Teste Teste",
<br/>   "res": {
<br/>       "full_name": "Teste Teste",
<br/>       "email": "teste123456@ipt.pt",
<br/>       "address": "Teste",
<br/>       "birthday": "02/04/1992",
<br/>       "cellphone": "910123456",
<br/>       "type_user": "User",
<br/>       "id_type_user": 2
<br/>   }
<br/>}
<br/>se sem sucesso:
<br/>{
<br/>   "error": 1,
<br/>   "message": "Por favor efectue autenticação",
<br/>   "res": {}
<br/>} (edited) 
<br/>
<br/>POST /auth - para se autenticar
<br/>recebe:
<br/>email - email do utilizador a autenticar
<br/>password - password do utilizador a autenticar
<br/>devolve:
<br/>se com sucesso
<br/>{
<br/>   "error": 0,
<br/>   "message": "Autenticado com sucesso",
<br/>   "res": {
<br/>       "full_name": "Teste Teste",
<br/>       "email": "teste123456@ipt.pt",
<br/>       "address": "Teste",
<br/>       "birthday": "02/04/1992",
<br/>       "cellphone": "910123456",
<br/>       "type_user": "User",
<br/>       "id_type_user": 2
<br/>   }
<br/>}
<br/>se sem sucesso:
<br/>{
<br/>   "error": 1,
<br/>   "message": "Ocurreu um erro na autenticaçăo, verifique se todos os campos săo válidos",
<br/>   "res": {}
<br/>} (edited) 
<br/>GET /logout- para sair
<br/>recebe:
<br/>-nada
<br/>devolve sempre:
<br/>{
<br/>   "error": 0,
<br/>   "message": "Sessão terminada com sucesso",
<br/>   "res": {}
<br/>}
<br/>
<br/>Foram posteriormente adicionados 2 novos webservices:
<br/>POST /api/register:
<br/>recebe:
<br/>email - email a registar (obrigatório)
<br/>password - password do utilizador (obrigatório)
<br/>fullname - nome total do utilizador (obrigatório)
<br/>address - morada do utilizador
<br/>birthday - data de nascimento do utilizador deve conter esta estrutura: (yyyy-mm-dd)
<br/>cellphone - número de telemovel do utilizador
<br/>usertypeid - id do tipo de utilizador referente aos tipos de utilizador(neste momento 1 - Admin, 2 - User)
<br/>devolve:
<br/>se não forem dados todos os campos obrigatórios:
<br/>{
<br/>   "error": 1,
<br/>   "message": "Insira todos os campos obrigatórios",
<br/>   "res": {}
<br/>}
<br/>se ocorrer um erro ou introduzirem campos inválidos(ex: não respeitar formato da data):
<br/>{
<br/>   "error": 1,
<br/>   "message": "Ocorreu um erro no registo, verifique se todos os campos săo válidos",
<br/>   "res": {}
<br/>}
<br/>se for registado com sucesso:
<br/>{
<br/>   "error": 0,
<br/>   "message": "Registado com sucesso",
<br/>   "res": {
<br/>       "id": 22,
<br/>       "full_name": "Teste Registo",
<br/>       "email": "testee_registdo@ipt.pt",
<br/>       "address": "Rua do teste",
<br/>       "birthday": "1993-02-15",
<br/>       "cellphone": "",
<br/>       "type_user": "User",
<br/>       "id_type_user": 2,
<br/>       "last_login": "2019-03-09T19:28:40.913Z"
<br/>   }
<br/>}
<br/>se já estiver a ser utilizado esse email:
<br/>{
<br/>   "error": 1,
<br/>   "message": "Esse email já se encontra em utilização",
<br/>   "res": {}
<br/>}
<br/>se já se encontra autenticado neste momento:
<br/>{
<br/>   "error": 0,
<br/>   "message": "Utilizador já se encontra autenticado",
<br/>   "res": {
<br/>       "id": 22,
<br/>       "full_name": "Teste Registo",
<br/>       "email": "testee_registdo@ipt.pt",
<br/>       "address": "Rua do teste",
<br/>       "birthday": "1993-02-15",
<br/>       "cellphone": "",
<br/>       "type_user": "User",
<br/>       "id_type_user": 2,
<br/>       "last_login": "2019-03-09T19:28:40.913Z"
<br/>   }
<br/>}
<br/>GET /api/userlist:
<br/>(este ainda vai ser editado par asó os Admins possam ver)
<br/>recebe:
<br/>nada
<br/>devolve:
<br/>{
<br/>   "error": 0,
<br/>   "message": "",
<br/>   "res": {
<br/>       "users": [
<br/>           {
<br/>               "id": 2,
<br/>               "full_name": "Teste Teste",
<br/>               "email": "teste123456@ipt.pt",
<br/>               "address": "Teste",
<br/>               "birthday": "02/04/1992",
<br/>               "cellphone": "910123456",
<br/>               "type_user": "User",
<br/>               "id_type_user": 2,
<br/>               "last_login": "2019-03-09T19:26:37.000Z"
<br/>           },
<br/>           {
<br/>               "id": 20,
<br/>               "full_name": "Teste Registo",
<br/>               "email": "teste_registo@ipt.pt",
<br/>               "address": "Rua do teste",
<br/>               "birthday": "15/02/1993",
<br/>               "cellphone": "",
<br/>               "type_user": "User",
<br/>               "id_type_user": 2,
<br/>               "last_login": "2019-03-09T03:31:07.000Z"
<br/>           }
<br/>       ]
<br/>   }
<br/>}
<br/>


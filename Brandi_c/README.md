# Brandi_c
# WEB SERVICES:
## GET /api/user/info
###### para ver se autenticado
###Condições:
	nada
### Recebe:
	nada
### Devolve:
#####se com sucesso
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
#####se sem sucesso:
    {
       "error": 1,
       "message": "Por favor efectue autenticação",
       "res": {}
    }

------------
##POST /api/user/auth
######para se autenticar
###Condições:
	Não pode estar autenticado
###recebe:
    email - email do utilizador a autenticar
    password - password do utilizador a autenticar
###devolve:
######se com sucesso
    {
        "error": 0,
        "message": "Autenticado com sucesso",
        "res": {
            "id": 2,
            "full_name": "Teste2 Teste",
            "email": "teste123456@ipt.pt",
            "address": "Teste2",
            "birthday": "02/04/1992",
            "cellphone": "987654321",
            "type_user": "User",
            "id_type_user": 2,
            "last_login": "2019-04-08T01:35:56.456Z",
            "register_date": "2019-04-08T01:35:56.456Z",
            "title": "dont6",
            "qualifications": "have6"
        }
    }
######se sem sucesso:
    {
       "error": 1,
       "message": "Ocurreu um erro na autenticaçăo, verifique se todos os campos săo válidos",
       "res": {}
    }

------------
##GET /api/user/logout- para sair
######para efetuar o logout
###Condições:
	Tem que estar autenticado
###recebe:
	nada
###devolve sempre:
    {
       "error": 0,
       "message": "Sessão terminada com sucesso",
       "res": {}
    }

------------
##POST /api/user/register:
######para efetuar o regist de um utilizador
###Condições:
	Tem que estar autenticado
		Tem que ser Admin
###recebe:
    email - email a registar (obrigatório)
    password - password do utilizador (obrigatório)
    fullname - nome total do utilizador (obrigatório)
    address - morada do utilizador
    birthday - data de nascimento do utilizador deve conter esta estrutura: (yyyy-mm-dd)
    cellphone - número de telemovel do utilizador
    usertypeid - id do tipo de utilizador referente aos tipos de utilizador(neste momento 1 - Admin, 2 - User)
    title - titulo
    qualifications - qualificações
###devolve:
######se não tiver permissões:
    {
           "error": 3,
           "message": "Não tem permissões para registar utilizadores",
           "res": {}
     }
######se não forem dados todos os campos obrigatórios:
    {
       "error": 2,
       "message": "Insira todos os campos obrigatórios",
       "res": {}
    }
######se ocorrer um erro ou introduzirem campos inválidos(ex: não respeitar formato da data):
    {
       "error": 1,
       "message": "Ocorreu um erro no registo, verifique se todos os campos săo válidos",
       "res": {}
    }
######se for registado com sucesso:
    {
       "error": 0,
       "message": "Registado com sucesso",
        "res": {
            "id": 2,
            "full_name": "Teste2 Teste",
            "email": "teste123456@ipt.pt",
            "address": "Teste2",
            "birthday": "02/04/1992",
            "cellphone": "987654321",
            "type_user": "User",
            "id_type_user": 2,
            "last_login": "2019-04-08T01:35:56.456Z",
            "register_date": "2019-04-08T01:35:56.456Z",
            "title": "dont6",
            "qualifications": "have6"
        }
    }
######se já estiver a ser utilizado esse email:
    {
       "error": 1,
       "message": "Esse email já se encontra em utilização",
       "res": {}
    }
######se já se encontra autenticado neste momento:
    {
       "error": 0,
       "message": "Utilizador já se encontra autenticado",
            "res": {
                "id": 2,
                "full_name": "Teste2 Teste",
                "email": "teste123456@ipt.pt",
                "address": "Teste2",
                "birthday": "02/04/1992",
                "cellphone": "987654321",
                "type_user": "User",
                "id_type_user": 2,
                "last_login": "2019-04-08T01:35:56.456Z",
                "register_date": "2019-04-08T01:35:56.456Z",
                "title": "dont6",
                "qualifications": "have6"
            }
    }

------------
##GET /api/user/list:
######para ver a lista de utilizadores
###Condições:
	Tem que estar autenticado
		Tem que ser Admin
###recebe:
	search - palavara a ser utilizada na pesqusia (esta pesquisa no nome e no email)
###devolve se com sucesso:
    {
        "error": 0,
        "message": "Lista de utilizadores",
        "res": {
            "users": [
                {
                    "id": 1,
                    "full_name": "Luís Lopes",
                    "email": "aluno19055@ipt.pt",
                    "address": "qwerty",
                    "birthday": "10/04/1995",
                    "cellphone": "123456780",
                    "type_user": "Admin",
                    "id_type_user": 1,
                    "last_login": "2019-04-08T01:41:48.000Z",
                    "register_date": "2019-04-07T20:12:10.000Z",
                    "title": "dont2",
                    "qualifications": "have2"
                },
                {
                    "id": 3,
                    "full_name": "Nuno",
                    "email": "aluno20235@ipt.pt",
                    "address": "Entroncamento",
                    "birthday": "18/02/1973",
                    "cellphone": "NULL",
                    "type_user": "Admin",
                    "id_type_user": 1,
                    "last_login": "2019-04-07T12:03:52.000Z",
                    "register_date": "2019-04-07T12:03:52.000Z",
                    "title": "dont",
                    "qualifications": "have"
                }
            ]
        }
    }
######se não tiver permissões:
    {
           "error": 1,
           "message": "Não tem permissões para listar utilizadores",
           "res": {}
     }

------------
##POST /api/user/delete
######para eliminar um utilizador
###Condições:
	Tem que estar autenticado
		Tem que ser Admin
###recebe:
    id - id do utilizador a eliminar
###devolve:
######se com sucesso
    {
        "error": 0,
        "message": "Eliminido com sucesso",
        "res": {}
    }
######se o utilizador não for encontrado:
    {
       "error": 1,
       "message": "Utilizador não encontrado",
       "res": {}
    }
######se não forem dados todos os campos obrigatórios:
    {
       "error": 2,
       "message": "Insira todos os campos obrigatórios",
       "res": {}
    }
######se não tiver permissões:
    {
           "error": 3,
           "message": "Não tem permissões para eliminar utilizadores",
           "res": {}
     }

------------
##POST /api/user/changepassword
######para alterar password do utilizador autenticado
###Condições:
	Tem que estar autenticado
###recebe:
    password - password atual do utilizador
    newpassword - nova password a definir
###devolve:
######se com sucesso
    {
        "error": 0,
        "message": "Password alterada com sucesso",
        "res": {}
    }
######se a password antiga estiver incorreta:
    {
       "error": 1,
       "message": "Password incorreta",
       "res": {}
    }
######se não forem dados todos os campos obrigatórios:
    {
       "error": 2,
       "message": "Insira todos os campos obrigatórios",
       "res": {}
    }
######se não estiver autenticado:
    {
           "error": 3,
           "message": "Por favor efectue autenticação",
           "res": {}
     }

------------
##POST /api/user/change
######para alterar os dados de um utilizador (este pode ser os dados próprios ou caso seja admin de outrem)
###Condições:
	Tem que estar autenticado para alterar os seus próprios dados
	Tem que estar autenticado como Administrador para alterar dados de outrem
###recebe:
    id - id do utilizador a ser alterado (opcional e só valido para o administrador) <- se não introduzido utilizamos do utilizador autenticado
    fullname - nome total do utilizador
    address - morada do utilizador
    cellphone - número de telemovel do utilizador
    usertypeid - id do tipo de utilizador referente aos tipos de utilizador (opcional e só valido para o administrador)
    title - titulo
    qualifications - qualificações
###devolve:
######se com sucesso
    {
        "error": 0,
        "message": "Alterado com sucesso",
        "res": {}
    }
######se ocorrer um erro ou introduzirem campos inválidos(ex: não respeitar formato da data):
    {
       "error": 1,
       "message": "Ocorreu um erro na alteração do utilizador, verifique se todos os campos săo válidos",
       "res": {}
    }
######se não forem dados todos os campos obrigatórios:
    {
       "error": 2,
       "message": "Insira todos os campos obrigatórios",
       "res": {}
    }
######se não estiver autenticado ou  não tenha permissões para alterar o utilizador pretendido:
    {
           "error": 3,
           "message": "Não tem permissões para alterar o utilizador",
           "res": {}
     }

------------
##GET /api/user/type/list:
#####para listar os tipos de utilizador
###Condições:
	Tem que estar autenticado
		Tem que ser Admin
###recebe:
	search - palavara a ser utilizada na pesqusia (esta pesquisa no nome)
###devolve se com sucesso:
    {
        "error": 0,
        "message": "Lista de tipos de utilizador",
        "res": {
            "user_types": [
                {
                    "id": 1,
                    "name": "Admin"
                },
                {
                    "id": 2,
                    "name": "User"
                }
            ]
        }
    }
######se não tiver permissões:
    {
           "error": 1,
           "message": "Não tem permissões para listar tipos de utilizador",
           "res": {}
     }

------------
##POST /api/user/type/create:
######para criar um tipo de utilizador
###Condições:
	Tem que estar autenticado
		Tem que ser Admin
###recebe:
    name - nome do tipo de utilizador
###devolve:
######se não tiver permissões:
    {
           "error": 3,
           "message": "Não tem permissões para registar utilizadores",
           "res": {}
     }
######se não forem dados todos os campos obrigatórios:
    {
       "error": 2,
       "message": "Insira todos os campos obrigatórios",
       "res": {}
    }
######se ocorrer um erro ou introduzirem um nome que já exista:
    {
       "error": 1,
       "message": "Ocorreu um erro, provavelmente esse tipo de utilizador já existe",
       "res": {}
    }
######se for registado com sucesso:
    {
       "error": 0,
       "message": "Tipo de utilizador adicionado com sucesso",
        "res": {}
    }

------------
##POST /api/user/type/change:
######para alterar um tipo de utilizador
###Condições:
	Tem que estar autenticado
		Tem que ser Admin
###recebe:
	id - id do tipo de utilizador a alterar
	name - nome do tipo de utilizador
###devolve:
######se não tiver permissões:
    {
           "error": 3,
           "message": "Não tem permissões para registar utilizadores",
           "res": {}
     }
######se não forem dados todos os campos obrigatórios:
    {
       "error": 2,
       "message": "Insira todos os campos obrigatórios",
       "res": {}
    }
######se ocorrer um erro ou introduzirem um nome que já exista:
    {
       "error": 1,
       "message": "Ocorreu um erro, provavelmente o nome dado já existe",
       "res": {}
    }
######se for alterado com sucesso:
    {
       "error": 0,
       "message": "Tipo de utilizador alterado com sucesso",
        "res": {}
    }

------------
##POST /api/user/type/delete:
######para eliminar um tipo de utilizador
###Condições:
	Tem que estar autenticado
		Tem que ser Admin
###recebe:
	id - id do tipo de utilizador a alterar
###devolve:
######se não tiver permissões:
    {
           "error": 4,
           "message": "Não tem permissões para registar utilizadores",
           "res": {}
     }
######se não forem dados todos os campos obrigatórios:
    {
       "error": 3,
       "message": "Insira todos os campos obrigatórios",
       "res": {}
    }
######se ocorrer um erro ou existam utilizadores associados a este:
    {
       "error": 2,
       "message": "Ocorreu um erro, provavelmente existem utilizadores associados a este tipo",
       "res": {}
    }
######se ocorrer um erro ou não exista este tipo de utilizadores:
    {
       "error": 1,
       "message": "Esse tipo de utilizador não foi encontrado",
       "res": {}
    }
######se for eliminado com sucesso:
    {
       "error": 0,
       "message": "Tipo de utilizador alterado com sucesso",
        "res": {}
    }



﻿# Brandi_c
# WEB SERVICES:
## GET /api/user/info
##### para ver se autenticado
### Condições:
	nada
### Recebe:
	nada
### Devolve:
##### se com sucesso
	{
	   "error": 0,
	   "message": "Bem-vindo Teste Teste",
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
##### se sem sucesso:
	{
	   "error": 1,
	   "message": "Por favor efectue autenticação",
	   "res": {}
	}

------------
## POST /api/user/auth
> para se autenticar
### Condições:
	Não pode estar autenticado
### recebe:
	email - email do utilizador a autenticar
	password - password do utilizador a autenticar
### devolve:
##### se com sucesso
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
##### se sem sucesso:
	{
	   "error": 1,
	   "message": "Ocorreu um erro na autenticaçăo, verifique se todos os campos săo válidos",
	   "res": {}
	}

------------
## GET /api/user/logout- para sair
> para efetuar o logout
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### sempre:
	{
	   "error": 0,
	   "message": "Sessão terminada com sucesso",
	   "res": {}
	}

------------
## POST /api/user/register:
> para efetuar o regist de um utilizador
### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	email - email a registar (obrigatório)
	password - password do utilizador (obrigatório)
	fullname - nome total do utilizador (obrigatório)
	address - morada do utilizador
	birthday - data de nascimento do utilizador deve conter esta estrutura: (yyyy-mm-dd)
	cellphone - número de telemovel do utilizador
	usertypeid - id do tipo de utilizador referente aos tipos de utilizador(neste momento 1 - Admin, 2 - User)
	title - titulo
	qualifications - qualificações
### devolve:
##### se não tiver permissões:
	{
		   "error": 3,
		   "message": "Não tem permissões para registar utilizadores",
		   "res": {}
	 }
##### se não forem dados todos os campos obrigatórios:
	{
	   "error": 2,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### se ocorrer um erro ou introduzirem campos inválidos(ex: não respeitar formato da data):
	{
	   "error": 1,
	   "message": "Ocorreu um erro no registo, verifique se todos os campos săo válidos",
	   "res": {}
	}
##### se for registado com sucesso:
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
##### se já estiver a ser utilizado esse email:
	{
	   "error": 1,
	   "message": "Esse email já se encontra em utilização",
	   "res": {}
	}
##### se já se encontra autenticado neste momento:
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
## GET /api/user/list:
> para ver a lista de utilizadores
### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	search - palavara a ser utilizada na pesqusia (esta pesquisa no nome e no email)
### devolve:
##### se com sucesso:
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
##### se não tiver permissões:
	{
		   "error": 1,
		   "message": "Não tem permissões para listar utilizadores",
		   "res": {}
	 }

------------
## GET /api/user/listNames:
> para ver a lista de utilizadores
### Condições:
	Tem que estar autenticado
### recebe:
	search - palavara a ser utilizada na pesqusia (esta pesquisa no nome e no email)
### devolve:
##### se com sucesso:
	{
	    "error": 0,
	    "message": "Lista de utilizadores",
	    "res": {
	        "users": [
	            {
	                "id": 1,
	                "full_name": "admin@admin.admin"
	            },
	            {
	                "id": 2,
	                "full_name": "Nuno Marques"
	            },
	            {
	                "id": 3,
	                "full_name": "Virgílio Quintino"
	            },
	            {
	                "id": 7,
	                "full_name": "Filipe Branco"
	            },
	            {
	                "id": 5,
	                "full_name": "Mario"
	            },
	            {
	                "id": 6,
	                "full_name": "Maria"
	            },
	            {
	                "id": 8,
	                "full_name": "Nobody"
	            },
	            {
	                "id": 9,
	                "full_name": "andre"
	            },
	            {
	                "id": 10,
	                "full_name": "marcio"
	            },
	            {
	                "id": 12,
	                "full_name": "Teste User"
	            },
	            {
	                "id": 13,
	                "full_name": "%/#%#%(#%"
	            },
	            {
	                "id": 17,
	                "full_name": "marcio"
	            },
	            {
	                "id": 18,
	                "full_name": "marcio"
	            },
	            {
	                "id": 19,
	                "full_name": "marcio"
	            }
	        ]
	    }
	}
##### se não tiver permissões:
	{
		   "error": 1,
		   "message": "Não tem permissões para listar utilizadores",
		   "res": {}
	 }
------------
## POST /api/user/delete
>  para eliminar um utilizador
### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id - id do utilizador a eliminar
### devolve:
##### se com sucesso
	{
		"error": 0,
		"message": "Eliminido com sucesso",
		"res": {}
	}
##### se o utilizador não for encontrado:
	{
	   "error": 1,
	   "message": "Utilizador não encontrado",
	   "res": {}
	}
##### se não forem dados todos os campos obrigatórios:
	{
	   "error": 2,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### se não tiver permissões:
	{
		   "error": 3,
		   "message": "Não tem permissões para eliminar utilizadores",
		   "res": {}
	 }

------------
## POST /api/user/changepassword
> para alterar password do utilizador autenticado
### Condições:
	Tem que estar autenticado
### recebe:
	password - password atual do utilizador
	newpassword - nova password a definir
### devolve:
##### se com sucesso
	{
		"error": 0,
		"message": "Password alterada com sucesso",
		"res": {}
	}
##### se a password antiga estiver incorreta:
	{
	   "error": 1,
	   "message": "Password incorreta",
	   "res": {}
	}
##### se não forem dados todos os campos obrigatórios:
	{
	   "error": 2,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### se não estiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }

------------
## POST /api/user/change
> para alterar os dados de um utilizador (este pode ser os dados próprios ou caso seja admin de outrem)
### Condições:
	Tem que estar autenticado para alterar os seus próprios dados
	Tem que estar autenticado como Administrador para alterar dados de outrem
### recebe:
	id - id do utilizador a ser alterado (opcional e só valido para o administrador) <- se não introduzido utilizamos do utilizador autenticado
	fullname - nome total do utilizador
	address - morada do utilizador
	cellphone - número de telemovel do utilizador
	usertypeid - id do tipo de utilizador referente aos tipos de utilizador (opcional e só valido para o administrador)
	title - titulo
	qualifications - qualificações
	birthday - data de nascimento(formato: yyyy-mm-dd)
### devolve:
##### se com sucesso
	{
		"error": 0,
		"message": "Alterado com sucesso",
		"res": {}
	}
##### se ocorrer um erro ou introduzirem campos inválidos(ex: não respeitar formato da data):
	{
	   "error": 1,
	   "message": "Ocorreu um erro na alteração do utilizador, verifique se todos os campos săo válidos",
	   "res": {}
	}
##### se não forem dados todos os campos obrigatórios:
	{
	   "error": 2,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### se não estiver autenticado ou  não tenha permissões para alterar o utilizador pretendido:
	{
		   "error": 3,
		   "message": "Não tem permissões para alterar o utilizador",
		   "res": {}
	 }

------------
## GET /api/user/type/list:
> para listar os tipos de utilizador
### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	search - palavara a ser utilizada na pesqusia (esta pesquisa no nome)
### devolve:
##### se com sucesso:
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
##### se não tiver permissões:
	{
		   "error": 1,
		   "message": "Não tem permissões para listar tipos de utilizador",
		   "res": {}
	 }

------------
## POST /api/user/type/create:
> para criar um tipo de utilizador
### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	name - nome do tipo de utilizador
### devolve:
##### se não tiver permissões:
	{
		   "error": 3,
		   "message": "Não tem permissões para registar utilizadores",
		   "res": {}
	 }
##### se não forem dados todos os campos obrigatórios:
	{
	   "error": 2,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### se ocorrer um erro ou introduzirem um nome que já exista:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, provavelmente esse tipo de utilizador já existe",
	   "res": {}
	}
##### se for registado com sucesso:
	{
	   "error": 0,
	   "message": "Tipo de utilizador adicionado com sucesso",
		"res": {}
	}

------------
## POST /api/user/type/change:
> para alterar um tipo de utilizador
### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id - id do tipo de utilizador a alterar
	name - nome do tipo de utilizador
### devolve:
##### se não tiver permissões:
	{
		   "error": 3,
		   "message": "Não tem permissões para registar utilizadores",
		   "res": {}
	 }
##### se não forem dados todos os campos obrigatórios:
	{
	   "error": 2,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### se ocorrer um erro ou introduzirem um nome que já exista:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, provavelmente o nome dado já existe",
	   "res": {}
	}
##### se for alterado com sucesso:
	{
	   "error": 0,
	   "message": "Tipo de utilizador alterado com sucesso",
		"res": {}
	}

------------
## POST /api/user/type/delete:
> para eliminar um tipo de utilizador
### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id - id do tipo de utilizador a alterar
### devolve:
##### se não tiver permissões:
	{
		   "error": 4,
		   "message": "Não tem permissões para registar utilizadores",
		   "res": {}
	 }
##### se não forem dados todos os campos obrigatórios:
	{
	   "error": 3,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### se ocorrer um erro ou existam utilizadores associados a este:
	{
	   "error": 2,
	   "message": "Ocorreu um erro, provavelmente existem utilizadores associados a este tipo",
	   "res": {}
	}
##### se ocorrer um erro ou não exista este tipo de utilizadores:
	{
	   "error": 1,
	   "message": "Esse tipo de utilizador não foi encontrado",
	   "res": {}
	}
##### se for eliminado com sucesso:
	{
	   "error": 0,
	   "message": "Tipo de utilizador alterado com sucesso",
		"res": {}
	}
	
------------
## POST /api/datasheet/create:
> Cria ou atualiza dados da ficha técnica
### Condições:
	Tem que estar autenticado
### recebe:
	designation - designação do objeto (obrigatório)
	cearcproc - processo CEARC (obrigatório)
	cearcprocdata - data do processo CEARC
	cearcentrancedata - data de entrada CEARC
	lcrmproc - processo LCRM
	lcrmprocdata - data do processo LCRM
	lcrmentrancedata - data de entrada LCRM (obrigatório)
	coordinatorid - id do coordenador (obrigatório)
	super_category - id da super categoria (obrigatório)
	category - id da categoria (obrigatório)
	sub_category - id da sub categoria (obrigatório)
### devolve:
##### se não tiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se não forem dados todos os campos obrigatórios:
	{
	   "error": 2,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### se ocorrer um erro (por exemplo a data não conter um formato válido):
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for criado com sucesso:
	{
	   "error": 0,
	   "message": "Ficha técnica criada com sucesso",
		"res": {id: 5}
	}
	
------------
## POST /api/datasheet/edit/:id/page/:page
> Cria ou atualiza dados da ficha técnica
### Condições:
	Tem que estar autenticado
### recebe:
	:page = 1
		designation - designação do objeto (obrigatório)
		cearcproc - processo CEARC (obrigatório)
		cearcprocdata - data do processo CEARC
		cearcentrancedata - data de entrada CEARC
		lcrmproc - processo LCRM
		lcrmprocdata - data do processo LCRM
		lcrmentrancedata - data de entrada LCRM (obrigatório)
		coordinatorid - id do coordenador (obrigatório)
		super_category - id da super categoria,
		category - id da categoria(esta tem de estar associada a super categoria),
		sub_category - id da sub categoria(esta tem de estar associada a categoria)
:

	:page = 2 (não tem campos obrigatórios)
		dimensions - dimensões do objeto
		other_dimensions - outras dimensões
		tipology - tipologia do objeto
		site - localização
		object_owner -proprietário do objeto
		owner - dono da obra
		patron - mecenas
:

	:page = 3
		object_is_a_set - informação respetiva a se existe ou nao bem integrado em conjunto (obrigatório)
		set_type - tipo de conjunto do objecto
		elements - elementos do objeto
		set_materials - materiais do objeto
		set_inscriptions - inscrições no objeto
		set_mount - inscrições de Montagem do objeto
		set_build - inscrições de Construção
		classification - classificação do objeto
	    period - época do objeto
		quality - qualidade do objeto
		style - estilo do objeto
		materials_structure - materiais da estrutura do objeto
		materials_surface - materiais da superficie do objeto
		materials_elementsAccessories - materiais dos elementos acessórios do objeto
		techniques_structure - técnicas da estrutura do objeto
		techniques_surface - técnicas da superficie do objeto
		techniques_elementsAccessories - técnicas dos elementos acessórios do objeto
		small_description - pequena descrição do objeto
		analogies - analogias 
		conclusions - conclusões
		author - autor 
		dating - datação
		origin - origem
:

	:page = 4 (não tem campos obrigatórios)
		site_description - descrição do local
		cold_temp Frio- temperatura 
		hot_temp Quente- temperatura
		cold_humidity Frio-Humidade
		hot_humidity Frio-Humidade
		cold_start Frio- Início
		cold_end Frio- Fim
		hot_start Quente- Início
		hot_end Quente- Fim
		lightning_type_natural Radiação tipo natural
		lightning_origin_artificial Radiação tipo artificial
		artificial_lux Radiação artificial - valor Iluminância
		natural_lux Radiação natural - valor Iluminância
		artificial_uv Radiação artificial - Valor de U.V.
		natural_uv Radiação natural - Valor de U.V.
		natural_real_uv Radiação natural- Valor Real de U.V.
		artificial_real_uv Radiação artificial- Valor Real de U.V.
		poluting_agents - Agentes Poluidores
		poluting_sources - Fontes de poluição
		poluting_results - Resultados de poluição
		env_conclusions - Resultados
:

	:page = 5(não tem campos obrigatórios)
		tests_Q1-pergunta 1, checkbox
		tests_Q2-pergunta 2, checkbox
		tests_Q3-pergunta 3, checkbox
		tests_Q4-pergunta 4, checkbox
		tests_Q5-pergunta 5, checkbox
		tests_Q6-pergunta 6, checkbox
		tests_results-resultado dos testes
		tests_conclusions-conlcusão dos testes

:
		
	:page = 6(não tem campos obrigatórios)
		support_deterioration - Deterioração da Estrutura
		surface_deterioration - Deterioração da Superfície
		elements_deterioration - Deterioração dos Elementos Acessórios
		support_diagnostic - Diagnóstico da Estrutura
		surface_diagnostic - Diagnóstico da Superfície
		elements_diagnostic - Diagnóstico dos Elementos Acessórios
		conclusions_conservation - Conclusões do estado de conservação
:

	:page = 7(não tem campos obrigatórios)
		support - Estrutura da intervenção anterior
		surface - Superfície da intervenção anterior
		elements - Elementos Acessórios da intervenção anterior
		conclusions_previous_interventions - Conclusões de intervenções anteriores
:

	:page = 8(não tem campos obrigatórios)
		owner_preserve - Preservação Dono da Obra
		owner_conserve - Conservação Dono da Obra
		owner_restaure - Restauro Dono da Obra
		specific_aspects - Aspetos específicos - Dono da Obra
		prop_preserve - Preservação Proposta
		prop_conserve - Conservação Proposta
		prop_restaure - Restauro Proposta
		support_proposal - Estrutura Proposta
		support_resources - Recursos Estrutura
		surface_proposal - Superfície Proposta
		surface_resources - Recursos Superfície
		elements_proposal - Elementos Acessórios Proposta
		elements_resources - Recursos Elementos Acessórios
		observations - observações da proposta
		proposal_date - Data da Informação da Proposta
		acceptation_date - Data da Aceitação da Proposta
		ipt_intervinient - interveniente do ipt
		client_intervinient - cliente interveniente
:
	
	:page = 9(não tem campos obrigatórios)
		support_intervention - Estrutura da intervenção
		support_resources_intervention - Recursos da estrutura
		surface_intervention - Superfície da intervenção
		surface_resources_intervention - Recursos da estrutura
		elements_intervention - Elementos Acessórios da intervenção
		elements_resources_intervention - Recursos dos Elementos Acessórios
		observations_intervention - Observações da intervenção
				
	

### devolve:
##### se não tiver autenticado:
	{
		   "error": 4,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se não forem dados todos os campos obrigatórios:
	{
	   "error": 3,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### se a página dada for inválida:
	{
	   "error": 2,
	   "message": "Pagina não existente",
	   "res": {}
	}
##### se ocorrer um erro (por exemplo a data não conter um formato válido):
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for atualizado com sucesso:
	{
	   "error": 0,
	   "message": "Ficha técnica atualizada com sucesso",
		"res": {id: 5}
	}
	
------------
## GET /api/datasheet/list:

### Condições:
	Tem que estar autenticado
### recebe:
	search - palavra utilizada na pesquisa de fichas técnicas por nome
### devolve:
##### se não tiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro na aquisição da lista, por favor tente novamente",
	   "res": {}
	}
##### se for listado com sucesso:
	{
	    "error": 0,
	    "message": "Lista de fichas técnicas",
	    "res": {
	        "datasheets": [
	            {
	                "id": 1,
	                "object_designation": "Movel",
	                "image": "1.png"
	            },
	            {
	                "id": 2,
	                "object_designation": "sddfdfgsdf",
	                "image": "1.png"
	            }
	        ]
	    }
	}

	
------------
## GET /api/datasheet/:id

### Condições:
	Tem que estar autenticado
### recebe:
	search - palavra utilizada na pesquisa de fichas técnicas por nome
### devolve:
##### se não tiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro na aquisição do objeto, por favor tente novamente",
	   "res": {}
	}
##### se for listado com sucesso:
	{
	    "error": 0,
	    "message": "Objeto",
	    "res": {
	        "datasheet": {
	            "id": 1,
	            "object_designation": "O escolhido",
	            "CEARC_process": "123",
	            "CEARC_process_date": "2018-04-30T23:00:00.000Z",
	            "CEARC_entry_date": "2019-04-30T23:00:00.000Z",
	            "LCRM_process": "123",
	            "LCRM_process_date": "2018-04-30T23:00:00.000Z",
	            "LCRM_entry_date": "2019-04-30T23:00:00.000Z",
	            "coordinator": 1,
	            "last_modified_user": 1,
	            "last_modified_date": "2019-06-30T22:07:01.000Z",
	            "object_created_date": "2019-04-29T23:10:58.000Z",
	            "super_category": 25,
	            "category": 58,
	            "sub_category": 49,
	            "dimensions": "123,",
	            "other_dimensions": "12",
	            "tipology": "321",
	            "site": "321",
	            "object_owner": 1,
	            "owner": 6,
	            "patron": 1,
	            "object_is_a_set": 1,
	            "set_type": "test",
	            "set_elements": null,
	            "set_materials": "sangue, suor e lágrimas\n",
	            "set_inscriptions": "test2",
	            "set_mount": " test3",
	            "set_build": "test4",
	            "classification": "test5",
	            "period": 1,
	            "quality": 2,
	            "style": "dfghjkl",
	            "small_description": "test12",
	            "analogies": "test13",
	            "conclusions": "test14",
	            "author": "test15",
	            "dating": "123",
	            "origin": "test16",
	            "materials_structure": "test6",
	            "materials_surface": "test7",
	            "materials_elementsAccessories": "test8",
	            "techniques_structure": "test9",
	            "techniques_surface": "test10",
	            "techniques_elementsAccessories": "test11",
	            "site_description": "test1266",
	            "cold_temp": "123",
	            "hot_temp": "123",
	            "cold_humidity": "123",
	            "hot_humidity": "123",
	            "cold_start": 1,
	            "cold_end": 2,
	            "hot_start": 3,
	            "hot_end": 4,
	            "lightning_type_natural": "test17",
	            "lightning_origin_artificial": "test18",
	            "artificial_lux": "123",
	            "natural_lux": "123",
	            "artificial_uv": "123",
	            "natural_uv": "123",
	            "artificial_real_uv": "123",
	            "natural_real_uv": "123",
	            "poluting_agents": "test25",
	            "poluting_sources": "test26",
	            "poluting_results": "test27",
	            "env_conclusions": "test28",
	            "support_deterioration": "test29",
	            "surface_deterioration": "test30",
	            "elements_deterioration": "test31",
	            "support_diagnostic": "test32",
	            "surface_diagnostic": "test33",
	            "elements_diagnostic": "test34",
	            "conclusions_conservation": "test35",
	            "support": "test36",
	            "surface": "test37",
	            "elements": "teste38",
	            "conclusions_previous_interventions": "test39",
	            "owner_preserve": 1,
	            "owner_conserve": 0,
	            "owner_restaure": 0,
	            "specific_aspects": "test40",
	            "prop_preserve": 0,
	            "prop_conserve": 0,
	            "prop_restaure": 0,
	            "support_proposal": "test44",
	            "support_resources": "test45",
	            "surface_proposal": null,
	            "surface_resources": "test46",
	            "elements_proposal": null,
	            "elements_resources": "test48",
	            "observations": "test49",
	            "proposal_date": "2018-06-11T23:00:00.000Z",
	            "acceptation_date": "2018-11-14T00:00:00.000Z",
	            "support_intervention": "test50",
	            "support_resources_intervention": "test51",
	            "surface_intervention": "test52",
	            "surface_resources_intervention": "test53",
	            "elements_intervention": "test54",
	            "elements_resources_intervention": "test55",
	            "observations_intervention": "test56",
	            "ipt_intervinient": 21,
	            "client_intervinient": 11,
	            "tests_Q1": 1,
	            "tests_Q2": 0,
	            "tests_Q3": 1,
	            "tests_Q4": 0,
	            "tests_Q5": 0,
	            "tests_Q6": 0,
	            "tests_results": "q",
	            "tests_conclusions": "q",
	            "images": [
	                "3.jpg",
	                "4.jpg"
	            ]
	        }
	    }
	}	
------------
## GET /api/datasheet/super_categories/list:

### Condições:
	Tem que estar autenticado
### recebe:
	search - palavra utilizada na pesquisa por nome
### devolve:
##### se não tiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro na aquisição da lista, por favor tente novamente",
	   "res": {}
	}
##### se for listado com sucesso:
	{
	    "error": 0,
	    "message": "Lista de super categorias",
	    "res": {
	        "super_categories": [
	            {
	                "id": 3,
	                "supercategory": "Artes plásticas / Artes decorativas"
	            },
	            {
	                "id": 1,
	                "supercategory": "Bens Culturais"
	            },
	            {
	                "id": 2,
	                "supercategory": "Mobiliário Religioso"
	            }
	        ]
	    }
	}

------------
## GET /api/datasheet/categories/list:

### Condições:
	Tem que estar autenticado
### recebe:
	super_category - id da super categoria
	search - palavra utilizada na pesquisa por nome
### devolve:
##### se não tiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se não for introduzido o id da super categoria:
	{
		   "error": 2,
		   "message": "O id da super categoria é obrigatório",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro na aquisição da lista, por favor tente novamente",
	   "res": {}
	}
##### se for listado com sucesso:
	
	{
	    "error": 0,
	    "message": "Lista de categorias",
	    "res": {
	        "categories": [
	            {
	                "id": 1,
	                "category": "Bens Culturais Móveis",
	                "id_super_category": 1
	            },
	            {
	                "id": 4,
	                "category": "Bens Culturais Móveis integrados",
	                "id_super_category": 1
	            },
	            {
	                "id": 7,
	                "category": "Bens móveis",
	                "id_super_category": 1
	            },
	            {
	                "id": 8,
	                "category": "Brinquedo",
	                "id_super_category": 1
	            },
	            {
	                "id": 9,
	                "category": "Móvel Integrado",
	                "id_super_category": 1
	            }
	        ]
	    }
	}

------------
## GET /api/datasheet/sub_categories/list:

### Condições:
	Tem que estar autenticado
### recebe:
	category - id da categoria
	search - palavra utilizada na pesquisa por nome
### devolve:
##### se não tiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se não for introduzido o id da super categoria:
	{
		   "error": 2,
		   "message": "O id da categoria é obrigatório",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro na aquisição da lista, por favor tente novamente",
	   "res": {}
	}
##### se for listado com sucesso:
	
	{
	    "error": 0,
	    "message": "Lista de sub categorias",
	    "res": {
	        "sub_categories": [
	            {
	                "id": 2,
	                "subcategory": "Mobiliário",
	                "id_category": 1
	            },
	            {
	                "id": 4,
	                "subcategory": "Mobiliário civil",
	                "id_category": 1
	            },
	            {
	                "id": 6,
	                "subcategory": "Mobiliário Religioso",
	                "id_category": 1
	            },
	            {
	                "id": 7,
	                "subcategory": "Retabulística / Escultura / Talha",
	                "id_category": 1
	            },
	            {
	                "id": 22,
	                "subcategory": "Teste Super 867",
	                "id_category": 1
	            }
	        ]
	    }
	}

------------
## POST/api/datasheet/super_categories/create:

### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	name - nome da super categoria
### devolve:
##### se não tiver autenticado:
	{
		   "error": 4,
		   "message": "Não tem permissões para criar super categorias",
		   "res": {}
	 }
##### se não não for introduzido todos os campos obrigatórios:
	{
		   "error": 3,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }
##### se não for introduzido o id da super categoria:
	{
		   "error": 2,
		   "message": "Já existe uma super categoria com esse nome",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for criado com sucesso:
	{
	    "error": 0,
	    "message": "Super categoria criada com sucesso",
	    "res": {
	        "id": 4
	    }
	}

------------
## POST/api/datasheet/categories/create:

### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id_super_category - id da super categoria a que a categoria ira pertencer
	name - nome da categoria
### devolve:
##### se não tiver autenticado:
	{
		   "error": 4,
		   "message": "Não tem permissões para criar categorias",
		   "res": {}
	 }
##### se não não for introduzido todos os campos obrigatórios:
	{
		   "error": 3,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }
##### se não for introduzido o id da super categoria:
	{
		   "error": 2,
		   "message": "Já existe uma categoria com esse nome associada a super categoria indicada",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for criado com sucesso:
	{
	    "error": 0,
	    "message": "Categoria criada com sucesso",
	    "res": {
	        "id": 13
	    }
	}
	
------------
## POST/api/datasheet/sub_categories/create:

### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id_category - id da categoria a que a sub categoria ira pertencer
	name - nome da sub categoria
### devolve:
##### se não tiver autenticado:
	{
		   "error": 4,
		   "message": "Não tem permissões para criar sub categorias",
		   "res": {}
	 }
##### se não não for introduzido todos os campos obrigatórios:
	{
		   "error": 3,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }
##### se não for introduzido o id da super categoria:
	{
		   "error": 2,
		   "message": "Já existe uma sub categoria com esse nome associada a categoria indicada",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for criado com sucesso:
	{
	    "error": 0,
	    "message": "Sub categoria criada com sucesso",
	    "res": {
	        "id": 23
	    }
	}

------------
## POST/api/datasheet/super_categories/change:

### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id_super_category - id da super categoria a editar
	name - nome da super categoria
### devolve:
##### se não tiver autenticado:
	{
		   "error": 4,
		   "message": "Não tem permissões para alterar super categorias",
		   "res": {}
	 }
##### se não não for introduzido todos os campos obrigatórios:
	{
		   "error": 3,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }
##### se já existir uma super categoria com o mesmo nome:
	{
		   "error": 2,
		   "message": "Já existe uma super categoria com esse nome",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for alterado com sucesso:
	{
	    "error": 0,
	    "message": "Super Categoria alterada com sucesso",
	    "res": {}
	}
	
------------
## POST/api/datasheet/categories/change:

### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id_category - id da categoria a alterar
	name - nome da categoria
### devolve:
##### se não tiver autenticado:
	{
		   "error": 4,
		   "message": "Não tem permissões para alterar categorias",
		   "res": {}
	 }
##### se não não for introduzido todos os campos obrigatórios:
	{
		   "error": 3,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }
##### se já existir uma categoria com o mesmo nome e com a mesma super categoria associada:
	{
		   "error": 2,
		   "message": "Já existe uma categoria com esse nome associada a super categoria indicada",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for alterado com sucesso:
	{
	    "error": 0,
	    "message": "Categoria alterada com sucesso",
	    "res": {}
	}
	
------------
## POST/api/datasheet/sub_categories/change:

### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id_sub_category - id da sub categoria a alterar
	name - nome da sub categoria
### devolve:
##### se não tiver autenticado:
	{
		   "error": 4,
		   "message": "Não tem permissões para alterar sub categorias",
		   "res": {}
	 }
##### se não não for introduzido todos os campos obrigatórios:
	{
		   "error": 3,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }
##### se já existir uma sub categoria com o mesmo nome e com a mesma categoria associada:
	{
		   "error": 2,
		   "message": "Já existe uma sub categoria com esse nome associada a categoria indicada",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for alterado com sucesso:
	{
	    "error": 0,
	    "message": "Sub Categoria alterada com sucesso",
	    "res": {}
	}
	
------------
## POST/api/datasheet/sub_categories/delete:

### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id_sub_category - id da sub categoria a eliminar
### devolve:
##### se não tiver autenticado:
	{
		   "error": 4,
		   "message": "Não tem permissões para eliminar sub categorias",
		   "res": {}
	 }
##### se não não for introduzido todos os campos obrigatórios:
	{
		   "error": 3,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }
##### se a sub categoria estiver a ser utilizada num objeto:
	{
		   "error": 2,
		   "message": "Essa sub categoria está ja em utilização, é impossivel de eliminar a mesma",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for eliminado com sucesso:
	{
	    "error": 0,
	    "message": "Sub Categoria eliminada com sucesso",
	    "res": {}
	}
	
------------
## POST/api/datasheet/categories/delete:

### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id_category - id da categoria a eliminar
### devolve:
##### se não tiver autenticado:
	{
		   "error": 4,
		   "message": "Não tem permissões para eliminar categorias",
		   "res": {}
	 }
##### se não não for introduzido todos os campos obrigatórios:
	{
		   "error": 3,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }
##### se a sub categoria estiver a ser utilizada num objeto:
	{
		   "error": 2,
		   "message": "Essa categoria está ja em utilização, é impossivel de eliminar a mesma",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for eliminado com sucesso:
	{
	    "error": 0,
	    "message": "Categoria eliminada com sucesso",
	    "res": {}
	}
	
------------
## POST/api/datasheet/super_categories/delete:

### Condições:
	Tem que estar autenticado
		Tem que ser Admin
### recebe:
	id_super_category - id da super categoria a eliminar
### devolve:
##### se não tiver autenticado:
	{
		   "error": 4,
		   "message": "Não tem permissões para eliminar super categorias",
		   "res": {}
	 }
##### se não não for introduzido todos os campos obrigatórios:
	{
		   "error": 3,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }
##### se a sub categoria estiver a ser utilizada num objeto:
	{
		   "error": 2,
		   "message": "Essa super categoria está ja em utilização, é impossivel de eliminar a mesma",
		   "res": {}
	 }
##### se ocorrer um erro:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for eliminado com sucesso:
	{
	    "error": 0,
	    "message": "Super Categoria eliminada com sucesso",
	    "res": {}
	}

------------
## POST/api/datasheet/delete_image/:id/:image :
	:id -> id do objeto
	:image -> nome da imagem

### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se não existir a imagem:
	{
	   "error": 1,
	   "message": "A imagem não existe",
	   "res": {}
	}
##### se for eliminado com sucesso:
	{
	    "error": 0,
	    "message": "Imagem apagada",
	    "res": {}
	}

------------
## POST/api/datasheet/get_image/:id/:image :
	:id -> id do objeto
	:image -> nome da imagem

### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	estado 401(Unauthorized)
##### se não existir a imagem:
	devolve a imagem por defeito
##### se a imagem existir
	devovle a imagem pedida

------------
## POST/api/datasheet/send_image/:id :
	:id -> id do objeto
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se não existir a imagem:
	{
	   "error": 1,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### se for eliminado com sucesso:
	{
	    "error": 0,
	    "message": "Imagem enviada com sucesso",
	    "res": {file: "1.png"}
	}

------------
## POST/api/datasheet/contacts/create:
### Condições:
	Tem que estar autenticado
### recebe:
	full_name - nome do contacto
	address - morada do contacto
	email - email do contacto
	phone - telemóvel do contacto
### devolve:
##### se não estiver autenticado:
	{
		   "error": 6,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se não for inserido todos os campos obrigatórios:
	{
	   "error": 5,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### já existe um contacto com o email:
	{
	   "error": 4,
	   "message": "Já existe um contacto com esse email",
	   "res": {}
	}
#####  já existe um contacto com o contacto:
	{
	   "error": 3,
	   "message": "Já existe um contacto com esse contacto",
	   "res": {}
	}
#####  já existe um contacto com o nome:
	{
	   "error": 2,
	   "message": "Já existe um contacto com esse nome",
	   "res": {}
	}
##### ocorreu um erro inesperado:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for criado com sucesso:
	{
	    "error": 0,
	    "message": "Contacto criado com sucesso",
	    "res": {id: 23}
	}
------------
## POST/api/datasheet/contacts/change/:id :
	:id - id do contacto a alterar
### Condições:
	Tem que estar autenticado
### recebe:
	full_name - nome do contacto
	address - morada do contacto
	email - email do contacto
	phone - telemóvel do contacto
### devolve:
##### se não estiver autenticado:
	{
		   "error": 6,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se não for inserido todos os campos obrigatórios:
	{
	   "error": 5,
	   "message": "Insira todos os campos obrigatórios",
	   "res": {}
	}
##### já existe um contacto com o email:
	{
	   "error": 4,
	   "message": "Já existe um contacto com esse email",
	   "res": {}
	}
#####  já existe um contacto com o contacto:
	{
	   "error": 3,
	   "message": "Já existe um contacto com esse contacto",
	   "res": {}
	}
#####  já existe um contacto com o nome:
	{
	   "error": 2,
	   "message": "Já existe um contacto com esse nome",
	   "res": {}
	}
##### ocorreu um erro inesperado:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
	   "res": {}
	}
##### se for alterado com sucesso:
	{
	    "error": 0,
	    "message": "Contacto alterado com sucesso",
	    "res": {}
	}

------------
## POST/api/datasheet/contacts/delete/:id :
	:id - id do contacto a eliminar
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se o contacto estiver a ser utilizado num objeto:
	{
	   "error": 2,
	   "message": "O contacto está a ser utilizado, não pode ser apagado",
	   "res": {}
	}
##### ocorreu um erro inesperado:
	{
	   "error": 1,
	   "message": "Ocorreu um erro, o contacto pode já não existir",
	   "res": {}
	}
##### se for eliminado com sucesso:
	{
	    "error": 0,
	    "message": "Contacto eliminado com sucesso",
	    "res": {}
	}

------------
## POST/api/datasheet/contacts/list :
### Condições:
	Tem que estar autenticado
### recebe:
	search - palavra de pesquisa, pesquisa em: nome, morada, email e contacto
### devolve:
##### se não estiver autenticado:
	{
		   "error": 1,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se for listado com sucesso:
	{
	    "error": 0,
	    "message": "Contactos",
	    "res": {
	        "contacts": [
	            {
	                "id": 1,
	                "full_name": "Teste",
	                "address": "teste",
	                "email": "teste",
	                "phone": "teste"
	            },
	            {
	                "id": 3,
	                "full_name": "teste3",
	                "address": "teste3",
	                "email": "teste3",
	                "phone": "teste3"
	            },
	            {
	                "id": 4,
	                "full_name": "teste",
	                "address": "address",
	                "email": "teste@teste.teste",
	                "phone": "123456789"
	            },
	            {
	                "id": 5,
	                "full_name": "teste",
	                "address": "address",
	                "email": "teste@teste.test",
	                "phone": "12345678"
	            },
	            {
	                "id": 6,
	                "full_name": "teste32",
	                "address": "address",
	                "email": "teste@teste.testee",
	                "phone": "1234567892"
	            }
	        ]
		}
	}

------------
## POST/api/datasheet/contacts/:id :
	:id - id do contacto a que se quer as informações
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se o contacto não existir:
	{
		   "error": 1,
		   "message": "O contacto não foi encontrado",
		   "res": {}
	 }
##### se for listado com sucesso:
	{
	    "error": 0,
	    "message": "Contacto",
	    "res": {
	        "contact": {
	            "id": 4,
	            "full_name": "teste",
	            "address": "address",
	            "email": "teste@teste.teste",
	            "phone": "123456789"
	        }
	    }
	}

------------
## POST/api/datasheet/sources/list/:id_object:
	:id_object- id do obejto associado a fonte
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 1,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se for listado com sucesso:
	{
	    "error": 0,
	    "message": "Fontes",
	    "res": {
	        "sources": [
	            {
	                "id": 5,
	                "object_id": 1,
	                "source_type_set": 0,
	                "source": "teste",
	                "source_type": "teste",
	                "source_site": "teste",
	                "source_quota": "teste",
	                "source_date": "2018-01-02T00:00:00.000Z"
	            },
	            {
	                "id": 7,
	                "object_id": 1,
	                "source_type_set": 2,
	                "source": "asdasdsadas\ndas\ndasd\nsada",
	                "source_type": "qwe",
	                "source_site": "wqeqweqwe",
	                "source_quota": "qweqwe",
	                "source_date": null
	            }
	        ]
	    }
	}
------------
## POST/api/datasheet/sources/change/:id
	:id - id da fonte
### Condições:
	Tem que estar autenticado
### recebe:
	source_type_set - se é um set
	source - source
	source_type - typo de source
	source_site - site da source
	source_quota - quota da source
	source_date - data de criação da fonte
### devolve:
##### se não estiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se todos os campos que são obrigatórios não estiverem inseridos:
	{
		   "error": 2,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }

##### se algum dos campos estiver mal definido:
	{
		   "error": 1,
		   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
		   "res": {}
	 }
##### se for alterado com sucesso:
	{
	    "error": 0,
	    "message": "Fonte altearada com sucesso",
	    "res": {}
	    
------------
## POST/api/datasheet/sources/create
### Condições:
	Tem que estar autenticado
### recebe:
	source_type_set - se é um set
	source - source
	source_type - typo de source
	source_site - site da source
	source_quota - quota da source
	source_date - data de criação da fonte
### devolve:
##### se não estiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se todos os campos que são obrigatórios não estiverem inseridos:
	{
		   "error": 2,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }

##### se algum dos campos estiver mal definido:
	{
		   "error": 1,
		   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
		   "res": {}
	 }
##### se for criado com sucesso:
	{
	    "error": 0,
	    "message": "Fonte criada com sucesso",
	    "res": {
			id: 2
		}	 

------------
## POST/api/datasheet/sources/delete/:id
	:id - id da fonte
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se ocorrer erro
	{
		   "error": 1,
		   "message": "Ocorreu um erro, a fonte pode já não existir",
		   "res": {}
	 }

##### se for eliminado com sucesso:
	{
	    "error": 0,
	    "message": "Fonte apagada com sucesso",
	    "res": {}	 

       
 ------------
## POST/api/datasheet/sources/:id
	:id - id da fonte
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se ocorrer erro
	{
		   "error": 1,
		   "message": "Ocorreu um erro, a fonte pode já não existir",
		   "res": {}
	 }

##### se for listado com sucesso:
	{
	    "error": 0,
	    "message": "Fonte",
	    "res": {
	        "source": {
	            "id": 7,
	            "object_id": 1,
	            "source_type_set": 2,
	            "source": "asdasdsadas\ndas\ndasd\nsada",
	            "source_type": "qwe",
	            "source_site": "wqeqweqwe",
	            "source_quota": "qweqwe",
	            "source_date": null
	        }
	    }
	}

------------
## POST/api/datasheet/tests/list/:id_object:
	:id_object- id do obejto associado a fonte
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 1,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se for listado com sucesso:
	
	{
	    "error": 0,
	    "message": "Exames",
	    "res": {
	        "tests": [
	            {
	                "id": 2,
	                "id_object": 1,
	                "type_reference": " asds",
	                "location": " ssdsdsd",
	                "objectives": " ssdsavd",
	                "technician": 2,
	                "technician_name": "Nuno Marques",
	                "analysis_DATE": "2019-06-29T23:00:00.000Z",
	                "results": "sfdgh-abcd"
	            }
	        ]
	    }
	}
	
------------
## POST/api/datasheet/tests/change/:id
	:id - id da fonte
### Condições:
	Tem que estar autenticado
### recebe:
	type_reference-tipo de referencia
	location-localização do exame
	objectives-objetivos do exame
	technician técnico do exame
	results-resultados do exame
### devolve:
##### se não estiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se todos os campos que são obrigatórios não estiverem inseridos:
	{
		   "error": 2,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }

##### se algum dos campos estiver mal definido:
	{
		   "error": 1,
		   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
		   "res": {}
	 }
##### se for alterado com sucesso:
	{
	    "error": 0,
	    "message": "Exame altearado com sucesso",
	    "res": {}
	    
------------
## POST/api/datasheet/tests/create
### Condições:
	Tem que estar autenticado
### recebe:
	type_reference-tipo de referencia
	location-localização do exame
	objectives-objetivos do exame
	technician técnico do exame
	results-resultados do exame
### devolve:
##### se não estiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se todos os campos que são obrigatórios não estiverem inseridos:
	{
		   "error": 2,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }

##### se algum dos campos estiver mal definido:
	{
		   "error": 1,
		   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
		   "res": {}
	 }
##### se for criado com sucesso:
	{
	    "error": 0,
	    "message": "Exame criado com sucesso",
	    "res": {
	        "id": 3
	    }
	}	 

------------
## POST/api/datasheet/tests/delete/:id
	:id - id da fonte
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se ocorrer erro
	{
		   "error": 1,
		   "message": "Ocorreu um erro, o exame pode já não existir",
		   "res": {}
	 }

##### se for eliminado com sucesso:
	{
	    "error": 0,
	    "message": "Exame apagado com sucesso",
	    "res": {}	 

       
 ------------
## POST/api/datasheet/tests/:id
	:id - id da fonte
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se ocorrer erro
	{
		   "error": 1,
		   "message": "Ocorreu um erro, o exame pode não existir",
		   "res": {}
	 }

##### se for listado com sucesso:
		{
	    "error": 0,
	    "message": "Exame",
	    "res": {
	        "source": {
	            "id": 2,
	            "id_object": 1,
	            "type_reference": " asds",
	            "location": " ssdsdsd",
	            "objectives": " ssdsavd",
	            "technician": 2,
	            "analysis_DATE": "2019-06-29T23:00:00.000Z",
	            "results": "sfdgh-abcd"
	        }
	    }
	}
------------
## POST/api/datasheet/worksheet/list/:id_object:
	:id_object- id do obejto associado a fonte
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 1,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se for listado com sucesso:
	{
	    "error": 0,
	    "message": "Folhas de Obras",
	    "res": {
	        "worksheets": [
	            {
	                "id": 2,
	                "object_id": 1,
	                "worksheet_date": "2019-01-02T00:00:00.000Z",
	                "procedure_type": " asddsd",
	                "observations": " sdsadsdsa",
	                "materials": " dda-- new text",
	                "amount": 9,
	                "duration": 5,
	                "technician": 1,
	                "technician_name": "admin@admin.admin"
	            },
	            {
	                "id": 3,
	                "object_id": 1,
	                "worksheet_date": "2019-01-03T00:00:00.000Z",
	                "procedure_type": " asddsd",
	                "observations": " sdsadsdsa",
	                "materials": " dda-- new text",
	                "amount": 9,
	                "duration": 5,
	                "technician": 1,
	                "technician_name": "admin@admin.admin"
	            },
	            {
	                "id": 4,
	                "object_id": 1,
	                "worksheet_date": "2019-01-06T00:00:00.000Z",
	                "procedure_type": " asddsd",
	                "observations": " sdsadsdsa",
	                "materials": " dda-- new text second",
	                "amount": 9,
	                "duration": 5,
	                "technician": 1,
	                "technician_name": "admin@admin.admin"
	            },
	            {
	                "id": 5,
	                "object_id": 1,
	                "worksheet_date": "2019-01-06T00:00:00.000Z",
	                "procedure_type": " asddsd",
	                "observations": " sdsadsdsa",
	                "materials": " dda-- new text second",
	                "amount": 9,
	                "duration": 5,
	                "technician": 1,
	                "technician_name": "admin@admin.admin"
	            }
	        ]
	    }
	}
## POST/api/datasheet/worksheet/change/:id
	:id - id da fonte
### Condições:
	Tem que estar autenticado
### recebe:
	worksheet_date-data da folha de obra
	 procedure_type-tipo de procedimento
	 observations-observações
	 materials-materiais da obra
	 amount-quantidades
	 duration-duração do processo
	 technician-técnico da obra
### devolve:
##### se não estiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se todos os campos que são obrigatórios não estiverem inseridos:
	{
		   "error": 2,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }

##### se algum dos campos estiver mal definido:
	{
		   "error": 1,
		   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
		   "res": {}
	 }
##### se for alterado com sucesso:
	{
	    "error": 0,
	    "message": "Folha de obra altearada com sucesso",
	    "res": {}
	    
------------
## POST/api/datasheet/worksheet/create
### Condições:
	Tem que estar autenticado
### recebe:
	 worksheet_date-data da folha de obra
	 procedure_type-tipo de procedimento
	 observations-observações
	 materials-materiais da obra
	 amount-quantidades
	 duration-duração do processo
	 technician-técnico da obra
### devolve:
##### se não estiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se todos os campos que são obrigatórios não estiverem inseridos:
	{
		   "error": 2,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }

##### se algum dos campos estiver mal definido:
	{
		   "error": 1,
		   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
		   "res": {}
	 }
##### se for criado com sucesso:
	{
	    "error": 0,
	    "message": "Folha de obra criada com sucesso",
	    "res": {
	        "id": 3
	    }
	}	 

------------
## POST/api/datasheet/worksheet/delete/:id
	:id - id da fonte
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticação",
		   "res": {}
	 }
##### se ocorrer erro
	{
		   "error": 1,
		   "message": "Ocorreu um erro, a folha de obra pode já não existir",
		   "res": {}
	 }

##### se for eliminado com sucesso:
	{
	    "error": 0,
	    "message": "Folha de obra apagada com sucesso",
	    "res": {}	 

       
 ------------
## POST/api/datasheet/worksheet/:id
	:id - id da fonte
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 2,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se ocorrer erro
	{
		   "error": 1,
		   "message": "Ocorreu um erro, a ficha de obra pode não existir",
		   "res": {}
	 }

##### se for listado com sucesso:
		{
	    "error": 0,
	    "message": "Folha de obra",
	    "res": {
	        "source": {
	            "id": 5,
	            "object_id": 1,
	            "worksheet_date": "2019-01-06T00:00:00.000Z",
	            "procedure_type": " asddsd",
	            "observations": " sdsadsdsa",
	            "materials": " dda-- new text second",
	            "amount": 9,
	            "duration": 5,
	            "technician": 1
	        }
	    }
	}

------------
## POST/api/datasheet/solubility/list/:id_object:
	:id_object- id do obejto associado a fonte
### Condições:
	Tem que estar autenticado
### recebe:
	nada
### devolve:
##### se não estiver autenticado:
	{
		   "error": 1,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se for listado com sucesso:
	{
	    "error": 0,
	    "message": "Teste de solubilidade",
	    "res": {
	        "solubilities": [
	            {
	                "id": 1,
	                "object_id": 1,
	                "description": "sddsds ",
	                "features": "sdsa ",
	                "technician": 2,
	                "solub_date": "2017-09-07T23:00:00.000Z",
	                "technician_name": "Nuno Marques"
	            },
	            {
	                "id": 2,
	                "object_id": 1,
	                "description": "sddsds ",
	                "features": "sdsa new",
	                "technician": 2,
	                "solub_date": "2017-09-07T23:00:00.000Z",
	                "technician_name": "Nuno Marques"
	            }
	        ]
	    }
	}
------------
## POST/api/datasheet/solubility/create
### Condições:
	Tem que estar autenticado
### recebe:
	  description - descrição do teste
	 features - características 
	 technician técnico do teste
	 solub_date data do teste
### devolve:
##### se não estiver autenticado:
	{
		   "error": 3,
		   "message": "Por favor efectue autenticaçãos",
		   "res": {}
	 }
##### se todos os campos que são obrigatórios não estiverem inseridos:
	{
		   "error": 2,
		   "message": "Insira todos os campos obrigatórios",
		   "res": {}
	 }

##### se algum dos campos estiver mal definido:
	{
		   "error": 1,
		   "message": "Ocorreu um erro, algum dos campos pode estar mal definido",
		   "res": {}
	 }
##### se for criado com sucesso:
	{
	    "error": 0,
	    "message": "Teste de solubilidade criada com sucesso",
	    "res": {
	        "id": 3
	    }
	}	 

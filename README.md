# Health Diary / Diário de Saúde


Objetivo

O Health Diary (Diário de Saúde) é uma plataforma desenvolvida para auxiliar no registro, acompanhamento e análise dos sintomas de pacientes ao longo do tempo. Seu objetivo é permitir um monitoramento contínuo da saúde do paciente, fornecendo ferramentas para o reconhecimento de padrões, exportação de dados e geração de relatórios que facilitam o diagnóstico médico. A aplicação se destaca pela integração de funcionalidades como controle de medicamentos, inclusão de dados de exames e alertas automáticos de acompanhamento.


Principais Funcionalidades

	• Registro diário de sintomas e geração de relatórios automatizados.
	• Controle e histórico de medicamentos e tratamentos.
	• Registro de exames e laudos médicos.
	• Exportação dos dados em formatos CSV.
	• Geração de gráficos e relatórios visuais.
	• Alertas programados para verificação ativa de sintomas.
	• Integração de lembretes personalizados para uso de medicamentos.
	• Interface intuitiva com agenda interativa para navegação pelos registros.
	• Visualização e filtragem dos sintomas por intensidade, localização e data.


Membros da Equipe

 	• Guilherme Guerra (/BuxGuerra): Full Stack
	• Felipe Gomide (/FelipeGomide): Full Stack
	• João Costa (/joao-jcc): Full Stack
	• Júlio Guerra Domingues (/juliogdomingues): Full Stack

 
Tecnologias Utilizadas

	• Backend: Django
	• Frontend: HTML, SCSS, Typescript
	• Banco de Dados: SQLite


Backlog do produto

	1. Registro de Sintomas
 	Como usuário, quero registrar meus sintomas de maneira rápida e intuitiva, para acompanhar a evolução do meu estado de saúde ao longo do tempo.
  
	2. Gestão de Usuários Pacientes
	Como paciente, quero criar e gerenciar minha conta pessoal, para registrar e acessar meus dados de forma personalizada e segura.
 
	3. Gestão de Usuários Profissionais de Saúde
	Como profissional de saúde, quero acessar os dados compartilhados pelos pacientes, para auxiliar no diagnóstico e acompanhamento de tratamentos.
 
	4. Visualização de Sintomas em Agenda
	Como usuário, quero visualizar meus sintomas registrados em uma agenda interativa, para identificar padrões e avaliar a distribuição ao longo do tempo.
 
	5. Identificação de Padrões
	Como usuário, quero que o sistema identifique padrões nos meus registros de sintomas, para facilitar a compreensão da minha condição e ajudar na escolha do tratamento.
 
	6. Exportação de Dados
	Como usuário, quero exportar meus registros para compartilhar com meu médico durante a consulta.
 
	7. Controle de Medicamentos
	Como usuário, quero registrar e controlar meus medicamentos, para monitorar meu uso e garantir que estou seguindo corretamente as prescrições médicas.
 
	8. Histórico de Tratamentos
	Como usuário, quero visualizar um histórico de tratamentos realizados, para comparar a efetividade e evolução de cada um ao longo do tempo.
 
	9. Registro de Exames e Laudos
	Como usuário, quero incluir os resultados de exames e laudos médicos, para ter um histórico consolidado de todos os meus registros de saúde.
 
	10. Análise de Tendências de Saúde
	Como usuário, quero visualizar tendências gerais de saúde com base no meu histórico de sintomas e exames, para identificar mudanças no meu estado geral ao longo do tempo.
 
	11. Programação de Alertas
	Como usuário, quero configurar alertas e notificações para verificar ativamente a presença de sintomas específicos, para manter um monitoramento mais preciso.
 
	12. Interface de Agenda e Filtros de Sintomas
	Como usuário, quero filtrar e visualizar meus sintomas por intensidade, localização e data, para facilitar a análise e discussão durante a consulta.
 
	13. Geração de Relatórios Automatizados
	Como usuário, quero gerar relatórios automáticos dos meus sintomas e tratamentos, para entregar ao médico um resumo claro do meu estado de saúde.
 
	14. Suporte Multilíngue
	Como usuário, quero poder usar o sistema no idioma que preferir, para facilitar a compreensão e navegação.
 
	15. Temas Claro e Escuro
	Como usuário, quero alternar entre os modos claro e escuro, para utilizar a aplicação de maneira mais confortável de acordo com o ambiente em que me encontro.


Backlog do sprint

Objetivo do Sprint: Desenvolver as funcionalidades básicas que permitem ao usuário começar a utilizar o sistema, focando na segurança e usabilidade.

	1. Registro de Sintomas
 	Tarefas:
		• Criar modelo de dados para sintomas.
		• Desenvolver formulário de registro de sintomas com os campos necessários.
		• Implementar validação dos dados inseridos.
		• Testar a interface em diferentes dispositivos (responsividade).
	
 	Critérios de Aceitação:
		• O usuário consegue registrar, editar e excluir sintomas.
		• Dados são salvos corretamente no banco de dados.

	2. Exportação de Dados
 	Tarefas:
		• Implementar funcionalidade de exportação em formato CSV.
		• Desenvolver opção para seleção de intervalo de datas.
		• Garantir que apenas dados do usuário logado sejam exportados.
	
 	Critérios de Aceitação:
		• O usuário consegue exportar seus dados em CSV.
		• Arquivos gerados contêm as informações corretas e estão formatados adequadamente.
		• Funcionalidade testada e validada.

	3. Controle de Medicamentos
 	Tarefas:
		• Criar modelo de dados para medicamentos.
		• Desenvolver interface para registro e edição de medicamentos.
	
 	Critérios de Aceitação:
		• O usuário pode adicionar, editar e visualizar seus medicamentos.
		• Dados são armazenados corretamente.

	4. Gestão de Usuários Pacientes
 	Tarefas:
		• Implementar sistema de registro de pacientes com validação de e-mail.
		• Desenvolver funcionalidade de login e logout.
		• Criar página de perfil para visualização e edição de informações pessoais.
		• Implementar recuperação de senha via e-mail.
		• Garantir segurança dos dados (criptografia de senhas, proteção contra ataques comuns).
	
 	Critérios de Aceitação:
		• Pacientes podem se registrar, confirmar e-mails e fazer login/logout.
		• Cada paciente tem acesso apenas aos seus próprios dados.
		• Função de recuperação de senha está operacional.
		• Segurança básica está implementada e testada.

Nota: Esse é o planejamento inicial. Pode e provavelmente passará por modificações ao longo da implementação, conforme identificarmos necessidades ou desafios técnicos.

# Setup Inicial

## Pré-Requisitos

É necessário Python3 e Node.js, bem como seus gerenciadores de pacotes, pip e npm, respectivamente para lançar os dois servidores do programa.

## Setup Inicial

### Instalar Dependências do Backend

Dentro da pasta raiz do projeto, execute o comando:

```
	pip install -r requirements.txt
```

### Instalar Dependências do Frontend

Dentro da pasta healthDiary/frontend, execute o comando:

```
	npm install
```

## Rodar o projeto

É preciso duas abas de terminal distintas para lançar ambos frontend e backend.

### Backend

Na pasta healthDiary, execute o comando:

```
	python3 manage.py runserver
```

### Frontend

Na pasta healthDiary/frontend, execute:

```
	npm start
```

O comando abrirá automaticamente uma aba do Web Browser com o projeto.
O terminal informará o endereço do servidor local, caso precise abrir outra aba, comumente é http://localhost:3000/.
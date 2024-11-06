// src/mocks/handlers.js
import { http } from 'msw';

// Mock Data In-Memory
let sintomas = [
  { id: 1, titulo: 'Dor de Cabeça', descricao: 'Dor intensa na região frontal.' },
  { id: 2, titulo: 'Febre', descricao: 'Temperatura corporal acima de 38°C.' },
];

let tratamentos = [
  { id: 1, titulo: 'Paracetamol', descricao: 'Tomar 500mg a cada 6 horas.' },
  { id: 2, titulo: 'Ibuprofeno', descricao: 'Tomar 200mg a cada 8 horas.' },
];

// Mock Token
const MOCK_TOKEN = 'mocked_token_123456';

// Helper Function to Authenticate Requests
const isAuthenticated = (request) => {
  const authHeader = request.headers.get('Authorization');
  return authHeader === `Token ${MOCK_TOKEN}`;
};

export const handlers = [
  /**
   * Autenticação: Login
   * Endpoint: POST /dev/login/
   */
  http.post('http://localhost:8000/dev/login/', async ({ request }) => {
    const { username, password } = await request.json();

    if (username === 'usuario' && password === 'senha') {
      return new Response(JSON.stringify({ token: MOCK_TOKEN }), { status: 200 });
    }

    return new Response(JSON.stringify({ detail: 'Credenciais inválidas.' }), { status: 401 });
  }),

  /**
   * Sintomas: Listar Todos
   * Endpoint: GET /dev/sintomas/
   */
  http.get('http://localhost:8000/dev/sintomas/', async ({ request }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    return new Response(JSON.stringify(sintomas), { status: 200 });
  }),

  /**
   * Sintomas: Adicionar Novo
   * Endpoint: POST /dev/sintomas/
   */
  http.post('http://localhost:8000/dev/sintomas/', async ({ request }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    const { titulo, descricao } = await request.json();

    if (!titulo || !descricao) {
      return new Response(JSON.stringify({ detail: 'Título e descrição são obrigatórios.' }), { status: 400 });
    }

    const novoSintoma = {
      id: sintomas.length + 1,
      titulo,
      descricao,
    };

    sintomas.push(novoSintoma);

    return new Response(JSON.stringify(novoSintoma), { status: 201 });
  }),

  /**
   * Sintomas: Obter Detalhes de um Sintoma
   * Endpoint: GET /dev/sintomas/:id/
   */
  http.get('http://localhost:8000/dev/sintomas/:id/', async ({ request, params }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    const { id } = params;
    const sintoma = sintomas.find((s) => s.id === parseInt(id));

    if (!sintoma) {
      return new Response(JSON.stringify({ detail: 'Sintoma não encontrado.' }), { status: 404 });
    }

    return new Response(JSON.stringify(sintoma), { status: 200 });
  }),

  /**
   * Sintomas: Atualizar um Sintoma
   * Endpoint: PUT /dev/sintomas/:id/
   */
  http.put('http://localhost:8000/dev/sintomas/:id/', async ({ request, params }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    const { id } = params;
    const { titulo, descricao } = await request.json();

    const sintomaIndex = sintomas.findIndex((s) => s.id === parseInt(id));

    if (sintomaIndex === -1) {
      return new Response(JSON.stringify({ detail: 'Sintoma não encontrado.' }), { status: 404 });
    }

    if (!titulo || !descricao) {
      return new Response(JSON.stringify({ detail: 'Título e descrição são obrigatórios.' }), { status: 400 });
    }

    sintomas[sintomaIndex] = { id: parseInt(id), titulo, descricao };

    return new Response(JSON.stringify(sintomas[sintomaIndex]), { status: 200 });
  }),

  /**
   * Sintomas: Excluir um Sintoma
   * Endpoint: DELETE /dev/sintomas/:id/
   */
  http.delete('http://localhost:8000/dev/sintomas/:id/', async ({ request, params }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    const { id } = params;
    const sintomaIndex = sintomas.findIndex((s) => s.id === parseInt(id));

    if (sintomaIndex === -1) {
      return new Response(JSON.stringify({ detail: 'Sintoma não encontrado.' }), { status: 404 });
    }

    sintomas.splice(sintomaIndex, 1);

    return new Response(JSON.stringify({ detail: 'Sintoma excluído com sucesso.' }), { status: 200 });
  }),

  /**
   * Tratamentos: Listar Todos
   * Endpoint: GET /dev/tratamentos/
   */
  http.get('http://localhost:8000/dev/tratamentos/', async ({ request }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    return new Response(JSON.stringify(tratamentos), { status: 200 });
  }),

  /**
   * Tratamentos: Adicionar Novo
   * Endpoint: POST /dev/tratamentos/
   */
  http.post('http://localhost:8000/dev/tratamentos/', async ({ request }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    const { titulo, descricao } = await request.json();

    if (!titulo || !descricao) {
      return new Response(JSON.stringify({ detail: 'Título e descrição são obrigatórios.' }), { status: 400 });
    }

    const novoTratamento = {
      id: tratamentos.length + 1,
      titulo,
      descricao,
    };

    tratamentos.push(novoTratamento);

    return new Response(JSON.stringify(novoTratamento), { status: 201 });
  }),

  /**
   * Tratamentos: Obter Detalhes de um Tratamento
   * Endpoint: GET /dev/tratamentos/:id/
   */
  http.get('http://localhost:8000/dev/tratamentos/:id/', async ({ request, params }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    const { id } = params;
    const tratamento = tratamentos.find((t) => t.id === parseInt(id));

    if (!tratamento) {
      return new Response(JSON.stringify({ detail: 'Tratamento não encontrado.' }), { status: 404 });
    }

    return new Response(JSON.stringify(tratamento), { status: 200 });
  }),

  /**
   * Tratamentos: Atualizar um Tratamento
   * Endpoint: PUT /dev/tratamentos/:id/
   */
  http.put('http://localhost:8000/dev/tratamentos/:id/', async ({ request, params }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    const { id } = params;
    const { titulo, descricao } = await request.json();

    const tratamentoIndex = tratamentos.findIndex((t) => t.id === parseInt(id));

    if (tratamentoIndex === -1) {
      return new Response(JSON.stringify({ detail: 'Tratamento não encontrado.' }), { status: 404 });
    }

    if (!titulo || !descricao) {
      return new Response(JSON.stringify({ detail: 'Título e descrição são obrigatórios.' }), { status: 400 });
    }

    tratamentos[tratamentoIndex] = { id: parseInt(id), titulo, descricao };

    return new Response(JSON.stringify(tratamentos[tratamentoIndex]), { status: 200 });
  }),

  /**
   * Tratamentos: Excluir um Tratamento
   * Endpoint: DELETE /dev/tratamentos/:id/
   */
  http.delete('http://localhost:8000/dev/tratamentos/:id/', async ({ request, params }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    const { id } = params;
    const tratamentoIndex = tratamentos.findIndex((t) => t.id === parseInt(id));

    if (tratamentoIndex === -1) {
      return new Response(JSON.stringify({ detail: 'Tratamento não encontrado.' }), { status: 404 });
    }

    tratamentos.splice(tratamentoIndex, 1);

    return new Response(JSON.stringify({ detail: 'Tratamento excluído com sucesso.' }), { status: 200 });
  }),

  /**
   * TestPage: Verificar Rotas Protegidas
   * Endpoint: GET /dev/test/
   */
  http.get('http://localhost:8000/dev/test/', async ({ request }) => {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ detail: 'Acesso negado. Autenticação necessária.' }), { status: 403 });
    }

    return new Response(JSON.stringify({ message: 'Você acessou a TestPage com sucesso!' }), { status: 200 });
  }),
];
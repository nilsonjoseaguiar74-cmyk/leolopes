# Leonardo OS — Restrições de Integração e Deploy

## Status

Aprovado pelo proprietário da infraestrutura.

## Decisão

As integrações reais com banco de dados e modelos de inteligência artificial somente poderão ser implementadas e ativadas após o deploy da aplicação na VPS do projeto.

A VPS já possui a infraestrutura necessária para essas integrações, incluindo:

- bancos de dados instalados e administrados no ambiente da VPS;
- Ollama executado na própria infraestrutura;
- modelos Mistral disponíveis no ambiente local da VPS.

## Regra arquitetural

Durante o desenvolvimento local e a homologação anterior ao deploy na VPS:

- não conectar a aplicação a banco de dados externo ou gerenciado;
- não integrar diretamente com Ollama;
- não integrar diretamente com modelos Mistral;
- não adicionar dependência obrigatória de serviços de IA para inicializar ou testar a aplicação;
- não armazenar credenciais, URLs privadas ou segredos da VPS no repositório;
- manter os módulos de persistência e IA desacoplados por contratos e adaptadores;
- utilizar dados seed, mocks controlados ou persistência local temporária apenas para validação funcional;
- manter as funcionalidades de IA protegidas por feature flags e desabilitadas por padrão.

## Desenvolvimento permitido antes do deploy

Antes da publicação na VPS, é permitido desenvolver e testar:

- contratos de repositório;
- modelos de domínio;
- casos de uso;
- DTOs e validações;
- endpoints independentes de infraestrutura externa;
- adaptadores locais temporários;
- interfaces para provedores de IA;
- clientes abstratos para inferência;
- feature flags;
- tratamento de indisponibilidade;
- testes unitários e de integração com doubles, fakes ou mocks.

Essas implementações não podem estabelecer conexão real com os bancos ou modelos hospedados na VPS.

## Integrações autorizadas somente após o deploy

Após o deploy da aplicação na VPS e a validação do ambiente, poderão ser realizados:

- provisionamento e migração do banco de dados definitivo;
- configuração de usuários, permissões e credenciais do banco;
- configuração de pooling e política de conexões;
- conexão do backend ao banco instalado na VPS;
- integração do backend com a API local do Ollama;
- seleção e configuração dos modelos Mistral;
- implementação do IA Coach com inferência real;
- resumos, recomendações e demais recursos assistidos por IA;
- testes de carga, latência, disponibilidade e consumo de recursos;
- configuração de observabilidade e auditoria das integrações.

## Contratos obrigatórios

A aplicação deverá utilizar abstrações substituíveis:

- `DatabaseAdapter` para persistência;
- `Repository` por domínio;
- `AIProvider` para modelos de linguagem;
- `EmbeddingProvider` quando necessário;
- `ModelRegistry` para selecionar os modelos disponíveis;
- `HealthCheck` para verificar banco, Ollama e modelos carregados.

Nenhum componente React deverá acessar diretamente banco de dados, Ollama ou Mistral.

## Variáveis de ambiente previstas

Os nomes abaixo são referências arquiteturais e não devem conter valores reais no repositório:

```env
DATABASE_ENABLED=false
DATABASE_URL=
DATABASE_PROVIDER=

AI_ENABLED=false
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_CHAT_MODEL=
OLLAMA_EMBEDDING_MODEL=
```

Os valores de produção serão configurados exclusivamente na VPS por meio de variáveis de ambiente ou mecanismo seguro de secrets.

## Critério de ativação

Banco de dados e IA somente poderão ser marcados como ativos quando todos os critérios abaixo forem atendidos:

1. aplicação implantada na VPS;
2. rede interna e portas validadas;
3. credenciais configuradas fora do repositório;
4. backup do banco definido;
5. migrações revisadas;
6. endpoint de saúde do banco aprovado;
7. Ollama acessível pelo backend no ambiente da VPS;
8. modelos Mistral identificados e testados;
9. limites de timeout, concorrência e memória definidos;
10. logs sem exposição de dados pessoais ou segredos.

## Consequência para o roadmap

A ordem oficial passa a ser:

1. concluir frontend e backend local desacoplado;
2. validar fluxos em localhost com dados seed ou persistência local temporária;
3. preparar deploy, segurança e observabilidade;
4. realizar deploy na VPS;
5. integrar o banco de dados existente na VPS;
6. integrar Ollama e modelos Mistral;
7. habilitar progressivamente as funcionalidades avançadas de IA.

## Observação

Essa restrição é deliberada. O objetivo é impedir acoplamento prematuro, vazamento de credenciais e desenvolvimento dependente de infraestrutura que ainda não está disponível no ambiente local.

# template API

## Sistema operacional

- Unix like

## Setup

Dependências do sistema

- Docker
- Redis

Instalando as dependências da API

```bash
npm i --legacy-peer-deps
```

<br>

Crie um arquivo .env copiado do arquivo .env.sample e preencha as variaveis de ambiente

<br>

Para executar as migrations prisma

```bash
npx prisma migrate dev
```

Para executar os seeders prisma

```bash
npx prisma db seed
```

Executando o projeto

```bash
npm run start:dev
```

<br>

Para gerar um novo modulo utilize o comando partindo da raiz do projeto:

```bash
python module-generator/generate-module.py --module <nome do modulo>
```

<br>

O comando irá criar um novo módulo com o nome passado no parametro -m, os seguintes arquivos serão criados:

```
modulo
├── dto
│   └── modulo.dto.ts
├── entities
│   └── modulo.entity.ts
├── modulo.controller.ts
├── modulo.module.ts
├── modulo.repository.ts
└── modulo.service.ts
```

## Testes

Crie seu arquivos de teste no diretório `/test` seguindo a nomenclatura `<modulo>.e2e-spec.ts` adicione os testes e rode o comando abaixo para testar isoladamente:

```bash
SINGLE_FILE=test<modulo>.e2e-spec.ts && npm run test:e2e
```

> Substitua **_`<modulo>`_** pelo nome do seu módulo

Para testes gerais digite o comando:

```bash
npm run test:e2e
```

Para pular os testes em momentos específicos use a opção `--no-verify` no `git push`, Ex:

```bash
git add .
git commit -m "..."
git push --no-verify
```

## websockets
    
    A documentação da api de websockets está disponivel no endpoint: 
    
    /api/swagger/wss


## swagger

    A documentação da api rest está disponivel no endpoint:
    /api/swagger/rest
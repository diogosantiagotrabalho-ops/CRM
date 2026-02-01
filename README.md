# CRM Pro

CRM multi-tenant para pequenas e médias empresas.

## Requisitos
- Node.js 20+
- Docker + Docker Compose

## Setup rápido
```bash
cp .env.example .env
npm install
```

### Subir banco
```bash
docker compose up -d
```

### Prisma
```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

### Rodar local
```bash
npm run dev
```

## Usuário seed
- Email: `admin@acmecrm.com`
- Senha: `admin1234`

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

Configuration is read from the environment (`.env` locally, real environment
variables in deployed environments).

### Environment variables

| Variable          | Default             | Description                                  |
| ----------------- | ------------------- | -------------------------------------------- |
| `PORT`            | `3000`              | HTTP port the server binds to                |
| `JWT_SECRET`      | `dev-only-insecure-secret` | Secret used to sign access tokens     |
| `JWT_EXPIRES_IN`  | `1h`                | Token lifetime (`30m`, `2h`, `7d`, seconds)  |
| `DATABASE_PATH`   | `data/checkout.db`  | SQLite database file location                |

Set a strong `JWT_SECRET` outside local development.

## Initial setup

### Local development

```bash
$ npm install
$ cp .env.example .env        # Windows: copy .env.example .env
$ npm run start:dev
```

The API is then available at `http://localhost:3000` and Swagger at
`http://localhost:3000/docs`. The SQLite file is created automatically at
`DATABASE_PATH` on first run, with schema synchronization enabled, so there is
no migration step for local work.

### Generating the JWT secret

Never deploy with the default `dev-only-insecure-secret`. Generate a random one:

```bash
# Node (works everywhere)
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"

# or, if OpenSSL is available
openssl rand -base64 48
```

Put the value in your environment, never in the source or in the image:

```bash
# local, in .env (already git-ignored)
JWT_SECRET=paste-the-generated-value

# one-off shell session
export JWT_SECRET="paste-the-generated-value"

# Docker
docker run -p 3000:3000 -e JWT_SECRET="paste-the-generated-value" ...
```

In deployed environments keep the value in your secret manager (Vault, AWS/GCP
Secret Manager, GitHub Actions secrets, Kubernetes Secret) and inject it as an
environment variable. `.env.example` only ships placeholders, and `.env` is in
`.gitignore`, so nothing sensitive reaches the repository.

Rotating the secret invalidates every token already issued: clients simply have
to log in again. Keep the value somewhere you can retrieve it, because losing it
means exactly that.

### Database notes

The project uses SQLite through `better-sqlite3`. In Docker, mount a volume at
`/app/data` so the database survives container restarts:

```bash
$ docker volume create checkout-data
$ docker run -p 3000:3000 -e JWT_SECRET="..." -v checkout-data:/app/data nestjs-checkout-hub
```

`data/` is git-ignored, so the local database file is not committed either.

## API guide

Base URL is `http://localhost:3000` (or your host inside Docker) and interactive
docs live at `http://localhost:3000/docs`.

The request order is always the same: register, log in, take the `accessToken`
from the response, then send it as `Authorization: Bearer <accessToken>` on the
rest of the endpoints. Registering already returns a token, so logging in right
after is optional.

```bash
TOKEN="paste-the-accessToken-here"
```

Every command in this guide was run against a live server, so the payloads and
responses shown here are the real ones.

### 1. Create an account

```bash
curl -X POST http://localhost:3000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"ada@example.com","name":"Ada Lovelace","password":"Str0ngPassw0rd!"}'
```

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 3600,
  "user": { "id": "b9da6894-...", "email": "ada@example.com", "name": "Ada Lovelace", "taxId": null }
}
```

Passwords must be 8-72 characters. Registering an existing email returns `409`.
Already have an account? Log in with the same body minus the `name`:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"ada@example.com","password":"Str0ngPassw0rd!"}'
```

Both endpoints return the same shape, and a wrong password returns `401`.

### 2. Check the current user

```bash
curl http://localhost:3000/auth/me -H "Authorization: Bearer $TOKEN"
```

```json
{ "id": "8c553364-...", "email": "ada@example.com", "name": "Ada Lovelace", "taxId": null }
```

### 3. Create an invoice (guest checkout)

`POST /invoices` is public, so a customer can check out without an account.
Totals are computed server-side: `subtotal = Σ unitPrice × quantity`,
`tax = subtotal × 0.21`, `total = subtotal + tax`. The invoice starts as `PENDING`.

```bash
curl -X POST http://localhost:3000/invoices \
  -H 'Content-Type: application/json' \
  -d '{
    "customerEmail": "customer@example.com",
    "taxId": "20-12345678-9",
    "items": [{ "title": "Product A", "unitPrice": 100, "quantity": 2 }]
  }'
```

Keep the `id` from the response, you need it to pay and to read the invoice back.
For the payload above the server answers `subtotal: 200`, `tax: 42`, `total: 242`.

### 4. Pay the invoice

```bash
curl -X POST http://localhost:3000/payments/checkout \
  -H 'Content-Type: application/json' \
  -d '{
    "invoiceId": "<invoice-id>",
    "paymentMethod": "CREDIT_CARD",
    "cardNumber": "4242424242424242",
    "cardHolder": "John Doe"
  }'
```

`paymentMethod` is one of `CREDIT_CARD`, `DEBIT_CARD` or `MERCADO_PAGO`. A
successful payment stores a receipt (only the last four digits are kept), flips
the invoice to `PAID`, writes a `PAYMENT_SUCCESS` notification and broadcasts it
over WebSocket. Paying twice returns `400`; an unknown invoice returns `404`.

### 5. Read the invoice and its notifications

```bash
curl http://localhost:3000/invoices/<invoice-id> -H "Authorization: Bearer $TOKEN"
curl http://localhost:3000/users/<user-id> -H "Authorization: Bearer $TOKEN"
curl http://localhost:3000/notifications/user/<user-id> -H "Authorization: Bearer $TOKEN"
curl http://localhost:3000/health
```

The invoice endpoint returns the invoice with its items, user and receipt; the
notification endpoint returns the user's notifications newest first, each one with
its `type`, `title`, `message`, `isRead` and the related invoice.

### Endpoint summary

| Method | Path                        | Auth | Purpose                                |
| ------ | --------------------------- | ---- | -------------------------------------- |
| `GET`  | `/`                         | no   | Service banner                         |
| `GET`  | `/health`                   | no   | Liveness probe used by Docker          |
| `POST` | `/auth/register`            | no   | Create an account, returns a token     |
| `POST` | `/auth/login`               | no   | Exchange credentials for a token       |
| `GET`  | `/auth/me`                  | yes  | Profile of the authenticated user      |
| `POST` | `/invoices`                 | no   | Create an invoice (guest checkout)     |
| `GET`  | `/invoices/:id`             | yes  | Invoice with items, user and receipt   |
| `POST` | `/payments/checkout`        | no   | Pay an invoice                         |
| `GET`  | `/users/:id`                | yes  | User by ID                             |
| `GET`  | `/notifications/user/:id`   | yes  | Notifications for a user               |

`JwtAuthGuard` is registered globally, so any route not marked `@Public()` needs
a bearer token. In Swagger at `/docs`, hit `Authorize` once with your token and
the protected endpoints become callable.

### Running the examples on PowerShell

The examples above assume a POSIX shell (bash, WSL, Git Bash). On Windows
PowerShell, `curl.exe` receives the argument with its double quotes stripped, so
inline JSON fails with:

```json
{ "statusCode": 400, "message": ["Expected property name or '}' in JSON at position 1"] }
```

Two workarounds, both verified:

```powershell
# Option A: keep the payload in a file
'{"email":"ada@example.com","password":"Str0ngPassw0rd!"}' | Set-Content body.json
curl.exe -s -X POST http://localhost:3000/auth/login `
  -H 'Content-Type: application/json' --data-binary "@body.json"

# Option B: build the JSON in PowerShell and pipe it to curl
@{ email='ada@example.com'; password='Str0ngPassw0rd!' } |
  ConvertTo-Json -Compress |
  curl.exe -s -X POST http://localhost:3000/auth/login `
    -H 'Content-Type: application/json' -d '@-'
```

`Invoke-RestMethod` has no such problem and is a fine alternative:

```powershell
$login = Invoke-RestMethod http://localhost:3000/auth/login -Method Post `
  -ContentType 'application/json' `
  -Body (@{ email='ada@example.com'; password='Str0ngPassw0rd!' } | ConvertTo-Json)
$headers = @{ Authorization = "Bearer $($login.accessToken)" }
Invoke-RestMethod http://localhost:3000/auth/me -Headers $headers
```

### Copy-paste cheat sheet

```bash
BASE=http://localhost:3000
TOKEN="your-access-token"
USER_ID="user-id"
INVOICE_ID="invoice-id"

# public
curl -s $BASE/health
curl -s $BASE/

# auth
curl -s -X POST $BASE/auth/register -H 'Content-Type: application/json' \
  -d '{"email":"ada@example.com","name":"Ada Lovelace","password":"Str0ngPassw0rd!"}'
curl -s -X POST $BASE/auth/login -H 'Content-Type: application/json' \
  -d '{"email":"ada@example.com","password":"Str0ngPassw0rd!"}'
curl -s $BASE/auth/me -H "Authorization: Bearer $TOKEN"

# checkout
curl -s -X POST $BASE/invoices -H 'Content-Type: application/json' \
  -d '{"customerEmail":"customer@example.com","taxId":"20-12345678-9","items":[{"title":"Product A","unitPrice":100,"quantity":2}]}'
curl -s -X POST $BASE/payments/checkout -H 'Content-Type: application/json' \
  -d "{\"invoiceId\":\"$INVOICE_ID\",\"paymentMethod\":\"CREDIT_CARD\",\"cardNumber\":\"4242424242424242\",\"cardHolder\":\"John Doe\"}"

# reads (token required)
curl -s $BASE/invoices/$INVOICE_ID -H "Authorization: Bearer $TOKEN"
curl -s $BASE/users/$USER_ID -H "Authorization: Bearer $TOKEN"
curl -s $BASE/notifications/user/$USER_ID -H "Authorization: Bearer $TOKEN"
```

### Live notifications

The server pushes events over Socket.IO on the same host and port:

```js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('PAYMENT_SUCCESS', payload => console.log(payload));
```

The payload carries `invoiceId`, `transactionCode`, `authorizationCode`, `amount`
and `timestamp`.

### Errors

Validation is handled by a global `ValidationPipe` with `whitelist` and
`forbidNonWhitelisted` enabled, so unknown fields are rejected too. Errors follow
the standard Nest shape:

```json
{
  "statusCode": 400,
  "message": ["paymentMethod must be one of the following values: CREDIT_CARD, DEBIT_CARD, MERCADO_PAGO"],
  "error": "Bad Request"
}
```

## Docker

```bash
# build
$ docker build -t nestjs-checkout-hub .

# run (SQLite file is persisted in a named volume)
$ docker volume create checkout-data
$ docker run -p 3000:3000 \
  -e JWT_SECRET=your-long-random-secret \
  -v checkout-data:/app/data \
  nestjs-checkout-hub
```

The image is a multi-stage build: TypeScript is compiled in a builder stage, the
runtime stage carries production dependencies only, runs as a non-root user and
exposes a `/health` healthcheck.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

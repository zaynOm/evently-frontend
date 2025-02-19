# Evently - Event Management Platform

Evently is a simple event management platform.

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/zaynOm/evently-frontend.git
```

2. Install dependencies:

```bash
cd evently-frontend

npm install
# or
pnpm install
```

3. Environment variables:

- Copy the `.env.example` into a new file named `.env` manually.

Or you can use this command:

```bash
cp .env.example .env
```

- Make sure to set the following variable in your `.env` file to disable maintenance mode:

```bash
NEXT_PUBLIC_UNDER_MAINTENANCE=false
```

4. Start the server:

```bash
npm run dev
# or
pnpm dev
```

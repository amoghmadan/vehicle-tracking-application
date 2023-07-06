# Vehicle Tracker Web UI

Vehicle Tracker Web UI Reference

## How to setup (development)?

Change .env according to your system setup.

```bash
npm ci --location=project  # Install dependencies
npm run dev  # Runs the development server
```

## How to prepare for production?

You need to prepare a build which would give output in dist folder.

```bash
npm run build  # Generates the build
```

## How to run in production?

- Edit the .env according to requirements.
- Gnerate a build.
- Finally map it to the NGINX default.conf.

## .env what can I configure?

- VITE_PUBLIC_API_URL = http<s>://<domain>:<port>/api
- VITE_PUBLIC_DEBUG = false

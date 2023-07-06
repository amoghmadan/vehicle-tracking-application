# Vehicle Tracker API

Vehicle Tracker API Reference

## How to setup (development)?

Change .env according to your system setup.

```bash
npm i  # Install dependencies
npm run start:dev  # Runs the development server
```

## How to prepare for production?

You need to prepare a build which would give output in dist folder.

```bash
npm run build  # Generates the build
```

## How to run in production?

- Edit the .env according to requirements.
- Gnerate a build.
- Finally follow the command below.

```bash
npm start
```

# .env what can I configure?

- MONGO_URI = mongodb://<username>:<password>@<host>:<port>/<dbname>

# Contents

- [Getting Started](#getting-started)
- [API](#api)
  - [Item Collection](#item-collection)

## Getting Started

Before we start, please create a `typeorm.config.ts` file in the project, an example of `example.typeorm.config` has been provided.

Execute below command to install all required package for this project:

```sh
npm install
```

Once all required package is installed, run the migration command:

```bash
npm run typeorm:run-migrations
```

Once db migration is complete you may run `npm run dev` to start the server.

The server will be running on [http://localhost:3000](http://localhost:3000), .

You can start editing the endpoints by modifying files under `modules`.

## API

### Item Collection

- POST /api/items - Create a new item.
- GET /api/items - Get all items.
- GET /api/items/:id - Get an item by its id.
- PUT /api/items/:id - Update an existing item by its id.
- DELETE /api/items/:id - Delete an item by its id.

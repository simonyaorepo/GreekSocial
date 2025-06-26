# Greek Social Platform

A modern social platform for Greek organizations, built with Node.js, Express, Sequelize, and a React frontend.

## Features
- User authentication and authorization
- Organizations, chapters, members, and roles
- Posts, comments, likes, and tags
- Events and notifications
- Messaging and friendships
- RESTful API documented with OpenAPI (Swagger)

## Project Structure
```
GreekSocial/
├── backend/           # Node.js/Express/Sequelize API
│   ├── src/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/          # React app (create-react-app or Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── openapi.yaml       # OpenAPI/Swagger API documentation
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL or MySQL (or your preferred SQL database)

### Backend Setup
1. `cd backend`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure your `.env` file (see `.env.example` if available).
4. Run database migrations and seeders if needed.
5. Start the server:
   ```sh
   npm start
   ```
6. API will be available at `http://localhost:3000/api` (or your configured port).

### Frontend Setup
1. `cd frontend`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. App will be available at `http://localhost:3001` (or your configured port).

## API Documentation
- The API is documented using OpenAPI (Swagger).
- View the documentation by importing `openapi.yaml` into [Swagger Editor](https://editor.swagger.io/) or using a Swagger UI tool.

## Development
- Use feature branches for new features or bug fixes.
- Commit messages should be clear and descriptive.
- Use `.gitignore` to avoid committing sensitive or unnecessary files (e.g., `.env`, `node_modules/`).

## Scripts
- `npm start` — Start the server (backend/frontend)
- `npm run dev` — Start in development mode (if configured)
- `npm run build` — Build the frontend for production

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---

**Contact:** For questions or support, open an issue or contact the maintainer.
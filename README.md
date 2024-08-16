# 2.6 - NodeJS MongoDB
A server that utilizes express routes to perform CRUD actions on a mongo database. Mongoose is utilized to create schemas and includes validation of schemas. The database consists of a games collection and a studios collection.
## Routes & Methods
- GET
  - localhost:3000/api/v1/games (Returns all games)
  - localhost:3000/api/v1/studios (Returns all studios)
  - localhost:3000/api/v1/games/:id (Returns a single game based on ID)
  - localhost:3000/api/v1/studios/:id (Returns a single studio based on ID)
- POST
  - localhost:3000/api/v1/games (Creates a game)
  - localhost:3000/api/v1/studios (Creates a studio)
- PUT
  - localhost:3000/api/v1/games/:id (Updates a game based on ID)
  - localhost:3000/api/v1/studios/:id (Updates a studio based on ID)
- DELETE
  - localhost:3000/api/v1/games/:id (Deletes a game based on ID)
  - localhost:3000/api/v1/studios/:id (Deletes a studio based on ID)
## Dependencies
- express (required)
- dotenv (required)
- mongoose (required)
- morgan (required)
- nodemon (optional)

To automatically install required dependencies, use <code>npm install</code> in the terminal. To install dependencies manually, use <code>npm install (dependency name)</code>.
## Run the server
After installing dependencies..<br>
<code>npm run start</code> or <code>npm run dev</code> (If nodemon is installed)

Gigsama Database Schema Creator - MERN Stack with OpenAI Integration

# Database Schema Creator

This application helps users design database schemas through an AI-powered interactive experience. Users answer questions from an AI assistant, which then generates a MongoDB schema based on their responses.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **AI Integration**: OpenAI GPT-4

## Features

- Interactive AI-powered schema creation
- Project-based schema management
- Unique URL for each schema project
- Ability to view, edit, and save schemas
- Persistent storage of projects and schemas

## Why MongoDB?

MongoDB was chosen for this project for several reasons:

1. **Flexibility**: MongoDB's schema-less design is perfect for a tool that creates varying database structures based on user inputs.
2. **JSON-like documents**: Both the schema design and the actual database storage use JSON-like structures, creating a natural fit.
3. **Scalability**: MongoDB provides excellent scalability options for growing applications.
4. **Rich query language**: Despite being NoSQL, MongoDB offers powerful querying capabilities.
5. **MERN stack compatibility**: As we're using the MERN stack, MongoDB is a natural fit for seamless integration.

## AI Integration

The application integrates with OpenAI's GPT-4 model to:

1. Conduct an interactive conversation with the user about their database needs
2. Ask relevant questions to gather requirements
3. Generate a MongoDB schema based on the conversation
4. Structure the schema according to best practices

The AI assistant is designed to ask questions specifically about:
- The project domain (e.g., healthcare, e-commerce)
- Key entities and their attributes
- Relationships between entities
- Data validation requirements
- Access patterns and query needs

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- OpenAI API key

### Installation

1. Clone the repository
   ```
   git https://github.com/mohammedasobur/Gigsama_Schema.git
   cd gigsama-db-schema
   ```

2. Install dependencies for both frontend and backend
   ```
   # Install backend dependencies
   cd ./server
   npm install

   # Install frontend dependencies
   cd ./client
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/db-schema-creator
   OPENAI_API_KEY=api_key_here
   ```

4. Start the development servers
   ```
   # Start backend server
   cd server
   npm run dev

   # In a new terminal, start frontend server
   cd client
   npm run dev
   ```



## Usage

1. Create a new project from the home page
2. Answer the AI assistant's questions about your database needs
3. Review the generated schema
4. Save the project with a name
5. Access your project later via its unique URL

## Future Improvements

- Support for SQL schema generation
- Schema visualization tools
- Export options (SQL scripts, Mongoose models, etc.)
- User authentication and project sharing
- Integration with database management tools

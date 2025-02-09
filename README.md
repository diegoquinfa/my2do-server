# MyTodo - Server

MyTodo is a task management web application designed to improve user organization and productivity. It allows the creation of task groups, assignment of subtasks, and customization with emojis. Additionally, it features automatic reminders and user validation via email.

## Technologies Used

- **Backend:** Node.js, TypeScript, Express.js
- **Database:** MongoDB
- **Architecture:** Hexagonal, Screaming Architecture, Vertical Slicing
- **Authentication & Security:** Session management, email validation, password recovery
- **Notifications:** Task reminders via email

## Main Features

- User registration and authentication
- Email validation
- Secure login and logout
- Password recovery
- Creation and management of task groups
- Task creation with various properties:
  - Title and description
  - Due date or no date
  - Recurrence frequency
  - Time or time range
  - Subtasks
- Task filtering by date and status (pending/completed)
- Customization with emojis in task groups and tasks
- Account management (email change, password update, etc.)
- Automatic email reminders for upcoming tasks

## Installation & Configuration

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/diegoquinfa/mytodo-server.git
   cd MyTodo
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Configure environment variables:
   Create a `.env` file in the project root and define the necessary variables, etc.
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   pnpm dev
   ```

## API Endpoints

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| POST   | `/api/v1/auth/register` | User registration       |
| POST   | `/api/v1/auth/login`    | User login              |
| POST   | `/api/v1/auth/logout`   | User logout             |
| POST   | `/api/v1/auth/recover`  | Password recovery       |
| GET    | `/api/v1/tasks`         | Retrieve user tasks     |
| POST   | `/api/v1/tasks`         | Create a new task       |
| PUT    | `/api/v1/tasks/:id`     | Update task             |
| DELETE | `/api/v1/tasks/:id`     | Delete task             |
| GET    | `/api/v1/groups`        | Retrieve task groups    |
| POST   | `/api/v1/groups`        | Create a new task group |
| PUT    | `/api/v1/groups/:id`    | Update task group       |
| DELETE | `/api/v1/groups/:id`    | Delete task group       |

## Project Architecture

MyTodo's backend follows **Hexagonal Architecture**, **Screaming Architecture**, and **Vertical Slicing** principles, ensuring a modular, maintainable, and scalable structure.

Project structure:

```
mytodo-server
├── src
│   ├── api
│   │   └── tasks
│   │       ├── application
│   │       │   └── createTask.ts
│   │       ├── domain
│   │       │   ├── ITasksRepository.ts
│   │       │   └── Task.ts
│   │       └── infrastructure
│   │           ├── TasksRespository.ts
│   │           └── routes.ts
│   ├── database
│   │   └── mongo.ts
│   ├── index.ts
│   ├── lib
│   │   ├── bootstrap.ts
│   │   ├── env.ts
│   │   └── utils.ts
│   ├── middlewares
│   │   ├── errorHandler.ts
│   │   └── logger.ts
│   └── network
│       ├── response.ts
│       └── routes.ts
└── tests
    ├── api
    │   └── tasks
    │       └── application
    │           └── createTask.test.ts
    └── index.test.ts
```

## Contributing

If you want to contribute to MyTodo, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make changes and commit (`git commit -m 'Add new feature'`).
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact me at `your-email@example.com`.

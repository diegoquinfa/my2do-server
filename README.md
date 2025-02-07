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
   git clone https://github.com/user/MyTodo.git
   cd MyTodo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the project root and define the necessary variables such as `MONGO_URI`, `JWT_SECRET`, etc.
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | User registration       |
| POST   | `/api/auth/login`    | User login              |
| POST   | `/api/auth/logout`   | User logout             |
| POST   | `/api/auth/recover`  | Password recovery       |
| GET    | `/api/tasks`         | Retrieve user tasks     |
| POST   | `/api/tasks`         | Create a new task       |
| PUT    | `/api/tasks/:id`     | Update task             |
| DELETE | `/api/tasks/:id`     | Delete task             |
| GET    | `/api/groups`        | Retrieve task groups    |
| POST   | `/api/groups`        | Create a new task group |
| PUT    | `/api/groups/:id`    | Update task group       |
| DELETE | `/api/groups/:id`    | Delete task group       |

## Project Architecture

MyTodo's backend follows **Hexagonal Architecture**, **Screaming Architecture**, and **Vertical Slicing** principles, ensuring a modular, maintainable, and scalable structure.

Project structure:

```
MyTodo/
│-- src/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   ├── presentation/
│-- tests/
│-- .env.example
│-- package.json
│-- README.md
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

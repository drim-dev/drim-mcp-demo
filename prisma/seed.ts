import "dotenv/config";
import { PrismaClient, TodoStatus, TodoPriority } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const alice = await prisma.user.create({
    data: { name: "Alice Johnson", email: "alice@example.com" },
  });
  const bob = await prisma.user.create({
    data: { name: "Bob Smith", email: "bob@example.com" },
  });
  const charlie = await prisma.user.create({
    data: { name: "Charlie Brown", email: "charlie@example.com" },
  });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 35);

  // Create todos
  await prisma.todo.createMany({
    data: [
      {
        title: "Set up project infrastructure",
        description:
          "Initialize Next.js project with TypeScript and Tailwind CSS",
        status: TodoStatus.DONE,
        priority: TodoPriority.HIGH,
        userId: alice.id,
      },
      {
        title: "Design database schema",
        description: "Create Prisma schema for Users and Todos",
        status: TodoStatus.DONE,
        priority: TodoPriority.HIGH,
        userId: alice.id,
      },
      {
        title: "Implement API endpoints",
        description: "Create CRUD endpoints for todos",
        status: TodoStatus.IN_PROGRESS,
        priority: TodoPriority.HIGH,
        userId: alice.id,
      },
      {
        title: "Write unit tests",
        description: "Add tests for API endpoints",
        status: TodoStatus.PENDING,
        priority: TodoPriority.MEDIUM,
        userId: alice.id,
      },
      {
        title: "Create UI components",
        description: "Build TodoList, TodoItem, and TodoForm components",
        status: TodoStatus.IN_PROGRESS,
        priority: TodoPriority.HIGH,
        userId: bob.id,
      },
      {
        title: "Add filtering functionality",
        description: "Implement status and priority filters",
        status: TodoStatus.PENDING,
        priority: TodoPriority.MEDIUM,
        userId: bob.id,
      },
      {
        title: "Responsive design",
        description: "Make the app mobile-friendly",
        status: TodoStatus.PENDING,
        priority: TodoPriority.LOW,
        userId: bob.id,
      },
      {
        title: "Dark mode support",
        description: "Add dark mode toggle and styles",
        status: TodoStatus.PENDING,
        priority: TodoPriority.LOW,
        userId: bob.id,
      },
      {
        title: "Set up CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing",
        status: TodoStatus.PENDING,
        priority: TodoPriority.MEDIUM,
        userId: charlie.id,
      },
      {
        title: "Deploy to production",
        description: "Set up Vercel deployment",
        status: TodoStatus.PENDING,
        priority: TodoPriority.HIGH,
        userId: charlie.id,
      },
      {
        title: "Performance optimization",
        description: "Optimize database queries and add caching",
        status: TodoStatus.PENDING,
        priority: TodoPriority.MEDIUM,
        userId: charlie.id,
      },
      {
        title: "Documentation",
        description: "Write comprehensive README and API docs",
        status: TodoStatus.IN_PROGRESS,
        priority: TodoPriority.MEDIUM,
        userId: charlie.id,
      },
      // Problematic data for demo
      {
        title: "Review old pull requests",
        description: "Check and merge pending PRs from last month",
        status: TodoStatus.PENDING,
        priority: TodoPriority.HIGH,
        userId: alice.id,
        createdAt: thirtyDaysAgo,
        updatedAt: thirtyDaysAgo,
      },
      {
        title: "Update dependencies",
        description: "Run npm audit and update outdated packages",
        status: TodoStatus.PENDING,
        priority: TodoPriority.MEDIUM,
        userId: bob.id,
        createdAt: thirtyDaysAgo,
        updatedAt: thirtyDaysAgo,
      },
      {
        title: "???",
        status: TodoStatus.PENDING,
        priority: TodoPriority.LOW,
        userId: charlie.id,
      },
    ],
  });

  console.log("Seed data created successfully!");
  console.log("Users: Alice, Bob, Charlie");
  console.log("Todos: 15 tasks with various statuses and priorities");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

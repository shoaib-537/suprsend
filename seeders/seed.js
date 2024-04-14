const mongoose = require("mongoose");
require("dotenv").config();
const { Command } = require("commander");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log(`Database connected...`);
  } catch (ex) {
    console.log(ex);
    process.exit(-1);
  }
}

const program = new Command();

program
  .name("Tomi DOP Database Seeder")
  .description("Seed Database")
  .version("0.1.0");

program
  .command("seed-admin-credentials")
  .description("Seed admin credentials in database")
  .action(async () => {
    try {
      await connectDB();

      const User = require("../src/users/users.model");

      try {
        let isDatabaseSeeded = false;

        const user = await User.create({
          email: '3445royal@gmail.com',
          password: '3445royal@gmail.com',
          role: "admin"
        });

        isDatabaseSeeded = true;

        if (isDatabaseSeeded) {
          console.log("Database Seeded Successfully...");
        } else {
          console.log("Database already seeded...");
        }
      } catch (ex) {
        console.log("Database seeding failed...", ex);
        process.exit(-1);
      }
    } catch (ex) {
      console.log(ex);
      process.exit(1);
    }
  });

program.parse(process.argv);

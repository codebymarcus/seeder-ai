#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import dotenv from 'dotenv';
import generateDataFromSchema from './helpers/generateDataFromSchema.js';

// Load environment variables from .env file
dotenv.config();


const program = new Command();

program
  .version('1.0.0')
  .description('Generate seed data from a schema')
  .option('--schema <path>', 'Path to the schema file (optional)', 'schema.json')
  .option('--output <path>', 'Path to the output file (optional)', 'seeder.json')
  .action(async (options) => {
    const schemaFilePath = path.resolve(process.cwd(), options.schema);
    const outputFilePath = path.resolve(process.cwd(), options.output);

    try {
      if (!fs.existsSync(schemaFilePath)) {
        console.error(`Schema file not found: ${schemaFilePath}`);
        process.exit(1);
      }

      const schemaContent = fs.readFileSync(schemaFilePath, 'utf8');
      const schema = JSON.parse(schemaContent);

      const seedData = {};

      // Create a loading spinner
      const spinner = ora('Generating seed data...').start();

      const spinnerMessages = [
        "Generating seed data...",
        "Still generating...",
        "Almost there...",
        "Hang tight...",
        "Finalizing data..."
      ];

      let messageIndex = 0;

      setInterval(() => {
        spinner.color = 'green';
        spinner.text = spinnerMessages[messageIndex];

        messageIndex = (messageIndex + 1) % spinnerMessages.length;
      }, 1000);

      for (const [key, value] of Object.entries(schema)) {
        const { schema, count } = value;

        seedData[key] = await generateDataFromSchema(schema, count);
      }

      // Stop the loading spinner
      spinner.succeed('Seed data generated successfully!');

      fs.writeFile(outputFilePath, JSON.stringify(seedData, null, 2), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Data saved to ${outputFilePath}`);
          process.exit(0);
        }
      });

    } catch (error) {
      console.error(error);
      process.exit(1);
    }

  });

  program.parse(process.argv);
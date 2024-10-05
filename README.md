# CLI Seed Data Generator

A command-line interface (CLI) tool to dynamically generate seed data based on user-defined JSON schemas. This tool integrates with OpenAI to create structured data that can be used for testing or populating databases.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Configuration](#configuration)
- [Example Schema](#example-schema)

## Features

- Generate structured JSON data based on a defined schema.
- Automatically handle interactions with OpenAI for data generation.
- Supports real-time loading indicators and user-friendly CLI outputs.
- Save generated data directly to a file.

## Installation

To get started, clone the repository and install the dependencies:
```bash
git clone <your-repo-url>
cd <your-repo-name>
npm install
```

## Environment Variables

- OPENAI_API_KEY: Your OpenAI API key.

## Usage

To generate seed data, run the following command:

```bash
node <path-to-your-cli-file> --schema <path-to-schema-file>
```

For example usage:
```bash
node index.js --schema seeder-schema.json
```

## Configuration

- `--schema <path-to-schema-file>`: The path to the JSON schema file.
- `--output <path-to-output-file>`: The path to the output file. If not specified, the output will be written to `seeder-output.json`.

## Example Schema

schema.json
```json
{
  "companies": {
    "count": 10,
    "schema": {
      "company": {
        "type": "string",
        "description": "Name of a Valid existing company."
      },
      "description": {
        "type": "string",
        "description": "A brief description of the generatedcompany"
      },
      "total_users": {
        "type": "number",
        "description": "Total number of users in the company"
      }
    }
  },
  "posts": {
    "count": 10,
    "schema": {
      "title": {
        "type": "string",
        "description": "Title of a valid existing post."
      },
      "description": {
        "type": "string",
        "description": "Description of the generated post"
      }
    }
  }
}
```

#### Output
seeder.json

```json
{
  "companies": [
    {
      "company": "Apple",
      "description": "Apple is a technology company.",
      "total_users": 100
    },
    {
      "company": "Google",
      "description": "Google is a technology company.",
      "total_users": 200
    },
    {
      "company": "Microsoft",
      "description": "Microsoft is a technology company.",
      "total_users": 300
    },
  ],
  "posts": [
    {
      "title": "Post 1",
      "description": "This is post 1."
    },
    {
      "title": "Post 2",
      "description": "This is post 2."
    },
    {
      "title": "Post 3",
      "description": "This is post 3."
    },
  ]
}
```

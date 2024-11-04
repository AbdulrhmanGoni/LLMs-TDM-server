# LLMs Training Datasets Manager

LLMs Training Datasets Manager is a web application for creating and managing training datasets
with different formats for training Large Language Models (LLMs)
or for using them in Retrieval Augmented Generation (RAG) systems.

[![CI Workflow](https://github.com/AbdulrhmanGoni/LLMs-TDM-server/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/AbdulrhmanGoni/LLMs-TDM-server/actions/workflows/tests.yaml)
[![Code Coverage](https://codecov.io/gh/AbdulrhmanGoni/LLMs-TDM-server/branch/main/graph/badge.svg?token=QVHBAOJBBO)](https://app.codecov.io/gh/AbdulrhmanGoni/LLMs-TDM-server)

# Features :sparkles:

- :card_index_dividers: Creating datasets and adding instructions into it.
- :gear: Managing the instructions of the datasets (updating or deleting the instructions).
- :bookmark_tabs: Browse the instructions of datasets esaly in pagination model.
- :inbox_tray: Export datasets into your machine (Actually download datasets).
- :hugs: [Huggingface](https://Huggingface.co) integration via **Huggingface OAuth flow**. And the gained features will be :point_down:
  * :outbox_tray: Linking datasets with Huggingface dataset repository and pushing local datasets to.
  * :new: Creating new Huggingface dataset repository if needed
  * :trackball: Syncing local datasets with their linked repositories after updates.
  * :electric_plug: Unlinking a local dataset with its linked repository ***(with options to delete the entire repository or just the dataset file)***

# Tech Stack :hammer_and_wrench:

- Bun ( The all in one JavaScript + TypeScript runtime ) :fire:
- Typescript
- Docker
- MongoDB (With Replication & Sharding for availability and scalability)
- [Clerk](https://clerk.com/) (For authentication and managing users)

![Typescript](readme_file_icons/typescript.svg)
![Bun](readme_file_icons/bun.svg)
![Docker](readme_file_icons/docker.svg)
![MongoDB](readme_file_icons/mongodb.svg)
![Clerk](readme_file_icons/clerk.svg)

# Installation :arrow_down:

## Prerequisites :page_with_curl:

Before installing the application, make sure you have the following requirements:

- [Bun](https://bun.sh/) (1.1.31 or later)
- [Docker Engine or Docker Desktop](https://www.docker.com/)

## Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/AbdulrhmanGoni/LLMs-TDM-server.git
   cd LLMs-TDM-server
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Set up the environment file:

Copy `.env.example` to `.env.development`, `.env.test` and `.env.production` files and modify the variables in these files according to your settings

```
cp .env.example .env.development
cp .env.example .env.test
cp .env.example .env.production
```

  - `.env.development` file for development environment
  - `.env.test` file for tests correctly
  - `.env.production` file for production environment

> Note: You can see more details about the environment variables inside `.env.example` file

4. Start the server:
   - Starting the server in development environment:

     ```
     bun dev
     ```

The server should now be available at `http://localhost:9000` (or the port you specified).


# Tests :test_tube:

I use [Bun](https://bun.sh/)'s built-in and Jest-compatible [test runner](https://bun.sh/docs/cli/test) for writing and running tests.

> Note: 
> Don't forget to set the environment variables of .env.test` file before running the tests

You can copy the following template for quick start :point_down:

```
NODE_ENV=test
PORT=9100
DB_NAME=test
DB_HOST=127.0.0.1 # Default host of testing database
DB_PORT=270111 # Default port of testing database
DB_URL="mongodb://$DB_HOST:$DB_PORT/$DB_NAME?directConnection=true"
TESTING_USER_ID="user_Xm3A5q9gd3ghR73oh975bA" # Random user id for test
MUTE_LOGS=true
```

To run all tests use the following command:
```
bun test
```

To run a specific type of tests (unit, integration or e2e) use the following command:
```
bun test tests/<unit|integration|e2e>
```

To run a specific tests file just use the name of the file:
```
bun test <test-file-name>
```

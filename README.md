# LLMs Training Datasets Manager

LLMs Training Datasets Manager is a web application for creating and managing training datasets
with different formats for training Large Language Models (LLMs)
or for using them in Retrieval Augmented Generation (RAG) systems.

[![Tests Workflow](https://github.com/AbdulrhmanGoni/LLMs-TDM-server/actions/workflows/tests.yaml/badge.svg?branch=main)](https://github.com/AbdulrhmanGoni/LLMs-TDM-server/actions/workflows/tests.yaml)
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



# LLMs Training Datasets Manager

LLMs Training Datasets Manager is a web application for creating and managing training datasets
with different formats for training Large Language Models (LLMs)
or for using them in Retrieval Augmented Generation (RAG) systems.

[![Tests Workflow](https://github.com/AbdulrhmanGoni/LLMs-TDM-server/actions/workflows/tests.yaml/badge.svg?branch=main)](https://github.com/AbdulrhmanGoni/LLMs-TDM-server/actions/workflows/tests.yaml)
[![Code Coverage](https://codecov.io/gh/AbdulrhmanGoni/LLMs-TDM-server/branch/tests%2Fcollect-code-coverage/graph/badge.svg?token=QVHBAOJBBO)](https://app.codecov.io/gh/AbdulrhmanGoni/LLMs-TDM-server)

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

# Tech Stack

- Bun ( The all in one JavaScript + TypeScript runtime ) :fire:
- Typescript
- Docker
- MongoDB (With Replication & Sharding for availability and scalability)
- [Clerk](https://clerk.com/) (For authentication and managing users)

<div style="display: flex; gap: 25px">
  <img src="readme_file_icons/typescript.svg">
  <img src="readme_file_icons/bun.svg">
  <img src="readme_file_icons/docker.svg">
  <img src="readme_file_icons/mongodb.svg">
  <img src="readme_file_icons/clerk.svg">
</div>

FROM oven/bun:latest

WORKDIR /llms-tdm

COPY package.json ./

COPY bun.lockb ./

COPY . .

RUN bun install

CMD [ "bun", "start" ]
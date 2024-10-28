FROM oven/bun:latest

WORKDIR /llms-tdm

COPY package.json ./

RUN bun install

COPY . .

CMD [ "bun", "start" ]
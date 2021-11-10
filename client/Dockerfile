FROM node:15

WORKDIR /app

COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .

CMD ["npm", "run", "dev"]

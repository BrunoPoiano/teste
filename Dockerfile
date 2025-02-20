FROM node:20
WORKDIR /app
COPY . .
COPY .env .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]

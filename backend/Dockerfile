FROM node:20
WORKDIR /app
COPY . .
COPY .env .
RUN npm install && npm run build
EXPOSE 3000

CMD ["npx", "serve", "dist", "-l", "3000"]

FROM node:18-alpine

WORKDIR /app

COPY . /app/

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", ".", "-p", "8080", "-c-1"]

# Run the container
# docker build -t kaisheng-portfolio:v1 .
# docker run -p 8080:8080 kaisheng-portfolio:v1

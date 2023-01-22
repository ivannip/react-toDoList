
FROM node:16
WORKDIR /root/
COPY frontend/build/index.html  ./frontend/build/
COPY frontend/build/frontend.bundle.js ./frontend/build/
COPY frontend/build/favicon.ico ./frontend/build/
COPY backend-api/server.bundle.js ./backend-api/

EXPOSE 3000
CMD [ "node", "./backend-api/server.bundle.js" ]
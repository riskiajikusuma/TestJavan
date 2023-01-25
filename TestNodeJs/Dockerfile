FROM node:alpine

ADD . /app

# Application
ENV APP_PORT=3000
ENV APP_LOG=true

# Database
ENV DB_HOST=db-test-nodejs
ENV DB_NAME=''
ENV DB_USERNAME=''
ENV DB_PASSWORD=''
ENV DB_MAX_POOL=''
ENV DB_MIN_POOL=''
ENV DB_IDLE_TIME=''
ENV DB_ACQUIRE_TIME=''
ENV DB_LOG=true

WORKDIR /app

RUN echo "APP_PORT=${APP_PORT}}"  >> ".env"
RUN echo "APP_LOG=${APP_LOG}}"  >> ".env"

RUN echo "DB_HOST=${DB_HOST}"  >> ".env"
RUN echo "DB_NAME=${DB_NAME}"  >> ".env"
RUN echo "DB_USERNAME=${DB_USERNAME}"  >> ".env"
RUN echo "DB_PASSWORD=${DB_PASSWORD}"  >> ".env"
RUN echo "DB_MAX_POOL=${DB_MAX_POOL}"  >> ".env"
RUN echo "DB_MIN_POOL=${DB_MIN_POOL}"  >> ".env"
RUN echo "DB_ACQUIRE_TIME=${DB_ACQUIRE_TIME}"  >> ".env"
RUN echo "DB_IDLE_TIME=${DB_IDLE_TIME}"  >> ".env"
RUN echo "DB_LOG=${DB_LOG}"  >> ".env"

RUN npm install

EXPOSE ${APP_PORT}

CMD npm run migrate && npm run seed:all && npm start
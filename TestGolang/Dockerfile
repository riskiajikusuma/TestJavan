FROM golang:alpine

ADD . /app

# Application
ENV APP_PORT=4000

# Database
ENV DB_HOST=db-test-golang
ENV DB_USERNAME=''
ENV DB_PASSWORD=''
ENV DB_NAME=''
ENV DB_MAX_OPEN_CONN=''
ENV DB_MAX_IDLE_CONN=''
ENV DB_CONN_MAX_LIFE_TIME=''

WORKDIR /app

RUN echo "APP_HOST=${APP_HOST}}"  >> ".env"
RUN echo "APP_PORT=${APP_PORT}}"  >> ".env"

RUN echo "DB_HOST=${DB_HOST}"  >> ".env"
RUN echo "DB_USERNAME=${DB_USERNAME}"  >> ".env"
RUN echo "DB_PASSWORD=${DB_PASSWORD}"  >> ".env"
RUN echo "DB_NAME=${DB_NAME}"  >> ".env"
RUN echo "DB_MAX_OPEN_CONN=${DB_MAX_OPEN_CONN}"  >> ".env"
RUN echo "DB_MAX_IDLE_CONN=${DB_MAX_IDLE_CONN}"  >> ".env"
RUN echo "DB_CONN_MAX_LIFE_TIME=${DB_CONN_MAX_LIFE_TIME}"  >> ".env"

EXPOSE ${APP_PORT}

CMD cd db && go run migrate.go && cd .. && go run server.go
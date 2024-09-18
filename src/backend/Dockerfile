# backend/Dockerfile
FROM golang:1.22.5-alpine

RUN mkdir /app
WORKDIR /app
ADD . /app

ENV FRONT_URL=https://xivsightseeker-prototype-1045314413273.asia-northeast1.run.app

RUN go build -o /main .

EXPOSE 8080
CMD ["/main"]
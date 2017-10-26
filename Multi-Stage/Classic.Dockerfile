FROM golang:1.9
WORKDIR /go/src/https-get
COPY main.go ./
RUN CGO_ENABLED=0 go install -a -tags netgo -ldflags '-extldflags "-static"'
RUN ldd /go/bin/https-get | grep -q "not a dynamic executable"
CMD ["https-get"]
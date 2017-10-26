FROM golang:1.9 as builder
WORKDIR /go/src/joke-printer
COPY main.go ./
RUN CGO_ENABLED=0 go install -a -tags netgo -ldflags '-extldflags "-static"'
RUN ldd /go/bin/joke-printer | grep -q "not a dynamic executable"

FROM scratch
COPY --from=builder /go/bin/joke-printer /joke-printer
COPY --from=builder /etc/ssl/certs/ /etc/ssl/certs
CMD ["/joke-printer"]




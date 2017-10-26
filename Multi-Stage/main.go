package main

import (
	"io"
	"log"
	"net/http"
	"os"
)


type Response1 struct {
	Type   int
	Value []string
}

func main() {
	resp, err := http.Get("http://api.icndb.com/jokes/random?limitTo=[nerdy]")
	if err != nil {
		log.Fatal(err)
	} else {
		defer resp.Body.Close()
		io.Copy(os.Stdout, resp.Body)
	}
}
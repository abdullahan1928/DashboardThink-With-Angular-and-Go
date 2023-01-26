package main

import (
	"fmt"

	"github.com/abdullahan1928/server/router"
	"github.com/gorilla/handlers"

	// "github.com/rs/cors"
	"log"
	"net/http"
)

func main() {
	r := router.Router()
	// handler := cors.Default().Handler(r)
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	fmt.Println("Starting server on the port 3000...")
	log.Fatal(http.ListenAndServe("localhost:3000", handlers.CORS(headers, methods, origins)(r)))
}

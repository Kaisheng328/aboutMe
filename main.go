package main

import (
	"log"
	"net/http"
)

// becoming trailer website and portfolio firstt
func main() {
	// Initialize the database
	http.Handle("/", http.FileServer(http.Dir("./")))

	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))

}

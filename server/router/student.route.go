package router

import (
	"github.com/abdullahan1928/server/controllers"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/students", controllers.CreateStudent).Methods("POST")
	r.HandleFunc("/students", controllers.GetStudents).Methods("GET")
	r.HandleFunc("/student/{id}", controllers.GetStudent).Methods("GET")
	r.HandleFunc("/student/{id}", controllers.UpdateStudent).Methods("PUT")
	r.HandleFunc("/student/{id}", controllers.DeleteStudent).Methods("DELETE")

	return r
}

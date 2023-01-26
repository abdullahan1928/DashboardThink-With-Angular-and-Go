package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/abdullahan1928/server/models"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
)

// fake mongodb database
const connectionString = "mongodb+srv://abdullahan1928:1122@cluster0.qajpslf.mongodb.net/dashboard"
const dbName = "dashboard"
const collectionName = "students"

var collection *mongo.Collection

func init() {
	clientOption := options.Client().ApplyURI(connectionString)

	client, err := mongo.Connect(context.TODO(), clientOption)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection = client.Database(dbName).Collection(collectionName)

	fmt.Println("Collection instance created!")
}

func createStudent(student models.StudentSchema) {
	insertedStudent, err := collection.InsertOne(context.Background(), student)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Document: ", insertedStudent.InsertedID)
}

func getStudents() []primitive.M {
	cursor, err := collection.Find(context.Background(), bson.D{{}})

	if err != nil {
		log.Fatal(err)
	}

	defer cursor.Close(context.Background())

	var students []primitive.M

	for cursor.Next(context.Background()) {
		var student bson.M
		err := cursor.Decode(&student)

		if err != nil {
			log.Fatal(err)
		}

		students = append(students, student)
	}

	return students
}

func getStudent(studentId string) bson.M {
	id, _ := primitive.ObjectIDFromHex(studentId)
	filter := bson.M{"_id": id}

	studentDoc := collection.FindOne(context.Background(), filter)

	var student bson.M

	err := studentDoc.Decode(&student)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Student String: ", student)

	return student
}

func updateStudent(studentId string, r *http.Request) {
	id, _ := primitive.ObjectIDFromHex(studentId)
	filter := bson.M{"_id": id}

	var student models.StudentSchema
	_ = json.NewDecoder(r.Body).Decode(&student)

	update := bson.M{"$set": bson.M{"name": student.Name, "email": student.Email, "phone": student.Phone, "password": student.Password, "admissionDate": student.AdmissionDate}}

	updatedStudent, err := collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("ModifiedCount: ", updatedStudent.ModifiedCount)
}

func deleteStudent(studentId string) {
	id, _ := primitive.ObjectIDFromHex(studentId)
	filter := bson.M{"_id": id}

	deletedStudent, err := collection.DeleteOne(context.Background(), filter)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("DeletedCount: ", deletedStudent.DeletedCount)
}

func CreateStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "POST")

	var student models.StudentSchema
	_ = json.NewDecoder(r.Body).Decode(&student)

	createStudent(student)
	json.NewEncoder(w).Encode(student)
}

func GetStudents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(getStudents())
}

func GetStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	student := getStudent(params["id"])
	json.NewEncoder(w).Encode(student)
}

func UpdateStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	updateStudent(params["id"], r)
	updatedStudent := getStudent(params["id"])
	json.NewEncoder(w).Encode(updatedStudent)
}

func DeleteStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	deleteStudent(params["id"])

	msg := "Student with ID: " + params["id"] + " has been deleted"
	json.NewEncoder(w).Encode(msg)
}

package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TaskSchema struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name        string             `json:"name"`
	DueDate     primitive.DateTime  
	Priority    string
	Status      string
	Description string
}

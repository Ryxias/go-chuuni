package main

import (
	"github.com/Ryxias/go-chuuni/pkg/awslambda"
	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(awslambda.ApiRouter)
}

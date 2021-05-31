package awslambda

import (
	"log"
	"net/http"

	"github.com/Ryxias/go-chuuni/pkg/awslambda/response"
	"github.com/aws/aws-lambda-go/events"
)

var (
	handlers []HandlerInterface
)

func init() {
	handlers = []HandlerInterface{}
}

func ApiRouter(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	log.Printf("Api Request: %+v", request)

	response, err := getResponse(request)

	if err != nil {
		log.Printf("Api ERROR: %+v", err)
	}
	log.Printf("Api Response: %+v", response)

	return response, err
}

func getResponse(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	for _, h := range handlers {
		if h.Handles(request) {
			if h.Boot() != nil {
				return response.Json(http.StatusInternalServerError, nil)
			}
			return h.Handle(request)
		}
	}

	log.Printf("ERROR: ApiRouter failure: unrouteable request: [%+v] %+v", request.HTTPMethod, request.Resource)
	return response.Json(http.StatusMethodNotAllowed, nil)
}

type HandlerInterface interface {
	Handles(request events.APIGatewayProxyRequest) bool
	Boot() error
	Handle(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error)
}

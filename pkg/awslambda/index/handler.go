package index

import (
	"net/http"
	"os"

	"github.com/Ryxias/go-chuuni/pkg/awslambda/response"
	"github.com/aws/aws-lambda-go/events"
)

type GetIndexHandler struct {
	booted bool
}

func (h *GetIndexHandler) Boot() (err error) {
	if h.booted {
		return
	}

	_ = os.Getenv("ENV_VAR")

	h.booted = true
	return
}

func (h *GetIndexHandler) Handles(request events.APIGatewayProxyRequest) bool {
	return request.Resource == "/_api" && request.HTTPMethod == "GET"
}

func (h *GetIndexHandler) Handle(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

	return response.Json(
		http.StatusOK,
		map[string]string{"status": "healthy"},
	)
}

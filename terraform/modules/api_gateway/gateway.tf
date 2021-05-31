#
# Top level REST API resource
#
resource "aws_api_gateway_rest_api" "default" {
  name        = "${var.prefix}_chuuni"
  description = "Chuuni's REST API Gateway"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  # Use the authorizer's UsageIdentifierKey to uniquely identify an endpoint.
  # AUTHORIZER or HEADER
  api_key_source = "HEADER"
}

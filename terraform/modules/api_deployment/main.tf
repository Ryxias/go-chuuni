##########################
# Stages and Deployments #
##########################

# resource "aws_api_gateway_stage" "stage" {
#   stage_name    = "v1"
#   rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
#   deployment_id = aws_api_gateway_deployment.api_deployment.id
# }


resource "aws_api_gateway_deployment" "default" {
  rest_api_id = var.api_gateway_id
  stage_name  = var.stage_name

  triggers = {
    redeployment = var.redeployment_fingerprint
  }

  lifecycle {
    create_before_destroy = true
  }
}

# resource "aws_api_gateway_method_settings" "s" {
#   rest_api_id = aws_api_gateway_rest_api.api_gateway.id
#   stage_name  = var.stage_name
#   method_path = "*/*"

#   settings {
#     metrics_enabled = true
#     logging_level   = "INFO"

#   #   # In most cases, each client makes:
#   #   # - 1x preflight
#   #   # - 0 or more eventuploads
#   #   # - 2x ruledownload
#   #   # - 1x preflights
#   #   #
#   #   # Roughly 10 requests every checkin, in a worst case. A good burst rate is equal to the number of
#   #   # (anticipated) clients, and the rate limit should just be:
#   #   #
#   #   #  - number of clients * (10 req/checkin) * (1/10 checkin/min) * (1/60 min/sec) = clients/60 req/sec
#   #   throttling_burst_limit = 7000
#   #   throttling_rate_limit = 7000 / 60
#   }
# }

# @doc https://www.terraform.io/docs/providers/aws/r/api_gateway_base_path_mapping.html
resource "aws_api_gateway_base_path_mapping" "default" {
  api_id      = var.api_gateway_id
  stage_name  = aws_api_gateway_deployment.default.stage_name
  domain_name = var.domain_name
}


output "api_gateway_id" {
  value = aws_api_gateway_rest_api.default.id
}

output "api_gateway_root_resource_id" {
  value = aws_api_gateway_rest_api.default.root_resource_id
}

output "api_gateway_execution_arn" {
  value = aws_api_gateway_rest_api.default.execution_arn
}


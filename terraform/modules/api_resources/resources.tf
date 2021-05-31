#
# API Resources
#

# /_api base resource
module "api_root_resource" {
  source = "./resource"

  gateway_rest_api_id      = var.api_gateway_id
  parent_resource_id       = var.api_gateway_root_resource_id
  resource_path            = "_api"
  integration_http_methods = ["GET"]
  lambda_invocation_arn    = module.index_function.lambda_alias_invoke_arn

  # authorizer_id            = module.default_api_gateway_authorizer.api_gateway_authorizer_id
}



# /health resources
module "health_api" {
  source = "./resource"

  gateway_rest_api_id      = var.api_gateway_id
  parent_resource_id       = module.api_root_resource.resource_id
  resource_path            = "health"
  integration_http_methods = ["GET"]
  lambda_invocation_arn    = module.health_function.lambda_alias_invoke_arn

  # authorizer_id            = module.default_api_gateway_authorizer.api_gateway_authorizer_id
}

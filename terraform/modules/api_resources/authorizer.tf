module "default_api_gateway_authorizer" {
  source = "./authorizer"

  prefix              = var.prefix
  name                = "default"
  api_gateway_id      = var.api_gateway_id
  lambda_function_arn = module.authorizer_function.lambda_function_arn
  lambda_invoke_arn   = module.authorizer_function.lambda_invoke_arn
  token_based         = true
}

module "authorizer_function" {
  source = "../lambda_function"

  prefix                    = var.prefix
  region                    = var.region
  alias_name                = var.stage_name

  lambda_source_s3_bucket   = var.lambda_source_s3_bucket
  lambda_source_s3_key      = var.lambda_source_s3_key
  lambda_source_hash        = var.lambda_source_hash
  lambda_source_handler     = "${var.lambda_source_handler_basepath}/api_authorizer"

  endpoint                  = "authorizer"
  api_gateway_execution_arn = var.api_gateway_execution_arn

  env_vars = {
    REGION      = var.region
  }
}

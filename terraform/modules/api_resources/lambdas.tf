module "index_function" {
  source = "../lambda_function"

  prefix                    = var.prefix
  region                    = var.region
  alias_name                = var.stage_name

  lambda_source_s3_bucket   = var.lambda_source_s3_bucket
  lambda_source_s3_key      = var.lambda_source_s3_key
  lambda_source_hash        = var.lambda_source_hash
  lambda_source_handler     = "${var.lambda_source_handler_basepath}/api"

  endpoint                  = "index"
  api_gateway_execution_arn = var.api_gateway_execution_arn

  env_vars = {
    REGION        = var.region
  }
}

module "health_function" {
  source = "../lambda_function"

  prefix                    = var.prefix
  region                    = var.region
  alias_name                = var.stage_name

  lambda_source_s3_bucket   = var.lambda_source_s3_bucket
  lambda_source_s3_key      = var.lambda_source_s3_key
  lambda_source_hash        = var.lambda_source_hash
  lambda_source_handler     = "${var.lambda_source_handler_basepath}/api"

  endpoint                  = "health"
  api_gateway_execution_arn = var.api_gateway_execution_arn

  env_vars = {
    REGION        = var.region
  }
}

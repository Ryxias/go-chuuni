
data "aws_route53_zone" "chuuni" {
  name = "chuuni.me"
}

locals {
  # Conveniently put here, in case you want to change it to have a subdomain in the future
  domain_name = data.aws_route53_zone.chuuni.name
}

module "web_source_code" {
  source = "../modules/web"

  prefix         = var.prefix
  app_build_path = var.web_build_path
}


module "dns_records" {
  source = "../modules/dns"

  domain_name      = local.domain_name
  route53_zone_id  = data.aws_route53_zone.chuuni.zone_id
}


module "dynamodb" {
  source = "../modules/dynamodb"

  prefix                       = var.prefix
  read_write_lambda_role_names = []
}

module "api_source" {
  source = "../modules/lambda_source"

  prefix        = var.prefix
  zip_file_path = var.zip_file_path
}


module "api_gateway" {
  source = "../modules/api_gateway"

  prefix     = var.prefix
  region     = var.region
  account_id = var.account_id
  # stage_name = "prod"

  route53_zone_id   = data.aws_route53_zone.chuuni.zone_id
  route53_zone_name = data.aws_route53_zone.chuuni.name

  # lambda_source_s3_bucket = module.api_source.bucket_name
  # lambda_source_s3_key    = module.api_source.source_key
  # lambda_source_hash      = module.api_source.source_code_hash
  # lambda_source_handler_basepath = "build/linux"
}

module "api_resources" {
  source = "../modules/api_resources"

  prefix     = var.prefix
  region     = var.region
  stage_name = "prod"
  # account_id = var.account_id

  lambda_source_s3_bucket = module.api_source.bucket_name
  lambda_source_s3_key    = module.api_source.source_key
  lambda_source_hash      = module.api_source.source_code_hash
  lambda_source_handler_basepath = "build/linux"

  web_s3_bucket_name = module.web_source_code.bucket_name

  api_gateway_id               = module.api_gateway.api_gateway_id
  api_gateway_execution_arn    = module.api_gateway.api_gateway_execution_arn
  api_gateway_root_resource_id = module.api_gateway.api_gateway_root_resource_id
}

module "api_deployment" {
  source = "../modules/api_deployment"

  api_gateway_id = module.api_gateway.api_gateway_id
  stage_name     = "prod"
  domain_name    = module.dns_records.domain_name
  redeployment_fingerprint = join(",", [
    sha1(jsonencode(module.api_gateway)),
    module.api_resources.fingerprint,
  ])
}

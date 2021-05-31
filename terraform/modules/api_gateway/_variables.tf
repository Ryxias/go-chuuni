variable "prefix" {
  type        = string
  description = "Prefix to all resource names"
}

variable "region" {
  type        = string
  description = "AWS Region"
}

variable "account_id" {
  type        = string
  description = "AWS Account Id"
}

# variable "stage_name" {
#   type        = string
#   description = "Name of stage to use for this deployment"
# }

variable "route53_zone_id" {
type        = string
  description = "The name of a Route 53 Hosted Zone to use."
}

variable "route53_zone_name" {
  type        = string
  description = "The name of a Route 53 Hosted Zone to use."
}

# variable "lambda_source_s3_bucket" {
#   type        = string
#   description = "Name of S3 bucket used for uploading Lambda code"
# }

# variable "lambda_source_s3_key" {
#   type        = string
#   description = "Key of S3 object that is the zip containing the go binary for Lambda"
# }

# variable "lambda_source_hash" {
#   type        = string
#   description = "Base64 encoded hash of S3 object contents"
# }

# # Will generally correspond to the build/ directory from the Makefile
# # Needed to resolve the relative path to the binary(s)
# variable "lambda_source_handler_basepath" {
#   type        = string
#   description = "Lambda function handler base path, without trailing slash"
# }

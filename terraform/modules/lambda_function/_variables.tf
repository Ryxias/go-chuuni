variable "prefix" {
  type        = string
  description = "Prefix to all resource names"
}

variable "region" {
  type        = string
  description = "AWS Region"
}


# Where the source code goes
variable "lambda_source_s3_bucket" {
  type        = string
  description = "Name of S3 bucket used for uploading Lambda code"
}

variable "lambda_source_s3_key" {
  type        = string
  description = "Key of S3 object that is the zip containing the go binary for Lambda"
}

variable "lambda_source_hash" {
  type        = string
  description = "Base64 encoded hash of S3 object contents"
}

variable "lambda_source_handler" {
  type        = string
  description = "Lambda function handler path"
}

# Configurations for the Lambda
variable "alias_name" {
  type        = string
  description = "Name to use as alias for Lambda function"
  default     = "dev"
}

variable "endpoint" {
  type        = string
  description = "Name to use as alias for Lambda function"
}

variable "env_vars" {
  type        = map(string)
  description = "Map of environment variables to pass to the function"
  default     = {}
}

variable "api_gateway_execution_arn" {
  type        = string
  description = "Execution ARN of the API gateway"
}

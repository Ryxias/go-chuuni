variable "prefix" {
  type        = string
  description = "Prefix to all resource names"
}

variable "name" {
  type = string
  description = "A specific name for this authorizer"
}

variable "api_gateway_id" {
  type        = string
  description = "Resource Id of the API Gateway that this authorizer is attached to"
}

variable "lambda_function_arn" {
  type        = string
}

variable "lambda_invoke_arn" {
  type        = string
}

variable "token_based" {
  type = bool
}

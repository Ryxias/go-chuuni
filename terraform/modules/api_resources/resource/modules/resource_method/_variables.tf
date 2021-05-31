variable "gateway_rest_api_id" {
  type        = string
  description = "The resource id of the AWS REST API Gateway that this resource belongs to"
}

variable "gateway_resource_id" {
  type        = string
  description = "The resource id of the AWS API Gateway Resource that this resource belongs to"
}

variable "http_method" {
  type        = string
  description = "The HTTP method for this integration"
}

# This isn't the function arn or qualified function arn. It's an invocation ARN which is actually scoped to API Gate
# arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:009715504418:function:ryxias20200629_dartboard_api_handler/invocations
variable "lambda_invocation_arn" {
  type        = string
  description = "The ARN of the API handler for the Lambda"
}

variable "authorizer_id" {
  type        = string
  description = "(OPTIONAL) Id of REST API Authorizer. Omit for NO authorization."
  default     = ""
}

variable "api_key_required" {
  type        = bool
  description = "(OPTIONAL) boolean to require api keys"
}

variable "success_response_model" {
  type = string
  default = ""
}

variable "request_model" {
  type = string
  default = ""
}
#
# Lambdas
#

# FIXME (derek.wang) Could use the csirt-specific Lambda module, but would have to update it to expose
# the invoke_arn as an output. For now this is fine, I think.
resource "aws_lambda_function" "api_handler" {
  function_name = "${var.prefix}_chuuni_${var.endpoint}"
  role          = aws_iam_role.api_handler_role.arn
  runtime       = "go1.x"
  publish       = false # Do not publish a new version; saves disk space

  s3_bucket        = var.lambda_source_s3_bucket
  s3_key           = var.lambda_source_s3_key
  handler          = var.lambda_source_handler
  source_code_hash = var.lambda_source_hash

  # The lambda's timeout is intentionally short right now.
  #   Most HTTP API requests should not take a huge amount of time, or they will cause the UI to hang which is a
  #   bad user experience. Additionally, it can be a sign of excessively large requests that are doing "too much".
  #   It's far better to either:
  #     1) Implement smaller endpoints and fan out requests, clientside
  #     2) Use POST and return a created resource via http 201 or 202. Then, have the server asynchronously process
  #        this resource until it reaches a consistent state. Meanwhile, the client can poll with GET requests
  #        until the resource reaches a consistent state.
  timeout = 10

  dynamic "environment" {
    for_each = length(var.env_vars) == 0 ? [] : [1]
    content {
      variables = var.env_vars
    }
  }
}

resource "aws_lambda_alias" "api_handler" {
  name             = var.alias_name
  description      = "${var.alias_name} alias for ${aws_lambda_function.api_handler.function_name}"
  function_name    = aws_lambda_function.api_handler.function_name
  function_version = aws_lambda_function.api_handler.version
}


# Grant API Gateway permission to invoke the Lambda, via its execution ARN
resource "aws_lambda_permission" "api_handler_permissions" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_handler.function_name
  principal     = "apigateway.amazonaws.com"
  qualifier     = aws_lambda_alias.api_handler.name

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  # The /*/*/* part allows invocation from any stage, method and resource path
  # within API Gateway REST API.
  source_arn = "${var.api_gateway_execution_arn}/*/*/*"
}

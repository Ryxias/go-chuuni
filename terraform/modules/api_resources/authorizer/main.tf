#
# REST API Authorizer
#
# This module covers the REST API Gateway Authorizer
#
resource "aws_api_gateway_authorizer" "api_authorizer" {
  name                   = "${var.prefix}_chuuni_api_gateway_${var.name}_authorizer" # Authorizers are scoped per gateway, so names don't conflict
  rest_api_id            = var.api_gateway_id

  authorizer_credentials = aws_iam_role.invocation_role.arn

  # # https://github.com/hashicorp/terraform-provider-aws/issues/5845#issuecomment-517998604
  authorizer_uri                   = var.lambda_invoke_arn
  type                             = var.token_based ? "TOKEN" : "REQUEST"
  identity_source                  = var.token_based ? "method.request.header.Authorization" : ""
  identity_validation_expression   = ""
  authorizer_result_ttl_in_seconds = var.token_based ? 300 : 0
}

#
# IAM
#

# The role that API Gateway assumes and uses to then invoke the lambda function
# This is NOT the same role as the role that the lambda function invokes AS
resource "aws_iam_role" "invocation_role" {
  name               = "${var.prefix}_chuuni_api_gateway_${var.name}_authorizer"
  path               = "/chuuni/"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json

  tags = {
    Service = "Chuuni"
  }
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    sid     = "AllowAPIGatewayToAssumeAuthorizerRole"
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["apigateway.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy" "invocation_policy" {
  name   = "${var.prefix}_AllowApiGatewaytoInvokeAuthorizerLambda"
  role   = aws_iam_role.invocation_role.id
  policy = data.aws_iam_policy_document.invocation_policy.json
}

data "aws_iam_policy_document" "invocation_policy" {
  statement {
    effect  = "Allow"
    actions = ["lambda:InvokeFunction"]

    resources = [
      var.lambda_function_arn,
    ]
  }
}

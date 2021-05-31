#
# This file contains all terraform resources to hook up API Gateway to S3 bucket
#   guide: https://jcdubs.medium.com/api-gateway-s3-proxy-a72e398b4d03
#

# Anything under /assets/*** will go to these resources
# These resources will attempt to fetch something under the /assets/ directory in the asset S3 bucket
resource "aws_api_gateway_resource" "assets_root_resource" {
  rest_api_id = var.api_gateway_id
  parent_id   = var.api_gateway_root_resource_id
  path_part   = "assets"
}
resource "aws_api_gateway_resource" "asset_resource" {
  rest_api_id = var.api_gateway_id
  parent_id   = aws_api_gateway_resource.assets_root_resource.id
  path_part   = "{item}"
}

# Gateway Method (aka Method Request)
# Defines which HTTP method this particular resource action listens on
# It also defines how the request is authorized.
resource "aws_api_gateway_method" "asset_resource_method" {
  rest_api_id      = var.api_gateway_id
  resource_id      = aws_api_gateway_resource.asset_resource.id
  http_method      = "GET"

  authorization = "NONE"
  # authorization    = "CUSTOM"
  # authorizer_id    = module.default_api_gateway_authorizer.api_gateway_authorizer_id

  request_parameters = {
    # Setting false makes the method "aware" of these headers, but they aren't required
    "method.request.header.Content-Disposition" = false
    "method.request.header.Content-Type"        = false
    "method.request.path.item"                  = false
  }
}

# Gateway Integration (aka Integration Request)
# The Gateway integration specifies whether to proxy the request to AWS Lambda, or just MOCKs a response
resource "aws_api_gateway_integration" "asset_resource_integration" {
  rest_api_id             = var.api_gateway_id
  resource_id             = aws_api_gateway_resource.asset_resource.id
  http_method             = aws_api_gateway_method.asset_resource_method.http_method

  integration_http_method = "GET"
  type                    = "AWS"

  # This is equivalent to the "path override"
  uri                     = "arn:aws:apigateway:${var.region}:s3:path/${var.web_s3_bucket_name}/assets/{item}"
  credentials             = aws_iam_role.apigateway_access_web_assets_role.arn
  # credentials             = "arn:aws:iam::${var.aws_account_id}:role/ryxias-test-apigw-to-s3"

  request_parameters = {
    "integration.request.path.item"                  = "method.request.path.item"
    "integration.request.header.Content-Disposition" = "method.request.header.Content-Disposition"
    "integration.request.header.Content-Type"        = "method.request.header.Content-Type"
  }
}


# Method Response 200
resource "aws_api_gateway_method_response" "asset_resource_response_200" {
  rest_api_id = var.api_gateway_id
  resource_id = aws_api_gateway_resource.asset_resource.id
  http_method = aws_api_gateway_integration.asset_resource_integration.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Content-Type"                = true
    "method.response.header.Content-Disposition"         = true
  }
}


# Integration Response
resource "aws_api_gateway_integration_response" "asset_resource_integration_response_200" {
  rest_api_id = var.api_gateway_id
  resource_id = aws_api_gateway_resource.asset_resource.id
  http_method = aws_api_gateway_method.asset_resource_method.http_method
  status_code = aws_api_gateway_method_response.asset_resource_response_200.status_code

  # selection_pattern = "2\\d{2}"

  response_parameters = {
    "method.response.header.Content-Disposition" = "integration.response.header.Content-Disposition"
    "method.response.header.Content-Type"        = "integration.response.header.Content-Type"
  }
}

# The catchall endpoint
#
#   When hitting /{proxy+}, the API gateway assumes it's a hardlink from somewhere else and will ALWAYS
#   return the content of the /index.html file located at the root of the S3 assets bucket.
resource "aws_api_gateway_resource" "catchall_resource" {
  rest_api_id = var.api_gateway_id
  parent_id   = var.api_gateway_root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "catchall_resource_method" {
  rest_api_id      = var.api_gateway_id
  resource_id      = aws_api_gateway_resource.catchall_resource.id
  http_method      = "GET"

  authorization = "NONE"
  # authorization    = "CUSTOM"
  # authorizer_id    = module.default_api_gateway_authorizer.api_gateway_authorizer_id

  request_parameters = {
    # Setting false makes the method "aware" of these headers, but they aren't required
    "method.request.header.Content-Disposition" = false
    "method.request.header.Content-Type"        = false
    # "method.request.path.item"                  = false
  }
}

# Gateway Integration (aka Integration Request)
# The Gateway integration specifies whether to proxy the request to AWS Lambda, or just MOCKs a response
resource "aws_api_gateway_integration" "catchall_resource_integration" {
  rest_api_id             = var.api_gateway_id
  resource_id             = aws_api_gateway_resource.catchall_resource.id
  http_method             = aws_api_gateway_method.catchall_resource_method.http_method

  integration_http_method = "GET"
  type                    = "AWS"

  # This is equivalent to the "path override"
  uri                     = "arn:aws:apigateway:${var.region}:s3:path/${var.web_s3_bucket_name}/index.html"
  credentials             = aws_iam_role.apigateway_access_web_assets_role.arn
  # credentials             = "arn:aws:iam::${var.aws_account_id}:role/ryxias-test-apigw-to-s3"

  request_parameters = {
    # "integration.request.path.item"                  = "method.request.path.item"
    "integration.request.header.Content-Disposition" = "method.request.header.Content-Disposition"
    "integration.request.header.Content-Type"        = "method.request.header.Content-Type"
  }
}

resource "aws_api_gateway_method_response" "catchall_resource_response_200" {
  rest_api_id = var.api_gateway_id
  resource_id = aws_api_gateway_resource.catchall_resource.id
  http_method = aws_api_gateway_method.catchall_resource_method.http_method
  status_code = "200"

  # response_parameters = {
  #   "method.response.header.Location" = true
  # }

  response_parameters = {
    "method.response.header.Content-Type"                = true
    "method.response.header.Content-Disposition"         = true
  }
}


# Integration Response
resource "aws_api_gateway_integration_response" "catchall_resource_integration_response_200" {
  rest_api_id = var.api_gateway_id
  resource_id = aws_api_gateway_resource.catchall_resource.id
  http_method = aws_api_gateway_method.catchall_resource_method.http_method
  status_code = aws_api_gateway_method_response.catchall_resource_response_200.status_code

  # selection_pattern = "4\\d{2}"

  # response_parameters = {
  #   # The double-quotes are intentional; this passes the literal value '/index.html' (with single quotes) to
  #   # the api gateway, which instructs it to hard-code the response rather than try to derive it from a variable
  #   "method.response.header.Location" = "'/index.html'"
  # }

  response_parameters = {
    "method.response.header.Content-Disposition" = "integration.response.header.Content-Disposition"
    "method.response.header.Content-Type"        = "integration.response.header.Content-Type"
  }
}



#
#
#
# index redirect
#   redirect all request on / to /index.html, so that it hits the s3 index object
#   FIXME (derek.wang) is it preferrable to just directly return the index.html object rather than redirect?
#

# Gateway Method (aka Method Request)
# Defines which HTTP method this particular resource action listens on
# It also defines how the request is authorized.
resource "aws_api_gateway_method" "index_resource_method" {
  rest_api_id      = var.api_gateway_id
  resource_id      = var.api_gateway_root_resource_id
  http_method      = "GET"

  authorization = "NONE"
  # authorization    = "CUSTOM"
  # authorizer_id    = module.default_api_gateway_authorizer.api_gateway_authorizer_id
}

# Gateway Integration (aka Integration Request)
# The Gateway integration specifies whether to proxy the request to AWS Lambda, or just MOCKs a response
resource "aws_api_gateway_integration" "index_resource_integration" {
  rest_api_id = var.api_gateway_id
  resource_id = var.api_gateway_root_resource_id
  http_method = aws_api_gateway_method.index_resource_method.http_method
  type        = "MOCK"

  # This is required in order to give the gateway integration response something to map from
  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

# Method Response 301
resource "aws_api_gateway_method_response" "index_response_301" {
  rest_api_id = var.api_gateway_id
  resource_id = var.api_gateway_root_resource_id
  http_method = aws_api_gateway_integration.index_resource_integration.http_method
  status_code = "301"

  response_parameters = {
    "method.response.header.Location" = true
  }
}


# Integration Response
resource "aws_api_gateway_integration_response" "index_resource_integration_response_301" {
  rest_api_id = var.api_gateway_id
  resource_id = var.api_gateway_root_resource_id
  http_method = aws_api_gateway_method.index_resource_method.http_method
  status_code = aws_api_gateway_method_response.index_response_301.status_code

  response_parameters = {
    # The double-quotes are intentional; this passes the literal value '/index.html' (with single quotes) to
    # the api gateway, which instructs it to hard-code the response rather than try to derive it from a variable
    "method.response.header.Location" = "'/index.html'"
  }
}


#
# favicon.ico
#
resource "aws_api_gateway_resource" "favicon_resource" {
  rest_api_id = var.api_gateway_id
  parent_id   = var.api_gateway_root_resource_id
  path_part   = "favicon.ico"
}
resource "aws_api_gateway_method" "favicon_resource_method" {
  rest_api_id      = var.api_gateway_id
  resource_id      = aws_api_gateway_resource.favicon_resource.id
  http_method      = "GET"

  authorization    = "NONE"
}
resource "aws_api_gateway_integration" "favicon_resource_integration" {
  rest_api_id = var.api_gateway_id
  resource_id = aws_api_gateway_resource.favicon_resource.id
  http_method = aws_api_gateway_method.favicon_resource_method.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}
resource "aws_api_gateway_method_response" "favicon_response_404" {
  rest_api_id = var.api_gateway_id
  resource_id = aws_api_gateway_resource.favicon_resource.id
  http_method = aws_api_gateway_integration.favicon_resource_integration.http_method
  status_code = "404"
}
resource "aws_api_gateway_integration_response" "favicon_resource_integration_response_404" {
  rest_api_id = var.api_gateway_id
  resource_id = aws_api_gateway_resource.favicon_resource.id
  http_method = aws_api_gateway_method.favicon_resource_method.http_method
  status_code = aws_api_gateway_method_response.favicon_response_404.status_code
}




#
# IAM Roles and such
#
resource "aws_iam_role" "apigateway_access_web_assets_role" {
  name = "${var.prefix}_chuuni_apigateway_web_s3"
  assume_role_policy = data.aws_iam_policy_document.apigateway_assume_role_policy.json
  path               = "/chuuni/"

  tags = {
    Service = "Chuuni"
  }
}

data "aws_iam_policy_document" "apigateway_assume_role_policy" {
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = [
        "apigateway.amazonaws.com"
      ]
    }
  }
}

resource "aws_iam_role_policy_attachment" "allow_assets_s3_bucket_access" {
  role       = aws_iam_role.apigateway_access_web_assets_role.name
  policy_arn = aws_iam_policy.allow_assets_s3_bucket_access.arn
}

resource "aws_iam_policy" "allow_assets_s3_bucket_access" {
  name        = "${var.prefix}_chuuni_allow_assets_s3_bucket_access"
  path        = "/chuuni/"
  description = "Policy for allowing read access to the assets S3 bucket"
  policy      = data.aws_iam_policy_document.allow_assets_s3_bucket_access.json
}

data "aws_iam_policy_document" "allow_assets_s3_bucket_access" {
  statement {
    effect = "Allow"
    actions = [
      "s3:Get*",
      "s3:List*",
    ]

    resources = [
      "arn:aws:s3:::${var.web_s3_bucket_name}",
      "arn:aws:s3:::${var.web_s3_bucket_name}/*",
    ]
  }
}

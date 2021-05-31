#
# IAM
#

# IAM Role for the API Handler Lambda
resource "aws_iam_role" "api_handler_role" {
  name               = "${var.prefix}_chuuni_lambda_${var.endpoint}"
  assume_role_policy = data.aws_iam_policy_document.lambda_execution_policy.json
  path               = "/chuuni/"

  tags = {
    Service = "Chuuni"
  }
}

data "aws_iam_policy_document" "lambda_execution_policy" {
  statement {
    sid     = "AllowLambdaToAssumeRole"
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

# Attach write permissions for CloudWatch logs
data "aws_iam_policy" "basic_execution_role" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "basic_execution_role" {
  role       = aws_iam_role.api_handler_role.id
  policy_arn = data.aws_iam_policy.basic_execution_role.arn
}

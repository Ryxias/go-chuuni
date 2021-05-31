#
# Policy to be attached to specified Lambda function roles
#
# Read/Write DynamoDB policy

data "aws_iam_policy_document" "read_write" {
  statement {
    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:DescribeTable",
      "dynamodb:GetItem",
      "dynamodb:Query",
      "dynamodb:Scan",
    ]

    resources = [
      aws_dynamodb_table.default.arn,
    ]
  }

  # Allow PutItem, but only on certain key prefixes, for the purposes
  # of uploading new config data
  statement {
    actions = [
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
    ]

    resources = [
      aws_dynamodb_table.default.arn,
    ]

  }
}

resource "aws_iam_policy" "read_write" {
  name   = "${var.prefix}_chuuni_read_write_dynamodb"
  path   = "/chuuni/"
  policy = data.aws_iam_policy_document.read_write.json
}

# Ideally the below resource would use for_each but
# terraform cannot use for_each with computed properties
resource "aws_iam_role_policy_attachment" "read_write" {
  count      = length(var.read_write_lambda_role_names)
  role       = element(var.read_write_lambda_role_names, count.index)
  policy_arn = aws_iam_policy.read_write.arn
}



# # Ideally the below resource would use for_each but
# # terraform cannot use for_each with computed properties
# resource "aws_iam_role_policy_attachment" "read_only" {
#   count      = length(local.read_only_lambda_role_names)
#   role       = element(local.read_only_lambda_role_names, count.index)
#   policy_arn = aws_iam_policy.read_only.arn
# }


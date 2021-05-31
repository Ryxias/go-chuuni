#
# DynamoDB table
#

resource "aws_dynamodb_table" "default" {
  name         = "${var.prefix}_chuuni"
  billing_mode = "PAY_PER_REQUEST"

  hash_key  = "PK"
  range_key = "SK"

  attribute {
    name = "PK"
    type = "S"
  }

  attribute {
    name = "SK"
    type = "S"
  }

  tags = {
    Service = "Chuuni"
  }
}

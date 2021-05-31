output "dynamodb_arn" {
  value = aws_dynamodb_table.default.arn
}

output "read_write_iam_policy_arn" {
  value = aws_iam_policy.read_write.arn
}

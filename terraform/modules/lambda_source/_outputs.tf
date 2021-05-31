output "bucket_name" {
  value = aws_s3_bucket_object.api_handler_source_code.bucket
}

output "source_key" {
  value = aws_s3_bucket_object.api_handler_source_code.key
}

output "source_code_hash" {
  # value = filebase64sha256(var.zip_file_path)
  value = filemd5(var.zip_file_path)
}

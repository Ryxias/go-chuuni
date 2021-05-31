#
# S3 Bucket for Lambda source
#
resource "aws_s3_bucket" "default" {
  bucket = local.source_bucket_name
  acl    = "private"

  policy = format(
    data.aws_iam_policy_document.enforce_ssl_access.json,
    local.source_bucket_name,
    local.source_bucket_name
  )

  force_destroy = true

  versioning {
    enabled = true
  }

  tags = {
    Service = "Chuuni"
  }
}

resource "aws_s3_bucket_object" "api_handler_source_code" {
  bucket = aws_s3_bucket.default.bucket
  key    = "api-source.zip"
  source = var.zip_file_path
  etag   = filemd5(var.zip_file_path)
}

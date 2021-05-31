resource "aws_s3_bucket" "assets_bucket" {
  bucket = "${var.prefix}-chuuni-web"
  acl    = "private"
}

resource "aws_s3_bucket_object" "website_files" {
  for_each     = fileset(var.app_build_path, "**/*.*")
  bucket       = aws_s3_bucket.assets_bucket.bucket
  key          = replace(each.value, var.app_build_path, "")
  source       = "${var.app_build_path}/${each.value}"
  etag         = filemd5("${var.app_build_path}/${each.value}")
  content_type = lookup(local.mime_types, split(".", each.value)[length(split(".", each.value)) - 1])
}

# Grant CloudFront to access this S3 bucket
resource "aws_s3_bucket_policy" "ui_bucket_policy" {
  bucket = aws_s3_bucket.assets_bucket.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

data "aws_iam_policy_document" "s3_policy" {
  # Deny all non HTTPS requests
  statement {
    sid        = "DenyUnSecureCommunications"
    effect     = "Deny"
    actions    = ["s3:*"]
    resources  = [aws_s3_bucket.assets_bucket.arn]

    principals {
      type        = "*"
      identifiers = ["*"]
    }

    condition {
      test     = "Bool"
      variable = "aws:SecureTransport"
      values = [
        "false"
      ]
    }
  }

  # statement {
  #   actions   = ["s3:GetObject"]
  #   resources = ["${aws_s3_bucket.assets_bucket.arn}/*"]

  #   principals {
  #     type        = "AWS"
  #     identifiers = [
  #       aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn
  #     ]
  #   }
  # }

  # statement {
  #   actions   = ["s3:ListBucket"]
  #   resources = [aws_s3_bucket.assets_bucket.arn]

  #   principals {
  #     type        = "AWS"
  #     identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
  #   }
  # }
}



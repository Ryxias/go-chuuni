variable "prefix" {
  type        = string
  description = "Prefix to all resource names"
}

variable "zip_file_path" {
  type        = string
  description = "Full path to zip with go binary for Lambda to be uploaded to S3"

  # validation {
  #   condition = length(var.zip_file_path) <= 1 && substr(var.zip_file_path, 0, 1) != "/"
  #   error_message = "zip_file_path must be provided and must be absolute"
  # }
}

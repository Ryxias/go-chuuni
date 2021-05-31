#
# Makefile-provided variables
#
variable "zip_file_path" {
  type        = string
  description = "Path to zip on disk to use for deployment of Lambda functions. This gets passed in from 'make deploy' command"
}

variable "package_version" {
  type        = string
  description = "Version of golang binary being used. This value comes from git tags and is used when the Lambda package is uploaded to S3. This gets passed in from 'make deploy' command"
}

variable "web_build_path" {
  type        = string
  description = "Path to UI assets"
}

variable "region" {
  type = string
  description = "The AWS region"
}

variable "prefix" {
  type = string
  description = "Resource prefix"
}

variable "account_id" {
  type = string
  description = "AWS Account Id"
}

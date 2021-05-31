variable "prefix" {
  type = string
}

variable "read_write_lambda_role_names" {
  type = list(string)
  description = "Names of IAM Roles to give read/write access to"
}

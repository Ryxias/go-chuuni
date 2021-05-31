variable "stage_name" {
  type = string
}

variable "api_gateway_id" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "redeployment_fingerprint" {
  type = string
  description = "Unique id that will force a redeployment if it ever changes"
}

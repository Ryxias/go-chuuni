variable "prefix" {
  type        = string
  description = "Prefix to all resource names"
}

variable "app_build_path" {
  type        = string
  description = "Full path to local application build path where static assets (such as bundle.js) live"
}

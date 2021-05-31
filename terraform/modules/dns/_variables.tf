variable "domain_name" {
  type = string
  description = "The full domain name for the ACM cert + route 53 record; include the subdomain and it must match the hosted zone"
}

variable "route53_zone_id" {
  type = string
  description = "Zone ID of the hosted zone to add this record to"
}

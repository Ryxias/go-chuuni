output "acm_validation_certificate_arn" {
  value = aws_acm_certificate_validation.default.certificate_arn
}

output "domain_name" {
  value = aws_api_gateway_domain_name.default.domain_name
}

/*
Hack for this error:

Error: Invalid index

  on terraform/modules/api/route53.tf line 22, in resource "aws_route53_record" "api_cert_validation_record":
  22:   name    = aws_acm_certificate.api_ssl_certificate.domain_validation_options.0.resource_record_name

This value does not have any indices.
*/
locals {
  domain_validation_options = tomap(tolist(aws_acm_certificate.default.domain_validation_options)[0])
}

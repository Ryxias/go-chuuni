#
# Stuff down here is related to Route53 and ACM
#
resource "aws_acm_certificate" "default" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  tags = {
    Service = "Chuuni"
  }
}

resource "aws_acm_certificate_validation" "default" {
  certificate_arn = aws_acm_certificate.default.arn

  validation_record_fqdns = [
    aws_route53_record.cert_validation.fqdn
  ]
}

resource "aws_route53_record" "cert_validation" {
  name    = lookup(local.domain_validation_options, "resource_record_name", "")
  type    = lookup(local.domain_validation_options, "resource_record_type", "")
  zone_id = var.route53_zone_id
  records = [lookup(local.domain_validation_options, "resource_record_value", "")]
  ttl     = 300
}

# @doc https://www.terraform.io/docs/providers/aws/r/api_gateway_domain_name.html
resource "aws_api_gateway_domain_name" "default" {
  domain_name              = var.domain_name
  regional_certificate_arn = aws_acm_certificate_validation.default.certificate_arn
  security_policy          = "TLS_1_2"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# Example DNS record using Route53.
# Route53 is not specifically required; any DNS host can be used.
resource "aws_route53_record" "default" {
  zone_id = var.route53_zone_id
  name    = aws_api_gateway_domain_name.default.domain_name
  type    = "A"

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.default.regional_domain_name
    zone_id                = aws_api_gateway_domain_name.default.regional_zone_id
  }
}

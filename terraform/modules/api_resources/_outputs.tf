output "fingerprint" {
  value = join(",", [
    # sha1(jsonencode(aws_api_gateway_rest_api.api_gateway)),
    module.api_root_resource.integration_shas,
    module.health_api.integration_shas,
  ])
}

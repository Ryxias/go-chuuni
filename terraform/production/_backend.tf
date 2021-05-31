terraform {
  backend "s3" {
    # The S3 bucket in which the Terraform backend state is kept.
    #
    # This S3 bucket isn't created during a terraform apply and needs to be pre-existing. We're using my S3 bucket for now but
    # you are welcome to use any S3 bucket that exists on the AWS account.
    bucket = "chuuni-terraform-state"

    # The S3 key should be provided via the terraform init command
    # This is currently performed from the Makefile `deploy` target using:
    #   terraform init --backend-config="key=santa-$(prefix).tfstate" $(TF_DIR)
    key = "go-chuuni/production.tfstate"

    region  = "us-west-1"
    acl     = "private"
    encrypt = false
  }
}

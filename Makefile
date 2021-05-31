PKG = github.com/Ryxias/go-chuuni
VERSION := $(shell git describe --tags --always)

#
# Golang build environment
#
GO_BUILD_DIR = build
LINUX_BUILD_DIR = $(GO_BUILD_DIR)/linux
MACOS_BUILD_DIR = $(GO_BUILD_DIR)/macos
CLI_NAME = chuuni

HANDLERS_DIR = internal
HANDLERS = $(shell find $(HANDLERS_DIR) -type d -mindepth 1 -maxdepth 1 -exec basename {} \;)

PKG_DIR = package
# The zipped up source code for S3
DEPLOYMENT_ZIP_PATH = $(PKG_DIR)/deployment.zip

#
# ReactJS build
#
WEB_DIR = web
UI_BUILD_DIR = $(PWD)/dist/web


#
# Terraform args
#
TF_DEFAULT_FLAGS = --var zip_file_path="$(PWD)/$(DEPLOYMENT_ZIP_PATH)" --var package_version=$(VERSION) --var web_build_path=$(UI_BUILD_DIR)
LDFLAGS=-ldflags="-X main.version=$(VERSION)"



TERRAFORM_DEPLOYMENT_DIR = $(PWD)/terraform/production

# Default target for `make`
deploy: test build package tf-init justdeploy

# Performs deploy without running tests or rebuilding the application. This is useful if you just
# recently already did a build but did not make any code changes, and don't want to repeat the whole
# process, but you should generally AVOID using this make
justdeploy:
	terraform -chdir=$(TERRAFORM_DEPLOYMENT_DIR) apply $(TF_DEFAULT_FLAGS)

plan:
	terraform -chdir=$(TERRAFORM_DEPLOYMENT_DIR) plan $(TF_DEFAULT_FLAGS)

# Equivalent to a `terraform init` in the desired deployment directory.
# Required upon first deployment and when the tf state drifts too far from the local cached state.
tf-init:
	terraform -chdir=$(TERRAFORM_DEPLOYMENT_DIR) init


# Destroys the current deployment.
destroy: tf-init
	terraform -chdir=$(TERRAFORM_DEPLOYMENT_DIR) destroy $(TF_DEFAULT_FLAGS)


# When the API Gateway deployment fails to re-deploy (for whatever reason), you can use this
# command to force a redeployment
force-api-redeploy: .check-args
	terraform -chdir=$(TERRAFORM_DEPLOYMENT_DIR) taint module.api.aws_api_gateway_deployment.api_deployment
	terraform -chdir=$(TERRAFORM_DEPLOYMENT_DIR) apply --target=module.api.aws_api_gateway_deployment.api_deployment $(TF_DEFAULT_FLAGS)


clean:
	rm -rf $(BUILD_DIR) $(PKG_DIR)

deps:
	go mod download
	go mod tidy

# Builds the source for all of the Lambda functions
build: build_api build_web

package: build
	mkdir $(PKG_DIR)
	zip $(DEPLOYMENT_ZIP_PATH) $(LINUX_BUILD_DIR)/*

test:
	go test -cover -v ./...

.PHONY: .check-args deploy tf-init destroy clean docs deps build package test


build_web:
	cd $(WEB_DIR) && npm run build:production

build_api:
	$(info *** building endpoints)
	@for handler in $(HANDLERS); do \
		echo "building $$handler function: $(LINUX_BUILD_DIR)/$$handler" ; \
		GOOS=linux GOARCH=amd64 go build -o $(LINUX_BUILD_DIR)/$$handler ./internal/$$handler ; \
	done


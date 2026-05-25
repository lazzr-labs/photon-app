# openapi
openapi:
	sh openapi-generator/openapi-generator.sh

# expo start
expo-start-dev:
	cp .env.dev .env
	npx expo start -c

expo-start-stag:
	cp .env.stag .env
	npx expo start -c

expo-start-network:
	cp .env.network .env
	npx expo start -c

expo-run-ios-dev:
	cp .env.dev .env
	npx expo run:ios

expo-run-ios-stag:
	cp .env.stag .env
	npx expo run:ios

expo-run-ios-network:
	cp .env.network .env
	npx expo run:ios

expo-prebuild-ios-dev:
	cp .env.dev .env
	npx expo prebuild --platform ios --clean

expo-prebuild-ios-stag:
	cp .env.stag .env
	npx expo prebuild --platform ios --clean

expo-prebuild-ios-network:
	cp .env.network .env
	npx expo prebuild --platform ios --clean

# expo export
expo-export-stag:
	cp .env.stag .env
	npx expo export --platform web --clear

expo-export-prod:
	cp .env.prod .env
	npx expo export --platform web --clear

# deploy
deploy-delete-stag:
	node deploy-gcp/deploy-delete.js --env=stag

deploy-upload-stag:
	node deploy-gcp/routes-prepare.js
	node deploy-gcp/deploy-upload.js --env=stag

deploy-stag:
	$(MAKE) expo-export-stag
	$(MAKE) deploy-delete-stag
	$(MAKE) deploy-upload-stag

deploy-delete-prod:
	node deploy-gcp/deploy-delete.js --env=prod

deploy-upload-prod:
	node deploy-gcp/routes-prepare.js
	node deploy-gcp/deploy-upload.js --env=prod

deploy-prod:
	$(MAKE) expo-export-prod
	$(MAKE) deploy-delete-prod
	$(MAKE) deploy-upload-prod

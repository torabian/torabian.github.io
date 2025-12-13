default:
	cd cmd/fireback-microservice-boilerplate-server && make dev

ui:
	cd front-end && npm start


init:
	go mod tidy && make





all:
	@if [ -d "front-end" ]; then \
		echo "Installing front-end dependencies..."; \
		cd front-end && npm install -f && cd - > /dev/null; \
	else \
		echo "No front-end folder found, skipping..."; \
	fi

	@if [ -d "capacitor" ]; then \
		echo "Installing capacitor dependencies..."; \
		cd capacitor && npm i -f && npm run prepare && cd - > /dev/null; \
	else \
		echo "No capacitor folder found, skipping..."; \
	fi

	@echo "Running final script..."
	@$(MAKE) default
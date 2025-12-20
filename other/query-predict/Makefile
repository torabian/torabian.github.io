dev:
	rm -rf app && cd ./cmd/query-predict && \
	go build -ldflags "-s -w" -o ../../app .

test:
	./app gen --path tests/simple.predict.yml --output artifacts && go test -v ./...
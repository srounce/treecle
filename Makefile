all: build

build:
	@node ./node_modules/.bin/r.js -o r.build.js

start:
	@node bin/server

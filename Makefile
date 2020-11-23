variables ?= .env
args = $(filter-out $@,$(MAKECMDGOALS))

include $(variables)
export $(shell sed 's/=.*//' $(variables))

# Setup
setup: copy-env-root copy-env-prisma

# env
copy-env-root:
	cp example.env .env

copy-env-prisma:
	cp example.env .env

# Docker
prod:
	docker-compose up -d --build

prod--ro:
	docker-compose up -d --build --remove-orphans

start: prod--ro

stop:
	docker-compose stop

restart: stop start

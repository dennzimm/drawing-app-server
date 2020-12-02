variables ?= .env
args = $(filter-out $@,$(MAKECMDGOALS))

include $(variables)
export $(shell sed 's/=.*//' $(variables))

# Docker
prod:
	docker-compose up -d --build

prod--ro:
	docker-compose up -d --build --remove-orphans

start: prod--ro

stop:
	docker-compose stop

restart: stop start

#!/bin/bash

export SCHEMA=http://localhost:4000 && ENDPOINT=$SCHEMA gql-gen --config codegen.yml $*
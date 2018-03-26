#!/bin/bash

devfiles='-f dc.yml -f dc-dev.yml';

case $1 in

  start )
    docker-compose ${devfiles} stop
    docker-compose ${devfiles} rm -f
    docker-compose ${devfiles} up -d
    ;;
  stop )
    docker-compose ${devfiles} stop
    ;;
  connect )
    docker-compose ${devfiles} exec $2 bash
    ;;
  build )
    docker-compose ${devfiles} build
    ;;
  logs )
    docker-compose ${devfiles} logs -f $2
    ;;
  * )
    echo 'unknown command, options are: start/stop/build/logs'
    ;;
esac

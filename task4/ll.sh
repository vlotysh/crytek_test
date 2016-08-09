#!/bin/bash

folder=$1

for i in "$@"
do
case $i in
    -p=*|--filter=*)
    filter="${i#*=}"
    ;;
esac
done

find ${folder} | grep ${filter} | sed -e "s/[^-][^\/]*\// |/g" -e "s/|\([^ ]\)/-|\1/"
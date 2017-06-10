#!/bin/bash
UNAME=`uname`
if [ $UNAME == "Darwin" ] ; then
    # Mac OS
    DIR_PATH=$(cd "$(dirname "$0")"; pwd)
else
    # Linux
    DIR_PATH=$(dirname $(readlink -f $0))
fi

if [ -f $DIR_PATH/configure.conf ] ; then
    if ! (diff $DIR_PATH/configure.conf.default $DIR_PATH/configure.conf) ; then
        cp -i $DIR_PATH/configure.conf.default $DIR_PATH/configure.conf
    fi
else
    cp $DIR_PATH/configure.conf.default $DIR_PATH/configure.conf
fi

mkdir -p $DIR_PATH/log/ethereum $DIR_PATH/data/ethereum \
         $DIR_PATH/data/ipfs/staging $DIR_PATH/data/ipfs/data \
         $DIR_PATH/data/explorer/mondgo $DIR_PATH/log/explorer

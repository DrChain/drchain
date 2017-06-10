#!/bin/bash
UNAME=`uname`
if [ $UNAME == "Darwin" ] ; then
    # Mac OS
    DIR_PATH=$(cd "$(dirname "$0")"; pwd)
else
    # Linux
    DIR_PATH=$(dirname $(readlink -f $0))
fi


sudo rm -rf $DIR_PATH/log/ethereum/* $DIR_PATH/data/ethereum/* \
            $DIR_PATH/data/ipfs/staging/* $DIR_PATH/data/ipfs/data/* \
            $DIR_PATH/data/explorer/mondgo/* $DIR_PATH/log/explorer/*

#rm -f $DIR_PATH/configure.conf


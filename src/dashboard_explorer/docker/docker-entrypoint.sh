#!/bin/bash
CONF_FILE="/etc/gcoin/configure.conf"
ARG="$1"
if [ -f $CONF_FILE ] ; then
    source $CONF_FILE
    EXPLORER_DIR=$VCHAIN_EXPLORER_DIR
    LOG_DIR=$LOG_FOLDER_IN_CONTAINER
    TIME=`date`
else
    EXPLORER_DIR="./"
fi

change_config() {
    cd $EXPLORER_DIR
    if [ -f $EXPLORER_DIR/env/ossconf.js.example ] ; then
        cp $EXPLORER_DIR/env/ossconf.js.example $EXPLORER_DIR/env/ossconf.js
        sed -i "s/^  host:.*/  host: '$GCOIN_OSS_HOST',/g" $EXPLORER_DIR/env/ossconf.js
        sed -i "s/^  port:.*/  port: '$GCOIN_OSS_CONTAINER_PORT'/g" $EXPLORER_DIR/env/ossconf.js
    fi
    if [ -f $EXPLORER_DIR/env/rpcconf.js.example ] ; then
        cp $EXPLORER_DIR/env/rpcconf.js.example $EXPLORER_DIR/env/rpcconf.js
        sed -i "s/^  host:.*/  host: '$GCOIN_CORE02_HOST',/g" $EXPLORER_DIR/env/rpcconf.js
        sed -i "s/^  port:.*/  port: '$GCOIN_CORE_RPC_CONTAINER_PORT',/g" $EXPLORER_DIR/env/rpcconf.js
        sed -i "s/^  username:.*/  username: '$GCOIN_CORE_RPCUSER',/g" $EXPLORER_DIR/env/rpcconf.js
        sed -i "s/^  password:.*/  password: '$GCOIN_CORE_RPCPASSWORD',/g" $EXPLORER_DIR/env/rpcconf.js
    fi
    if [ -f  $EXPLORER_DIR/env/wsconf.js.example ] ; then
        cp $EXPLORER_DIR/env/wsconf.js.example $EXPLORER_DIR/env/wsconf.js
        sed -i "s/^  backendPort:.*/  backendPort: '$WEBSOCKET_CONTAINER_PORT',/g" $EXPLORER_DIR/env/wsconf.js
        sed -i "s/^  frontendPort:.*/  frontendPort: '$WEBSOCKET_HOST_PORT',/g" $EXPLORER_DIR/env/wsconf.js
    fi
}

usage() {
    echo "no \"$ARG\" arg, only \"-p\", \"-d\", \"-m\", \"-n\", \"-r\""
}

main () {
    cd $EXPLORER_DIR
    if [ $# == 0 ] ; then
        echo "no arg. nothing to do."
        exec /sbin/init
    else
        if [ -f /initialization ] && [ `cat /initialization` == "1" ] ; then
            if [ "$ARG" == "-p" ] ; then
                echo "#################### Start at $TIME ####################" >> $LOG_FOLDER_IN_CONTAINER/pm2.log
                pm2 start $EXPLORER_DIR/bin/www 1>>$LOG_FOLDER_IN_CONTAINER/pm2.log 2>>$LOG_FOLDER_IN_CONTAINER/pm2.err.log
                exec /sbin/init
            elif [ "$ARG" == "-d" ] ; then
                TIME=`date`
                echo "#################### Start at $TIME ####################" >> $LOG_FOLDER_IN_CONTAINER/pm2.log
                pm2 start $EXPLORER_DIR/bin/www 1>>$LOG_FOLDER_IN_CONTAINER/pm2.log 2>>$LOG_FOLDER_IN_CONTAINER/pm2.err.log
                TIME=`date`
                echo "#################### Start at $TIME ####################" >> $LOG_FOLDER_IN_CONTAINER/dev.log
                npm run dev 1>>$LOG_FOLDER_IN_CONTAINER/dev.log 2>>$LOG_FOLDER_IN_CONTAINER/dev.err.log
                exec /sbin/init
            elif [ "$ARG" == "-r" -o "$ARG" == "-yarn-install" ] ; then
                TIME=`date`
                echo "############### yarn re-install at $TIME ###############" >> $LOG_FOLDER_IN_CONTAINER/install.log
                yarn install 1>>$LOG_FOLDER_IN_CONTAINER/install.log 2>>$LOG_FOLDER_IN_CONTAINER/install.err.log
            elif [ "$ARG" == "-n" -o "$ARG" == "-npm-run-build" ] ; then
                TIME=`date`
                echo "################## npm re-build $TIME ##################" >> $LOG_FOLDER_IN_CONTAINER/install.log
                npm run build 1>>$LOG_FOLDER_IN_CONTAINER/install.log 2>>$LOG_FOLDER_IN_CONTAINER/install.err.log
            elif [ "$ARG" == "-m" ] ;then
                change_config
            else
                usage
                exec /sbin/init
            fi
        else
            if [ "$ARG" == "-p" ] ; then
                change_config
                TIME=`date`
                echo "################## npm build at $TIME ##################" >> $LOG_FOLDER_IN_CONTAINER/install.log
                npm run build 1>>$LOG_FOLDER_IN_CONTAINER/install.log 2>>$LOG_FOLDER_IN_CONTAINER/install.err.log
                TIME=`date`
            elif [ "$ARG" == "-d" -o "$ARG" == "-r" -o "$ARG" == "-n" ] ; then
                change_config
                TIME=`date`
                echo "################# yarn install at $TIME ################" >> $LOG_FOLDER_IN_CONTAINER/install.log
                yarn install 1>>$LOG_FOLDER_IN_CONTAINER/install.log 2>>$LOG_FOLDER_IN_CONTAINER/install.err.log
                TIME=`date`
                echo "################## npm build at $TIME ##################" >> $LOG_FOLDER_IN_CONTAINER/install.log
                npm run build 1>>$LOG_FOLDER_IN_CONTAINER/install.log 2>>$LOG_FOLDER_IN_CONTAINER/install.err.log
                TIME=`date`
            elif [ "$ARG" == "-m" ] ;then
                change_config
            else
                usage
                exec /sbin/init
            fi
            echo "1" > /initialization
        fi
    fi
}

main "$@"

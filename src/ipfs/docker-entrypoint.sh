#!/bin/bash

main () {
    if [ -f /initialization ] && [ `cat /initialization` == "1" ] ; then
        /sbin/tini -- /usr/local/bin/start_ipfs daemon --migrate=true
    else
        ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
        ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
        ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
        echo "1" > /initialization
    fi
}

main "$@"

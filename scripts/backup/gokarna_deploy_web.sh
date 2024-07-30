#!/bin/bash
scp -i "/home/lostintheway/ADDON/server/govVM/pemall/gokarna.pem" -r "build" root@103.69.127.121:/root/bps
ssh -i "/home/lostintheway/ADDON/server/govVM/pemall/gokarna.pem" root@103.69.127.121 "bash /root/bps/web/deploy_web.sh"
#!/bin/bash
scp -i "/home/lostintheway/ADDON/server/govVM/pemall/dhunibesi.pem" -r "build" root@103.69.127.19:/root/bps
ssh -i "/home/lostintheway/ADDON/server/govVM/pemall/dhunibesi.pem" root@103.69.127.19 "bash /root/bps/web/deploy_web.sh"
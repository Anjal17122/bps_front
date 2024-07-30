#!/bin/bash
scp -i "/home/lostintheway/ADDON/server/govVM/pemall/dhulikhel.pem" -r "build" root@103.69.126.109:/root/bps
ssh -i "/home/lostintheway/ADDON/server/govVM/pemall/dhulikhel.pem" root@103.69.126.109 "bash /root/bps/web/deploy_web.sh"
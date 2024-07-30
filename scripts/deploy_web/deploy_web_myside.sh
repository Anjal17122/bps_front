#!/bin/bash
scp -i "/home/lostintheway/ADDON/server/govVM/sahidlakhan/Sahidlakhan_bps_private.pem" -r "build" root@103.69.124.106:/root/bps
ssh -i "/home/lostintheway/ADDON/server/govVM/sahidlakhan/Sahidlakhan_bps_private.pem" root@103.69.124.106 "bash /root/bps/web/deploy_web.sh"
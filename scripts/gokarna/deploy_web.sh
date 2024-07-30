#!/bin/bash
rm -rf /root/bps/web/build
mv /root/bps/build /root/bps/web
yes | cp -r /root/bps/web/env-var.js /root/bps/web/build/env-var.js
# pm2 restart all
// [Unit]
// Description=Digization Panauti Backend
// After=syslog.target

// [Service]
// KillMode=process
// StandardOutput=syslog
// StandardError=syslog
// SyslogIdentifier=what
// Restart=on-failure
// RestartSec=10
// ExecStart=/usr/bin/java -jar  /home/ubuntu/projects/bps/jars/bps-backend.jar SuccessExitStatus=143

// [Install]
// WantedBy=multi-user.target

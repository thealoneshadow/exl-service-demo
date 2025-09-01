#!/usr/bin/env bash
# render-build.sh

# Update package lists
apt-get update -y

# Install ODBC driver dependencies
apt-get install -y gnupg curl apt-transport-https

# Import the public repository GPG keys
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -

# Register the Microsoft Ubuntu repository
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list

# Update again
apt-get update -y

# Install MS ODBC driver
ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc-dev

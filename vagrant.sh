#!/bin/bash

apt-get update 
apt-get -y install build-essential git ruby1.9.3 nodejs
gem install github-pages --no-ri --no-rdoc
cd /vagrant
jekyll serve --watch --drafts


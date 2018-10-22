npm -p outdated | cut -d: -f4 | xargs -n1 npm install

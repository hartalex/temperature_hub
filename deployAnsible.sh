#!/bin/bash

export ANSIBLE_HOST_KEY_CHECKING=False
openssl dgst -md5 ansible
openssl dgst -md5 ansible.pub
chmod 400 ansible
ssh-add ansible

case "$TRAVIS_BRANCH" in
    "newreact" ) ansible-playbook -i playbooks/inventory.yml playbooks/test-deploy-playbook.yml;;
    "prod" ) ansible-playbook -i playbooks/inventory.yml playbooks/prod-deploy-playbook.yml;;
    * ) echo "No Deploy";;
esac
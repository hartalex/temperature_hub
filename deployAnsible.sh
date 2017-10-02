#!/bin/bash

export ANSIBLE_HOST_KEY_CHECKING=False
openssl dgst -md5 ansible
openssl dgst -md5 ansible.pub
chmod 400 ansible
ssh-add ansible
ansible-playbook -i inventory.yml .ansible-deploy.yml

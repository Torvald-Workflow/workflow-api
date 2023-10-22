#!/bin/bash

SCRIPT_PATH="$(readlink -f "$0")"
KEY_PATH="$(dirname "$SCRIPT_PATH")/../keys"
PRIVATE_KEY_PATH="$KEY_PATH/private.key"
PUBLIC_KEY_PATH="$KEY_PATH/public.key"

ssh-keygen -t rsa -b 4096 -m PEM -f "$PRIVATE_KEY_PATH" -q -N ""
openssl rsa -in "$PRIVATE_KEY_PATH" -pubout > "$PUBLIC_KEY_PATH"
rm "$PRIVATE_KEY_PATH.pub"
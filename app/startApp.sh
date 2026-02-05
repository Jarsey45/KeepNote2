#!/bin/ash

npm install --include=dev

# npm run migration:generate
npm run migration:run

export NEXT_DIR="./node_modules/.bin"

$NEXT_DIR/next build --webpack

exec $NEXT_DIR/next start

# development mode
# exec $NEXT_DIR/next dev --webpack

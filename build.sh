npm install
rm -rf dist
mkdir dist
cp -r node_modules dist
cp -r src/* dist/
cp tsconfig.json dist
cd dist
tsc
browserify index.js -o bundle.js
npm install
rm -rf dist
mkdir dist
cp -r node_modules dist
cp -r assets dist
cp -r src/* dist/
cp tsconfig.json dist
cd dist
tsc
browserify app.js -o bundle.js
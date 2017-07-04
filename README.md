# linked-modules-example
Angular 4 Module Development using NPM link/unlink

Referance : https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/linked-library.md

# Linked libraries using Angular 4, Typescript and Webpack 2

> This project has been setup using manual process using following npm packages.

* Angular 4.2.5
	- "@angular/common", "@angular/compiler", "@angular/core", "@angular/platform-browser", "@angular/platform-browser-dynamic", "@angular/compiler-cli"
* Typescript 2.4.1
* Webpack 3.0.0

## Node and NPM version
* MPM version 3.10.10
* Node version 7.3.0

## Other NPM Packages
* core-js, reflect-metadata, rxjs, zone.js
* awesome-typescript-loader

While working on a library, it is common to use [npm link](https://docs.npmjs.com/cli/link) to
avoid reinstalling the library on every build.

# How to link and unlink library

to link any external Angular module into another module for live development we can use `npm link` command.

# Process

for example we have two applications
1) MyModule-A
2) MyModule-B ( Main App )

If I want to link MyModule-A inside MyModule-B, then:

1. First go inside MyModule-A folder and run command : `npm link`
It will link your module A, to global npm directory `C:\Users\<yourname>\AppData\Roaming\npm\node_modules\

2. Go inside Module B in which you want to use your linked module ( Module A ), and open command prompt from that directory and run `npm link MyModule-A`

3. Now you are able to use all the functions/code of Module A, inside Module B.

# Module-A

```
// .npmignore
//=====================

*.ts
!*.d.ts

/node_modules/
/.gitignore
/.npmignore

/tsconfig.json
/tsconfig-build.json
```

```javascript
// package.json
//=====================

{
	"name": "MyModule-A",
	"version": "1.0.0",
	"scripts": {
		"tsc": "tsc",
		"tsc:w": "tsc -w",
		"ngc": "ngc -p tsconfig-build.json"
	},
	"dependencies": {
		"@angular/core": "^4.2.5"
	},
	"devDependencies": {
		"@angular/common": "^4.2.5",
		"@angular/compiler": "^4.2.5",
		"@angular/compiler-cli": "^4.2.5",
		"@angular/core": "^4.2.5",
		"@angular/platform-browser": "^4.2.5",
		"@angular/platform-browser-dynamic": "^4.2.5",
		"core-js": "^2.4.1",
		"reflect-metadata": "^0.1.10",
		"rxjs": "^5.4.1",
		"zone.js": "^0.8.12",
		"typescript": "^2.4.1"
	},
	"peerDependencies": {
		"@angular/core": "^4.2.5"
	}
}

```

```javascript
// tsconfig.json
//=====================

{
	"compilerOptions": {
		"target": "es5",
		"module": "es2015",
		"moduleResolution": "node",
		"declaration": true, // triggers the generation of the typings *.d.ts files, that enable IDE Intellisense
		"sourceMap": true,
		"experimentalDecorators": true,
		"emitDecoratorMetadata": true,
		"removeComments": false,
		"noImplicitAny": true,
		"baseUrl": ".", // This must be specified if "paths" is.
		"lib": [
			"es2015",
			"dom"
		]
	},
	"include": [
		"src/**/*.ts"
	],
	"exclude": [
		"node_modules"
	],
	"files": [
		"index.ts"
	],
	"typeRoots": [
		"../node_modules/@types"
	],
	"compileOnSave": false,
	"buildOnSave": false
}
```

```javascript
// tsconfig-build.json
//=====================

{
	"compilerOptions": {
		"target": "es5",
		"module": "es2015",
		"moduleResolution": "node",
		"declaration": true, // triggers the generation of the typings *.d.ts files, that enable IDE Intellisense
		"sourceMap": true,
		"experimentalDecorators": true,
		"emitDecoratorMetadata": true,
		"removeComments": false,
		"noImplicitAny": true,
		"stripInternal": true,
		"inlineSources": true,
		"skipLibCheck": true,
		"baseUrl": ".", // This must be specified if "paths" is.
		"lib": [
			"es2015",
			"dom"
		]
	},
	"files": [
		"index.ts"
	],
	"typeRoots": [
		"../node_modules/@types"
	],
	"angularCompilerOptions": {
		"skipMetadataEmit": false,
		"skipTemplateCodegen": true
	}
}
```

# Module-B

```javascript
// package.json
//=====================

{
	"name": "MyModule-B",
	"version": "1.0.0",
	"scripts": {
		"start": "webpack -w",
		"start:prod": "webpack -p"
	},
	"dependencies": {
		"@angular/common": "^4.2.5",
		"@angular/compiler": "^4.2.5",
		"@angular/core": "^4.2.5",
		"@angular/platform-browser": "^4.2.5",
		"@angular/platform-browser-dynamic": "^4.2.5",
		"core-js": "^2.4.1",
		"reflect-metadata": "^0.1.10",
		"rxjs": "^5.4.1",
		"zone.js": "^0.8.12"
	},
	"devDependencies": {
		"@angular/compiler-cli": "^4.2.5",
		"awesome-typescript-loader": "^3.2.1",
		"typescript": "^2.4.1",
		"webpack": "^3.0.0"
	},
	"peerDependencies": {}
}

```

```javascript
// tsconfig.json
//=====================

{
	"compilerOptions": {
		"target": "es5",
		"module": "es2015",
		"moduleResolution": "node",
		"declaration": true, // triggers the generation of the typings *.d.ts files, that enable IDE Intellisense
		"sourceMap": true,
		"experimentalDecorators": true,
		"emitDecoratorMetadata": true,
		"removeComments": false,
		"noImplicitAny": true,
		"baseUrl": ".", // This must be specified if "paths" is.
		"lib": [
			"es2015",
			"dom"
		]
	},
	"include": [
		"src/**/*.ts"
	],
	"exclude": [
		"node_modules"
	],
	"files": [
		"index.ts"
	],
	"typeRoots": [
		"../node_modules/@types"
	],
	"compileOnSave": false,
	"buildOnSave": false
}
```

```javascript
// webpack.config.js
//=====================

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        'app': './src/main.ts',
        'libs': './deps/vendor.ts', // Libs or Vendor files like jQuery, Lodash, Bootstrap etc. including Angular and RxJS
        'polyfills': './deps/polyfills.ts' // Polyfills like Core.js, Zone.js
    },
    output: {
        path: path.resolve(__dirname, "dist"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: '[name].js', // string
        //filename: "[name].js", // for multiple entry points
        //filename: "[chunkhash].js", // for long term caching
        // the filename template for entry chunks

        publicPath: "/", // string
        //publicPath: "",
        //publicPath: "https://cdn.example.com/",
        // the url to the output directory resolved relative to the HTML page

        libraryTarget: "umd", // universal module definition
        // the type of the exported library
    },

    resolve: {
        extensions: ['.js', '.ts', '.css'],
        // This will resolve module path when using "npm link"
        alias: { "@angular": path.join(__dirname, "node_modules/@angular") }
    },
    resolveLoader: {
        modules: ["node_modules"] // This will resolve module path when using "npm link"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'libs', 'polyfills']
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader'],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    devtool: 'source-map'
};
```

As webpack 2 doesn't load linked module properly so for that we need to mention following lines in `webpack.config.js` file

```javascript
resolve: {
    // This will resolve module path when using "npm link"
    alias: { "@angular": path.join(__dirname, "node_modules/@angular") }
},
resolveLoader: {
    modules: ["node_modules"] // This will resolve module path when using "npm link"
}
```


## If you get following Error while running angular 4+ project then add `"skipLibCheck": true` in `tsconfig.json` in `"compilerOptions" : {}`

```
ERROR in [at-loader] ..\MyModule-A\node_modules\rxjs\Subject.d.ts:16:22
    TS2415: Class 'Subject<T>' incorrectly extends base class 'Observable<T>'.
  Types of property 'lift' are incompatible.
    Type '<R>(operator: Operator<T, R>) => Observable<T>' is not assignable to type '<R>(operator: Operator<T, R>) => Observable<R>'.
      Type 'Observable<T>' is not assignable to type 'Observable<R>'.
        Type 'T' is not assignable to type 'R'.

ERROR in [at-loader] ..\MyModule-A\node_modules\rxjs\observable\dom\WebSocketSubject.d.ts:24:22
    TS2415: Class 'WebSocketSubject<T>' incorrectly extends base class 'AnonymousSubject<T>'.
  Types of property 'lift' are incompatible.
    Type '<R>(operator: Operator<T, R>) => WebSocketSubject<R>' is not assignable to type '<R>(operator: Operator<T, R>) => Observable<T>'.
      Type 'WebSocketSubject<R>' is not assignable to type 'Observable<T>'.
        Types of property 'operator' are incompatible.
          Type 'Operator<any, R>' is not assignable to type 'Operator<any, T>'.
            Type 'R' is not assignable to type 'T'.
```

Above code will fix module resolving issue in linked module.

Thanks
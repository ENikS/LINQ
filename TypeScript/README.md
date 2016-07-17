# TypeScript 

This is an example of how to use ```linq-es2015``` in **TypeScript** project

## Building project
This project could be built and run using Visual Studio or directly in shell:

### Using [Node Tools for Visula Studio](https://www.visualstudio.com/en-us/features/node-js-vs.aspx)

If you have Visual Studio with [Node tools](https://www.visualstudio.com/en-us/features/node-js-vs.aspx) installed locate file ```.vsnodetools.njsproj``` and click on it. Once project is opened locate and right click on **npm** item in **Solution Explorer**. Select and click **Update npm Packages** menu item.

When all packages are updated you can run the project.

### Building project in Command Prompt

Get latest TypeScript compiler
```
npm install -g typescript
```
Update all dependencies:
```
npm install
```
Build the project:
```
tsc
```
Execute code:
```
node app
```


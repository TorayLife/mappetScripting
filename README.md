# mappetScripting

Auto completion (IntelliSense) for mappet scripts.

Done with https://github.com/TorayLife/mappet-ts.git

## How to install?

Download this repo, and open it as a project.

For .ts files you can write types like this:

```ts
function main(c: IScriptEvent){
  c.player.send("Ha-ha!");
}
```

For .js files:

```js
/**
 * @param c{IScriptEvent}
 */
function main(c){
    c.player.send("Ha-ha!");
}
```

![Screenshot of Lightining CHIPS Poker](https://norbert.dev/chips_poker@2x.jpg)

# Pangea Poker

:warning: **Keep in mind that the game is in alpha stage. There is a risk of loosing funds.**

Play decentralized poker via the CHIPS blockchain.

We hope to release a publicly playable version in April. You can find the latest releases [here](https://github.com/chips-blockchain/pangea-poker/releases).

Currently, to play, you will need to run your own back-end nodes. We are working on a Docker container to make this easy, which is expected to ship in April. [Here](https://github.com/NOCTLJRNE/CHIPS-tuto/blob/master/README.md) you can find the old, complicated way of setting up the back-end nodes.

## Development

- Run `npm install` and `npm start` in the root folder This will fire up a web server and you can try the app via http://localhost:1234

- Run `npm run electron-dev` to start the Electron app in development.

Run `npm electron-pack` to package the app with electron-builder for MacOS, Windows and Linux.

### Pre-push GitHook 

In order not to fail Gitub CI all the time, set up a local git hook to check lint and run tests before a push to the repo.

`./.git/hooks/pre-push`

```
node_modules/eslint/bin/eslint.js './src/' --ext .js,.ts,.tsx
npm run test
```

## Contributing

Please reach out to us via [Discord](https://discord.gg/NGPu4g) and check out the open [Issues](https://github.com/chips-blockchain/pangea-poker/issues).

## Related links

- [Backend repo](https://github.com/chips-blockchain/bet)
- [Old back-end setup guide](https://github.com/NOCTLJRNE/CHIPS-tuto/blob/master/README.md)

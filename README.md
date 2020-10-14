# Development in Docker containers with Visual Studio Code

VS Code offers a **Remote Expoler** feature that basically decouples the _workspace_ from the UI where we actually code. The workspace is where the source code sits, where the program and tests are running, the code-hinting and linting is executed. The UI is just the VS Code window with the controls and menus, which is connected to the workspace that in this case runs elsewhere. This can be a remote host, or a Docker Container running on our machine.

This repo is an example setup for developing a NodeJS application (optionally with MongoDB) in a container without any performance compromise.

> Why NodeJS?
>
> This is just an example. Based on this you can create the setup (`Dockerfile`, `docker-compose.json` and `.devcontainer.json`) specific to your development environment.

## Usage
1. Make sure you have [Docker](https://www.docker.com/get-started) and the [Visual Studio Code Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) installed.
2. Check out this repo in a local folder.
3. Open the folder in VS Code.
4. Click on the highlighted button on the bottom left corner (looks like this [><]), or hit Ctrl/Cmd + Shift + P and type 'remote reopen' and choose 'Remote-Containers: Reopen In Container'.
5. You can choose from quite some predefined setups for different languages, use your own `Dockerfile`, or use your own `docker-compose.yaml` file. Select 'From docker-compose.yaml'.
6. Select `app` as service when prompted.

And you took off. The first start may take ages since images may be pulled for the first time or built from scratch, it is much quicker to restart afterwards.

When it's up, you will have a remote terminal that runs inside the container. You can start the application with `npm start` or run the test with `npm t`. It all happens inside the container. You can use git as well.

If you start the server, you will notice that the port opened by the application (3000) is automatically forwarded to your `localhost`. You can open it in your browser just as it was running on your local machine.

When it comes to debugging, you can start a Debugger Terminal from the 'Run' pane or in the Terminal panel. Set your breakpoints and start the application or run the tests. Debug just works.

Extensions (ex. linting/formatting tools) can be installed into the remote VS Code instance as well. This can be done either from the Extensions pane using 'Install in Dev Conatiner' button or 'Add to .devcontainer.json' from the context menu. In this setup `eslint` and `prettier` are added.

---
## Background
My problem with the predifined setups was the performance. All of them `bind` mounts the source folder into the container, which usally contains the dependecies folder (`node_modules`, `vendor`, whatever it's called in your preferred language) as well. These tend to contain miriads of small files.

If you are on Mac or Windows (unless your source code is inside the WSL 2 volume) keeping these files in sync between local and the VM Docker actually runs in is resource intensive and degrades performance pretty badly. You can try fiddle with [consistency](https://docs.docker.com/storage/bind-mounts/#configure-mount-consistency-for-macos) settings on MacOS, but it will not help much. Installing dependencies, building, or running tests (generally file i/o heavy operations) are very slow compared to running locally.

So in this setup the `node_modules` folder is explicitly mounted as an unnamed `volume` managed by Docker avoiding the sync issue. In the build phase initial dependencies are installed, so when the container starts up, you have everything in place. Editor code intelligence can work on and link to your dependencies and everything runs on native speed at the same time. Installing new dependencies inside the container works as espected: it's reflected in the package files as you would have installed them on your local machine.
# VidiJS

VidiJS showcases Vidispine API features within a simple user interface.  The application runs in a web browser and communicates directly with the API without the need for any middleware.  It works out of the box with any Vidispine API server, including Vidispine as a Service, without the need for any configuration.

![Login](https://user-images.githubusercontent.com/2421149/48677167-8c6ed500-eb68-11e8-84d5-06539c54d6c9.gif)

The VidiJS application runs in a single webpage which means that a bundle of static files need to be downloaded once, then the browser will dynamically rendered pages based on the JSON data returned from the Vidispine API.  The bundle can be hosted by any webserver, including an S3 bucket.  This means updates to the application can be simply rolled out by updating the bundle and reloading the browser.

![Shape](https://user-images.githubusercontent.com/2421149/48677181-a14b6880-eb68-11e8-89b4-0f086fa7632a.gif)

The intention of the application is to demonstrate all API endpoints with a consistent user experience. This includes viewing lists or entities, forms that allow entry of any possible value within the schema, and actions to create/update/remove entities.

An icon in the toolbar displays the data returned from the Vidispine API server which has been used to render the UI.  For further detail, the API requests can be monitored via the browser's inspector tools.  This clearly demonstrates to developers the correct syntax to use when integrating Vidispine API into their own products.

A lightweight Docker image containing VidiJS can be created or downloaded from Docker Hub.  This includes the webserver (Nginx) which caches the static files and proxies requests to the Vidispine API to avoid Cross-Origin errors.


# Get Started

## Docker

The docker image runs the Nginx webserver which serves the static content and proxies API request.

### Run

* Start the container with the latest image.
```
docker run \
  --name vidijs \
  --detach \
  --tty \
  --interactive \
  --rm \
  -e VIDISPINE_URL='http://my-vidispine-server:8080' \
  -p 80:80 \
  'vidijs/vidijs:latest'
```

#### Run Environment Variables

* **VIDISPINE_URL**: The URL (including http/s and port) to access the Vidispine API.
  - Do not include a trailing `/` on the URL as it will break the Nginx proxy.
  - If running in Compose/Kubernetes, this should be the service name.
  - If running on localhost either use `docker.for.mac.localhost`, `docker.for.win.localhost`, the IP address of the host on the docker network, or use `--net=host`.

#### Ports

* **80**: Web service


## Source

* Install `nodejs` and `yarn`.

* Clone this project and change into the project folder.

* Install dependencies.
```
yarn install
```

* Start with `VIDISPINE_URL` (default: `http://localhost:8080`)
```
VIDISPINE_URL='https://example.myvidispine.com' yarn start
```

* Open http://localhost:3000/ in a browser.

### Build

* Compile the application locally.
```
yarn build
```

* Build the docker image with the `latest` tag.
Note that only files/folders specified with `!` prefix in the `.dockerignore` will be included.
```
yarn run build-container
```

### Build Variables

* **REACT_APP_UNSPLASH_URL**: Override the Unsplash collection URL with your own to change the login background.
* **REACT_APP_UNSPLASH_DISABLE**: Set to `true` to disable loading images from Unsplash.

# BadEarl

BadEarl is a service that checks URLs for known malware. 

## Installation

### Requirements
Requires Docker + Docker compose:

#### Linux
- Install [Docker CE](https://docs.docker.com/install/)

- Install [Docker-Compose](https://docs.docker.com/compose/install/)

#### Windows
- Install [Docker CE for for Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows) (includes Docker-Compose)
#### Mac
- Install [Docker CE for for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac) (includes Docker-Compose)

## Project Usage

### Images:
 - Redis - Custom build of redis with an added module for bloom filters
 - Node - Parses the URL from the request, performs some input validation, and looks up the URL in Redis
 - Nginx - Proxies requests to node and caches where possible

### badearl shell script
This is a simple wrapper around the docker compose files to aid development and debugging.

#### Commands

##### build
- Builds an image for each container using the Dockerfiles included

##### start
- Removes previous containers, starts new containers.

##### stop
- Stops the currently running containers.

##### connect <container name>
- Drops you into a bash shell of the provided container allowing you to debug the container

##### logs <container name>
- Shows the logs of the requested container. If not container name is provided it will show the logs of all running containers.



### Debugging
The application can be attached to either using chrome or Visual Studio Codes' built in debugger.

By default the application inspector listens on localhost:9229 on startup.

To debug tests, connect into the running container, and run 'npm run test-debug', then connect to localhost:9228
The project includes launch scripts for Attaching to Node/the tests.


## Application Usage

### Checking a URL
Endpoint:
/safeurl

URLs to be checked should be sent as a query parameter to the service in the format url=\<urltocheck\>

###Examples

Check URL:

#### Request
GET `http://localhost:8080/safeurl?url=http://example.org`

#### Response
Content-Type: text/html

Body: 


Success:
Successes will return a list of URLs (currently only 1 until POSTing multiple URLs is added.)
```
data {
    urls: [
        domain: 'http://example.org',
        safe: true
    ]
}
```


Error:
```
{
    error: 'Invalid URL',
    status: 400
}
```

Add URL:

POST `http://localhost:8080/safeurl`
Body: 
```
{
    "urls": [
        "itschr.is"
    ]
}
```

Response:

Success:

Successes will return an object with status = 200 currently. In the future
they will return information about the created URLs.

```
data {
    status: 200
}
```


Error:
```
{
    error: 'Invalid URL',
    status: 400
}
```

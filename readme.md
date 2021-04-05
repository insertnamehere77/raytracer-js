# About
This is a port of an old raytracer I wrote in college from C++ to JS. I did this for fun and to get some exposure to bundling and deploying frontend applications. If you'd like to see it in action, it can be found [here](https://raytracer-js.herokuapp.com). The images it produces are done entirely on the client side, and the only dependencies used are for bundling and serving the files.

# Running
Running this should be as simple as doing an `npm install` and then either `npm run start` (for prod builds) or `npm run start-dev` (for dev builds). From there the page will be served on port 8080 by default, or on the port specified in the `PORT` env variable.

# Query Parameters
The following parameters can be specified when requesting the page to modify the image produced:
- `height` (Int)
   - Specifies the height of the image in pixels
   - Default is 400
- `width` (Int)
   - Specifies the width of the image in pixels
   - Default is 600
- `random` (Boolean)
   - Turns on random mode, where the shapes are randomized to make wacky looking images
   - Default is false
- `numSpheres` (Int)
   - Specifies the number of spheres to create when random is true, otherwise this is ignored
   - Default is 4

Query Examples:
Modifying height and width: 
https://raytracer-js.herokuapp.com/?height=600&width=800

Using random and numSpheres:
https://raytracer-js.herokuapp.com/?random=true&numSpheres=6

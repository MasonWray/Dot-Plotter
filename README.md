
# Dot Plotter

<img src="https://masonwray.github.io/Dot-Plotter/logo192.png" align="right">

Dot Plotter is a GCODE toolpath generator for CMYK stippling. It splits an image into Cyan, Magenta, Yellow, and Black components, creates a set of dots representing each component color, then generates a GCODE toolpath that can be executed by a robot holding a pen of each color.

## Usage
-  **File Selector** - Start here by uploading an image file. Any file type supported by the [HTML5 \<img> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) is acceptable.

-  **Layers** - Once a file has been selected, it will be split into its four component layers automatically. Layer visibility can be toggled on and off with the eye-shaped visibility toggles in each layer. Vector layers represent the most recently generated output. Visibility has no effect on the output files.  
**Note:** RGB to CMYK conversion is performed mathematically. ICC color profiles are not supported at this time, but are a planned addition.
  
-  **Preview** - The preview pane displays the image as a combination of component layers when an image is loaded. After output has been generated, a vector approximation of the GCODE for each layer can be diplayed as well. 
  
-  **Output Settings** - Set output parameters for GCODE generation here. Option fields are fairly self-explanatory, but details are as follows: 
  
   -  **Stock Width/Height** - The width/height of the output medium (the sheet of paper you plan to plot on) in whatever unit your machine operates in. The default for Marlin and GRBL is mm.
   -  **Tool Diameter** - The diameter of the tip of your robot's pen. This will determine the density of stippling points created by the GCODE generator.
   -  **Travel/Plunge Feedrates** - The speed at which your robot will move when traveling between points, and when pressing the pen into the paper, respectively. In machine units/sec.
   -  **Travel/Plunge Heights** - The height to which the robot will lift the pen *above the XY origin* when traveling, and the height *above the XY origin* at which the robot will stop depressing the pen and begin to retract, respectively. Note that these values are relative to the machine's origin, and do not account for paper thickness.
   -  **Download**  <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" className="bi bi-arrow-bar-down" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" /></svg> - Download a ZIP archive containing all generated GCODE files. Button will become available once an archive ahs been generated and is ready for download.
   -  **Refresh** <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" /><path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" /></svg> - Generate an SVG preview and GCODE paths from current settings and loaded image. This is a computationally expensive process, and will run in a web worker.

## Limitations

### Memory
Due to limited browser support for OffscreenCanvas, previews are currently generated as SVG and stored as an object URL. This process consules a large amount of memory, and is not very efficient. Because of this, generating output from large images, or generating large (small tool diameter and/or large stock size) may fail due to exceeding available memory.

### Web Workers
In order to maintain a responsive UI, Dot Plotter uses [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) for rendering vector previews, generating GCODE, and creating ZIP archives. The RGB to CMYK conversion is not yet implemented using web workers, so the UI may become unresponsive while loading large images.

## Planned Improvements
- **ICC Profiles** - Use ICC profiles to convert from RGB to CMYK for greater color accuracy.

- **Vector Preview Blending** - Blend pixel data when overlaying a vector preview layer on top of another. Currently, one layer is drawn over the other with 100% opacity.

- **OffscreenCanvas Rendering** - Use OffscreenCanvas to generate vector previews when browser support allows.

- **Tool Diameter by Layer** - Allow different tool diameter for each layer.
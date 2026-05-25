const state = {
  left: "primaries",
  middle: "curves",
  right: "keyframes"
};

const navGroups = {
  left: [
    {
      id: "cameraRaw",
      icon: "raw",
      label: "Camera Raw",
      title: "Camera Raw",
      desc: "Decode raw media before the normal grade. These controls set color science, white balance, exposure, and decode detail."
    },
    {
      id: "colorMatch",
      icon: "grid",
      label: "Color Match",
      title: "Color Match",
      desc: "Match a shot to a photographed color chart by choosing the chart type and target color space."
    },
    {
      id: "primaries",
      icon: "wheel",
      label: "Primaries",
      title: "Primaries - Color Wheels",
      desc: "Balance shadows, midtones, highlights, and global offset with traditional primary grading controls."
    },
    {
      id: "hdr",
      icon: "hdr",
      label: "HDR Wheels",
      title: "High Dynamic Range - Color Wheels",
      desc: "Grade tonal zones such as Dark, Shadow, Light, and Global with controls designed for high dynamic range work."
    },
    {
      id: "rgbMixer",
      icon: "mixer",
      label: "RGB Mixer",
      title: "RGB Mixer",
      desc: "Remix the red, green, and blue output channels from different source-channel amounts."
    },
    {
      id: "motionFx",
      icon: "motion",
      label: "Motion Effects",
      title: "Motion Effects",
      desc: "Apply temporal noise reduction, spatial noise reduction, and optical motion blur."
    }
  ],
  middle: [
    {
      id: "curves",
      icon: "curve",
      label: "Curves",
      title: "Curves - Custom",
      desc: "Edit spline curves for luma or individual RGB channels. Points on the graph remap input tones to output tones."
    },
    {
      id: "colorSlice",
      icon: "drop",
      label: "ColorSlice",
      title: "ColorSlice",
      desc: "Adjust specific hue ranges such as red, skin, yellow, green, cyan, blue, and magenta."
    },
    {
      id: "warper",
      icon: "warper",
      label: "Color Warper",
      title: "Color Warper - Chroma Warp",
      desc: "Push hue and saturation by placing control pins on a two-dimensional color map."
    },
    {
      id: "qualifier",
      icon: "eyedropper",
      label: "Qualifier",
      title: "Qualifier - HSL",
      desc: "Sample and isolate parts of the image by hue, saturation, and luminance for secondary correction."
    },
    {
      id: "window",
      icon: "window",
      label: "Window",
      title: "Window",
      desc: "Create Power Windows to limit corrections to geometric or drawn shapes."
    },
    {
      id: "tracker",
      icon: "tracker",
      label: "Tracker",
      title: "Tracker - Window",
      desc: "Track motion so windows and effects follow the shot over time."
    },
    {
      id: "blur",
      icon: "blur",
      label: "Blur",
      title: "Blur - Blur",
      desc: "Blur, sharpen, mist, and resize chroma/luma detail with channel controls."
    },
    {
      id: "key",
      icon: "key",
      label: "Key",
      title: "Key",
      desc: "Control node key input, key output, and qualifier matte strength."
    },
    {
      id: "sizing",
      icon: "sizing",
      label: "Sizing",
      title: "Sizing - Input Sizing",
      desc: "Pan, tilt, zoom, rotate, resize, blank, and flip the image before or within grading."
    },
    {
      id: "stereo3d",
      icon: "3d",
      label: "3D",
      title: "Stereoscopic 3D",
      desc: "Adjust convergence, floating window, eye alignment, and stereo viewing behavior."
    }
  ],
  right: [
    {
      id: "keyframes",
      icon: "keyframes",
      label: "Keyframes",
      title: "Keyframes",
      desc: "Animate Color page parameters over time for the selected clip, node, or sizing track."
    },
    {
      id: "scopes",
      icon: "scopes",
      label: "Scopes",
      title: "Scopes",
      desc: "Measure the image with video scopes such as Parade, Waveform, Vectorscope, and Histogram."
    },
    {
      id: "info",
      icon: "info",
      label: "Info",
      title: "Info",
      desc: "Inspect clip and system metadata for the selected clip."
    }
  ]
};

const tips = {
  "gallery": {
    title: "Gallery",
    desc: "Stores stills and reference frames used for shot matching, comparison, and saving grades.",
    up: "Opening it gives you access to saved stills and memories for matching.",
    down: "Hiding it gives the viewer and node graph more room."
  },
  "luts": {
    title: "LUTs",
    desc: "Shows lookup tables that can transform camera log footage or add a creative look.",
    up: "Applying a LUT changes color and contrast according to the selected transform.",
    down: "Removing a LUT returns the node to manual corrections."
  },
  "media-pool": {
    title: "Media Pool",
    desc: "Shows project media and timelines so clips can be selected or organized.",
    up: "Opening it lets you browse source clips and timelines.",
    down: "Closing it keeps the Color page focused on grading controls."
  },
  "clips": {
    title: "Clips",
    desc: "Toggles the clip strip. The strip lets you move between timeline clips from the Color page.",
    up: "Showing it makes clip-to-clip grading faster.",
    down: "Hiding it gives more vertical room to the viewer and palettes."
  },
  "project-title": {
    title: "Project Name",
    desc: "The current Resolve project. This mockup uses the project name shown in the screenshots.",
    up: "Changing projects would load a different set of timelines, clips, and grades.",
    down: "The current project remains active until another project is opened."
  },
  "timeline": {
    title: "Timeline",
    desc: "Toggles timeline-related controls in the upper Color page interface.",
    up: "Showing it emphasizes timeline navigation.",
    down: "Hiding it leaves more space for color controls."
  },
  "nodes": {
    title: "Nodes",
    desc: "Shows the node graph. Each node can hold a correction, key, window, or effect.",
    up: "More nodes allow more isolated and reorderable corrections.",
    down: "Fewer nodes keep the grade simpler but combine more work into each correction."
  },
  "effects": {
    title: "Effects",
    desc: "Opens Resolve FX and OpenFX effects for the Color page.",
    up: "Adding an effect expands the selected node beyond basic color controls.",
    down: "Removing effects keeps the node lighter and easier to render."
  },
  "lightbox": {
    title: "Lightbox",
    desc: "Shows a large visual overview of timeline clips for comparing grades.",
    up: "Opening it helps evaluate consistency across many shots.",
    down: "Closing it returns to the normal viewer and palette layout."
  },
  "gallery-pane": {
    title: "Gallery Pane",
    desc: "This pane holds stills. A still can store the image, grade, and split-screen reference for matching shots.",
    up: "Adding stills creates more references for matching and version comparison.",
    down: "An empty gallery means no stills are available for matching yet."
  },
  "gallery-sort": {
    title: "Gallery Options",
    desc: "Sorts or changes how stills are viewed in the Gallery.",
    up: "More visible still metadata can help identify references.",
    down: "A simpler view leaves more room for thumbnails."
  },
  "stills": {
    title: "No Stills Created",
    desc: "The Gallery is empty. In Resolve, grabbing a still captures the current grade and frame for later comparison.",
    up: "Creating a still gives you a visual reference and a grade you can apply to other shots.",
    down: "Without stills, matching relies on scopes, memory, and manual comparison."
  },
  "viewer": {
    title: "Viewer",
    desc: "Displays the selected clip after the node tree and selected viewer options are applied.",
    up: "Zooming in helps inspect noise, qualifiers, and edges.",
    down: "Zooming out helps judge the whole frame and compare composition."
  },
  "viewer-screen": {
    title: "Viewer Image Area",
    desc: "The central image display. It is black in the screenshots because no frame is available for the selected MediaOut.",
    up: "A valid frame would show the graded image here.",
    down: "An unavailable frame leaves the viewer black and limits visual feedback."
  },
  "previous-frame": {
    title: "Previous Frame",
    desc: "Steps the playhead backward by one frame.",
    up: "Use it to inspect frame-by-frame motion or tracking changes.",
    down: "It does not reduce a value; it only changes playback position."
  },
  "play-reverse": {
    title: "Reverse Playback",
    desc: "Plays the selected clip backward in the viewer.",
    up: "Useful for checking whether a grade or track remains stable in reverse.",
    down: "Stopping playback freezes the current frame."
  },
  "stop": {
    title: "Stop",
    desc: "Stops playback and parks the playhead.",
    up: "Stopping lets you grade a fixed frame.",
    down: "Playback resumes when a play command is clicked."
  },
  "play": {
    title: "Play",
    desc: "Plays the selected clip forward.",
    up: "Playing shows how corrections behave over motion and edits.",
    down: "Stopping returns to frame-by-frame grading."
  },
  "next-frame": {
    title: "Next Frame",
    desc: "Steps the playhead forward by one frame.",
    up: "Use it to inspect motion, noise reduction, and tracking frame by frame.",
    down: "It does not reduce a value; it only changes playback position."
  },
  "loop": {
    title: "Loop Playback",
    desc: "Repeats playback over the current clip or range.",
    up: "Looping makes it easier to evaluate a moving correction repeatedly.",
    down: "Turning it off plays once through the range."
  },
  "node-graph": {
    title: "Node Graph",
    desc: "Shows the correction pipeline for the clip. Signals flow from the input through serial, parallel, layer, or key mixer nodes to output.",
    up: "Adding nodes isolates operations and makes the grade easier to adjust.",
    down: "Removing nodes simplifies the tree but combines corrections."
  },
  "serial-node": {
    title: "Serial Node 01",
    desc: "A serial correction node. It receives the previous image, applies its correction, then sends the result onward.",
    up: "Adding corrections inside the node strengthens the grade at this point in the pipeline.",
    down: "Disabling or bypassing it removes this node's contribution."
  },
  "clip-counter": {
    title: "Clip Timecode",
    desc: "Shows the current timeline or clip timecode around the selected clip strip.",
    up: "Moving later changes the currently viewed frame.",
    down: "Moving earlier returns to previous frames or clips."
  },
  "clip-thumbnail": {
    title: "Clip Thumbnail",
    desc: "A timeline clip thumbnail. Selecting one loads that clip's node tree and color controls.",
    up: "Selecting another thumbnail changes which clip you are grading.",
    down: "Leaving it unselected keeps the current clip active."
  },
  "offline-clip": {
    title: "Offline or Empty Clip",
    desc: "The black thumbnail with a red outline mirrors the screenshot's unavailable MediaOut frame.",
    up: "Relinking or making a frame available would restore the image.",
    down: "Leaving it offline prevents image review in the viewer."
  },
  "reset-palette": {
    title: "Reset Palette",
    desc: "Resets the current palette or section to its default values.",
    up: "Clicking it restores defaults for that palette.",
    down: "There is no lower state; avoid it when you want to preserve the current correction."
  },
  "palette-menu": {
    title: "Palette Options",
    desc: "Opens additional options for the current Color page palette.",
    up: "More options expose reset, copy, display, and mode choices.",
    down: "Closing it keeps the panel uncluttered."
  },
  "decode-quality": {
    title: "Decode Quality",
    desc: "Sets the quality level used to decode raw media before grading.",
    up: "Higher quality can reveal more detail but requires more processing.",
    down: "Lower quality can improve playback at the cost of precision."
  },
  "decode-using": {
    title: "Decode Using",
    desc: "Chooses whether raw settings come from project defaults, camera metadata, or clip-specific settings.",
    up: "Clip settings give more per-shot control.",
    down: "Project settings keep many clips consistent."
  },
  "monochrome-decode": {
    title: "Decode as Monochrome",
    desc: "Decodes raw footage as black and white before color grading.",
    up: "Enabling removes color during decode.",
    down: "Disabling keeps the camera's color channels available."
  },
  "log-decode": {
    title: "Decode as LogC4",
    desc: "Decodes compatible ARRI footage into LogC4, preserving broad tonal range for grading.",
    up: "Log decode keeps highlights and shadows flexible for color management.",
    down: "Non-log decode may look more contrasty but gives less grading latitude."
  },
  "raw-color-temp": {
    title: "Raw Color Temp",
    desc: "Sets the white-balance temperature during raw decode.",
    up: "Higher values warm the image toward amber.",
    down: "Lower values cool the image toward blue."
  },
  "raw-tint": {
    title: "Raw Tint",
    desc: "Adjusts green-magenta balance during raw decode.",
    up: "Higher values add magenta.",
    down: "Lower values add green."
  },
  "raw-exposure": {
    title: "Raw Exposure",
    desc: "Offsets raw exposure before the primary grade.",
    up: "Higher exposure brightens the decoded image.",
    down: "Lower exposure darkens the decoded image."
  },
  "raw-sharpness": {
    title: "Raw Sharpness",
    desc: "Controls decode-level sharpening for raw footage.",
    up: "More sharpness emphasizes edges and fine detail.",
    down: "Less sharpness softens detail and may hide noise."
  },
  "use-changes": {
    title: "Use Changes",
    desc: "Applies modified camera raw settings to the selected clip.",
    up: "Using changes commits the edited raw parameters.",
    down: "Leaving it unchanged keeps the previous decode settings."
  },
  "use-settings": {
    title: "Use Settings",
    desc: "Applies the currently chosen raw setting source.",
    up: "Using settings makes the selected decode source active.",
    down: "Skipping it leaves the source unchanged."
  },
  "color-chart": {
    title: "ColorChecker Chart",
    desc: "The chart patches represent known reference colors. Resolve compares sampled patches to expected values.",
    up: "A clean chart sample improves automatic color matching.",
    down: "A poorly sampled or incorrectly lit chart can create an inaccurate match."
  },
  "source-gamma": {
    title: "Source Gamma",
    desc: "Describes the gamma of the image before matching.",
    up: "Choosing the correct source makes the chart correction more accurate.",
    down: "The wrong source gamma can bend contrast in the wrong direction."
  },
  "target-gamma": {
    title: "Target Gamma",
    desc: "Sets the gamma Resolve should match the chart into.",
    up: "A display gamma target gives a normalized viewing result.",
    down: "Leaving Auto asks Resolve to infer the target."
  },
  "target-color-space": {
    title: "Target Color Space",
    desc: "Sets the color space Resolve should convert the chart into.",
    up: "Matching the project target improves consistency across shots.",
    down: "An incorrect target can shift hues and saturation."
  },
  "match-color-temp": {
    title: "Chart Color Temperature",
    desc: "Sets the expected illuminant for the photographed chart.",
    up: "Higher values expect cooler daylight sources.",
    down: "Lower values expect warmer tungsten-like sources."
  },
  "white-level": {
    title: "White Level",
    desc: "Defines how bright the chart white patch should be treated during matching.",
    up: "Higher values push the match brighter.",
    down: "Lower values create a more restrained match."
  },
  "match-button": {
    title: "Match",
    desc: "Runs the Color Match operation using the selected chart, gamma, color space, and sample placement.",
    up: "Clicking applies a correction based on the chart.",
    down: "Before clicking, no automatic chart correction is applied."
  },
  "temp": {
    title: "Temperature",
    desc: "Shifts the overall balance between cool blue and warm amber.",
    up: "Warms the image toward orange and yellow.",
    down: "Cools the image toward blue."
  },
  "tint": {
    title: "Tint",
    desc: "Shifts the overall balance between green and magenta.",
    up: "Adds magenta to counter green casts.",
    down: "Adds green to counter magenta casts."
  },
  "contrast": {
    title: "Contrast",
    desc: "Increases or decreases separation between dark and bright values around the pivot.",
    up: "Deeper shadows and brighter highlights.",
    down: "A flatter, lower-contrast image."
  },
  "pivot": {
    title: "Pivot",
    desc: "Sets the tonal midpoint around which Contrast expands or contracts.",
    up: "Moves the contrast center higher into the tones.",
    down: "Moves the contrast center lower into the tones."
  },
  "mid-detail": {
    title: "Mid/Detail",
    desc: "Changes local contrast in midtone detail.",
    up: "Adds texture and crispness.",
    down: "Softens midtone texture."
  },
  "lift": {
    title: "Lift",
    desc: "Controls shadow brightness and shadow color balance.",
    up: "Raises shadows and lifts the black point.",
    down: "Darkens shadows and can crush blacks."
  },
  "gamma": {
    title: "Gamma",
    desc: "Controls midtone brightness and midtone color balance.",
    up: "Brightens middle gray and skin-level tones.",
    down: "Darkens midtones for a heavier look."
  },
  "gain": {
    title: "Gain",
    desc: "Controls highlight brightness and highlight color balance.",
    up: "Brightens highlights toward white.",
    down: "Rolls highlights down and preserves bright detail."
  },
  "offset": {
    title: "Offset",
    desc: "Moves the whole signal up or down, affecting shadows, midtones, and highlights together.",
    up: "Brightens the entire image.",
    down: "Darkens the entire image."
  },
  "wheel-color": {
    title: "Color Wheel",
    desc: "Dragging from the center pushes the selected tonal range toward a hue on the wheel.",
    up: "Moving farther from center increases color bias.",
    down: "Returning to center neutralizes the color bias."
  },
  "master-wheel-value": {
    title: "Master Wheel Value",
    desc: "The unlabeled master value changes luma for that wheel without favoring red, green, or blue.",
    up: "Raises that tonal range.",
    down: "Lowers that tonal range."
  },
  "red-channel": {
    title: "Red Channel",
    desc: "Changes the red contribution in the selected tonal range.",
    up: "Adds red or warmth.",
    down: "Removes red, pushing toward cyan."
  },
  "green-channel": {
    title: "Green Channel",
    desc: "Changes the green contribution in the selected tonal range.",
    up: "Adds green.",
    down: "Removes green, pushing toward magenta."
  },
  "blue-channel": {
    title: "Blue Channel",
    desc: "Changes the blue contribution in the selected tonal range.",
    up: "Adds blue or coolness.",
    down: "Removes blue, pushing toward yellow."
  },
  "luma-strip": {
    title: "Luminance Strip",
    desc: "The horizontal strip changes luma for the selected tonal control.",
    up: "Dragging right raises the range.",
    down: "Dragging left lowers the range."
  },
  "color-boost": {
    title: "Color Boost",
    desc: "Boosts low-saturation colors more than already saturated colors.",
    up: "Muted colors become more vivid while strong colors are protected.",
    down: "Muted colors stay flatter and more natural."
  },
  "shadows": {
    title: "Shadows",
    desc: "A secondary control for the darkest tonal range.",
    up: "Lifts shadow detail.",
    down: "Deepens shadows."
  },
  "highlights": {
    title: "Highlights",
    desc: "A secondary control for the brightest tonal range.",
    up: "Raises bright regions.",
    down: "Recovers and rolls off bright regions."
  },
  "saturation": {
    title: "Saturation",
    desc: "Scales overall color intensity.",
    up: "Colors become more vivid.",
    down: "Colors become muted; at zero the image is monochrome."
  },
  "hue": {
    title: "Hue",
    desc: "Rotates all hues around the color wheel.",
    up: "Shifts colors forward through the hue wheel.",
    down: "Shifts colors in the opposite direction."
  },
  "lum-mix": {
    title: "Lum Mix",
    desc: "Controls how much color-wheel channel changes affect perceived luminance.",
    up: "Color balance changes influence brightness more.",
    down: "Color balance changes become closer to hue-only adjustments."
  },
  "hdr-zone": {
    title: "HDR Tonal Zone",
    desc: "Chooses which tonal zone is active in the HDR wheels.",
    up: "A narrower zone targets a more specific brightness range.",
    down: "Global affects the full image more broadly."
  },
  "hdr-exp": {
    title: "HDR Exposure",
    desc: "Adjusts exposure for the selected HDR tonal zone.",
    up: "Brightens that zone.",
    down: "Darkens that zone."
  },
  "hdr-sat": {
    title: "HDR Saturation",
    desc: "Adjusts saturation in the selected HDR tonal zone.",
    up: "Makes colors in that zone more vivid.",
    down: "Desaturates that zone."
  },
  "hdr-falloff": {
    title: "HDR Zone Falloff",
    desc: "Adjusts how smoothly the HDR zone blends into neighboring tones.",
    up: "A wider falloff is smoother and less targeted.",
    down: "A narrower falloff is more isolated."
  },
  "rgb-output": {
    title: "RGB Output Channel",
    desc: "Each RGB Mixer column defines one output channel as a mix of red, green, and blue source channels.",
    up: "Increasing a source amount feeds more of that source channel into the output.",
    down: "Decreasing it removes that source channel from the output."
  },
  "monochrome": {
    title: "Monochrome",
    desc: "Combines channels into a black-and-white image using the RGB mixer.",
    up: "Enabling creates a monochrome mix.",
    down: "Disabling keeps color output."
  },
  "preserve-luminance": {
    title: "Preserve Luminance",
    desc: "Attempts to keep overall brightness stable while mixing channels.",
    up: "The mixer changes color relationships with less luma shift.",
    down: "Channel mixing can alter brightness more strongly."
  },
  "temporal-nr": {
    title: "Temporal Noise Reduction",
    desc: "Analyzes neighboring frames to reduce noise over time.",
    up: "More frames or threshold can remove more noise but may smear motion.",
    down: "Less temporal processing preserves motion detail but leaves more noise."
  },
  "spatial-nr": {
    title: "Spatial Noise Reduction",
    desc: "Reduces noise within a single frame by comparing nearby pixels.",
    up: "More threshold smooths noise and texture.",
    down: "Less threshold preserves detail but removes less noise."
  },
  "motion-blur": {
    title: "Motion Blur",
    desc: "Adds optical blur based on motion estimation.",
    up: "More blur softens moving objects and can smooth stutter.",
    down: "Less blur keeps motion sharper."
  },
  "curve-graph": {
    title: "Custom Curve Spline",
    desc: "The diagonal line maps input tone on the horizontal axis to output tone on the vertical axis. Adding points creates a spline for contrast or channel correction.",
    up: "Raising a point makes that input range brighter or stronger in the selected channel.",
    down: "Lowering a point darkens or reduces that input range."
  },
  "curve-channel": {
    title: "Curve Channel",
    desc: "Selects whether the custom curve edits Y/luma or an individual red, green, or blue channel.",
    up: "Editing a channel can create targeted color balance changes.",
    down: "Returning to Y changes brightness without direct hue bias."
  },
  "soft-clip": {
    title: "Soft Clip",
    desc: "Compresses highlights or shadows near clipping to make rolloff smoother.",
    up: "More soft clipping rounds harsh clipped areas.",
    down: "Less soft clipping preserves a harder signal edge."
  },
  "color-slice-param": {
    title: "ColorSlice Global Parameter",
    desc: "Global ColorSlice controls alter density, saturation, balance, depth, or hue across slice ranges.",
    up: "Increasing strengthens the selected ColorSlice behavior.",
    down: "Decreasing reduces the effect."
  },
  "slice-center": {
    title: "Slice Center",
    desc: "Sets where a hue slice is centered.",
    up: "Moves the slice center around the hue wheel.",
    down: "Moves it in the opposite direction."
  },
  "slice-hue": {
    title: "Slice Hue",
    desc: "Shifts the selected hue range toward another hue.",
    up: "Rotates the slice forward around the hue wheel.",
    down: "Rotates the slice backward."
  },
  "slice-density": {
    title: "Slice Density",
    desc: "Changes perceived depth or richness for the selected color slice.",
    up: "The slice becomes richer and more substantial.",
    down: "The slice becomes lighter or less dense."
  },
  "slice-sat": {
    title: "Slice Saturation",
    desc: "Changes saturation for the selected color slice.",
    up: "The slice becomes more vivid.",
    down: "The slice becomes more muted."
  },
  "warper-graph": {
    title: "Chroma Warp Grid",
    desc: "A two-dimensional color map where pins can push hue and chroma relationships.",
    up: "Moving a pin outward increases saturation in that direction.",
    down: "Moving inward desaturates or returns the hue closer to neutral."
  },
  "warper-pin": {
    title: "Warper Pin",
    desc: "A control point that remaps a local hue/chroma area.",
    up: "Dragging it changes nearby colors more strongly.",
    down: "Returning it to its origin removes the warp."
  },
  "qualifier-tool": {
    title: "Qualifier Tool",
    desc: "Chooses how the qualifier samples or edits the key range.",
    up: "Adding samples expands the selected matte range.",
    down: "Subtracting samples removes unwanted areas from the matte."
  },
  "qualifier-hue": {
    title: "Qualifier Hue Range",
    desc: "Selects the hue band included in the secondary key.",
    up: "A wider range includes more hues.",
    down: "A narrower range isolates fewer hues."
  },
  "qualifier-saturation": {
    title: "Qualifier Saturation Range",
    desc: "Selects the saturation range included in the key.",
    up: "Higher width includes both muted and vivid samples.",
    down: "Lower width isolates a tighter saturation band."
  },
  "qualifier-luminance": {
    title: "Qualifier Luminance Range",
    desc: "Selects the brightness range included in the key.",
    up: "Higher range includes more tonal values.",
    down: "Lower range isolates a narrower brightness band."
  },
  "matte-finesse": {
    title: "Matte Finesse",
    desc: "Refines the key after sampling by cleaning, blurring, shrinking, or balancing matte regions.",
    up: "More finesse can smooth noise and fill holes.",
    down: "Less finesse preserves the raw sampled matte."
  },
  "window-shape": {
    title: "Power Window Shape",
    desc: "Adds or edits a shape used to limit a correction to part of the frame.",
    up: "More windows can isolate more areas.",
    down: "Deleting or disabling a window makes the correction affect more of the image."
  },
  "window-transform": {
    title: "Window Transform",
    desc: "Moves, scales, rotates, and adjusts opacity for the selected Power Window.",
    up: "Increasing size, pan, or opacity expands or strengthens the window.",
    down: "Decreasing them shrinks, moves back, or weakens the window."
  },
  "window-softness": {
    title: "Window Softness",
    desc: "Feathers the inside or outside edge of a Power Window.",
    up: "More softness makes the transition less visible.",
    down: "Less softness creates a harder edge."
  },
  "tracker-play": {
    title: "Tracker Transport",
    desc: "Runs tracking forward, backward, or frame by frame.",
    up: "Tracking across more frames follows motion through the shot.",
    down: "Tracking fewer frames limits analysis to the current range."
  },
  "tracker-toggle": {
    title: "Tracker Parameter",
    desc: "Chooses which motion components are analyzed for the track.",
    up: "Enabling more components handles more complex motion.",
    down: "Disabling components can stabilize a simple track."
  },
  "tracker-graph": {
    title: "Tracker Timeline",
    desc: "Shows the tracked path data and keyframes over time.",
    up: "More keyframes or tracking data can follow complex motion.",
    down: "Fewer keyframes are easier to edit but may drift."
  },
  "cloud-tracker": {
    title: "Cloud Tracker",
    desc: "The tracker mode used for analyzing movement in the selected window.",
    up: "A more advanced mode can solve harder motion.",
    down: "A simpler mode may be faster on straightforward motion."
  },
  "blur-radius": {
    title: "Blur Radius",
    desc: "Controls how much the image or selected channel is blurred.",
    up: "More radius makes detail softer.",
    down: "Less radius preserves sharpness."
  },
  "hv-ratio": {
    title: "H/V Ratio",
    desc: "Changes the balance between horizontal and vertical blur.",
    up: "More horizontal or vertical bias changes blur direction.",
    down: "Returning to equal values makes blur more circular."
  },
  "blur-scaling": {
    title: "Blur Scaling",
    desc: "Scales blur response by channel.",
    up: "More scaling increases that channel's blur contribution.",
    down: "Less scaling reduces it."
  },
  "coring-softness": {
    title: "Coring Softness",
    desc: "Limits sharpening or blur so low-level noise is affected less.",
    up: "More coring protects fine noise and subtle texture.",
    down: "Less coring applies the blur/sharpen result more broadly."
  },
  "key-preview": {
    title: "Key Matte Preview",
    desc: "Shows a matte-style preview where white areas pass the correction and black areas are held back.",
    up: "More white means more of the correction passes through.",
    down: "More black means more of the correction is suppressed."
  },
  "key-input": {
    title: "Key Input",
    desc: "Controls the incoming key signal for a node.",
    up: "Higher gain makes the incoming key stronger.",
    down: "Lower gain weakens or removes the incoming key."
  },
  "key-output": {
    title: "Key Output",
    desc: "Controls the node's outgoing key strength.",
    up: "Higher gain lets more of the node correction through.",
    down: "Lower gain mixes the node correction down."
  },
  "qualifier-key": {
    title: "Qualifier Key",
    desc: "Adjusts the key generated by a qualifier before it is used by the node.",
    up: "More gain strengthens selected matte areas.",
    down: "Less gain weakens the matte."
  },
  "sizing-control": {
    title: "Sizing Control",
    desc: "Transforms the image with pan, tilt, zoom, rotation, width, height, pitch, or yaw.",
    up: "Increasing the value moves, enlarges, or rotates in that direction.",
    down: "Decreasing moves, shrinks, or rotates in the opposite direction."
  },
  "blanking-control": {
    title: "Blanking Control",
    desc: "Crops the image edge inside the frame.",
    up: "More blanking cuts farther into the image.",
    down: "Less blanking restores the edge."
  },
  "stereo-control": {
    title: "Stereo 3D Control",
    desc: "Adjusts stereoscopic image alignment and depth cues.",
    up: "Increasing changes convergence or offsets the stereo pair more strongly.",
    down: "Decreasing brings the stereo pair closer to neutral."
  },
  "keyframe-row": {
    title: "Keyframe Row",
    desc: "A track that can hold animation keyframes for a Color page parameter group.",
    up: "Adding keyframes animates that parameter over time.",
    down: "Removing keyframes makes the parameter static."
  },
  "keyframe-playhead": {
    title: "Keyframe Playhead",
    desc: "Shows the current time in the keyframe timeline.",
    up: "Moving later edits or reads later animation values.",
    down: "Moving earlier edits or reads earlier values."
  },
  "scope-preview": {
    title: "Parade Scope",
    desc: "Displays red, green, and blue signal levels separately so exposure and color balance can be measured.",
    up: "Higher traces indicate brighter channel values.",
    down: "Lower traces indicate darker channel values."
  },
  "scope-settings": {
    title: "Scope Settings",
    desc: "Changes scope type, scale, graticule, and measurement preferences.",
    up: "More display options can reveal different signal problems.",
    down: "A simpler scope view is easier to read quickly."
  },
  "info-field": {
    title: "Clip Info Field",
    desc: "Displays metadata for the selected clip or project state.",
    up: "Changing the selected clip updates these values.",
    down: "No numeric increase or decrease is applied here."
  },
  "media-page": {
    title: "Media Page",
    desc: "Resolve page for importing and organizing media.",
    up: "Switching there focuses on media management.",
    down: "Staying on Color keeps grading controls visible."
  },
  "cut-page": {
    title: "Cut Page",
    desc: "Resolve page for fast timeline assembly.",
    up: "Switching there focuses on rapid editing.",
    down: "Staying on Color keeps grading controls visible."
  },
  "edit-page": {
    title: "Edit Page",
    desc: "Resolve page for full timeline editing.",
    up: "Switching there focuses on timeline edits.",
    down: "Staying on Color keeps grading controls visible."
  },
  "color-page": {
    title: "Color Page",
    desc: "The active Resolve page in this mockup.",
    up: "This page exposes grading palettes, nodes, clips, scopes, and keyframes.",
    down: "Switching away hides the Color page controls."
  },
  "fairlight-page": {
    title: "Fairlight Page",
    desc: "Resolve page for audio post production.",
    up: "Switching there focuses on audio mixing and repair.",
    down: "Staying on Color keeps visual grading active."
  },
  "deliver-page": {
    title: "Deliver Page",
    desc: "Resolve page for exporting rendered media.",
    up: "Switching there focuses on render settings.",
    down: "Staying on Color keeps grading controls visible."
  },
  "project-settings": {
    title: "Project Settings",
    desc: "Opens project-wide settings such as color management, timeline format, and cache behavior.",
    up: "Changing settings can affect the whole project.",
    down: "Leaving them alone preserves the current project configuration."
  }
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function valueField(key, value, extra = "") {
  return `<span class="value-field ${extra}" data-info="${esc(key)}">${esc(value)}</span>`;
}

function selectField(key, value) {
  return `<span class="select-field" data-info="${esc(key)}">${esc(value)}</span>`;
}

function slider(key, pos = 50, extra = "") {
  return `<span class="slider ${extra}" style="--pos:${pos}%" data-info="${esc(key)}"></span>`;
}

function sideSlider(label, key, value, pos = 50, sliderClass = "white") {
  return `
    <div class="side-slider" data-info="${esc(key)}">
      <div class="side-slider-head">
        <span class="control-label">${esc(label)}</span>
        ${valueField(key, value)}
      </div>
      ${slider(key, pos, sliderClass)}
    </div>
  `;
}

function sideSelect(label, key, value) {
  return `
    <div class="side-slider side-select" data-info="${esc(key)}">
      <span class="control-label">${esc(label)}</span>
      ${selectField(key, value)}
    </div>
  `;
}

function checkbox(key, checked = false) {
  return `<span class="checkbox ${checked ? "checked" : ""}" data-info="${esc(key)}"></span>`;
}

function labeledField(label, key, value, sliderPos, sliderClass = "") {
  return `
    <span class="control-label">${esc(label)}</span>
    ${slider(key, sliderPos, sliderClass)}
    ${valueField(key, value)}
  `;
}

function param(label, key, value, sliderClass = "") {
  return `
    <div class="param" data-info="${esc(key)}">
      <span class="control-label">${esc(label)}</span>
      ${valueField(key, value)}
      ${slider(key, 50, sliderClass)}
    </div>
  `;
}

function actionsHtml() {
  return `
    <button class="action-dot reset" data-info="reset-palette" aria-label="Reset palette"></button>
    <button class="action-dot menu" data-info="palette-menu" aria-label="Palette options"></button>
  `;
}

function wheelCard(title, key, values) {
  const [master, red, green, blue] = values;
  return `
    <article class="wheel-card">
      <div class="wheel-title" data-info="${esc(key)}">${esc(title)}</div>
      <div class="wheel" data-info="wheel-color"><span class="wheel-handle"></span></div>
      <div class="value-row">
        <span class="value-chip" data-info="master-wheel-value">${esc(master)}</span>
        <span class="value-chip" data-info="red-channel">${esc(red)}<span class="channel-line red"></span></span>
        <span class="value-chip" data-info="green-channel">${esc(green)}<span class="channel-line green"></span></span>
        <span class="value-chip" data-info="blue-channel">${esc(blue)}<span class="channel-line blue"></span></span>
      </div>
      <div class="micro-strip" data-info="luma-strip"></div>
    </article>
  `;
}

function renderCameraRaw() {
  return `
    <div class="panel-content panel-grid-2">
      <section class="panel-column">
        <h3 class="section-heading">Decode</h3>
        <div class="control-grid">
          <span class="control-label">Decode Quality</span>
          ${selectField("decode-quality", "Use project setting")}
          <span></span>
          <span class="control-label">Decode Using</span>
          ${selectField("decode-using", "ARRI default")}
          <span></span>
          <span></span>
          <span class="option-row">${checkbox("monochrome-decode")} Decode as monochrome</span>
          <span></span>
          <span></span>
          <span class="option-row">${checkbox("log-decode")} Decode as LogC4</span>
          <span></span>
        </div>
      </section>
      <section class="panel-column">
        <h3 class="section-heading muted">ARRI</h3>
        <div class="control-grid">
          ${labeledField("Color Temp", "raw-color-temp", "2000", 10, "warm")}
          ${labeledField("Tint", "raw-tint", "0.00", 50, "tint")}
          ${labeledField("Exposure", "raw-exposure", "160", 42, "white")}
          ${labeledField("Sharpness", "raw-sharpness", "10.00", 18, "white")}
        </div>
        <div class="lower-options">
          <span></span>
          <button class="button-field" data-info="use-changes">Use Changes</button>
          <button class="button-field" data-info="use-settings">Use Settings</button>
        </div>
      </section>
    </div>
  `;
}

function renderColorMatch() {
  const colors = [
    "#7b4434", "#c98472", "#5476a2", "#416d25", "#816eb0", "#10c6a2",
    "#f05b00", "#5035b1", "#d90053", "#690168", "#7ed700", "#f29800",
    "#3d0092", "#00ac16", "#c8002a", "#ffd000", "#d4009c", "#0b8aa1",
    "#f8f8ef", "#c6c8c6", "#9fa4a0", "#7b7d79", "#484e4d", "#171719"
  ];
  return `
    <div class="panel-content panel-grid-2">
      <section class="color-chart" data-info="color-chart">
        ${colors.map(color => `<span class="patch" style="background:${color}" data-info="color-chart"></span>`).join("")}
      </section>
      <section class="panel-column">
        <h3 class="section-heading">Configuration</h3>
        <div class="control-grid compact">
          <span class="control-label">Source Gamma</span>
          ${selectField("source-gamma", "Auto")}
          <span></span>
          <span class="control-label">Target Gamma</span>
          ${selectField("target-gamma", "Auto")}
          <span></span>
          <span class="control-label">Target Color Space</span>
          ${selectField("target-color-space", "Auto")}
          <span></span>
          <span class="control-label">Color Temp</span>
          ${valueField("match-color-temp", "6500 K")}
          <span></span>
          <span class="control-label">White Level</span>
          ${valueField("white-level", "0.9")}
          ${checkbox("white-level")}
        </div>
        <div class="lower-options">
          <span></span>
          <button class="button-field" data-info="match-button">Match</button>
        </div>
      </section>
    </div>
  `;
}

function renderPrimaries() {
  return `
    <div class="panel-content wheels-panel">
      <div class="top-param-row">
        ${param("Temp", "temp", "0.0", "warm")}
        ${param("Tint", "tint", "0.00", "tint")}
        ${param("Contrast", "contrast", "1.000", "white")}
        ${param("Pivot", "pivot", "0.435", "white")}
        ${param("Mid/Detail", "mid-detail", "0.00", "white")}
      </div>
      <div class="wheel-row">
        ${wheelCard("Lift", "lift", ["0.00", "0.00", "0.00", "0.00"])}
        ${wheelCard("Gamma", "gamma", ["0.00", "0.00", "0.00", "0.00"])}
        ${wheelCard("Gain", "gain", ["1.00", "1.00", "1.00", "1.00"])}
        ${wheelCard("Offset", "offset", ["25.00", "25.00", "25.00", ""])}
      </div>
      <div class="bottom-param-row">
        ${param("Color Boost", "color-boost", "0.00", "sat")}
        ${param("Shadows", "shadows", "0.00", "white")}
        ${param("Highlights", "highlights", "0.00", "white")}
        ${param("Saturation", "saturation", "50.00", "sat")}
        ${param("Hue", "hue", "50.00", "rainbow")}
        ${param("Lum Mix", "lum-mix", "100.00", "white")}
      </div>
    </div>
  `;
}

function renderHdr() {
  const hdrCard = (title, offset, tempIcon) => `
    <article class="wheel-card">
      <div class="wheel-title" data-info="hdr-zone">${esc(title)}</div>
      <div class="wheel" data-info="wheel-color"><span class="wheel-handle"></span></div>
      <div class="control-grid compact">
        <span class="control-label">Exp</span>
        ${slider("hdr-exp", 50, "white")}
        ${valueField("hdr-exp", "0.00")}
        <span class="control-label">Sat</span>
        ${slider("hdr-sat", 65, "sat")}
        ${valueField("hdr-sat", "1.00")}
        <span class="control-label">X</span>
        ${valueField("wheel-color", "0.00")}
        <span class="control-label">Y</span>
        ${valueField("wheel-color", "0.00")}
        <span class="control-label">${tempIcon ? "Fall" : ""}</span>
        ${valueField("hdr-falloff", offset)}
      </div>
    </article>
  `;
  return `
    <div class="panel-content wheels-panel">
      <div class="hdr-zone-row" data-info="hdr-zone">
        <span>&lt;</span>
        <span class="zone-dot"></span>
        <span class="zone-dot active"></span>
        <span class="zone-dot active"></span>
        <span class="zone-dot active"></span>
        <span class="zone-dot"></span>
        <span class="zone-dot"></span>
        <span>&gt;</span>
      </div>
      <div class="wheel-row hdr-wheel-row">
        ${hdrCard("Dark", "0.20", true)}
        ${hdrCard("Shadow", "0.22", true)}
        ${hdrCard("Light", "0.22", true)}
        ${hdrCard("Global", "", false)}
      </div>
      <div class="bottom-param-row">
        ${param("Temp", "temp", "0.00", "warm")}
        ${param("Tint", "tint", "0.00", "tint")}
        ${param("Hue", "hue", "0.00", "rainbow")}
        ${param("Contrast", "contrast", "1.000", "white")}
        ${param("Pivot", "pivot", "0.000", "white")}
        ${param("Mid/Det", "mid-detail", "0.00", "white")}
      </div>
    </div>
  `;
}

function renderRgbMixer() {
  const column = (title, vals) => `
    <section class="mixer-column" data-info="rgb-output">
      <h3 class="section-heading">${esc(title)}</h3>
      <div class="vertical-bars">
        <span class="vbar red" style="--fill:${vals[0]}%" data-info="rgb-output"></span>
        <span class="vbar green" style="--fill:${vals[1]}%" data-info="rgb-output"></span>
        <span class="vbar blue" style="--fill:${vals[2]}%" data-info="rgb-output"></span>
      </div>
      <div class="value-row">
        <span class="value-chip" data-info="red-channel">${vals[0] === 86 ? "1.00" : "0.00"}<span class="channel-line red"></span></span>
        <span class="value-chip" data-info="green-channel">${vals[1] === 86 ? "1.00" : "0.00"}<span class="channel-line green"></span></span>
        <span class="value-chip" data-info="blue-channel">${vals[2] === 86 ? "1.00" : "0.00"}<span class="channel-line blue"></span></span>
      </div>
    </section>
  `;
  return `
    <div class="panel-content">
      <div class="panel-grid-3" style="height:calc(100% - 46px)">
        ${column("Red Output", [86, 50, 50])}
        ${column("Green Output", [50, 86, 50])}
        ${column("Blue Output", [50, 50, 86])}
      </div>
      <div class="lower-options">
        <span class="option-row">${checkbox("rgb-output", true)} R -> G</span>
        <span class="option-row">${checkbox("monochrome")} Monochrome</span>
        <span class="option-row">${checkbox("preserve-luminance", true)} Preserve Luminance</span>
      </div>
    </div>
  `;
}

function renderMotionFx() {
  return `
    <div class="motion-grid">
      <section class="subpanel" data-info="temporal-nr">
        <h3 class="section-heading">Temporal NR</h3>
        <div class="control-grid compact">
          <span class="control-label">Frames</span>
          ${selectField("temporal-nr", "0")}
          <span></span>
          <span class="control-label">Mo. Est. Type</span>
          ${selectField("temporal-nr", "Faster")}
          <span></span>
          <span class="control-label">Motion Range</span>
          ${selectField("temporal-nr", "Medium")}
          <span></span>
        </div>
        <div class="divider"></div>
        <h3 class="section-heading">Temporal Threshold</h3>
        <div class="control-grid compact">
          ${labeledField("Luma", "temporal-nr", "0.0", 10, "white")}
          ${labeledField("Chroma", "temporal-nr", "0.0", 10, "sat")}
          ${labeledField("Motion", "temporal-nr", "50.0", 50, "white")}
          ${labeledField("Blend", "temporal-nr", "0.0", 12, "white")}
        </div>
      </section>
      <section class="subpanel" data-info="spatial-nr">
        <h3 class="section-heading">Spatial NR</h3>
        <div class="control-grid compact">
          <span class="control-label">Mode</span>
          ${selectField("spatial-nr", "Faster")}
          <span></span>
          <span class="control-label">Radius</span>
          ${selectField("spatial-nr", "Small")}
          <span></span>
        </div>
        <div class="divider"></div>
        <h3 class="section-heading">Spatial Threshold</h3>
        <div class="control-grid compact">
          ${labeledField("Luma", "spatial-nr", "0.0", 14, "white")}
          ${labeledField("Chroma", "spatial-nr", "0.0", 14, "sat")}
          ${labeledField("Blend", "spatial-nr", "0.0", 14, "white")}
        </div>
      </section>
      <section class="subpanel" data-info="motion-blur">
        <h3 class="section-heading">Motion Blur</h3>
        <div class="control-grid compact">
          <span class="control-label">Mo. Est. Type</span>
          ${selectField("motion-blur", "Faster")}
          <span></span>
          <span class="control-label">Motion Range</span>
          ${selectField("motion-blur", "Medium")}
          <span></span>
          ${labeledField("Motion Blur", "motion-blur", "0.0", 6, "white")}
        </div>
      </section>
    </div>
  `;
}

function renderCurves() {
  return `
    <div class="curve-layout">
      <section class="curve-graph" data-info="curve-graph">
        <div class="curve-line">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C22 82 42 65 61 47 S88 15 100 0" fill="none" stroke="#eee2d8" stroke-width="1.2"></path>
          </svg>
        </div>
        <span class="curve-point start" data-info="curve-graph"></span>
        <span class="curve-point end" data-info="curve-graph"></span>
      </section>
      <aside class="side-controls">
        <h3 class="section-heading">Edit</h3>
        <div class="channel-buttons" data-info="curve-channel">
          <button class="channel-button" data-info="curve-channel">Y</button>
          <button class="channel-button r" data-info="curve-channel">R</button>
          <button class="channel-button g" data-info="curve-channel">G</button>
          <button class="channel-button b" data-info="curve-channel">B</button>
        </div>
        <div class="control-grid compact">
          ${labeledField("Y", "curve-graph", "100", 92, "white")}
          ${labeledField("R", "curve-graph", "100", 92, "white")}
          ${labeledField("G", "curve-graph", "100", 92, "white")}
          ${labeledField("B", "curve-graph", "100", 92, "white")}
        </div>
        <div class="divider"></div>
        <h3 class="section-heading">Soft Clip</h3>
        <div class="control-grid compact">
          ${labeledField("Low", "soft-clip", "", 50, "white")}
          ${labeledField("Low Soft", "soft-clip", "", 5, "white")}
          ${labeledField("High", "soft-clip", "", 50, "white")}
          ${labeledField("High Soft", "soft-clip", "", 5, "white")}
        </div>
      </aside>
    </div>
  `;
}

function renderColorSlice() {
  const slices = [
    ["Red", "#ff1732"], ["Skin", "#d7a28e"], ["Yellow", "#e4ff00"],
    ["Green", "#00f030"], ["Cyan", "#21e8e0"], ["Blue", "#613cff"], ["Magenta", "#ff10ad"]
  ];
  return `
    <div class="panel-content">
      <div class="bottom-param-row" style="margin-bottom:10px">
        ${param("Density", "color-slice-param", "0.00", "white")}
        ${param("Den.Depth", "color-slice-param", "0.00", "white")}
        ${param("Saturation", "color-slice-param", "1.00", "sat")}
        ${param("Sat.Balance", "color-slice-param", "0.00", "white")}
        ${param("Sat.Depth", "color-slice-param", "0.00", "white")}
        ${param("Hue", "color-slice-param", "0.00", "rainbow")}
      </div>
      <div class="slice-grid">
        ${slices.map(([name, color]) => `
          <section class="slice-card">
            <h3 class="section-heading" style="margin:0">${esc(name)}</h3>
            <span class="mini-wheel" data-info="slice-center"></span>
            <div class="slice-fields">
              <span class="control-label">Center</span>
              ${valueField("slice-center", "0.000")}
              <span class="control-label">Hue</span>
              ${valueField("slice-hue", "0.000")}
            </div>
            <div class="slice-bars">
              <span class="vbar slice-vbar" style="--bar-color:${color};--fill:40%" data-info="slice-density"></span>
              <span class="vbar slice-vbar" style="--bar-color:#aaa;--fill:66%" data-info="slice-sat"></span>
            </div>
            <div class="value-row">
              <span class="value-chip" data-info="slice-density">0.00</span>
              <span class="value-chip" data-info="slice-sat">1.00</span>
            </div>
          </section>
        `).join("")}
      </div>
    </div>
  `;
}

function renderWarper() {
  return `
    <div class="warper-layout">
      <section class="warper-graph" data-info="warper-graph">
        <div class="warper-region" data-info="warper-graph">
          <div class="warper-region-fill"></div>
          <svg class="warper-outline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M23 3 C38 8 54 17 70 29 C84 40 94 50 96 61 C86 75 68 85 45 91 C28 95 14 98 8 98 C4 82 4 60 6 40 C8 23 13 10 23 3 Z"></path>
          </svg>
        </div>
        <span class="pin" data-info="warper-pin"></span>
      </section>
      <aside class="side-controls">
        <h3 class="section-heading">Tools</h3>
        <div class="channel-buttons">
          <button class="channel-button" data-info="warper-pin">+</button>
          <button class="channel-button" data-info="warper-pin">P</button>
          <button class="channel-button" data-info="warper-pin">S</button>
          <button class="channel-button" data-info="warper-pin">X</button>
        </div>
        <div class="divider"></div>
        <h3 class="section-heading muted">Pin</h3>
        <div class="side-stack">
          ${sideSlider("Chroma Range", "warper-pin", "0.040", 22)}
          ${sideSlider("Tonal Range Low", "warper-pin", "1.000", 96)}
          ${sideSlider("Tonal Range High", "warper-pin", "1.000", 96)}
          ${sideSlider("Tonal Range Pivot", "warper-pin", "0.500", 50)}
          ${sideSlider("Exposure", "warper-pin", "0.000", 50)}
        </div>
      </aside>
    </div>
  `;
}

function renderQualifier() {
  const range = (label, key, bg, fields) => `
    <section class="range-control" data-info="${esc(key)}">
      <span class="toggle-pill"></span>
      <h3 class="section-heading" style="margin:0">${esc(label)}</h3>
      <span class="range-bar" style="--range-bg:${bg}" data-info="${esc(key)}"></span>
      <div class="range-values">
        ${fields.map(item => `<span class="control-label">${esc(item[0])}</span>${valueField(key, item[1])}`).join("")}
      </div>
    </section>
  `;
  return `
    <div class="qualifier-layout">
      <section class="qualifier-ranges">
        <div class="channel-buttons">
          <button class="channel-button" data-info="qualifier-tool">+</button>
          <button class="channel-button" data-info="qualifier-tool">-</button>
          <button class="channel-button" data-info="qualifier-tool">P</button>
        </div>
        ${range("Hue", "qualifier-hue", "linear-gradient(90deg,#d000ff,#f00,#ff0,#0f0,#0ff,#00f,#8000ff)", [["Center", "50.0"], ["Width", "100.0"], ["Soft", "0.0"], ["Sym", "50.0"]])}
        ${range("Saturation", "qualifier-saturation", "linear-gradient(90deg,#7e897e,#18d400)", [["Low", "0.0"], ["High", "100.0"], ["L. Soft", "0.0"], ["H. Soft", "0.0"]])}
        ${range("Luminance", "qualifier-luminance", "linear-gradient(90deg,#000,#839b7e,#fff)", [["Low", "0.0"], ["High", "100.0"], ["L. Soft", "0.0"], ["H. Soft", "0.0"]])}
      </section>
      <aside class="side-controls" data-info="matte-finesse">
        <h3 class="section-heading">Matte Finesse</h3>
        <div class="side-stack matte-grid">
          ${sideSlider("Pre-Filter", "matte-finesse", "0.0", 2)}
          ${sideSlider("Clean Black", "matte-finesse", "0.0", 2)}
          ${sideSlider("Black Clip", "matte-finesse", "0.0", 2)}
          ${sideSlider("Clean White", "matte-finesse", "0.0", 2)}
          ${sideSlider("White Clip", "matte-finesse", "100.0", 98)}
          ${sideSlider("Blur Radius", "matte-finesse", "0.0", 2)}
          ${sideSlider("In/Out Ratio", "matte-finesse", "0.0", 50)}
          ${sideSelect("Morph Operation", "matte-finesse", "Shrink")}
          ${sideSlider("Morph Radius", "matte-finesse", "0.0", 2)}
          ${sideSlider("Denoise", "matte-finesse", "0.0", 2)}
          ${sideSlider("Post-Filter", "matte-finesse", "0.0", 2)}
        </div>
      </aside>
    </div>
  `;
}

function renderWindow() {
  const shapes = [
    ["square", "Linear"], ["circle", "Circle"], ["linear", "Polygon"], ["curve-shape", "Curve"], ["gradient", "Gradient"]
  ];
  return `
    <div class="window-layout">
      <section class="shape-list">
        ${shapes.map(([shape, label]) => `
          <button class="shape-row" data-info="window-shape">
            <span class="shape-icon ${shape}"></span>
            <span class="section-heading" style="margin:0;color:var(--muted)">${esc(label)}</span>
          </button>
        `).join("")}
      </section>
      <aside class="side-controls">
        <h3 class="section-heading">Transform</h3>
        <div class="side-stack side-grid">
          ${sideSlider("Size", "window-transform", "50.00", 50)}
          ${sideSlider("Aspect", "window-transform", "50.00", 50)}
          ${sideSlider("Pan", "window-transform", "50.00", 50)}
          ${sideSlider("Tilt", "window-transform", "50.00", 50)}
          ${sideSlider("Rotate", "window-transform", "0.00", 50)}
          ${sideSlider("Opacity", "window-transform", "100.00", 100)}
        </div>
        <div class="divider"></div>
        <h3 class="section-heading">Softness</h3>
        <div class="side-stack side-grid">
          ${sideSlider("Soft 1", "window-softness", "2.07", 12)}
          ${sideSlider("Soft 2", "window-softness", "50.00", 50)}
          ${sideSlider("Inside", "window-softness", "50.00", 50)}
          ${sideSlider("Outside", "window-softness", "50.00", 50)}
        </div>
      </aside>
    </div>
  `;
}

function renderTracker() {
  return `
    <div class="tracker-content">
      <div class="tracker-controls">
        <button class="action-dot" data-info="tracker-play" aria-label="Track backward"></button>
        <button class="action-dot" data-info="tracker-play" aria-label="Previous frame"></button>
        <span class="option-row">${checkbox("tracker-toggle", true)} Pan</span>
        <span class="option-row">${checkbox("tracker-toggle", true)} Tilt</span>
        <span class="option-row">${checkbox("tracker-toggle", true)} Zoom</span>
        <span class="option-row">${checkbox("tracker-toggle", true)} Rotate</span>
        <span class="option-row">${checkbox("tracker-toggle", true)} Perspective 3D</span>
        <button class="button-field" data-info="tracker-toggle">Clip</button>
        <button class="button-field" data-info="tracker-toggle">Frame</button>
      </div>
      <section class="tracker-graph" data-info="tracker-graph">
        <div class="time-ruler">
          <span>00:00:00:00</span><span>00:00:00:15</span><span>00:00:01:06</span><span>00:00:02:20</span><span>00:00:03:17</span>
        </div>
        <span class="playhead" data-info="keyframe-playhead"></span>
        <span class="key-diamond" data-info="keyframe-row"></span>
      </section>
      <div class="tracker-footer">
        <span class="option-row">${checkbox("tracker-toggle")} Interactive Mode</span>
        ${selectField("cloud-tracker", "Cloud Tracker")}
      </div>
    </div>
  `;
}

function renderBlur() {
  const card = (title, key, vals, dim = false) => `
    <section class="blur-card" data-info="${esc(key)}">
      <h3 class="section-heading">${esc(title)}</h3>
      <div class="vertical-bars" style="height:170px;opacity:${dim ? "0.45" : "1"}">
        <span class="vbar red" style="--fill:${vals[0]}%" data-info="${esc(key)}"></span>
        <span class="vbar green" style="--fill:${vals[1]}%" data-info="${esc(key)}"></span>
        <span class="vbar blue" style="--fill:${vals[2]}%" data-info="${esc(key)}"></span>
      </div>
      <div class="value-row">
        <span class="value-chip" data-info="${esc(key)}">${esc(vals[3])}<span class="channel-line red"></span></span>
        <span class="value-chip" data-info="${esc(key)}">${esc(vals[4])}<span class="channel-line green"></span></span>
        <span class="value-chip" data-info="${esc(key)}">${esc(vals[5])}<span class="channel-line blue"></span></span>
      </div>
    </section>
  `;
  return `
    <div class="panel-content">
      <div class="blur-content" style="height:calc(100% - 44px)">
        ${card("Radius", "blur-radius", [51, 51, 51, "0.50", "0.50", "0.50"])}
        ${card("H/V Ratio", "hv-ratio", [51, 51, 51, "0.50", "0.50", "0.50"])}
        ${card("Scaling", "blur-scaling", [25, 25, 25, "0.25", "0.25", "0.25"], true)}
      </div>
      <div class="lower-options">
        <span></span>
        <span class="option-row">Coring Softness ${valueField("coring-softness", "0.00")}</span>
        <span class="option-row">Level ${valueField("coring-softness", "0.00")}</span>
        <span class="option-row">Mix ${valueField("coring-softness", "100.00")}</span>
      </div>
    </div>
  `;
}

function renderKey() {
  return `
    <div class="key-layout">
      <section class="key-preview" data-info="key-preview"></section>
      <aside class="side-controls">
        <h3 class="section-heading">Node Key</h3>
        <div class="divider"></div>
        <h3 class="section-heading">Key Input</h3>
        <div class="control-grid compact">
          <span class="control-label">Gain</span>${valueField("key-input", "1.000")}<span></span>
          <span class="control-label">Offset</span>${valueField("key-input", "0.000")}<span></span>
          <span class="control-label">Blur R.</span>${valueField("key-input", "0.000")}<span></span>
          <span class="control-label">Blur H/V</span>${valueField("key-input", "0.000")}<span></span>
        </div>
        <div class="divider"></div>
        <h3 class="section-heading">Key Output</h3>
        <div class="control-grid compact">
          <span class="control-label">Gain</span>${valueField("key-output", "1.000")}<span></span>
          <span class="control-label">Offset</span>${valueField("key-output", "0.000")}<span></span>
        </div>
        <div class="divider"></div>
        <h3 class="section-heading">Qualifier</h3>
        <div class="control-grid compact">
          <span class="control-label">Gain</span>${valueField("qualifier-key", "1.000")}<span></span>
          <span class="control-label">Offset</span>${valueField("qualifier-key", "0.000")}<span></span>
        </div>
      </aside>
    </div>
  `;
}

function renderSizing() {
  const controls = [
    ["Pan", "0.000", 50], ["Tilt", "0.000", 50], ["Zoom", "1.000", 20], ["Rotate", "0.000", 50],
    ["Width", "1.000", 25], ["Height", "1.000", 25], ["Pitch", "0.000", 50], ["Yaw", "0.000", 50]
  ];
  return `
    <div class="sizing-layout">
      <section class="subpanel">
        <h3 class="section-heading">Sizing</h3>
        <div class="control-grid">
          ${controls.map(([label, value, pos]) => labeledField(label, "sizing-control", value, pos, "white")).join("")}
          <span class="control-label">Flip</span>
          <button class="button-field" data-info="sizing-control">H</button>
          <button class="button-field" data-info="sizing-control">V</button>
        </div>
      </section>
      <section class="subpanel">
        <h3 class="section-heading muted">Blanking</h3>
        <div class="control-grid">
          ${["Top", "Right", "Bottom", "Left"].map(label => labeledField(label, "blanking-control", "", 10, "white")).join("")}
          <span></span>
          <span class="option-row">${checkbox("blanking-control")} Smooth</span>
          <span></span>
        </div>
      </section>
    </div>
  `;
}

function renderStereo3d() {
  return `
    <div class="panel-content panel-grid-2">
      <section class="panel-column">
        <h3 class="section-heading">Convergence</h3>
        <div class="control-grid">
          ${labeledField("Convergence", "stereo-control", "0.000", 50, "white")}
          ${labeledField("Horizontal Offset", "stereo-control", "0.000", 50, "white")}
          ${labeledField("Vertical Offset", "stereo-control", "0.000", 50, "white")}
          ${labeledField("Zoom", "stereo-control", "1.000", 25, "white")}
        </div>
      </section>
      <section class="panel-column">
        <h3 class="section-heading">Floating Window</h3>
        <div class="control-grid">
          ${labeledField("Left", "stereo-control", "0.000", 50, "white")}
          ${labeledField("Right", "stereo-control", "0.000", 50, "white")}
          ${labeledField("Top", "stereo-control", "0.000", 50, "white")}
          ${labeledField("Bottom", "stereo-control", "0.000", 50, "white")}
        </div>
      </section>
    </div>
  `;
}

function renderKeyframes() {
  return `
    <div class="panel-content" style="padding:0">
      <div class="tracker-graph" style="height:100%;margin:0" data-info="keyframe-playhead">
        <div class="time-ruler">
          <span>00:00:02:20</span><span>00:00:00:00</span><span>00:00:05:00</span><span>00:00:10:00</span>
        </div>
        <div style="position:absolute;left:0;top:40px;width:130px;bottom:0;background:#23232b;border-right:1px solid #050506">
          ${["Master", "Corrector 1", "Sizing"].map(label => `
            <div class="option-row" style="height:44px;padding-left:16px;border-bottom:1px solid #101116" data-info="keyframe-row">
              <span class="zone-dot" style="width:12px;height:12px;background:#fff"></span>
              <span>${esc(label)}</span>
            </div>
          `).join("")}
        </div>
        <span class="playhead" style="left:66%" data-info="keyframe-playhead"></span>
        <span class="key-diamond" style="left:142px;top:78px" data-info="keyframe-row"></span>
        <span class="key-diamond" style="left:142px;top:122px" data-info="keyframe-row"></span>
      </div>
    </div>
  `;
}

function renderScopes() {
  return `
    <div class="panel-content" style="padding:0">
      <section class="scope-preview" data-info="scope-preview">
        <div class="scope-scale">
          <span>1023</span><span>896</span><span>768</span><span>640</span><span>512</span><span>384</span><span>256</span><span>128</span><span>0</span>
        </div>
      </section>
    </div>
  `;
}

function renderInfo() {
  const item = (label, value = "") => `
    <div data-info="info-field">
      <div class="info-label">${esc(label)}</div>
      <div class="info-value">${esc(value)}</div>
    </div>
  `;
  return `
    <div class="info-content">
      <section class="info-block">
        <h3 class="section-heading">Clip</h3>
        <div class="info-grid">
          ${item("File Name")}
          ${item("Reel Name")}
          ${item("Start T/C")}
          ${item("End T/C")}
          ${item("Duration")}
          ${item("Frames")}
          ${item("Version")}
          ${item("Frame Rate")}
          ${item("Source Res")}
          ${item("Codec")}
        </div>
      </section>
      <section class="info-block">
        <h3 class="section-heading">System</h3>
        <div class="info-grid">
          ${item("Clips", "22")}
          ${item("Proxy", "Off")}
          ${item("Clip Cache", "Off")}
          ${item("Ref Transform", "Off")}
          ${item("Ref Mode", "Gallery")}
          ${item("Wipe Style", "Wipe-H")}
          ${item("Convergence", "Opposite")}
          ${item("Stereo Grade", "Left - Solo")}
          ${item("Stereo Display", "Mono")}
        </div>
      </section>
    </div>
  `;
}

const panelRenderers = {
  cameraRaw: renderCameraRaw,
  colorMatch: renderColorMatch,
  primaries: renderPrimaries,
  hdr: renderHdr,
  rgbMixer: renderRgbMixer,
  motionFx: renderMotionFx,
  curves: renderCurves,
  colorSlice: renderColorSlice,
  warper: renderWarper,
  qualifier: renderQualifier,
  window: renderWindow,
  tracker: renderTracker,
  blur: renderBlur,
  key: renderKey,
  sizing: renderSizing,
  stereo3d: renderStereo3d,
  keyframes: renderKeyframes,
  scopes: renderScopes,
  info: renderInfo
};

function findNavItem(section, id) {
  return navGroups[section].find(item => item.id === id);
}

function renderNav(section) {
  const nav = document.getElementById(`${section}-nav`);
  nav.innerHTML = navGroups[section].map(item => `
    <button
      class="nav-button ${state[section] === item.id ? "active" : ""}"
      data-nav-section="${esc(section)}"
      data-nav-id="${esc(item.id)}"
      data-tooltip-title="${esc(item.label)}"
      data-tooltip-body="${esc(item.desc)}"
      aria-label="${esc(item.label)}"
      type="button">
      <span class="nav-glyph glyph-${esc(item.icon)}" aria-hidden="true"></span>
    </button>
  `).join("");
}

function renderPanel(section) {
  const item = findNavItem(section, state[section]);
  const title = document.getElementById(`${section}-title`);
  const panel = document.getElementById(`${section}-panel`);
  const actions = document.getElementById(`${section}-actions`);
  title.textContent = item.title;
  actions.innerHTML = actionsHtml();
  panel.innerHTML = panelRenderers[item.id]();
  renderNav(section);
}

function renderAll() {
  ["left", "middle", "right"].forEach(section => {
    renderNav(section);
    renderPanel(section);
  });
}

const navTooltip = document.getElementById("nav-tooltip");
const navTooltipTitle = document.getElementById("nav-tooltip-title");
const navTooltipBody = document.getElementById("nav-tooltip-body");

function showNavTooltip(button, event) {
  navTooltipTitle.textContent = button.dataset.tooltipTitle;
  navTooltipBody.textContent = button.dataset.tooltipBody;
  navTooltip.classList.remove("hidden");
  moveNavTooltip(event || { clientX: button.getBoundingClientRect().left, clientY: button.getBoundingClientRect().top });
}

function moveNavTooltip(event) {
  if (navTooltip.classList.contains("hidden")) return;
  const padding = 10;
  const rect = navTooltip.getBoundingClientRect();
  let left = event.clientX + 14;
  let top = event.clientY + 14;
  if (left + rect.width > window.innerWidth - padding) {
    left = window.innerWidth - rect.width - padding;
  }
  if (top + rect.height > window.innerHeight - padding) {
    top = event.clientY - rect.height - 14;
  }
  navTooltip.style.left = `${Math.max(padding, left)}px`;
  navTooltip.style.top = `${Math.max(padding, top)}px`;
}

function hideNavTooltip() {
  navTooltip.classList.add("hidden");
}

const infoOverlay = document.getElementById("info-overlay");
const infoPopover = document.getElementById("info-popover");
const infoTitle = document.getElementById("info-title");
const infoDesc = document.getElementById("info-desc");
const infoUp = document.getElementById("info-up");
const infoDown = document.getElementById("info-down");

function fallbackTip(element) {
  const text = (element.getAttribute("aria-label") || element.textContent || "Control").trim().replace(/\s+/g, " ");
  return {
    title: text || "Control",
    desc: "This is an interactive control in the DaVinci Resolve Color page mockup.",
    up: "Increasing or enabling it strengthens the related adjustment.",
    down: "Decreasing or disabling it reduces the related adjustment."
  };
}

function showInfo(key, element) {
  const data = tips[key] || fallbackTip(element);
  infoTitle.textContent = data.title;
  infoDesc.textContent = data.desc;
  infoUp.textContent = data.up;
  infoDown.textContent = data.down;
  infoOverlay.classList.remove("hidden");

  const source = element.getBoundingClientRect();
  const popWidth = 360;
  const maxTop = window.innerHeight - 12;
  infoPopover.style.width = `${Math.min(popWidth, window.innerWidth - 24)}px`;
  const popRect = infoPopover.getBoundingClientRect();
  let left = source.left + source.width / 2 - popRect.width / 2;
  let top = source.bottom + 9;

  if (left + popRect.width > window.innerWidth - 12) {
    left = window.innerWidth - popRect.width - 12;
  }
  if (left < 12) {
    left = 12;
  }
  if (top + popRect.height > maxTop) {
    top = source.top - popRect.height - 9;
  }
  if (top < 12) {
    top = 12;
  }

  infoPopover.style.left = `${left}px`;
  infoPopover.style.top = `${top}px`;
}

function hideInfo() {
  infoOverlay.classList.add("hidden");
}

document.addEventListener("click", event => {
  const navButton = event.target.closest("[data-nav-id]");
  if (navButton) {
    const section = navButton.dataset.navSection;
    const id = navButton.dataset.navId;
    if (state[section] !== id) {
      state[section] = id;
      renderPanel(section);
    }
    hideInfo();
    return;
  }

  const infoElement = event.target.closest("[data-info]");
  if (infoElement) {
    const insidePopover = infoPopover.contains(infoElement);
    if (!insidePopover) {
      event.stopPropagation();
      showInfo(infoElement.dataset.info, infoElement);
    }
    return;
  }

  if (!infoPopover.contains(event.target)) {
    hideInfo();
  }
});

document.addEventListener("mouseover", event => {
  const button = event.target.closest("[data-nav-id]");
  if (button) {
    showNavTooltip(button, event);
  }
});

document.addEventListener("mousemove", event => {
  if (!navTooltip.classList.contains("hidden")) {
    moveNavTooltip(event);
  }
});

document.addEventListener("mouseout", event => {
  const button = event.target.closest("[data-nav-id]");
  if (button && !button.contains(event.relatedTarget)) {
    hideNavTooltip();
  }
});

document.addEventListener("focusin", event => {
  const button = event.target.closest("[data-nav-id]");
  if (button) {
    showNavTooltip(button, {
      clientX: button.getBoundingClientRect().left + button.offsetWidth / 2,
      clientY: button.getBoundingClientRect().bottom
    });
  }
});

document.addEventListener("focusout", event => {
  if (event.target.closest("[data-nav-id]")) {
    hideNavTooltip();
  }
});

document.getElementById("info-close").addEventListener("click", event => {
  event.stopPropagation();
  hideInfo();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    hideInfo();
    hideNavTooltip();
  }
});

renderAll();

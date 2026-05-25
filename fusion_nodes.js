const CAT_COLORS = {
  blur: '#4880d8', color: '#d84880', composite: '#50b870', effect: '#a070d8',
  filter: '#40b8b8', generator: '#d8b840', mask: '#e07040', matte: '#d84848',
  transform: '#6e9ec8', io: '#888896', misc: '#c8a86e'
};

const IO_COLORS = {
  orange: '#e07040', green: '#50b870', blue: '#4880d8', yellow: '#d8b840',
  purple: '#a070d8', teal: '#40b8b8', red: '#d84848', white: '#aaaaaa',
  gray: '#666680', magenta: '#d050a0'
};

function dot(color, isCircle) {
  return `<div class="io-dot${isCircle?' circle':''}" style="background:${IO_COLORS[color]||color}"></div>`;
}

function dotLg(color, isCircle) {
  return `<div class="io-dot-lg${isCircle?' circle':''}" style="background:${IO_COLORS[color]||color}"></div>`;
}

const NODES = [
  // ─── BLUR ───────────────────────────────────────────────────────────
  {
    name: 'Blur', abbr: 'Blur', cat: 'blur',
    desc: 'Blurs the input image using one of five filter algorithms (Box, Bartlett, Multi-box, Gaussian, Fast Gaussian). One of the most common image-processing nodes in any composition.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Primary 2D image to blur.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask to limit the blur to a specific region of the image.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'The blurred 2D image.' }],
    params: [
      { name: 'Filter', desc: 'Algorithm used: Box (fast, lower quality), Bartlett (anti-aliased), Multi-box (quality Gaussian approximation), Gaussian (smooth symmetrical), Fast Gaussian (default).' },
      { name: 'Lock X/Y', desc: 'When enabled (default), X and Y blur sizes are locked together for uniform blurring.' },
      { name: 'Blur Size', desc: 'Controls the radius of the blur. With Lock X/Y off, each axis can be set independently.' },
      { name: 'Clipping Mode', desc: 'How edges are handled: Frame (default, uses full frame), Domain (respects upstream region), None (no clipping).' },
      { name: 'Blend', desc: 'Mixes the blurred result with the original image. 0 = full original, 1 = full blur.' },
      { name: 'RGBA Channels', desc: 'Select which channels are processed. Deselecting a channel skips it for faster rendering.' }
    ]
  },
  {
    name: 'Defocus', abbr: 'DFO', cat: 'blur',
    desc: 'Simulates an out-of-focus camera lens effect (bokeh). Creates a realistic lens blur that can vary based on depth information, producing circular highlight shapes characteristic of real optics.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Primary 2D image to defocus.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask limiting the defocus area.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'The defocused image.' }],
    params: [
      { name: 'Defocus Size', desc: 'Radius of the simulated lens blur / bokeh circles.' },
      { name: 'Filter', desc: 'Lens shape: Circle, Octagon, Hexagon, etc. Affects the shape of out-of-focus highlights.' },
      { name: 'Angle', desc: 'Rotates the bokeh shape.' },
      { name: 'Anamorphic', desc: 'Stretches the bokeh vertically to simulate anamorphic lens characteristics.' },
      { name: 'Clipping Mode', desc: 'Controls how the blur handles image edges.' },
      { name: 'Blend', desc: 'Blends the defocused result with the original.' }
    ]
  },
  {
    name: 'Directional Blur', abbr: 'DRBL', cat: 'blur',
    desc: 'Blurs the image in a specific direction, simulating motion blur or streak effects. Useful for adding a sense of speed or directional movement to elements.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Primary 2D image to blur directionally.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask limiting the directional blur.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Directionally blurred image.' }],
    params: [
      { name: 'Type', desc: 'Sets the blur style: Linear (straight streaks), Radial (circular spin), Zoom (scale-from-center), or Angle (along a specific angle).' },
      { name: 'Length / Strength', desc: 'Amount of blur applied in the chosen direction.' },
      { name: 'Angle', desc: 'Direction of the linear blur in degrees.' },
      { name: 'Center X/Y', desc: 'Center point for radial and zoom blur types.' },
      { name: 'Blend', desc: 'Blends the result with the original image.' }
    ]
  },
  {
    name: 'Glow', abbr: 'GLO', cat: 'blur',
    desc: 'Creates a soft luminous glow around bright areas of an image by blurring highlights and adding them back on top. Widely used for light effects, magical looks, and atmospheric haze.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Primary 2D image to apply glow to.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask to restrict which pixels receive the glow.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with glow applied.' }],
    params: [
      { name: 'Glow Size', desc: 'Radius of the glow spread. Larger values create a wider, softer glow.' },
      { name: 'Glow', desc: 'Intensity/brightness of the glow added back over the image.' },
      { name: 'Threshold', desc: 'Luminance cutoff — only pixels brighter than this value produce a glow.' },
      { name: 'Color', desc: 'Color tint applied to the glow. White keeps the original highlight color.' },
      { name: 'Blend', desc: 'Mixes the glowing result with the original.' }
    ]
  },
  {
    name: 'Sharpen', abbr: 'SHRP', cat: 'blur',
    desc: 'Increases the apparent sharpness of the image by enhancing edge contrast. The opposite of Blur — useful for adding detail or counteracting softness from other effects.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Primary 2D image to sharpen.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask limiting the sharpening region.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Sharpened image.' }],
    params: [
      { name: 'XY Softness', desc: 'Radius used by the edge-detection pass. Smaller values sharpen finer detail.' },
      { name: 'Sharpen Strength', desc: 'How aggressively edge contrast is boosted. High values can introduce ringing.' },
      { name: 'Blend', desc: 'Blends the sharpened result with the original.' }
    ]
  },
  {
    name: 'Soft Glow', abbr: 'SGlo', cat: 'blur',
    desc: 'A softer, diffused glow effect that highlights bright areas while also softening the overall image, giving a dreamy or romantic look. Less harsh than the standard Glow node.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Primary 2D image.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Soft glow image.' }],
    params: [
      { name: 'Blend', desc: 'Controls the mix between the original and the glowing result.' },
      { name: 'Glow Size', desc: 'Radius of the soft glow spread.' },
      { name: 'Glow Color', desc: 'Colorizes the glow highlight.' },
      { name: 'Threshold', desc: 'Brightness threshold above which glow is applied.' }
    ]
  },
  {
    name: 'Unsharp Mask', abbr: 'USM', cat: 'blur',
    desc: 'A classic sharpening technique from analog photography: subtracts a blurred version from the original to emphasize edges, then adds that edge signal back. Produces a more natural-looking sharpening than Sharpen.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Primary 2D image to sharpen.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Unsharp-mask-sharpened image.' }],
    params: [
      { name: 'Blur Size', desc: 'Radius of the internal blur pass used to create the difference signal.' },
      { name: 'Gain', desc: 'Multiplier applied to the edge-detail signal. Higher = more sharpening.' },
      { name: 'Threshold', desc: 'Minimum difference needed before sharpening is applied (suppresses noise amplification).' },
      { name: 'Blend', desc: 'Mix between the sharpened and original image.' }
    ]
  },
  {
    name: 'Vector Motion Blur', abbr: 'VBL', cat: 'blur',
    desc: 'Applies a realistic motion blur using optical flow vector data embedded in the image channels. Unlike Directional Blur, each pixel can have its own unique motion direction based on actual per-pixel velocity data.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image with embedded optical flow vector channels (U and V).' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask limiting motion blur.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with per-pixel motion blur applied.' }],
    params: [
      { name: 'Amount', desc: 'Scale factor for the motion vectors — how long each blur streak is.' },
      { name: 'Samples', desc: 'Number of samples along each motion path. More samples = smoother but slower.' },
      { name: 'Shutter Angle', desc: 'Simulates camera shutter duration. Affects the perceived blur length.' }
    ]
  },

  // ─── COLOR ──────────────────────────────────────────────────────────
  {
    name: 'Auto Gain', abbr: 'AG', cat: 'color',
    desc: 'Automatically normalizes the brightness range of an image by analyzing the minimum and maximum luminance values and scaling them to fill the 0–1 range. Useful for correcting underexposed or flat-looking footage.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image whose levels should be normalized.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Auto-leveled image.' }],
    params: [
      { name: 'Black Point', desc: 'Sets the target value for the darkest pixel in the output.' },
      { name: 'White Point', desc: 'Sets the target value for the brightest pixel in the output.' },
      { name: 'Blend', desc: 'Mixes the corrected result with the original.' }
    ]
  },
  {
    name: 'Brightness Contrast', abbr: 'BC', cat: 'color',
    desc: 'A simple and fast tool for adjusting the overall brightness and contrast of an image. Because of its simplicity and speed, it is used more often than a full Color Corrector when only global tonal adjustments are needed.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Primary image to adjust.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Adjusted image.' }],
    params: [
      { name: 'Brightness', desc: 'Adds or subtracts a constant value from all pixels. Shifts the entire tonal range up or down.' },
      { name: 'Contrast', desc: 'Scales pixel values around a midpoint — increases the spread between darks and lights.' },
      { name: 'Pivot', desc: 'The luminance midpoint around which contrast is applied.' },
      { name: 'Saturation', desc: 'Scales the colorfulness of the image. 0 = monochrome.' },
      { name: 'Low / High', desc: 'Clamp the output range — Low sets the minimum output, High sets the maximum.' },
      { name: 'Gamma', desc: 'Applies a gamma power function to the midtones independently of black/white points.' },
      { name: 'Blend', desc: 'Mixes the adjusted output with the original.' }
    ]
  },
  {
    name: 'Channel Booleans', abbr: 'BOL', cat: 'color',
    desc: 'Performs boolean (logical) operations on image channels between two inputs, or swaps/copies channels within a single image. Essential for channel manipulation, remapping aux passes, or building custom mattes.',
    inputs: [
      { color: 'orange', name: 'Foreground', desc: 'First image supplying channels for the operation.' },
      { color: 'green', name: 'Background', desc: 'Second optional image supplying channels.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with remapped/combined channels.' }],
    params: [
      { name: 'Operation (R/G/B/A)', desc: 'For each channel: source can be Fg or Bg channel, constant, or logical op (AND, OR, XOR, etc.).' },
      { name: 'Source Channel', desc: 'Which channel from the source image is used (Red, Green, Blue, Alpha, Luma, etc.).' }
    ]
  },
  {
    name: 'Color Corrector', abbr: 'CC', cat: 'color',
    desc: 'A comprehensive color grading node with separate controls for shadows, midtones, and highlights. Provides lift/gamma/gain wheels, hue/saturation adjustments, curves, and suppression — the primary tool for color grading within Fusion.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to color-correct.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask to restrict correction to part of the image.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Color-corrected image.' }],
    params: [
      { name: 'Master Wheels', desc: 'Lift/Gamma/Gain color wheels affecting the entire tonal range simultaneously.' },
      { name: 'Shadows/Mids/Highlights Wheels', desc: 'Per-range wheels that target only dark, mid, or bright pixels.' },
      { name: 'Hue / Saturation / Luminance', desc: 'Global HSL controls for each tonal range.' },
      { name: 'Curves', desc: 'Spline-based tone curves for RGB master, or per-channel R/G/B adjustment.' },
      { name: 'Color Suppression', desc: 'Reduces a specific color cast (e.g., green spill from a greenscreen).' },
      { name: 'Tonal Ranges', desc: 'Sets the boundary between shadow, midtone, and highlight regions.' }
    ]
  },
  {
    name: 'Color Curves', abbr: 'CCV', cat: 'color',
    desc: 'Applies spline-based tone curves to the image, allowing non-linear tonal adjustments across the full range. Can be applied globally (master curve) or per-channel (R, G, B, Alpha). Ideal for creative color looks.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to apply curves to.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Curves-adjusted image.' }],
    params: [
      { name: 'Channel Selector', desc: 'Switches between the Master (all channels), Red, Green, Blue, or Alpha curve.' },
      { name: 'Spline Curve', desc: 'Interactive spline — add control points to bend the tone curve. Input on X axis, output on Y axis.' },
      { name: 'Blend', desc: 'Mix between the corrected and original image.' }
    ]
  },
  {
    name: 'Color Gain', abbr: 'CLR', cat: 'color',
    desc: 'Provides independent gain (multiplication) controls for each color channel (RGBA) plus a master gain. Useful for simple color temperature or channel-balance corrections without the overhead of the Color Corrector.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to adjust.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Color-gain-adjusted image.' }],
    params: [
      { name: 'Master', desc: 'Multiplier applied equally to R, G, and B channels.' },
      { name: 'Red / Green / Blue', desc: 'Individual channel gain — multiply the value of each channel independently.' },
      { name: 'Alpha', desc: 'Multiplier for the alpha channel.' },
      { name: 'Blend', desc: 'Mix between adjusted and original.' }
    ]
  },
  {
    name: 'Color Matrix', abbr: 'CMX', cat: 'color',
    desc: 'Applies a 4×4 matrix transformation to the RGBA channels. Allows mathematically precise color transformations, including cross-channel mixing (e.g., adding green into red). Advanced tool for color space conversions and special looks.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to transform.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Matrix-transformed image.' }],
    params: [
      { name: '4×4 Matrix', desc: 'Each row/column pair controls how much of each input channel (R/G/B/A) contributes to each output channel.' },
      { name: 'Preset', desc: 'Presets for common operations: Saturation, Invert, Luminance-to-Alpha, etc.' }
    ]
  },
  {
    name: 'Color Space', abbr: 'CS', cat: 'color',
    desc: 'Converts an image between different color space encodings, such as from RGB to HSV, YUV, or CMY. Enables adjustments in color spaces other than RGB, then converts back.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to convert.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Color-space-converted image.' }],
    params: [
      { name: 'Color Space', desc: 'Target color space: RGB, HSV, HLS, YUV, YIQ, CMY, or CMYK.' },
      { name: 'Convert To/From', desc: 'Direction of conversion — to the target space or back to RGB.' }
    ]
  },
  {
    name: 'Gamut', abbr: 'GMT', cat: 'color',
    desc: 'Converts footage between color gamuts and transfer functions (log curves, gamma, linear). Essential for correct log-to-display or ACES pipeline transformations.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image requiring gamut conversion.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Gamut-converted image.' }],
    params: [
      { name: 'Input Gamma', desc: 'The transfer function (gamma curve) of the source image: sRGB, Rec.709, Log-C, S-Log2, etc.' },
      { name: 'Output Gamma', desc: 'Target transfer function for the output.' },
      { name: 'Input Color Space', desc: 'The primaries/gamut of the source.' },
      { name: 'Output Color Space', desc: 'The primaries/gamut of the output.' }
    ]
  },
  {
    name: 'Hue Curves', abbr: 'HCV', cat: 'color',
    desc: 'Adjusts hue, saturation, and luminance using spline curves keyed to specific hues. You can selectively boost the saturation of reds, shift the hue of greens, or darken a specific color range — all without affecting other colors.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to adjust.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Hue-curve-adjusted image.' }],
    params: [
      { name: 'Hue vs Hue', desc: 'Curve that rotates the output hue based on the input hue.' },
      { name: 'Hue vs Saturation', desc: 'Boosts or reduces saturation for specific hue ranges.' },
      { name: 'Hue vs Luminance', desc: 'Brightens or darkens specific hue ranges.' },
      { name: 'Luminance vs Saturation', desc: 'Adjusts saturation based on how bright a pixel is.' },
      { name: 'Saturation vs Saturation', desc: 'Adjusts saturation nonlinearly based on existing saturation level.' }
    ]
  },
  {
    name: 'White Balance', abbr: 'WB', cat: 'color',
    desc: 'Corrects color casts by matching the color temperature and tint of the image to a neutral reference. You can pick a sample pixel or enter values manually.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to white-balance.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'White-balanced image.' }],
    params: [
      { name: 'Color Picker', desc: 'Pick a pixel that should be neutral gray/white; the node auto-computes the correction.' },
      { name: 'Temperature', desc: 'Shift the warm/cool balance of the correction.' },
      { name: 'Tint', desc: 'Shift the green/magenta balance of the correction.' },
      { name: 'Blend', desc: 'Mix between corrected and original.' }
    ]
  },
  {
    name: 'Set Canvas Color', abbr: 'SCV', cat: 'color',
    desc: 'Sets the canvas (background) color of the image without affecting the pixels themselves. Useful for ensuring downstream nodes that sample outside the image boundaries get the correct background value.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image whose canvas color should be set.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with new canvas color metadata.' }],
    params: [
      { name: 'Canvas Color', desc: 'RGBA color value applied to the canvas outside the image domain.' }
    ]
  },

  // ─── COMPOSITE ──────────────────────────────────────────────────────
  {
    name: 'Merge', abbr: 'MRG', cat: 'composite',
    desc: 'The core compositing node in Fusion. Combines a foreground and background image using the foreground\'s alpha channel and a wide range of blending modes (Over, Screen, Multiply, Overlay, etc.). Supports additive and subtractive compositing, Z-depth merging, and has built-in transform controls to position the foreground.',
    inputs: [
      { color: 'orange', name: 'Background', desc: 'The bottom/back image layer. Its resolution determines the output resolution.' },
      { color: 'green', name: 'Foreground', desc: 'The top/front image layer, composited over the background using its alpha.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask that limits which areas of the background show the foreground merge.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'The composited result.' }],
    params: [
      { name: 'Center X/Y', desc: 'Positions the foreground image within the background frame (0.5, 0.5 = center).' },
      { name: 'Size', desc: 'Scales the foreground image before compositing.' },
      { name: 'Angle', desc: 'Rotates the foreground image before compositing.' },
      { name: 'Apply Mode', desc: 'Compositing algorithm: Normal, Screen, Dissolve, Multiply, Overlay, Soft Light, Hard Light, Color Dodge, Color Burn, Darken, Lighten, Difference, and many more.' },
      { name: 'Operator', desc: 'For Normal Apply Mode: Over (standard), In, Held Out, Atop, or XOr alpha operations.' },
      { name: 'Subtractive/Additive', desc: 'Slider blending between non-premultiplied (subtractive) and premultiplied (additive) compositing.' },
      { name: 'Alpha Gain', desc: 'Scales the foreground\'s alpha channel — controls overall opacity.' },
      { name: 'Burn In', desc: 'Burns (darkens) the background edges where the foreground composite meets them.' },
      { name: 'Blend', desc: 'Mixes the merged result with the original background.' },
      { name: 'Clamp Coverage', desc: 'Prevents the alpha from exceeding 1.0, avoiding coverage issues on premultiplied images.' }
    ]
  },
  {
    name: 'Dissolve', abbr: 'DX', cat: 'composite',
    desc: 'Mixes two images together based on a single mix value. At 0 only the background is visible; at 1 only the foreground is visible; at 0.5 they are blended equally. Commonly used for transitions between clips.',
    inputs: [
      { color: 'orange', name: 'Background', desc: 'The first image (fully visible at 0).' },
      { color: 'green', name: 'Foreground', desc: 'The second image (fully visible at 1).' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Dissolved/mixed image.' }],
    params: [
      { name: 'Background/Foreground', desc: 'Mix slider: 0 = full background, 1 = full foreground.' }
    ]
  },

  // ─── EFFECT ─────────────────────────────────────────────────────────
  {
    name: 'Duplicate', abbr: 'DUP', cat: 'effect',
    desc: 'Creates multiple copies of an image arranged in a grid, spiral, or custom pattern, with each copy optionally transformed, color-shifted, or faded. Useful for creating repeated graphic elements, patterns, or reveal animations.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to duplicate.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with all duplicated copies composited.' }],
    params: [
      { name: 'Copies', desc: 'Number of copies to create.' },
      { name: 'Transform (per copy)', desc: 'Sets position, size, and angle offsets that increment between each copy.' },
      { name: 'Color (per copy)', desc: 'Controls color shifting and fading between copies.' },
      { name: 'Region', desc: 'Restricts where copies appear (full frame, ellipse, rectangle, etc.).' }
    ]
  },
  {
    name: 'Highlight', abbr: 'HIL', cat: 'effect',
    desc: 'Adds star-shaped lens flare / diffraction spike highlights to bright areas of the image, simulating the effect of a camera aperture at small f-stops.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image whose highlights should receive spikes.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with highlight spikes.' }],
    params: [
      { name: 'Threshold', desc: 'Brightness above which highlight spikes are generated.' },
      { name: 'Length', desc: 'Length of the diffraction spikes.' },
      { name: 'Number of Spikes', desc: 'How many radial spikes emanate from each hot spot.' },
      { name: 'Angle', desc: 'Rotates all spikes.' },
      { name: 'Blend', desc: 'Mix between the highlight effect and original.' }
    ]
  },
  {
    name: 'Pseudo Color', abbr: 'PSCL', cat: 'effect',
    desc: 'Maps luminance values to false colors for diagnostic or stylistic purposes. Allows visualization of exposure (false color assist) or creating heat-map-style imagery.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to apply false-color mapping to.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'False-color-mapped image.' }],
    params: [
      { name: 'Color Gradient', desc: 'A spline that maps input luminance values (0–1) to output colors.' },
      { name: 'Source Channel', desc: 'Which channel drives the mapping (Luma, Red, Green, Blue, or Alpha).' }
    ]
  },
  {
    name: 'Rays', abbr: 'CIR', cat: 'effect',
    desc: 'Creates volumetric light ray (god ray / crepuscular ray) effects emanating from a central point — typically used to simulate sunlight streaming through clouds or around an object.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image from which rays are generated (bright areas become ray sources).' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with rays composited.' }],
    params: [
      { name: 'Center X/Y', desc: 'Origin point from which rays radiate.' },
      { name: 'Length', desc: 'How far the rays extend outward.' },
      { name: 'Strength', desc: 'Intensity / opacity of the rays.' },
      { name: 'Threshold', desc: 'Minimum brightness in the source image to generate a ray.' }
    ]
  },
  {
    name: 'Shadow', abbr: 'SH', cat: 'effect',
    desc: 'Creates a drop shadow or cast shadow from the image\'s alpha channel. The shadow can be offset, soft, colored, and distorted by a depth/shape map for more realistic shadows.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image (must have alpha) from which the shadow is cast.' },
      { color: 'teal', name: 'Shadow Map', desc: 'Optional depth image warping the shadow for perspective distortion.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with shadow composited.' }],
    params: [
      { name: 'Shadow Offset X/Y', desc: 'How far and in what direction the shadow is cast from the object.' },
      { name: 'Shadow Softness', desc: 'Blurs the shadow edge for a softer or harder look.' },
      { name: 'Shadow Color', desc: 'Color and opacity of the shadow.' },
      { name: 'Blend', desc: 'Mix between result and original.' }
    ]
  },
  {
    name: 'Trails', abbr: 'TRLS', cat: 'effect',
    desc: 'Creates motion trails by accumulating previous frames behind animated elements, producing a comet-tail or time-smear effect. Works by blending the current frame with a faded version of the previous frame.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Animated image sequence to trail.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with motion trails accumulated.' }],
    params: [
      { name: 'Decay', desc: 'How quickly previous frames fade out. High decay = short trail; low decay = long persistent trail.' },
      { name: 'Blend Mode', desc: 'How the trail is composited over the current frame.' }
    ]
  },
  {
    name: 'TV', abbr: 'TV', cat: 'effect',
    desc: 'Simulates an analog TV monitor or cathode-ray tube appearance, adding scan lines, interlacing, channel noise, color bleeding, and phosphor glow for retro broadcast aesthetics.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to apply TV simulation to.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'TV-effect image.' }],
    params: [
      { name: 'Scan Lines', desc: 'Enable/disable horizontal scan line overlay.' },
      { name: 'Scan Line Strength', desc: 'Contrast/darkness of the scan lines.' },
      { name: 'Noise', desc: 'Adds random pixel noise simulating analog signal degradation.' },
      { name: 'Bend', desc: 'Simulates CRT screen curvature distortion.' }
    ]
  },

  // ─── FILTER ─────────────────────────────────────────────────────────
  {
    name: 'Erode / Dilate', abbr: 'ErDl', cat: 'filter',
    desc: 'Grows (dilates) or shrinks (erodes) the bright/white areas of an image or matte. Morphological operators essential for matte cleanup — expanding or contracting mattes to remove fringing or fill gaps.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image or matte to erode/dilate.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Morphologically processed image.' }],
    params: [
      { name: 'Filter Size', desc: 'Radius of the erosion or dilation. Positive values dilate; negative values erode.' },
      { name: 'RGBA Channels', desc: 'Which channels to process. Commonly used on Alpha only.' }
    ]
  },
  {
    name: 'Filter', abbr: 'Fltr', cat: 'filter',
    desc: 'Applies a convolution kernel filter to the image. Includes presets for common image-processing operations like edge detection, emboss, and custom kernels you define manually.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to filter.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Filtered image.' }],
    params: [
      { name: 'Filter Type', desc: 'Preset kernel types: Edge Detect, Emboss, Smooth, Sharpen, or Custom.' },
      { name: 'Custom Kernel', desc: 'When set to Custom, allows entering a 3×3 or 5×5 convolution matrix manually.' },
      { name: 'Blend', desc: 'Mix between filtered and original.' }
    ]
  },
  {
    name: 'Rank Filter', abbr: 'RFlt', cat: 'filter',
    desc: 'Sorts pixel values in a neighborhood and outputs a specific rank (minimum, maximum, median, etc.). Excellent for noise reduction (median filter) or matte cleaning.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to rank-filter.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Rank-filtered image.' }],
    params: [
      { name: 'Rank', desc: 'Selects which rank to output: 0 = minimum (darkest), 0.5 = median, 1 = maximum (brightest).' },
      { name: 'Filter Size', desc: 'Neighborhood size in pixels examined for each output pixel.' }
    ]
  },
  {
    name: 'Create Bump Map', abbr: 'CBu', cat: 'filter',
    desc: 'Converts a grayscale (or color) height map into a normal map suitable for 3D lighting. Required for adding embossed surface detail to 3D materials in Fusion.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Grayscale height map image.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'RGB normal map image.' }],
    params: [
      { name: 'Bump Scale', desc: 'Height multiplier — how pronounced the bumps appear on the surface.' },
      { name: 'Wrap U/V', desc: 'Whether the bump map tiles seamlessly at the edges.' }
    ]
  },

  // ─── GENERATOR ──────────────────────────────────────────────────────
  {
    name: 'Background', abbr: 'Bg', cat: 'generator',
    desc: 'Generates a flat color, gradient, or checker-pattern image from scratch (no inputs). Used to create backgrounds, color fills, test patterns, or solid-color mattes.',
    inputs: [],
    outputs: [{ color: 'white', name: 'Output', desc: 'Generated background image at the composition resolution.' }],
    params: [
      { name: 'Type', desc: 'Image type: Solid Color, Horizontal/Vertical/4-corner Gradient, Radial Gradient, or Checker.' },
      { name: 'Color', desc: 'Primary color for solid or gradient.' },
      { name: 'Color 2 / 3 / 4', desc: 'Additional colors used by multi-color gradient types.' },
      { name: 'Width / Height', desc: 'Output image resolution (defaults to composition size).' }
    ]
  },
  {
    name: 'Fast Noise', abbr: 'FN', cat: 'generator',
    desc: 'Generates procedural noise textures (Perlin-style). Useful for bump maps, cloud backgrounds, animated texture distortions, and organic-looking elements. Fully animated and resolution-independent.',
    inputs: [],
    outputs: [{ color: 'white', name: 'Output', desc: 'Generated noise image.' }],
    params: [
      { name: 'Scale', desc: 'Size of the noise pattern. Larger values create bigger, coarser noise.' },
      { name: 'Detail', desc: 'Number of octaves — higher values add more fine detail at the cost of speed.' },
      { name: 'Contrast', desc: 'Pushes noise values toward black and white for more extreme results.' },
      { name: 'Brightness', desc: 'Overall brightness of the noise output.' },
      { name: 'X/Y Speed', desc: 'Animate the noise drifting horizontally or vertically over time.' },
      { name: 'Z Speed', desc: 'Animate noise evolving over time (temporal animation).' },
      { name: 'Loop', desc: 'Makes the noise animation loop seamlessly over a specified duration.' },
      { name: 'Color1 / Color2', desc: 'Colors mapped to the low and high ends of the noise pattern.' }
    ]
  },
  {
    name: 'Text+', abbr: 'TXT+', cat: 'generator',
    desc: 'Advanced 2D text generator with full layout control, character-level styling, and built-in modifiers for animation (Follower, Scramble, Timer). Supports multiple fonts, per-character transforms, and rich text formatting.',
    inputs: [],
    outputs: [{ color: 'white', name: 'Output', desc: 'Rendered text image with alpha.' }],
    params: [
      { name: 'Text Content', desc: 'The text string to render. Supports rich text markup.' },
      { name: 'Font', desc: 'Font family and style (bold, italic, etc.).' },
      { name: 'Size', desc: 'Font size in points.' },
      { name: 'Shading', desc: 'Controls fill color, texture, and multiple layered fill styles per character.' },
      { name: 'Position', desc: 'X/Y position of the text block in the frame.' },
      { name: 'Layout', desc: 'Horizontal/vertical alignment, line spacing, column layout.' },
      { name: 'Transform', desc: 'Per-character or per-word position, rotation, scale offsets.' },
      { name: 'Modifiers', desc: 'Add Follower (sequenced animation), Scramble, or Timer modifiers to animate text automatically.' }
    ]
  },
  {
    name: 'Plasma', abbr: 'PLAS', cat: 'generator',
    desc: 'Generates colorful animated plasma / interference pattern images using overlapping sine waves. Creates vivid, retro-style moving backgrounds or color mattes.',
    inputs: [],
    outputs: [{ color: 'white', name: 'Output', desc: 'Generated plasma image.' }],
    params: [
      { name: 'Scale / Frequency', desc: 'Controls the density and frequency of the plasma pattern.' },
      { name: 'Speed', desc: 'Animation rate of the plasma motion.' },
      { name: 'Colors', desc: 'Color gradient applied to the plasma pattern.' }
    ]
  },
  {
    name: 'Day Sky', abbr: 'DS', cat: 'generator',
    desc: 'Generates a physically-based sky gradient with sun position based on time-of-day, latitude, and date. Produces realistic sky colors from dawn to dusk.',
    inputs: [],
    outputs: [{ color: 'white', name: 'Output', desc: 'Generated sky image.' }],
    params: [
      { name: 'Time of Day', desc: 'Hour/minute controls for sun position in the sky.' },
      { name: 'Sun Elevation / Azimuth', desc: 'Manual override for the sun direction angle.' },
      { name: 'Turbidity', desc: 'Atmosphere haze — higher values produce hazier, warmer skies.' }
    ]
  },
  {
    name: 'Mandelbrot', abbr: 'Man', cat: 'generator',
    desc: 'Generates Mandelbrot and Julia set fractal imagery. For decorative or mathematical fractal backgrounds.',
    inputs: [],
    outputs: [{ color: 'white', name: 'Output', desc: 'Generated fractal image.' }],
    params: [
      { name: 'Center X/Y', desc: 'Zoom center location in fractal coordinate space.' },
      { name: 'Zoom', desc: 'Magnification of the fractal. Animate for infinite-zoom effect.' },
      { name: 'Iterations', desc: 'Fractal detail depth. Higher values are slower but show more detail.' },
      { name: 'Color Gradient', desc: 'Maps iteration count to output colors.' }
    ]
  },

  // ─── MASK ───────────────────────────────────────────────────────────
  {
    name: 'Bitmap Mask', abbr: 'BMP', cat: 'mask',
    desc: 'Uses an existing image from the node tree as a mask. Allows any luminance image, render pass, or Fusion output to control the transparency of another node.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to use as a bitmap mask source.' }
    ],
    outputs: [{ color: 'orange', name: 'Mask Output', desc: 'Mask signal that can be connected to any node\'s blue effect mask input.' }],
    params: [
      { name: 'Channel', desc: 'Which channel of the source image drives the mask (Luma, Red, Green, Blue, Alpha, Saturation).' },
      { name: 'Invert', desc: 'Flips black and white areas of the mask.' },
      { name: 'Threshold', desc: 'Cuts the mask to binary at a specific luminance level.' },
      { name: 'Soft Edge', desc: 'Blurs the mask edges for a softer transition.' }
    ]
  },
  {
    name: 'B-Spline Mask', abbr: 'BSP', cat: 'mask',
    desc: 'Creates a smooth, curved rotoscope mask using B-spline control points. Supports feathering, per-point animation, and motion blur on mask edges.',
    inputs: [],
    outputs: [{ color: 'orange', name: 'Mask Output', desc: 'Animated B-spline mask shape.' }],
    params: [
      { name: 'Control Points', desc: 'The animated spline points defining the mask shape.' },
      { name: 'Border Width', desc: 'Feather radius — softens the mask edge.' },
      { name: 'Invert', desc: 'Swaps inside and outside of the mask.' },
      { name: 'Motion Blur', desc: 'Adds directional blur at the mask edge based on keyframe motion.' }
    ]
  },
  {
    name: 'Ellipse Mask', abbr: 'ELP', cat: 'mask',
    desc: 'Creates an elliptical or circular mask shape. The simplest curved primitive mask, useful for vignettes, oval highlights, and circular isolations.',
    inputs: [],
    outputs: [{ color: 'orange', name: 'Mask Output', desc: 'Ellipse mask shape.' }],
    params: [
      { name: 'Center X/Y', desc: 'Center position of the ellipse.' },
      { name: 'Width / Height', desc: 'Size of the ellipse on each axis.' },
      { name: 'Angle', desc: 'Rotation of the ellipse.' },
      { name: 'Border Width', desc: 'Feather width at the mask edge.' },
      { name: 'Invert', desc: 'Flip inside/outside.' }
    ]
  },
  {
    name: 'Polygon Mask', abbr: 'PLY', cat: 'mask',
    desc: 'Creates a freehand polygonal mask shape with straight edges between control points. Useful for hard-edged roto shapes like windows, screens, or architectural elements.',
    inputs: [],
    outputs: [{ color: 'orange', name: 'Mask Output', desc: 'Polygon mask shape.' }],
    params: [
      { name: 'Control Points', desc: 'The animatable vertices defining the polygon.' },
      { name: 'Border Width', desc: 'Feather at the mask edges.' },
      { name: 'Invert', desc: 'Flip inside/outside.' }
    ]
  },
  {
    name: 'Rectangle Mask', abbr: 'REC', cat: 'mask',
    desc: 'Creates a rectangular mask with optional rounded corners. The most common primitive mask for quick isolations and crop-style effects.',
    inputs: [],
    outputs: [{ color: 'orange', name: 'Mask Output', desc: 'Rectangle mask shape.' }],
    params: [
      { name: 'Center X/Y', desc: 'Center position of the rectangle.' },
      { name: 'Width / Height', desc: 'Size of the rectangle.' },
      { name: 'Angle', desc: 'Rotation of the rectangle.' },
      { name: 'Corner Radius', desc: 'Rounds the rectangle corners.' },
      { name: 'Border Width', desc: 'Feather at the mask edges.' },
      { name: 'Invert', desc: 'Flip inside/outside.' }
    ]
  },
  {
    name: 'Wand Mask', abbr: 'WND', cat: 'mask',
    desc: 'A magic-wand style mask that selects pixels based on color similarity to a sampled reference pixel. Useful for rough color-range isolations.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to sample pixel colors from.' }
    ],
    outputs: [{ color: 'orange', name: 'Mask Output', desc: 'Color-selection mask.' }],
    params: [
      { name: 'Reference Color', desc: 'The color picked as the selection target.' },
      { name: 'Tolerance', desc: 'How different from the reference color a pixel can be and still be selected.' },
      { name: 'Soft Range', desc: 'Transition softness at the selection boundary.' }
    ]
  },
  {
    name: 'Ranges Mask', abbr: 'RNG', cat: 'mask',
    desc: 'Generates a mask based on a luminance or color range using a spline graph. Provides smooth, feathered selections based on how bright or dark pixels are.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image whose pixel values drive the mask.' }
    ],
    outputs: [{ color: 'orange', name: 'Mask Output', desc: 'Range-based mask.' }],
    params: [
      { name: 'Source Channel', desc: 'Channel that drives the range selection (Luma, Red, Green, Blue, Hue, Saturation).' },
      { name: 'Range Curve', desc: 'Spline mapping input channel values (0–1) to mask output (0–1).' }
    ]
  },

  // ─── MATTE ──────────────────────────────────────────────────────────
  {
    name: 'Delta Keyer', abbr: 'DKY', cat: 'matte',
    desc: 'The primary, most powerful keying tool in Fusion. Uses a 3D color difference approach to pull extremely clean keys from greenscreen and bluescreen footage, preserving fine hair detail and semi-transparent edges.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Greenscreen / bluescreen footage to key.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional garbage matte or hold-out matte.' }
    ],
    outputs: [
      { color: 'white', name: 'Output', desc: 'Keyed image with alpha.' },
      { color: 'green', name: 'Matte', desc: 'The extracted alpha/matte on its own for further processing.' }
    ],
    params: [
      { name: 'Clean Background', desc: 'Color picker for the screen color to be removed.' },
      { name: 'Matte Blur', desc: 'Softens the matte edge.' },
      { name: 'Matte Contrast', desc: 'Hardens or softens the semi-transparent edges of the matte.' },
      { name: 'Post Multiply Image', desc: 'Premultiplies the image by its alpha for cleaner compositing.' },
      { name: 'Spill Suppression', desc: 'Removes residual screen color from the subject edges.' },
      { name: 'Color Correction', desc: 'Re-grades the keyed foreground to better match the background.' }
    ]
  },
  {
    name: 'Chroma Keyer', abbr: 'CKY', cat: 'matte',
    desc: 'Removes a background color using hue and chroma range selection. Less sophisticated than Delta Keyer but fast and effective for clean, well-lit screens.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Screen footage to key.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional garbage matte.' }
    ],
    outputs: [
      { color: 'white', name: 'Output', desc: 'Keyed image.' },
      { color: 'green', name: 'Matte', desc: 'Extracted matte.' }
    ],
    params: [
      { name: 'Color Range', desc: 'Hue/saturation/luminance ranges selecting the screen color to remove.' },
      { name: 'Matte Blur', desc: 'Softens matte edges.' },
      { name: 'Spill Suppression', desc: 'Reduces screen-color contamination on the subject.' }
    ]
  },
  {
    name: 'Luma Keyer', abbr: 'LKY', cat: 'matte',
    desc: 'Keys out pixels based on their luminance value. Used for removing white or black backgrounds, or for extracting mattes from grayscale renders.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to key by brightness.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional garbage matte.' }
    ],
    outputs: [
      { color: 'white', name: 'Output', desc: 'Keyed image.' },
      { color: 'green', name: 'Matte', desc: 'Luminance-derived matte.' }
    ],
    params: [
      { name: 'Low / High Range', desc: 'The luminance range to be made transparent. Values outside this range stay opaque.' },
      { name: 'Low / High Soft', desc: 'Softness at the low and high ends of the keyed range.' }
    ]
  },
  {
    name: 'Matte Control', abbr: 'MAT', cat: 'matte',
    desc: 'A dedicated matte-cleanup node that provides gain, blur, erode, dilate, and threshold operations specifically on an image\'s alpha channel. Used to refine mattes produced by keyers.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Keyed image whose alpha needs cleanup.' },
      { color: 'teal', name: 'Garbage Matte', desc: 'Optional mask to cut out unwanted areas.' },
      { color: 'purple', name: 'Solid Matte', desc: 'Optional mask to force areas to full opacity.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with cleaned alpha.' }],
    params: [
      { name: 'Matte Blur', desc: 'Blurs the alpha channel to soften the edge.' },
      { name: 'Matte Gain', desc: 'Scales the alpha toward white — lifts semi-transparent areas.' },
      { name: 'Matte Gamma', desc: 'Applies a gamma curve to the alpha, affecting midtone transparency.' },
      { name: 'Matte Erode/Dilate', desc: 'Shrinks or expands the matte edge.' },
      { name: 'Matte Threshold', desc: 'Cuts the alpha to a hard edge at a luminance threshold.' }
    ]
  },
  {
    name: 'Primatte', abbr: 'Pri', cat: 'matte',
    desc: 'A professional keying system using a 3D color-space model for highly accurate green/bluescreen removal. Particularly strong on difficult footage with uneven lighting.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Screen footage to key.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional garbage matte.' }
    ],
    outputs: [
      { color: 'white', name: 'Output', desc: 'Keyed image.' },
      { color: 'green', name: 'Matte', desc: 'Extracted matte.' }
    ],
    params: [
      { name: 'Operation', desc: 'Select, Clean BG, Clean FG, Spill (+/-), Matte Sponge — each refines a different aspect of the key.' },
      { name: 'Color Picker', desc: 'Sample pixels to train the key for each operation.' },
      { name: 'Matte Blur / Erode', desc: 'Post-processing on the extracted matte.' }
    ]
  },
  {
    name: 'Ultra Keyer', abbr: 'UKY', cat: 'matte',
    desc: 'A semi-automatic keyer designed for difficult lighting conditions. Combines screen-color removal with automatic spill suppression and edge refinement for fast, high-quality keys.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Screen footage to key.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional garbage matte.' }
    ],
    outputs: [
      { color: 'white', name: 'Output', desc: 'Keyed image.' },
      { color: 'green', name: 'Matte', desc: 'Extracted matte.' }
    ],
    params: [
      { name: 'Color Range', desc: 'Selects the screen color and tolerance range.' },
      { name: 'Matte Blur', desc: 'Softens the matte edge.' },
      { name: 'Spill Suppression', desc: 'Automatically reduces screen-color contamination on the subject.' }
    ]
  },
  {
    name: 'Difference Keyer', abbr: 'DfK', cat: 'matte',
    desc: 'Generates a matte by computing the pixel difference between two images — typically a "clean plate" (background without subject) and a shot with the subject. Best for static or locked-off shots.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Footage with the subject in front of the background.' },
      { color: 'green', name: 'Clean Plate', desc: 'Background image without the subject.' }
    ],
    outputs: [
      { color: 'white', name: 'Output', desc: 'Keyed image.' },
      { color: 'green', name: 'Matte', desc: 'Difference-derived matte.' }
    ],
    params: [
      { name: 'Threshold', desc: 'Minimum pixel difference required to be classified as the subject.' },
      { name: 'Matte Blur', desc: 'Softens the difference matte.' }
    ]
  },
  {
    name: 'Alpha Divide', abbr: 'ADV', cat: 'matte',
    desc: 'Divides the RGB channels by the alpha to un-premultiply an image. Used before color corrections on premultiplied images, and paired with Alpha Multiply after, to prevent color fringing at edges.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Premultiplied (associated alpha) image to un-premultiply.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Un-premultiplied (straight alpha) image.' }],
    params: [
      { name: 'Threshold', desc: 'Minimum alpha value below which division is not applied (avoids divide-by-zero artifacts).' }
    ]
  },
  {
    name: 'Alpha Multiply', abbr: 'AML', cat: 'matte',
    desc: 'Multiplies the RGB channels by the alpha to premultiply an image. Used after color corrections on straight-alpha images to restore proper premultiplied compositing behavior.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Straight (un-premultiplied) image to premultiply.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Premultiplied image.' }],
    params: []
  },

  // ─── TRANSFORM ──────────────────────────────────────────────────────
  {
    name: 'Transform', abbr: 'XF', cat: 'transform',
    desc: 'The fundamental 2D image transform node. Provides position, rotation, scale, shear, and pivot controls for repositioning and animating images within the frame.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to transform.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Transformed image.' }],
    params: [
      { name: 'Center X/Y', desc: 'The pivot point of rotation and scale, and simultaneously the position of the image center.' },
      { name: 'Size', desc: 'Uniform scale factor for the image.' },
      { name: 'X/Y Scale', desc: 'Independent X and Y scale (stretching without the other axis).' },
      { name: 'Angle', desc: 'Rotation in degrees around the Center pivot.' },
      { name: 'Flip', desc: 'Mirror the image horizontally (X) or vertically (Y).' },
      { name: 'Edges', desc: 'How borders are handled: Canvas, Wrap, Duplicate, Mirror.' },
      { name: 'Filter Method', desc: 'Interpolation quality: Nearest (fastest), Linear, Catmull-Rom, etc.' }
    ]
  },
  {
    name: 'Resize', abbr: 'RSZ', cat: 'transform',
    desc: 'Changes the actual pixel dimensions (resolution) of the image. Unlike Scale/Transform which repositions within the existing canvas, Resize permanently alters the image size and resolution.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to resize.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Resized image at the new resolution.' }],
    params: [
      { name: 'Width / Height', desc: 'Target pixel dimensions for the output.' },
      { name: 'Lock Aspect', desc: 'Constrains the width/height ratio when adjusting one dimension.' },
      { name: 'Filter Method', desc: 'Resampling algorithm: Nearest, Linear, Bicubic, Lanczos, Mitchell, etc.' }
    ]
  },
  {
    name: 'Crop', abbr: 'CRP', cat: 'transform',
    desc: 'Reframes the canvas of the image — either cutting it down or expanding it (padding with transparent/black) — without resampling the pixels. Also used to change the "canvas" resolution for downstream compositing.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to crop.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Cropped/reframed image.' }],
    params: [
      { name: 'X Offset / Y Offset', desc: 'Shifts the crop window within the source image.' },
      { name: 'Width / Height', desc: 'Output canvas size.' },
      { name: 'Keep Centered', desc: 'Locks the crop to the center of the source image.' }
    ]
  },
  {
    name: 'Scale', abbr: 'SCL', cat: 'transform',
    desc: 'Scales the image — like Resize but operates within the existing canvas, enlarging or shrinking the image without changing the output resolution. Pixels outside the scaled image show as transparent/black.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to scale.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Scaled image within original canvas.' }],
    params: [
      { name: 'Size', desc: 'Uniform scale factor. 1 = original; 0.5 = half size; 2 = double size.' },
      { name: 'X / Y Scale', desc: 'Independent per-axis scaling for non-uniform stretch.' },
      { name: 'Filter Method', desc: 'Resampling quality.' }
    ]
  },
  {
    name: 'DVE', abbr: 'DVE', cat: 'transform',
    desc: 'Digital Video Effects — adds 3D perspective transforms including Z-axis rotation, perspective tilt, and lens-style distortion to a 2D image. Simulates the look of camera angle changes.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to apply 3D-perspective transform to.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Perspective-transformed image.' }],
    params: [
      { name: 'Rotate X/Y/Z', desc: 'Perspective rotation around each axis.' },
      { name: 'Move X/Y/Z', desc: 'Translation in 3D space (Z controls perceived depth/size).' },
      { name: 'Pivot X/Y/Z', desc: 'Center of rotation in 3D space.' },
      { name: 'Corners', desc: 'Individual corner pin controls for 4-point perspective matching.' }
    ]
  },
  {
    name: 'Letterbox', abbr: 'LBX', cat: 'transform',
    desc: 'Adds horizontal or vertical black bars to reframe footage for a different aspect ratio (e.g., converting 16:9 to 2.35:1 widescreen). Alternatively, crops to the target aspect.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to letterbox.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Letterboxed image.' }],
    params: [
      { name: 'Target Aspect', desc: 'The desired output aspect ratio.' },
      { name: 'Crop vs. Letterbox', desc: 'Fit (add bars) or Fill (crop) mode.' }
    ]
  },
  {
    name: 'Camera Shake', abbr: 'CSH', cat: 'transform',
    desc: 'Simulates handheld camera movement by applying randomized position, rotation, and zoom variations to the image over time. Good for adding organic feel to static or 3D-rendered shots.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to shake.' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Camera-shake image.' }],
    params: [
      { name: 'Translation Strength', desc: 'Amplitude of the random X/Y positional shake.' },
      { name: 'Rotation Strength', desc: 'Amplitude of the random rotational shake.' },
      { name: 'Zoom Strength', desc: 'Amplitude of the random zoom shake.' },
      { name: 'Frequency', desc: 'Rate of the shake oscillation.' },
      { name: 'Random Seed', desc: 'Different seeds produce different shake patterns.' }
    ]
  },

  // ─── I/O ────────────────────────────────────────────────────────────
  {
    name: 'MediaIn', abbr: 'MIN', cat: 'io',
    desc: 'The primary input node in DaVinci Resolve\'s Fusion page. Represents a clip from the Edit page timeline and feeds it into the Fusion composition. Automatically created when entering the Fusion page from a clip.',
    inputs: [
      { color: 'blue', name: 'Effect Mask', desc: 'Connect a mask here to create transparency in the clip (for rotoscoping). Note: this replaces, rather than restricts, the image.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'The clip image at the current frame, ready for processing.' }],
    params: [
      { name: 'Global In/Out', desc: 'Sets the active frame range of the clip within the composition.' },
      { name: 'Clip Time', desc: 'Remaps the clip\'s internal timeline (slip/retime).' },
      { name: 'Hold First/Last Frame', desc: 'Freezes the first or last frame beyond the clip boundaries.' },
      { name: 'Depth', desc: 'Bit depth override for processing (8-bit, 16-bit, 32-bit float).' }
    ]
  },
  {
    name: 'MediaOut', abbr: 'MOUT', cat: 'io',
    desc: 'The output node in DaVinci Resolve\'s Fusion page. Routes the final composited result back to the DaVinci Resolve timeline. Every Fusion composition must have a MediaOut to output its result.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'The final composited image to send back to the timeline.' }
    ],
    outputs: [],
    params: [
      { name: 'Input', desc: 'Selects which input (1 or 2) to use as the output, for transitions involving two clips.' }
    ]
  },
  {
    name: 'Loader', abbr: 'LD', cat: 'io',
    desc: 'Fusion Studio only. Loads media files directly from disk into a composition. Supports image sequences, video files, and EXR multi-part files. The Fusion Studio equivalent of MediaIn in DaVinci Resolve.',
    inputs: [],
    outputs: [{ color: 'white', name: 'Output', desc: 'The loaded media at the current frame.' }],
    params: [
      { name: 'File Path', desc: 'Path to the media file or image sequence on disk.' },
      { name: 'Global In/Out', desc: 'The frame range used from the source media.' },
      { name: 'Loop', desc: 'How the clip behaves when the composition runs past its last frame: Hold, Loop, Ping-Pong.' },
      { name: 'Color Space', desc: 'Input color space / gamma of the loaded media.' },
      { name: 'Depth', desc: 'Bit depth to load the image at.' }
    ]
  },
  {
    name: 'Saver', abbr: 'SV', cat: 'io',
    desc: 'Fusion Studio only. Writes the output of a node tree to disk as an image sequence or video file. Must be at the end of the node tree to render output.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Composited image to save to disk.' }
    ],
    outputs: [],
    params: [
      { name: 'File Path', desc: 'Output file path and format (including frame number tokens for sequences).' },
      { name: 'Format', desc: 'File format: EXR, TIFF, DPX, PNG, QuickTime, etc.' },
      { name: 'Bit Depth', desc: 'Output bit depth (8, 16, float, etc.).' },
      { name: 'Process Mode', desc: 'Controls render fields/frames behavior.' }
    ]
  },

  // ─── MISC ────────────────────────────────────────────────────────────
  {
    name: 'Tracker', abbr: 'TRK', cat: 'misc',
    desc: 'Analyzes motion in footage by tracking one or more pattern regions frame-by-frame. The resulting tracking data can stabilize footage, apply match-move transforms to other layers, or drive corner-pin distortions. Also includes a built-in Merge for quick attach-and-follow workflows.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Footage to track.' },
      { color: 'green', name: 'Foreground', desc: 'Image to attach/transform using the tracking data (built-in Merge).' },
      { color: 'blue', name: 'Effect Mask', desc: 'Optional mask.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Tracked/stabilized image output.' }],
    params: [
      { name: 'Pattern', desc: 'Size and position of each tracking search region.' },
      { name: 'Search Area', desc: 'How wide an area to search each frame for the pattern.' },
      { name: 'Operation', desc: 'What to do with the tracking data: None, Match Move, Corner Pin, Stabilize.' },
      { name: 'Reference Time', desc: 'The frame used as the "original position" reference for stabilization.' }
    ]
  },
  {
    name: 'Paint', abbr: 'PNT', cat: 'misc',
    desc: 'A frame-based paint and clone tool for retouching, wire/rig removal, and creative illustration directly on footage. Supports animated brush strokes, clone-based patch painting, and multi-stroke management.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'Image to paint on.' },
      { color: 'teal', name: 'Clone Source', desc: 'Optional alternate image to clone/sample paint strokes from.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Painted image.' }],
    params: [
      { name: 'Brush Type', desc: 'Solid, Soft (feathered), or Wire Removal brush shapes.' },
      { name: 'Brush Size', desc: 'Radius of the paint brush.' },
      { name: 'Opacity', desc: 'Transparency of each stroke.' },
      { name: 'Apply Mode', desc: 'How the paint is applied: Color, Clone, Emboss, Erase, etc.' },
      { name: 'Stroke Animation', desc: 'Write-On / Write-Off timing for animating stroke reveal.' }
    ]
  },
  {
    name: 'pRenderer3D', abbr: 'R3D', cat: 'misc',
    desc: 'Renders a 3D scene into a 2D image. Required at the end of any 3D node tree to produce a 2D output that can be composited with other 2D elements. Supports Software (CPU) and OpenGL rendering modes.',
    inputs: [
      { color: 'teal', name: 'SceneInput', desc: 'The 3D scene (from Merge3D or any 3D object node).' }
    ],
    outputs: [
      { color: 'white', name: 'Output', desc: 'Rendered 2D image.' },
      { color: 'teal', name: 'Scene', desc: 'Pass-through of the 3D scene for chaining.' }
    ],
    params: [
      { name: 'Renderer Type', desc: 'Software (CPU, supports all features) or OpenGL (GPU, faster but limited shadows).' },
      { name: 'Lighting', desc: 'Enable/disable 3D lighting calculations.' },
      { name: 'Shadows', desc: 'Enable shadow casting.' },
      { name: 'Depth of Field', desc: 'Enables camera depth-of-field blur based on camera settings.' },
      { name: 'Motion Blur', desc: 'Renders per-frame motion blur based on 3D object velocities.' }
    ]
  },
  {
    name: 'Merge 3D', abbr: 'M3D', cat: 'misc',
    desc: 'Combines multiple 3D objects, lights, and cameras into a single 3D scene. The hub of every 3D composition — all 3D elements must be connected into a Merge3D chain before passing to a Renderer3D.',
    inputs: [
      { color: 'teal', name: 'Scene Input(s)', desc: 'Any number of 3D objects, lights, cameras, or sub-scenes to merge.' }
    ],
    outputs: [{ color: 'teal', name: 'Scene', desc: 'Combined 3D scene passed to Renderer3D or another Merge3D.' }],
    params: [
      { name: 'Pass Through Lights', desc: 'Whether lights from input scenes illuminate objects in other inputs.' },
      { name: 'Pass Through Cameras', desc: 'Whether cameras from input scenes are available to the renderer.' }
    ]
  },
  {
    name: 'Copy Aux', abbr: 'CPA', cat: 'misc',
    desc: 'Copies auxiliary channel data (Z-depth, normals, motion vectors, world position, etc.) from one image into a specific channel of another. Essential for moving auxiliary render passes between node branches.',
    inputs: [
      { color: 'orange', name: 'Input', desc: 'The destination image that will receive the auxiliary data.' },
      { color: 'green', name: 'Aux Source', desc: 'The image whose auxiliary channel data is copied.' }
    ],
    outputs: [{ color: 'white', name: 'Output', desc: 'Image with the aux channel data embedded.' }],
    params: [
      { name: 'Source Channel', desc: 'Which aux channel to copy from the source (Z, Coverage, Object ID, etc.).' },
      { name: 'Destination Channel', desc: 'Which channel in the destination image receives the data.' }
    ]
  }
];

const grid = document.getElementById('grid');
const noResults = document.getElementById('no-results');
let currentFilter = 'all';
let currentSearch = '';

function catColor(cat) { return CAT_COLORS[cat] || '#888'; }

function renderGrid() {
  const filtered = NODES.filter(n => {
    const matchCat = currentFilter === 'all' || n.cat === currentFilter;
    const q = currentSearch.toLowerCase();
    const matchSearch = !q || n.name.toLowerCase().includes(q) || n.abbr.toLowerCase().includes(q) || n.cat.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  grid.innerHTML = '';
  noResults.style.display = filtered.length === 0 ? 'block' : 'none';

  filtered.forEach(n => {
    const card = document.createElement('div');
    card.className = 'node-card';
    card.dataset.cat = n.cat;
    card.dataset.id = n.name;

    const allIo = [...n.inputs, ...n.outputs];
    const ioDots = allIo.slice(0, 5).map(io => `<div class="io-dot circle" style="background:${IO_COLORS[io.color]||io.color}"></div>`).join('');

    card.innerHTML = `
      <div class="node-abbr">[${n.abbr}]</div>
      <div class="node-name">${n.name}</div>
      <div class="node-io">${ioDots}</div>
    `;
    card.addEventListener('click', () => openModal(n));
    grid.appendChild(card);
  });
}

function openModal(n) {
  const overlay = document.getElementById('overlay');
  const bar = document.getElementById('modal-bar');
  const col = catColor(n.cat);
  bar.style.background = col;
  document.getElementById('modal-abbr').textContent = `[${n.abbr}]`;
  document.getElementById('modal-title').textContent = n.name;
  document.getElementById('modal-cat').textContent = n.cat.toUpperCase() + ' NODE';
  document.getElementById('modal-desc').textContent = n.desc;

  const inputsSection = document.getElementById('inputs-section');
  const outputsSection = document.getElementById('outputs-section');
  const inputsDiv = document.getElementById('modal-inputs');
  const outputsDiv = document.getElementById('modal-outputs');

  if (n.inputs.length === 0) {
    inputsSection.style.display = 'none';
  } else {
    inputsSection.style.display = '';
    inputsDiv.innerHTML = n.inputs.map(io => `
      <div class="io-row">
        ${dotLg(io.color, true)}
        <div class="io-row-name">${io.name}</div>
        <div class="io-row-desc">${io.desc}</div>
      </div>
    `).join('');
  }

  if (n.outputs.length === 0) {
    outputsSection.style.display = 'none';
  } else {
    outputsSection.style.display = '';
    outputsDiv.innerHTML = n.outputs.map(io => `
      <div class="io-row">
        ${dotLg(io.color, true)}
        <div class="io-row-name">${io.name}</div>
        <div class="io-row-desc">${io.desc}</div>
      </div>
    `).join('');
  }

  const paramsDiv = document.getElementById('modal-params');
  const advBtn = document.getElementById('adv-btn');
  const paramsSection = document.getElementById('params-section');

  // reset advanced state
  advBtn.classList.remove('open');
  paramsSection.classList.remove('open');

  if (n.params.length === 0) {
    advBtn.style.display = 'none';
  } else {
    advBtn.style.display = 'flex';
    paramsDiv.innerHTML = n.params.map(p => `
      <div class="param-row">
        <div class="param-name">${p.name}</div>
        <div class="param-desc">${p.desc}</div>
      </div>
    `).join('');
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('overlay')) closeModal();
});

document.getElementById('adv-btn').addEventListener('click', function() {
  this.classList.toggle('open');
  document.getElementById('params-section').classList.toggle('open');
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentFilter = this.dataset.filter;
    renderGrid();
  });
});

document.getElementById('search').addEventListener('input', function() {
  currentSearch = this.value;
  renderGrid();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

renderGrid();

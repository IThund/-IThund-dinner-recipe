import { c as createAstro, d as createComponent, g as addAttribute, h as renderHead, i as renderSlot, e as renderTemplate, A as AstroError, N as NoImageMetadata, F as FailedToFetchRemoteImageDimensions, j as ExpectedImageOptions, E as ExpectedImage, k as ExpectedNotESMImage, l as InvalidImageService, n as ImageMissingAlt, m as maybeRenderHead, s as spreadAttributes } from './astro/server_ncvnUENx.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */
import '@astrojs/internal-helpers/path';
import { r as resolveSrc, i as isRemoteImage, a as isCoreRemotePath, b as isESMImportedImage, c as isLocalService, D as DEFAULT_HASH_PROPS } from './astro/assets-service_QzNt8j8a.mjs';
import * as mime from 'mrmime';

const $$Astro$2 = createAstro("https://ithund.github.io");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Quick cooking ideas for busy HK people - find recipes by cuisine, budget, time"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | Dinner Recipe HK</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-background text-text font-sans min-h-screen"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/kate/Desktop/Kate/opencode/dinner-recipe/src/layouts/Layout.astro", void 0);

function isImageMetadata(src) {
  return src.fsPath && !("fsPath" in src);
}

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4) return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize) return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box) break;
    if (box.name === boxName) return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1) return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(i);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = extractorRegExps.width.exec(root);
  const height = extractorRegExps.height.exec(root);
  const viewbox = extractorRegExps.viewbox.exec(root);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = extractorRegExps.root.exec(toUTF8String(input));
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.includes(type)) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function imageMetadata(data, src) {
  try {
    const result = lookup(data);
    if (!result.height || !result.width || !result.type) {
      throw new AstroError({
        ...NoImageMetadata,
        message: NoImageMetadata.message(src)
      });
    }
    const { width, height, type, orientation } = result;
    const isPortrait = (orientation || 0) >= 5;
    return {
      width: isPortrait ? height : width,
      height: isPortrait ? width : height,
      format: type,
      orientation
    };
  } catch {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
}

async function inferRemoteSize(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = await imageMetadata(accumulatedChunks, url);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch {
      }
    }
  }
  throw new AstroError({
    ...NoImageMetadata,
    message: NoImageMetadata.message(url)
  });
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './astro/assets-service_QzNt8j8a.mjs'
    ).then(n => n.s).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  if (isImageMetadata(options)) {
    throw new AstroError(ExpectedNotESMImage);
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src) && isCoreRemotePath(resolvedOptions.src)) {
    const result = await inferRemoteSize(resolvedOptions.src);
    resolvedOptions.width ??= result.width;
    resolvedOptions.height ??= result.height;
    delete resolvedOptions.inferSize;
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$1 = createAstro("https://ithund.github.io");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/Users/kate/Desktop/Kate/opencode/dinner-recipe/node_modules/astro/components/Image.astro", void 0);

const $$Astro = createAstro("https://ithund.github.io");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute(mime.lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/Users/kate/Desktop/Kate/opencode/dinner-recipe/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":["images.unsplash.com","images.pexels.com","plus.unsplash.com"],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const cuisines = [
  { id: "hong-kong", name: "Hong Kong", nameZh: "港式", icon: "🏙️" },
  { id: "western", name: "Western", nameZh: "西式", icon: "🍝" },
  { id: "japanese", name: "Japanese", nameZh: "日式", icon: "🍱" },
  { id: "thai", name: "Thai", nameZh: "泰式", icon: "🥘" },
  { id: "vietnamese", name: "Vietnamese", nameZh: "越式", icon: "🥖" },
  { id: "korean", name: "Korean", nameZh: "韓式", icon: "🍲" },
  { id: "taiwanese", name: "Taiwanese", nameZh: "台式", icon: "🍜" },
  { id: "chinese", name: "Chinese", nameZh: "中式", icon: "🥢" },
  { id: "indian", name: "Indian", nameZh: "印式", icon: "🫓" },
  { id: "british", name: "British", nameZh: "英式", icon: "🍖" },
  { id: "mediterranean", name: "Mediterranean", nameZh: "地中海", icon: "🫒" },
  { id: "french", name: "French", nameZh: "法式", icon: "🥐" },
  { id: "italian", name: "Italian", nameZh: "意式", icon: "🍕" }
];
const dietaryOptions = [
  { id: "diabetic-friendly", name: "Diabetic-Friendly", nameZh: "糖尿病友好" },
  { id: "low-sugar", name: "Low Sugar", nameZh: "低糖" },
  { id: "low-carb", name: "Low Carb", nameZh: "低碳水" },
  { id: "gluten-free", name: "Gluten-Free", nameZh: "無麩質" }
];
const timeOptions = [
  { id: "all", name: "All", nameZh: "全部", max: 30 },
  { id: "quick", name: "Quick", nameZh: "快手", max: 15 },
  { id: "medium", name: "Medium", nameZh: "中等", max: 30 }
];
const servingOptions = [
  { id: 1, name: "1 Person", nameZh: "1人", icon: "👤" },
  { id: 2, name: "2 People", nameZh: "2人", icon: "👥" },
  { id: 4, name: "3-4 People", nameZh: "3-4人", icon: "👨‍👩‍👧" },
  { id: 5, name: "5+ People", nameZh: "5人+", icon: "👨‍👩‍👧‍👦" }
];
function getCuisineName(id) {
  return cuisines.find((c) => c.id === id)?.name || id;
}
function getTimeLabel(minutes) {
  if (minutes <= 15) return "Quick";
  if (minutes <= 30) return "Medium";
  return `${minutes} min`;
}

const recipes = [
	{
		id: "1",
		slug: "zheng-yu",
		title: "蒸魚",
		titleEn: "Steamed Fish with Ginger",
		cuisine: "hong-kong",
		budget: 80,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1589897623340-903fb346410d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "低GI蛋白質，唔落豉油或用低鈉豉油",
		ingredients: [
			"魚肉 300g",
			"薑 3片",
			"蔥 2條",
			"鹽 少許",
			"油 1茶匙"
		],
		steps: [
			"魚肉洗淨，用鹽醃10分鐘",
			"薑片鋪係魚面",
			"水滾後大火蒸8-10分鐘",
			"撒上蔥花，淋上熱油"
		],
		tips: "Low GI protein, skip soy sauce or use low-sodium",
		nutritionHighlights: [
			"Omega-3、維他命D、蛋白質、硒",
			"薑辣素、抗氧化、助消化、驅寒",
			"維他命C、纖維、抗氧化",
			"健康脂肪，提供能量",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "2",
		slug: "fan-qie-chao-dan",
		title: "番茄炒蛋",
		titleEn: "Tomato & Egg Stir-fry",
		cuisine: "chinese",
		budget: 35,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://plus.unsplash.com/premium_photo-1700179396194-a7b88a692a3a?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "用少油；番茄係低GI食物",
		ingredients: [
			"番茄 2個",
			"蛋 3隻",
			"鹽 少許",
			"油 1湯匙"
		],
		steps: [
			"番茄切塊備用",
			"蛋打散備用",
			"少油熱鑊，先炒蛋至半熟",
			"加入番茄炒至軟身",
			"加少許鹽調味即可"
		],
		tips: "Use minimal oil; tomatoes are low GI",
		nutritionHighlights: [
			"茄紅素、維他命C、鉀，抗氧化",
			"維他命A/D/B12、膽鹼、蛋白質",
			"健康脂肪，提供能量",
			"茄紅素＋維他命D，吸收率提升",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "3",
		slug: "bo-cai-dou-fu-tang",
		title: "菠菜豆腐湯",
		titleEn: "Spinach Tofu Soup",
		cuisine: "chinese",
		budget: 25,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1719785045950-621cb0ea9d82?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "高蛋白質，非常低碳水",
		ingredients: [
			"菠菜 200g",
			"豆腐 1磚",
			"鹽 少許",
			"水 4碗"
		],
		steps: [
			"菠菜洗淨切段",
			"豆腐切小塊",
			"水滾後加入豆腐",
			"加入菠菜煮至軟身",
			"加鹽調味"
		],
		tips: "High protein, very low carb",
		nutritionHighlights: [
			"富含鐵質、維他命A/C/K、葉綠素、β-胡蘿蔔素及纖維",
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"川燙去除大部分草酸，大幅降低結石風險",
			"維他命C促進非血紅素鐵吸收",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "4",
		slug: "liang-ban-huang-gua",
		title: "涼拌黃瓜",
		titleEn: "Smashed Cucumber Salad",
		cuisine: "chinese",
		budget: 20,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1719384966291-9eb1b5005f49?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "唔使煮，低GI，清爽配菜",
		ingredients: [
			"黃瓜 2條",
			"蒜蓉 1茶匙",
			"醋 1湯匙",
			"麻油 少許"
		],
		steps: [
			"黃瓜用刀拍碎，切成小段",
			"加入少許鹽醃5分鐘",
			"倒走多餘水分",
			"加入蒜蓉、醋、麻油撈勻"
		],
		tips: "No cook, low GI, refreshing side",
		nutritionHighlights: [
			"維他命K、鉀、水分，高纖低卡",
			"大蒜素、免疫支持、心血管健康",
			"助消化、穩定血糖、促進鐵吸收",
			"芝麻油健康脂肪、維他命E、抗氧化",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "5",
		slug: "qing-chao-dou-miao",
		title: "清炒豆苗",
		titleEn: "Sautéed Pea Shoots",
		cuisine: "hong-kong",
		budget: 30,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1719784521246-a944c11b8f97?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "高纖維，用蒜代替糖",
		ingredients: [
			"豆苗 300g",
			"蒜 3瓣",
			"鹽 少許",
			"油 1湯匙"
		],
		steps: [
			"豆苗洗淨備用",
			"蒜切片",
			"熱鑊落油，加入蒜爆香",
			"加入豆苗快炒2-3分鐘",
			"加少許鹽調味即成"
		],
		tips: "High fibre, swap oyster sauce for low-sodium",
		nutritionHighlights: [
			"維他命C、纖維、蛋白質，嫩葉蔬菜",
			"大蒜素、免疫支持、心血管健康",
			"健康脂肪，提供能量",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "6",
		slug: "dong-gua-pai-gu-tang",
		title: "冬瓜排骨湯",
		titleEn: "Winter Melon Pork Rib Soup",
		cuisine: "hong-kong",
		budget: 60,
		serves: 4,
		time: 25,
		difficulty: "medium",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/36964131/pexels-photo-36964131.jpeg?_gl=1*vbr0ud*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIyNjY2JGo1NiRsMCRoMA..",
		description: "冬瓜係非常低GI既食材",
		ingredients: [
			"冬瓜 500g",
			"排骨 300g",
			"薑 3片",
			"鹽 少許"
		],
		steps: [
			"排骨洗淨，飛水備用",
			"冬瓜去皮切塊",
			"水滾加入排骨、薑片",
			"中火煲20分鐘",
			"加入冬瓜再煲15分鐘",
			"加鹽調味"
		],
		tips: "Winter melon is very low GI",
		nutritionHighlights: [
			"低熱量、鉀、利尿，清熱解暑",
			"蛋白質、膠原蛋白、鐵、鈣",
			"薑辣素、抗氧化、助消化、驅寒",
			"低熱量高纖，鉀利尿消腫",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "7",
		slug: "zheng-dan",
		title: "蒸蛋",
		titleEn: "Steamed Egg Custard",
		cuisine: "hong-kong",
		budget: 20,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/15568733/pexels-photo-15568733.jpeg?_gl=1*13spq7v*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIyNzE3JGo1JGwwJGgw",
		description: "低碳水，對血糖影響細",
		ingredients: [
			"蛋 3隻",
			"水 1杯",
			"鹽 少許",
			"蔥花 適量"
		],
		steps: [
			"蛋打散，加入水同鹽撈勻",
			"用細火蒸8-10分鐘",
			"表面凝固即可",
			"撒上蔥花"
		],
		tips: "Low carb, gentle on blood sugar",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"維他命C、纖維、抗氧化",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者",
			"無麩質，適合麩質敏感人士"
		]
	},
	{
		id: "8",
		slug: "chao-jie-lan",
		title: "炒芥蘭",
		titleEn: "Stir-fried Chinese Broccoli",
		cuisine: "hong-kong",
		budget: 25,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/7363763/pexels-photo-7363763.jpeg?_gl=1*15ivuon*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIyODA0JGozNCRsMCRoMA..",
		description: "高纖維，用蒜唔好落糖",
		ingredients: [
			"芥蘭 400g",
			"蒜 3瓣",
			"鹽 少許",
			"油 1湯匙"
		],
		steps: [
			"芥蘭洗淨切段",
			"蒜切片",
			"熱鑊落油，加入蒜爆香",
			"加入芥蘭快炒3分鐘",
			"加少許鹽調味"
		],
		tips: "High fibre, use garlic not sugar",
		nutritionHighlights: [
			"維他命K/A/C、鈣、纖維",
			"大蒜素、免疫支持、心血管健康",
			"健康脂肪，提供能量",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "9",
		slug: "dou-fu-mi-suo-tang",
		title: "豆腐味噌湯",
		titleEn: "Miso Tofu Soup",
		cuisine: "japanese",
		budget: 25,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/30682816/pexels-photo-30682816.jpeg?_gl=1*1s5ikzp*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIyODQxJGo1OSRsMCRoMA..",
		description: "選低鈉味噌，高蛋白質",
		ingredients: [
			"豆腐 1磚",
			"味噌 2湯匙",
			"水 3碗",
			"蔥花 適量"
		],
		steps: [
			"水滾加入豆腐",
			"熄火，加入味噌撈勻(切勿滾起)",
			"撒上蔥花即可"
		],
		tips: "Choose low-sodium miso, protein-rich",
		nutritionHighlights: [
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"益生菌、礦物質、酶，助消化",
			"維他命C、纖維、抗氧化",
			"蔥含維他命C，促進鐵吸收",
			"益生菌＋植物蛋白，腸道友好"
		]
	},
	{
		id: "10",
		slug: "yan-shao-ji-tui",
		title: "鹽燒雞髀",
		titleEn: "Salt-grilled Chicken Thigh",
		cuisine: "japanese",
		budget: 45,
		serves: 2,
		time: 20,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
		description: "無醃料糖分，帶皮都OK",
		ingredients: [
			"雞髀 2隻",
			"鹽 少許",
			"黑胡椒 少許",
			"油 1茶匙"
		],
		steps: [
			"雞髀洗淨，用鹽同胡椒醃10分鐘",
			"熱鑊落油，皮面朝下",
			"中火煎8分鐘至皮脆",
			"反轉再煎6分鐘",
			"切件上碟"
		],
		tips: "No marinade sugar; skin-on is fine",
		nutritionHighlights: [
			"蛋白質、維他命B6、硒，低脂肪部位",
			"胡椒鹼、抗氧化、促進鐵吸收",
			"健康脂肪，提供能量",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "11",
		slug: "bo-cao-ohitashi",
		title: "菠菜冷拌",
		titleEn: "Spinach Ohitashi",
		cuisine: "japanese",
		budget: 20,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/8897412/pexels-photo-8897412.jpeg?_gl=1*nc3ae8*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzMDAwJGoyMSRsMCRoMA..",
		description: "灼菠菜配出汁，非常低碳水",
		ingredients: [
			"菠菜 200g",
			"出汁 50ml",
			"醬油 1茶匙"
		],
		steps: [
			"菠菜洗淨，水滾灼1分鐘",
			"撈起過冷河",
			"擠乾水分，切成小段",
			"混合出汁同醬油",
			"淋上菠菜即可"
		],
		tips: "Blanched spinach with dashi, very low carb",
		nutritionHighlights: [
			"富含鐵質、維他命A/C/K、葉綠素、β-胡蘿蔔素及纖維",
			"昆布＋魚乾，碘、鮮味氨基酸",
			"氨基酸、鐵，少鈉更佳",
			"維他命C促進非血紅素鐵吸收",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "12",
		slug: "shirataki-chao",
		title: "蒟蒻麵炒",
		titleEn: "Shirataki Noodle Stir-fry",
		cuisine: "japanese",
		budget: 30,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop",
		description: "近乎零碳水既麵條替代品",
		ingredients: [
			"蒟蒻麵 200g",
			"蔬菜 100g",
			"醬油 1湯匙",
			"蒜 1瓣"
		],
		steps: [
			"蒟蒻麵洗淨，飛水備用",
			"熱鑊落油，加入蒜爆香",
			"加入蔬菜炒至軟身",
			"加入蒟蒻麵快炒2分鐘",
			"加入醬油調味"
		],
		tips: "Near-zero carb noodle substitute",
		nutritionHighlights: [
			"零卡路里、高纖維，飽腹感强",
			"多元維他命、纖維，抗氧化",
			"氨基酸、鐵，少鈉更佳",
			"大蒜素、免疫支持、心血管健康",
			"蒜有助提升免疫力"
		]
	},
	{
		id: "13",
		slug: "qing-gua-su-no-mono",
		title: "黃瓜醋拌",
		titleEn: "Cucumber Sunomono",
		cuisine: "japanese",
		budget: 20,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1740797922467-1fcdeecd7d9c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "低GI，醬汁唔好落太多糖",
		ingredients: [
			"青瓜 1條",
			"醋 2湯匙",
			"醬油 1茶匙",
			"代糖 1茶匙"
		],
		steps: [
			"青瓜切薄片",
			"加入少許鹽醃5分鐘",
			"倒走水分",
			"混合醋、醬油、代糖",
			"淋上青瓜即可"
		],
		tips: "Low GI, limit sugar in dressing",
		nutritionHighlights: [
			"維他命K、鉀、水分，高纖低卡",
			"助消化、穩定血糖、促進鐵吸收",
			"氨基酸、鐵，少鈉更佳",
			"不影響血糖，適合糖尿病患者",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "14",
		slug: "bao-yu-muni-er",
		title: "煎鮭魚",
		titleEn: "Pan-fried Salmon",
		cuisine: "japanese",
		budget: 70,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
		description: "含豐富奧米加3，零碳水",
		ingredients: [
			"三文魚 2塊",
			"鹽 少許",
			"胡椒 少許",
			"油 1湯匙"
		],
		steps: [
			"三文魚洗淨，用鹽同胡椒醃5分鐘",
			"熱鑊落油，皮面朝下",
			"中火煎4分鐘至皮脆",
			"反轉再煎2分鐘",
			"擠少許檸檬汁即可"
		],
		tips: "Rich in omega-3, zero carbs",
		nutritionHighlights: [
			"Omega-3、維他命D、蛋白質、硒，保護心血管",
			"胡椒鹼、抗氧化、促進鐵吸收",
			"健康脂肪，提供能量",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "15",
		slug: "dou-fu-sute-ki",
		title: "豆腐煎排",
		titleEn: "Tofu Steak",
		cuisine: "japanese",
		budget: 25,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
		description: "高蛋白質，硬豆腐較易煎",
		ingredients: [
			"硬豆腐 1磚",
			"醬油 1湯匙",
			"味醂 1茶匙",
			"油 1湯匙"
		],
		steps: [
			"豆腐切厚件，吸乾水分",
			"熱鑊落油，兩面煎至金黃",
			"混合醬油同味醂",
			"淋上豆腐"
		],
		tips: "High protein, firm tofu keeps shape",
		nutritionHighlights: [
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"氨基酸、鐵，少鈉更佳",
			"氨基酸、甜味，少糖",
			"健康脂肪，提供能量",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "16",
		slug: "leng-dou-fu",
		title: "冷豆腐",
		titleEn: "Cold Tofu with Soy & Sesame",
		cuisine: "korean",
		budget: 20,
		serves: 2,
		time: 5,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/9356997/pexels-photo-9356997.jpeg?_gl=1*gkagb0*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzMjE3JGozNSRsMCRoMA..",
		description: "唔使煮，低碳水，充滿蛋白質",
		ingredients: [
			"豆腐 1磚",
			"醬油 1湯匙",
			"芝麻油 1茶匙",
			"芝麻 1茶匙"
		],
		steps: [
			"豆腐切件",
			"混合醬油同芝麻油",
			"淋上豆腐",
			"撒上芝麻"
		],
		tips: "No-cook, low carb, filling protein",
		nutritionHighlights: [
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"氨基酸、鐵，少鈉更佳",
			"芝麻油健康脂肪、維他命E、抗氧化",
			"鈣、鐵、健康脂肪、芝麻素",
			"芝麻油脂有助脂溶性維他命吸收"
		]
	},
	{
		id: "17",
		slug: "shi-geum-ji-na-mul",
		title: "菠菜拌菜",
		titleEn: "Spinach Namul",
		cuisine: "korean",
		budget: 20,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/8827802/pexels-photo-8827802.jpeg?_gl=1*1ic19wf*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzMjczJGo1MiRsMCRoMA..",
		description: "調味菠菜，用少油",
		ingredients: [
			"菠菜 200g",
			"蒜蓉 1茶匙",
			"芝麻油 1茶匙",
			"醬油 1茶匙"
		],
		steps: [
			"菠菜洗淨，水滾灼1分鐘",
			"撈起過冷河",
			"擠乾水分",
			"加入蒜蓉、醬油、芝麻油撈勻",
			"撒上芝麻"
		],
		tips: "Seasoned spinach, minimal oil",
		nutritionHighlights: [
			"富含鐵質、維他命A/C/K、葉綠素、β-胡蘿蔔素及纖維",
			"大蒜素、免疫支持、心血管健康",
			"芝麻油健康脂肪、維他命E、抗氧化",
			"氨基酸、鐵，少鈉更佳",
			"維他命C促進非血紅素鐵吸收"
		]
	},
	{
		id: "18",
		slug: "gye-ran-guk",
		title: "蛋湯",
		titleEn: "Egg Drop Soup",
		cuisine: "korean",
		budget: 20,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/6646159/pexels-photo-6646159.jpeg?_gl=1*16pxzfl*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzMzIzJGoyJGwwJGgw",
		description: "清湯底，高蛋白質，低GI",
		ingredients: [
			"蛋 2隻",
			"水 3碗",
			"鹽 少許",
			"蔥花 適量"
		],
		steps: [
			"水滾後加少許鹽",
			"打散蛋，慢慢倒入滾水",
			"用筷子輕輕搞動",
			"熄火，撒上蔥花同麻油"
		],
		tips: "Light broth, high protein, low GI",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"維他命C、纖維、抗氧化",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者",
			"無麩質，適合麩質敏感人士"
		]
	},
	{
		id: "19",
		slug: "dou-bu-jo-rim",
		title: "辣豆腐燉",
		titleEn: "Braised Spicy Tofu",
		cuisine: "korean",
		budget: 30,
		serves: 2,
		time: 20,
		difficulty: "medium",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/34618075/pexels-photo-34618075.jpeg?_gl=1*1qj3fsy*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzMzYzJGoyOSRsMCRoMA..",
		description: "用辣椒粉代替辣醬，減少糖分",
		ingredients: [
			"豆腐 1磚",
			"辣椒粉 1湯匙",
			"醬油 1湯匙",
			"蒜蓉 1茶匙"
		],
		steps: [
			"豆腐切塊",
			"熱鑊落油，加入蒜蓉爆香",
			"加入豆腐煎至兩面金黃",
			"加入辣椒粉同醬油",
			"加入少許水，燜5分鐘"
		],
		tips: "Use gochugaru not gochujang to reduce sugar",
		nutritionHighlights: [
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"維他命C、辣椒素、促進新陳代謝",
			"氨基酸、鐵，少鈉更佳",
			"大蒜素、免疫支持、心血管健康",
			"蒜有助提升免疫力，蛋白質互補"
		]
	},
	{
		id: "20",
		slug: "o-i-mu-chim",
		title: "辣黃瓜拌",
		titleEn: "Spicy Cucumber Salad",
		cuisine: "korean",
		budget: 20,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/27588101/pexels-photo-27588101.jpeg?_gl=1*zhibdy*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzNDA4JGo0NyRsMCRoMA..",
		description: "唔使煮，非常低GI",
		ingredients: [
			"青瓜 1條",
			"辣椒粉 1茶匙",
			"醬油 1茶匙",
			"醋 1茶匙"
		],
		steps: [
			"青瓜切塊",
			"加入辣椒粉、醬油、醋撈勻",
			"撒上芝麻",
			"雪凍更佳"
		],
		tips: "No-cook, very low GI",
		nutritionHighlights: [
			"維他命K、鉀、水分，高纖低卡",
			"維他命C、辣椒素、促進新陳代謝",
			"氨基酸、鐵，少鈉更佳",
			"助消化、穩定血糖、促進鐵吸收",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "21",
		slug: "doen-jang-jji-gae",
		title: "豆瓣醬鍋",
		titleEn: "Doenjang Jjigae",
		cuisine: "korean",
		budget: 40,
		serves: 2,
		time: 25,
		difficulty: "medium",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/20943933/pexels-photo-20943933.jpeg?_gl=1*1m2zqmq*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzNDQ3JGo4JGwwJGgw",
		description: "發酵豆瓣醬係低GI；唔好加年糕",
		ingredients: [
			"大醬 2湯匙",
			"豆腐 1磚",
			"蔬菜 100g",
			"水 3碗"
		],
		steps: [
			"水滾加入大醬搞勻",
			"加入豆腐同蔬菜",
			"中火煲15分鐘",
			"加入蒜蓉"
		],
		tips: "Fermented soy is low GI; skip rice cake",
		nutritionHighlights: [
			"益生菌、蛋白質、礦物質",
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"多元維他命、纖維，抗氧化",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "22",
		slug: "kong-na-mul-guk",
		title: "豆芽湯",
		titleEn: "Soybean Sprout Soup",
		cuisine: "korean",
		budget: 25,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/37193497/pexels-photo-37193497.jpeg?_gl=1*1r9xygx*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzNDcyJGo1MiRsMCRoMA..",
		description: "高纖維，非常低碳水",
		ingredients: [
			"豆芽 300g",
			"水 3碗",
			"鹽 少許",
			"蒜 1瓣"
		],
		steps: [
			"豆芽洗淨備用",
			"水滾加入蒜蓉",
			"加入豆芽煮5分鐘",
			"加鹽調味",
			"撒上蔥花"
		],
		tips: "High fibre, very low carb",
		nutritionHighlights: [
			"維他命C、纖維、蛋白質",
			"大蒜素、免疫支持、心血管健康",
			"蒜助提升免疫力，豆芽高纖",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "23",
		slug: "thai-mixed-veggie",
		title: "泰式混合蔬菜炒",
		titleEn: "Thai Mixed Veggie Stir-fry",
		cuisine: "thai",
		budget: 40,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/37073152/pexels-photo-37073152.jpeg?_gl=1*tj3odg*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzNTAwJGoyNCRsMCRoMA..",
		description: "用魚露代替甜豉油",
		ingredients: [
			"混合蔬菜 300g",
			"魚露 1湯匙",
			"蒜 2瓣",
			"油 1湯匙"
		],
		steps: [
			"蔬菜洗淨切段",
			"熱鑊落油，加入蒜爆香",
			"加入蔬菜快炒3分鐘",
			"加入魚露調味"
		],
		tips: "Use fish sauce not sweet soy",
		nutritionHighlights: [
			"多元維他命、纖維，抗氧化",
			"蛋白質、碘、礦物質，少鹽更佳",
			"大蒜素、免疫支持、心血管健康",
			"健康脂肪，提供能量",
			"蒜有助提升免疫力"
		]
	},
	{
		id: "24",
		slug: "thai-tofu-clear-soup",
		title: "泰式清湯豆腐",
		titleEn: "Thai Clear Tofu Soup",
		cuisine: "thai",
		budget: 30,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/35049882/pexels-photo-35049882.jpeg?_gl=1*818xyc*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzNTM1JGo1MCRsMCRoMA..",
		description: "清湯底，無麵條，低GI",
		ingredients: [
			"豆腐 1磚",
			"蔬菜 100g",
			"水 3碗",
			"魚露 1茶匙"
		],
		steps: [
			"水滾加入切丁豆腐",
			"加入蔬菜煮5分鐘",
			"加入魚露調味",
			"撒上蔥花"
		],
		tips: "Light broth, no noodles = low GI",
		nutritionHighlights: [
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"多元維他命、纖維，抗氧化",
			"蛋白質、碘、礦物質，少鹽更佳",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "25",
		slug: "wing-bean-salad",
		title: "泰式豆沙拌",
		titleEn: "Wing Bean Salad",
		cuisine: "thai",
		budget: 35,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/37090666/pexels-photo-37090666.jpeg?_gl=1*17ejb34*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzNjAyJGo0MyRsMCRoMA..",
		description: "高蛋白質豆類，新鮮香草",
		ingredients: [
			"四季豆 200g",
			"番茄 1個",
			"魚露 1湯匙",
			"檸檬汁 1湯匙"
		],
		steps: [
			"四季豆切段，飛水備用",
			"番茄切件",
			"混合魚露同檸檬汁",
			"撈勻所有材料"
		],
		tips: "High protein legume, fresh herbs",
		nutritionHighlights: [
			"纖維、蛋白質、維他命K",
			"茄紅素、維他命C、鉀，抗氧化",
			"蛋白質、碘、礦物質，少鹽更佳",
			"維他命C、促進鐵吸收",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "26",
		slug: "ginger-fish",
		title: "泰式薑魚炒",
		titleEn: "Ginger Fish Stir-fry",
		cuisine: "thai",
		budget: 50,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/37090675/pexels-photo-37090675.jpeg?_gl=1*byafi1*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzNjM5JGo2JGwwJGgw",
		description: "瘦蛋白質，薑可改善胰島素敏感度",
		ingredients: [
			"魚肉 300g",
			"薑 3片",
			"蒜 2瓣",
			"魚露 1湯匙"
		],
		steps: [
			"魚肉切塊，用少許鹽醃",
			"熱鑊落油，加入薑蒜爆香",
			"加入魚肉煎至金黃",
			"加入魚露調味"
		],
		tips: "Lean protein, fresh ginger improves insulin sensitivity",
		nutritionHighlights: [
			"Omega-3、維他命D、蛋白質、硒",
			"薑辣素、抗氧化、助消化、驅寒",
			"大蒜素、免疫支持、心血管健康",
			"蛋白質、碘、礦物質，少鹽更佳",
			"薑蒜有助去腥、抗炎、提升免疫"
		]
	},
	{
		id: "27",
		slug: "thai-steamed-egg",
		title: "泰式蒸蛋",
		titleEn: "Thai Steamed Egg",
		cuisine: "thai",
		budget: 25,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/36964133/pexels-photo-36964133.jpeg?_gl=1*1t60wk0*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzNzE3JGo3JGwwJGgw",
		description: "類似蒸蛋，低碳水",
		ingredients: [
			"蛋 3隻",
			"水 1/2杯",
			"魚露 1茶匙"
		],
		steps: [
			"蛋打散，加入水同魚露",
			"倒入蒸碗",
			"大火蒸8-10分鐘"
		],
		tips: "Similar to chawanmushi, low carb",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"蛋白質、碘、礦物質，少鹽更佳",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者",
			"無麩質，適合麩質敏感人士"
		]
	},
	{
		id: "28",
		slug: "thai-clear-veggie-soup",
		title: "泰式清蔬湯",
		titleEn: "Clear Veggie Soup",
		cuisine: "thai",
		budget: 30,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1662655552348-4ad26f9d4e75?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "無椰奶，非常低脂肪同GI",
		ingredients: [
			"混合蔬菜 200g",
			"豆腐 1磚",
			"水 3碗",
			"魚露 1茶匙"
		],
		steps: [
			"水滾加入蔬菜",
			"加入切丁豆腐",
			"煮5分鐘",
			"加入魚露調味"
		],
		tips: "No coconut milk = very low fat & GI",
		nutritionHighlights: [
			"多元維他命、纖維，抗氧化",
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"蛋白質、碘、礦物質，少鹽更佳",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "29",
		slug: "mushroom-yum",
		title: "泰式蘑菇沙律",
		titleEn: "Mushroom Salad",
		cuisine: "thai",
		budget: 35,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1645066804320-b85e54b4339d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "低GI，高纖維蘑菇",
		ingredients: [
			"蘑菇 200g",
			"番茄 1個",
			"洋蔥 1/2個",
			"魚露 1湯匙"
		],
		steps: [
			"蘑菇切片",
			"番茄切件",
			"洋蔥切絲",
			"混合魚露同檸檬汁",
			"撈勻所有材料"
		],
		tips: "Low GI, high fibre mushrooms",
		nutritionHighlights: [
			"維他命D、硒、免疫支持",
			"茄紅素、維他命C、鉀，抗氧化",
			"槲皮素、抗氧化、維他命C",
			"蛋白質、碘、礦物質，少鹽更佳",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "30",
		slug: "canh-chua-chay",
		title: "越式酸菜素湯",
		titleEn: "Veg Sour Soup",
		cuisine: "vietnamese",
		budget: 35,
		serves: 4,
		time: 20,
		difficulty: "medium",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/17559227/pexels-photo-17559227.jpeg?_gl=1*1w1mque*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODIzODUwJGo0MSRsMCRoMA..",
		description: "羅望子湯，唔好加糖",
		ingredients: [
			"蔬菜 200g",
			"豆腐 1磚",
			"羅望子醬 1湯匙",
			"水 4碗"
		],
		steps: [
			"水滾加入羅望子醬",
			"加入豆腐同蔬菜",
			"煮10分鐘",
			"加入魚露",
			"撒上香菜"
		],
		tips: "Tamarind broth, skip added sugar",
		nutritionHighlights: [
			"多元維他命、纖維，抗氧化",
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"纖維、抗氧化、助消化",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "31",
		slug: "dau-phu-sot-ca-chua",
		title: "越式番茄豆腐",
		titleEn: "Tofu Tomato",
		cuisine: "vietnamese",
		budget: 30,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
		description: "番茄係低GI，醬汁輕盈",
		ingredients: [
			"豆腐 1磚",
			"番茄 2個",
			"蒜 2瓣",
			"魚露 1湯匙"
		],
		steps: [
			"豆腐切塊煎至金黃",
			"加入蒜蓉炒香",
			"加入番茄炒至軟身",
			"加入少許水燜2分鐘",
			"加入魚露調味"
		],
		tips: "Tomato is low GI, light sauce",
		nutritionHighlights: [
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"茄紅素、維他命C、鉀，抗氧化",
			"大蒜素、免疫支持、心血管健康",
			"蛋白質、碘、礦物質，少鹽更佳",
			"茄紅素＋大蒜素，抗氧化加强"
		]
	},
	{
		id: "32",
		slug: "goi-bap-cai",
		title: "越式高麗菜沙律",
		titleEn: "Cabbage Salad",
		cuisine: "vietnamese",
		budget: 25,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/3985872/pexels-photo-3985872.jpeg?_gl=1*x0eryj*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI1NDQ2JGoyNyRsMCRoMA..",
		description: "唔使煮，高纖維，青檸汁醬汁",
		ingredients: [
			"椰菜 200g",
			"紅蘿蔔 1條",
			"青檸汁 2湯匙",
			"魚露 1湯匙"
		],
		steps: [
			"椰菜切絲",
			"紅蘿蔔刨絲",
			"混合青檸汁同魚露",
			"撈勻所有材料",
			"雪凍更佳"
		],
		tips: "No-cook, high fibre, lime dressing",
		nutritionHighlights: [
			"維他命C/K、纖維、蘿蔔硫素",
			"β-胡蘿蔔素、維他命A、纖維",
			"維他命C、促進鐵吸收、清爽開胃",
			"蛋白質、碘、礦物質，少鹽更佳",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "33",
		slug: "trung-hap",
		title: "越式香草蒸蛋",
		titleEn: "Steamed Egg with Herbs",
		cuisine: "vietnamese",
		budget: 20,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1630992930180-6c3beb8710fc?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "低碳水，加蒔蘿更香",
		ingredients: [
			"蛋 3隻",
			"水 1/2杯",
			"鹽 少許",
			"蒔蘿 適量"
		],
		steps: [
			"蛋打散，加入水同鹽",
			"加入切碎蒔蘿",
			"倒入蒸碗",
			"大火蒸8-10分鐘"
		],
		tips: "Low carb, fragrant with dill",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"維他命A/C、鐵、錳",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者",
			"無麩質，適合麩質敏感人士"
		]
	},
	{
		id: "34",
		slug: "canh-rau-muong",
		title: "越式蕹菜湯",
		titleEn: "Morning Glory Soup",
		cuisine: "vietnamese",
		budget: 20,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/36796685/pexels-photo-36796685.jpeg?_gl=1*16fo6az*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI1MDExJGo1NSRsMCRoMA..",
		description: "綠葉蔬菜，非常低GI",
		ingredients: [
			"通菜 200g",
			"水 3碗",
			"蒜蓉 1茶匙",
			"魚露 1茶匙"
		],
		steps: [
			"通菜洗淨切段",
			"水滾加入蒜蓉",
			"加入通菜煮3分鐘",
			"加入魚露調味"
		],
		tips: "Leafy green, very low GI",
		nutritionHighlights: [
			"維他命A/C、纖維、清熱利尿",
			"大蒜素、免疫支持、心血管健康",
			"蛋白質、碘、礦物質，少鹽更佳",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "35",
		slug: "bo-xao-rau-can",
		title: "越式牛肉芹菜炒",
		titleEn: "Beef & Celery Stir-fry",
		cuisine: "vietnamese",
		budget: 50,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/15840965/pexels-photo-15840965.jpeg?_gl=1*1leuab7*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI1MzgwJGo0JGwwJGgw",
		description: "瘦牛肉，高纖維芹菜",
		ingredients: [
			"牛肉 200g",
			"芹菜 200g",
			"蒜 2瓣",
			"魚露 1湯匙"
		],
		steps: [
			"牛肉切薄片，用少許醃料醃",
			"芹菜切段",
			"熱鑊落油，加入蒜爆香",
			"加入牛肉炒至變色",
			"加入芹菜快炒2分鐘",
			"加入魚露調味"
		],
		tips: "Lean beef, high fibre celery",
		nutritionHighlights: [
			"血紅素鐵、維他命B12、鋅、蛋白質",
			"維他命K、鉀、抗氧化，助降血壓",
			"大蒜素、免疫支持、心血管健康",
			"蛋白質、碘、礦物質，少鹽更佳",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "36",
		slug: "goi-ngo-sen",
		title: "越式蓮根沙律",
		titleEn: "Lotus Root Salad",
		cuisine: "vietnamese",
		budget: 30,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb"
		],
		image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
		description: "中等GI；用醋醬汁",
		ingredients: [
			"蓮藕 200g",
			"紅蘿蔔 1條",
			"醋 2湯匙",
			"魚露 1湯匙"
		],
		steps: [
			"蓮藕切片，飛水備用",
			"紅蘿蔔刨絲",
			"混合醋同魚露",
			"撈勻所有材料",
			"撒上香菜"
		],
		tips: "Moderate GI; use vinegar dressing",
		nutritionHighlights: [
			"鐵、纖維、維他命C，活血養顔",
			"β-胡蘿蔔素、維他命A、纖維",
			"助消化、穩定血糖、促進鐵吸收",
			"蛋白質、碘、礦物質，少鹽更佳",
			"鐵質豐富，纖維助腸道健康"
		]
	},
	{
		id: "37",
		slug: "san-bei-dou-fu",
		title: "三杯豆腐",
		titleEn: "Three-cup Tofu",
		cuisine: "taiwanese",
		budget: 35,
		serves: 2,
		time: 20,
		difficulty: "medium",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/36120987/pexels-photo-36120987.jpeg?_gl=1*1mpxpc6*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI1MjEwJGo1NCRsMCRoMA..",
		description: "減少麻油同埋唔好落糖",
		ingredients: [
			"豆腐 1磚",
			"麻油 1茶匙",
			"醬油 1湯匙",
			"蒜 3瓣",
			"九層塔 適量"
		],
		steps: [
			"豆腐切塊",
			"熱鑊落油，加入薑蒜爆香",
			"加入豆腐煎至金黃",
			"加入醬油同少許水",
			"加入九層塔，快手炒勻"
		],
		tips: "Halve sesame oil & skip sugar",
		nutritionHighlights: [
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"芝麻油健康脂肪、維他命E、抗氧化",
			"氨基酸、鐵，少鈉更佳",
			"大蒜素、免疫支持、心血管健康",
			"維他命K、抗氧化、芳香"
		]
	},
	{
		id: "38",
		slug: "ga-li-si-gua",
		title: "蛤蠣絲瓜",
		titleEn: "Clam & Luffa Soup",
		cuisine: "taiwanese",
		budget: 45,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/27039868/pexels-photo-27039868.jpeg?_gl=1*1pohoyw*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI0MDk4JGo0NCRsMCRoMA..",
		description: "高蛋白質，非常低碳水",
		ingredients: [
			"蛤蠣 200g",
			"絲瓜 1條",
			"薑 2片",
			"鹽 少許"
		],
		steps: [
			"蛤蠣洗淨備用",
			"絲瓜去皮切塊",
			"水滾加入薑片",
			"加入絲瓜煮5分鐘",
			"加入蛤蠣至開口",
			"加鹽調味"
		],
		tips: "High protein, very low carb",
		nutritionHighlights: [
			"鐵、維他命B12、鋅，礦物質丰富",
			"維他命B/C、纖維、水分",
			"薑辣素、抗氧化、助消化、驅寒",
			"鐵、B12、鋅，造血礦物質三合一",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "39",
		slug: "lu-dan",
		title: "滷蛋",
		titleEn: "Braised Soy Eggs",
		cuisine: "taiwanese",
		budget: 25,
		serves: 2,
		time: 20,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/32980754/pexels-photo-32980754.jpeg?_gl=1*wmw8cn*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI0MTUzJGo1MiRsMCRoMA..",
		description: "用低鈉醬油，優質蛋白質小食",
		ingredients: [
			"蛋 4隻",
			"醬油 2湯匙",
			"水 1杯",
			"八角 1粒"
		],
		steps: [
			"蛋煮熟，去殼",
			"用醬油、水、八角煮滾",
			"加入蛋，中火煮10分鐘",
			"熄火，焗30分鐘"
		],
		tips: "Use low-sodium soy, good protein snack",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"氨基酸、鐵，少鈉更佳",
			"草莽酸、抗氧化、香氣芬芳",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "40",
		slug: "liang-ban-dou-fu",
		title: "涼拌豆腐",
		titleEn: "Cold Tofu with Century Egg",
		cuisine: "taiwanese",
		budget: 30,
		serves: 2,
		time: 5,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
		description: "唔使煮，豐富蛋白質",
		ingredients: [
			"豆腐 1磚",
			"皮蛋 1隻",
			"醬油 1湯匙",
			"麻油 1茶匙"
		],
		steps: [
			"豆腐切件",
			"皮蛋切件",
			"放係豆腐面",
			"淋上醬油同麻油"
		],
		tips: "No-cook, rich protein",
		nutritionHighlights: [
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"蛋白質、鐵、維他命B12",
			"氨基酸、鐵，少鈉更佳",
			"芝麻油健康脂肪、維他命E、抗氧化",
			"鐵質較一般蛋高，蛋白質豐富"
		]
	},
	{
		id: "41",
		slug: "chao-qing-jiang-cai",
		title: "炒青江菜",
		titleEn: "Bok Choy Stir-fry",
		cuisine: "taiwanese",
		budget: 25,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1741243413081-999c4b1a80ab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "非常低GI，富含葉酸",
		ingredients: [
			"青江菜 300g",
			"蒜 2瓣",
			"鹽 少許",
			"油 1湯匙"
		],
		steps: [
			"青江菜洗淨切段",
			"蒜切片",
			"熱鑊落油，加入蒜爆香",
			"加入青江菜快炒2分鐘",
			"加鹽調味"
		],
		tips: "Very low GI, high in folate",
		nutritionHighlights: [
			"維他命A/C/K、鈣、纖維",
			"大蒜素、免疫支持、心血管健康",
			"健康脂肪，提供能量",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "42",
		slug: "zheng-nan-gua",
		title: "蒸南瓜",
		titleEn: "Steamed Pumpkin",
		cuisine: "taiwanese",
		budget: 25,
		serves: 2,
		time: 20,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly"
		],
		image: "https://images.pexels.com/photos/5612346/pexels-photo-5612346.jpeg?_gl=1*14vkhpg*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI1MzI0JGo2MCRsMCRoMA..",
		description: "中等GI；要注意分量",
		ingredients: [
			"南瓜 300g",
			"鹽 少許",
			"油 1茶匙"
		],
		steps: [
			"南瓜去皮切片",
			"蒸10-15分鐘至軟身",
			"加少許鹽",
			"淋上熱油"
		],
		tips: "Medium GI — watch portion size",
		nutritionHighlights: [
			"β-胡蘿蔔素、維他命A、鉀、纖維",
			"健康脂肪，提供能量",
			"β-胡蘿蔔素護眼，維他命C增強免疫",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "43",
		slug: "jiao-bai-sun-chao-rou-si",
		title: "筊白筍炒肉絲",
		titleEn: "Water Bamboo & Pork",
		cuisine: "taiwanese",
		budget: 45,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/724291/pexels-photo-724291.jpeg?_gl=1*da9ijh*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI0NzI5JGoyMiRsMCRoMA..",
		description: "筊白筍係低GI，高纖維",
		ingredients: [
			"筊白筍 200g",
			"豬肉 150g",
			"醬油 1湯匙",
			"蒜 2瓣"
		],
		steps: [
			"筊白筍切絲",
			"豬肉切絲，用少許醬油醃",
			"熱鑊落油，加入蒜爆香",
			"加入豬肉炒至變色",
			"加入筊白筍快炒3分鐘",
			"加入醬油調味"
		],
		tips: "Water bamboo is low GI, high fibre",
		nutritionHighlights: [
			"纖維、鉀、低熱量",
			"蛋白質、維他命B1、鋅",
			"氨基酸、鐵，少鈉更佳",
			"大蒜素、免疫支持、心血管健康",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "44",
		slug: "saba-mi-sou-ni",
		title: "鯖魚味噌煮",
		titleEn: "Miso Mackerel",
		cuisine: "japanese",
		budget: 50,
		serves: 2,
		time: 20,
		difficulty: "medium",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/20802562/pexels-photo-20802562.jpeg?_gl=1*s1acvq*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI0NjkxJGo2MCRsMCRoMA..",
		description: "含豐富奧米加3，用低鈉味噌",
		ingredients: [
			"鯖魚 2塊",
			"味噌 2湯匙",
			"水 1/2杯",
			"薑 2片"
		],
		steps: [
			"鯖魚洗淨備用",
			"混合味噌、水、代糖",
			"熱鑊加入魚，兩面煎至金黃",
			"加入味噌汁同薑",
			"中火煮5分鐘至汁濃"
		],
		tips: "Omega-3 rich, use low-sodium miso",
		nutritionHighlights: [
			"Omega-3、維他命D、蛋白質，預防心血管疾病",
			"益生菌、礦物質、酶，助消化",
			"薑辣素、抗氧化、助消化、驅寒",
			"Omega-3 EPA/DHA，心腦血管守護",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "45",
		slug: "luo-bo-niu-nan-tang",
		title: "蘿蔔牛腩湯",
		titleEn: "Radish Beef Brisket",
		cuisine: "hong-kong",
		budget: 80,
		serves: 4,
		time: 30,
		difficulty: "medium",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/12208779/pexels-photo-12208779.jpeg?_gl=1*4t6g5r*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI0OTEwJGoyOSRsMCRoMA..",
		description: "白蘿蔔係低GI，牛腩較瘦既部位",
		ingredients: [
			"白蘿蔔 500g",
			"牛腩 400g",
			"薑 3片",
			"鹽 少許"
		],
		steps: [
			"牛腩洗淨，飛水備用",
			"白蘿蔔去皮切塊",
			"水滾加入牛腩、薑片",
			"中火煲20分鐘",
			"加入白蘿蔔再煲25分鐘",
			"加鹽調味"
		],
		tips: "Daikon is low GI, lean brisket",
		nutritionHighlights: [
			"維他命C、纖維、澱粉酶，助消化",
			"蛋白質、鐵、維他命B12，含膠原蛋白",
			"薑辣素、抗氧化、助消化、驅寒",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "46",
		slug: "han-shi-ban-fan",
		title: "韓式拌飯 (椰菜花飯)",
		titleEn: "Bibimbap Cauliflower Rice",
		cuisine: "korean",
		budget: 50,
		serves: 2,
		time: 25,
		difficulty: "medium",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&h=300&fit=crop",
		description: "用椰菜花飯代替白飯",
		ingredients: [
			"椰菜花 1個",
			"牛肉 150g",
			"菠菜 100g",
			"豆芽 100g",
			"紅蘿蔔 1條"
		],
		steps: [
			"椰菜花攪碎成為飯粒狀",
			"牛肉用醬油醃製",
			"分別炒熟菠菜、豆芽、紅蘿蔔",
			"椰菜花飯蒸5分鐘",
			"擺放係碗度，加上蔬菜同牛肉"
		],
		tips: "Swap white rice for cauli-rice",
		nutritionHighlights: [
			"低醣、維他命C、纖維",
			"血紅素鐵、維他命B12、鋅、蛋白質",
			"富含鐵質、維他命A/C/K、葉綠素、β-胡蘿蔔素及纖維",
			"維他命C、纖維、蛋白質",
			"β-胡蘿蔔素、維他命A、纖維"
		]
	},
	{
		id: "47",
		slug: "qing-zheng-xia",
		title: "清蒸蝦",
		titleEn: "Cantonese Steamed Shrimp",
		cuisine: "hong-kong",
		budget: 60,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop",
		description: "零碳水，高蛋白質",
		ingredients: [
			"鮮蝦 300g",
			"薑 3片",
			"蔥 2條",
			"鹽 少許"
		],
		steps: [
			"蝦洗淨，去腸",
			"薑片鋪係碟度",
			"蝦擺上面",
			"水滾大火蒸5-6分鐘",
			"撒上蔥花，淋上熱油",
			"加少許鹽"
		],
		tips: "Zero carb, high protein",
		nutritionHighlights: [
			"硒、碘、低脂肪、高蛋白",
			"薑辣素、抗氧化、助消化、驅寒",
			"維他命C、纖維、抗氧化",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "48",
		slug: "pad-kra-pao",
		title: "嘎拋炒豬肉",
		titleEn: "Pad Krapao",
		cuisine: "thai",
		budget: 40,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/34714656/pexels-photo-34714656.jpeg?_gl=1*1l9xt4j*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI0NTExJGoyOCRsMCRoMA..",
		description: "配搭蛋食，唔好落白飯",
		ingredients: [
			"豬肉/雞肉 200g",
			"九層塔 50g",
			"蒜 3瓣",
			"辣椒 2條",
			"魚露 1湯匙"
		],
		steps: [
			"肉切碎",
			"熱鑊落油，加入蒜爆香",
			"加入肉碎炒至變色",
			"加入九層塔同辣椒",
			"加入魚露",
			"煎一隻蛋放係面"
		],
		tips: "Serve over egg, skip white rice",
		nutritionHighlights: [
			"蛋白質、維他命B1、鋅",
			"維他命K、抗氧化、芳香",
			"大蒜素、免疫支持、心血管健康",
			"維他命C、辣椒素、促進新陳代謝",
			"蛋白質、碘、礦物質，少鹽更佳"
		]
	},
	{
		id: "49",
		slug: "bai-cai-xiao-suan",
		title: "大白菜炒蒜",
		titleEn: "Napa Cabbage Stir-fry",
		cuisine: "vietnamese",
		budget: 25,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1603093059746-6ba9a3b962b7?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description: "快速，非常低GI",
		ingredients: [
			"大白菜 300g",
			"蒜 2瓣",
			"魚露 1湯匙"
		],
		steps: [
			"大白菜切段",
			"蒜切片",
			"熱鑊落油，加入蒜爆香",
			"加入大白菜快炒3分鐘",
			"加入魚露調味"
		],
		tips: "Quick, very low GI",
		nutritionHighlights: [
			"維他命C、纖維、水分",
			"大蒜素、免疫支持、心血管健康",
			"蛋白質、碘、礦物質，少鹽更佳",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "50",
		slug: "dou-jiang-zheng-dan",
		title: "豆漿蒸蛋",
		titleEn: "Soy Milk Steamed Egg",
		cuisine: "taiwanese",
		budget: 20,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.pexels.com/photos/35833815/pexels-photo-35833815.jpeg?_gl=1*128c2gw*_ga*MTY2OTI5NDQ1OS4xNzY5NTkyNjEy*_ga_8JE65Q40S6*czE3NzY4MjI2NjIkbzEyJGcxJHQxNzc2ODI0MzQ5JGoyNCRsMCRoMA..",
		description: "無糖豆漿加蛋，低碳水",
		ingredients: [
			"蛋 3隻",
			"無糖豆漿 1杯",
			"鹽 少許"
		],
		steps: [
			"蛋打散，加入豆漿同鹽",
			"倒入蒸碗",
			"大火蒸8-10分鐘"
		],
		tips: "Unsweetened soy milk + eggs = low carb",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"植物蛋白、鈣、異黃酮，無糖配方",
			"蛋白質互補，膽鹼豐富",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "51",
		slug: "garlic-butter-prawns",
		title: "蒜香牛油蝦",
		titleEn: "Garlic Butter Prawns",
		cuisine: "western",
		budget: 90,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=800&auto=format&fit=crop&q=80",
		description: "快手蒜香，蝦肉鮮嫩",
		ingredients: [
			"蝦 300g",
			"蒜蓉 3茶匙",
			"牛油 1湯匙",
			"黑胡椒 1茶匙"
		],
		steps: [
			"蝦洗淨",
			"牛油熱鑊爆蒜",
			"加蝦炒至變紅",
			"加黑胡椒即可"
		],
		tips: "時間緊不要煮太長",
		nutritionHighlights: [
			"硒、碘、低脂肪、高蛋白",
			"大蒜素、免疫支持、心血管健康",
			"維他命A/D、能量，少量為佳",
			"胡椒鹼、抗氧化、促進鐵吸收",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "52",
		slug: "pan-seared-salmon",
		title: "煎三文魚",
		titleEn: "Pan-seared Salmon",
		cuisine: "western",
		budget: 85,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&auto=format&fit=crop&q=60",
		description: "Omega-3豐富，快手必備",
		ingredients: [
			"三文魚 300g",
			"鹽 少許",
			"油 1湯匙",
			"檸檬 1/2個"
		],
		steps: [
			"三文魚擦乾",
			"熱鑊下油",
			"皮面下煎4分鐘",
			"翻面煎2分鐘",
			"擠檸檬汁"
		],
		tips: "不要煮太久保持多汁",
		nutritionHighlights: [
			"Omega-3、維他命D、蛋白質、硒，保護心血管",
			"健康脂肪，提供能量",
			"維他命C、促進鐵吸收、心血管健康",
			"檸檬去腥，維他命C促進鐵吸收",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "53",
		slug: "garlic-broccoli",
		title: "蒜香西蘭花",
		titleEn: "Garlic Broccoli",
		cuisine: "western",
		budget: 20,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&auto=format&fit=crop&q=60",
		description: "最簡單最健康",
		ingredients: [
			"西蘭花 300g",
			"蒜 3瓣",
			"油 1湯匙",
			"鹽 少許"
		],
		steps: [
			"西蘭花切小朵",
			"蒜片",
			"熱鑊炒蒜",
			"加西蘭花快炒",
			"加鹽即可"
		],
		tips: "保持西蘭花爽身口感",
		nutritionHighlights: [
			"維他命C/K、纖維、抗氧化",
			"大蒜素、免疫支持、心血管健康",
			"健康脂肪，提供能量",
			"蘿蔔硫素抗癌，維他命C高",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "54",
		slug: "indian-dal",
		title: "印度扁豆咖喱",
		titleEn: "Indian Dal Curry",
		cuisine: "indian",
		budget: 25,
		serves: 2,
		time: 25,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
		description: "高蛋白質，香料豐富",
		ingredients: [
			"紅扁豆 150g",
			"洋蔥 1個",
			"蒜 2瓣",
			"薑 1段",
			"咖喱粉 1湯匙"
		],
		steps: [
			"洋蔥蒜薑炒香",
			"加咖喱粉炒香",
			"加扁豆及水煮",
			"加鹽調味"
		],
		tips: "提前浸扁豆會更快",
		nutritionHighlights: [
			"槲皮素、抗氧化、維他命C",
			"大蒜素、免疫支持、心血管健康",
			"薑辣素、抗氧化、助消化、驅寒",
			"薑黃素、抗氧化、抗炎",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "55",
		slug: "tandoori-chicken",
		title: "印度烤雞",
		titleEn: "Tandoori Chicken",
		cuisine: "indian",
		budget: 50,
		serves: 2,
		time: 20,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&auto=format&fit=crop&q=60",
		description: "香料烤雞，香氣撲鼻",
		ingredients: [
			"雞腿 2隻",
			"乳酪 100ml",
			"薑蓉 1湯匙",
			"香料粉 1茶匙"
		],
		steps: [
			"混合乳酪香料",
			"雞腿醃30分鐘",
			"烤箱200°C烤15分鐘"
		],
		tips: "提前醃會更入味",
		nutritionHighlights: [
			"蛋白質、維他命B6、硒，低脂肪部位",
			"益生菌、蛋白質、鈣，助腸道健康",
			"薑辣素、抗氧化、助消化",
			"抗氧化、抗炎、促進消化",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "56",
		slug: "paneer-stir-fry",
		title: "印度起司炒菜",
		titleEn: "Paneer Stir-fry",
		cuisine: "indian",
		budget: 40,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
		description: "素食高蛋白質",
		ingredients: [
			"印度起司 200g",
			"蔬菜 200g",
			"洋蔥 1個",
			"香料粉 1茶匙"
		],
		steps: [
			"起司切塊",
			"熱鑊炒蔬菜",
			"加起司炒香",
			"加香料即可"
		],
		tips: "快炒保持起司形狀",
		nutritionHighlights: [
			"蛋白質、鈣、維他命B12",
			"多元維他命、纖維，抗氧化",
			"槲皮素、抗氧化、維他命C",
			"抗氧化、抗炎、促進消化",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "57",
		slug: "mediterranean-salad",
		title: "地中海沙律",
		titleEn: "Mediterranean Salad",
		cuisine: "mediterranean",
		budget: 35,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60",
		description: "新鮮健康，5分鐘完成",
		ingredients: [
			"番茄 2個",
			"黃瓜 1條",
			"紫洋蔥 1/4個",
			"橄欖 50g",
			"橄欖油 2湯匙"
		],
		steps: [
			"番茄黃瓜切塊",
			"洋蔥切絲",
			"混合所有材料",
			"淋橄欖油即可"
		],
		tips: "隨時可做快手餐",
		nutritionHighlights: [
			"茄紅素、維他命C、鉀，抗氧化",
			"維他命K、鉀、水分，高纖低卡",
			"槲皮素、抗氧化、維他命C",
			"單元不飽和脂肪、抗氧化",
			"單元不飽和脂肪、心臟健康"
		]
	},
	{
		id: "58",
		slug: "grilled-fish",
		title: "地中海烤魚",
		titleEn: "Grilled Fish",
		cuisine: "mediterranean",
		budget: 70,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&auto=format&fit=crop&q=60",
		description: "清淡鮮甜，簡單快手",
		ingredients: [
			"白魚 400g",
			"檸檬 1個",
			"橄欖油 2湯匙",
			"蒜 2瓣"
		],
		steps: [
			"魚洗淨",
			"放上檸檬蒜",
			"淋橄欖油",
			"烤箱190°C烤12分鐘"
		],
		tips: "用錫紙包裝易清潔",
		nutritionHighlights: [
			"優質蛋白質、Omega-3、維他命D，低脂肪",
			"維他命C、促進鐵吸收、心血管健康",
			"單元不飽和脂肪、心臟健康",
			"大蒜素、免疫支持、心血管健康",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "59",
		slug: "hummus",
		title: "地中海鷹嘴豆醬",
		titleEn: "Hummus",
		cuisine: "mediterranean",
		budget: 20,
		serves: 4,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60",
		description: "健康醬料，配菜佳品",
		ingredients: [
			"鷹嘴豆罐 400g",
			"芝麻醬 2湯匙",
			"檸檬汁 2湯匙",
			"蒜 1瓣"
		],
		steps: [
			"鷹嘴豆瀝乾",
			"放攪拌機",
			"加檸檬蒜",
			"攪至順滑"
		],
		tips: "可存放一週",
		nutritionHighlights: [
			"蛋白質、纖維、鐵、鎂，助穩定血糖",
			"鈣、鐵、健康脂肪、芝麻素",
			"維他命C、促進鐵吸收",
			"大蒜素、免疫支持、心血管健康",
			"維他命C有助芝麻中鐵的吸收"
		]
	},
	{
		id: "60",
		slug: "french-omelette",
		title: "法式蛋卷",
		titleEn: "French Omelette",
		cuisine: "french",
		budget: 25,
		serves: 1,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
		description: "經典快手，5分鐘搞定",
		ingredients: [
			"蛋 3隻",
			"牛油 1茶匙",
			"鹽及黑胡椒"
		],
		steps: [
			"蛋打散",
			"熱鑊下牛油",
			"倒蛋液",
			"半熟時折起"
		],
		tips: "火候掌握好不會老",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"維他命A/D、能量，少量為佳",
			"胡椒鹼、抗氧化、促進鐵吸收",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "61",
		slug: "french-green-beans",
		title: "法式煮豆",
		titleEn: "French Green Beans",
		cuisine: "french",
		budget: 20,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60",
		description: "清淡爽身，經典配菜",
		ingredients: [
			"豆角 300g",
			"蒜 2瓣",
			"檸檬 1/2個",
			"橄欖油 1湯匙"
		],
		steps: [
			"豆角飛水",
			"蒜下鑊炒香",
			"加豆角炒",
			"加檸檬汁即可"
		],
		tips: "保持豆角爽身感",
		nutritionHighlights: [
			"大蒜素、免疫支持、心血管健康",
			"維他命C、促進鐵吸收、心血管健康",
			"單元不飽和脂肪、心臟健康",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "62",
		slug: "french-roast-chicken",
		title: "法式焗雞",
		titleEn: "French Roast Chicken",
		cuisine: "french",
		budget: 80,
		serves: 4,
		time: 60,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&auto=format&fit=crop&q=60",
		description: "金黃香脆，家庭菜式",
		ingredients: [
			"全雞 1隻",
			"檸檬 1個",
			"迷迭香 2枝",
			"鹽及黑胡椒"
		],
		steps: [
			"雞洗淨擦乾",
			"放檸檬迷迭香",
			"抹橄欖油鹽胡椒",
			"烤箱190°C烤50分鐘"
		],
		tips: "靜置10分鐘後切件",
		nutritionHighlights: [
			"蛋白質、維他命B6、硒",
			"維他命C、促進鐵吸收、心血管健康",
			"抗氧化、抗炎、記憶力支持",
			"胡椒鹼、抗氧化、促進鐵吸收",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "63",
		slug: "italian-caprese",
		title: "意大利番茄芝士",
		titleEn: "Caprese Salad",
		cuisine: "italian",
		budget: 50,
		serves: 2,
		time: 5,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60",
		description: "最快5分鐘完成",
		ingredients: [
			"番茄 2個",
			"芝士 200g",
			"羅勒 1束",
			"橄欖油 2湯匙"
		],
		steps: [
			"番茄切片",
			"芝士切片",
			"交替鋪排",
			"淋橄欖油加羅勒"
		],
		tips: "新鮮食材最重要",
		nutritionHighlights: [
			"茄紅素、維他命C、鉀，抗氧化",
			"蛋白質、鈣、維他命A/B12",
			"維他命K、抗氧化、芳香",
			"單元不飽和脂肪、心臟健康",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "64",
		slug: "italian-risotto",
		title: "意大利松露燴飯",
		titleEn: "Mushroom Risotto",
		cuisine: "italian",
		budget: 60,
		serves: 2,
		time: 30,
		difficulty: "medium",
		dietary: [
			"diabetic-friendly",
			"low-carb"
		],
		image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop&q=80",
		description: "奶香濃郁，口感如絲",
		ingredients: [
			"意米 150g",
			"蘑菇 200g",
			"洋蔥 1/2個",
			"白酒 100ml",
			"高湯 500ml"
		],
		steps: [
			"洋蔥蒜炒香",
			"加意米炒至透明",
			"倒白酒",
			"逐次加高湯邊煮邊攪",
			"加蘑菇及芝士"
		],
		tips: "常攪保持奶滑",
		nutritionHighlights: [
			"碳水化合物、維他命B，提供了能量",
			"維他命D、硒、免疫支持",
			"槲皮素、抗氧化、維他命C",
			"抗氧化物質，少量飲用",
			"礦物質、膠原蛋白、鮮味"
		]
	},
	{
		id: "65",
		slug: "british-scrambled-eggs",
		title: "英式炒蛋",
		titleEn: "Scrambled Eggs",
		cuisine: "british",
		budget: 20,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
		description: "快手早餐，蓬鬆軟滑",
		ingredients: [
			"蛋 4隻",
			"牛油 1湯匙",
			"奶 1湯匙",
			"鹽及黑胡椒"
		],
		steps: [
			"蛋打散",
			"牛油下鑊",
			"倒蛋液",
			"慢速攪至軟"
		],
		tips: "慢火令蛋更軟滑",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"維他命A/D、能量，少量為佳",
			"鈣、蛋白質、維他命D",
			"胡椒鹼、抗氧化、促進鐵吸收",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "66",
		slug: "british-mushrooms",
		title: "英式炒蘑菇",
		titleEn: "Sautéed Mushrooms",
		cuisine: "british",
		budget: 25,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=60",
		description: "健康配菜，5分鐘搞定",
		ingredients: [
			"蘑菇 300g",
			"蒜 2瓣",
			"牛油 1湯匙",
			"百里香 1枝"
		],
		steps: [
			"蘑菇切件",
			"蒜切片",
			"牛油下鑊爆蒜",
			"加蘑菇炒",
			"加百里香"
		],
		tips: "高火快炒更香",
		nutritionHighlights: [
			"維他命D、硒、免疫支持",
			"大蒜素、免疫支持、心血管健康",
			"維他命A/D、能量，少量為佳",
			"抗氧化、抗炎、維他命C",
			"蒜有助提升免疫力，維他命D互補"
		]
	},
	{
		id: "67",
		slug: "british-grilled-tomato",
		title: "英式烤番茄",
		titleEn: "Grilled Tomato",
		cuisine: "british",
		budget: 15,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60",
		description: "簡單配菜，2分鐘完成",
		ingredients: [
			"番茄 2個",
			"橄欖油 1湯匙",
			"百里香 1枝"
		],
		steps: [
			"番茄切半",
			"淋橄欖油",
			"放烤箱190°C烤8分鐘"
		],
		tips: "溫暖早餐必備",
		nutritionHighlights: [
			"茄紅素、維他命C、鉀，抗氧化",
			"單元不飽和脂肪、心臟健康",
			"抗氧化、抗炎、維他命C",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "68",
		slug: "thai-basil-pork",
		title: "泰式九層塔豬肉",
		titleEn: "Thai Basil Pork",
		cuisine: "thai",
		budget: 40,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1628840042765-356cda07f4db?w=400&auto=format&fit=crop&q=60",
		description: "辣身香氣，下飯一級",
		ingredients: [
			"豬肉 250g",
			"九層塔 50g",
			"辣椒 1條",
			"蒜 3瓣",
			"魚露 1湯匙"
		],
		steps: [
			"豬肉炒至熟",
			"加蒜辣椒",
			"加魚露",
			"加九層塔即可"
		],
		tips: "香草最後加保香氣",
		nutritionHighlights: [
			"蛋白質、維他命B1、鋅",
			"維他命K、抗氧化、芳香",
			"維他命C、辣椒素、促進新陳代謝",
			"大蒜素、免疫支持、心血管健康",
			"蛋白質、碘、礦物質，少鹽更佳"
		]
	},
	{
		id: "69",
		slug: "thai-green-curry-fish",
		title: "泰式青咖喱魚",
		titleEn: "Thai Green Curry Fish",
		cuisine: "thai",
		budget: 60,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1585937421612-0f3c003ba2d4?w=400&auto=format&fit=crop&q=60",
		description: "香辣下飯，一試難忘",
		ingredients: [
			"白魚 300g",
			"青咖喱醬 2湯匙",
			"椰奶 200ml",
			"蔬菜 100g",
			"魚露 1茶匙"
		],
		steps: [
			"炒咖喱醬",
			"加魚煮至半熟",
			"倒椰奶蔬菜",
			"加魚露調味"
		],
		tips: "用椰汁更香濃",
		nutritionHighlights: [
			"優質蛋白質、Omega-3、維他命D，低脂肪",
			"椰奶＋香草，抗氧化、促新陳代謝",
			"中鏈脂肪 (MCT)、能量、奶香味",
			"多元維他命、纖維，抗氧化",
			"蛋白質、碘、礦物質，少鹽更佳"
		]
	},
	{
		id: "70",
		slug: "korean-egg-roll-advanced",
		title: "韓式蛋卷",
		titleEn: "Korean Egg Roll",
		cuisine: "korean",
		budget: 25,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
		description: "嫩滑多層，韓式早餐",
		ingredients: [
			"蛋 4隻",
			"油 1湯匙",
			"鹽 少許"
		],
		steps: [
			"蛋打散",
			"熱鑊下油",
			"薄薄倒一層蛋液",
			"等半熟捲起",
			"重複直至完成"
		],
		tips: "薄火多層令口感豐富",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"健康脂肪，提供能量",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者",
			"無麩質，適合麩質敏感人士"
		]
	},
	{
		id: "71",
		slug: "korean-kale-namul",
		title: "韓式羽衣甘藍",
		titleEn: "Korean Kale Namul",
		cuisine: "korean",
		budget: 20,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1576021182211-9ea8dced3690?w=400&auto=format&fit=crop&q=60",
		description: "高纖高鈣，快手菜",
		ingredients: [
			"羽衣甘藍 200g",
			"蒜蓉 1茶匙",
			"芝麻油 1茶匙",
			"鹽 少許"
		],
		steps: [
			"羽衣甘藍飛水",
			"過冷河",
			"擠乾",
			"加蒜蓉芝麻油鹽"
		],
		tips: "冷食更爽口",
		nutritionHighlights: [
			"維他命A/C/K、鈣、抗氧化",
			"大蒜素、免疫支持、心血管健康",
			"芝麻油健康脂肪、維他命E、抗氧化",
			"芝麻油脂有助脂溶性維他命吸收",
			"維他命K是菠菜1.5倍，護骨之選"
		]
	},
	{
		id: "72",
		slug: "vietnamese-rice-paper-rolls",
		title: "越南米紙卷",
		titleEn: "Rice Paper Rolls",
		cuisine: "vietnamese",
		budget: 35,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60",
		description: "清爽低卡，5分鐘完成",
		ingredients: [
			"米紙 8張",
			"蝦 150g",
			"生菜 100g",
			"紫洋蔥 50g",
			"香草 50g"
		],
		steps: [
			"蝦煮熟",
			"米紙浸軟",
			"鋪生菜蝦香草",
			"捲起",
			"蘸魚露醬"
		],
		tips: "米紙浸一秒即可",
		nutritionHighlights: [
			"低卡、碳水，少量配搭",
			"硒、碘、低脂肪、高蛋白",
			"維他命K/A、纖維、水分",
			"槲皮素、抗氧化、維他命C",
			"抗氧化、抗炎、芳香療法"
		]
	},
	{
		id: "73",
		slug: "vietnamese-grilled-pork",
		title: "越南烤豬肉",
		titleEn: "Vietnamese Grilled Pork",
		cuisine: "vietnamese",
		budget: 50,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&auto=format&fit=crop&q=60",
		description: "香料醃豬肉，香氣撲鼻",
		ingredients: [
			"豬肉 300g",
			"蒜 3瓣",
			"檸檬汁 2湯匙",
			"魚露 1湯匙"
		],
		steps: [
			"豬肉切片",
			"混合蒜檸檬魚露",
			"醃30分鐘",
			"烤箱200°C烤12分鐘"
		],
		tips: "提前醃會更入味",
		nutritionHighlights: [
			"蛋白質、維他命B1、鋅",
			"大蒜素、免疫支持、心血管健康",
			"維他命C、促進鐵吸收",
			"蛋白質、碘、礦物質，少鹽更佳",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "74",
		slug: "chinese-stir-fry-mushroom",
		title: "蘑菇炒菜",
		titleEn: "Mushroom Stir-fry",
		cuisine: "chinese",
		budget: 30,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=60",
		description: "高纖維，快手配菜",
		ingredients: [
			"蘑菇 300g",
			"蒜 2瓣",
			"蔥 1條",
			"油 1湯匙"
		],
		steps: [
			"蘑菇切件",
			"蒜蔥切段",
			"熱鑊炒蒜蔥",
			"加蘑菇快炒",
			"加鹽即可"
		],
		tips: "保持爽身口感",
		nutritionHighlights: [
			"維他命D、硒、免疫支持",
			"大蒜素、免疫支持、心血管健康",
			"維他命C、纖維、抗氧化",
			"健康脂肪，提供能量",
			"蒜有助提升免疫力，維他命D互補"
		]
	},
	{
		id: "75",
		slug: "chinese-egg-soup",
		title: "蛋湯",
		titleEn: "Egg Drop Soup",
		cuisine: "chinese",
		budget: 20,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1612874742237-415c88e1d5cc?w=400&auto=format&fit=crop&q=60",
		description: "清淡快手，簡單快速",
		ingredients: [
			"蛋 2隻",
			"高湯 500ml",
			"蔥 1條",
			"鹽 少許"
		],
		steps: [
			"高湯煮滾",
			"蛋打散",
			"慢慢倒入攪動",
			"撒蔥花即可"
		],
		tips: "即做即食最好喝",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"礦物質、膠原蛋白、鮮味",
			"維他命C、纖維、抗氧化",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "76",
		slug: "chinese-tofu-mushroom",
		title: "豆腐蘑菇",
		titleEn: "Tofu Mushroom Stir-fry",
		cuisine: "chinese",
		budget: 35,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
		description: "高蛋白質，快手菜",
		ingredients: [
			"豆腐 1磚",
			"蘑菇 200g",
			"蒜 2瓣",
			"油 1湯匙"
		],
		steps: [
			"豆腐切塊",
			"蘑菇切件",
			"蒜下鑊炒香",
			"加豆腐蘑菇炒",
			"加鹽調味"
		],
		tips: "輕輕炒保持豆腐形狀",
		nutritionHighlights: [
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"維他命D、硒、免疫支持",
			"大蒜素、免疫支持、心血管健康",
			"健康脂肪，提供能量",
			"蒜有助提升免疫力，蛋白質互補"
		]
	},
	{
		id: "77",
		slug: "hong-kong-morning-tea-egg",
		title: "港式茶葉蛋",
		titleEn: "Hong Kong Tea Egg",
		cuisine: "hong-kong",
		budget: 15,
		serves: 1,
		time: 5,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
		description: "經典點心，快手必備",
		ingredients: [
			"蛋 2隻",
			"茶葉 1茶匙",
			"醬油 1湯匙"
		],
		steps: [
			"蛋煮至半熟",
			"混合茶葉醬油",
			"蛋浸漬2小時"
		],
		tips: "可提前製做",
		nutritionHighlights: [
			"維他命A/D/B12、膽鹼、蛋白質",
			"抗氧化、兒茶素，提神醒腦",
			"氨基酸、鐵，少鈉更佳",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "78",
		slug: "hong-kong-bitter-melon",
		title: "苦瓜炒蛋",
		titleEn: "Bitter Melon Egg Stir-fry",
		cuisine: "hong-kong",
		budget: 25,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
		description: "清熱健康，港式風味",
		ingredients: [
			"苦瓜 1條",
			"蛋 3隻",
			"蒜 2瓣",
			"鹽 少許"
		],
		steps: [
			"苦瓜切件飛水",
			"蛋打散",
			"蒜下鑊爆香",
			"加蛋炒至半熟",
			"加苦瓜炒勻"
		],
		tips: "飛水減苦味",
		nutritionHighlights: [
			"維他命C、苦瓜苷、血糖調節",
			"維他命A/D/B12、膽鹼、蛋白質",
			"大蒜素、免疫支持、心血管健康",
			"苦瓜苷助血糖調節，維他命C抗氧化",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "79",
		slug: "hong-kong-bitter-greens",
		title: "芽菜炒蛋",
		titleEn: "Vegetables Egg Stir-fry",
		cuisine: "hong-kong",
		budget: 20,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60",
		description: "清淡爽身，經常點菜",
		ingredients: [
			"芽菜 200g",
			"蛋 2隻",
			"蒜 2瓣",
			"油 1湯匙"
		],
		steps: [
			"芽菜洗淨",
			"蛋打散",
			"蒜下鑊炒香",
			"加蛋至半熟",
			"加芽菜炒勻"
		],
		tips: "保持蔬菜爽身感",
		nutritionHighlights: [
			"維他命C、纖維、蛋白質",
			"維他命A/D/B12、膽鹼、蛋白質",
			"大蒜素、免疫支持、心血管健康",
			"健康脂肪，提供能量",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "80",
		slug: "japanese-teriyaki-sauce",
		title: "日式照燒醬",
		titleEn: "Teriyaki Salmon",
		cuisine: "japanese",
		budget: 75,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&auto=format&fit=crop&q=60",
		description: "甜鹹照燒，入口軟滑",
		ingredients: [
			"三文魚 300g",
			"醬油 2湯匙",
			"味醂 1湯匙",
			"糖 1茶匙"
		],
		steps: [
			"三文魚擦乾",
			"熱鑊下油煎至半熟",
			"混合醬油味醂糖",
			"倒在三文魚上煮熟"
		],
		tips: "不要煮太久",
		nutritionHighlights: [
			"Omega-3、維他命D、蛋白質、硒，保護心血管",
			"氨基酸、鐵，少鈉更佳",
			"氨基酸、甜味，少糖",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "81",
		slug: "japanese-edamame",
		title: "日式毛豆",
		titleEn: "Japanese Edamame",
		cuisine: "japanese",
		budget: 20,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60",
		description: "高蛋白質，快手小食",
		ingredients: [
			"毛豆 300g",
			"鹽 1茶匙",
			"水"
		],
		steps: [
			"毛豆洗淨",
			"水滾加鹽",
			"加毛豆煮5分鐘",
			"瀝乾即可"
		],
		tips: "冷食或熱食都好",
		nutritionHighlights: [
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者",
			"無麩質，適合麩質敏感人士"
		]
	},
	{
		id: "82",
		slug: "indian-tandoori-vegetables",
		title: "印度烤蔬菜",
		titleEn: "Tandoori Vegetables",
		cuisine: "indian",
		budget: 30,
		serves: 2,
		time: 18,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60",
		description: "烤香蔬菜，低碳水",
		ingredients: [
			"花椰菜 200g",
			"洋蔥 1個",
			"乳酪 100ml",
			"香料粉 1茶匙"
		],
		steps: [
			"蔬菜切件",
			"混合乳酪香料",
			"醃15分鐘",
			"烤箱200°C烤15分鐘"
		],
		tips: "提前醃會更入味",
		nutritionHighlights: [
			"維他命C、纖維、低醣",
			"槲皮素、抗氧化、維他命C",
			"益生菌、蛋白質、鈣，助腸道健康",
			"抗氧化、抗炎、促進消化",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "83",
		slug: "mediterranean-grilled-chicken",
		title: "地中海烤雞",
		titleEn: "Mediterranean Grilled Chicken",
		cuisine: "mediterranean",
		budget: 55,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&auto=format&fit=crop&q=60",
		description: "清淡健康，香草醃制",
		ingredients: [
			"雞胸 300g",
			"檸檬 1個",
			"橄欖油 2湯匙",
			"香草 2枝"
		],
		steps: [
			"雞胸混合檸檬油香草",
			"醃20分鐘",
			"烤箱200°C烤12分鐘"
		],
		tips: "嫩滑多汁",
		nutritionHighlights: [
			"高蛋白、維他命B6，低脂肪精瘦肉",
			"維他命C、促進鐵吸收、心血管健康",
			"單元不飽和脂肪、心臟健康",
			"抗氧化、抗炎、芳香療法",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "84",
		slug: "western-grilled-vegetables",
		title: "燒烤蔬菜",
		titleEn: "Grilled Vegetables",
		cuisine: "western",
		budget: 25,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60",
		description: "快手配菜，香氣十足",
		ingredients: [
			"蔬菜混合 300g",
			"橄欖油 2湯匙",
			"蒜 2瓣",
			"香草"
		],
		steps: [
			"蔬菜切件",
			"淋橄欖油",
			"撒蒜香草",
			"烤箱200°C烤10分鐘"
		],
		tips: "高溫快烤",
		nutritionHighlights: [
			"多元維他命、纖維，抗氧化",
			"單元不飽和脂肪、心臟健康",
			"大蒜素、免疫支持、心血管健康",
			"抗氧化、抗炎、芳香療法",
			"油有助脂溶性維他命（A/K）吸收"
		]
	},
	{
		id: "85",
		slug: "western-chicken-salad",
		title: "西式雞肉沙律",
		titleEn: "Chicken Salad",
		cuisine: "western",
		budget: 50,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60",
		description: "清爽營養，快手餐",
		ingredients: [
			"雞肉 200g",
			"生菜 150g",
			"番茄 1個",
			"橄欖油 1湯匙"
		],
		steps: [
			"雞肉煮熟切粒",
			"生菜番茄切件",
			"混合所有材料",
			"淋橄欖油油醋即可"
		],
		tips: "即做即食",
		nutritionHighlights: [
			"蛋白質、維他命B6、硒",
			"維他命K/A、纖維、水分",
			"茄紅素、維他命C、鉀，抗氧化",
			"單元不飽和脂肪、心臟健康",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "86",
		slug: "taiwanese-braised-chicken",
		title: "台式滷雞腿",
		titleEn: "Taiwanese Braised Chicken",
		cuisine: "taiwanese",
		budget: 60,
		serves: 2,
		time: 20,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&auto=format&fit=crop&q=60",
		description: "滷香濃郁，台灣經典",
		ingredients: [
			"雞腿 2隻",
			"滷汁 200ml",
			"蒜 3瓣",
			"薑 1段"
		],
		steps: [
			"混合滷汁香料",
			"雞腿下鑊煮",
			"大火轉小火20分鐘",
			"入味即可"
		],
		tips: "可提前製做冷食",
		nutritionHighlights: [
			"蛋白質、維他命B6、硒，低脂肪部位",
			"氨基酸、香料，礦物質",
			"大蒜素、免疫支持、心血管健康",
			"薑辣素、抗氧化、助消化、驅寒",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "87",
		slug: "korean-beef-stew",
		title: "韓式牛肉湯",
		titleEn: "Korean Beef Stew",
		cuisine: "korean",
		budget: 70,
		serves: 2,
		time: 20,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb"
		],
		image: "https://images.unsplash.com/photo-1585937421612-0f3c003ba2d4?w=400&auto=format&fit=crop&q=60",
		description: "溫暖舒服，冬日必備",
		ingredients: [
			"牛肉 300g",
			"蘿蔔 150g",
			"醬油 2湯匙",
			"蒜 3瓣"
		],
		steps: [
			"蘿蔔牛肉切件",
			"高湯煮滾",
			"加牛肉蘿蔔",
			"加醬油蒜煮15分鐘"
		],
		tips: "慢火讓肉更嫩",
		nutritionHighlights: [
			"血紅素鐵、維他命B12、鋅、蛋白質",
			"維他命C、纖維、澱粉酶，助消化",
			"氨基酸、鐵，少鈉更佳",
			"大蒜素、免疫支持、心血管健康",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "88",
		slug: "thai-shrimp-soup",
		title: "泰式蝦湯",
		titleEn: "Thai Shrimp Soup",
		cuisine: "thai",
		budget: 65,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1585937421612-0f3c003ba2d4?w=400&auto=format&fit=crop&q=60",
		description: "酸辣開胃，清湯鮮香",
		ingredients: [
			"蝦 200g",
			"檸檬葉 3葉",
			"魚露 1湯匙",
			"辣椒 1條"
		],
		steps: [
			"高湯煮滾",
			"加蝦",
			"加檸檬葉魚露辣椒",
			"煮至蝦變紅即可"
		],
		tips: "快手湯品5分鐘完成",
		nutritionHighlights: [
			"硒、碘、低脂肪、高蛋白",
			"維他命C、抗氧化、芳香",
			"蛋白質、碘、礦物質，少鹽更佳",
			"維他命C、辣椒素、促進新陳代謝",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "89",
		slug: "indian-tikka-chicken",
		title: "印度烤雞丁",
		titleEn: "Chicken Tikka",
		cuisine: "indian",
		budget: 55,
		serves: 2,
		time: 20,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&auto=format&fit=crop&q=60",
		description: "香料烤雞，外脆內嫩",
		ingredients: [
			"雞胸 300g",
			"乳酪 100ml",
			"香料粉 1湯匙",
			"檸檬汁 1湯匙"
		],
		steps: [
			"雞肉切件混合乳酪香料",
			"醃30分鐘",
			"竹籤串起",
			"烤箱200°C烤15分鐘"
		],
		tips: "即烤即食最香",
		nutritionHighlights: [
			"高蛋白、維他命B6，低脂肪精瘦肉",
			"益生菌、蛋白質、鈣，助腸道健康",
			"抗氧化、抗炎、促進消化",
			"維他命C、促進鐵吸收",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "90",
		slug: "mediterranean-baked-fish",
		title: "地中海焗魚",
		titleEn: "Mediterranean Baked Fish",
		cuisine: "mediterranean",
		budget: 75,
		serves: 2,
		time: 18,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&auto=format&fit=crop&q=60",
		description: "清淡香氣，簡單優雅",
		ingredients: [
			"白魚 400g",
			"番茄 2個",
			"橄欖 50g",
			"香草",
			"橄欖油 2湯匙"
		],
		steps: [
			"魚放焗盤",
			"舖番茄橄欖香草",
			"淋橄欖油",
			"焗350°F 12分鐘"
		],
		tips: "用錫紙包裝最簡單",
		nutritionHighlights: [
			"優質蛋白質、Omega-3、維他命D，低脂肪",
			"茄紅素、維他命C、鉀，抗氧化",
			"單元不飽和脂肪、抗氧化",
			"抗氧化、抗炎、芳香療法",
			"單元不飽和脂肪、心臟健康"
		]
	},
	{
		id: "91",
		slug: "western-beef-steak",
		title: "西式牛排",
		titleEn: "Beef Steak",
		cuisine: "western",
		budget: 95,
		serves: 1,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1618958536149-5a3b3d3f7d5c?w=400&auto=format&fit=crop&q=60",
		description: "快手高級餐，分鐘搞定",
		ingredients: [
			"牛排 250g",
			"鹽 少許",
			"黑胡椒",
			"油 1湯匙"
		],
		steps: [
			"牛排室溫靜置",
			"熱鑊下油",
			"牛排煎2分鐘一面",
			"靜置3分鐘"
		],
		tips: "不要過度煮",
		nutritionHighlights: [
			"胡椒鹼、抗氧化、促進鐵吸收",
			"健康脂肪，提供能量",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者",
			"無麩質，適合麩質敏感人士"
		]
	},
	{
		id: "92",
		slug: "japanese-miso-soup",
		title: "日式味噌湯",
		titleEn: "Miso Soup",
		cuisine: "japanese",
		budget: 25,
		serves: 2,
		time: 8,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1585937421612-0f3c003ba2d4?w=400&auto=format&fit=crop&q=60",
		description: "清淡健康，每天早餐",
		ingredients: [
			"高湯 400ml",
			"味噌 1湯匙",
			"豆腐 100g",
			"海帶 1條"
		],
		steps: [
			"高湯煮滾",
			"加海帶",
			"加豆腐",
			"加味噌溶解即可"
		],
		tips: "勿煮滾以保營養",
		nutritionHighlights: [
			"礦物質、膠原蛋白、鮮味",
			"益生菌、礦物質、酶，助消化",
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"碘、甲狀腺支持、礦物質",
			"碘＋植物蛋白，甲狀腺支持"
		]
	},
	{
		id: "93",
		slug: "chinese-ginger-chicken",
		title: "薑母雞",
		titleEn: "Ginger Chicken",
		cuisine: "chinese",
		budget: 60,
		serves: 2,
		time: 20,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&auto=format&fit=crop&q=60",
		description: "溫暖驅寒，經典湯品",
		ingredients: [
			"雞 1隻",
			"薑 150g",
			"麻油 2湯匙",
			"水"
		],
		steps: [
			"薑切片",
			"麻油下鑊爆薑",
			"加雞肉炒香",
			"加水煮30分鐘"
		],
		tips: "冬天滋補必備",
		nutritionHighlights: [
			"蛋白質、維他命B6、硒",
			"薑辣素、抗氧化、助消化、驅寒",
			"芝麻油健康脂肪、維他命E、抗氧化",
			"低碳水有助血糖控制",
			"低碳適合減脂人士及糖尿病患者"
		]
	},
	{
		id: "94",
		slug: "hong-kong-mixed-vegetables",
		title: "港式雜菜炒",
		titleEn: "Hong Kong Mixed Vegetables",
		cuisine: "hong-kong",
		budget: 35,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60",
		description: "多彩健康，營養均衡",
		ingredients: [
			"西蘭花 100g",
			"紅蘿蔔 100g",
			"蘑菇 100g",
			"蒜 2瓣",
			"油 1湯匙"
		],
		steps: [
			"所有蔬菜切件",
			"蒜下鑊炒香",
			"加蔬菜快炒",
			"加鹽調味"
		],
		tips: "保持蔬菜爽身",
		nutritionHighlights: [
			"維他命C/K、纖維、抗氧化",
			"β-胡蘿蔔素、維他命A、纖維",
			"維他命D、硒、免疫支持",
			"大蒜素、免疫支持、心血管健康",
			"健康脂肪，提供能量"
		]
	},
	{
		id: "95",
		slug: "vietnamese-beef-salad",
		title: "越南牛肉沙律",
		titleEn: "Vietnamese Beef Salad",
		cuisine: "vietnamese",
		budget: 60,
		serves: 2,
		time: 15,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60",
		description: "酸辣爽口，清新開胃",
		ingredients: [
			"牛肉 250g",
			"生菜 150g",
			"薄荷 1束",
			"檸檬汁 2湯匙",
			"魚露 1湯匙"
		],
		steps: [
			"牛肉煮熟切片",
			"混合生菜薄荷",
			"淋檸檬汁魚露",
			"混合即可"
		],
		tips: "可冷食更爽口",
		nutritionHighlights: [
			"血紅素鐵、維他命B12、鋅、蛋白質",
			"維他命K/A、纖維、水分",
			"助消化、維他命A、芳香",
			"維他命C、促進鐵吸收",
			"蛋白質、碘、礦物質，少鹽更佳"
		]
	},
	{
		id: "96",
		slug: "british-fish-chips-alternative",
		title: "英式烤魚薯",
		titleEn: "Baked Fish and Vegetables",
		cuisine: "british",
		budget: 65,
		serves: 2,
		time: 20,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb"
		],
		image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&auto=format&fit=crop&q=60",
		description: "簡單家庭菜，低油健康",
		ingredients: [
			"白魚 300g",
			"蔬菜 200g",
			"橄欖油 2湯匙",
			"鹽及黑胡椒"
		],
		steps: [
			"蔬菜切件",
			"魚放焗盤",
			"淋橄欖油",
			"烤箱190°C烤15分鐘"
		],
		tips: "全家都喜歡",
		nutritionHighlights: [
			"優質蛋白質、Omega-3、維他命D，低脂肪",
			"多元維他命、纖維，抗氧化",
			"單元不飽和脂肪、心臟健康",
			"胡椒鹼、抗氧化、促進鐵吸收",
			"油有助脂溶性維他命（A/K）吸收"
		]
	},
	{
		id: "97",
		slug: "italian-grilled-vegetables",
		title: "意大利燒烤菜",
		titleEn: "Italian Grilled Vegetables",
		cuisine: "italian",
		budget: 30,
		serves: 2,
		time: 12,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60",
		description: "簡單快手，香氣十足",
		ingredients: [
			"蔬菜混合 300g",
			"橄欖油 2湯匙",
			"蒜 2瓣",
			"迷迭香"
		],
		steps: [
			"蔬菜切件",
			"淋橄欖油",
			"撒蒜迷迭香",
			"烤箱200°C烤12分鐘"
		],
		tips: "高溫快烤更香",
		nutritionHighlights: [
			"多元維他命、纖維，抗氧化",
			"單元不飽和脂肪、心臟健康",
			"大蒜素、免疫支持、心血管健康",
			"抗氧化、抗炎、記憶力支持",
			"油有助脂溶性維他命（A/K）吸收"
		]
	},
	{
		id: "98",
		slug: "french-dijon-pork",
		title: "法式第戎豬肉",
		titleEn: "French Dijon Pork",
		cuisine: "french",
		budget: 70,
		serves: 2,
		time: 18,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1618958536149-5a3b3d3f7d5c?w=400&auto=format&fit=crop&q=60",
		description: "香料醬豬肉，軟嫩多汁",
		ingredients: [
			"豬肉 300g",
			"第戎芥末 2湯匙",
			"檸檬汁 1湯匙",
			"蒜 2瓣"
		],
		steps: [
			"豬肉混合醬料",
			"醃20分鐘",
			"烤箱200°C烤15分鐘"
		],
		tips: "切後保持多汁",
		nutritionHighlights: [
			"蛋白質、維他命B1、鋅",
			"抗氧化、促進消化",
			"維他命C、促進鐵吸收",
			"大蒜素、免疫支持、心血管健康",
			"低碳水有助血糖控制"
		]
	},
	{
		id: "99",
		slug: "korean-kimchi-tofu",
		title: "韓式泡菜豆腐",
		titleEn: "Korean Kimchi Tofu",
		cuisine: "korean",
		budget: 40,
		serves: 2,
		time: 10,
		difficulty: "easy",
		dietary: [
			"diabetic-friendly",
			"low-carb",
			"gluten-free"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
		description: "發酵香辣，快手下飯",
		ingredients: [
			"豆腐 1磚",
			"泡菜 100g",
			"油 1湯匙",
			"蒜蓉 1茶匙"
		],
		steps: [
			"豆腐切塊",
			"泡菜切碎",
			"蒜下鑊炒香",
			"加豆腐泡菜炒",
			"加鹽調味"
		],
		tips: "泡菜帶鹹味不要加太多鹽",
		nutritionHighlights: [
			"優質植物蛋白、異黃酮、鈣質，含鎂及鐵",
			"益生菌、消化健康、維他命K",
			"健康脂肪，提供能量",
			"大蒜素、免疫支持、心血管健康",
			"蒜有助提升免疫力，蛋白質互補"
		]
	},
	{
		id: "100",
		slug: "taiwanese-oyster-omelette",
		title: "台式蚵仔煎",
		titleEn: "Oyster Omelette",
		cuisine: "taiwanese",
		budget: 85,
		serves: 2,
		time: 12,
		difficulty: "medium",
		dietary: [
			"diabetic-friendly",
			"low-carb"
		],
		image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
		description: "鮮香軟滑，台灣小食",
		ingredients: [
			"蚵仔 150g",
			"蛋 2隻",
			"蔥 1條",
			"油 2湯匙"
		],
		steps: [
			"蔥切段",
			"蛋打散",
			"蚵仔混合蛋液",
			"熱鑊下油倒蛋液",
			"煎至邊緣焦脆"
		],
		tips: "邊緣焦脆中間軟滑",
		nutritionHighlights: [
			"鋅、鐵、維他命B12，生津護血",
			"維他命A/D/B12、膽鹼、蛋白質",
			"維他命C、纖維、抗氧化",
			"健康脂肪，提供能量",
			"鋅含量極高，提升免疫力"
		]
	}
];
const recipesData = {
	recipes: recipes
};

export { $$Layout as $, $$Image as a, getTimeLabel as b, cuisines as c, dietaryOptions as d, getCuisineName as g, recipesData as r, servingOptions as s, timeOptions as t };

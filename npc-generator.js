(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.DriftNpcPack = api;
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { api.mount(); });
    } else {
      api.mount();
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const MAX_SKINS = 80;
  const PLAYER_VARIANT = 60;
  const MAX_PNG_BYTES = 2 * 1024 * 1024;

  const PLAYER_GEOMETRY_TEXT = "{\n\t\"format_version\": \"1.16.0\",\n\t\"minecraft:geometry\": [\n\t\t{\n\t\t\t\"description\": {\n\t\t\t\t\"identifier\": \"geometry.retack_npc\",\n\t\t\t\t\"texture_width\": 64,\n\t\t\t\t\"texture_height\": 64,\n\t\t\t\t\"visible_bounds_width\": 3,\n\t\t\t\t\"visible_bounds_height\": 3,\n\t\t\t\t\"visible_bounds_offset\": [0, 1.5, 0]\n\t\t\t},\n\t\t\t\"bones\": [\n\t\t\t\t{ \"name\": \"root\", \"pivot\": [0.0, 0.0, 0.0] },\n\t\t\t\t{ \"name\": \"waist\", \"parent\": \"root\", \"pivot\": [0.0, 12.0, 0.0] },\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"body\",\n\t\t\t\t\t\"parent\": \"waist\",\n\t\t\t\t\t\"pivot\": [0.0, 24.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [-4.0, 12.0, -2.0],\n\t\t\t\t\t\t\t\"size\": [8, 12, 4],\n\t\t\t\t\t\t\t\"uv\": [16, 16]\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"jacket\",\n\t\t\t\t\t\"parent\": \"body\",\n\t\t\t\t\t\"pivot\": [0.0, 24.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [-4.0, 12.0, -2.0],\n\t\t\t\t\t\t\t\"size\": [8, 12, 4],\n\t\t\t\t\t\t\t\"uv\": [16, 32],\n\t\t\t\t\t\t\t\"inflate\": 0.25\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"head\",\n\t\t\t\t\t\"parent\": \"body\",\n\t\t\t\t\t\"pivot\": [0.0, 24.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [-4.0, 24.0, -4.0],\n\t\t\t\t\t\t\t\"size\": [8, 8, 8],\n\t\t\t\t\t\t\t\"uv\": [0, 0]\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"hat\",\n\t\t\t\t\t\"parent\": \"head\",\n\t\t\t\t\t\"pivot\": [0.0, 24.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [-4.0, 24.0, -4.0],\n\t\t\t\t\t\t\t\"size\": [8, 8, 8],\n\t\t\t\t\t\t\t\"uv\": [32, 0],\n\t\t\t\t\t\t\t\"inflate\": 0.5\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"leftarm\",\n\t\t\t\t\t\"parent\": \"body\",\n\t\t\t\t\t\"pivot\": [5.0, 22.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [4.0, 12.0, -2.0],\n\t\t\t\t\t\t\t\"size\": [4, 12, 4],\n\t\t\t\t\t\t\t\"uv\": [32, 48]\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"leftSleeve\",\n\t\t\t\t\t\"parent\": \"leftarm\",\n\t\t\t\t\t\"pivot\": [5.0, 22.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [4.0, 12.0, -2.0],\n\t\t\t\t\t\t\t\"size\": [4, 12, 4],\n\t\t\t\t\t\t\t\"uv\": [48, 48],\n\t\t\t\t\t\t\t\"inflate\": 0.25\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"leftitem\",\n\t\t\t\t\t\"parent\": \"leftarm\",\n\t\t\t\t\t\"pivot\": [6.0, 15.0, 1.0],\n\t\t\t\t\t\"locators\": {\n\t\t\t\t\t\t\"leftitem\": [6.0, 15.0, 1.0]\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"rightarm\",\n\t\t\t\t\t\"parent\": \"body\",\n\t\t\t\t\t\"pivot\": [-5.0, 22.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [-8.0, 12.0, -2.0],\n\t\t\t\t\t\t\t\"size\": [4, 12, 4],\n\t\t\t\t\t\t\t\"uv\": [40, 16]\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"rightSleeve\",\n\t\t\t\t\t\"parent\": \"rightarm\",\n\t\t\t\t\t\"pivot\": [-5.0, 22.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [-8.0, 12.0, -2.0],\n\t\t\t\t\t\t\t\"size\": [4, 12, 4],\n\t\t\t\t\t\t\t\"uv\": [40, 32],\n\t\t\t\t\t\t\t\"inflate\": 0.25\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"rightitem\",\n\t\t\t\t\t\"parent\": \"rightarm\",\n\t\t\t\t\t\"pivot\": [-6, 15, 1],\n\t\t\t\t\t\"locators\": {\n\t\t\t\t\t\t\"lead_hold\": [-6, 15, 1],\n\t\t\t\t\t\t\"rightitem\": [-6, 15, 1]\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"leftleg\",\n\t\t\t\t\t\"parent\": \"root\",\n\t\t\t\t\t\"pivot\": [1.9, 12.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [-0.1, 0.0, -2.0],\n\t\t\t\t\t\t\t\"size\": [4, 12, 4],\n\t\t\t\t\t\t\t\"uv\": [16, 48]\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"leftPants\",\n\t\t\t\t\t\"parent\": \"leftleg\",\n\t\t\t\t\t\"pivot\": [1.9, 12.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [-0.1, 0.0, -2.0],\n\t\t\t\t\t\t\t\"size\": [4, 12, 4],\n\t\t\t\t\t\t\t\"uv\": [0, 48],\n\t\t\t\t\t\t\t\"inflate\": 0.25\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"rightleg\",\n\t\t\t\t\t\"parent\": \"root\",\n\t\t\t\t\t\"pivot\": [-1.9, 12.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [-3.9, 0.0, -2.0],\n\t\t\t\t\t\t\t\"size\": [4, 12, 4],\n\t\t\t\t\t\t\t\"uv\": [0, 16]\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"name\": \"rightPants\",\n\t\t\t\t\t\"parent\": \"rightleg\",\n\t\t\t\t\t\"pivot\": [-1.9, 12.0, 0.0],\n\t\t\t\t\t\"cubes\": [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\"origin\": [-3.9, 0.0, -2.0],\n\t\t\t\t\t\t\t\"size\": [4, 12, 4],\n\t\t\t\t\t\t\t\"uv\": [0, 32],\n\t\t\t\t\t\t\t\"inflate\": 0.25\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n}\n";

  // Vanilla NPC picker order from the Drift Duels npc entity. Player skins are appended after 59.
  const VANILLA_PICKER = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    20, 21, 22, 23, 24,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
    50, 51, 52, 53, 54,
    45, 46, 47, 48, 49,
    55, 56, 57, 58, 59
  ];

  const VANILLA_TEXTURES = [
    "npc_1", "npc_2", "npc_3", "npc_4", "npc_5", "npc_6", "npc_7", "npc_8", "npc_9", "npc_10",
    "npc_scientist_1", "npc_scientist_2", "npc_scientist_3", "npc_scientist_4", "npc_scientist_5",
    "npc_scientist_6", "npc_scientist_7", "npc_scientist_8", "npc_scientist_9", "npc_scientist_10",
    "npc_apiary_1", "npc_apiary_2", "npc_apiary_3", "npc_apiary_4", "npc_apiary_5",
    "npc_teacher_1", "npc_teacher_2", "npc_teacher_3", "npc_teacher_4", "npc_teacher_5",
    "npc_construction_1", "npc_construction_2", "npc_construction_3", "npc_construction_4", "npc_construction_5",
    "npc_Agriculture_1", "npc_Agriculture_2", "npc_Agriculture_3", "npc_Agriculture_4", "npc_Agriculture_5",
    "npc_Agriculture_6", "npc_Agriculture_7", "npc_Agriculture_8", "npc_Agriculture_9", "npc_Agriculture_10",
    "npc_BusinessMobs_1", "npc_BusinessMobs_2", "npc_BusinessMobs_3", "npc_BusinessMobs_4", "npc_BusinessMobs_5",
    "npc_EverydayBusiness_1", "npc_EverydayBusiness_2", "npc_EverydayBusiness_3", "npc_EverydayBusiness_4", "npc_EverydayBusiness_5",
    "npc_Kiosk_1", "npc_Kiosk_2", "npc_Kiosk_3", "npc_Kiosk_4", "npc_Kiosk_5"
  ];

  const PNG_SIG = [137, 80, 78, 71, 13, 10, 26, 10];
  const CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    let c = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }

  function concat(parts) {
    let length = 0;
    for (const part of parts) length += part.length;
    const out = new Uint8Array(length);
    let offset = 0;
    for (const part of parts) {
      out.set(part, offset);
      offset += part.length;
    }
    return out;
  }

  function u16(value) {
    return Uint8Array.of(value & 255, (value >> 8) & 255);
  }

  function u32(value) {
    return Uint8Array.of(value & 255, (value >> 8) & 255, (value >> 16) & 255, (value >> 24) & 255);
  }

  function dosStamp(date) {
    const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
    const day = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
    return { time, day };
  }

  function zipStore(files) {
    const stamp = dosStamp(new Date());
    const locals = [];
    const centrals = [];
    let offset = 0;
    for (const file of files) {
      const name = new TextEncoder().encode(file.path);
      const data = file.data;
      const crc = crc32(data);
      const local = concat([
        u32(0x04034b50),
        u16(20),
        u16(0x0800),
        u16(0),
        u16(stamp.time),
        u16(stamp.day),
        u32(crc),
        u32(data.length),
        u32(data.length),
        u16(name.length),
        u16(0),
        name,
        data
      ]);
      const central = concat([
        u32(0x02014b50),
        u16(20),
        u16(20),
        u16(0x0800),
        u16(0),
        u16(stamp.time),
        u16(stamp.day),
        u32(crc),
        u32(data.length),
        u32(data.length),
        u16(name.length),
        u16(0),
        u16(0),
        u16(0),
        u16(0),
        u32(0),
        u32(offset),
        name
      ]);
      locals.push(local);
      centrals.push(central);
      offset += local.length;
    }
    const centralDir = concat(centrals);
    const end = concat([
      u32(0x06054b50),
      u16(0),
      u16(0),
      u16(files.length),
      u16(files.length),
      u32(centralDir.length),
      u32(offset),
      u16(0)
    ]);
    return concat([...locals, centralDir, end]);
  }

  function isPng(bytes) {
    if (!bytes || bytes.length < 24) return false;
    for (let i = 0; i < PNG_SIG.length; i++) {
      if (bytes[i] !== PNG_SIG[i]) return false;
    }
    return true;
  }

  function pngSize(bytes) {
    if (!isPng(bytes)) return null;
    const width = (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19];
    const height = (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23];
    return { width: width >>> 0, height: height >>> 0 };
  }

  function standardSkin(size) {
    if (!size) return false;
    const key = size.width + "x" + size.height;
    return key === "64x32" || key === "64x64" || key === "128x64" || key === "128x128";
  }

  function cleanName(name) {
    return String(name || "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, 40);
  }

  function fileBase(name) {
    const clean = cleanName(name).replace(/[<>:"/\\|?*]/g, "").replace(/\.+$/g, "").trim();
    return clean || "";
  }

  function jsonBytes(value) {
    return new TextEncoder().encode(JSON.stringify(value, null, 2) + "\n");
  }

  function hexByte(value) {
    return value.toString(16).padStart(2, "0");
  }

  function namedUuid(salt) {
    const words = [0x811c9dc5, 0x811c9dc5 ^ 0x9e3779b9, 0x6a09e667, 0xbb67ae85];
    for (let i = 0; i < salt.length; i++) {
      const code = salt.charCodeAt(i);
      for (let w = 0; w < 4; w++) {
        words[w] = Math.imul(words[w] ^ (code + w * 17 + i), 0x01000193);
      }
    }
    const bytes = new Uint8Array(16);
    for (let w = 0; w < 4; w++) {
      const value = words[w] >>> 0;
      bytes[w * 4] = value & 255;
      bytes[w * 4 + 1] = (value >>> 8) & 255;
      bytes[w * 4 + 2] = (value >>> 16) & 255;
      bytes[w * 4 + 3] = (value >>> 24) & 255;
    }
    bytes[6] = (bytes[6] & 0x0f) | 0x50;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, hexByte).join("");
    return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-" + hex.slice(12, 16) + "-" + hex.slice(16, 20) + "-" + hex.slice(20);
  }

  function cleanDescription(value) {
    return String(value || "").replace(/[\u0000-\u001f]/g, " ").replace(/ +/g, " ").trim().slice(0, 240);
  }

  const PACK_ICON_B64 = "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";

  function packIconPng() {
    const binary = atob(PACK_ICON_B64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  function textureRefs(count) {
    const refs = VANILLA_TEXTURES.map(function (name) { return "Texture." + name; });
    for (let i = 1; i <= count; i++) refs.push("Texture.player_" + i);
    return refs;
  }

  function behaviorEntity(variants) {
    return {
      format_version: "1.26.0",
      "minecraft:entity": {
        description: {
          identifier: "minecraft:npc",
          is_experimental: false,
          is_summonable: true,
          is_spawnable: true,
          spawn_category: "creature"
        },
        components: {
          "minecraft:behavior.look_at_player": {
            look_time: { min: 1, max: 2 },
            look_distance: 6
          },
          "minecraft:collision_box": { height: 2.1, width: 0.6 },
          "minecraft:damage_sensor": {
            triggers: { cause: "all", deals_damage: "no" }
          },
          "minecraft:fire_immune": {},
          "minecraft:loot": { table: "loot_tables/empty.json" },
          "minecraft:movement": { value: 0.5 },
          "minecraft:nameable": { allow_name_tag_renaming: false, always_show: false },
          "minecraft:npc": {
            npc_data: {
              picker_offsets: { scale: [1.7, 1.7, 1.7], translate: [0, 20, 0] },
              portrait_offsets: { scale: [1.75, 1.75, 1.75], translate: [-7, 50, 0] },
              skin_list: variants.map(function (variant) { return { variant: variant }; })
            }
          },
          "minecraft:persistent": {},
          "minecraft:physics": {},
          "minecraft:type_family": { family: ["npc", "mob"] }
        },
        events: null
      }
    };
  }

  function clientEntity(count) {
    const textures = {};
    VANILLA_TEXTURES.forEach(function (name) {
      textures[name] = "textures/entity/npc/" + name;
    });
    for (let i = 1; i <= count; i++) {
      textures["player_" + i] = "textures/entity/npc/player_" + i;
    }
    return {
      format_version: "1.10.0",
      "minecraft:client_entity": {
        description: {
          identifier: "minecraft:npc",
          materials: { default: "npc", player: "entity_alphatest" },
          textures: textures,
          geometry: {
            default: "geometry.npc",
            player: "geometry.retack_npc",
            slim: "geometry.retack_npc_slim"
          },
          scripts: {
            animate: [
              { general: "query.variant < 60" },
              { move: "query.variant < 60 && query.modified_move_speed" },
              "look_at_target",
              { baby_transform: "query.is_baby" }
            ]
          },
          animations: {
            general: "animation.npc.general",
            look_at_target: "animation.common.look_at_target",
            move: "animation.npc.move",
            baby_transform: "animation.npc.baby_transform"
          },
          render_controllers: [
            { "controller.render.npc": "query.variant < 60" },
            { "controller.render.npc_player": "query.variant >= 60" }
          ],
          spawn_egg: { texture: "spawn_egg", texture_index: 35 }
        }
      }
    };
  }

  function shiftSlimPoint(bone, x) {
    if (bone.pivot) bone.pivot[0] = x;
    if (!bone.locators) return;
    Object.keys(bone.locators).forEach(function (name) {
      if (bone.locators[name]) bone.locators[name][0] = x;
    });
  }

  function slimGeometryText(wideText) {
    const data = JSON.parse(wideText);
    const model = data["minecraft:geometry"][0];
    model.description.identifier = "geometry.retack_npc_slim";
    model.bones.forEach(function (bone) {
      const right = bone.name === "rightarm" || bone.name === "rightSleeve";
      const arm = right || bone.name === "leftarm" || bone.name === "leftSleeve";
      if (arm && bone.cubes) {
        bone.cubes.forEach(function (cube) {
          if (cube.size && cube.size[0] === 4) cube.size[0] = 3;
          if (right && cube.origin && cube.origin[0] === -8) cube.origin[0] = -7;
        });
      }
      if (bone.name === "leftitem") shiftSlimPoint(bone, 5.5);
      if (bone.name === "rightitem") shiftSlimPoint(bone, -5.5);
    });
    return JSON.stringify(data);
  }

  function renderControllers(slimFlags) {
    const skins = textureRefs(slimFlags.length);
    const models = [];
    for (let i = 0; i < VANILLA_TEXTURES.length; i++) models.push("Geometry.player");
    slimFlags.forEach(function (slim) {
      models.push(slim ? "Geometry.slim" : "Geometry.player");
    });
    return {
      format_version: "1.8.0",
      render_controllers: {
        "controller.render.npc": {
          arrays: { textures: { "Array.skins": skins } },
          geometry: "Geometry.default",
          part_visibility: [{
            "*": false,
            head: true,
            hat: true,
            nose: true,
            body: true,
            arms: true,
            leg0: true,
            leg1: true,
            jacket: true
          }],
          materials: [{ "*": "Material.default" }],
          textures: ["Array.skins[query.variant]"]
        },
        "controller.render.npc_player": {
          arrays: {
            textures: { "Array.skins": skins.slice() },
            geometries: { "Array.models": models }
          },
          geometry: "Array.models[query.variant]",
          materials: [{ "*": "Material.player" }],
          textures: ["Array.skins[query.variant]"]
        }
      }
    };
  }

  function manifest(name, description, headerUuid, moduleUuid, moduleType, dependencyUuid) {
    return {
      format_version: 2,
      metadata: { authors: ["Drift PVP"] },
      header: {
        name: name,
        description: description,
        min_engine_version: [1, 26, 0],
        uuid: headerUuid,
        version: [1, 0, 0]
      },
      modules: [{
        type: moduleType,
        uuid: moduleUuid,
        version: [1, 0, 0]
      }],
      dependencies: [{ uuid: dependencyUuid, version: [1, 0, 0] }]
    };
  }

  async function buildMcaddon(options) {
    const name = cleanName(options && options.name);
    const base = fileBase(name);
    const skins = (options && options.skins) || [];
    if (!name || !base) throw new Error("Enter a pack name.");
    if (!skins.length) throw new Error("Add at least one skin PNG.");
    if (skins.length > MAX_SKINS) throw new Error("You can add " + MAX_SKINS + " skins.");
    skins.forEach(function (skin, index) {
      const bytes = skin.bytes || skin;
      if (!isPng(bytes)) throw new Error("Skin " + (index + 1) + " is not a PNG.");
      if (bytes.length > MAX_PNG_BYTES) throw new Error("Skin " + (index + 1) + " is over 2 MB.");
    });
    const geometryText = (options && options.geometryText) || PLAYER_GEOMETRY_TEXT;
    let geometry;
    try {
      geometry = JSON.parse(geometryText);
    } catch (error) {
      throw new Error("Player model could not be read.");
    }
    const identifier = geometry && geometry["minecraft:geometry"] && geometry["minecraft:geometry"][0] && geometry["minecraft:geometry"][0].description && geometry["minecraft:geometry"][0].description.identifier;
    if (identifier !== "geometry.retack_npc") throw new Error("Player model is missing.");

    const slimFlags = skins.map(function (skin) { return Boolean(skin && skin.slim); });
    const variants = VANILLA_PICKER.concat(skins.map(function (_, index) {
      return PLAYER_VARIANT + index;
    }));
    const bpHeader = namedUuid(name + "\nbp-header");
    const bpModule = namedUuid(name + "\nbp-module");
    const rpHeader = namedUuid(name + "\nrp-header");
    const rpModule = namedUuid(name + "\nrp-module");
    const skinNote = skins.length + " player skin" + (skins.length === 1 ? "" : "s");
    const customDescription = cleanDescription(options && options.description);
    const bpDescription = customDescription || ("NPC behavior pack. " + skinNote + " are added at the end of the skin list.");
    const rpDescription = customDescription || ("NPC texture pack. " + skinNote + " use the player model.");
    const bpDir = base + " BP/";
    const rpDir = base + " RP/";
    const files = [
      {
        path: bpDir + "manifest.json",
        data: jsonBytes(manifest(
          name,
          bpDescription,
          bpHeader,
          bpModule,
          "data",
          rpHeader
        ))
      },
      { path: bpDir + "entities/npc.json", data: jsonBytes(behaviorEntity(variants)) },
      {
        path: rpDir + "manifest.json",
        data: jsonBytes(manifest(
          name,
          rpDescription,
          rpHeader,
          rpModule,
          "resources",
          bpHeader
        ))
      },
      { path: rpDir + "entity/npc.entity.json", data: jsonBytes(clientEntity(skins.length)) },
      { path: rpDir + "render_controllers/npc.render_controllers.json", data: jsonBytes(renderControllers(slimFlags)) },
      { path: rpDir + "models/entity/retack_npc.geo.json", data: new TextEncoder().encode(geometryText) },
      { path: rpDir + "models/entity/retack_npc_slim.geo.json", data: new TextEncoder().encode(slimGeometryText(geometryText)) }
    ];
    const icon = (options && options.iconPng && isPng(options.iconPng)) ? options.iconPng : packIconPng();
    files.push({ path: bpDir + "pack_icon.png", data: icon });
    files.push({ path: rpDir + "pack_icon.png", data: icon });
    skins.forEach(function (skin, index) {
      files.push({
        path: rpDir + "textures/entity/npc/player_" + (index + 1) + ".png",
        data: skin.bytes || skin
      });
    });
    return {
      filename: base + ".mcaddon",
      bytes: zipStore(files),
      behaviorUuid: bpHeader,
      resourceUuid: rpHeader
    };
  }

  function mount() {
    const root = document.getElementById("npc-generator");
    if (!root || root.dataset.ready === "1") return;
    root.dataset.ready = "1";

    const nameInput = document.getElementById("npc-pack-name");
    const descInput = document.getElementById("npc-pack-desc");
    const fileInput = document.getElementById("npc-files");
    const drop = document.getElementById("npc-drop");
    const list = document.getElementById("npc-skin-list");
    const count = document.getElementById("npc-count");
    const status = document.getElementById("npc-status");
    const button = document.getElementById("npc-download");
    const skins = [];
    let dragId = null;
    let adding = false;

    function setStatus(message, isError) {
      status.textContent = message || "";
      status.classList.toggle("is-error", Boolean(isError));
    }

    function refresh() {
      count.textContent = String(skins.length);
      button.disabled = skins.length === 0 || !cleanName(nameInput.value);
      list.innerHTML = skins.map(function (skin, index) {
        const warn = skin.warning ? '<span class="skin-warn">' + escapeText(skin.warning) + "</span>" : "";
        return (
          '<li class="skin-item" draggable="true" data-id="' + skin.id + '">' +
            '<img src="' + skin.url + '" alt="" width="48" height="48" draggable="false">' +
            '<span class="skin-meta">' +
              '<strong>player_' + (index + 1) + '</strong>' +
              '<span>' + escapeText(skin.fileName) + "</span>" +
              warn +
            "</span>" +
            '<span class="skin-actions">' +
              '<label class="slim-toggle" title="Slim arms">' +
                '<input class="slim-input" type="checkbox"' + (skin.slim ? " checked" : "") + ">" +
                "<span>Slim</span>" +
              "</label>" +
              '<button type="button" class="skin-remove" aria-label="Remove ' + escapeText(skin.fileName) + '">Remove</button>' +
            "</span>" +
          "</li>"
        );
      }).join("");
    }

    function escapeText(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    async function addFiles(fileList) {
      const incoming = Array.from(fileList || []);
      if (!incoming.length || adding) return;
      adding = true;
      let skipped = 0;
      let added = 0;
      try {
      for (const file of incoming) {
        if (skins.length >= MAX_SKINS) {
          skipped += 1;
          continue;
        }
        const lower = file.name.toLowerCase();
        if (file.type && file.type !== "image/png" && !lower.endsWith(".png")) {
          skipped += 1;
          continue;
        }
        if (file.size > MAX_PNG_BYTES) {
          skipped += 1;
          continue;
        }
        const bytes = new Uint8Array(await file.arrayBuffer());
        if (!isPng(bytes)) {
          skipped += 1;
          continue;
        }
        const size = pngSize(bytes);
        skins.push({
          id: crypto.randomUUID(),
          fileName: file.name,
          bytes: bytes,
          url: URL.createObjectURL(file),
          warning: standardSkin(size) ? "" : "Unusual size " + size.width + "×" + size.height,
          slim: false
        });
        added += 1;
      }
      refresh();
      if (skipped && added) setStatus("Added " + added + ". Skipped " + skipped + ".", true);
      else if (skipped) setStatus(skins.length >= MAX_SKINS ? "Max is 80 skins." : "Only PNG skins can be added.", true);
      else setStatus("Added " + added + " skin" + (added === 1 ? "" : "s") + ".");
      } finally {
        adding = false;
      }
    }

    nameInput.addEventListener("input", function () {
      refresh();
      if (status.classList.contains("is-error") && cleanName(nameInput.value)) setStatus("");
    });

    fileInput.addEventListener("change", function () {
      const files = Array.from(fileInput.files || []);
      fileInput.value = "";
      addFiles(files);
    });

    ["dragenter", "dragover"].forEach(function (type) {
      drop.addEventListener(type, function (event) {
        event.preventDefault();
        drop.classList.add("is-over");
      });
    });
    drop.addEventListener("dragleave", function () {
      drop.classList.remove("is-over");
    });
    drop.addEventListener("drop", function (event) {
      event.preventDefault();
      event.stopPropagation();
      drop.classList.remove("is-over");
      addFiles(event.dataTransfer && event.dataTransfer.files);
    });

    list.addEventListener("change", function (event) {
      const input = event.target.closest(".slim-input");
      if (!input) return;
      const item = input.closest(".skin-item");
      const skin = skins.find(function (entry) { return entry.id === item.dataset.id; });
      if (skin) skin.slim = input.checked;
    });

    list.addEventListener("click", function (event) {
      const buttonHit = event.target.closest(".skin-remove");
      if (!buttonHit) return;
      const item = buttonHit.closest(".skin-item");
      const index = skins.findIndex(function (skin) { return skin.id === item.dataset.id; });
      if (index < 0) return;
      URL.revokeObjectURL(skins[index].url);
      skins.splice(index, 1);
      refresh();
      setStatus("");
    });

    list.addEventListener("dragstart", function (event) {
      if (event.target.closest(".skin-actions")) {
        event.preventDefault();
        return;
      }
      const item = event.target.closest(".skin-item");
      if (!item) return;
      dragId = item.dataset.id;
      event.dataTransfer.effectAllowed = "move";
    });
    list.addEventListener("dragover", function (event) {
      if (!dragId || !event.target.closest(".skin-item")) return;
      event.preventDefault();
    });
    list.addEventListener("drop", function (event) {
      const item = event.target.closest(".skin-item");
      if (!item || !dragId) return;
      event.preventDefault();
      const from = skins.findIndex(function (skin) { return skin.id === dragId; });
      const to = skins.findIndex(function (skin) { return skin.id === item.dataset.id; });
      dragId = null;
      if (from < 0 || to < 0 || from === to) return;
      const [moved] = skins.splice(from, 1);
      skins.splice(to, 0, moved);
      refresh();
    });

    button.addEventListener("click", async function () {
      const name = cleanName(nameInput.value);
      if (!name || !fileBase(name)) {
        setStatus("Enter a pack name.", true);
        nameInput.focus();
        return;
      }
      if (!skins.length) {
        setStatus("Add at least one skin PNG.", true);
        return;
      }
      button.disabled = true;
      setStatus("Building pack...");
      try {
        const pack = await buildMcaddon({
          name: name,
          description: descInput ? descInput.value : "",
          skins: skins.map(function (skin) { return { bytes: skin.bytes, slim: skin.slim }; })
        });
        const blob = new Blob([pack.bytes], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = pack.filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
        setStatus("Downloaded " + pack.filename + ".");
      } catch (error) {
        setStatus(error.message || "Could not build the pack.", true);
      }
      refresh();
    });

    refresh();
  }

  return {
    MAX_SKINS: MAX_SKINS,
    PLAYER_VARIANT: PLAYER_VARIANT,
    VANILLA_PICKER: VANILLA_PICKER,
    VANILLA_TEXTURES: VANILLA_TEXTURES,
    isPng: isPng,
    pngSize: pngSize,
    buildMcaddon: buildMcaddon,
    mount: mount
  };
});

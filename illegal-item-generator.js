(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.DriftIllegalItems = api;
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { api.mount(); });
    } else {
      api.mount();
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const MAX_ITEMS = 30;
  const MAX_LEVEL = 255;
  const BLOCK_VERSION = 18168865;

  const ITEMS = [["acacia_boat","Acacia Boat"],["acacia_chest_boat","Acacia Boat with Chest"],["acacia_button","Acacia Button"],["acacia_door","Acacia Door"],["acacia_double_slab","Acacia Double Slab"],["acacia_fence","Acacia Fence"],["acacia_fence_gate","Acacia Fence Gate"],["acacia_hanging_sign","Acacia Hanging Sign"],["acacia_leaves","Acacia Leaves"],["acacia_log","Acacia Log"],["acacia_planks","Acacia Planks"],["acacia_pressure_plate","Acacia Pressure Plate"],["acacia_sapling","Acacia Sapling"],["acacia_shelf","Acacia Shelf"],["acacia_sign","Acacia Sign"],["acacia_standing_sign","Acacia Sign"],["acacia_slab","Acacia Slab"],["acacia_stairs","Acacia Stairs"],["acacia_trapdoor","Acacia Trapdoor"],["acacia_wall_sign","Acacia Wall Sign"],["acacia_wood","Acacia Wood"],["element_89","Actinium"],["activator_rail","Activator Rail"],["agent_spawn_egg","Agent Spawn Egg"],["allay_spawn_egg","Allay Spawn Egg"],["allium","Allium"],["allow","Allow"],["element_13","Aluminum"],["element_95","Americium"],["amethyst_cluster","Amethyst Cluster"],["amethyst_shard","Amethyst Shard"],["ancient_debris","Ancient Debris"],["andesite","Andesite"],["andesite_double_slab","Andesite Double Slab"],["andesite_slab","Andesite Slab"],["andesite_stairs","Andesite Stairs"],["andesite_wall","Andesite Wall"],["angler_pottery_sherd","Angler Pottery Sherd"],["element_51","Antimony"],["anvil","Anvil"],["deprecated_anvil","Anvil"],["apple","Apple"],["archer_pottery_sherd","Archer Pottery Sherd"],["element_18","Argon"],["armadillo_scute","Armadillo Scute"],["armadillo_spawn_egg","Armadillo Spawn Egg"],["armor_stand","Armor Stand"],["arms_up_pottery_sherd","Arms Up Pottery Sherd"],["arrow","Arrow"],["element_33","Arsenic"],["element_85","Astatine"],["axolotl_spawn_egg","Axolotl Spawn Egg"],["azalea","Azalea"],["azalea_leaves","Azalea Leaves"],["azure_bluet","Azure Bluet"],["baked_potato","Baked Potato"],["bamboo","Bamboo"],["bamboo_button","Bamboo Button"],["bamboo_door","Bamboo Door"],["bamboo_double_slab","Bamboo Double Slab"],["bamboo_fence","Bamboo Fence"],["bamboo_fence_gate","Bamboo Fence Gate"],["bamboo_hanging_sign","Bamboo Hanging Sign"],["bamboo_mosaic","Bamboo Mosaic"],["bamboo_mosaic_double_slab","Bamboo Mosaic Double Slab"],["bamboo_mosaic_slab","Bamboo Mosaic Slab"],["bamboo_mosaic_stairs","Bamboo Mosaic Stairs"],["bamboo_planks","Bamboo Planks"],["bamboo_pressure_plate","Bamboo Pressure Plate"],["bamboo_raft","Bamboo Raft"],["bamboo_chest_raft","Bamboo Raft with Chest"],["bamboo_sapling","Bamboo Sapling"],["bamboo_shelf","Bamboo Shelf"],["bamboo_sign","Bamboo Sign"],["bamboo_standing_sign","Bamboo Sign"],["bamboo_slab","Bamboo Slab"],["bamboo_stairs","Bamboo Stairs"],["bamboo_trapdoor","Bamboo Trapdoor"],["bamboo_wall_sign","Bamboo Wall Sign"],["standing_banner","Banner"],["banner_pattern","Banner Pattern"],["element_56","Barium"],["barrel","Barrel"],["barrier","Barrier"],["basalt","Basalt"],["bat_spawn_egg","Bat Spawn Egg"],["beacon","Beacon"],["bedrock","Bedrock"],["bee_nest","Bee Nest"],["bee_spawn_egg","Bee Spawn Egg"],["beehive","Beehive"],["beetroot","Beetroot"],["beetroot_seeds","Beetroot Seeds"],["beetroot_soup","Beetroot Soup"],["bell","Bell"],["element_97","Berkelium"],["element_4","Beryllium"],["big_dripleaf","Big Dripleaf"],["birch_boat","Birch Boat"],["birch_chest_boat","Birch Boat with Chest"],["birch_button","Birch Button"],["birch_door","Birch Door"],["birch_double_slab","Birch Double Slab"],["birch_fence","Birch Fence"],["birch_fence_gate","Birch Fence Gate"],["birch_hanging_sign","Birch Hanging Sign"],["birch_leaves","Birch Leaves"],["birch_log","Birch Log"],["birch_planks","Birch Planks"],["birch_pressure_plate","Birch Pressure Plate"],["birch_sapling","Birch Sapling"],["birch_shelf","Birch Shelf"],["birch_sign","Birch Sign"],["birch_standing_sign","Birch Sign"],["birch_slab","Birch Slab"],["birch_stairs","Birch Stairs"],["birch_trapdoor","Birch Trapdoor"],["birch_wall_sign","Birch Wall Sign"],["birch_wood","Birch Wood"],["element_83","Bismuth"],["banner","Black Banner"],["black_bundle","Black Bundle"],["black_candle","Black Candle"],["black_carpet","Black Carpet"],["black_concrete","Black Concrete"],["black_concrete_double_slab","Black Concrete Double Slab"],["black_concrete_powder","Black Concrete Powder"],["black_concrete_slab","Black Concrete Slab"],["black_concrete_stairs","Black Concrete Stairs"],["black_cushion","Black Cushion"],["black_dye","Black Dye"],["black_glazed_terracotta","Black Glazed Terracotta"],["black_harness","Black Harness"],["black_shulker_box","Black Shulker Box"],["black_stained_glass","Black Stained Glass"],["black_stained_glass_pane","Black Stained Glass Pane"],["black_terracotta","Black Terracotta"],["black_wool","Black Wool"],["black_wool_double_slab","Black Wool Double Slab"],["black_wool_slab","Black Wool Slab"],["black_wool_stairs","Black Wool Stairs"],["blackstone","Blackstone"],["blackstone_double_slab","Blackstone Double Slab"],["blackstone_slab","Blackstone Slab"],["blackstone_stairs","Blackstone Stairs"],["blackstone_wall","Blackstone Wall"],["blade_pottery_sherd","Blade Pottery Sherd"],["blast_furnace","Blast Furnace"],["blaze_powder","Blaze Powder"],["blaze_rod","Blaze Rod"],["blaze_spawn_egg","Blaze Spawn Egg"],["bleach","Bleach"],["amethyst_block","Block of Amethyst"],["bamboo_block","Block of Bamboo"],["coal_block","Block of Coal"],["copper_block","Block of Copper"],["diamond_block","Block of Diamond"],["emerald_block","Block of Emerald"],["gold_block","Block of Gold"],["iron_block","Block of Iron"],["lapis_block","Block of Lapis Lazuli"],["netherite_block","Block of Netherite"],["quartz_block","Block of Quartz"],["raw_copper_block","Block of Raw Copper"],["raw_gold_block","Block of Raw Gold"],["raw_iron_block","Block of Raw Iron"],["redstone_block","Block of Redstone"],["resin_block","Block of Resin"],["stripped_bamboo_block","Block of Stripped Bamboo"],["blue_bundle","Blue Bundle"],["blue_candle","Blue Candle"],["blue_carpet","Blue Carpet"],["blue_concrete","Blue Concrete"],["blue_concrete_double_slab","Blue Concrete Double Slab"],["blue_concrete_powder","Blue Concrete Powder"],["blue_concrete_slab","Blue Concrete Slab"],["blue_concrete_stairs","Blue Concrete Stairs"],["blue_cushion","Blue Cushion"],["blue_dye","Blue Dye"],["blue_egg","Blue Egg"],["blue_glazed_terracotta","Blue Glazed Terracotta"],["blue_harness","Blue Harness"],["blue_ice","Blue Ice"],["blue_orchid","Blue Orchid"],["blue_shulker_box","Blue Shulker Box"],["blue_stained_glass","Blue Stained Glass"],["blue_stained_glass_pane","Blue Stained Glass Pane"],["blue_terracotta","Blue Terracotta"],["colored_torch_blue","Blue Torch"],["blue_wool","Blue Wool"],["blue_wool_double_slab","Blue Wool Double Slab"],["blue_wool_slab","Blue Wool Slab"],["blue_wool_stairs","Blue Wool Stairs"],["boat","Boat"],["bogged_spawn_egg","Bogged Spawn Egg"],["element_107","Bohrium"],["bolt_armor_trim_smithing_template","Bolt Armor Trim"],["bone","Bone"],["bone_block","Bone Block"],["bone_meal","Bone Meal"],["book","Book"],["writable_book","Book and Quill"],["bookshelf","Bookshelf"],["border_block","Border"],["bordure_indented_banner_pattern","Bordure Indented Banner Pattern"],["element_5","Boron"],["experience_bottle","Bottle o' Enchanting"],["bow","Bow"],["bowl","Bowl"],["brain_coral","Brain Coral"],["brain_coral_block","Brain Coral Block"],["brain_coral_fan","Brain Coral Fan"],["brain_coral_wall_fan","Brain Coral Wall Fan"],["bread","Bread"],["breeze_rod","Breeze Rod"],["breeze_spawn_egg","Breeze Spawn Egg"],["brewer_pottery_sherd","Brewer Pottery Sherd"],["brewing_stand","Brewing Stand"],["brick","Brick"],["brick_double_slab","Brick Slab"],["brick_slab","Brick Slab"],["brick_stairs","Brick Stairs"],["brick_wall","Brick Wall"],["brick_block","Bricks"],["element_35","Bromine"],["brown_bundle","Brown Bundle"],["brown_candle","Brown Candle"],["brown_carpet","Brown Carpet"],["brown_concrete","Brown Concrete"],["brown_concrete_double_slab","Brown Concrete Double Slab"],["brown_concrete_powder","Brown Concrete Powder"],["brown_concrete_slab","Brown Concrete Slab"],["brown_concrete_stairs","Brown Concrete Stairs"],["brown_cushion","Brown Cushion"],["brown_dye","Brown Dye"],["brown_egg","Brown Egg"],["brown_glazed_terracotta","Brown Glazed Terracotta"],["brown_harness","Brown Harness"],["brown_mushroom","Brown Mushroom"],["brown_mushroom_block","Brown Mushroom Block"],["brown_shulker_box","Brown Shulker Box"],["brown_stained_glass","Brown Stained Glass"],["brown_stained_glass_pane","Brown Stained Glass Pane"],["brown_terracotta","Brown Terracotta"],["brown_wool","Brown Wool"],["brown_wool_double_slab","Brown Wool Double Slab"],["brown_wool_slab","Brown Wool Slab"],["brown_wool_stairs","Brown Wool Stairs"],["brush","Brush"],["bubble_column","Bubble Column"],["bubble_coral","Bubble Coral"],["bubble_coral_block","Bubble Coral Block"],["bubble_coral_fan","Bubble Coral Fan"],["bubble_coral_wall_fan","Bubble Coral Wall Fan"],["bucket","Bucket"],["axolotl_bucket","Bucket of Axolotl"],["cod_bucket","Bucket of Cod"],["pufferfish_bucket","Bucket of Pufferfish"],["salmon_bucket","Bucket of Salmon"],["sulfur_cube_bucket","Bucket of Sulfur Cube"],["tadpole_bucket","Bucket of Tadpole"],["tropical_fish_bucket","Bucket of Tropical Fish"],["budding_amethyst","Budding Amethyst"],["bundle","Bundle"],["burn_pottery_sherd","Burn Pottery Sherd"],["bush","Bush"],["cactus","Cactus"],["cactus_flower","Cactus Flower"],["element_48","Cadmium"],["cake","Cake"],["black_candle_cake","Cake with Black Candle"],["blue_candle_cake","Cake with Blue Candle"],["brown_candle_cake","Cake with Brown Candle"],["candle_cake","Cake with Candle"],["cyan_candle_cake","Cake with Cyan Candle"],["gray_candle_cake","Cake with Gray Candle"],["green_candle_cake","Cake with Green Candle"],["light_blue_candle_cake","Cake with Light Blue Candle"],["light_gray_candle_cake","Cake with Light Gray Candle"],["lime_candle_cake","Cake with Lime Candle"],["magenta_candle_cake","Cake with Magenta Candle"],["orange_candle_cake","Cake with Orange Candle"],["pink_candle_cake","Cake with Pink Candle"],["purple_candle_cake","Cake with Purple Candle"],["red_candle_cake","Cake with Red Candle"],["white_candle_cake","Cake with White Candle"],["yellow_candle_cake","Cake with Yellow Candle"],["calcite","Calcite"],["element_20","Calcium"],["calibrated_sculk_sensor","Calibrated Sculk Sensor"],["element_98","Californium"],["camel_husk_spawn_egg","Camel Husk Spawn Egg"],["camel_spawn_egg","Camel Spawn Egg"],["camera","Camera"],["campfire","Campfire"],["candle","Candle"],["element_6","Carbon"],["carpet","Carpet"],["carrot","Carrot"],["carrot_on_a_stick","Carrot on a Stick"],["carrots","Carrots"],["cartography_table","Cartography Table"],["carved_pumpkin","Carved Pumpkin"],["cat_spawn_egg","Cat Spawn Egg"],["cauldron","Cauldron"],["cave_spider_spawn_egg","Cave Spider Spawn Egg"],["cave_vines","Cave Vines"],["cave_vines_body_with_berries","Cave Vines"],["cave_vines_head_with_berries","Cave Vines"],["element_58","Cerium"],["element_55","Cesium"],["chain_command_block","Chain Command Block"],["chainmail_boots","Chainmail Boots"],["chainmail_chestplate","Chainmail Chestplate"],["chainmail_helmet","Chainmail Helmet"],["chainmail_leggings","Chainmail Leggings"],["chalkboard","Chalkboard"],["charcoal","Charcoal"],["chemistry_table","Chemistry Table"],["cherry_boat","Cherry Boat"],["cherry_chest_boat","Cherry Boat with Chest"],["cherry_button","Cherry Button"],["cherry_door","Cherry Door"],["cherry_double_slab","Cherry Double Slab"],["cherry_fence","Cherry Fence"],["cherry_fence_gate","Cherry Fence Gate"],["cherry_hanging_sign","Cherry Hanging Sign"],["cherry_leaves","Cherry Leaves"],["cherry_log","Cherry Log"],["cherry_planks","Cherry Planks"],["cherry_pressure_plate","Cherry Pressure Plate"],["cherry_sapling","Cherry Sapling"],["cherry_shelf","Cherry Shelf"],["cherry_sign","Cherry Sign"],["cherry_standing_sign","Cherry Sign"],["cherry_slab","Cherry Slab"],["cherry_stairs","Cherry Stairs"],["cherry_trapdoor","Cherry Trapdoor"],["cherry_wall_sign","Cherry Wall Sign"],["cherry_wood","Cherry Wood"],["chest","Chest"],["chest_boat","Chest Boat"],["chicken_spawn_egg","Chicken Spawn Egg"],["chipped_anvil","Chipped Anvil"],["chiseled_bookshelf","Chiseled Bookshelf"],["chiseled_cinnabar","Chiseled Cinnabar"],["chiseled_copper","Chiseled Copper"],["chiseled_deepslate","Chiseled Deepslate"],["chiseled_nether_bricks","Chiseled Nether Bricks"],["chiseled_polished_blackstone","Chiseled Polished Blackstone"],["deprecated_purpur_block_1","Chiseled Purpur"],["chiseled_quartz_block","Chiseled Quartz Block"],["chiseled_red_sandstone","Chiseled Red Sandstone"],["chiseled_resin_bricks","Chiseled Resin Bricks"],["chiseled_sandstone","Chiseled Sandstone"],["chiseled_stone_bricks","Chiseled Stone Bricks"],["chiseled_sulfur","Chiseled Sulfur"],["chiseled_tuff","Chiseled Tuff"],["chiseled_tuff_bricks","Chiseled Tuff Bricks"],["element_17","Chlorine"],["chorus_flower","Chorus Flower"],["chorus_fruit","Chorus Fruit"],["chorus_plant","Chorus Plant"],["element_24","Chromium"],["cinnabar","Cinnabar"],["cinnabar_brick_double_slab","Cinnabar Brick Double Slab"],["cinnabar_brick_slab","Cinnabar Brick Slab"],["cinnabar_brick_stairs","Cinnabar Brick Stairs"],["cinnabar_brick_wall","Cinnabar Brick Wall"],["cinnabar_bricks","Cinnabar Bricks"],["cinnabar_double_slab","Cinnabar Double Slab"],["cinnabar_slab","Cinnabar Slab"],["cinnabar_stairs","Cinnabar Stairs"],["cinnabar_wall","Cinnabar Wall"],["clay","Clay"],["clay_ball","Clay Ball"],["clock","Clock"],["closed_eyeblossom","Closed Eyeblossom"],["coal","Coal"],["coal_ore","Coal Ore"],["coarse_dirt","Coarse Dirt"],["coast_armor_trim_smithing_template","Coast Armor Trim"],["element_27","Cobalt"],["cobbled_deepslate","Cobbled Deepslate"],["cobbled_deepslate_double_slab","Cobbled Deepslate Double Slab"],["cobbled_deepslate_slab","Cobbled Deepslate Slab"],["cobbled_deepslate_stairs","Cobbled Deepslate Stairs"],["cobbled_deepslate_wall","Cobbled Deepslate Wall"],["cobblestone","Cobblestone"],["cobblestone_double_slab","Cobblestone Slab"],["cobblestone_slab","Cobblestone Slab"],["stone_stairs","Cobblestone Stairs"],["cobblestone_wall","Cobblestone Wall"],["web","Cobweb"],["cocoa","Cocoa"],["cocoa_beans","Cocoa Beans"],["cod_spawn_egg","Cod Spawn Egg"],["colored_torch_bp","Colored Torch Bp"],["colored_torch_rg","Colored Torch Rg"],["command_block","Command Block"],["comparator","Comparator"],["compass","Compass"],["composter","Composter"],["compound_creator","Compound Creator"],["concrete","Concrete"],["concrete_powder","Concrete Powder"],["conduit","Conduit"],["cooked_chicken","Cooked Chicken"],["cooked_cod","Cooked Cod"],["cooked_mutton","Cooked Mutton"],["cooked_porkchop","Cooked Porkchop"],["cooked_rabbit","Cooked Rabbit"],["cooked_salmon","Cooked Salmon"],["cookie","Cookie"],["element_112","Copernicium"],["element_29","Copper"],["copper_axe","Copper Axe"],["copper_bars","Copper Bars"],["copper_boots","Copper Boots"],["copper_bulb","Copper Bulb"],["copper_chain","Copper Chain"],["copper_chest","Copper Chest"],["copper_chestplate","Copper Chestplate"],["copper_door","Copper Door"],["copper_golem_spawn_egg","Copper Golem Spawn Egg"],["copper_golem_statue","Copper Golem Statue"],["copper_grate","Copper Grate"],["copper_helmet","Copper Helmet"],["copper_hoe","Copper Hoe"],["copper_horse_armor","Copper Horse Armor"],["copper_ingot","Copper Ingot"],["copper_lantern","Copper Lantern"],["copper_leggings","Copper Leggings"],["copper_nautilus_armor","Copper Nautilus Armor"],["copper_nugget","Copper Nugget"],["copper_ore","Copper Ore"],["copper_pickaxe","Copper Pickaxe"],["copper_shovel","Copper Shovel"],["copper_spear","Copper Spear"],["copper_sword","Copper Sword"],["copper_torch","Copper Torch"],["copper_trapdoor","Copper Trapdoor"],["coral","Coral"],["coral_block","Coral Block"],["coral_fan","Coral Fan"],["coral_fan_dead","Coral Fan Dead"],["cornflower","Cornflower"],["cow_spawn_egg","Cow Spawn Egg"],["cracked_deepslate_bricks","Cracked Deepslate Bricks"],["cracked_deepslate_tiles","Cracked Deepslate Tiles"],["cracked_nether_bricks","Cracked Nether Bricks"],["cracked_polished_blackstone_bricks","Cracked Polished Blackstone Bricks"],["cracked_stone_bricks","Cracked Stone Bricks"],["crafter","Crafter"],["crafting_table","Crafting Table"],["creaking_heart","Creaking Heart"],["creaking_spawn_egg","Creaking Spawn Egg"],["creeper_banner_pattern","Creeper Charge Banner Pattern"],["creeper_head","Creeper Head"],["creeper_spawn_egg","Creeper Spawn Egg"],["crimson_button","Crimson Button"],["crimson_door","Crimson Door"],["crimson_fence","Crimson Fence"],["crimson_fence_gate","Crimson Fence Gate"],["crimson_fungus","Crimson Fungus"],["crimson_hanging_sign","Crimson Hanging Sign"],["crimson_hyphae","Crimson Hyphae"],["crimson_nylium","Crimson Nylium"],["crimson_planks","Crimson Planks"],["crimson_pressure_plate","Crimson Pressure Plate"],["crimson_roots","Crimson Roots"],["crimson_shelf","Crimson Shelf"],["crimson_sign","Crimson Sign"],["crimson_standing_sign","Crimson Sign"],["crimson_wall_sign","Crimson Sign"],["crimson_double_slab","Crimson Slab"],["crimson_slab","Crimson Slab"],["crimson_stairs","Crimson Stairs"],["crimson_stem","Crimson Stem"],["crimson_trapdoor","Crimson Trapdoor"],["crossbow","Crossbow"],["crying_obsidian","Crying Obsidian"],["element_96","Curium"],["cut_copper","Cut Copper"],["double_cut_copper_slab","Cut Copper Double Slab"],["cut_copper_slab","Cut Copper Slab"],["cut_copper_stairs","Cut Copper Stairs"],["cut_red_sandstone","Cut Red Sandstone"],["cut_red_sandstone_double_slab","Cut Red Sandstone Double Slab"],["cut_red_sandstone_slab","Cut Red Sandstone Slab"],["cut_sandstone","Cut Sandstone"],["cut_sandstone_double_slab","Cut Sandstone Double Slab"],["cut_sandstone_slab","Cut Sandstone Slab"],["cyan_bundle","Cyan Bundle"],["cyan_candle","Cyan Candle"],["cyan_carpet","Cyan Carpet"],["cyan_concrete","Cyan Concrete"],["cyan_concrete_double_slab","Cyan Concrete Double Slab"],["cyan_concrete_powder","Cyan Concrete Powder"],["cyan_concrete_slab","Cyan Concrete Slab"],["cyan_concrete_stairs","Cyan Concrete Stairs"],["cyan_cushion","Cyan Cushion"],["cyan_dye","Cyan Dye"],["cyan_glazed_terracotta","Cyan Glazed Terracotta"],["cyan_harness","Cyan Harness"],["cyan_shulker_box","Cyan Shulker Box"],["cyan_stained_glass","Cyan Stained Glass"],["cyan_stained_glass_pane","Cyan Stained Glass Pane"],["cyan_terracotta","Cyan Terracotta"],["cyan_wool","Cyan Wool"],["cyan_wool_double_slab","Cyan Wool Double Slab"],["cyan_wool_slab","Cyan Wool Slab"],["cyan_wool_stairs","Cyan Wool Stairs"],["damaged_anvil","Damaged Anvil"],["dandelion","Dandelion"],["danger_pottery_sherd","Danger Pottery Sherd"],["dark_oak_boat","Dark Oak Boat"],["dark_oak_chest_boat","Dark Oak Boat with Chest"],["dark_oak_button","Dark Oak Button"],["dark_oak_door","Dark Oak Door"],["dark_oak_double_slab","Dark Oak Double Slab"],["dark_oak_fence","Dark Oak Fence"],["dark_oak_fence_gate","Dark Oak Fence Gate"],["dark_oak_hanging_sign","Dark Oak Hanging Sign"],["dark_oak_leaves","Dark Oak Leaves"],["dark_oak_log","Dark Oak Log"],["dark_oak_planks","Dark Oak Planks"],["dark_oak_pressure_plate","Dark Oak Pressure Plate"],["dark_oak_sapling","Dark Oak Sapling"],["dark_oak_shelf","Dark Oak Shelf"],["dark_oak_sign","Dark Oak Sign"],["darkoak_standing_sign","Dark Oak Sign"],["dark_oak_slab","Dark Oak Slab"],["dark_oak_stairs","Dark Oak Stairs"],["dark_oak_trapdoor","Dark Oak Trapdoor"],["darkoak_wall_sign","Dark Oak Wall Sign"],["dark_oak_wood","Dark Oak Wood"],["dark_prismarine","Dark Prismarine"],["dark_prismarine_double_slab","Dark Prismarine Double Slab"],["dark_prismarine_slab","Dark Prismarine Slab"],["dark_prismarine_stairs","Dark Prismarine Stairs"],["element_110","Darmstadtium"],["daylight_detector","Daylight Detector"],["daylight_detector_inverted","Daylight Detector Inverted"],["dead_brain_coral","Dead Brain Coral"],["dead_brain_coral_block","Dead Brain Coral Block"],["dead_brain_coral_fan","Dead Brain Coral Fan"],["dead_brain_coral_wall_fan","Dead Brain Coral Wall Fan"],["dead_bubble_coral","Dead Bubble Coral"],["dead_bubble_coral_block","Dead Bubble Coral Block"],["dead_bubble_coral_fan","Dead Bubble Coral Fan"],["dead_bubble_coral_wall_fan","Dead Bubble Coral Wall Fan"],["deadbush","Dead Bush"],["dead_fire_coral","Dead Fire Coral"],["dead_fire_coral_block","Dead Fire Coral Block"],["dead_fire_coral_fan","Dead Fire Coral Fan"],["dead_fire_coral_wall_fan","Dead Fire Coral Wall Fan"],["dead_horn_coral","Dead Horn Coral"],["dead_horn_coral_block","Dead Horn Coral Block"],["dead_horn_coral_fan","Dead Horn Coral Fan"],["dead_horn_coral_wall_fan","Dead Horn Coral Wall Fan"],["dead_tube_coral","Dead Tube Coral"],["dead_tube_coral_block","Dead Tube Coral Block"],["dead_tube_coral_fan","Dead Tube Coral Fan"],["dead_tube_coral_wall_fan","Dead Tube Coral Wall Fan"],["decorated_pot","Decorated Pot"],["deepslate","Deepslate"],["deepslate_brick_double_slab","Deepslate Brick Double Slab"],["deepslate_brick_slab","Deepslate Brick Slab"],["deepslate_brick_stairs","Deepslate Brick Stairs"],["deepslate_brick_wall","Deepslate Brick Wall"],["deepslate_bricks","Deepslate Bricks"],["deepslate_coal_ore","Deepslate Coal Ore"],["deepslate_copper_ore","Deepslate Copper Ore"],["deepslate_diamond_ore","Deepslate Diamond Ore"],["deepslate_emerald_ore","Deepslate Emerald Ore"],["deepslate_gold_ore","Deepslate Gold Ore"],["deepslate_iron_ore","Deepslate Iron Ore"],["deepslate_lapis_ore","Deepslate Lapis Lazuli Ore"],["deepslate_redstone_ore","Deepslate Redstone Ore"],["deepslate_tile_double_slab","Deepslate Tile Double Slab"],["deepslate_tile_slab","Deepslate Tile Slab"],["deepslate_tile_stairs","Deepslate Tile Stairs"],["deepslate_tile_wall","Deepslate Tile Wall"],["deepslate_tiles","Deepslate Tiles"],["deny","Deny"],["deprecated_purpur_block_2","Deprecated Purpur Block 2"],["detector_rail","Detector Rail"],["diamond","Diamond"],["diamond_axe","Diamond Axe"],["diamond_boots","Diamond Boots"],["diamond_chestplate","Diamond Chestplate"],["diamond_helmet","Diamond Helmet"],["diamond_hoe","Diamond Hoe"],["diamond_horse_armor","Diamond Horse Armor"],["diamond_leggings","Diamond Leggings"],["diamond_nautilus_armor","Diamond Nautilus Armor"],["diamond_ore","Diamond Ore"],["diamond_pickaxe","Diamond Pickaxe"],["diamond_shovel","Diamond Shovel"],["diamond_spear","Diamond Spear"],["diamond_sword","Diamond Sword"],["diorite","Diorite"],["diorite_double_slab","Diorite Double Slab"],["diorite_slab","Diorite Slab"],["diorite_stairs","Diorite Stairs"],["diorite_wall","Diorite Wall"],["dirt","Dirt"],["grass_path","Dirt Path"],["disc_fragment_5","Disc Fragment"],["disc_press","Disc Press"],["dispenser","Dispenser"],["dolphin_spawn_egg","Dolphin Spawn Egg"],["donkey_spawn_egg","Donkey Spawn Egg"],["double_plant","Double Plant"],["double_stone_block_slab","Double Stone Block Slab"],["double_stone_block_slab2","Double Stone Block Slab2"],["double_stone_block_slab3","Double Stone Block Slab3"],["double_stone_block_slab4","Double Stone Block Slab4"],["dragon_egg","Dragon Egg"],["dragon_head","Dragon Head"],["dragon_breath","Dragon's Breath"],["dried_ghast","Dried Ghast"],["dried_kelp","Dried Kelp"],["dried_kelp_block","Dried Kelp Block"],["dripstone_block","Dripstone Block"],["dropper","Dropper"],["drowned_spawn_egg","Drowned Spawn Egg"],["element_105","Dubnium"],["dune_armor_trim_smithing_template","Dune Armor Trim"],["dye","Dye"],["element_66","Dysprosium"],["echo_shard","Echo Shard"],["egg","Egg"],["element_99","Einsteinium"],["elder_guardian_spawn_egg","Elder Guardian Spawn Egg"],["element_constructor","Element Constructor"],["elytra","Elytra"],["emerald","Emerald"],["emerald_ore","Emerald Ore"],["empty_map","Empty Map"],["enchanted_book","Enchanted Book"],["enchanted_golden_apple","Enchanted Golden Apple"],["enchanting_table","Enchanting Table"],["end_crystal","End Crystal"],["end_gateway","End Gateway"],["end_portal","End Portal"],["end_portal_frame","End Portal Frame"],["end_rod","End Rod"],["end_stone","End Stone"],["end_stone_brick_double_slab","End Stone Brick Double Slab"],["end_stone_brick_slab","End Stone Brick Slab"],["end_brick_stairs","End Stone Brick Stairs"],["end_stone_brick_wall","End Stone Brick Wall"],["end_bricks","End Stone Bricks"],["ender_chest","Ender Chest"],["ender_dragon_spawn_egg","Ender Dragon Spawn Egg"],["ender_pearl","Ender Pearl"],["enderman_spawn_egg","Enderman Spawn Egg"],["endermite_spawn_egg","Endermite Spawn Egg"],["element_68","Erbium"],["element_63","Europium"],["evoker_spawn_egg","Evoker Spawn Egg"],["explorer_pottery_sherd","Explorer Pottery Sherd"],["exposed_chiseled_copper","Exposed Chiseled Copper"],["exposed_copper","Exposed Copper"],["exposed_copper_bars","Exposed Copper Bars"],["exposed_copper_bulb","Exposed Copper Bulb"],["exposed_copper_chain","Exposed Copper Chain"],["exposed_copper_chest","Exposed Copper Chest"],["exposed_copper_door","Exposed Copper Door"],["exposed_copper_golem_statue","Exposed Copper Golem Statue"],["exposed_copper_grate","Exposed Copper Grate"],["exposed_copper_lantern","Exposed Copper Lantern"],["exposed_copper_trapdoor","Exposed Copper Trapdoor"],["exposed_cut_copper","Exposed Cut Copper"],["exposed_double_cut_copper_slab","Exposed Cut Copper Double Slab"],["exposed_cut_copper_slab","Exposed Cut Copper Slab"],["exposed_cut_copper_stairs","Exposed Cut Copper Stairs"],["exposed_lightning_rod","Exposed Lightning Rod"],["eye_armor_trim_smithing_template","Eye Armor Trim"],["medicine","Eye Drops"],["ender_eye","Eye of Ender"],["farmland","Farmland"],["feather","Feather"],["fence","Fence"],["fermented_spider_eye","Fermented Spider Eye"],["element_100","Fermium"],["fern","Fern"],["field_masoned_banner_pattern","Field Masoned Banner Pattern"],["fire","Fire"],["fire_charge","Fire Charge"],["fire_coral","Fire Coral"],["fire_coral_block","Fire Coral Block"],["fire_coral_fan","Fire Coral Fan"],["fire_coral_wall_fan","Fire Coral Wall Fan"],["firefly_bush","Firefly Bush"],["firework_rocket","Firework Rocket"],["firework_star","Firework Star"],["fishing_rod","Fishing Rod"],["element_114","Flerovium"],["fletching_table","Fletching Table"],["flint","Flint"],["flint_and_steel","Flint and Steel"],["flow_armor_trim_smithing_template","Flow Armor Trim"],["flow_banner_pattern","Flow Banner Pattern"],["flow_pottery_sherd","Flow Pottery Sherd"],["flower_banner_pattern","Flower Charge Banner Pattern"],["flower_pot","Flower Pot"],["flowering_azalea","Flowering Azalea"],["azalea_leaves_flowered","Flowering Azalea Leaves"],["element_9","Fluorine"],["fox_spawn_egg","Fox Spawn Egg"],["element_87","Francium"],["friend_pottery_sherd","Friend Pottery Sherd"],["frog_spawn_egg","Frog Spawn Egg"],["frog_spawn","Frogspawn"],["frostbite_spawn_egg","Frostbite Spawn Egg"],["frosted_ice","Frosted Ice"],["furnace","Furnace"],["element_64","Gadolinium"],["element_31","Gallium"],["element_32","Germanium"],["ghast_spawn_egg","Ghast Spawn Egg"],["ghast_tear","Ghast Tear"],["gilded_blackstone","Gilded Blackstone"],["glass","Glass"],["glass_bottle","Glass Bottle"],["glass_pane","Glass Pane"],["glistering_melon_slice","Glistering Melon Slice"],["globe_banner_pattern","Globe Banner Pattern"],["glow_berries","Glow Berries"],["glow_ink_sac","Glow Ink Sac"],["glow_frame","Glow Item Frame"],["glow_lichen","Glow Lichen"],["glow_squid_spawn_egg","Glow Squid Spawn Egg"],["glow_stick","Glow Stick"],["glowingobsidian","Glowing Obsidian"],["glowstone","Glowstone"],["glowstone_dust","Glowstone Dust"],["goat_horn","Goat Horn"],["goat_spawn_egg","Goat Spawn Egg"],["element_79","Gold"],["gold_ingot","Gold Ingot"],["gold_nugget","Gold Nugget"],["gold_ore","Gold Ore"],["golden_apple","Golden Apple"],["golden_axe","Golden Axe"],["golden_boots","Golden Boots"],["golden_carrot","Golden Carrot"],["golden_chestplate","Golden Chestplate"],["golden_dandelion","Golden Dandelion"],["golden_helmet","Golden Helmet"],["golden_hoe","Golden Hoe"],["golden_horse_armor","Golden Horse Armor"],["golden_leggings","Golden Leggings"],["golden_nautilus_armor","Golden Nautilus Armor"],["golden_pickaxe","Golden Pickaxe"],["golden_shovel","Golden Shovel"],["golden_spear","Golden Spear"],["golden_sword","Golden Sword"],["granite","Granite"],["granite_double_slab","Granite Double Slab"],["granite_slab","Granite Slab"],["granite_stairs","Granite Stairs"],["granite_wall","Granite Wall"],["grass_block","Grass Block"],["gravel","Gravel"],["gray_bundle","Gray Bundle"],["gray_candle","Gray Candle"],["gray_carpet","Gray Carpet"],["gray_concrete","Gray Concrete"],["gray_concrete_double_slab","Gray Concrete Double Slab"],["gray_concrete_powder","Gray Concrete Powder"],["gray_concrete_slab","Gray Concrete Slab"],["gray_concrete_stairs","Gray Concrete Stairs"],["gray_cushion","Gray Cushion"],["gray_dye","Gray Dye"],["gray_glazed_terracotta","Gray Glazed Terracotta"],["gray_harness","Gray Harness"],["gray_shulker_box","Gray Shulker Box"],["gray_stained_glass","Gray Stained Glass"],["gray_stained_glass_pane","Gray Stained Glass Pane"],["gray_terracotta","Gray Terracotta"],["gray_wool","Gray Wool"],["gray_wool_double_slab","Gray Wool Double Slab"],["gray_wool_slab","Gray Wool Slab"],["gray_wool_stairs","Gray Wool Stairs"],["green_bundle","Green Bundle"],["green_candle","Green Candle"],["green_carpet","Green Carpet"],["green_concrete","Green Concrete"],["green_concrete_double_slab","Green Concrete Double Slab"],["green_concrete_powder","Green Concrete Powder"],["green_concrete_slab","Green Concrete Slab"],["green_concrete_stairs","Green Concrete Stairs"],["green_cushion","Green Cushion"],["green_dye","Green Dye"],["green_glazed_terracotta","Green Glazed Terracotta"],["green_harness","Green Harness"],["green_shulker_box","Green Shulker Box"],["green_stained_glass","Green Stained Glass"],["green_stained_glass_pane","Green Stained Glass Pane"],["green_terracotta","Green Terracotta"],["colored_torch_green","Green Torch"],["green_wool","Green Wool"],["green_wool_double_slab","Green Wool Double Slab"],["green_wool_slab","Green Wool Slab"],["green_wool_stairs","Green Wool Stairs"],["grindstone","Grindstone"],["guardian_spawn_egg","Guardian Spawn Egg"],["gunpowder","Gunpowder"],["guster_banner_pattern","Guster Banner Pattern"],["guster_pottery_sherd","Guster Pottery Sherd"],["element_72","Hafnium"],["hanging_roots","Hanging Roots"],["happy_ghast_spawn_egg","Happy Ghast Spawn Egg"],["hard_stained_glass","Hard Stained Glass"],["hard_stained_glass_pane","Hard Stained Glass Pane"],["hard_black_stained_glass","Hardened Black Stained Glass"],["hard_black_stained_glass_pane","Hardened Black Stained Glass Pane"],["hard_blue_stained_glass","Hardened Blue Stained Glass"],["hard_blue_stained_glass_pane","Hardened Blue Stained Glass Pane"],["hard_brown_stained_glass","Hardened Brown Stained Glass"],["hard_brown_stained_glass_pane","Hardened Brown Stained Glass Pane"],["hard_cyan_stained_glass","Hardened Cyan Stained Glass"],["hard_cyan_stained_glass_pane","Hardened Cyan Stained Glass Pane"],["hard_glass","Hardened Glass"],["hard_glass_pane","Hardened Glass Pane"],["hard_gray_stained_glass","Hardened Gray Stained Glass"],["hard_gray_stained_glass_pane","Hardened Gray Stained Glass Pane"],["hard_green_stained_glass","Hardened Green Stained Glass"],["hard_green_stained_glass_pane","Hardened Green Stained Glass Pane"],["hard_light_blue_stained_glass","Hardened Light Blue Stained Glass"],["hard_light_blue_stained_glass_pane","Hardened Light Blue Stained Glass Pane"],["hard_light_gray_stained_glass","Hardened Light Gray Stained Glass"],["hard_light_gray_stained_glass_pane","Hardened Light Gray Stained Glass Pane"],["hard_lime_stained_glass","Hardened Lime Stained Glass"],["hard_lime_stained_glass_pane","Hardened Lime Stained Glass Pane"],["hard_magenta_stained_glass","Hardened Magenta Stained Glass"],["hard_magenta_stained_glass_pane","Hardened Magenta Stained Glass Pane"],["hard_orange_stained_glass","Hardened Orange Stained Glass"],["hard_orange_stained_glass_pane","Hardened Orange Stained Glass Pane"],["hard_pink_stained_glass","Hardened Pink Stained Glass"],["hard_pink_stained_glass_pane","Hardened Pink Stained Glass Pane"],["hard_purple_stained_glass","Hardened Purple Stained Glass"],["hard_purple_stained_glass_pane","Hardened Purple Stained Glass Pane"],["hard_red_stained_glass","Hardened Red Stained Glass"],["hard_red_stained_glass_pane","Hardened Red Stained Glass Pane"],["hard_white_stained_glass","Hardened White Stained Glass"],["hard_white_stained_glass_pane","Hardened White Stained Glass Pane"],["hard_yellow_stained_glass","Hardened Yellow Stained Glass"],["hard_yellow_stained_glass_pane","Hardened Yellow Stained Glass Pane"],["element_108","Hassium"],["hay_block","Hay Bale"],["heart_of_the_sea","Heart of the Sea"],["heart_pottery_sherd","Heart Pottery Sherd"],["heartbreak_pottery_sherd","Heartbreak Pottery Sherd"],["chemical_heat","Heat Block"],["heavy_core","Heavy Core"],["heavy_weighted_pressure_plate","Heavy Weighted Pressure Plate"],["element_2","Helium"],["hoglin_spawn_egg","Hoglin Spawn Egg"],["element_67","Holmium"],["honey_block","Honey Block"],["honey_bottle","Honey Bottle"],["honeycomb","Honeycomb"],["honeycomb_block","Honeycomb Block"],["hopper","Hopper"],["horn_coral","Horn Coral"],["horn_coral_block","Horn Coral Block"],["horn_coral_fan","Horn Coral Fan"],["horn_coral_wall_fan","Horn Coral Wall Fan"],["horse_spawn_egg","Horse Spawn Egg"],["host_armor_trim_smithing_template","Host Armor Trim"],["howl_pottery_sherd","Howl Pottery Sherd"],["husk_spawn_egg","Husk Spawn Egg"],["element_1","Hydrogen"],["ice","Ice"],["ice_bomb","Ice Bomb"],["ice_crystal","Ice Crystal"],["icicle","Icicle"],["element_49","Indium"],["infested_chiseled_stone_bricks","Infested Chiseled Stone Brick"],["infested_cobblestone","Infested Cobblestone"],["infested_cracked_stone_bricks","Infested Cracked Stone Brick"],["infested_deepslate","Infested Deepslate"],["infested_mossy_stone_bricks","Infested Mossy Stone Brick"],["infested_stone","Infested Stone"],["infested_stone_bricks","Infested Stone Bricks"],["ink_sac","Ink Sac"],["invisible_bedrock","Invisible Bedrock"],["element_53","Iodine"],["element_77","Iridium"],["element_26","Iron"],["iron_axe","Iron Axe"],["iron_bars","Iron Bars"],["iron_boots","Iron Boots"],["iron_chain","Iron Chain"],["iron_chestplate","Iron Chestplate"],["iron_door","Iron Door"],["iron_golem_spawn_egg","Iron Golem Spawn Egg"],["iron_helmet","Iron Helmet"],["iron_hoe","Iron Hoe"],["iron_horse_armor","Iron Horse Armor"],["iron_ingot","Iron Ingot"],["iron_leggings","Iron Leggings"],["iron_nautilus_armor","Iron Nautilus Armor"],["iron_nugget","Iron Nugget"],["iron_ore","Iron Ore"],["iron_pickaxe","Iron Pickaxe"],["iron_shovel","Iron Shovel"],["iron_spear","Iron Spear"],["iron_sword","Iron Sword"],["iron_trapdoor","Iron Trapdoor"],["frame","Item Frame"],["lit_pumpkin","Jack o'Lantern"],["jigsaw","Jigsaw Block"],["jukebox","Jukebox"],["jungle_boat","Jungle Boat"],["jungle_chest_boat","Jungle Boat with Chest"],["jungle_button","Jungle Button"],["jungle_door","Jungle Door"],["jungle_double_slab","Jungle Double Slab"],["jungle_fence","Jungle Fence"],["jungle_fence_gate","Jungle Fence Gate"],["jungle_hanging_sign","Jungle Hanging Sign"],["jungle_leaves","Jungle Leaves"],["jungle_log","Jungle Log"],["jungle_planks","Jungle Planks"],["jungle_pressure_plate","Jungle Pressure Plate"],["jungle_sapling","Jungle Sapling"],["jungle_shelf","Jungle Shelf"],["jungle_sign","Jungle Sign"],["jungle_standing_sign","Jungle Sign"],["jungle_slab","Jungle Slab"],["jungle_stairs","Jungle Stairs"],["jungle_trapdoor","Jungle Trapdoor"],["jungle_wall_sign","Jungle Wall Sign"],["jungle_wood","Jungle Wood"],["kelp","Kelp"],["element_36","Krypton"],["lab_table","Lab Table"],["ladder","Ladder"],["lantern","Lantern"],["element_57","Lanthanum"],["lapis_lazuli","Lapis Lazuli"],["lapis_ore","Lapis Lazuli Ore"],["large_amethyst_bud","Large Amethyst Bud"],["large_fern","Large Fern"],["flowing_lava","Lava"],["lava","Lava"],["lava_bucket","Lava Bucket"],["element_103","Lawrencium"],["element_82","Lead"],["lead","Lead"],["leaf_litter","Leaf Litter"],["leather","Leather"],["leather_boots","Leather Boots"],["leather_helmet","Leather Cap"],["leather_horse_armor","Leather Horse Armor"],["leather_leggings","Leather Pants"],["leather_chestplate","Leather Tunic"],["leaves","Leaves"],["leaves2","Leaves2"],["lectern","Lectern"],["lever","Lever"],["light_block","Light"],["light_block_0","Light"],["light_block_1","Light"],["light_block_10","Light"],["light_block_11","Light"],["light_block_12","Light"],["light_block_13","Light"],["light_block_14","Light"],["light_block_15","Light"],["light_block_2","Light"],["light_block_3","Light"],["light_block_4","Light"],["light_block_5","Light"],["light_block_6","Light"],["light_block_7","Light"],["light_block_8","Light"],["light_block_9","Light"],["light_blue_bundle","Light Blue Bundle"],["light_blue_candle","Light Blue Candle"],["light_blue_carpet","Light Blue Carpet"],["light_blue_concrete","Light Blue Concrete"],["light_blue_concrete_double_slab","Light Blue Concrete Double Slab"],["light_blue_concrete_powder","Light Blue Concrete Powder"],["light_blue_concrete_slab","Light Blue Concrete Slab"],["light_blue_concrete_stairs","Light Blue Concrete Stairs"],["light_blue_cushion","Light Blue Cushion"],["light_blue_dye","Light Blue Dye"],["light_blue_glazed_terracotta","Light Blue Glazed Terracotta"],["light_blue_harness","Light Blue Harness"],["light_blue_shulker_box","Light Blue Shulker Box"],["light_blue_stained_glass","Light Blue Stained Glass"],["light_blue_stained_glass_pane","Light Blue Stained Glass Pane"],["light_blue_terracotta","Light Blue Terracotta"],["light_blue_wool","Light Blue Wool"],["light_blue_wool_double_slab","Light Blue Wool Double Slab"],["light_blue_wool_slab","Light Blue Wool Slab"],["light_blue_wool_stairs","Light Blue Wool Stairs"],["light_gray_bundle","Light Gray Bundle"],["light_gray_candle","Light Gray Candle"],["light_gray_carpet","Light Gray Carpet"],["light_gray_concrete","Light Gray Concrete"],["light_gray_concrete_double_slab","Light Gray Concrete Double Slab"],["light_gray_concrete_powder","Light Gray Concrete Powder"],["light_gray_concrete_slab","Light Gray Concrete Slab"],["light_gray_concrete_stairs","Light Gray Concrete Stairs"],["light_gray_cushion","Light Gray Cushion"],["light_gray_dye","Light Gray Dye"],["silver_glazed_terracotta","Light Gray Glazed Terracotta"],["light_gray_harness","Light Gray Harness"],["light_gray_shulker_box","Light Gray Shulker Box"],["light_gray_stained_glass","Light Gray Stained Glass"],["light_gray_stained_glass_pane","Light Gray Stained Glass Pane"],["light_gray_terracotta","Light Gray Terracotta"],["light_gray_wool","Light Gray Wool"],["light_gray_wool_double_slab","Light Gray Wool Double Slab"],["light_gray_wool_slab","Light Gray Wool Slab"],["light_gray_wool_stairs","Light Gray Wool Stairs"],["light_weighted_pressure_plate","Light Weighted Pressure Plate"],["lightning_rod","Lightning Rod"],["lilac","Lilac"],["lily_of_the_valley","Lily of the Valley"],["waterlily","Lily Pad"],["lime_bundle","Lime Bundle"],["lime_candle","Lime Candle"],["lime_carpet","Lime Carpet"],["lime_concrete","Lime Concrete"],["lime_concrete_double_slab","Lime Concrete Double Slab"],["lime_concrete_powder","Lime Concrete Powder"],["lime_concrete_slab","Lime Concrete Slab"],["lime_concrete_stairs","Lime Concrete Stairs"],["lime_cushion","Lime Cushion"],["lime_dye","Lime Dye"],["lime_glazed_terracotta","Lime Glazed Terracotta"],["lime_harness","Lime Harness"],["lime_shulker_box","Lime Shulker Box"],["lime_stained_glass","Lime Stained Glass"],["lime_stained_glass_pane","Lime Stained Glass Pane"],["lime_terracotta","Lime Terracotta"],["lime_wool","Lime Wool"],["lime_wool_double_slab","Lime Wool Double Slab"],["lime_wool_slab","Lime Wool Slab"],["lime_wool_stairs","Lime Wool Stairs"],["lingering_potion","Lingering Water Bottle"],["lit_blast_furnace","Lit Blast Furnace"],["lit_deepslate_redstone_ore","Lit Deepslate Redstone Ore"],["lit_furnace","Lit Furnace"],["lit_redstone_lamp","Lit Redstone Lamp"],["lit_redstone_ore","Lit Redstone Ore"],["lit_smoker","Lit Smoker"],["element_3","Lithium"],["element_116","Livermorium"],["llama_spawn_egg","Llama Spawn Egg"],["lodestone","Lodestone"],["lodestone_compass","Lodestone Compass"],["log","Log"],["log2","Log2"],["loom","Loom"],["element_71","Lutetium"],["mace","Mace"],["magenta_bundle","Magenta Bundle"],["magenta_candle","Magenta Candle"],["magenta_carpet","Magenta Carpet"],["magenta_concrete","Magenta Concrete"],["magenta_concrete_double_slab","Magenta Concrete Double Slab"],["magenta_concrete_powder","Magenta Concrete Powder"],["magenta_concrete_slab","Magenta Concrete Slab"],["magenta_concrete_stairs","Magenta Concrete Stairs"],["magenta_cushion","Magenta Cushion"],["magenta_dye","Magenta Dye"],["magenta_glazed_terracotta","Magenta Glazed Terracotta"],["magenta_harness","Magenta Harness"],["magenta_shulker_box","Magenta Shulker Box"],["magenta_stained_glass","Magenta Stained Glass"],["magenta_stained_glass_pane","Magenta Stained Glass Pane"],["magenta_terracotta","Magenta Terracotta"],["magenta_wool","Magenta Wool"],["magenta_wool_double_slab","Magenta Wool Double Slab"],["magenta_wool_slab","Magenta Wool Slab"],["magenta_wool_stairs","Magenta Wool Stairs"],["magma","Magma Block"],["magma_cream","Magma Cream"],["magma_cube_spawn_egg","Magma Cube Spawn Egg"],["element_12","Magnesium"],["element_25","Manganese"],["mangrove_boat","Mangrove Boat"],["mangrove_chest_boat","Mangrove Boat with Chest"],["mangrove_button","Mangrove Button"],["mangrove_door","Mangrove Door"],["mangrove_double_slab","Mangrove Double Slab"],["mangrove_fence","Mangrove Fence"],["mangrove_fence_gate","Mangrove Fence Gate"],["mangrove_hanging_sign","Mangrove Hanging Sign"],["mangrove_leaves","Mangrove Leaves"],["mangrove_log","Mangrove Log"],["mangrove_planks","Mangrove Planks"],["mangrove_pressure_plate","Mangrove Pressure Plate"],["mangrove_propagule","Mangrove Propagule"],["mangrove_roots","Mangrove Roots"],["mangrove_shelf","Mangrove Shelf"],["mangrove_sign","Mangrove Sign"],["mangrove_standing_sign","Mangrove Sign"],["mangrove_slab","Mangrove Slab"],["mangrove_stairs","Mangrove Stairs"],["mangrove_trapdoor","Mangrove Trapdoor"],["mangrove_wall_sign","Mangrove Wall Sign"],["mangrove_wood","Mangrove Wood"],["filled_map","Map"],["material_reducer","Material Reducer"],["medium_amethyst_bud","Medium Amethyst Bud"],["element_109","Meitnerium"],["melon_block","Melon"],["melon_seeds","Melon Seeds"],["melon_slice","Melon Slice"],["melon_stem","Melon Stem"],["element_101","Mendelevium"],["element_80","Mercury"],["milk_bucket","Milk Bucket"],["minecart","Minecart"],["chest_minecart","Minecart with Chest"],["command_block_minecart","Minecart with Command Block"],["hopper_minecart","Minecart with Hopper"],["tnt_minecart","Minecart with TNT"],["miner_pottery_sherd","Miner Pottery Sherd"],["element_42","Molybdenum"],["monster_egg","Monster Egg"],["mob_spawner","Monster Spawner"],["mooshroom_spawn_egg","Mooshroom Spawn Egg"],["element_115","Moscovium"],["moss_block","Moss Block"],["moss_carpet","Moss Carpet"],["mossy_cobblestone","Mossy Cobblestone"],["mossy_cobblestone_double_slab","Mossy Cobblestone Double Slab"],["mossy_cobblestone_slab","Mossy Cobblestone Slab"],["mossy_cobblestone_stairs","Mossy Cobblestone Stairs"],["mossy_cobblestone_wall","Mossy Cobblestone Wall"],["mossy_stone_brick_double_slab","Mossy Stone Brick Double Slab"],["mossy_stone_brick_slab","Mossy Stone Brick Slab"],["mossy_stone_brick_stairs","Mossy Stone Brick Stairs"],["mossy_stone_brick_wall","Mossy Stone Brick Wall"],["mossy_stone_bricks","Mossy Stone Bricks"],["mourner_pottery_sherd","Mourner Pottery Sherd"],["moving_block","Moving Block"],["mud","Mud"],["mud_brick_double_slab","Mud Brick Double Slab"],["mud_brick_slab","Mud Brick Slab"],["mud_brick_stairs","Mud Brick Stairs"],["mud_brick_wall","Mud Brick Wall"],["mud_bricks","Mud Bricks"],["muddy_mangrove_roots","Muddy Mangrove Roots"],["mule_spawn_egg","Mule Spawn Egg"],["mushroom_stem","Mushroom Stem"],["mushroom_stew","Mushroom Stew"],["music_disc_11","Music Disc"],["music_disc_13","Music Disc"],["music_disc_5","Music Disc"],["music_disc_blocks","Music Disc"],["music_disc_bounce","Music Disc"],["music_disc_cat","Music Disc"],["music_disc_chirp","Music Disc"],["music_disc_creator","Music Disc"],["music_disc_creator_music_box","Music Disc"],["music_disc_far","Music Disc"],["music_disc_lava_chicken","Music Disc"],["music_disc_mall","Music Disc"],["music_disc_mellohi","Music Disc"],["music_disc_otherside","Music Disc"],["music_disc_pigstep","Music Disc"],["music_disc_precipice","Music Disc"],["music_disc_relic","Music Disc"],["music_disc_stal","Music Disc"],["music_disc_strad","Music Disc"],["music_disc_tears","Music Disc"],["music_disc_wait","Music Disc"],["music_disc_ward","Music Disc"],["mycelium","Mycelium"],["name_tag","Name Tag"],["nautilus_shell","Nautilus Shell"],["nautilus_spawn_egg","Nautilus Spawn Egg"],["element_60","Neodymium"],["element_10","Neon"],["element_93","Neptunium"],["netherbrick","Nether Brick"],["nether_brick_fence","Nether Brick Fence"],["nether_brick_double_slab","Nether Brick Slab"],["nether_brick_slab","Nether Brick Slab"],["nether_brick_stairs","Nether Brick Stairs"],["nether_brick_wall","Nether Brick Wall"],["nether_brick","Nether Bricks"],["nether_gold_ore","Nether Gold Ore"],["quartz","Nether Quartz"],["quartz_ore","Nether Quartz Ore"],["netherreactor","Nether Reactor Core"],["nether_sprouts","Nether Sprouts"],["nether_star","Nether Star"],["nether_wart","Nether Wart"],["nether_wart_block","Nether Wart Block"],["netherite_axe","Netherite Axe"],["netherite_boots","Netherite Boots"],["netherite_chestplate","Netherite Chestplate"],["netherite_helmet","Netherite Helmet"],["netherite_hoe","Netherite Hoe"],["netherite_horse_armor","Netherite Horse Armor"],["netherite_ingot","Netherite Ingot"],["netherite_leggings","Netherite Leggings"],["netherite_nautilus_armor","Netherite Nautilus Armor"],["netherite_pickaxe","Netherite Pickaxe"],["netherite_scrap","Netherite Scrap"],["netherite_shovel","Netherite Shovel"],["netherite_spear","Netherite Spear"],["netherite_sword","Netherite Sword"],["netherite_upgrade_smithing_template","Netherite Upgrade"],["netherrack","Netherrack"],["element_28","Nickel"],["element_113","Nihonium"],["element_41","Niobium"],["element_7","Nitrogen"],["element_102","Nobelium"],["noteblock","Note Block"],["npc_spawn_egg","NPC Spawn Egg"],["oak_boat","Oak Boat"],["oak_chest_boat","Oak Boat with Chest"],["wooden_button","Oak Button"],["wooden_door","Oak Door"],["oak_double_slab","Oak Double Slab"],["oak_fence","Oak Fence"],["fence_gate","Oak Fence Gate"],["oak_hanging_sign","Oak Hanging Sign"],["oak_leaves","Oak Leaves"],["oak_log","Oak Log"],["oak_planks","Oak Planks"],["wooden_pressure_plate","Oak Pressure Plate"],["oak_sapling","Oak Sapling"],["oak_shelf","Oak Shelf"],["oak_sign","Oak Sign"],["oak_slab","Oak Slab"],["oak_stairs","Oak Stairs"],["trapdoor","Oak Trapdoor"],["oak_wood","Oak Wood"],["observer","Observer"],["obsidian","Obsidian"],["ocelot_spawn_egg","Ocelot Spawn Egg"],["ochre_froglight","Ochre Froglight"],["element_118","Oganesson"],["ominous_bottle","Ominous Bottle"],["ominous_trial_key","Ominous Trial Key"],["open_eyeblossom","Open Eyeblossom"],["orange_bundle","Orange Bundle"],["orange_candle","Orange Candle"],["orange_carpet","Orange Carpet"],["orange_concrete","Orange Concrete"],["orange_concrete_double_slab","Orange Concrete Double Slab"],["orange_concrete_powder","Orange Concrete Powder"],["orange_concrete_slab","Orange Concrete Slab"],["orange_concrete_stairs","Orange Concrete Stairs"],["orange_cushion","Orange Cushion"],["orange_dye","Orange Dye"],["orange_glazed_terracotta","Orange Glazed Terracotta"],["orange_harness","Orange Harness"],["orange_poplar_leaves","Orange Poplar Leaves"],["orange_shulker_box","Orange Shulker Box"],["orange_stained_glass","Orange Stained Glass"],["orange_stained_glass_pane","Orange Stained Glass Pane"],["orange_terracotta","Orange Terracotta"],["orange_tulip","Orange Tulip"],["orange_wool","Orange Wool"],["orange_wool_double_slab","Orange Wool Double Slab"],["orange_wool_slab","Orange Wool Slab"],["orange_wool_stairs","Orange Wool Stairs"],["element_76","Osmium"],["oxeye_daisy","Oxeye Daisy"],["oxidized_chiseled_copper","Oxidized Chiseled Copper"],["oxidized_copper","Oxidized Copper"],["oxidized_copper_bars","Oxidized Copper Bars"],["oxidized_copper_bulb","Oxidized Copper Bulb"],["oxidized_copper_chain","Oxidized Copper Chain"],["oxidized_copper_chest","Oxidized Copper Chest"],["oxidized_copper_door","Oxidized Copper Door"],["oxidized_copper_golem_statue","Oxidized Copper Golem Statue"],["oxidized_copper_grate","Oxidized Copper Grate"],["oxidized_copper_lantern","Oxidized Copper Lantern"],["oxidized_copper_trapdoor","Oxidized Copper Trapdoor"],["oxidized_cut_copper","Oxidized Cut Copper"],["oxidized_double_cut_copper_slab","Oxidized Cut Copper Double Slab"],["oxidized_cut_copper_slab","Oxidized Cut Copper Slab"],["oxidized_cut_copper_stairs","Oxidized Cut Copper Stairs"],["oxidized_lightning_rod","Oxidized Lightning Rod"],["element_8","Oxygen"],["packed_ice","Packed Ice"],["packed_mud","Packed Mud"],["painting","Painting"],["pale_hanging_moss","Pale Hanging Moss"],["pale_moss_block","Pale Moss Block"],["pale_moss_carpet","Pale Moss Carpet"],["pale_oak_boat","Pale Oak Boat"],["pale_oak_chest_boat","Pale Oak Boat with Chest"],["pale_oak_button","Pale Oak Button"],["pale_oak_door","Pale Oak Door"],["pale_oak_double_slab","Pale Oak Double Slab"],["pale_oak_fence","Pale Oak Fence"],["pale_oak_fence_gate","Pale Oak Fence Gate"],["pale_oak_hanging_sign","Pale Oak Hanging Sign"],["pale_oak_leaves","Pale Oak Leaves"],["pale_oak_log","Pale Oak Log"],["pale_oak_planks","Pale Oak Planks"],["pale_oak_pressure_plate","Pale Oak Pressure Plate"],["pale_oak_sapling","Pale Oak Sapling"],["pale_oak_shelf","Pale Oak Shelf"],["pale_oak_sign","Pale Oak Sign"],["pale_oak_standing_sign","Pale Oak Sign"],["pale_oak_slab","Pale Oak Slab"],["pale_oak_stairs","Pale Oak Stairs"],["pale_oak_trapdoor","Pale Oak Trapdoor"],["pale_oak_wall_sign","Pale Oak Wall Sign"],["pale_oak_wood","Pale Oak Wood"],["element_46","Palladium"],["panda_spawn_egg","Panda Spawn Egg"],["paper","Paper"],["parched_spawn_egg","Parched Spawn Egg"],["parrot_spawn_egg","Parrot Spawn Egg"],["pearlescent_froglight","Pearlescent Froglight"],["peony","Peony"],["phantom_membrane","Phantom Membrane"],["phantom_spawn_egg","Phantom Spawn Egg"],["element_15","Phosphorus"],["photo_item","Photo"],["pig_spawn_egg","Pig Spawn Egg"],["piglin_brute_spawn_egg","Piglin Brute Spawn Egg"],["piglin_head","Piglin Head"],["piglin_spawn_egg","Piglin Spawn Egg"],["pillager_spawn_egg","Pillager Spawn Egg"],["pink_bundle","Pink Bundle"],["pink_candle","Pink Candle"],["pink_carpet","Pink Carpet"],["pink_concrete","Pink Concrete"],["pink_concrete_double_slab","Pink Concrete Double Slab"],["pink_concrete_powder","Pink Concrete Powder"],["pink_concrete_slab","Pink Concrete Slab"],["pink_concrete_stairs","Pink Concrete Stairs"],["pink_cushion","Pink Cushion"],["pink_dye","Pink Dye"],["pink_glazed_terracotta","Pink Glazed Terracotta"],["pink_harness","Pink Harness"],["pink_petals","Pink Petals"],["pink_shulker_box","Pink Shulker Box"],["pink_stained_glass","Pink Stained Glass"],["pink_stained_glass_pane","Pink Stained Glass Pane"],["pink_terracotta","Pink Terracotta"],["pink_tulip","Pink Tulip"],["pink_wool","Pink Wool"],["pink_wool_double_slab","Pink Wool Double Slab"],["pink_wool_slab","Pink Wool Slab"],["pink_wool_stairs","Pink Wool Stairs"],["piston","Piston"],["piston_arm_collision","Piston Arm Collision"],["pitcher_crop","Pitcher Crop"],["pitcher_plant","Pitcher Plant"],["pitcher_pod","Pitcher Pod"],["planks","Planks"],["element_78","Platinum"],["player_head","Player Head"],["plenty_pottery_sherd","Plenty Pottery Sherd"],["element_94","Plutonium"],["podzol","Podzol"],["pointed_dripstone","Pointed Dripstone"],["poisonous_potato","Poisonous Potato"],["polar_bear_spawn_egg","Polar Bear Spawn Egg"],["polished_andesite","Polished Andesite"],["polished_andesite_double_slab","Polished Andesite Double Slab"],["polished_andesite_slab","Polished Andesite Slab"],["polished_andesite_stairs","Polished Andesite Stairs"],["polished_basalt","Polished Basalt"],["polished_blackstone","Polished Blackstone"],["polished_blackstone_brick_double_slab","Polished Blackstone Brick Double Slab"],["polished_blackstone_brick_slab","Polished Blackstone Brick Slab"],["polished_blackstone_brick_stairs","Polished Blackstone Brick Stairs"],["polished_blackstone_brick_wall","Polished Blackstone Brick Wall"],["polished_blackstone_bricks","Polished Blackstone Bricks"],["polished_blackstone_button","Polished Blackstone Button"],["polished_blackstone_double_slab","Polished Blackstone Double Slab"],["polished_blackstone_pressure_plate","Polished Blackstone Pressure Plate"],["polished_blackstone_slab","Polished Blackstone Slab"],["polished_blackstone_stairs","Polished Blackstone Stairs"],["polished_blackstone_wall","Polished Blackstone Wall"],["polished_cinnabar","Polished Cinnabar"],["polished_cinnabar_double_slab","Polished Cinnabar Double Slab"],["polished_cinnabar_slab","Polished Cinnabar Slab"],["polished_cinnabar_stairs","Polished Cinnabar Stairs"],["polished_cinnabar_wall","Polished Cinnabar Wall"],["polished_deepslate","Polished Deepslate"],["polished_deepslate_double_slab","Polished Deepslate Double Slab"],["polished_deepslate_slab","Polished Deepslate Slab"],["polished_deepslate_stairs","Polished Deepslate Stairs"],["polished_deepslate_wall","Polished Deepslate Wall"],["polished_diorite","Polished Diorite"],["polished_diorite_double_slab","Polished Diorite Double Slab"],["polished_diorite_slab","Polished Diorite Slab"],["polished_diorite_stairs","Polished Diorite Stairs"],["polished_granite","Polished Granite"],["polished_granite_double_slab","Polished Granite Double Slab"],["polished_granite_slab","Polished Granite Slab"],["polished_granite_stairs","Polished Granite Stairs"],["polished_sulfur","Polished Sulfur"],["polished_sulfur_double_slab","Polished Sulfur Double Slab"],["polished_sulfur_slab","Polished Sulfur Slab"],["polished_sulfur_stairs","Polished Sulfur Stairs"],["polished_sulfur_wall","Polished Sulfur Wall"],["polished_tuff","Polished Tuff"],["polished_tuff_double_slab","Polished Tuff Double Slab"],["polished_tuff_slab","Polished Tuff Slab"],["polished_tuff_stairs","Polished Tuff Stairs"],["polished_tuff_wall","Polished Tuff Wall"],["element_84","Polonium"],["poplar_boat","Poplar Boat"],["poplar_chest_boat","Poplar Boat with Chest"],["poplar_button","Poplar Button"],["poplar_door","Poplar Door"],["poplar_double_slab","Poplar Double Slab"],["poplar_fence","Poplar Fence"],["poplar_fence_gate","Poplar Fence Gate"],["poplar_hanging_sign","Poplar Hanging Sign"],["poplar_log","Poplar Log"],["poplar_planks","Poplar Planks"],["poplar_pressure_plate","Poplar Pressure Plate"],["poplar_sapling","Poplar Sapling"],["poplar_shelf","Poplar Shelf"],["poplar_sign","Poplar Sign"],["poplar_standing_sign","Poplar Sign"],["poplar_slab","Poplar Slab"],["poplar_stairs","Poplar Stairs"],["poplar_trapdoor","Poplar Trapdoor"],["poplar_wall_sign","Poplar Wall Sign"],["poplar_wood","Poplar Wood"],["popped_chorus_fruit","Popped Chorus Fruit"],["poppy","Poppy"],["portal","Portal"],["portfolio","Portfolio"],["element_19","Potassium"],["potato","Potato"],["potatoes","Potatoes"],["potent_sulfur","Potent Sulfur"],["powder_snow","Powder Snow"],["powder_snow_bucket","Powder Snow Bucket"],["powered_comparator","Powered Comparator"],["golden_rail","Powered Rail"],["powered_repeater","Powered Repeater"],["element_59","Praseodymium"],["prismarine","Prismarine"],["prismarine_brick_double_slab","Prismarine Brick Double Slab"],["prismarine_brick_slab","Prismarine Brick Slab"],["prismarine_bricks_stairs","Prismarine Brick Stairs"],["prismarine_bricks","Prismarine Bricks"],["prismarine_crystals","Prismarine Crystals"],["prismarine_double_slab","Prismarine DoubleSlab"],["prismarine_shard","Prismarine Shard"],["prismarine_slab","Prismarine Slab"],["prismarine_stairs","Prismarine Stairs"],["prismarine_wall","Prismarine Wall"],["prize_pottery_sherd","Prize Pottery Sherd"],["element_61","Promethium"],["element_91","Protactinium"],["pufferfish","Pufferfish"],["pufferfish_spawn_egg","Pufferfish Spawn Egg"],["pumpkin","Pumpkin"],["pumpkin_pie","Pumpkin Pie"],["pumpkin_seeds","Pumpkin Seeds"],["pumpkin_stem","Pumpkin Stem"],["purple_bundle","Purple Bundle"],["purple_candle","Purple Candle"],["purple_carpet","Purple Carpet"],["purple_concrete","Purple Concrete"],["purple_concrete_double_slab","Purple Concrete Double Slab"],["purple_concrete_powder","Purple Concrete Powder"],["purple_concrete_slab","Purple Concrete Slab"],["purple_concrete_stairs","Purple Concrete Stairs"],["purple_cushion","Purple Cushion"],["purple_dye","Purple Dye"],["purple_glazed_terracotta","Purple Glazed Terracotta"],["purple_harness","Purple Harness"],["purple_shulker_box","Purple Shulker Box"],["purple_stained_glass","Purple Stained Glass"],["purple_stained_glass_pane","Purple Stained Glass Pane"],["purple_terracotta","Purple Terracotta"],["colored_torch_purple","Purple Torch"],["purple_wool","Purple Wool"],["purple_wool_double_slab","Purple Wool Double Slab"],["purple_wool_slab","Purple Wool Slab"],["purple_wool_stairs","Purple Wool Stairs"],["purpur_block","Purpur Block"],["purpur_double_slab","Purpur Double Slab"],["purpur_pillar","Purpur Pillar"],["purpur_slab","Purpur Slab"],["purpur_stairs","Purpur Stairs"],["quartz_bricks","Quartz Bricks"],["quartz_pillar","Quartz Pillar"],["quartz_double_slab","Quartz Slab"],["quartz_slab","Quartz Slab"],["quartz_stairs","Quartz Stairs"],["rabbit_hide","Rabbit Hide"],["rabbit_spawn_egg","Rabbit Spawn Egg"],["rabbit_stew","Rabbit Stew"],["rabbit_foot","Rabbit's Foot"],["element_88","Radium"],["element_86","Radon"],["rail","Rail"],["raiser_armor_trim_smithing_template","Raiser Armor Trim"],["ravager_spawn_egg","Ravager Spawn Egg"],["beef","Raw Beef"],["chicken","Raw Chicken"],["cod","Raw Cod"],["raw_copper","Raw Copper"],["raw_gold","Raw Gold"],["raw_iron","Raw Iron"],["mutton","Raw Mutton"],["porkchop","Raw Porkchop"],["rabbit","Raw Rabbit"],["salmon","Raw Salmon"],["recovery_compass","Recovery Compass"],["red_bundle","Red Bundle"],["red_candle","Red Candle"],["red_carpet","Red Carpet"],["red_concrete","Red Concrete"],["red_concrete_double_slab","Red Concrete Double Slab"],["red_concrete_powder","Red Concrete Powder"],["red_concrete_slab","Red Concrete Slab"],["red_concrete_stairs","Red Concrete Stairs"],["red_cushion","Red Cushion"],["red_dye","Red Dye"],["red_flower","Red Flower"],["red_glazed_terracotta","Red Glazed Terracotta"],["red_harness","Red Harness"],["red_mushroom","Red Mushroom"],["red_mushroom_block","Red Mushroom Block"],["red_nether_brick_double_slab","Red Nether Brick Double Slab"],["red_nether_brick_slab","Red Nether Brick Slab"],["red_nether_brick_stairs","Red Nether Brick Stairs"],["red_nether_brick_wall","Red Nether Brick Wall"],["red_nether_brick","Red Nether Bricks"],["red_poplar_leaves","Red Poplar Leaves"],["red_sand","Red Sand"],["red_sandstone","Red Sandstone"],["red_sandstone_double_slab","Red Sandstone Slab"],["red_sandstone_slab","Red Sandstone Slab"],["red_sandstone_stairs","Red Sandstone Stairs"],["red_sandstone_wall","Red Sandstone Wall"],["red_shrub","Red Shrub"],["red_shulker_box","Red Shulker Box"],["red_stained_glass","Red Stained Glass"],["red_stained_glass_pane","Red Stained Glass Pane"],["red_terracotta","Red Terracotta"],["colored_torch_red","Red Torch"],["red_tulip","Red Tulip"],["red_wool","Red Wool"],["red_wool_double_slab","Red Wool Double Slab"],["red_wool_slab","Red Wool Slab"],["red_wool_stairs","Red Wool Stairs"],["redstone","Redstone Dust"],["redstone_wire","Redstone Dust"],["redstone_lamp","Redstone Lamp"],["redstone_ore","Redstone Ore"],["repeater","Redstone Repeater"],["redstone_torch","Redstone Torch"],["unlit_redstone_torch","Redstone Torch"],["reinforced_deepslate","Reinforced Deepslate"],["repeating_command_block","Repeating Command Block"],["resin_brick","Resin Brick"],["resin_brick_double_slab","Resin Brick Double Slab"],["resin_brick_slab","Resin Brick Slab"],["resin_brick_stairs","Resin Brick Stairs"],["resin_brick_wall","Resin Brick Wall"],["resin_bricks","Resin Bricks"],["resin_clump","Resin Clump"],["respawn_anchor","Respawn Anchor"],["element_75","Rhenium"],["element_45","Rhodium"],["rib_armor_trim_smithing_template","Rib Armor Trim"],["element_111","Roentgenium"],["dirt_with_roots","Rooted Dirt"],["rose_bush","Rose Bush"],["rotten_flesh","Rotten Flesh"],["element_37","Rubidium"],["element_44","Ruthenium"],["element_104","Rutherfordium"],["saddle","Saddle"],["salmon_spawn_egg","Salmon Spawn Egg"],["compound","Salt"],["element_62","Samarium"],["sand","Sand"],["sandstone","Sandstone"],["sandstone_double_slab","Sandstone Slab"],["sandstone_slab","Sandstone Slab"],["sandstone_stairs","Sandstone Stairs"],["sandstone_wall","Sandstone Wall"],["sapling","Sapling"],["scaffolding","Scaffolding"],["element_21","Scandium"],["scrape_pottery_sherd","Scrape Pottery Sherd"],["sculk","Sculk"],["sculk_catalyst","Sculk Catalyst"],["sculk_sensor","Sculk Sensor"],["sculk_shrieker","Sculk Shrieker"],["sculk_vein","Sculk Vein"],["sea_lantern","Sea Lantern"],["sea_pickle","Sea Pickle"],["element_106","Seaborgium"],["seagrass","Seagrass"],["element_34","Selenium"],["sentry_armor_trim_smithing_template","Sentry Armor Trim"],["shaper_armor_trim_smithing_template","Shaper Armor Trim"],["sheaf_pottery_sherd","Sheaf Pottery Sherd"],["shears","Shears"],["sheep_spawn_egg","Sheep Spawn Egg"],["shelf_mushroom","Shelf Mushroom"],["shelter_pottery_sherd","Shelter Pottery Sherd"],["shield","Shield"],["short_dry_grass","Short Dry Grass"],["short_grass","Short Grass"],["shroomlight","Shroomlight"],["shulker_box","Shulker Box"],["undyed_shulker_box","Shulker Box"],["shulker_shell","Shulker Shell"],["shulker_spawn_egg","Shulker Spawn Egg"],["standing_sign","Sign"],["silence_armor_trim_smithing_template","Silence Armor Trim"],["element_14","Silicon"],["element_47","Silver"],["silverfish_spawn_egg","Silverfish Spawn Egg"],["skeleton_horse_spawn_egg","Skeleton Horse Spawn Egg"],["skeleton_skull","Skeleton Skull"],["skeleton_spawn_egg","Skeleton Spawn Egg"],["skull","Skull"],["skull_banner_pattern","Skull Charge Banner Pattern"],["skull_pottery_sherd","Skull Pottery Sherd"],["board","Slate"],["slime","Slime Block"],["slime_spawn_egg","Slime Spawn Egg"],["slime_ball","Slimeball"],["small_amethyst_bud","Small Amethyst Bud"],["small_dripleaf_block","Small Dripleaf"],["smithing_table","Smithing Table"],["smoker","Smoker"],["smooth_basalt","Smooth Basalt"],["smooth_quartz","Smooth Quartz Block"],["smooth_quartz_double_slab","Smooth Quartz Double Slab"],["smooth_quartz_slab","Smooth Quartz Slab"],["smooth_quartz_stairs","Smooth Quartz Stairs"],["smooth_red_sandstone","Smooth Red Sandstone"],["smooth_red_sandstone_double_slab","Smooth Red Sandstone Double Slab"],["smooth_red_sandstone_slab","Smooth Red Sandstone Slab"],["smooth_red_sandstone_stairs","Smooth Red Sandstone Stairs"],["smooth_sandstone","Smooth Sandstone"],["smooth_sandstone_double_slab","Smooth Sandstone Double Slab"],["smooth_sandstone_slab","Smooth Sandstone Slab"],["smooth_sandstone_stairs","Smooth Sandstone Stairs"],["smooth_stone","Smooth Stone"],["smooth_stone_slab","Smooth Stone Slab"],["sniffer_egg","Sniffer Egg"],["sniffer_spawn_egg","Sniffer Spawn Egg"],["snort_pottery_sherd","Snort Pottery Sherd"],["snout_armor_trim_smithing_template","Snout Armor Trim"],["piglin_banner_pattern","Snout Banner Pattern"],["snow_layer","Snow"],["snow","Snow Block"],["snow_golem_spawn_egg","Snow Golem Spawn Egg"],["snowball","Snowball"],["element_11","Sodium"],["soul_campfire","Soul Campfire"],["soul_fire","Soul Fire"],["soul_lantern","Soul Lantern"],["soul_sand","Soul Sand"],["soul_soil","Soul Soil"],["soul_torch","Soul Torch"],["sparkler","Sparkler"],["spawn_egg","Spawn Egg"],["spider_eye","Spider Eye"],["spider_spawn_egg","Spider Spawn Egg"],["spire_armor_trim_smithing_template","Spire Armor Trim"],["splash_potion","Splash Water Bottle"],["sponge","Sponge"],["spore_blossom","Spore Blossom"],["spruce_boat","Spruce Boat"],["spruce_chest_boat","Spruce Boat with Chest"],["spruce_button","Spruce Button"],["spruce_door","Spruce Door"],["spruce_double_slab","Spruce Double Slab"],["spruce_fence","Spruce Fence"],["spruce_fence_gate","Spruce Fence Gate"],["spruce_hanging_sign","Spruce Hanging Sign"],["spruce_leaves","Spruce Leaves"],["spruce_log","Spruce Log"],["spruce_planks","Spruce Planks"],["spruce_pressure_plate","Spruce Pressure Plate"],["spruce_sapling","Spruce Sapling"],["spruce_shelf","Spruce Shelf"],["spruce_sign","Spruce Sign"],["spruce_standing_sign","Spruce Sign"],["spruce_slab","Spruce Slab"],["spruce_stairs","Spruce Stairs"],["spruce_trapdoor","Spruce Trapdoor"],["spruce_wall_sign","Spruce Wall Sign"],["spruce_wood","Spruce Wood"],["spyglass","Spyglass"],["squid_spawn_egg","Squid Spawn Egg"],["stained_glass","Stained Glass"],["stained_glass_pane","Stained Glass Pane"],["stained_hardened_clay","Stained Hardened Clay"],["cooked_beef","Steak"],["stick","Stick"],["sticky_piston","Sticky Piston"],["sticky_piston_arm_collision","Sticky Piston Arm Collision"],["stone","Stone"],["stone_axe","Stone Axe"],["stone_block_slab","Stone Block Slab"],["stone_block_slab2","Stone Block Slab2"],["stone_block_slab3","Stone Block Slab3"],["stone_block_slab4","Stone Block Slab4"],["stone_brick_double_slab","Stone Brick Slab"],["stone_brick_slab","Stone Brick Slab"],["stone_brick_stairs","Stone Brick Stairs"],["stone_brick_wall","Stone Brick Wall"],["stone_bricks","Stone Bricks"],["stone_button","Stone Button"],["normal_stone_double_slab","Stone Double Slab"],["stone_hoe","Stone Hoe"],["stone_pickaxe","Stone Pickaxe"],["stone_pressure_plate","Stone Pressure Plate"],["stone_shovel","Stone Shovel"],["normal_stone_slab","Stone Slab"],["smooth_stone_double_slab","Stone Slab"],["stone_spear","Stone Spear"],["normal_stone_stairs","Stone Stairs"],["stone_sword","Stone Sword"],["stonebrick","Stonebrick"],["stonecutter","Stonecutter"],["stonecutter_block","Stonecutter"],["straw_bed","Straw Bed"],["stray_spawn_egg","Stray Spawn Egg"],["strider_spawn_egg","Strider Spawn Egg"],["string","String"],["stripped_acacia_log","Stripped Acacia Log"],["stripped_acacia_wood","Stripped Acacia Wood"],["stripped_birch_log","Stripped Birch Log"],["stripped_birch_wood","Stripped Birch Wood"],["stripped_cherry_log","Stripped Cherry Log"],["stripped_cherry_wood","Stripped Cherry Wood"],["stripped_crimson_hyphae","Stripped Crimson Hyphae"],["stripped_crimson_stem","Stripped Crimson Stem"],["stripped_dark_oak_log","Stripped Dark Oak Log"],["stripped_dark_oak_wood","Stripped Dark Oak Wood"],["stripped_jungle_log","Stripped Jungle Log"],["stripped_jungle_wood","Stripped Jungle Wood"],["stripped_mangrove_log","Stripped Mangrove Log"],["stripped_mangrove_wood","Stripped Mangrove Wood"],["stripped_oak_log","Stripped Oak Log"],["stripped_oak_wood","Stripped Oak Wood"],["stripped_pale_oak_log","Stripped Pale Oak Log"],["stripped_pale_oak_wood","Stripped Pale Oak Wood"],["stripped_poplar_log","Stripped Poplar Log"],["stripped_poplar_wood","Stripped Poplar Wood"],["stripped_spruce_log","Stripped Spruce Log"],["stripped_spruce_wood","Stripped Spruce Wood"],["stripped_warped_hyphae","Stripped Warped Hyphae"],["stripped_warped_stem","Stripped Warped Stem"],["element_38","Strontium"],["structure_block","Structure Block"],["structure_void","Structure Void"],["sugar","Sugar"],["sugar_cane","Sugar Cane"],["element_16","Sulfur"],["sulfur","Sulfur"],["sulfur_brick_double_slab","Sulfur Brick Double Slab"],["sulfur_brick_slab","Sulfur Brick Slab"],["sulfur_brick_stairs","Sulfur Brick Stairs"],["sulfur_brick_wall","Sulfur Brick Wall"],["sulfur_bricks","Sulfur Bricks"],["sulfur_cube_spawn_egg","Sulfur Cube Spawn Egg"],["sulfur_double_slab","Sulfur Double Slab"],["sulfur_slab","Sulfur Slab"],["sulfur_spike","Sulfur Spike"],["sulfur_stairs","Sulfur Stairs"],["sulfur_wall","Sulfur Wall"],["sunflower","Sunflower"],["rapid_fertilizer","Super Fertilizer"],["suspicious_gravel","Suspicious Gravel"],["suspicious_sand","Suspicious Sand"],["suspicious_stew","Suspicious Stew"],["sweet_berries","Sweet Berries"],["sweet_berry_bush","Sweet Berry Bush"],["tadpole_spawn_egg","Tadpole Spawn Egg"],["tall_dry_grass","Tall Dry Grass"],["tall_grass","Tall Grass"],["tallgrass","Tallgrass"],["element_73","Tantalum"],["target","Target"],["element_43","Technetium"],["element_52","Tellurium"],["element_117","Tennessine"],["element_65","Terbium"],["hardened_clay","Terracotta"],["element_81","Thallium"],["mojang_banner_pattern","Thing Banner Pattern"],["element_90","Thorium"],["element_69","Thulium"],["tide_armor_trim_smithing_template","Tide Armor Trim"],["element_50","Tin"],["tinted_glass","Tinted Glass"],["element_22","Titanium"],["tnt","TNT"],["underwater_tnt","TNT"],["torch","Torch"],["torchflower","Torchflower"],["torchflower_crop","Torchflower Crop"],["torchflower_seeds","Torchflower Seeds"],["totem_of_undying","Totem of Undying"],["trader_llama_spawn_egg","Trader Llama Spawn Egg"],["trapped_chest","Trapped Chest"],["trial_key","Trial Key"],["trial_spawner","Trial Spawner"],["trident","Trident"],["trip_wire","Tripwire"],["tripwire_hook","Tripwire Hook"],["tropical_fish","Tropical Fish"],["tropical_fish_spawn_egg","Tropical Fish Spawn Egg"],["tube_coral","Tube Coral"],["tube_coral_block","Tube Coral Block"],["tube_coral_fan","Tube Coral Fan"],["tube_coral_wall_fan","Tube Coral Wall Fan"],["tuff","Tuff"],["tuff_brick_double_slab","Tuff Brick Double Slab"],["tuff_brick_slab","Tuff Brick Slab"],["tuff_brick_stairs","Tuff Brick Stairs"],["tuff_brick_wall","Tuff Brick Wall"],["tuff_bricks","Tuff Bricks"],["tuff_double_slab","Tuff Double Slab"],["tuff_slab","Tuff Slab"],["tuff_stairs","Tuff Stairs"],["tuff_wall","Tuff Wall"],["element_74","Tungsten"],["turtle_egg","Turtle Egg"],["turtle_scute","Turtle Scute"],["turtle_helmet","Turtle Shell"],["turtle_spawn_egg","Turtle Spawn Egg"],["twisting_vines","Twisting Vines"],["underwater_torch","Underwater Torch"],["element_0","Unknown Element"],["unpowered_comparator","Unpowered Comparator"],["unpowered_repeater","Unpowered Repeater"],["element_92","Uranium"],["element_23","Vanadium"],["vault","Vault"],["verdant_froglight","Verdant Froglight"],["vex_armor_trim_smithing_template","Vex Armor Trim"],["vex_spawn_egg","Vex Spawn Egg"],["villager_spawn_egg","Villager Spawn Egg"],["vindicator_spawn_egg","Vindicator Spawn Egg"],["vine","Vines"],["wall_banner","Wall Banner"],["wall_sign","Wall Sign"],["wandering_trader_spawn_egg","Wandering Trader Spawn Egg"],["ward_armor_trim_smithing_template","Ward Armor Trim"],["warden_spawn_egg","Warden Spawn Egg"],["warped_button","Warped Button"],["warped_door","Warped Door"],["warped_fence","Warped Fence"],["warped_fence_gate","Warped Fence Gate"],["warped_fungus","Warped Fungus"],["warped_fungus_on_a_stick","Warped Fungus on a Stick"],["warped_hanging_sign","Warped Hanging Sign"],["warped_hyphae","Warped Hyphae"],["warped_nylium","Warped Nylium"],["warped_planks","Warped Planks"],["warped_pressure_plate","Warped Pressure Plate"],["warped_roots","Warped Roots"],["warped_shelf","Warped Shelf"],["warped_sign","Warped Sign"],["warped_standing_sign","Warped Sign"],["warped_wall_sign","Warped Sign"],["warped_double_slab","Warped Slab"],["warped_slab","Warped Slab"],["warped_stairs","Warped Stairs"],["warped_stem","Warped Stem"],["warped_trapdoor","Warped Trapdoor"],["warped_wart_block","Warped Wart Block"],["flowing_water","Water"],["water","Water"],["potion","Water Bottle"],["water_bucket","Water Bucket"],["waxed_copper","Waxed Block of Copper"],["waxed_chiseled_copper","Waxed Chiseled Copper"],["waxed_copper_bars","Waxed Copper Bars"],["waxed_copper_bulb","Waxed Copper Bulb"],["waxed_copper_chain","Waxed Copper Chain"],["waxed_copper_chest","Waxed Copper Chest"],["waxed_copper_door","Waxed Copper Door"],["waxed_copper_golem_statue","Waxed Copper Golem Statue"],["waxed_copper_grate","Waxed Copper Grate"],["waxed_copper_lantern","Waxed Copper Lantern"],["waxed_copper_trapdoor","Waxed Copper Trapdoor"],["waxed_cut_copper","Waxed Cut Copper"],["waxed_double_cut_copper_slab","Waxed Cut Copper Double Slab"],["waxed_cut_copper_slab","Waxed Cut Copper Slab"],["waxed_cut_copper_stairs","Waxed Cut Copper Stairs"],["waxed_exposed_chiseled_copper","Waxed Exposed Chiseled Copper"],["waxed_exposed_copper","Waxed Exposed Copper"],["waxed_exposed_copper_bars","Waxed Exposed Copper Bars"],["waxed_exposed_copper_bulb","Waxed Exposed Copper Bulb"],["waxed_exposed_copper_chain","Waxed Exposed Copper Chain"],["waxed_exposed_copper_chest","Waxed Exposed Copper Chest"],["waxed_exposed_copper_door","Waxed Exposed Copper Door"],["waxed_exposed_copper_golem_statue","Waxed Exposed Copper Golem Statue"],["waxed_exposed_copper_grate","Waxed Exposed Copper Grate"],["waxed_exposed_copper_lantern","Waxed Exposed Copper Lantern"],["waxed_exposed_copper_trapdoor","Waxed Exposed Copper Trapdoor"],["waxed_exposed_cut_copper","Waxed Exposed Cut Copper"],["waxed_exposed_double_cut_copper_slab","Waxed Exposed Cut Copper Double Slab"],["waxed_exposed_cut_copper_slab","Waxed Exposed Cut Copper Slab"],["waxed_exposed_cut_copper_stairs","Waxed Exposed Cut Copper Stairs"],["waxed_exposed_lightning_rod","Waxed Exposed Lightning Rod"],["waxed_lightning_rod","Waxed Lightning Rod"],["waxed_oxidized_chiseled_copper","Waxed Oxidized Chiseled Copper"],["waxed_oxidized_copper","Waxed Oxidized Copper"],["waxed_oxidized_copper_bars","Waxed Oxidized Copper Bars"],["waxed_oxidized_copper_bulb","Waxed Oxidized Copper Bulb"],["waxed_oxidized_copper_chain","Waxed Oxidized Copper Chain"],["waxed_oxidized_copper_chest","Waxed Oxidized Copper Chest"],["waxed_oxidized_copper_door","Waxed Oxidized Copper Door"],["waxed_oxidized_copper_golem_statue","Waxed Oxidized Copper Golem Statue"],["waxed_oxidized_copper_grate","Waxed Oxidized Copper Grate"],["waxed_oxidized_copper_lantern","Waxed Oxidized Copper Lantern"],["waxed_oxidized_copper_trapdoor","Waxed Oxidized Copper Trapdoor"],["waxed_oxidized_cut_copper","Waxed Oxidized Cut Copper"],["waxed_oxidized_double_cut_copper_slab","Waxed Oxidized Cut Copper Double Slab"],["waxed_oxidized_cut_copper_slab","Waxed Oxidized Cut Copper Slab"],["waxed_oxidized_cut_copper_stairs","Waxed Oxidized Cut Copper Stairs"],["waxed_oxidized_lightning_rod","Waxed Oxidized Lightning Rod"],["waxed_weathered_chiseled_copper","Waxed Weathered Chiseled Copper"],["waxed_weathered_copper","Waxed Weathered Copper"],["waxed_weathered_copper_bars","Waxed Weathered Copper Bars"],["waxed_weathered_copper_bulb","Waxed Weathered Copper Bulb"],["waxed_weathered_copper_chain","Waxed Weathered Copper Chain"],["waxed_weathered_copper_chest","Waxed Weathered Copper Chest"],["waxed_weathered_copper_door","Waxed Weathered Copper Door"],["waxed_weathered_copper_golem_statue","Waxed Weathered Copper Golem Statue"],["waxed_weathered_copper_grate","Waxed Weathered Copper Grate"],["waxed_weathered_copper_lantern","Waxed Weathered Copper Lantern"],["waxed_weathered_copper_trapdoor","Waxed Weathered Copper Trapdoor"],["waxed_weathered_cut_copper","Waxed Weathered Cut Copper"],["waxed_weathered_double_cut_copper_slab","Waxed Weathered Cut Copper Double Slab"],["waxed_weathered_cut_copper_slab","Waxed Weathered Cut Copper Slab"],["waxed_weathered_cut_copper_stairs","Waxed Weathered Cut Copper Stairs"],["waxed_weathered_lightning_rod","Waxed Weathered Lightning Rod"],["wayfinder_armor_trim_smithing_template","Wayfinder Armor Trim"],["weathered_chiseled_copper","Weathered Chiseled Copper"],["weathered_copper","Weathered Copper"],["weathered_copper_bars","Weathered Copper Bars"],["weathered_copper_bulb","Weathered Copper Bulb"],["weathered_copper_chain","Weathered Copper Chain"],["weathered_copper_chest","Weathered Copper Chest"],["weathered_copper_door","Weathered Copper Door"],["weathered_copper_golem_statue","Weathered Copper Golem Statue"],["weathered_copper_grate","Weathered Copper Grate"],["weathered_copper_lantern","Weathered Copper Lantern"],["weathered_copper_trapdoor","Weathered Copper Trapdoor"],["weathered_cut_copper","Weathered Cut Copper"],["weathered_double_cut_copper_slab","Weathered Cut Copper Double Slab"],["weathered_cut_copper_slab","Weathered Cut Copper Slab"],["weathered_cut_copper_stairs","Weathered Cut Copper Stairs"],["weathered_lightning_rod","Weathered Lightning Rod"],["weeping_vines","Weeping Vines"],["wet_sponge","Wet Sponge"],["wheat","Wheat"],["wheat_seeds","Wheat Seeds"],["balloon","White Balloon"],["bed","White Bed"],["white_bundle","White Bundle"],["white_candle","White Candle"],["white_carpet","White Carpet"],["white_concrete","White Concrete"],["white_concrete_double_slab","White Concrete Double Slab"],["white_concrete_powder","White Concrete Powder"],["white_concrete_slab","White Concrete Slab"],["white_concrete_stairs","White Concrete Stairs"],["white_cushion","White Cushion"],["white_dye","White Dye"],["white_glazed_terracotta","White Glazed Terracotta"],["white_harness","White Harness"],["white_shulker_box","White Shulker Box"],["white_stained_glass","White Stained Glass"],["white_stained_glass_pane","White Stained Glass Pane"],["white_terracotta","White Terracotta"],["white_tulip","White Tulip"],["white_wool","White Wool"],["white_wool_double_slab","White Wool Double Slab"],["white_wool_slab","White Wool Slab"],["white_wool_stairs","White Wool Stairs"],["wild_armor_trim_smithing_template","Wild Armor Trim"],["wildflowers","Wildflowers"],["wind_charge","Wind Charge"],["witch_spawn_egg","Witch Spawn Egg"],["wither_rose","Wither Rose"],["wither_skeleton_skull","Wither Skeleton Skull"],["wither_skeleton_spawn_egg","Wither Skeleton Spawn Egg"],["wither_spawn_egg","Wither Spawn Egg"],["wolf_armor","Wolf Armor"],["wolf_spawn_egg","Wolf Spawn Egg"],["wood","Wood"],["wooden_axe","Wooden Axe"],["wooden_hoe","Wooden Hoe"],["wooden_pickaxe","Wooden Pickaxe"],["wooden_shovel","Wooden Shovel"],["petrified_oak_double_slab","Wooden Slab"],["petrified_oak_slab","Wooden Slab"],["wooden_slab","Wooden Slab"],["wooden_spear","Wooden Spear"],["wooden_sword","Wooden Sword"],["wool","Wool"],["written_book","Written Book"],["element_54","Xenon"],["yellow_bundle","Yellow Bundle"],["yellow_candle","Yellow Candle"],["yellow_carpet","Yellow Carpet"],["yellow_concrete","Yellow Concrete"],["yellow_concrete_double_slab","Yellow Concrete Double Slab"],["yellow_concrete_powder","Yellow Concrete Powder"],["yellow_concrete_slab","Yellow Concrete Slab"],["yellow_concrete_stairs","Yellow Concrete Stairs"],["yellow_cushion","Yellow Cushion"],["yellow_dye","Yellow Dye"],["yellow_glazed_terracotta","Yellow Glazed Terracotta"],["yellow_harness","Yellow Harness"],["yellow_poplar_leaves","Yellow Poplar Leaves"],["yellow_shulker_box","Yellow Shulker Box"],["yellow_stained_glass","Yellow Stained Glass"],["yellow_stained_glass_pane","Yellow Stained Glass Pane"],["yellow_terracotta","Yellow Terracotta"],["yellow_wool","Yellow Wool"],["yellow_wool_double_slab","Yellow Wool Double Slab"],["yellow_wool_slab","Yellow Wool Slab"],["yellow_wool_stairs","Yellow Wool Stairs"],["element_70","Ytterbium"],["element_39","Yttrium"],["element_30","Zinc"],["element_40","Zirconium"],["zoglin_spawn_egg","Zoglin Spawn Egg"],["zombie_head","Zombie Head"],["zombie_horse_spawn_egg","Zombie Horse Spawn Egg"],["zombie_nautilus_spawn_egg","Zombie Nautilus Spawn Egg"],["zombie_spawn_egg","Zombie Spawn Egg"],["zombie_villager_spawn_egg","Zombie Villager Spawn Egg"],["zombie_pigman_spawn_egg","Zombified Piglin Spawn Egg"]];

  const ENCHANTS = [
    { id: 8, name: "aqua_affinity", label: "Aqua Affinity", max: 1 },
    { id: 11, name: "bane_of_arthropods", label: "Bane of Arthropods", max: 5 },
    { id: 3, name: "blast_protection", label: "Blast Protection", max: 4 },
    { id: 40, name: "breach", label: "Breach", max: 4 },
    { id: 32, name: "channeling", label: "Channeling", max: 1 },
    { id: 27, name: "binding_curse", label: "Curse of Binding", max: 1 },
    { id: 28, name: "vanishing_curse", label: "Curse of Vanishing", max: 1 },
    { id: 39, name: "density", label: "Density", max: 5 },
    { id: 7, name: "depth_strider", label: "Depth Strider", max: 3 },
    { id: 15, name: "efficiency", label: "Efficiency", max: 5 },
    { id: 2, name: "feather_falling", label: "Feather Falling", max: 4 },
    { id: 13, name: "fire_aspect", label: "Fire Aspect", max: 2 },
    { id: 1, name: "fire_protection", label: "Fire Protection", max: 4 },
    { id: 21, name: "flame", label: "Flame", max: 1 },
    { id: 18, name: "fortune", label: "Fortune", max: 3 },
    { id: 25, name: "frost_walker", label: "Frost Walker", max: 2 },
    { id: 29, name: "impaling", label: "Impaling", max: 5 },
    { id: 22, name: "infinity", label: "Infinity", max: 1 },
    { id: 12, name: "knockback", label: "Knockback", max: 2 },
    { id: 14, name: "looting", label: "Looting", max: 3 },
    { id: 31, name: "loyalty", label: "Loyalty", max: 3 },
    { id: 23, name: "luck_of_the_sea", label: "Luck of the Sea", max: 3 },
    { id: 41, name: "lunge", label: "Lunge", max: 3 },
    { id: 24, name: "lure", label: "Lure", max: 3 },
    { id: 26, name: "mending", label: "Mending", max: 1 },
    { id: 33, name: "multishot", label: "Multishot", max: 1 },
    { id: 34, name: "piercing", label: "Piercing", max: 4 },
    { id: 19, name: "power", label: "Power", max: 5 },
    { id: 4, name: "projectile_protection", label: "Projectile Protection", max: 4 },
    { id: 0, name: "protection", label: "Protection", max: 4 },
    { id: 20, name: "punch", label: "Punch", max: 2 },
    { id: 35, name: "quick_charge", label: "Quick Charge", max: 3 },
    { id: 6, name: "respiration", label: "Respiration", max: 3 },
    { id: 30, name: "riptide", label: "Riptide", max: 3 },
    { id: 9, name: "sharpness", label: "Sharpness", max: 5 },
    { id: 16, name: "silk_touch", label: "Silk Touch", max: 1 },
    { id: 10, name: "smite", label: "Smite", max: 5 },
    { id: 36, name: "soul_speed", label: "Soul Speed", max: 3 },
    { id: 37, name: "swift_sneak", label: "Swift Sneak", max: 3 },
    { id: 5, name: "thorns", label: "Thorns", max: 3 },
    { id: 17, name: "unbreaking", label: "Unbreaking", max: 3 },
    { id: 38, name: "wind_burst", label: "Wind Burst", max: 3 }
  ];

  const ITEM_BY_NAME = new Map(ITEMS.map(function (entry) {
    return [entry[0], entry[1]];
  }));
  const ENCHANT_BY_ID = new Map(ENCHANTS.map(function (entry) {
    return [entry.id, entry];
  }));

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

  function u32be(value) {
    return Uint8Array.of((value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255);
  }

  function i16(value) {
    const out = new Uint8Array(2);
    new DataView(out.buffer).setInt16(0, value, true);
    return out;
  }

  function i32(value) {
    const out = new Uint8Array(4);
    new DataView(out.buffer).setInt32(0, value, true);
    return out;
  }

  function f32(value) {
    const out = new Uint8Array(4);
    new DataView(out.buffer).setFloat32(0, value, true);
    return out;
  }

  function f64(value) {
    const out = new Uint8Array(8);
    new DataView(out.buffer).setFloat64(0, value, true);
    return out;
  }

  function utf8(value) {
    return new TextEncoder().encode(value);
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
      const name = utf8(file.path);
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
    return concat(locals.concat([centralDir, end]));
  }

  function adler32(bytes) {
    let a = 1;
    let b = 0;
    for (let i = 0; i < bytes.length; i++) {
      a = (a + bytes[i]) % 65521;
      b = (b + a) % 65521;
    }
    return ((b << 16) | a) >>> 0;
  }

  function zlibStore(raw) {
    const len = raw.length;
    const nlen = (~len) & 0xffff;
    const header = Uint8Array.of(0x78, 0x01, 0x01, len & 255, (len >> 8) & 255, nlen & 255, (nlen >> 8) & 255);
    return concat([header, raw, u32be(adler32(raw))]);
  }

  function pngChunk(type, data) {
    const typeBytes = utf8(type);
    return concat([u32be(data.length), typeBytes, data, u32be(crc32(concat([typeBytes, data])))]);
  }

  function packIconPng() {
    const size = 16;
    const rows = [];
    for (let y = 0; y < size; y++) {
      const row = new Uint8Array(1 + size * 4);
      for (let x = 0; x < size; x++) {
        const edge = x === 0 || y === 0 || x === size - 1 || y === size - 1;
        const i = 1 + x * 4;
        row[i] = edge ? 14 : 8;
        row[i + 1] = edge ? 186 : 6;
        row[i + 2] = edge ? 255 : 18;
        row[i + 3] = 255;
      }
      rows.push(row);
    }
    const ihdr = concat([u32be(size), u32be(size), Uint8Array.of(8, 6, 0, 0, 0)]);
    const pngSig = Uint8Array.of(137, 80, 78, 71, 13, 10, 26, 10);
    return concat([
      pngSig,
      pngChunk("IHDR", ihdr),
      pngChunk("IDAT", zlibStore(concat(rows))),
      pngChunk("IEND", new Uint8Array(0))
    ]);
  }

  function named(type, name, payload) {
    const nameBytes = utf8(name);
    return concat([Uint8Array.of(type), u16(nameBytes.length), nameBytes, payload]);
  }

  function tagByte(name, value) {
    return named(1, name, Uint8Array.of(value & 255));
  }

  function tagShort(name, value) {
    return named(2, name, i16(value));
  }

  function tagInt(name, value) {
    return named(3, name, i32(value));
  }

  function tagString(name, value) {
    const bytes = utf8(value);
    return named(8, name, concat([u16(bytes.length), bytes]));
  }

  function tagList(name, childType, payloads) {
    return named(9, name, concat([Uint8Array.of(childType), i32(payloads.length)].concat(payloads)));
  }

  function compoundPayload(children) {
    return concat(children.concat([Uint8Array.of(0)]));
  }

  function tagCompound(name, children) {
    return named(10, name, compoundPayload(children));
  }

  function listInts(values) {
    return concat([Uint8Array.of(3), i32(values.length)].concat(values.map(i32)));
  }

  function cleanName(name) {
    return String(name || "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, 40);
  }

  function fileBase(name) {
    const clean = cleanName(name).replace(/[<>:"/\\|?*]/g, "").replace(/\.+$/g, "").trim();
    return clean || "";
  }

  function cleanDescription(value) {
    return String(value || "").replace(/[\u0000-\u001f]/g, " ").replace(/ +/g, " ").trim().slice(0, 240);
  }

  function jsonBytes(value) {
    return utf8(JSON.stringify(value, null, 2) + "\n");
  }

  function textBytes(value) {
    return utf8(value);
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

  function itemIdOf(value) {
    const text = String(value || "").trim().toLowerCase();
    const name = text.startsWith("minecraft:") ? text.slice(10) : text;
    if (!ITEM_BY_NAME.has(name)) return "";
    return "minecraft:" + name;
  }

  function clampLevel(value) {
    const number = Math.round(Number(value));
    if (!Number.isFinite(number)) return 0;
    return Math.max(1, Math.min(MAX_LEVEL, number));
  }

  function normalizeEnchants(list) {
    const seen = new Map();
    for (const entry of list || []) {
      const id = Number(entry && entry.id);
      const known = ENCHANT_BY_ID.get(id);
      if (!known) throw new Error("Unknown enchant.");
      const level = clampLevel(entry.level == null ? known.max : entry.level);
      if (!level) throw new Error("Enchant level must be from 1 to " + MAX_LEVEL + ".");
      seen.set(id, level);
    }
    return Array.from(seen, function (pair) {
      return { id: pair[0], level: pair[1] };
    });
  }

  function structureName(index) {
    return "illegal_item_" + index;
  }

  function structureBytes(item) {
    const enchants = item.enchants || [];
    const itemChildren = [
      tagString("Name", item.id),
      tagByte("Count", 1),
      tagShort("Damage", 0),
      tagByte("WasPickedUp", 0)
    ];
    if (enchants.length) {
      const enchantPayloads = enchants.map(function (enchant) {
        return compoundPayload([
          tagShort("id", enchant.id),
          tagShort("lvl", enchant.level)
        ]);
      });
      itemChildren.push(tagCompound("tag", [
        tagList("ench", 10, enchantPayloads)
      ]));
    }
    const entity = compoundPayload([
      tagString("identifier", "minecraft:item"),
      tagList("Pos", 6, [f64(0.5), f64(0.5), f64(0.5)]),
      tagList("Motion", 6, [f64(0), f64(0), f64(0)]),
      tagList("Rotation", 5, [f32(0), f32(0)]),
      tagShort("Age", 0),
      tagShort("Health", 5),
      tagShort("PickupDelay", 0),
      tagCompound("Item", itemChildren)
    ]);
    const air = compoundPayload([
      tagString("name", "minecraft:air"),
      tagCompound("states", []),
      tagInt("version", BLOCK_VERSION)
    ]);
    return tagCompound("", [
      tagInt("format_version", 1),
      tagList("size", 3, [i32(1), i32(1), i32(1)]),
      tagCompound("structure", [
        tagList("block_indices", 9, [listInts([-1]), listInts([-1])]),
        tagList("entities", 10, [entity]),
        tagCompound("palette", [
          tagCompound("default", [
            tagList("block_palette", 10, [air]),
            tagCompound("block_position_data", [])
          ])
        ])
      ]),
      tagList("structure_world_origin", 3, [i32(0), i32(0), i32(0)])
    ]);
  }

  function manifest(name, description, headerUuid, moduleUuid) {
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
        type: "data",
        uuid: moduleUuid,
        version: [1, 0, 0]
      }]
    };
  }

  function buildMcaddon(options) {
    const name = cleanName(options && options.name);
    const base = fileBase(name);
    if (!name || !base) throw new Error("Enter a pack name.");
    const source = (options && options.items) || [];
    if (!source.length) throw new Error("Add at least one item.");
    if (source.length > MAX_ITEMS) throw new Error("You can add " + MAX_ITEMS + " items.");
    const items = source.map(function (entry) {
      const id = itemIdOf(entry && (entry.id || entry.name));
      if (!id) throw new Error("Unknown item.");
      return { id: id, enchants: normalizeEnchants(entry && entry.enchants) };
    });
    const customDescription = cleanDescription(options && options.description);
    const countNote = items.length + " illegal item" + (items.length === 1 ? "" : "s");
    const description = customDescription || ("Behavior pack. " + countNote + ". Use /function givei or /tag @s add givei.");
    const bpHeader = namedUuid(name + "\nillegal-bp-header");
    const bpModule = namedUuid(name + "\nillegal-bp-module");
    const dir = base + " BP/";
    const loads = items.map(function (_, index) {
      return "execute as @a[tag=givei] at @s run structure load mystructure:" + structureName(index) + " ~ ~ ~ 0_degrees none true false";
    });
    const files = [
      { path: dir + "manifest.json", data: jsonBytes(manifest(name, description, bpHeader, bpModule)) },
      { path: dir + "pack_icon.png", data: packIconPng() },
      {
        path: dir + "functions/tick.json",
        data: jsonBytes({ values: ["givei_spawn"] })
      },
      {
        path: dir + "functions/givei.mcfunction",
        data: textBytes("tag @s add givei\n")
      },
      {
        path: dir + "functions/givei_spawn.mcfunction",
        data: textBytes(loads.concat(["tag @a[tag=givei] remove givei", ""]).join("\n"))
      }
    ];
    items.forEach(function (item, index) {
      files.push({
        path: dir + "structures/" + structureName(index) + ".mcstructure",
        data: structureBytes(item)
      });
    });
    return {
      filename: base + ".mcaddon",
      bytes: zipStore(files),
      behaviorUuid: bpHeader,
      structures: items.map(function (_, index) { return structureName(index); })
    };
  }

  function mount() {
    const card = document.getElementById("item-generator");
    if (!card || card.dataset.ready === "1") return;
    card.dataset.ready = "1";

    const nameInput = document.getElementById("item-pack-name");
    const descInput = document.getElementById("item-pack-desc");
    const built = document.getElementById("item-built");
    const count = document.getElementById("item-count");
    const search = document.getElementById("item-search");
    const catalog = document.getElementById("item-catalog");
    const note = document.getElementById("item-tab-note");
    const match = document.getElementById("item-match");
    const status = document.getElementById("item-status");
    const button = document.getElementById("item-download");
    const itemsTab = document.getElementById("item-tab-items");
    const enchantsTab = document.getElementById("item-tab-enchants");
    const picked = [];
    let selectedId = "";
    let tab = "items";
    let nextId = 1;
    let catalogTimer = 0;
    let catalogReady = false;

    function setStatus(message, isError) {
      status.textContent = message || "";
      status.classList.toggle("is-error", Boolean(isError));
    }

    function escapeText(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function selected() {
      return picked.find(function (entry) { return entry.uid === selectedId; }) || null;
    }

    function enchantLabel(enchant) {
      const known = ENCHANT_BY_ID.get(enchant.id);
      return (known ? known.label : "Enchant") + " " + enchant.level;
    }

    function renderBuilt() {
      count.textContent = String(picked.length);
      button.disabled = picked.length === 0 || !cleanName(nameInput.value);
      if (selectedId && !selected()) selectedId = picked[0] ? picked[0].uid : "";
      built.innerHTML = picked.map(function (entry, index) {
        const summary = entry.enchants.length
          ? entry.enchants.map(enchantLabel).join(", ")
          : "No enchants";
        const selectedClass = entry.uid === selectedId ? " is-selected" : "";
        return (
          '<li class="built-item' + selectedClass + '" data-id="' + entry.uid + '">' +
            '<span class="skin-meta">' +
              '<strong>' + structureName(index) + "</strong>" +
              "<span>" + escapeText(entry.label) + "</span>" +
              "<span>" + escapeText(summary) + "</span>" +
            "</span>" +
            '<button type="button" class="skin-remove" aria-label="Remove ' + escapeText(entry.label) + '">Remove</button>' +
          "</li>"
        );
      }).join("");
    }

    function renderCatalog() {
      catalogReady = true;
      const query = search.value.trim().toLowerCase();
      itemsTab.classList.toggle("is-on", tab === "items");
      enchantsTab.classList.toggle("is-on", tab === "enchants");
      itemsTab.setAttribute("aria-selected", tab === "items" ? "true" : "false");
      enchantsTab.setAttribute("aria-selected", tab === "enchants" ? "true" : "false");
      search.placeholder = tab === "items" ? "Search items" : "Search enchants";
      if (tab === "enchants") {
        const current = selected();
        if (!current) {
          note.textContent = "Add an item, then select it to set its enchants.";
          catalog.innerHTML = "";
          match.textContent = "";
          return;
        }
        const index = picked.indexOf(current);
        note.textContent = "Enchants for " + current.label + " (" + structureName(index) + "). Level can be 1 to 255. You can go past the usual max.";
        const rows = ENCHANTS.filter(function (enchant) {
          if (!query) return true;
          return enchant.label.toLowerCase().indexOf(query) !== -1 || enchant.name.indexOf(query) !== -1;
        });
        catalog.innerHTML = rows.map(function (enchant) {
          const owned = current.enchants.find(function (entry) { return entry.id === enchant.id; });
          const maxNote = '<span class="enchant-max">usual max ' + enchant.max + "</span>";
          if (!owned) {
            return (
              '<button type="button" class="item-pick" data-add-enchant="' + enchant.id + '">' +
                '<span><span class="item-name">' + escapeText(enchant.label) + "</span> " + maxNote + "</span>" +
                "<span>Add</span>" +
              "</button>"
            );
          }
          return (
            '<div class="enchant-row">' +
              '<span><span class="item-name">' + escapeText(enchant.label) + "</span> " + maxNote + "</span>" +
              '<label class="enchant-level-label">Level' +
                '<input class="enchant-level" type="number" min="1" max="255" inputmode="numeric" value="' + owned.level + '" data-enchant="' + enchant.id + '">' +
              "</label>" +
              '<button type="button" class="skin-remove" data-remove-enchant="' + enchant.id + '">Remove</button>' +
            "</div>"
          );
        }).join("");
        match.textContent = rows.length + " enchant" + (rows.length === 1 ? "" : "s");
        return;
      }
      note.textContent = "Search the item list and press Add. Each item can be added more than once.";
      const rows = ITEMS.filter(function (entry) {
        if (!query) return true;
        return entry[1].toLowerCase().indexOf(query) !== -1 || entry[0].indexOf(query) !== -1;
      });
      catalog.innerHTML = rows.map(function (entry) {
        return (
          '<button type="button" class="item-pick" data-add-item="' + entry[0] + '">' +
            '<span class="skin-meta">' +
              '<span class="item-name">' + escapeText(entry[1]) + "</span>" +
              '<span class="item-id">minecraft:' + entry[0] + "</span>" +
            "</span>" +
            "<span>Add</span>" +
          "</button>"
        );
      }).join("");
      match.textContent = rows.length + " item" + (rows.length === 1 ? "" : "s");
    }

    function ensureCatalog() {
      if (catalogReady) return;
      const panel = document.getElementById("packs");
      if (panel && panel.hidden) return;
      renderCatalog();
    }

    function scheduleCatalog() {
      window.clearTimeout(catalogTimer);
      catalogTimer = window.setTimeout(renderCatalog, 50);
    }

    nameInput.addEventListener("input", function () {
      renderBuilt();
      if (status.classList.contains("is-error") && cleanName(nameInput.value)) setStatus("");
    });

    itemsTab.addEventListener("click", function () {
      if (tab !== "items") search.value = "";
      tab = "items";
      renderCatalog();
    });
    enchantsTab.addEventListener("click", function () {
      if (tab !== "enchants") search.value = "";
      tab = "enchants";
      renderCatalog();
    });
    search.addEventListener("input", scheduleCatalog);

    catalog.addEventListener("click", function (event) {
      const addItem = event.target.closest("[data-add-item]");
      if (addItem) {
        if (picked.length >= MAX_ITEMS) {
          setStatus("Max is 30 items.", true);
          return;
        }
        const name = addItem.getAttribute("data-add-item");
        const label = ITEM_BY_NAME.get(name);
        if (!label) return;
        const entry = { uid: String(nextId++), name: name, label: label, enchants: [] };
        picked.push(entry);
        selectedId = entry.uid;
        renderBuilt();
        setStatus("Added " + label + ". Structure " + structureName(picked.length - 1) + ".");
        return;
      }
      const addEnchant = event.target.closest("[data-add-enchant]");
      if (addEnchant) {
        const current = selected();
        if (!current) return;
        const id = Number(addEnchant.getAttribute("data-add-enchant"));
        const known = ENCHANT_BY_ID.get(id);
        if (!known || current.enchants.some(function (entry) { return entry.id === id; })) return;
        current.enchants.push({ id: id, level: known.max });
        renderBuilt();
        renderCatalog();
        setStatus("");
        return;
      }
      const removeEnchant = event.target.closest("[data-remove-enchant]");
      if (!removeEnchant) return;
      const current = selected();
      if (!current) return;
      const id = Number(removeEnchant.getAttribute("data-remove-enchant"));
      current.enchants = current.enchants.filter(function (entry) { return entry.id !== id; });
      renderBuilt();
      renderCatalog();
    });

    catalog.addEventListener("input", function (event) {
      const input = event.target.closest(".enchant-level");
      if (!input) return;
      const current = selected();
      if (!current) return;
      const value = Number(input.value);
      if (!Number.isInteger(value) || value < 1 || value > MAX_LEVEL) return;
      const id = Number(input.dataset.enchant);
      const enchant = current.enchants.find(function (entry) { return entry.id === id; });
      if (!enchant) return;
      enchant.level = value;
      renderBuilt();
    });

    catalog.addEventListener("change", function (event) {
      const input = event.target.closest(".enchant-level");
      if (!input) return;
      const current = selected();
      if (!current) return;
      const id = Number(input.dataset.enchant);
      const enchant = current.enchants.find(function (entry) { return entry.id === id; });
      if (!enchant) return;
      enchant.level = clampLevel(input.value) || enchant.level;
      input.value = String(enchant.level);
      renderBuilt();
    });

    built.addEventListener("click", function (event) {
      const row = event.target.closest(".built-item");
      if (!row) return;
      if (event.target.closest(".skin-remove")) {
        const index = picked.findIndex(function (entry) { return entry.uid === row.dataset.id; });
        if (index < 0) return;
        const removed = picked.splice(index, 1)[0];
        if (selectedId === removed.uid) selectedId = picked[index] ? picked[index].uid : (picked[index - 1] ? picked[index - 1].uid : "");
        renderBuilt();
        if (tab === "enchants") renderCatalog();
        setStatus("");
        return;
      }
      selectedId = row.dataset.id;
      renderBuilt();
      if (tab === "enchants") renderCatalog();
    });

    button.addEventListener("click", function () {
      const name = cleanName(nameInput.value);
      if (!name || !fileBase(name)) {
        setStatus("Enter a pack name.", true);
        nameInput.focus();
        return;
      }
      if (!picked.length) {
        setStatus("Add at least one item.", true);
        return;
      }
      try {
        const pack = buildMcaddon({
          name: name,
          description: descInput.value,
          items: picked.map(function (entry) {
            return {
              id: "minecraft:" + entry.name,
              enchants: entry.enchants.map(function (enchant) {
                return { id: enchant.id, level: enchant.level };
              })
            };
          })
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
        setStatus("Downloaded " + pack.filename + ". Turn the behavior pack on, then use /function givei or /tag @s add givei.");
      } catch (error) {
        setStatus(error.message || "Could not build the pack.", true);
      }
    });

    renderBuilt();
    ensureCatalog();
    window.addEventListener("hashchange", ensureCatalog);
  }

  return {
    MAX_ITEMS: MAX_ITEMS,
    MAX_LEVEL: MAX_LEVEL,
    ITEMS: ITEMS,
    ENCHANTS: ENCHANTS,
    structureName: structureName,
    structureBytes: structureBytes,
    buildMcaddon: buildMcaddon,
    mount: mount
  };
});

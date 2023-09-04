// SCRIPTING API

declare interface IScriptTileEntity {
    readonly minecraftTileEntity: TileEntity
    readonly id: string
    data: INBTCompound
    readonly tileData: INBTCompound
    /**
     * Get Minecraft tile entity instance. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @example
     *    function main(c)
     *    {
     *        var itemInFirstSlot = c.getWorld().getTileEntity(-218, 101, 199).getMinecraftTileEntity().func_70301_a(0)
     *
     *        c.send(itemInFirstSlot)
     *    }
     *
     * @returns {@link TileEntity}
     */
    getMinecraftTileEntity(): TileEntity
    /**
     * Get tile entity's ID.
     *
     * @example
     *    function main(c)
     *    {
     *        var BlockTileEntity = c.getWorld().getTileEntity(-218, 101, 199)
     *
     *        c.send(BlockTileEntity.getId())
     *    }
     *
     * @returns {@link string}
     */
    getId(): string
    /**
     * Check whether this tile entity is invalid (i.e. was removed from the world
     * or unavailable for some reason).
     *
     * @example
     *    function main(c)
     *    {
     *        var BlockTileEntity = c.getWorld().getTileEntity(-218, 101, 199)
     *
     *        c.send(BlockTileEntity.isInvalid())
     *    }
     *
     * @returns {@link boolean}
     */
    isInvalid(): boolean
    /**
     * Get (a copy of) this tile entity's NBT data.
     *
     * @example
     *    function main(c)
     *    {
     *        var BlockTileEntity = c.getWorld().getTileEntity(-218, 101, 199)
     *
     *        c.send(BlockTileEntity.getData())
     *    }
     *
     * @returns {@link INBTCompound}
     */
    getData(): INBTCompound
    /**
     * Overwrite NBT data of this tile entity. <b>WARNING</b>: use it only if you
     * know what are you doing as this method can corrupt tile entities.
     *
     * @example
     *    function main(c)
     *    {
     *        var BlockTileEntity = c.getWorld().getTileEntity(-218, 101, 199)
     *        var tag = mappet.createCompound('{CookTime:0,x:-218,BurnTime:0,y:101,z:199,Item:[],id:"minecraft:furnace",CookTimeTotal:0,Lock:""}')
     *
     *        BlockTileEntity.setData(tag)
     *    }
     *
     * @param compound INBTCompound
     * @returns {@link void}
     */
    setData(compound: INBTCompound): void
    /**
     * Get Forge's custom tag compound in which you can story any
     * data you want.
     *
     * <p>There is no setter method as you can directly work with returned
     * NBT compound. Any changes to returned compound <b>will be reflected
     * upon tile entity's data</b>.</p>
     *
     * @example
     *    function main(c)
     *    {
     *        var BlockTileEntity = c.getWorld().getTileEntity(-218, 101, 199)
     *
     *        c.send(BlockTileEntity.getTileData())
     *    }
     *
     * @returns {@link INBTCompound}
     */
    getTileData(): INBTCompound
}

declare interface IScriptBlockState {
    readonly minecraftBlockState: IBlockState
    readonly blockId: string
    readonly meta: number
    /**
     * Get Minecraft block state instance. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @returns {@link IBlockState}
     */
    getMinecraftBlockState(): IBlockState
    /**
     * Get block's ID like <code>minecraft:stone</code>.
     *
     * @example
     *    var block = c.getWorld().getBlock(214, 3, 511);
     *
     *    c.getSubject().send("Block at (214, 3, 511) is " + block.getBlockId());
     *
     * @returns {@link string}
     */
    getBlockId(): string
    /**
     * Get meta value of this state (it will always be between 0 and 15).
     *
     * @example
     *    var andesite = mappet.createBlockState("minecraft:stone", 5);
     *
     *    // This will print "Andesite's meta is 5"
     *    c.getSubject().send("Andesite's meta is " + andesite.getMeta());
     *
     * @returns {@link number}
     */
    getMeta(): number
    /**
     * Check whether this block state is same as given block state.
     *
     * @example
     *    var andesite = mappet.createBlockState("minecraft:stone", 5);
     *
     *    if (c.getWorld().getBlock(214, 3, 511).isSame(andesite))
     *    {
     *        c.getSubject().send("Block at (214, 3, 511) is indeed andesite!");
     *    }
     *
     * @param state IScriptBlockState
     * @returns {@link boolean}
     */
    isSame(state: IScriptBlockState): boolean
    /**
     * Check whether given block state has the same block, but
     * not necessarily the same meta value.
     *
     * @example
     *    var andesite = mappet.createBlockState("minecraft:stone", 5);
     *    var stone = mappet.createBlockState("minecraft:stone", 0);
     *
     *    // This will print true
     *    c.getSubject().send(stone.isSameBlock(andesite));
     *
     * @param state IScriptBlockState
     * @returns {@link boolean}
     */
    isSameBlock(state: IScriptBlockState): boolean
    /**
     * Check whether given block state is occupying a full block entirely,
     * rather than being see through or not full (1, 1, 1) block space.
     *
     * @returns {@link boolean}
     */
    isOpaque(): boolean
    /**
     * Check whether given block state has collision boxes. Minecraft's block
     * state code requires a world instance and block coordinates to be passed,
     * because collision box can be different depending on the place in the world.
     *
     * @param world IScriptWorld
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link boolean}
     */
    hasCollision(world: IScriptWorld, x: number, y: number, z: number): boolean
    /**
     * Check whether given block state is air.
     *
     * @returns {@link boolean}
     */
    isAir(): boolean
}

declare interface ScriptVector {
    /**
     * Convert this vector to an array string
     *
     * @example
     *    function main(c)
     *    {
     *        var subject = c.getSubject();
     *        var subjectPosition = subject.getPosition();
     *        c.send("The player is at " + subjectPosition.toArrayString() + "!");
     *        // The player is at [x, y, z]!
     *    }
     *
     * @returns {@link string}
     */
    toArrayString(): string
}

declare interface ScriptBox {
    /**
     * Offsets the box by given coordinates
     *
     * @example
     *    function main(c)
     *    {
     *        var box = mappet.box(-10, 4, -10, 10, 6, 10);
     *        box.offset(10, 0, 10);
     *        c.send(box.toString()); // ScriptBox(0.0, 4.0, 0.0, 20.0, 6.0, 20.0)
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    offset(x: number, y: number, z: number): void
    /**
     * Checks if given coordinates are inside of this box
     *
     * @example
     *    function main(c)
     *    {
     *        var box = mappet.box(-10, 4, -10, 10, 6, 10);
     *        if (box.contains(0, 4, 0)){
     *            c.send("this point is inside the box")
     *        }
     *        if (box.contains(0, 7, 0)){
     *            c.send("this point is outside the box")
     *        }
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link boolean}
     */
    contains(x: number, y: number, z: number): boolean
    /**
     * Checks if given coordinates are inside of this box
     *
     * @example
     *    function main(c)
     *    {
     *        var subject = c.getSubject();
     *        var subjectPosition = subject.getPosition();
     *        var box = mappet.box(-10, 4, -10, 10, 6, 10);
     *        if (box.contains(subjectPosition)){
     *            c.send("the player in in the box")
     *        }
     *    }
     *
     * @param vector ScriptVector
     * @returns {@link boolean}
     */
    contains(vector: ScriptVector): boolean
    /**
     * Returns a list of positions for blocks in the box that match a given block state in a given world.
     *
     * @example
     *    function main(c)
     *    {
     *        var world = c.getWorld();
     *        var state = mappet.createBlockState("minecraft:stone");
     *        var box = mappet.box(-10, 4, -10, 10, 6, 10);
     *        var blockPositions = box.getBlocksPositions(world, state);
     *
     *        var blockPositionsString = "[";
     *        blockPositions.forEach(function(position) {
     *            blockPositionsString += position.toArrayString() + ", ";
     *        });
     *        blockPositionsString = blockPositionsString.substring(0, blockPositionsString.length - 2);
     *        blockPositionsString += "]";
     *        print(blockPositions);
     *    }
     *
     * @param scriptWorld ScriptWorld
     * @param state ScriptBlockState
     * @returns {@link List} - A list of positions for blocks that match the given block state.
     */
    getBlocksPositions(scriptWorld: IScriptWorld, state: IScriptBlockState): List<ScriptVector>
}

declare interface IScriptPlayer extends IScriptEntity {
    readonly minecraftPlayer: EntityPlayerMP
    gameMode: number
    readonly inventory: IScriptInventory
    readonly enderChest: IScriptInventory
    readonly spawnPoint: ScriptVector
    walkSpeed: number
    flySpeed: number
    hotbarIndex: number
    readonly skin: string
    readonly xpLevel: number
    readonly xpPoints: number
    hunger: number
    saturation: number
    readonly quests: IMappetQuests
    readonly UIContext: IMappetUIContext
    readonly displayedHUDs: INBTCompound
    readonly globalDisplayedHUDs: INBTCompound
    /**
     * Get Minecraft player entity instance. <b>BEWARE:</b> you need to know the
     * MCP mappings in order to directly call methods on this instance!
     *
     * @returns {@link EntityPlayerMP}
     */
    getMinecraftPlayer(): EntityPlayerMP
    /**
     * Get player's game mode.
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    var player = c.getSubject();
     *    var gamemode = player.getGameMode();
     *
     *    if (gamemode === 0)
     *    {
     *        player.send("You're in survival mode!");
     *    }
     *
     * @returns {@link number} - Player's game mode as an integer, <code>0</code> is survival, <code>1</code>
 is creative, <code>2</code> is adventure , and <code>3</code> is spectator.
     */
    getGameMode(): number
    /**
     * Set player's game mode.
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    var player = c.getSubject();
     *    var gamemode = c.getSubject().getGameMode();
     *
     *    // When player exits the mining region, set their game mode back to adventure
     *    if (gamemode === 0 && !player.getStates().has("region.mining_factory"))
     *    {
     *        player.setGameMode(2);
     *    }
     *
     * @param gameMode number
     * @returns {@link void}
     */
    setGameMode(gameMode: number): void
    /**
     * Get player's inventory.
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    var inventory = c.getSubject().getInventory();
     *    var item = mappet.createItem("minecraft:diamond_sword");
     *
     *    // This will change the first slot in the hotbar to a diamond sword
     *    inventory.setStack(0, item);
     *
     * @returns {@link IScriptInventory}
     */
    getInventory(): IScriptInventory
    /**
     * Get player's ender chest inventory.
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    var inventory = c.getSubject().getEnderChest();
     *    var item = mappet.createItem("minecraft:diamond_sword");
     *
     *    // This will change the first slot in player's ender chest to a diamond sword
     *    inventory.setStack(0, item);
     *
     * @returns {@link IScriptInventory}
     */
    getEnderChest(): IScriptInventory
    /**
     * Executes a command as a player.
     *
     * @example
     *    function main(c)
     *    {
     *        c.getSubject().executeCommand("/kill");
     *    }
     *
     * @param command string
     * @returns {@link void}
     */
    executeCommand(command: string): void
    /**
     * Sets the player's spawn point.
     *
     * @example
     *    c.getSubject().setSpawnPoint(0, 0, 0);
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    setSpawnPoint(x: number, y: number, z: number): void
    /**
     * Gets the player's spawn point.
     *
     * @example
     *    var spawnPoint = c.getSubject().getSpawnPoint();
     *    c.send("Spawn point: " + spawnPoint.x + ", " + spawnPoint.y + ", " + spawnPoint.z);
     *
     * @returns {@link ScriptVector}
     */
    getSpawnPoint(): ScriptVector
    /**
     * Returns if the player is flying.
     *
     * @example
     *    function main(c) {
     *        c.send("Is the player flying? " + c.getSubject().isFlying());
     *    }
     *
     * @returns {@link boolean}
     */
    isFlying(): boolean
    /**
     * Returns if the walk speed of the player.
     *
     * @example
     *    function main(c) {
     *        c.send("The walk speed of the player is: " + c.getSubject().getWalkSpeed());
     *    }
     *
     * @returns {@link number}
     */
    getWalkSpeed(): number
    /**
     * Allows the player to fly in whatever game mode they're in.
     *
     * @example
     *    c.getSubject().setFlyingEnabled(true);
     *
     * @param enabled boolean
     * @returns {@link void}
     */
    setFlyingEnabled(enabled: boolean): void
    /**
     * Returns if the flight speed of the player.
     *
     * @example
     *    function main(c)
     *    {
     *        c.send("The flight speed of the player is: " + c.getSubject().getFlySpeed());
     *    }
     *
     * @returns {@link number}
     */
    getFlySpeed(): number
    /**
     * Set the walk speed of the player.
     *
     * @example
     *    function main(c)
     *    {
     *        c.getSubject().setWalkSpeed(0.5);
     *    }
     *
     * @param speed number
     * @returns {@link void}
     */
    setWalkSpeed(speed: number): void
    /**
     * Set the flight speed of the player.
     *
     * @example
     *    function main(c)
     *    {
     *        c.getSubject().setFlySpeed(0.5);
     *    }
     *
     * @param speed number
     * @returns {@link void}
     */
    setFlySpeed(speed: number): void
    /**
     * Reset the flight speed of the player.
     *
     * @example
     *    function main(c)
     *    {
     *        c.getSubject().resetFlySpeed();
     *    }
     *
     * @returns {@link void}
     */
    resetFlySpeed(): void
    /**
     * Reset the walking speed of the player.
     *
     * @example
     *    function main(c)
     *    {
     *        c.getSubject().resetWalkSpeed();
     *    }
     *
     * @returns {@link void}
     */
    resetWalkSpeed(): void
    /**
     * Get cooldown of a particular inventory index of the player.
     *
     * @example
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *        var cooldown = player.getCooldown(40); // tip: 40 is the offhand slot
     *
     *        c.send(The held item cooldown " + ((1 - cooldown) * 100) + " percent expired.");
     *    }
     *
     * @param inventorySlot number
     * @returns {@link number}
     */
    getCooldown(inventorySlot: number): number
    /**
     * Get cooldown of a particular inventory index of the player.
     *
     * @example
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *        var item = mappet.createItem("minecraft:diamond_sword");
     *        var cooldown = player.getCooldown(item);
     *
     *        c.send(The held item cooldown " + ((1 - cooldown) * 100) + " percent expired.");
     *    }
     *
     * @param item IScriptItemStack
     * @returns {@link number}
     */
    getCooldown(item: IScriptItemStack): number
    /**
     * Set cooldown of a particular inventory index of the player.
     *
     * @example
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *
     *        player.setCooldown(player.getHotbarIndex(), 100); // tip: 40 is the offhand slot
     *    }
     *
     * @param inventorySlot number
     * @param ticks number
     * @returns {@link void}
     */
    setCooldown(inventorySlot: number, ticks: number): void
    /**
     * Set cooldown for given item.
     *
     * @example
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *        var item = mappet.createItem("minecraft:diamond_sword");
     *
     *        player.setCooldown(item, 100);
     *    }
     *
     * @param item IScriptItemStack
     * @param ticks number
     * @returns {@link void}
     */
    setCooldown(item: IScriptItemStack, ticks: number): void
    /**
     * Reset cooldown for given item.
     *
     * @example
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *
     *        player.resetCooldown(player.getMainItemInventoryIndex()); // tip: 40 is the offhand slot
     *    }
     *
     * @param inventorySlot number
     * @returns {@link void}
     */
    resetCooldown(inventorySlot: number): void
    /**
     * Reset cooldown of a particular inventory index of the player.
     *
     * @example
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *        var item = mappet.createItem("minecraft:diamond_sword");
     *
     *        player.resetCooldown(item);
     *    }
     *
     * @param item IScriptItemStack
     * @returns {@link void}
     */
    resetCooldown(item: IScriptItemStack): void
    /**
     * Get the inventory index of main item. Useful for e.g. main hand's cooldown methods.
     *
     * @example
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *
     *        player.setCooldown(player.getHotbarIndex(), 100); //tip: 40 is the offhand slot
     *    }
     *
     * @returns {@link number}
     */
    getHotbarIndex(): number
    /**
     * Set forcefully player's current hotbar inventory index. Acceptable values are <code>0</code> - <code>8</code>.
     *
     * @param slot number
     * @returns {@link void}
     */
    setHotbarIndex(slot: number): void
    /**
     * Send a message to this player.
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    c.send("I love all my players equally.");
     *    c.getSubject().send("...but between you and me, you're my favorite player ;)");
     *
     * @param message string
     * @returns {@link void}
     */
    send(message: string): void
    /**
     * Send a message to this player using text component (like <code>/tellraw</code> command).
     *
     * @example
     *    var message = mappet.createCompound();
     *
     *    message.setString("text", "This message displays an item...");
     *    message.setString("color", "gold");
     *    message.setNBT("hoverEvent",'{action:"show_item",value:"{id:\\"minecraft:diamond_hoe\\",Count:1b}"}');
     *
     *    c.getSubject().sendRaw(message);
     *
     * @param message INBT
     * @returns {@link void}
     */
    sendRaw(message: INBT): void
    /**
     * Get player's skin.
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    var player = c.getSubject();
     *    var morph = mappet.createMorph('{Name:"blockbuster.fred",Skin:"' + player.getSkin() + '",Pose:"dabbing"}');
     *
     *    player.setMorph(morph);
     *
     * @returns {@link string} - Resource location in format of "minecraft:skins/..." (which can be used in morphs)
     */
    getSkin(): string
    /**
     * Send title and subtitle durations (in ticks, <code>20</code> ticks = <code>1</code> second).
     * These must be sent before sending title or subtitle.
     *
     * <p><b>BEWARE</b>: these durations will stay the same until player logs out, so you may want
     * to change them before every time you send title and subtitle.</p>
     *
     * <p>Default values are: fadeIn = <code>10</code> ticks, idle = <code>70</code> ticks,
     * fadeOut = <code>20</code> ticks.</p>
     *
     * @example
     *    var player = c.getSubject();
     *
     *    player.sendTitleDurations(5, 10, 5);
     *    player.sendTitle("Quick!");
     *    player.sendSubtitle("Get into cover!");
     *
     * @param fadeIn number
     * @param idle number
     * @param fadeOut number
     * @returns {@link void}
     */
    sendTitleDurations(fadeIn: number, idle: number, fadeOut: number): void
    /**
     * Send the title to this player that will be displayed in the middle of the screen.
     *
     * @example
     *    c.getSubject().sendTitle("Hello, world!");
     *
     * @param title string
     * @returns {@link void}
     */
    sendTitle(title: string): void
    /**
     * Send the subtitle to this player that will be displayed in the middle of the
     * screen. Title must be sent as well, using {@link #sendTitle(String)}, in order
     * for subtitle to appear.
     *
     * @example
     *    c.getSubject().sendTitle("Hello,");
     *    c.getSubject().sendSubtitle("world!");
     *
     * @param title string
     * @returns {@link void}
     */
    sendSubtitle(title: string): void
    /**
     * Send a message to this player that will be displayed in action bar. The duration
     * of action bar line is <code>60</code> ticks (<code>3</code> seconds).
     *
     * @param title string
     * @returns {@link void}
     */
    sendActionBar(title: string): void
    /**
     * Set experience level and amount of points for that level.
     *
     * @example
     *    // For more information of how levels work (i.e. how many points per
     *    // level to level up) see this table:
     *    // https://minecraft.fandom.com/wiki/Experience#Leveling_up
     *
     *    // Set player's XP level to 17 and half of the bar (level 17 has
     *    // 42 points in total to level up)
     *    c.getSubject().setXp(17, 21);
     *
     * @param level number
     * @param points number
     * @returns {@link void}
     */
    setXp(level: number, points: number): void
    /**
     * Add experience points to this player. Inputting more points than player's
     * current level can contain will result into leveling up one or more times.
     *
     * @example
     *    // For more information of how levels work (i.e. how many points per
     *    // level to level up) see this table:
     *    // https://minecraft.fandom.com/wiki/Experience#Leveling_up
     *
     *    // Add 1000 experience points
     *    c.getSubject().addXp(1000);
     *
     * @param points number
     * @returns {@link void}
     */
    addXp(points: number): void
    /**
     * Get player's current experience level.
     *
     * @example
     *    // For more information of how levels work (i.e. how many points per
     *    // level to level up) see this table:
     *    // https://minecraft.fandom.com/wiki/Experience#Leveling_up
     *
     *    var s = c.getSubject();
     *
     *    if (s.getXpLevel() < 50)
     *    {
     *        var section = "�";
     *
     *        // Teleport the player out of the area
     *        s.setPosition(10, 4, -15);
     *        s.send("Come back when you're level" + section + "7 50" + section + "r!");
     *    }
     *
     * @returns {@link number}
     */
    getXpLevel(): number
    /**
     * Get player's experience points in their current level.
     *
     * @returns {@link number}
     */
    getXpPoints(): number
    /**
     * Play a sound event only to this player.
     *
     * <p>For all possible sound event IDs, please refer to either <code>/playsound</code>
     * command, or script editor's sound picker.</p>
     *
     * @example
     *    var player = c.getSubject();
     *    var pos = player.getPosition();
     *
     *    player.playSound("minecraft:entity.pig.ambient", pos.x, pos.y, pos.z);
     *
     * @param event string
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    playSound(event: string, x: number, y: number, z: number): void
    /**
     * Play a sound event only to this player at specific sound channel.
     *
     * @example
     *    var player = c.getSubject();
     *    var pos = player.getPosition();
     *
     *    player.playSound("minecraft:entity.pig.ambient", "voice", pos.x, pos.y, pos.z);
     *
     * @param event string
     * @param soundCategory string
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    playSound(event: string, soundCategory: string, x: number, y: number, z: number): void
    /**
     * Play a sound event only to this player with volume and pitch at specific channel.
     *
     * @example
     *    var player = c.getSubject();
     *    var pos = player.getPosition();
     *
     *    player.playSound("minecraft:entity.pig.ambient", "voice", pos.x, pos.y, pos.z, 1.0, 0.8);
     *
     * @param event string
     * @param soundCategory string
     * @param x number
     * @param y number
     * @param z number
     * @param volume number
     * @param pitch number
     * @returns {@link void}
     */
    playSound(event: string, soundCategory: string, x: number, y: number, z: number, volume: number, pitch: number): void
    /**
     * Play a sound event only to this player with volume and pitch.
     *
     * @example
     *    var player = c.getSubject();
     *    var pos = player.getPosition();
     *
     *    player.playSound("minecraft:entity.pig.ambient", pos.x, pos.y, pos.z, 1.0, 0.8);
     *
     * @param event string
     * @param x number
     * @param y number
     * @param z number
     * @param volume number
     * @param pitch number
     * @returns {@link void}
     */
    playSound(event: string, x: number, y: number, z: number, volume: number, pitch: number): void
    /**
     * Stop all playing sound events for this player.
     *
     * @example
     *    c.getWorld().stopAllSounds();
     *
     * @returns {@link void}
     */
    stopAllSounds(): void
    /**
     * Stop specific sound event for this player.
     *
     * @example
     *    c.getWorld().stopSound("minecraft:entity.pig.ambient");
     *
     * @param event string
     * @returns {@link void}
     */
    stopSound(event: string): void
    /**
     * <p>Stop specific sound event in given sound category for this player.</p>
     *
     * <p>For list of sound categories, type into chat
     * <code>/playsound minecraft:entity.pig.ambient</code>, press space, and press
     * Tab key. The list of sounds categories will be displayed.</p>
     *
     * @example
     *    c.getWorld().stopSound("minecraft:entity.pig.ambient", "master");
     *
     * @param event string
     * @param category string
     * @returns {@link void}
     */
    stopSound(event: string, category: string): void
    /**
     * Play a sound event to this player stationary.
     *
     * <p>The difference between this method and {@link #playSound(String, double, double, double, float, float)}
     * is that if player will get teleported, the sound will continue playing.</p>
     *
     * @example
     *    var player = c.getSubject();
     *
     *    player.playStaticSound("minecraft:block.portal.ambient", 1.0, 0.8);
     *
     *    c.scheduleScript(20, function (c)
     *    {
     *        c.getSubject().setPosition(-15, 4, 561);
     *    });
     *
     * @param event string
     * @param volume number
     * @param pitch number
     * @returns {@link void}
     */
    playStaticSound(event: string, volume: number, pitch: number): void
    /**
     * Play a sound event to this player stationary at specific channel.
     *
     * <p>The difference between this method and {@link #playSound(String, double, double, double, float, float)}
     * is that if player will get teleported, the sound will continue playing.</p>
     *
     * @example
     *    var player = c.getSubject();
     *
     *    player.playStaticSound("minecraft:block.portal.ambient", "voice", 1.0, 0.8);
     *
     *    c.scheduleScript(20, function (c)
     *    {
     *        c.getSubject().setPosition(-15, 4, 561);
     *    });
     *
     * @param event string
     * @param soundCategory string
     * @param volume number
     * @param pitch number
     * @returns {@link void}
     */
    playStaticSound(event: string, soundCategory: string, volume: number, pitch: number): void
    /**
     * Get entity's quests (if it has some, only players have quests).
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    var quests = c.getSubject().getQuests();
     *
     *    if (!quests.has("important_quest"))
     *    {
     *        c.getSubject().send("I think you should complete the main quest chain before attempting side quests...");
     *    }
     *
     * @returns {@link IMappetQuests}
     */
    getQuests(): IMappetQuests
    /**
     * Open UI for this player.
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI().background();
     *        var button = ui.button("Push me").id("button");
     *
     *        // Place a button in the middle of the screen
     *        button.rxy(0.5, 0.5).wh(80, 20).anchor(0.5);
     *        c.getSubject().openUI(ui);
     *    }
     *
     * @param builder IMappetUIBuilder
     * @returns {@link void}
     */
    openUI(builder: IMappetUIBuilder): void
    /**
     * Open UI for this player with default data populated.
     *
     * <p>By default, default data population is disabled, meaning that
     * once the UI was opened, UI context's data will be empty. By enabling
     * default data population, UI context's data gets filled with all
     * component's default data.</p>
     *
     * <p>This is useful when you need to data to be present in the handler
     * at start, so you wouldn't need to do extra checks.</p>
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI(c, "handler").background();
     *        var button = ui.button("Push me").id("button");
     *        var name = ui.textbox("John").id("name");
     *        var lastname = ui.textbox("Smith").id("lastname");
     *
     *        // Place a button in the middle of the screen
     *        button.rxy(0.5, 0.5).wh(80, 20).anchor(0.5);
     *        name.rx(0.5).ry(0.5, 25).wh(80, 20).anchor(0.5);
     *        lastname.rx(0.5).ry(0.5, 50).wh(80, 20).anchor(0.5);
     *
     *        // Open the UI with default data populated
     *        c.getSubject().openUI(ui, true);
     *    }
     *
     *    function handler(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *        var data = uiContext.getData();
     *
     *        // If false was passed into openUI as second argument
     *        // Then name or last name wouldn't be immediately populated
     *        // as John Smith
     *        c.send("Your name is: " + data.getString("name") + " " + data.getString("lastname"));
     *    }
     *
     * @param builder IMappetUIBuilder
     * @param defaultData boolean
     * @returns {@link boolean}
     */
    openUI(builder: IMappetUIBuilder, defaultData: boolean): boolean
    /**
     * Close the user interface.
     *
     * <p>You can use this method to close any GUI that player has opened, inventory,
     * chests, command block menu, Mappet dashboard, etc. However, Mappet won't close
     * the in-game pause menu (to avoid potential griefing).</p>
     *
     * @returns {@link void}
     */
    closeUI(): void
    /**
     * Get the UI context of currently opened user UI. See {@link IMappetUIContext}
     * for code examples.
     *
     * @returns {@link IMappetUIContext}
     */
    getUIContext(): IMappetUIContext
    /**
     * Returns the faction of the npc as a string
     *
     * @example
     *    for each (var faction in c.getSubject().getFactions()){
     *       c.send(faction)
     *    }
     *
     * @returns {@link Set}
     */
    getFactions(): Set<string>
    /**
     * Setup (initiate) an HUD scene for this player.
     *
     * @param id string
     * @returns {@link boolean}
     */
    setupHUD(id: string): boolean
    /**
     * Change a morph in a HUD scene at given index with given morph.
     *
     * @param id string
     * @param index number
     * @param morph AbstractMorph
     * @returns {@link void}
     */
    changeHUDMorph(id: string, index: number, morph: AbstractMorph): void
    /**
     * Close all HUD scenes.
     *
     * @returns {@link void}
     */
    closeAllHUD(): void
    /**
     * Close specific HUD scene for this player.
     *
     * @param id string
     * @returns {@link void}
     */
    closeHUD(id: string): void
    /**
     * Get all HUD scenes (including global HUDs) that are currently displayed for this player.
     *
     * @example
     *    var player = c.getSubject();
     *    var huds = player.getDisplayedHUDs();
     *    print(huds);
     *
     * @returns {@link INBTCompound}
     */
    getDisplayedHUDs(): INBTCompound
    /**
     * Get all global HUD scenes that are currently saved on player and displayed for him and other players.
     *
     * @example
     *    var player = c.getSubject();
     *    var huds = player.getGlobalDisplayedHUDs();
     *    print(huds);
     *
     * @returns {@link INBTCompound}
     */
    getGlobalDisplayedHUDs(): INBTCompound
    /**
     * Plays an Aperture scene for this player.
     *
     * @example
     *    c.getSubject().playScene("scene_name");
     *
     * @param sceneName string
     * @returns {@link void}
     */
    playScene(sceneName: string): void
    /**
     * Plays Aperture scenes for this player.
     *
     * @example
     *    c.getSubject().stopScene();
     *
     * @returns {@link void}
     */
    stopScene(): void
}

declare interface IScriptNpc extends IScriptEntity {
    readonly mappetNpc: EntityNpc
    readonly npcId: string
    npcState: string
    readonly faction: string
    readonly steeringOffsets: List<ScriptVector>
    npcSpeed: number
    jumpPower: number
    shadowSize: number
    xpValue: number
    pathDistance: number
    attackRange: number
    damageDelay: number
    /**
     * Get Mappet entity NPC instance. <b>BEWARE:</b> you need to know the
     * MCP mappings in order to directly call methods on this instance!
     *
     * <p>But some methods might have human readable method names. Please
     * check <a href="https://github.com/mchorse/mappet/blob/master/src/main/java/mchorse/mappet/entities/EntityNpc.java">EntityNpc</a> class for methods that
     * don't have {@link Override} annotation!</p>
     *
     * @returns {@link EntityNpc}
     */
    getMappetNpc(): EntityNpc
    /**
     * Get NPC's NPC ID.
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *    var npc = c.getWorld().spawnNpc("test", pos.x, pos.y + 2, pos.z);
     *
     *    // This will output "true" as long as you have an NPC configured
     *    // in Mappet's NPC dashboard panel
     *    c.send(npc.getNpcId() === "test");
     *
     * @returns {@link string}
     */
    getNpcId(): string
    /**
     * Get NPC's state.
     *
     * @example
     *    c.send(c.getSubject().getNpcState());
     *
     * @returns {@link string}
     */
    getNpcState(): string
    /**
     * Set NPC's state.
     *
     * @example
     *    c.getSubject().setNpcState("default");
     *
     * @param stateId string
     * @returns {@link void}
     */
    setNpcState(stateId: string): void
    /**
     * Make NPC can pick up stuff.
     *
     * @example
     *    c.getSubject().canPickUpLoot(true);
     *
     * @param canPickUpLoot boolean
     * @returns {@link void}
     */
    canPickUpLoot(canPickUpLoot: boolean): void
    /**
     * Make NPC follow a target.
     *
     * @example
     *    c.getSubject().follow("@r");
     *
     * @param target string
     * @returns {@link void}
     */
    follow(target: string): void
    /**
     * Returns the faction of the NPC as a string
     *
     * @example
     *    c.send(c.getSubject().getFaction())
     *
     * @returns {@link string}
     */
    getFaction(): string
    /**
     * Sets whether the NPC can be steered.
     *
     * @example
     *    c.getSubject().setCanBeSteered(true);
     *
     * @param enabled boolean
     * @returns {@link void}
     */
    setCanBeSteered(enabled: boolean): void
    /**
     * Checks if the NPC can be steered.
     *
     * @example
     *    c.getSubject().canBeSteered();
     *
     * @returns {@link boolean}
     */
    canBeSteered(): boolean
    /**
     * Sets the steering offset for the NPC.
     *
     * @example
     *    c.getSubject().setSteeringOffset(index, x, y, z);
     *
     * @param index number
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    setSteeringOffset(index: number, x: number, y: number, z: number): void
    /**
     * Gets the steering offset of the NPC.
     *
     * @example
     *    c.getSubject().addSteeringOffset(x, y, z);
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    addSteeringOffset(x: number, y: number, z: number): void
    /**
     * Gets the steering offset of the NPC.
     *
     * @example
     *    c.getSubject().getSteeringOffsets().forEach((offset) -> {
     *        c.send(offset.x + ", " + offset.y + ", " + offset.z);
     *    });
     *
     * @returns {@link List}
     */
    getSteeringOffsets(): List<ScriptVector>
    /**
     * Sets the speed of the NPC.
     *
     * @example
     *    c.getSubject().setNpcSpeed(speed);
     *
     * @param speed number
     * @returns {@link void}
     */
    setNpcSpeed(speed: number): void
    /**
     * Gets the speed of the NPC.
     *
     * @example
     *    c.getSubject().getNpcSpeed();
     *
     * @returns {@link number}
     */
    getNpcSpeed(): number
    /**
     * Sets the jump power of the NPC.
     *
     * @example
     *    c.getSubject().setJumpPower(jumpHeight);
     *
     * @param jumpHeight number
     * @returns {@link void}
     */
    setJumpPower(jumpHeight: number): void
    /**
     * Gets the jump power of the NPC.
     *
     * @example
     *    c.getSubject().getjumpPower();
     *
     * @returns {@link number}
     */
    getJumpPower(): number
    /**
     * Sets whether the NPC is invincible.
     *
     * @example
     *    c.getSubject().setInvincible(true);
     *
     * @param invincible boolean
     * @returns {@link void}
     */
    setInvincible(invincible: boolean): void
    /**
     * Checks if the NPC is invincible.
     *
     * @example
     *    c.getSubject().isInvincible();
     *
     * @returns {@link boolean}
     */
    isInvincible(): boolean
    /**
     * Sets whether the NPC can swim.
     *
     * @example
     *    c.getSubject().setCanSwim(true);
     *
     * @param canSwim boolean
     * @returns {@link void}
     */
    setCanSwim(canSwim: boolean): void
    /**
     * Checks if the NPC can swim.
     *
     * @example
     *    c.getSubject().canSwim();
     *
     * @returns {@link boolean}
     */
    canSwim(): boolean
    /**
     * Sets whether the NPC is immovable.
     *
     * @example
     *    c.getSubject().setImmovable(true);
     *
     * @param immovable boolean
     * @returns {@link void}
     */
    setImmovable(immovable: boolean): void
    /**
     * Checks if the NPC is immovable.
     *
     * @example
     *    c.getSubject().isImmovable();
     *
     * @returns {@link boolean}
     */
    isImmovable(): boolean
    /**
     * Sets the shadow size of the NPC.
     *
     * @example
     *    c.getSubject().setShadowSize(0.8);
     *
     * @param size number
     * @returns {@link void}
     */
    setShadowSize(size: number): void
    /**
     * Gets the shadow size of the NPC.
     *
     * @example
     *    var size = c.getSubject().getShadowSize();
     *
     * @returns {@link number} - the shadow size of the NPC.
     */
    getShadowSize(): number
    /**
     * Sets the XP value of the NPC.
     *
     * @example
     *    c.getSubject().setXpValue(10);
     *
     * @param xp number
     * @returns {@link number} - the new XP value.
     */
    setXpValue(xp: number): number
    /**
     * Gets the XP value of the NPC.
     *
     * @example
     *    var xp = c.getSubject().getXpValue();
     *
     * @returns {@link number} - the XP value of the NPC.
     */
    getXpValue(): number
    /**
     * Gets the path distance of the NPC. Also determines the NPC's sight radius of "look at player" option.
     *
     * @example
     *    var distance = c.getSubject().getPathDistance();
     *
     * @returns {@link number} - the path distance of the NPC.
     */
    getPathDistance(): number
    /**
     * Sets the path distance of the NPC. Also determines the NPC's sight radius of "look at player" option.
     *
     * @example
     *    c.getSubject().setPathDistance(10);
     *
     * @param sightRadius number
     * @returns {@link void}
     */
    setPathDistance(sightRadius: number): void
    /**
     * Sets the attack range of the NPC.
     *
     * @example
     *    c.getSubject().setAttackRange(5);
     *
     * @param sightDistance number
     * @returns {@link void}
     */
    setAttackRange(sightDistance: number): void
    /**
     * Gets the attack range of the NPC.
     *
     * @example
     *    var range = c.getSubject().getAttackRange();
     *
     * @returns {@link number} - the attack range of the NPC.
     */
    getAttackRange(): number
    /**
     * Sets the killable status of the NPC.
     * If false, then NPCs can be killed only by a command.
     * Regardless of the state, killable allows to make this NPC damaged
     * until 0 health.
     *
     * @example
     *    c.getSubject().setKillable(true);
     *
     * @param killable boolean
     * @returns {@link void}
     */
    setKillable(killable: boolean): void
    /**
     * Gets the killable status of the NPC.
     * If false, then NPCs can be killed only by a command.
     * Regardless of the state, killable allows to make this NPC damaged
     * until 0 health.
     *
     * @example
     *    var isKillable = c.getSubject().isKillable();
     *
     * @returns {@link boolean} - true if the NPC is killable, false otherwise.
     */
    isKillable(): boolean
    /**
     * Gets the burnable status of the NPC.
     *
     * @example
     *    var canGetBurned = c.getSubject().canGetBurned();
     *
     * @returns {@link boolean} - true if the NPC can get burned, false otherwise.
     */
    canGetBurned(): boolean
    /**
     * Sets the burnable status of the NPC.
     *
     * @example
     *    c.getSubject().canGetBurned(true);
     *
     * @param canGetBurned boolean
     * @returns {@link void}
     */
    canGetBurned(canGetBurned: boolean): void
    /**
     * Gets the status if the NPC can take fall damage.
     *
     * @example
     *    var canFallDamage = c.getSubject().canFallDamage();
     *
     * @returns {@link boolean} - true if the NPC can take fall damage, false otherwise.
     */
    canFallDamage(): boolean
    /**
     * Sets the status if the NPC can take fall damage.
     *
     * @example
     *    c.getSubject().canFallDamage(true);
     *
     * @param canFallDamage boolean
     * @returns {@link void}
     */
    canFallDamage(canFallDamage: boolean): void
    /**
     * Gets the damage strength points of the NPC.
     *
     * @example
     *    var damage = c.getSubject().getDamage();
     *
     * @returns {@link number} - the damage of the NPC.
     */
    getDamage(): number
    /**
     * Sets the damage strength points of the NPC.
     *
     * @example
     *    c.getSubject().setDamage(10);
     *
     * @param damage number
     * @returns {@link void}
     */
    setDamage(damage: number): void
    /**
     * Gets the damage delay of the NPC.
     *
     * @example
     *    var delay = c.getSubject().getDamageDelay();
     *
     * @returns {@link number} - the damage delay of the NPC.
     */
    getDamageDelay(): number
    /**
     * Sets the damage delay of the NPC.
     *
     * @example
     *    c.getSubject().setDamageDelay(5);
     *
     * @param damageDelay number
     * @returns {@link void}
     */
    setDamageDelay(damageDelay: number): void
    /**
     * Gets the wandering status of the NPC.
     *
     * @example
     *    var doesWander = c.getSubject().doesWander();
     *
     * @returns {@link boolean} - true if the NPC wanders, false otherwise.
     */
    doesWander(): boolean
    /**
     * Sets the wandering status of the NPC.
     *
     * @example
     *    c.getSubject().setWander(true);
     *
     * @param wander boolean
     * @returns {@link void}
     */
    setWander(wander: boolean): void
    /**
     * Gets the status of the NPC's idle look around behavior.
     *
     * @example
     *    var doesLookAround = c.getSubject().doesLookAround();
     *
     * @returns {@link boolean} - true if the NPC looks around while idle, false otherwise.
     */
    doesLookAround(): boolean
    /**
     * Sets the status of the NPC's idle look around behavior.
     *
     * @example
     *    c.getSubject().setLookAround(true);
     *
     * @param lookAround boolean
     * @returns {@link void}
     */
    setLookAround(lookAround: boolean): void
    /**
     * Gets the status of the NPC's behavior to look at the player.
     *
     * @example
     *    var doesLookAtPlayer = c.getSubject().doesLookAtPlayer();
     *
     * @returns {@link boolean} - true if the NPC looks at the player, false otherwise.
     */
    doesLookAtPlayer(): boolean
    /**
     * Sets the status of the NPC's behavior to look at the player.
     *
     * @example
     *    c.getSubject().setLookAtPlayer(true);
     *
     * @param lookAtPlayer boolean
     * @returns {@link void}
     */
    setLookAtPlayer(lookAtPlayer: boolean): void
    /**
     * Removes a patrol point at a certain indext from the NPC.
     *
     * @example
     *    c.getSubject().removePatrolPoint(0);
     *
     * @param index number
     * @returns {@link void}
     */
    removePatrolPoint(index: number): void
    /**
     * Removes a patrol point at a certain position from the NPC.
     *
     * @example
     *    var npc = c.getSubject();
     *    var pos = npc.getPosition();
     *    npc.removePatrolPoint(pos.x, pos.y, pos.z);
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    removePatrolPoint(x: number, y: number, z: number): void
    /**
     * Removes all NPC's patrol points.
     *
     * @example
     *    c.getSubject().clearPatrolPoints();
     *
     * @returns {@link void}
     */
    clearPatrolPoints(): void
}

declare interface IScriptEntityItem {
    age: number
    pickupDelay: number
    lifespan: number
    owner: string
    thrower: string
    item: IScriptItemStack
    /**
     * Get entity's age.
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond_hoe");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *        c.getSubject().send("Item's age: " + entityItem.getAge());
     *    }
     *
     * @returns {@link number} - how many ticks entity exists
     */
    getAge(): number
    /**
     * Set entity's age.
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond_hoe");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *        entityItem.setAge(5000);
     *        c.getSubject().send("Item's age: " + entityItem.getAge());
     *    }
     *
     * @param age number
     * @returns {@link void}
     */
    setAge(age: number): void
    /**
     * Get entity's pickup delay.
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond_hoe");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *        c.getSubject().send("You can pick up this item in " + entityItem.getPickupDelay() + " ticks.");
     *    }
     *
     * @returns {@link number} - How many ticks remains until someone can pick up this item
     */
    getPickupDelay(): number
    /**
     * Set entity's pickup delay.
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond_hoe");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *        entityItem.setPickupDelay(100); // 5 seconds
     *        c.getSubject().send("You can pick up this item in " + entityItem.getPickupDelay() + " ticks.");
     *    }
     *
     * @param delay number
     * @returns {@link void}
     */
    setPickupDelay(delay: number): void
    /**
     * Get entity's lifespan (max age).
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond_hoe");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *        c.getSubject().send("Item disappear in " + (entityItem.getLifespan() - entityItem.getAge()) + " ticks.");
     *    }
     *
     * @returns {@link number} - How many ticks remains until someone can pick up this item
     */
    getLifespan(): number
    /**
     * Set entity's lifespan (max age).
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond_hoe");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *        entityItem.setLifespan(1200); // 60 seconds
     *        c.getSubject().send("Item disappear in " + (entityItem.getLifespan() - entityItem.getAge()) + " ticks.");
     *    }
     *
     * @param lifespan number
     * @returns {@link void}
     */
    setLifespan(lifespan: number): void
    /**
     * Get entity's owner nickname (Who can pick up this item).
     * Returns empty string if anyone able to pick it up.
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond_hoe");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *        c.getSubject().send(entityItem.getOwner());
     *    }
     *
     * @returns {@link string} - Nickname of player who can pick up this item.
     */
    getOwner(): string
    /**
     * Set entity's owner nickname (Who can pick up this item).
     * use with empty string, if you want anyone to be able to pick it up.
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond_hoe");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *        entityItem.setOwner(c.getSubject().getName());
     *    }
     *
     * @param owner string
     * @returns {@link void}
     */
    setOwner(owner: string): void
    /**
     * Get entity's thrower nickname (Who throw this item).
     * Returns empty string if it spawns through code.
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond_hoe");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *        c.getSubject().send(entityItem.getThrower());
     *    }
     *
     * @returns {@link string} - Nickname of player who throw this item.
     */
    getThrower(): string
    /**
     * Set entity's thrower nickname (Who throw this item).
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond_hoe");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *        entityItem.setThrower(c.getSubject().getName());
     *    }
     *
     * @param thrower string
     * @returns {@link void}
     */
    setThrower(thrower: string): void
    /**
     * Get itemStack from this entity.
     *
     * @example
     *    function main(c)
     *    {
     *        var pos = c.getSubject().getPosition();
     *        var entities = c.getWorld().getEntities(pos.x, pos.y + 1, pos.z, 3);
     *
     *        for (var i in entities)
     *        {
     *            var entity = entities[i];
     *
     *            if (entity.isItem())
     *            {
     *                c.player.send(entity.getItem().getItem().getId());
     *            }
     *        }
     *    }
     *
     * @returns {@link IScriptItemStack}
     */
    getItem(): IScriptItemStack
    /**
     * Get itemStack from this entity.
     *
     * @example
     *    // Midas :D
     *    // Turns any item in radius of 3 blocks into golden nuggets.
     *    function main(c)
     *    {
     *        var pos = c.getSubject().getPosition();
     *        var entities = c.getWorld().getEntities(pos.x, pos.y + 1, pos.z, 3);
     *
     *        for (var i in entities)
     *        {
     *            var entity = entities[i];
     *
     *            if (entity.isItem())
     *            {
     *                entity.setItem(mappet.createItem("minecraft:golden_nugget"))
     *            }
     *        }
     *    }
     *
     * @param itemStack IScriptItemStack
     * @returns {@link void}
     */
    setItem(itemStack: IScriptItemStack): void
    /**
     * Makes item unaffordable.
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *
     *        entityItem.setNoDespawn();
     *        entityItem.setInfinitePickupDelay();
     *    }
     *
     * @returns {@link void}
     */
    setInfinitePickupDelay(): void
    /**
     * Set's default pick up delay (10, actually).
     *
     * @returns {@link void}
     */
    setDefaultPickupDelay(): void
    /**
     * Entity will not despawn.
     *
     * @example
     *    function main(c)
     *    {
     *        var item = mappet.createItem("minecraft:diamond");
     *        var pos = c.getSubject().getPosition();
     *
     *        var entityItem = c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *
     *        entityItem.setNoDespawn();
     *        entityItem.setInfinitePickupDelay();
     *    }
     *
     * @returns {@link void}
     */
    setNoDespawn(): void
    /**
     * Returns whether it's possible to pick up this item, or not.
     *
     * @example
     *    // Item magnet :D
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *        var pos = player.getPosition();
     *        var entities = c.getWorld().getEntities(pos.x, pos.y + 1, pos.z, 10);
     *
     *        for (var i in entities)
     *        {
     *            var entity = entities[i];
     *
     *            if (entity.isItem() && entity.canPickup())
     *            {
     *                player.giveItem(entity.getItem());
     *                entity.remove(); // despawn
     *            }
     *        }
     *    }
     *
     * @returns {@link boolean}
     */
    canPickup(): boolean
}

declare interface IScriptEntity {
    readonly minecraftEntity: Entity
    readonly world: IScriptWorld
    readonly position: ScriptVector
    dimension: number
    readonly motion: ScriptVector
    readonly rotations: ScriptVector
    readonly pitch: number
    readonly yaw: number
    readonly yawHead: number
    readonly look: ScriptVector
    readonly eyeHeight: number
    readonly width: number
    readonly height: number
    hp: number
    maxHp: number
    mainItem: IScriptItemStack
    offItem: IScriptItemStack
    helmet: IScriptItemStack
    chestplate: IScriptItemStack
    leggings: IScriptItemStack
    boots: IScriptItemStack
    target: IScriptEntity
    readonly uniqueId: string
    readonly entityId: string
    readonly ticks: number
    readonly combinedLight: number
    name: string
    fullData: INBTCompound
    readonly entityData: INBTCompound
    readonly boundingBox: ScriptBox
    fallDistance: number
    readonly leashedEntities: List<IScriptEntity>
    leashHolder: IScriptEntity
    readonly states: IMappetStates
    morph: AbstractMorph
    /**
     * Get Minecraft entity instance. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @example
     *    function main(c)
     *    {
     *        //c.getSubject().getMinecraftEntity().abilities.disableDamage = true
     *        c.getSubject().getMinecraftEntity().field_71075_bZ.field_75102_a = true // or false
     *    }
     *
     * @returns {@link Entity}
     */
    getMinecraftEntity(): Entity
    /**
     * Get entity's world.
     *
     * @example
     *    var s = c.getSubject();
     *    var world = s.getWorld();
     *
     *    world.setRaining(true);
     *
     * @returns {@link IScriptWorld}
     */
    getWorld(): IScriptWorld
    /**
     * Get entity's position.
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *
     *    c.send(c.getSubject().getName() + "'s position is (" + pos.x + ", " + pos.y + ", " + pos.z + ")");
     *
     * @returns {@link ScriptVector}
     */
    getPosition(): ScriptVector
    /**
     * Set entity's position (teleport).
     *
     * @example
     *    c.getSubject().setPosition(800, 8, -135);
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    setPosition(x: number, y: number, z: number): void
    /**
     * Returns the dimension of the entity.
     *
     * @example
     *    var dimension = c.getSubject().getDimension();
     *    switch (dimension)
     *    {
     *        case 0: c.send("Overworld"); break;
     *        case 1: c.send("The End"); break;
     *        case -1: c.send("The Nether"); break;
     *        default: c.send("Unknown dimension"); break;
     *    }
     *
     * @returns {@link number} - The dimension of the entity as an integer.
     */
    getDimension(): number
    /**
     * Set the dimension of the entity.
     *
     * @example
     *    c.getSubject().setDimension(1); // Teleport to The End
     *
     * @param dimension number
     * @returns {@link void}
     */
    setDimension(dimension: number): void
    /**
     * Get entity's motion.
     *
     * @example
     *    var motion = c.getSubject().getMotion();
     *
     *    c.send(c.getSubject().getName() + "'s motion is (" + motion.x + ", " + motion.y + ", " + motion.z + ")");
     *
     * @returns {@link ScriptVector}
     */
    getMotion(): ScriptVector
    /**
     * Set entity's motion.
     *
     * @example
     *    var motion = c.getSubject().getMotion();
     *
     *    if (motion.y < 0)
     *    {
     *        // Reverse the falling motion into a jumping up motion
     *        c.getSubject().setMotion(motion.x, -motion.y, motion.z);
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    setMotion(x: number, y: number, z: number): void
    /**
     * Set entity's server-sided motion. (<code>.setMotion()</code> causes rubber banding)
     * Adds to the current velocity of the entity.
     *
     * @example
     *    // Throw all items in the air
     *    for each (var item in c.getServer().getEntities("@e[type=item]"))
     *    {
     *        item.addVelocity(0, 0.3, 0);
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    addMotion(x: number, y: number, z: number): void
    /**
     * Get entity's rotation (x is pitch, y is yaw, and z is yaw head, if entity
     * is living base).
     *
     * @example
     *    var rotations = c.getSubject().getRotations();
     *    var pitch = rotations.x;
     *    var yaw = rotations.y;
     *    var yaw_head = rotations.z;
     *
     *    c.send(c.getSubject().getName() + "'s rotations are (" + pitch + ", " + yaw + ", " + yaw_head + ")");
     *
     * @returns {@link ScriptVector}
     */
    getRotations(): ScriptVector
    /**
     * Set entity's rotation.
     *
     * @example
     *    // Make entity look at west
     *    c.getSubject().setRotations(0, 0, 0);
     *
     * @param pitch number
     * @param yaw number
     * @param yawHead number
     * @returns {@link void}
     */
    setRotations(pitch: number, yaw: number, yawHead: number): void
    /**
     * Get entity's pitch (vertical rotation).
     *
     * @returns {@link number}
     */
    getPitch(): number
    /**
     * Get entity's yaw (horizontal rotation).
     *
     * @returns {@link number}
     */
    getYaw(): number
    /**
     * Get entity's head yaw.
     *
     * @returns {@link number}
     */
    getYawHead(): number
    /**
     * Get a vector in which direction entity looks.
     *
     * @example
     *    var look = c.getSubject().getLook();
     *
     *    c.getSubject().setMotion(look.x * 0.5, look.y * 0.5, look.z * 0.5);
     *
     * @returns {@link ScriptVector}
     */
    getLook(): ScriptVector
    /**
     * Returns the eye height of the entity.
     *
     * @example
     *    var s = c.getSubject();
     *
     *    c.send("This entity's eye height is: " + s.getEyeHeight());
     *
     * @returns {@link number}
     */
    getEyeHeight(): number
    /**
     * Get entity's current hitbox width (and depth, it's the same number).
     *
     * @returns {@link number}
     */
    getWidth(): number
    /**
     * Get entity's current hitbox height.
     *
     * @returns {@link number}
     */
    getHeight(): number
    /**
     * Get health points of this entity (20 is the max default for players).
     *
     * @example
     *    var subject = c.getSubject();
     *
     *    if (subject.getHp() < 10)
     *    {
     *        subject.send("Man, you need to replenish your health!");
     *    }
     *
     * @returns {@link number}
     */
    getHp(): number
    /**
     * Set entity's health points. Given value that is more than max HP will get limited to max HP.
     *
     * @example
     *    // If entity's health goes below 5 hearts, restore to max
     *    var subject = c.getSubject();
     *
     *    if (subject.getHp() < 10)
     *    {
     *        subject.setHp(subject.getMaxHp());
     *    }
     *
     * @param hp number
     * @returns {@link void}
     */
    setHp(hp: number): void
    /**
     * Get maximum health points this entity can have.
     *
     * @example
     *    var subject = c.getSubject();
     *
     *    subject.send(subject.getName() + " can have up to " + subject.getMaxHp() + " HP!");
     *
     * @returns {@link number}
     */
    getMaxHp(): number
    /**
     * Set entity's maximum health points.
     *
     * @example
     *    var subject = c.getSubject();
     *    subject.setMaxHp(100);
     *    subject.send(subject.getName() + " can have up to " + subject.getMaxHp() + " HP!");
     *
     * @param hp number
     * @returns {@link void}
     */
    setMaxHp(hp: number): void
    /**
     * Check whether this entity is in water.
     *
     * @example
     *    var subject = c.getSubject();
     *
     *    c.send("Is the entity in water? " + subject.isInWater());
     *
     * @returns {@link boolean}
     */
    isInWater(): boolean
    /**
     * Check whether this entity is in lava.
     *
     * @example
     *    var subject = c.getSubject();
     *
     *    c.send("Is the entity in lava? " + subject.isInLava());
     *
     * @returns {@link boolean}
     */
    isInLava(): boolean
    /**
     * Check whether this entity is on fire.
     *
     * @example
     *    var subject = c.getSubject();
     *
     *    // Extinguish the entity if it's on fire
     *    if (subject.isBurning())
     *    {
     *        subject.setBurning(0);
     *    }
     *
     * @returns {@link boolean}
     */
    isBurning(): boolean
    /**
     * Set entity on fire for given amount of ticks. If <code>0</code> will be
     * provided as the sole argument, then entity's fire will be extinguished.
     *
     * @example
     *    var subject = c.getSubject();
     *    var ray = subject.rayTrace(32);
     *
     *    if (ray.isEntity())
     *    {
     *        ray.getEntity().setBurning(2);
     *    }
     *
     * @param seconds number
     * @returns {@link void}
     */
    setBurning(seconds: number): void
    /**
     * Is this entity is sneaking.
     *
     * @example
     *    var subject = c.getSubject();
     *
     *    if (subject.isSneaking())
     *    {
     *        subject.send("You completed Simon's task!");
     *    }
     *
     * @returns {@link boolean}
     */
    isSneaking(): boolean
    /**
     * Is this entity is sprinting.
     *
     * @example
     *    var subject = c.getSubject();
     *
     *    if (subject.isSprinting())
     *    {
     *        subject.send("This way, you'll run away way faster from zombies!");
     *    }
     *
     * @returns {@link boolean}
     */
    isSprinting(): boolean
    /**
     * Is this entity on the ground.
     *
     * @returns {@link boolean}
     */
    isOnGround(): boolean
    /**
     * Ray trace from entity's looking direction (including any entity intersection).
     * Check {@link IScriptRayTrace} for an example.
     *
     * @param maxDistance number
     * @returns {@link IScriptRayTrace}
     */
    rayTrace(maxDistance: number): IScriptRayTrace
    /**
     * Ray trace from entity's looking direction (excluding entities).
     * Check {@link IScriptRayTrace} for an example.
     *
     * @param maxDistance number
     * @returns {@link IScriptRayTrace}
     */
    rayTraceBlock(maxDistance: number): IScriptRayTrace
    /**
     * Get item held in main hand.
     *
     * @example
     *    var subject = c.getSubject();
     *    var item = subject.getMainItem();
     *
     *    // Lightning bolt admin stick idk I didn't play on servers
     *    if (item.getItem().getId() === "minecraft:stick")
     *    {
     *        c.executeCommand("/summon lightning_bolt ~ ~ ~");
     *    }
     *
     * @returns {@link IScriptItemStack}
     */
    getMainItem(): IScriptItemStack
    /**
     * Set item held in main hand.
     *
     * @example
     *    // We did a little bit of trolling
     *    c.getSubject().setMainItem(mappet.createItem("minecraft:diamond_hoe"));
     *
     * @param stack IScriptItemStack
     * @returns {@link void}
     */
    setMainItem(stack: IScriptItemStack): void
    /**
     * Get item held in off hand.
     *
     * @example
     *    var subject = c.getSubject();
     *    var item = subject.getOffItem();
     *
     *    // Lightning bolt admin stick (but in off hand) idk I didn't play on servers
     *    if (item.getItem().getId() === "minecraft:stick")
     *    {
     *        c.executeCommand("/summon lightning_bolt ~ ~ ~");
     *    }
     *
     * @returns {@link IScriptItemStack}
     */
    getOffItem(): IScriptItemStack
    /**
     * Set item held in off hand.
     *
     * @example
     *    c.getSubject().setOffItem(mappet.createItem("minecraft:shield"));
     *
     * @param stack IScriptItemStack
     * @returns {@link void}
     */
    setOffItem(stack: IScriptItemStack): void
    /**
     * Give item to this entity. (like the /give command)
     *
     * @example
     *    c.getSubject().giveItem(mappet.createItem("minecraft:diamond", 64));
     *
     * @param stack IScriptItemStack
     * @returns {@link void}
     */
    giveItem(stack: IScriptItemStack): void
    /**
     * Give item to this entity. (like the /give command)
     *
     * @example
     *    c.getSubject().giveItem(mappet.createItem("minecraft:diamond", 64), false, true);
     *
     * @param stack IScriptItemStack
     * @param playSound boolean
     * @param dropIfInventoryFull boolean
     * @returns {@link void}
     */
    giveItem(stack: IScriptItemStack, playSound: boolean, dropIfInventoryFull: boolean): void
    /**
     * Return the entity's helmet's item stack.
     *
     * @example
     *    c.send( c.getSubject().getHelmet().serialize() )
     *
     * @returns {@link IScriptItemStack}
     */
    getHelmet(): IScriptItemStack
    /**
     * Return the entity's  chestplate's item stack.
     *
     * @example
     *    c.send( c.getSubject().getChestplate().serialize() )
     *
     * @returns {@link IScriptItemStack}
     */
    getChestplate(): IScriptItemStack
    /**
     * Return the entity's  leggings' item stack.
     *
     * @example
     *    c.send( c.getSubject().getLeggings().serialize() )
     *
     * @returns {@link IScriptItemStack}
     */
    getLeggings(): IScriptItemStack
    /**
     * Return the entity's  boots' item stack.
     *
     * @example
     *    c.send( c.getSubject().getBoots().serialize() )
     *
     * @returns {@link IScriptItemStack}
     */
    getBoots(): IScriptItemStack
    /**
     * Set the entity's  helemt.
     *
     * @example
     *    var item = mappet.createItemNBT(mappet.createCompound("{id:\"minecraft:diamond_helmet\",Count:1b,tag:{ench:[{lvl:3s,id:0s}],RepairCost:1},Damage:0s}"));
     *    c.getSubject().setHelmet(item)
     *
     * @param itemStack IScriptItemStack
     * @returns {@link void}
     */
    setHelmet(itemStack: IScriptItemStack): void
    /**
     * Set the entity's  chestplate.
     *
     * @example
     *    var item = mappet.createItemNBT(mappet.createCompound("{id:\"minecraft:diamond_chestplate\",Count:1b,tag:{ench:[{id:0,lvl:4}],RepairCost:1},Damage:0s}"));
     *    c.getSubject().setChestplate(item)
     *
     * @param itemStack IScriptItemStack
     * @returns {@link void}
     */
    setChestplate(itemStack: IScriptItemStack): void
    /**
     * Set the entity's  leggings.
     *
     * @example
     *    var item = mappet.createItemNBT(mappet.createCompound("{id:\"minecraft:diamond_leggings\",Count:1b,tag:{ench:[{id:0,lvl:4}],RepairCost:1},Damage:0s}"));
     *    c.getSubject().setLeggings(item)
     *
     * @param itemStack IScriptItemStack
     * @returns {@link void}
     */
    setLeggings(itemStack: IScriptItemStack): void
    /**
     * Set the entity's  boots.
     *
     * @example
     *    var item = mappet.createItemNBT(mappet.createCompound("{id:\"minecraft:diamond_boots\",Count:1b,tag:{ench:[{id:0,lvl:4}],RepairCost:1},Damage:0s}"));
     *    c.getSubject().setBoots(item)
     *
     * @param itemStack IScriptItemStack
     * @returns {@link void}
     */
    setBoots(itemStack: IScriptItemStack): void
    /**
     * Set the entity's  whole armor set.
     *
     * @example
     *    var players = c.getServer().getAllPlayers();
     *
     *    for each (var player in players)
     *    {
     *        var helmet = mappet.createItemNBT(mappet.createCompound("{id:\"minecraft:diamond_helmet\",Count:1b,tag:{ench:[{id:0s,lvl:3s}],RepairCost:1},Damage:0s}"));
     *        var chestplate = mappet.createItemNBT(mappet.createCompound("{id:\"minecraft:diamond_chestplate\",Count:1b,tag:{ench:[{id:0,lvl:4}],RepairCost:1},Damage:0s}"));
     *        var leggings = mappet.createItemNBT(mappet.createCompound("{id:\"minecraft:diamond_leggings\",Count:1b,tag:{ench:[{id:0,lvl:4}],RepairCost:1},Damage:0s}"));
     *        var boots = mappet.createItemNBT(mappet.createCompound("{id:\"minecraft:diamond_boots\",Count:1b,tag:{ench:[{id:0,lvl:4}],RepairCost:1},Damage:0s}"));
     *
     *        player.setArmor(helmet, chestplate, leggings, boots)
     *    }
     *
     * @param helmet IScriptItemStack
     * @param chestplate IScriptItemStack
     * @param leggings IScriptItemStack
     * @param boots IScriptItemStack
     * @returns {@link void}
     */
    setArmor(helmet: IScriptItemStack, chestplate: IScriptItemStack, leggings: IScriptItemStack, boots: IScriptItemStack): void
    /**
     * Clear the entity's  whole armor set.
     *
     * @example
     *    var players = c.getServer().getEntities("@e[type=player]");
     *    for each (var player in players){
     *        player.clearArmor()
     *    }
     *
     * @returns {@link void}
     */
    clearArmor(): void
    /**
     * Set entity's speed.
     *
     * @param speed number
     * @returns {@link void}
     */
    setSpeed(speed: number): void
    /**
     * Get this entity's attack target.
     *
     * @returns {@link IScriptEntity}
     */
    getTarget(): IScriptEntity
    /**
     * Set this entity's attack target to given entity.
     *
     * @example
     *    // Stop the entity that you're looking at from targeting you.
     *    function main(c)
     *    {
     *        var s = c.getSubject();
     *        var ray = s.rayTrace(64);
     *
     *        if (ray.isEntity())
     *        {
     *            ray.getEntity().setTarget(null)
     *        }
     *    }
     *
     * @param entity IScriptEntity
     * @returns {@link void}
     */
    setTarget(entity: IScriptEntity): void
    /**
     * Check whether entity's AI is enabled.
     *
     * @returns {@link boolean}
     */
    isAIEnabled(): boolean
    /**
     * Set entity's AI to be enabled or disabled (if it has it).
     *
     * @param enabled boolean
     * @returns {@link void}
     */
    setAIEnabled(enabled: boolean): void
    /**
     * Get unique ID of this entity, which can be used, if needed, in
     * commands as a target selector.
     *
     * @example
     *    function main(c)
     *    {
     *        var uuid = c.getSubject().getUniqueId()
     *        var entity = c.getServer().getEntity(uuid)
     *
     *        var motion = c.getSubject().getMotion();
     *
     *        entity.setMotion(motion.x, motion.y+3, motion.z)
     *    }
     *
     * @returns {@link string}
     */
    getUniqueId(): string
    /**
     * Get entity's resource location ID, like <code>minecraft:pig</code> or
     * <code>minecraft:zombie</code>.
     *
     * @returns {@link string}
     */
    getEntityId(): string
    /**
     * Get how many ticks did this entity existed.
     *
     * @returns {@link number}
     */
    getTicks(): number
    /**
     * Get combined light value of where the entity is currently standing.
     * In order to get torch and sky light values separately, see the example below
     * to "unpack" the combined value.
     *
     * @example
     *    var light = c.getPlayer().getCombinedLight();
     *    var skyLight = light / 65536 / 15;
     *    var torchLight = light % 65536 / 15;
     *
     *    // Do something with skyLight and torchLight
     *
     * @returns {@link number}
     */
    getCombinedLight(): number
    /**
     * Get entity name.
     *
     * @returns {@link string}
     */
    getName(): string
    /**
     * Set entity name.
     *
     * @param name string
     * @returns {@link void}
     */
    setName(name: string): void
    /**
     * Set entity to invisible.
     *
     * @param invisible boolean
     * @returns {@link void}
     */
    setInvisible(invisible: boolean): void
    /**
     * Get entity's full (copy of its) NBT data.
     *
     * @returns {@link INBTCompound}
     */
    getFullData(): INBTCompound
    /**
     * Overwrite NBT data of this entity. <b>WARNING</b>: use it only if you know
     * what are you doing as this method can corrupt entities.
     *
     * @param data INBTCompound
     * @returns {@link void}
     */
    setFullData(data: INBTCompound): void
    /**
     * Get Forge's custom tag compound in which you can story any
     * data you want.
     *
     * <p>There is no setter method as you can directly work with returned
     * NBT compound. Any changes to returned compound <b>will be reflected
     * upon entity's data</b>.</p>
     *
     * @returns {@link INBTCompound}
     */
    getEntityData(): INBTCompound
    /**
     * Check whether this entity is a player.
     *
     * @returns {@link boolean}
     */
    isPlayer(): boolean
    /**
     * Check whether this entity is an NPC.
     *
     * @returns {@link boolean}
     */
    isNpc(): boolean
    /**
     * Check whether this entity is an NPC.
     *
     * @returns {@link boolean}
     */
    isNPC(): boolean
    /**
     * Check whether this entity is an item.
     *
     * @returns {@link boolean}
     */
    isItem(): boolean
    /**
     * Check whether this entity is living base.
     *
     * @returns {@link boolean}
     */
    isLivingBase(): boolean
    /**
     * Check whether this entity is same as given entity.
     *
     * @param entity IScriptEntity
     * @returns {@link boolean}
     */
    isSame(entity: IScriptEntity): boolean
    /**
     * Check if an entity is in a radius of another specific entity
     *
     * @example
     *    // Kills all cows within 5 blocks of the player
     *    function main(c)
     *    {
     *        var tracker = c.getSubject();
     *        var trackedEntities = c.getServer().getEntities("@e[type=cow]");
     *
     *        for each (var trackedEntity in trackedEntities)
     *        {
     *            if (trackedEntity.isEntityInRadius(tracker, 5))
     *            {
     *                trackedEntity.kill();
     *            }
     *        }
     *    }
     *
     * @param entity IScriptEntity
     * @param radius number
     * @returns {@link boolean}
     */
    isEntityInRadius(entity: IScriptEntity, radius: number): boolean
    /**
     * Check if this entity is standing in a given block.
     *
     * @example
     *    var s = c.getSubject();
     *
     *    if (s.isInBlock(0, 0, 0))
     *    {
     *        c.send(s.getName() + " is at (0, 0, 0)!");
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link boolean}
     */
    isInBlock(x: number, y: number, z: number): boolean
    /**
     * Check if this entity is standing in a given area.
     *
     * @example
     *    var s = c.getSubject();
     *
     *    if (s.isInArea(20, 3, 100, 30, 8, 110))
     *    {
     *        c.send(s.getName() + " is within given area!");
     *    }
     *
     * @param x1 number
     * @param y1 number
     * @param z1 number
     * @param x2 number
     * @param y2 number
     * @param z2 number
     * @returns {@link boolean}
     */
    isInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): boolean
    /**
     * Inflict some damage on this entity (use {@link #kill()} to kill the entity though).
     *
     * @example
     *    c.getSubject().damage(1); //dealt you 1 damage
     *
     * @param health number
     * @returns {@link void}
     */
    damage(health: number): void
    /**
     * Damage this entity as given entity was the source of attack.
     *
     * @example
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *        var result = player.rayTrace(32);
     *
     *        if (result.isEntity())
     *        {
     *            result.getEntity().damageAs(player, 1);
     *        }
     *    }
     *
     * @param entity IScriptEntity
     * @param health number
     * @returns {@link void}
     */
    damageAs(entity: IScriptEntity, health: number): void
    /**
     * Damage this entity as given player was the source of the attack with its equipment.
     *
     * @example
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *        var result = player.rayTrace(32);
     *
     *        if (result.isEntity())
     *        {
     *            result.getEntity().damageWithItemsAs(player);
     *        }
     *    }
     *
     * @param player IScriptPlayer
     * @returns {@link void}
     */
    damageWithItemsAs(player: IScriptPlayer): void
    /**
     * Mount this entity to given entity.
     *
     * @example
     *    function main(c)
     *    {
     *        var s = c.getSubject();
     *        var ray = s.rayTrace(64);
     *
     *        if (ray.isEntity())
     *        {
     *             s.mount(ray.getEntity());
     *        }
     *    }
     *
     * @param entity IScriptEntity
     * @returns {@link void}
     */
    mount(entity: IScriptEntity): void
    /**
     * Dismount this entity from the entity it's riding.
     *
     * @example
     *    function main(c)
     *    {
     *         c.getSubject().dismount()
     *    }
     *
     * @returns {@link void}
     */
    dismount(): void
    /**
     * Returns the entity that this entity rides on.
     *
     * @example
     *
     *
     * @returns {@link IScriptEntity}
     */
    getMount(): IScriptEntity
    /**
     * Returns the bounding box of this entity.
     *
     * @example
     *    var s = c.getSubject();
     *    var box = s.getBoundingBox();
     *    c.send("The bounding box of " + s.getName() + " is " + box.minX + ", " + box.minY + ", " + box.minZ + " to " + box.maxX + ", " + box.maxY + ", " + box.maxZ);
     *
     * @returns {@link ScriptBox} - the bounding box of this entity
     */
    getBoundingBox(): ScriptBox
    /**
     * Drop the item an entity is holding.
     *
     * @example
     *    var s = c.getSubject();
     *    var entityItem = s.dropItem(10);
     *    entityItem.setNoDespawn();
     *    entityItem.setInfinitePickupDelay();
     *
     * @param amount number
     * @returns {@link ScriptEntityItem}
     */
    dropItem(amount: number): IScriptEntityItem
    /**
     * Drop one item of what the entity is holding.
     *
     * @example
     *    var s = c.getSubject();
     *    var entityItem = s.dropItem();
     *    entityItem.setNoDespawn();
     *    entityItem.setInfinitePickupDelay();
     *
     * @returns {@link ScriptEntityItem}
     */
    dropItem(): IScriptEntityItem
    /**
     * Drop an item of the entity even if it is not holding it.
     * Therefore, it doesn't remove the item from the entity's inventory.
     *
     * @example
     *    var item = mappet.createItemNBT("{id:\"minecraft:stone\",Count:64b,Damage:0s}");
     *    var entityItem = c.getSubject().dropItem(item);
     *    entityItem.setNoDespawn();
     *    entityItem.setInfinitePickupDelay();
     *
     * @param itemStack IScriptItemStack
     * @returns {@link ScriptEntityItem}
     */
    dropItem(itemStack: IScriptItemStack): IScriptEntityItem
    /**
     * Get entity's fall distance.
     *
     * @returns {@link number}
     */
    getFallDistance(): number
    /**
     * Set entity's fall distance.
     *
     * <p>You can use this method, by calling it with <code>0</code>, to prevent fall
     * damage when teleporting an entity which was already falling.</p>
     *
     * @param distance number
     * @returns {@link void}
     */
    setFallDistance(distance: number): void
    /**
     * Remove this entity from the server without any dead effects (essentially despawn).
     *
     * @returns {@link void}
     */
    remove(): void
    /**
     * Kill this entity from the server by inflicting lots of damage
     * (similar to <code>/kill</code> command).
     *
     * @returns {@link void}
     */
    kill(): void
    /**
     * Swing entity's main hand.
     *
     * @returns {@link void}
     */
    swingArm(): void
    /**
     * Swing entity's arm.
     *
     * @param arm number
     * @returns {@link void}
     */
    swingArm(arm: number): void
    /**
     * Returns leashed entities by this entity.
     *
     * @example
     *    var leashedEntities = c.getSubject().getLeashedEntities();
     *    leashedEntities.forEach(function(leashedEntity){
     *        leashedEntity.kill();
     *    });
     *
     * @returns {@link List} - leashed entities list
     */
    getLeashedEntities(): List<IScriptEntity>
    /**
     * Sets the leash holder of this entity.
     *
     * @example
     *    // Leash all entities within 5 blocks of the subject
     *    function main(c){
     *        var tracker = c.getSubject();
     *        var trackedEntities = c.getServer().getEntities("@e[type=!player]");
     *        trackedEntities.forEach(function(trackedEntity){
     *            if (trackedEntity.isEntityInRadius(tracker, 5)){
     *                trackedEntity.setLeashHolder(tracker);
     *            }
     *        });
     *    }
     *
     * @param leashHolder IScriptEntity
     * @returns {@link boolean} - whether the leash holder was set successfully
     */
    setLeashHolder(leashHolder: IScriptEntity): boolean
    /**
     * Returns the leash holder of this entity.
     *
     * @example
     *    //in scripted item (player: on entity interaction)
     *    //this leashes the entity to the player if it is not already leashed
     *    function main(c)
     *    {
     *        var player = c.getSubject();
     *        var entity = c.getObject();
     *        if (entity.getLeashHolder()!=null) return;
     *        c.scheduleScript(0, function (c)
     *        {
     *            entity.setLeashHolder(player);
     *        });
     *    }
     *
     * @returns {@link IScriptEntity} - the leash holder of this entity
     */
    getLeashHolder(): IScriptEntity
    /**
     * Clears the leash holder of this entity.
     *
     * @example
     *    //free all leashed entities in the world
     *    function main(c)
     *    {
     *        c.getServer().getEntities("@e[type=!player]").forEach(function(entity){
     *            entity.clearLeashHolder(true); //true to drop the lead
     *        });
     *    }
     *
     * @param dropLead boolean
     * @returns {@link boolean} - whether the leash holder was cleared successfully
     */
    clearLeashHolder(dropLead: boolean): boolean
    /**
     * Set entity's modifier to a certain value.
     *
     * @example
     *    c.getSubject().setModifier("generic.movementSpeed", 0.5);
     *
     * @param modifierName string
     * @param value number
     * @returns {@link void}
     */
    setModifier(modifierName: string, value: number): void
    /**
     * Return an entity's modifier.
     *
     * @example
     *    c.send(c.getSubject().getModifier("generic.movementSpeed"));
     *
     * @param modifierName string
     * @returns {@link number}
     */
    getModifier(modifierName: string): number
    /**
     * Remove entity's modifier.
     *
     * @example
     *    c.getSubject().removeModifier("generic.movementSpeed");
     *
     * @param modifierName string
     * @returns {@link void}
     */
    removeModifier(modifierName: string): void
    /**
     * Remove all the modifiers of the entity.
     *
     * @example
     *    c.getSubject().removeAllModifiers();
     *
     * @returns {@link void}
     */
    removeAllModifiers(): void
    /**
     * Apply given potion effect on the entity for given duration, with given amplifier,
     * and optionally with particles.
     *
     * <p><b>Attention</b>: potion effects work only with living base entities, so check for
     * {@link #isLivingBase()}! You can get the potion effect using
     * {@link IScriptFactory#getPotion(String)}.</p>
     *
     * @example
     *    var slowness = mappet.getPotion("slowness");
     *    var subject = c.getSubject();
     *
     *    subject.applyPotion(slowness, 200, 1, false);
     *
     * @param potion Potion
     * @param duration number
     * @param amplifier number
     * @param particles boolean
     * @returns {@link void}
     */
    applyPotion(potion: Potion, duration: number, amplifier: number, particles: boolean): void
    /**
     * Check whether given potion effect is present on this entity.
     *
     * <p><b>Attention</b>: potion effects work only with living base entities, so check for
     * {@link #isLivingBase()}! You can get the potion effect using
     * {@link IScriptFactory#getPotion(String)}.</p>
     *
     * @example
     *    var slowness = mappet.getPotion("slowness");
     *    var subject = c.getSubject();
     *
     *    if (subject.hasPotion(slowness))
     *    {
     *        subject.send("You're kind of slow, my dude...");
     *    }
     *
     * @param potion Potion
     * @returns {@link boolean}
     */
    hasPotion(potion: Potion): boolean
    /**
     * Remove given potion effect from this entity.
     *
     * <p><b>Attention</b>: potion effects work only with living base entities, so check for
     * {@link #isLivingBase()}! You can get the potion effect using
     * {@link IScriptFactory#getPotion(String)}.</p>
     *
     * @example
     *    var slowness = mappet.getPotion("slowness");
     *    var subject = c.getSubject();
     *
     *    if (subject.removePotion(slowness))
     *    {
     *        subject.send("I made you faster, no need to thank me ;)");
     *    }
     *
     * @param potion Potion
     * @returns {@link boolean} - <code>true</code> if there was effect, and it was successfully removed,
 <code>false</code> if had no given effect present.
     */
    removePotion(potion: Potion): boolean
    /**
     * Remove all potion effects from this entity.
     *
     * <p><b>Attention</b>: potion effects work only with living base entities, so check for
     * {@link #isLivingBase()}! You can get the potion effect using
     * {@link IScriptFactory#getPotion(String)}.</p>
     *
     * @example
     *    var subject = c.getSubject();
     *
     *    subject.clearPotions();
     *    subject.send("You've been freed from all potion effects!");
     *
     * @returns {@link void}
     */
    clearPotions(): void
    /**
     * Get entity's states (if it has some, only players and NPCs have states).
     *
     * @example
     *    function main(c)
     *    {
     *        var states = c.getSubject().getStates()
     *        states.add("run", 1)
     *
     *        c.send("state run: �6"+states.getNumber("run"))
     *    }
     *
     * @returns {@link IMappetStates} - entity's states, or null if this entity doesn't have states.
     */
    getStates(): IMappetStates
    /**
     * Get entity's morph (works with player and NPCs).
     *
     * @example
     *    // Assuming s is a player
     *    var s = c.getSubject();
     *    var morph = mappet.createMorph("{Name:\"blockbuster.alex\"}");
     *    var entityMorph = s.getMorph();
     *
     *    if (entityMorph != null && entityMorph.equals(morph))
     *    {
     *        c.send(s.getName() + " is morphed into Alex morph!");
     *    }
     *
     * @returns {@link AbstractMorph}
     */
    getMorph(): AbstractMorph
    /**
     * Set entity's morph (works with player and NPCs).
     *
     * @example
     *    var morph = mappet.createMorph("{Name:\"blockbuster.alex\"}");
     *
     *    // Assuming c.getSubject() is a player or an NPC
     *    c.getSubject().setMorph(morph);
     *
     * @param morph AbstractMorph
     * @returns {@link boolean} - if entity's morph was changed successfully.
     */
    setMorph(morph: AbstractMorph): boolean
    /**
     * Display a world morph to all players that see this entity (including themselves).
     *
     * @example
     *    function main(c)
     *    {
     *        var s = c.getSubject();
     *        var morph = mappet.createMorph('{Name:"item"}');
     *
     *        s.displayMorph(morph, 100, 0, s.getHeight() + 0.5, 0);
     *    }
     *
     * @param morph AbstractMorph
     * @param expiration number
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    displayMorph(morph: AbstractMorph, expiration: number, x: number, y: number, z: number): void
    /**
     * Display a world morph to all players that see this entity (including themselves) with
     * toggleable following rotation.
     *
     * @example
     *    var s = c.getSubject();
     *    var morph = mappet.createMorph('{Name:"item"}');
     *
     *    s.displayMorph(morph, 100, 0, s.getHeight() + 0.5, 0, true);
     *
     * @param morph AbstractMorph
     * @param expiration number
     * @param x number
     * @param y number
     * @param z number
     * @param rotate boolean
     * @returns {@link void}
     */
    displayMorph(morph: AbstractMorph, expiration: number, x: number, y: number, z: number, rotate: boolean): void
    /**
     * Display a world morph to all players that see this entity (including themselves)
     * toggleable following rotation and rotation offsets.
     *
     * @example
     *    var s = c.getSubject();
     *    var morph = mappet.createMorph('{Name:"item"}');
     *
     *    s.displayMorph(morph, 100, 0, s.getHeight() + 0.5, 0, 180, 0, true);
     *
     * @param morph AbstractMorph
     * @param expiration number
     * @param x number
     * @param y number
     * @param z number
     * @param yaw number
     * @param pitch number
     * @param rotate boolean
     * @returns {@link void}
     */
    displayMorph(morph: AbstractMorph, expiration: number, x: number, y: number, z: number, yaw: number, pitch: number, rotate: boolean): void
    /**
     * Display a world morph to given player that sees this entity
     * toggleable following rotation and rotation offsets.
     *
     * @example
     *    // Show this morph only to Notch
     *    var s = c.getSubject();
     *    var morph = mappet.createMorph('{Name:"item"}');
     *
     *    s.displayMorph(morph, 100, 0, s.getHeight() + 0.5, 0, 180, 0, true, c.getServer().getPlayer("Notch"));
     *
     * @param morph AbstractMorph
     * @param expiration number
     * @param x number
     * @param y number
     * @param z number
     * @param yaw number
     * @param pitch number
     * @param rotate boolean
     * @param player IScriptPlayer
     * @returns {@link void}
     */
    displayMorph(morph: AbstractMorph, expiration: number, x: number, y: number, z: number, yaw: number, pitch: number, rotate: boolean, player: IScriptPlayer): void
    /**
     * Spawn a BB gun projectile. It works only if Blockbuster mod is present.
     *
     * <p>ProTip: To get the gun props' NBT code, configure a desired BB gun, and grab it into
     * you main hand. Execute <code>/item_nbt false</code> command in the chat, paste the NBT
     * into the script, and remove {Gun: in the beginning and a } in the end.</p>
     *
     * @example
     *    c.getSubject().shootBBGunProjectile('{Gun:{Damage:1.0f,Projectile:{Meta:0b,Block:"minecraft:stone",Name:"block"},Gravity:0.0f}}')
     *
     * @param gunPropsNBT string
     * @returns {@link IScriptEntity}
     */
    shootBBGunProjectile(gunPropsNBT: string): IScriptEntity
    /**
     * Executes a command as a entity.
     *
     * @example
     *    function main(c)
     *    {
     *        c.getSubject().executeCommand("/kill");
     *    }
     *
     * @param command string
     * @returns {@link void}
     */
    executeCommand(command: string): void
    /**
     * Execute for the entity a script with a given script name
     * and the default function "main".
     *
     * @example
     *    c.getSubject().executeScript("example_script.js");
     *
     * @param scriptName string
     * @returns {@link void}
     */
    executeScript(scriptName: string): void
    /**
     * Execute for the entity a script with a given script name.
     *
     * @example
     *    c.getSubject().executeScript("example_script.js", "custom_function");
     *
     * @param scriptName string
     * @param function string
     * @returns {@link void}
     */
    executeScript(scriptName: string, func: string): void
    /**
     * Execute for the entity a script with a given script name and arguments.
     *
     * @example
     *    c.getSubject().executeScript("example_script.js", "func_with_context", c, 1, 2, 3);
     *    c.getSubject().executeScript("example_script.js", "func_without_context", 1, 2, 3);
     *
     *    // example_script.js
     *    function func_with_context(c, arg1, arg2, arg3)
     *    {
     *        c.getSubject().send("arg1: " + arg1 + ", arg2: " + arg2 + ", arg3: " + arg3);
     *    }
     *
     *    function func_without_context(arg1, arg2, arg3)
     *    {
     *        print("arg1: " + arg1 + ", arg2: " + arg2 + ", arg3: " + arg3);
     *    }
     *
     * @param scriptName string
     * @param function string
     * @param args Object
     * @returns {@link void}
     */
    executeScript(scriptName: string, func: string, args: Object): void
    /**
     * Lock the entity's position.
     *
     * @example
     *    var s = c.getSubject();
     *    var pos = s.getPosition();
     *    s.lockPosition(pos.x, pos.y, pos.z);
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    lockPosition(x: number, y: number, z: number): void
    /**
     * Unlock the entity's position.
     *
     * @example
     *    c.getSubject().unlockPosition();
     *
     * @returns {@link void}
     */
    unlockPosition(): void
    /**
     * Check if the entity's position is locked.
     *
     * @example
     *    if (c.getSubject().isPositionLocked())
     *    {
     *        // Do something
     *    }
     *
     * @returns {@link boolean}
     */
    isPositionLocked(): boolean
    /**
     * Lock the entity's rotation.
     *
     * @example
     *    var s = c.getSubject();
     *    var rot = s.getRotations();
     *    s.lockRotation(rot.x, rot.y, rot.z);
     *
     * @param pitch number
     * @param yaw number
     * @param yawHead number
     * @returns {@link void}
     */
    lockRotation(pitch: number, yaw: number, yawHead: number): void
    /**
     * Unlock the entity's rotation.
     *
     * @example
     *    c.getSubject().unlockRotation();
     *
     * @returns {@link void}
     */
    unlockRotation(): void
    /**
     * Check if the entity's rotation is locked.
     *
     * @example
     *    if (c.getSubject().isRotationLocked())
     *    {
     *        // Do something
     *    }
     *
     * @returns {@link boolean}
     */
    isRotationLocked(): boolean
    /**
     * <p>Moves the entity to the specified position (<b>x, y, z</b>)
     * with the given <b>interpolation type</b> and <b>duration</b>.
     * The following interpolation types are supported:</p>
     * <ul>
     *     <li>§7linear§r</li>
     *     <li>§7quad_in§r</li>
     *     <li>§7quad_out§r</li>
     *     <li>§7quad_inout§r</li>
     *     <li>§7cubic_in§r</li>
     *     <li>§7cubic_out§r</li>
     *     <li>§7cubic_inout§r</li>
     *     <li>§7exp_in§r</li>
     *     <li>§7exp_out§r</li>
     *     <li>§7exp_inout§r</li>
     *     <li>§7back_in§r</li>
     *     <li>§7back_out§r</li>
     *     <li>§7back_inout§r</li>
     *     <li>§7elastic_in§r</li>
     *     <li>§7elastic_out§r</li>
     *     <li>§7elastic_inout§r</li>
     *     <li>§7bounce_in§r</li>
     *     <li>§7bounce_out§r</li>
     *     <li>§7bounce_inout§r</li>
     *     <li>§7sine_in§r</li>
     *     <li>§7sine_out§r</li>
     *     <li>§7sine_inout§r</li>
     *     <li>§7quart_in§r</li>
     *     <li>§7quart_out§r</li>
     *     <li>§7quart_inout§r</li>
     *     <li>§7quint_in§r</li>
     *     <li>§7quint_out§r</li>
     * </ul>
     *
     * @example
     *    var s = c.getSubject();
     *    var pos = s.getPosition();
     *    s.moveTo("quad_out", 30, pos.x, pos.y+2, pos.z, false);
     *
     * @param interpolation string
     * @param durationTicks number
     * @param x number
     * @param y number
     * @param z number
     * @param disableAI boolean
     * @returns {@link void}
     */
    moveTo(interpolation: string, durationTicks: number, x: number, y: number, z: number, disableAI: boolean): void
    /**
     * Makes the entity observe the given entity.
     *
     * @example
     *    c.getSubject().observe(null); //to stop observing
     *
     * @param entity IScriptEntity
     * @returns {@link void}
     */
    observe(entity: IScriptEntity): void
    /**
     * Adds a patrol point to the entity
     *
     * @example
     *    var s = c.getSubject();
     *    s.addEntityPatrol(440, 117, 640, 1, true, "particle heart ~ ~1 ~ 0.2 0.2 0.2 1")
     *    s.addEntityPatrol(444, 117, 640, 1, true, "particle angryVillager ~ ~1 ~ 0.2 0.2 0.2 1")
     *
     * @param x number
     * @param y number
     * @param z number
     * @param speed number
     * @param shouldCirculate boolean
     * @param executeCommandOnArrival string
     * @returns {@link void}
     */
    addEntityPatrol(x: number, y: number, z: number, speed: number, shouldCirculate: boolean, executeCommandOnArrival: string): void
    /**
     * Clears all patrol points from the entity
     *
     * @example
     *    c.getSubject().clearEntityPatrols();
     *
     * @returns {@link void}
     */
    clearEntityPatrols(): void
    /**
     * Sets the entity's AI to look with specific rotations
     *
     * @example
     *    c.getSubject().setRotationsAI(0, 90, 0);
     *
     * @param yaw number
     * @param pitch number
     * @param yawHead number
     * @returns {@link void}
     */
    setRotationsAI(yaw: number, pitch: number, yawHead: number): void
    /**
     * Clears the entity's AI rotations
     *
     * @example
     *    c.getSubject().clearRotationsAI();
     *
     * @returns {@link void}
     */
    clearRotationsAI(): void
    /**
     * Executes a command at a specific frequency on an entity.
     *
     * @example
     *
     *
     * @param command string
     * @param frequency number
     * @returns {@link void}
     */
    executeRepeatingCommand(command: string, frequency: number): void
    /**
     * Removes a repeating command from an entity.
     *
     * @example
     *    c.getSubject().removeRepeatingCommand("/tp @s ~ ~2 ~");
     *
     * @param command string
     * @returns {@link void}
     */
    removeRepeatingCommand(command: string): void
    /**
     * Clears all the repeating commands of an entity.
     *
     * @example
     *    c.getSubject().clearAllRepeatingCommands();
     *
     * @returns {@link void}
     */
    clearAllRepeatingCommands(): void
}

declare interface IScriptWorld {
    readonly minecraftWorld: World
    time: number
    readonly totalTime: number
    readonly dimensionId: number
    /**
     * Get Minecraft world instance. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @example
     *    function main(c)
     *    {
     *        var seaLevel = c.getWorld().getMinecraftWorld().field_181546_a //Sea level
     *
     *        c.send(seaLevel)
     *    }
     *
     * @returns {@link World}
     */
    getMinecraftWorld(): World
    /**
     * Set a game rule to a given value.
     *
     * @example
     *    c.getWorld().setGameRule("keepInventory", true); //btw you can NOT write 1 instead of true
     *    c.getWorld().setGameRule("randomTickSpeed", 100);
     *
     * @param gameRule string
     * @param value Object
     * @returns {@link void}
     */
    setGameRule(gameRule: string, value: Object): void
    /**
     * Get a game rule value.
     *
     * @example
     *    var keepInventory = c.getWorld().getGameRule("keepInventory");
     *    var randomTickSpeed = c.getWorld().getGameRule("randomTickSpeed");
     *
     *    c.send("Keep inventory: " + keepInventory);
     *    c.send("Random tick speed: " + randomTickSpeed);
     *
     * @param gameRule string
     * @returns {@link Object} - The value of the game rule. The type of the value will match the expected type for the game rule.
     */
    getGameRule(gameRule: string): Object
    /**
     * Set a block at XYZ, use {@link IScriptFactory#createBlockState(String, int)}
     * to get the block state.
     *
     * @example
     *    var coarse_dirt = mappet.createBlockState("minecraft:dirt", 1);
     *
     *    c.getWorld().setBlock(coarse_dirt, 214, 3, 509);
     *
     * @param state IScriptBlockState
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    setBlock(state: IScriptBlockState, x: number, y: number, z: number): void
    /**
     * Remove a block at given XYZ.
     *
     * @example
     *    c.getWorld().removeBlock(214, 3, 509);
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    removeBlock(x: number, y: number, z: number): void
    /**
     * Get block state at given XYZ.
     *
     * @example
     *    var block = c.getWorld().getBlock(214, 3, 509);
     *
     *    c.send("Block at (214, 3, 509) is " + block.getBlockId());
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link IScriptBlockState} - a block state at given XYZ, or null if the chunk isn't loaded
     */
    getBlock(x: number, y: number, z: number): IScriptBlockState
    /**
     * Get block state at given XYZ.
     *
     * @example
     *    var block = c.getWorld().getBlock(mappet.vector3(214, 3, 509));
     *
     *    c.send("Block at (214, 3, 509) is " + block.getBlockId());
     *
     * @param pos ScriptVector
     * @returns {@link IScriptBlockState} - a block state at given XYZ, or null if the chunk isn't loaded
     */
    getBlock(pos: ScriptVector): IScriptBlockState
    /**
     * Whether a tile entity is present at given XYZ.
     *
     * @example
     *    function main(c)
     *    {
     *        var hasTileEntity = c.getWorld().hasTileEntity(0, 80, 0)
     *
     *        c.send(hasTileEntity)
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link boolean}
     */
    hasTileEntity(x: number, y: number, z: number): boolean
    /**
     * Replace all blocks in the given area with the given block state.
     *
     * @example
     *    c.getWorld().replaceBlocks(
     *       mappet.createBlockState("minecraft:dirt", 0),
     *       mappet.createBlockState("minecraft:dirt", 1),
     *       mappet.vector3(214, 3, 509),
     *       mappet.vector3(214, 3, 509)
     *    );
     *
     * @param blockToBeReplaced IScriptBlockState
     * @param newBlock IScriptBlockState
     * @param pos1 Vector3d
     * @param pos2 Vector3d
     * @returns {@link void}
     */
    replaceBlocks(blockToBeReplaced: IScriptBlockState, newBlock: IScriptBlockState, pos1: Vector3d, pos2: Vector3d): void
    /**
     * Replace all blocks in the given area with the given block state and tile entity data.
     *
     * @example
     *    c.getWorld().replaceBlocks(
     *       mappet.createBlockState("minecraft:dirt", 0),
     *       mappet.createBlockState("blockbuster:model", 0),
     *       mappet.createCompound('{Morph:{Settings:{Hands:1b},Name:"blockbuster.fred"},id:"minecraft:blockbuster_model_tile_entity"}'),
     *       mappet.vector3(171, 61, 279),
     *       mappet.vector3(176, 64, 276)
     *    );
     *
     * @param blockToBeReplaced IScriptBlockState
     * @param newBlock IScriptBlockState
     * @param tileData INBTCompound
     * @param pos1 Vector3d
     * @param pos2 Vector3d
     * @returns {@link void}
     */
    replaceBlocks(blockToBeReplaced: IScriptBlockState, newBlock: IScriptBlockState, tileData: INBTCompound, pos1: Vector3d, pos2: Vector3d): void
    /**
     * Get tile entity at given XYZ.
     *
     * @example
     *    var tile = c.getWorld().getTileEntity(214, 3, 509);
     *
     *    if (tile)
     *    {
     *        c.send("Tile entity at (214, 3, 509) is " + tile.getId());
     *    }
     *    else
     *    {
     *        c.send("There is no tile entity at (214, 3, 509)");
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link IScriptTileEntity}
     */
    getTileEntity(x: number, y: number, z: number): IScriptTileEntity
    /**
     * Check whether there is an inventory tile entity at given XYZ.
     *
     * @example
     *    var world = c.getWorld();
     *
     *    if (world.hasInventory(214, 4, 512))
     *    {
     *        var inventory = world.getInventory(214, 4, 512);
     *
     *        inventory.setStack(0, mappet.createItem("minecraft:diamond_hoe"));
     *        c.send("There is a surprise for you in chest at (214, 4, 512) :)");
     *    }
     *    else
     *    {
     *        c.send("There is no chest at (214, 4, 512)...");
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link boolean}
     */
    hasInventory(x: number, y: number, z: number): boolean
    /**
     * Get inventory tile entity at given XYZ.
     *
     * @example
     *    var world = c.getWorld();
     *    var inventory = world.getInventory(214, 4, 512);
     *
     *    if (world.hasInventory(214, 4, 512))
     *    {
     *        var inventory = world.getInventory(214, 4, 512);
     *
     *        inventory.clear();
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link IScriptInventory} - an inventory at given XYZ, or <code>null</code> if an inventory tile entity isn't present.
     */
    getInventory(x: number, y: number, z: number): IScriptInventory
    /**
     * Check whether it's raining in the world.
     *
     * @example
     *    var world = c.getWorld();
     *    var pos = c.getSubject().getPosition();
     *
     *    // If it's raining in the world, then drop a diamond
     *    // If not, then drop a dirt block
     *    if (world.isRaining())
     *    {
     *        world.dropItemStack(mappet.createItem("minecraft:diamond"), pos.x, pos.y + 3, pos.z);
     *    }
     *    else
     *    {
     *        world.dropItemStack(mappet.createItem("minecraft:dirt"), pos.x, pos.y + 3, pos.z);
     *    }
     *
     * @returns {@link boolean}
     */
    isRaining(): boolean
    /**
     * Set raining state.
     *
     * @example
     *    c.getWorld().setRaining(true);
     *    c.send("The ritual dance got successfully completed!");
     *
     * @param raining boolean
     * @returns {@link void}
     */
    setRaining(raining: boolean): void
    /**
     * Get current time of day (the one that is set by <code>/time set</code> command).
     *
     * @example
     *    if (c.getWorld().getTime() % 24000 > 12000)
     *    {
     *        c.getSubject().send("Good night!");
     *    }
     *    else
     *    {
     *        c.getSubject().send("Good day!");
     *    }
     *
     * @returns {@link number}
     */
    getTime(): number
    /**
     * Set current time of day.
     *
     * @example
     *    c.getWorld().setTime(14000);
     *    c.send("Another ritual dance got successfully completed!");
     *
     * @param time number
     * @returns {@link void}
     */
    setTime(time: number): void
    /**
     * Get total time that this world existed for (in ticks).
     *
     * @example
     *    if (c.getWorld().getTotalTime() > 20 * 600)
     *    {
     *        c.send("You had only 10 minutes to complete the map...");
     *        c.send("Initiating SELF-DESTRUCT mode!");
     *
     *        // TODO: implement self-destruction
     *    }
     *
     * @returns {@link number}
     */
    getTotalTime(): number
    /**
     * Get world's dimension ID.
     *
     * @example
     *    if (c.getWorld().getDimensionId() == 0)
     *    {
     *        c.getSubject().send("You're in overworld!");
     *    }
     *    else
     *    {
     *        c.getSubject().send("*shrugs*");
     *    }
     *
     * @returns {@link number}
     */
    getDimensionId(): number
    /**
     * Spawn vanilla particles.
     *
     * @example
     *    var explode = mappet.getParticleType("explode");
     *    var pos = c.getSubject().getPosition();
     *
     *    c.getWorld().spawnParticles(explode, false, pos.x, pos.y, pos.z, 10, 0.1, 0.1, 0.1, 0.1);
     *
     * @param type EnumParticleTypes
     * @param longDistance boolean
     * @param x number
     * @param y number
     * @param z number
     * @param n number
     * @param dx number
     * @param dy number
     * @param dz number
     * @param speed number
     * @param args number
     * @returns {@link void}
     */
    spawnParticles(type: EnumParticleTypes, longDistance: boolean, x: number, y: number, z: number, n: number, dx: number, dy: number, dz: number, speed: number, args: number): void
    /**
     * Spawn vanilla particles only to a specific player.
     *
     * @example
     *    var explode = mappet.getParticleType("explode");
     *    var pos = c.getSubject().getPosition();
     *
     *    c.getWorld().spawnParticles(c.getSubject(), explode, false, pos.x, pos.y, pos.z, 10, 0.1, 0.1, 0.1, 0.1);
     *
     * @param player IScriptPlayer
     * @param type EnumParticleTypes
     * @param longDistance boolean
     * @param x number
     * @param y number
     * @param z number
     * @param n number
     * @param dx number
     * @param dy number
     * @param dz number
     * @param speed number
     * @param args number
     * @returns {@link void}
     */
    spawnParticles(player: IScriptPlayer, type: EnumParticleTypes, longDistance: boolean, x: number, y: number, z: number, n: number, dx: number, dy: number, dz: number, speed: number, args: number): void
    /**
     * Spawn an entity at given position.
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *
     *    // Make an explosion at player's feet
     *    c.getWorld().spawnEntity("minecraft:tnt", pos.x, pos.y, pos.z);
     *
     * @param id string
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link IScriptEntity}
     */
    spawnEntity(id: string, x: number, y: number, z: number): IScriptEntity
    /**
     * Spawn an entity at given position with additional data.
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *
     *    // Spawn a baby zombie
     *    c.getWorld().spawnEntity("minecraft:zombie", pos.x, pos.y + 3, pos.z, mappet.createCompound("{IsBaby:1b}"));
     *
     * @param id string
     * @param x number
     * @param y number
     * @param z number
     * @param compound INBTCompound
     * @returns {@link IScriptEntity}
     */
    spawnEntity(id: string, x: number, y: number, z: number, compound: INBTCompound): IScriptEntity
    /**
     * Spawn an NPC at given position with default state.
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *
     *    c.getWorld().spawnNpc("herobrine", pos.x, pos.y, pos.z);
     *
     * @param id string
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link IScriptNpc}
     */
    spawnNpc(id: string, x: number, y: number, z: number): IScriptNpc
    /**
     * Spawn an NPC at given position with given state.
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *
     *    c.getWorld().spawnNpc("herobrine", "dabbing", pos.x, pos.y, pos.z);
     *
     * @param id string
     * @param state string
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link IScriptNpc}
     */
    spawnNpc(id: string, state: string, x: number, y: number, z: number): IScriptNpc
    /**
     * Spawn an NPC at given position with given state and rotation.
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *
     *    c.getWorld().spawnNpc("herobrine", "dabbing", pos.x, pos.y, pos.z, 0, 0, 0);
     *
     * @param id string
     * @param state string
     * @param x number
     * @param y number
     * @param z number
     * @param yaw number
     * @param pitch number
     * @param headYaw number
     * @returns {@link IScriptNpc}
     */
    spawnNpc(id: string, state: string, x: number, y: number, z: number, yaw: number, pitch: number, headYaw: number): IScriptNpc
    /**
     * Get entities within the box specified by given coordinates in this world.
     * This method limits to scanning entities only within <b>100 blocks</b>
     * in any direction. If the box provided has any of its sizes that is longer
     * than 100 blocks, then it will simply return an empty list.
     *
     * @example
     *    // Y position is at the feet, while X and Z is at center
     *    var pos = c.getSubject().getPosition();
     *    var entities = c.getWorld().getEntities(pos.x - 2, pos.y - 1, pos.z - 2, pos.x + 2, pos.y + 3, pos.z + 2);
     *
     *    for (var i in entities)
     *    {
     *        var entity = entities[i];
     *
     *        if (!entity.isSame(c.getSubject()))
     *        {
     *            entity.damage(2.0);
     *        }
     *    }
     *
     * @param x1 number
     * @param y1 number
     * @param z1 number
     * @param x2 number
     * @param y2 number
     * @param z2 number
     * @returns {@link List}
     */
    getEntities(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): List<IScriptEntity>
    /**
     * Get entities within the box specified by given coordinates in this world ignoring the volume limit.
     * This method does not limit to scanning entities only within <b>100 blocks</b>
     *
     * @example
     *    // Y position is at the feet, while X and Z is at center
     *    var pos = c.getSubject().getPosition();
     *    var entities = c.getWorld().getEntities(pos.x - 30, pos.y - 30, pos.z - 30, pos.x + 30, pos.y + 30, pos.z + 30, true);
     *
     *    for (var i in entities)
     *    {
     *        var entity = entities[i];
     *
     *        if (!entity.isSame(c.getSubject()))
     *        {
     *            entity.damage(2.0);
     *        }
     *    }
     *
     * @param x1 number
     * @param y1 number
     * @param z1 number
     * @param x2 number
     * @param y2 number
     * @param z2 number
     * @param ignoreVolumeLimit boolean
     * @returns {@link List}
     */
    getEntities(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, ignoreVolumeLimit: boolean): List<IScriptEntity>
    /**
     * Get entities within the sphere specified by given coordinates and radius in
     * this world. This method limits to scanning entities only within <b>50 blocks
     * radius</b> in any direction. If the sphere provided has the radius that is
     * longer than 100 blocks, then it will simply return an empty list.
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *    var entities = c.getWorld().getEntities(pos.x, pos.y + 1, pos.z, 3);
     *
     *    for (var i in entities)
     *    {
     *        var entity = entities[i];
     *
     *        if (!entity.isSame(c.getSubject()))
     *        {
     *            entity.damage(2.0);
     *        }
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @param radius number
     * @returns {@link List}
     */
    getEntities(x: number, y: number, z: number, radius: number): List<IScriptEntity>
    /**
     * Play a sound event in the world.
     *
     * <p>For all possible sound event IDs, please refer to either <code>/playsound</code>
     * command, or script editor's sound picker.</p>
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *
     *    c.getWorld().playSound("minecraft:entity.pig.ambient", pos.x, pos.y, pos.z);
     *
     * @param event string
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    playSound(event: string, x: number, y: number, z: number): void
    /**
     * Play a sound event in the world with volume and pitch.
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *
     *    c.getWorld().playSound("minecraft:entity.pig.ambient", pos.x, pos.y, pos.z, 1.0, 0.8);
     *
     * @param event string
     * @param x number
     * @param y number
     * @param z number
     * @param volume number
     * @param pitch number
     * @returns {@link void}
     */
    playSound(event: string, x: number, y: number, z: number, volume: number, pitch: number): void
    /**
     * Stop all playing sound events for every player.
     *
     * @example
     *    c.getWorld().stopAllSounds();
     *
     * @returns {@link void}
     */
    stopAllSounds(): void
    /**
     * Stop specific sound event for every player.
     *
     * @example
     *    c.getWorld().stopSound("minecraft:entity.pig.ambient");
     *
     * @param event string
     * @returns {@link void}
     */
    stopSound(event: string): void
    /**
     * <p>Stop specific sound event in given sound category for every player.</p>
     *
     * <p>For list of sound categories, type into chat
     * <code>/playsound minecraft:entity.pig.ambient</code>, press space, and press
     * Tab key. The list of sounds categories will be displayed.</p>
     *
     * @example
     *    c.getWorld().stopSound("minecraft:entity.pig.ambient", "master");
     *
     * @param event string
     * @param category string
     * @returns {@link void}
     */
    stopSound(event: string, category: string): void
    /**
     * Drop item stack at given XYZ position with no velocity applied.
     *
     * @example
     *    var item = mappet.createItem("minecraft:diamond_hoe");
     *    var pos = c.getSubject().getPosition();
     *
     *    c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z);
     *
     * @param stack IScriptItemStack
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link IScriptEntityItem}
     */
    dropItemStack(stack: IScriptItemStack, x: number, y: number, z: number): IScriptEntityItem
    /**
     * Drop an item stack at given XYZ position in this world with desired velocity.
     *
     * @example
     *    var item = mappet.createItem("minecraft:diamond_hoe");
     *    var pos = c.getSubject().getPosition();
     *
     *    c.getWorld().dropItemStack(item, pos.x, pos.y + 3, pos.z, 0, 1, 0);
     *
     * @param stack IScriptItemStack
     * @param x number
     * @param y number
     * @param z number
     * @param mx number
     * @param my number
     * @param mz number
     * @returns {@link IScriptEntityItem}
     */
    dropItemStack(stack: IScriptItemStack, x: number, y: number, z: number, mx: number, my: number, mz: number): IScriptEntityItem
    /**
     * Make an explosion in this world at given coordinates, and distance that
     * destroys blocks, damages entities but not places fire. See {@link IScriptWorld#explode(IScriptEntity, double, double, double, float, boolean, boolean)}
     * for more thorough definition of arguments.
     *
     * @example
     *    function main(c)
     *    {
     *        var s = c.getSubject();
     *        var pos = s.getPosition();
     *
     *        c.getWorld().explode(pos.x, pos.y, pos.z, 10)
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @param distance number
     * @returns {@link void}
     */
    explode(x: number, y: number, z: number, distance: number): void
    /**
     * Make an explosion in this world at given coordinates, and distance with
     * options to place fire and destroy blocks. See {@link IScriptWorld#explode(IScriptEntity, double, double, double, float, boolean, boolean)}
     * for more thorough definition of arguments.
     *
     * @example
     *    function main(c)
     *    {
     *        var s = c.getSubject();
     *        var pos = s.getPosition();
     *
     *        c.getWorld().explode(pos.x, pos.y, pos.z, 10, false, false)
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @param distance number
     * @param blazeGround boolean
     * @param destroyTerrain boolean
     * @returns {@link void}
     */
    explode(x: number, y: number, z: number, distance: number, blazeGround: boolean, destroyTerrain: boolean): void
    /**
     * Make an explosion in this world at given coordinates, distance, and entity
     * that caused the explosion.
     *
     * @example
     *    function main(c)
     *    {
     *        var s = c.getSubject();
     *        var pos = s.getPosition();
     *
     *        c.getWorld().explode(s, pos.x, pos.y, pos.z, 10, false, false)
     *    }
     *
     * @param exploder IScriptEntity
     * @param x number
     * @param y number
     * @param z number
     * @param distance number
     * @param blazeGround boolean
     * @param destroyTerrain boolean
     * @returns {@link void}
     */
    explode(exploder: IScriptEntity, x: number, y: number, z: number, distance: number, blazeGround: boolean, destroyTerrain: boolean): void
    /**
     * Ray trace in this world, between two given points (including any entity intersection).
     * Check {@link IScriptRayTrace} for an example.
     *
     * @param x1 number
     * @param y1 number
     * @param z1 number
     * @param x2 number
     * @param y2 number
     * @param z2 number
     * @returns {@link IScriptRayTrace}
     */
    rayTrace(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): IScriptRayTrace
    /**
     * Ray trace in this world, between two given points (excluding entities).
     * Check {@link IScriptRayTrace} for an example.
     *
     * @param x1 number
     * @param y1 number
     * @param z1 number
     * @param x2 number
     * @param y2 number
     * @param z2 number
     * @returns {@link IScriptRayTrace}
     */
    rayTraceBlock(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): IScriptRayTrace
    /**
     * Return whether a button, plate or lever is active or not.
     *
     * @example
     *    c.getWorld().isActive(0, 4, 0);
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link boolean}
     */
    isActive(x: number, y: number, z: number): boolean
    /**
     * Test for a specific block and meta in a specific coordinates.
     *
     * @example
     *    function main(c)
     *    {
     *        var pos = c.getSubject().getPosition()
     *
     *        if (c.getWorld().testForBlock(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z), "minecraft:light_weighted_pressure_plate", 1))
     *        {
     *            c.send("Prussure Plate is pressed.")
     *        }
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @param blockId string
     * @param meta number
     * @returns {@link boolean}
     */
    testForBlock(x: number, y: number, z: number, blockId: string, meta: number): boolean
    /**
     * Fill a 3D area with a block.
     *
     * @example
     *    var coarse_dirt = mappet.createBlockState("minecraft:dirt", 1);
     *
     *    c.getWorld().fill(coarse_dirt, -3, 100, -3, 3, 100, 3);
     *
     * @param state IScriptBlockState
     * @param x1 number
     * @param y1 number
     * @param z1 number
     * @param x2 number
     * @param y2 number
     * @param z2 number
     * @returns {@link void}
     */
    fill(state: IScriptBlockState, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): void
    /**
     * Summon a falling block with a specific block id and meta.
     *
     * @example
     *    c.getWorld().summonFallingBlock(0, 100, 0, "minecraft:dirt", 1);
     *
     * @param x number
     * @param y number
     * @param z number
     * @param blockId string
     * @param meta number
     * @returns {@link IScriptEntity} - The falling block entity.
     */
    summonFallingBlock(x: number, y: number, z: number, blockId: string, meta: number): IScriptEntity
    /**
     * Transform a block to a falling block in specific coordinates.
     *
     * @example
     *    c.getWorld().setFallingBlock(0, 100, 0);
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link IScriptEntity} - The falling block entity.
     */
    setFallingBlock(x: number, y: number, z: number): IScriptEntity
    /**
     * Sets a tile entity.
     *
     * @example
     *    c.getWorld().setTileEntity(
     *        530, 152, 546,
     *        mappet.createBlockState("blockbuster:model", 0),
     *        mappet.createCompound('{Morph:{Settings:{Hands:1b},Name:"blockbuster.fred"},id:"minecraft:blockbuster_model_tile_entity"}')
     *    );
     *
     * @param x number
     * @param y number
     * @param z number
     * @param blockState IScriptBlockState
     * @param tileData INBTCompound
     * @returns {@link void}
     */
    setTileEntity(x: number, y: number, z: number, blockState: IScriptBlockState, tileData: INBTCompound): void
    /**
     * Fills a range with tile entities.
     *
     * @example
     *    c.getWorld().fillTileEntities(530, 152, 546, mappet.createBlockState("blockbuster:model", 0), mappet.createCompound('{Morph:{Settings:{Hands:1b},Name:"blockbuster.fred"},id:"minecraft:blockbuster_model_tile_entity"}'));
     *
     * @param x1 number
     * @param y1 number
     * @param z1 number
     * @param x2 number
     * @param y2 number
     * @param z2 number
     * @param blockState IScriptBlockState
     * @param tileData INBTCompound
     * @returns {@link void}
     */
    fillTileEntities(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, blockState: IScriptBlockState, tileData: INBTCompound): void
    /**
     * Clones am area to another area.
     *
     * @example
     *    c.getWorld().clone(0, 100, 0, 3, 100, 3, 0, 101, 0);
     *
     * @param x1 number
     * @param y1 number
     * @param z1 number
     * @param x2 number
     * @param y2 number
     * @param z2 number
     * @param xNew number
     * @param yNew number
     * @param zNew number
     * @returns {@link void}
     */
    clone(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, xNew: number, yNew: number, zNew: number): void
    /**
     * Clones the block to another coordinates.
     *
     * @example
     *    function main(c)
     *    {
     *        c.getWorld().clone(0, 80, 0, 0, 83, 0)
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @param xNew number
     * @param yNew number
     * @param zNew number
     * @returns {@link void}
     */
    clone(x: number, y: number, z: number, xNew: number, yNew: number, zNew: number): void
    /**
     * Gets the block stack at given position, including tile entity data.
     *
     * @example
     *    var x= 0, y = 100, z = 0;
     *    var world = c.getWorld();
     *    var blockItemStack = world.getBlockStackWithTile(x, y, z);
     *    world.setBlock(mappet.createBlockState("minecraft:air", 0), x, y, z)
     *    world.dropItemStack(blockItemStack, x+0.5, y+0.5, z+0.5);
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link IScriptItemStack}
     */
    getBlockStackWithTile(x: number, y: number, z: number): IScriptItemStack
    /**
     * Returns a new empty Schematic object.
     *
     * @example
     *    function main(c)
     *    {
     *        var schematic = c.world.createSchematic();
     *        schematic.loadFromWorld(0, 4, 0, 4, 8, 4).saveToFile("mySchematic").place(0, 4, 4).place(0, 4, 8);
     *    }
     *
     * @returns {@link MappetSchematic} - {@link IMappetSchematic}
     */
    createSchematic(): IMappetSchematic
    /**
     * Display a world morph to all players around 64 blocks away from given point.
     *
     * @example
     *    function main(c)
     *    {
     *        var s = c.getSubject();
     *        var morph = mappet.createMorph('{Name:"item"}');
     *        var pos = s.getPosition();
     *
     *        c.getWorld().displayMorph(morph, 100, pos.x, pos.y + s.getHeight() + 0.5, pos.z);
     *    }
     *
     * @param morph AbstractMorph
     * @param expiration number
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link void}
     */
    displayMorph(morph: AbstractMorph, expiration: number, x: number, y: number, z: number): void
    /**
     * Display a world morph to all players at given point.
     *
     * @example
     *    var s = c.getSubject();
     *    var morph = mappet.createMorph('{Name:"item"}');
     *    var pos = s.getPosition();
     *
     *    // This will display a diamond hoe morph on top of the
     *    // player's head (but it won't track player's movement)
     *    c.getWorld().displayMorph(morph, 100, pos.x, pos.y + s.getHeight() + 0.5, pos.z, 64);
     *
     * @param morph AbstractMorph
     * @param expiration number
     * @param x number
     * @param y number
     * @param z number
     * @param range number
     * @returns {@link void}
     */
    displayMorph(morph: AbstractMorph, expiration: number, x: number, y: number, z: number, range: number): void
    /**
     * Display a world morph to all players at given point with rotation.
     *
     * @example
     *    var s = c.getSubject();
     *    var morph = mappet.createMorph('{Name:"item"}');
     *    var pos = s.getPosition();
     *
     *    // This will display a diamond hoe morph on top of the
     *    // player's head (but it won't track player's movement)
     *    // oriented at west
     *    c.getWorld().displayMorph(morph, 100, pos.x, pos.y + s.getHeight() + 0.5, pos.z, 90, 0);
     *
     * @param morph AbstractMorph
     * @param expiration number
     * @param x number
     * @param y number
     * @param z number
     * @param yaw number
     * @param pitch number
     * @returns {@link void}
     */
    displayMorph(morph: AbstractMorph, expiration: number, x: number, y: number, z: number, yaw: number, pitch: number): void
    /**
     * Display a world morph to all players at given point with rotation
     * some blocks away in this world.
     *
     * @example
     *    function main(c)
     *    {
     *        var s = c.getSubject();
     *        var morph = mappet.createMorph('{Name:"item"}');
     *        var pos = s.getPosition();
     *
     *        var yaw = s.getYaw()
     *        var pitch = s.getPitch()
     *
     *        c.getWorld().displayMorph(morph, 100, pos.x, pos.y + s.getHeight() + 0.5, pos.z, yaw, pitch, 90);
     *    }
     *
     * @param morph AbstractMorph
     * @param expiration number
     * @param x number
     * @param y number
     * @param z number
     * @param yaw number
     * @param pitch number
     * @param range number
     * @returns {@link void}
     */
    displayMorph(morph: AbstractMorph, expiration: number, x: number, y: number, z: number, yaw: number, pitch: number, range: number): void
    /**
     * Display a world morph to all players at given point with rotation
     * some blocks away in this world only to given player.
     *
     * @example
     *    function main(c)
     *    {
     *        var s = c.getSubject();
     *        var morph = mappet.createMorph('{Name:"item"}');
     *        var pos = s.getPosition();
     *
     *        var yaw = s.getYaw()
     *        var pitch = s.getPitch()
     *
     *        c.getWorld().displayMorph(morph, 100, pos.x, pos.y + s.getHeight() + 0.5, pos.z, yaw, pitch, 90, s);
     *    }
     *
     * @param morph AbstractMorph
     * @param expiration number
     * @param x number
     * @param y number
     * @param z number
     * @param yaw number
     * @param pitch number
     * @param range number
     * @param player IScriptPlayer
     * @returns {@link void}
     */
    displayMorph(morph: AbstractMorph, expiration: number, x: number, y: number, z: number, yaw: number, pitch: number, range: number, player: IScriptPlayer): void
    /**
     * Shoots a gun projectile entity.
     *
     * @example
     *    var projectile = c.getWorld().shootBBGunProjectile(c.getSubject(), 547, 160, 497, 0, -90, '{Gun:{TickCommand:"particle heart ~ ~1 ~ 0.2 0.2 0.2 1",StoredAmmo:0,Ticking:1,Damage:1.0f,Projectile:{Meta:0b,Block:"minecraft:stone",Name:"block"},Gravity:0.0f}}')
     *    c.scheduleScript(20, function (c){
     *        projectile.executeCommand("summon tnt ~ ~ ~")
     *        projectile.remove()
     *    });
     *
     * @param shooter IScriptEntity
     * @param x number
     * @param y number
     * @param z number
     * @param yaw number
     * @param pitch number
     * @param gunPropsNbtString string
     * @returns {@link IScriptEntity}
     */
    shootBBGunProjectile(shooter: IScriptEntity, x: number, y: number, z: number, yaw: number, pitch: number, gunPropsNbtString: string): IScriptEntity
}

declare interface IScriptServer {
    readonly minecraftServer: MinecraftServer
    readonly allPlayers: List<IScriptEntity>
    readonly states: IMappetStates
    /**
     * Get Minecraft server instance. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @returns {@link MinecraftServer}
     */
    getMinecraftServer(): MinecraftServer
    /**
     * Get world at dimension ID.
     *
     * @example
     *    var overworld = c.getServer().getWorld(0);
     *
     *    // Do something with the world...
     *
     * @param dimension number
     * @returns {@link IScriptWorld}
     */
    getWorld(dimension: number): IScriptWorld
    /**
     * Get all entities matching giving target selector.
     *
     * @example
     *    var cows = c.getServer().getEntities("@e[type=minecraft:cow]");
     *
     *    // Despawn all cows
     *    for (var i in cows)
     *    {
     *        cows[i].remove();
     *    }
     *
     * @param targetSelector string
     * @returns {@link List}
     */
    getEntities(targetSelector: string): List<IScriptEntity>
    /**
     * Get an entity by its UUID.
     *
     * @example
     *    var uuid = "29a91933-86f2-4683-8a87-218084d8c927";
     *    var entity = c.getServer().getEntity(uuid);
     *
     *    print(entity.getUniqueId() === uuid); // true
     *
     * @param uuid string
     * @returns {@link IScriptEntity}
     */
    getEntity(uuid: string): IScriptEntity
    /**
     * Get all players on the server.
     *
     * @example
     *    var players = c.getServer().getAllPlayers();
     *
     *    for (var i in players)
     *    {
     *        // Surprise :)
     *        players[i].setMotion(0, 0.5, 0);
     *    }
     *
     * @returns {@link List}
     */
    getAllPlayers(): List<IScriptEntity>
    /**
     * Get a player by their username.
     *
     * @example
     *    var player = c.getServer().getPlayer("Notch");
     *
     *    if (player)
     *    {
     *        // I'm about to pull a prank on Notch... >:)
     *        //
     *        // Or give a nice present... :)
     *    }
     *
     * @param username string
     * @returns {@link IScriptPlayer}
     */
    getPlayer(username: string): IScriptPlayer
    /**
     * Check if a player is online.
     *
     * @example
     *    if (!c.getServer().isOnline("McHorse"))
     *    {
     *        c.send("McHorse is not online. :(")
     *    }
     *
     * @param username string
     * @returns {@link boolean}
     */
    isOnline(username: string): boolean
    /**
     * Get global (server) states.
     *
     * @example
     *    var states = c.getServer().getStates();
     *
     *    if (states.getNumber("total_money_earned") > 1000000000)
     *    {
     *        // Give all players an achievement or something...
     *    }
     *
     * @returns {@link IMappetStates}
     */
    getStates(): IMappetStates
    /**
     * Check if an entity with given UUID exists.
     *
     * @example
     *    if (c.getServer().entityExists("29a91933-86f2-4683-8a87-218084d8c927"))
     *    {
     *        // Do something...
     *    }
     *
     * @param uuid string
     * @returns {@link boolean} - true if an entity with the specified UUID exists, false otherwise.
     */
    entityExists(uuid: string): boolean
    /**
     * Execute a script with a given script name and the default function "main".
     *
     * @example
     *    c.getServer().executeScript("example_script.js");
     *
     * @param scriptName string
     * @returns {@link void}
     */
    executeScript(scriptName: string): void
    /**
     * Execute a script with a given script name and a specified function.
     *
     * @example
     *    c.getServer().executeScript("example_script.js", "custom_function");
     *
     * @param scriptName string
     * @param function string
     * @returns {@link void}
     */
    executeScript(scriptName: string, func: string): void
    /**
     * Execute a script with a given script name, a specified function and arguments.
     *
     * @example
     *    c.getServer().executeScript("example_script.js", "func_with_context", c, 1, 2, 3);
     *    c.getServer().executeScript("example_script.js", "func_without_context", 1, 2, 3);
     *
     *    // example_script.js
     *    function func_with_context(c, arg1, arg2, arg3)
     *    {
     *        c.send("arg1: " + arg1 + ", arg2: " + arg2 + ", arg3: " + arg3);
     *    }
     *
     *    function func_without_context(arg1, arg2, arg3)
     *    {
     *        print("arg1: " + arg1 + ", arg2: " + arg2 + ", arg3: " + arg3);
     *    }
     *
     * @param scriptName string
     * @param function string
     * @param args Object
     * @returns {@link void}
     */
    executeScript(scriptName: string, func: string, args: Object): void
}

declare interface IScriptRayTrace {
    readonly minecraftRayTraceResult: RayTraceResult
    readonly entity: IScriptEntity
    readonly block: ScriptVector
    readonly hitPosition: ScriptVector
    /**
     * Get Minecraft ray trace result. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @returns {@link RayTraceResult}
     */
    getMinecraftRayTraceResult(): RayTraceResult
    /**
     * Check whether this ray trace result didn't capture anything.
     *
     * @returns {@link boolean}
     */
    isMissed(): boolean
    /**
     * Check whether this ray trace result hit a block.
     *
     * @returns {@link boolean}
     */
    isBlock(): boolean
    /**
     * Check whether this ray trace result hit an entity.
     *
     * @returns {@link boolean}
     */
    isEntity(): boolean
    /**
     * Get entity that was captured by this ray trace result (it can be null).
     *
     * @returns {@link IScriptEntity}
     */
    getEntity(): IScriptEntity
    /**
     * Get block position it hit.
     *
     * @returns {@link ScriptVector}
     */
    getBlock(): ScriptVector
    /**
     * Get precise position where it hit.
     *
     * @returns {@link ScriptVector}
     */
    getHitPosition(): ScriptVector
}

declare interface IScriptFactory {
    readonly logger: IMappetLogger
    /**
     * Get a block state that can be used to place and compare blocks in
     * the {@link IScriptWorld}.
     *
     * @example
     *    var fence = mappet.createBlockState("minecraft:fence", 0);
     *
     *    // minecraft:fence 0
     *    c.send(fence.getBlockId() + " " + fence.getMeta());
     *
     * @param blockId string
     * @param meta number
     * @returns {@link IScriptBlockState}
     */
    createBlockState(blockId: string, meta: number): IScriptBlockState
    /**
     * Create a block state that can with the default meta value.
     *
     * @example
     *    var fence = mappet.createBlockState("minecraft:fence");
     *
     *    // minecraft:fence 0
     *    c.send(fence.getBlockId() + " " + fence.getMeta());
     *
     * @param blockId string
     * @returns {@link IScriptBlockState}
     */
    createBlockState(blockId: string): IScriptBlockState
    /**
     * Create an empty NBT compound.
     *
     * @example
     *    var tag = mappet.createCompound();
     *
     *    tag.setString("id", "minecraft:diamond_hoe");
     *    tag.setByte("Count", 1);
     *
     *    var item = mappet.createItemNBT(tag);
     *
     *    // {id:"minecraft:diamond_hoe",Count:1b,Damage:0s}
     *    c.send(item.serialize());
     *
     * @returns {@link INBTCompound}
     */
    createCompound(): INBTCompound
    /**
     * Parse an NBT compound data out of given string, if string NBT was
     * invalid then an empty compound will be returned.
     *
     * @example
     *    var tag = mappet.createCompound("{id:\"minecraft:diamond_hoe\",Count:1b}");
     *    var item = mappet.createItemNBT(tag);
     *
     *    // {id:"minecraft:diamond_hoe",Count:1b,Damage:0s}
     *    c.send(item.serialize());
     *
     * @param nbt string
     * @returns {@link INBTCompound}
     */
    createCompound(nbt: string): INBTCompound
    /**
     * Turn a JS object into an NBT compound.
     *
     * <p><b>BEWARE</b>: when converting JS object to NBT keep in mind some
     * limitations of the NBT format:</p>
     *
     * <ul>
     *     <li>NBT supports multiple number storage formats (byte, short, int, long, float,
     *     double) so the converter will only be able to convert numbers to either
     *     integer or double NBT tags, depending on how did you got the number, <code>42</code>
     *     being an integer, and <code>42.0</code> being a double.</li>
     *     <li>NBT lists support only storage of a <b>single type</b> at once, so if you
     *     provide an JS array like <code>[0, 1, 2, "test", {a:1,b:2}, 4, [0, 0, 0], 5.5]</code>
     *     then <b>only the the first element's</b> type will be taken in account, and the
     *     resulted NBT list will turn out like <code>[0.0d, 1.0d, 2.0d, 4.0d, 5.5d]</code>.
     *     <b>In case with numbers</b> if you had first integers, and somewhere in the
     *     middle in the list you got a double, then the integer type <b>will get converted
     *     to double</b>!</li>
     * </ul>
     *
     * @example
     *    var tag = mappet.createCompoundFromJS({id:"minecraft:diamond_hoe",Count:1});
     *    var item = mappet.createItemNBT(tag);
     *
     *    // {id:"minecraft:diamond_hoe",Count:1b,Damage:0s}
     *    c.send(item.serialize());
     *
     * @param jsObject Object
     * @returns {@link INBTCompound}
     */
    createCompoundFromJS(jsObject: Object): INBTCompound
    /**
     * Create an empty NBT list.
     *
     * @example
     *    var list = mappet.createList();
     *
     *    list.addInt(1);
     *    list.addInt(2);
     *    list.addInt(3);
     *    list.addInt(4);
     *    list.addInt(5);
     *    list.addInt(6);
     *
     *    // [1,2,3,4,5,6]
     *    c.send(list.stringify());
     *
     * @returns {@link INBTList}
     */
    createList(): INBTList
    /**
     * Parse an NBT list data out of given string, if string NBT was
     * invalid then an empty list will be returned.
     *
     * @example
     *    var list = mappet.createList("[1, 2, 3, 4, 5, 6]");
     *
     *    // [1,2,3,4,5,6]
     *    c.send(list.stringify());
     *
     * @param nbt string
     * @returns {@link INBTList}
     */
    createList(nbt: string): INBTList
    /**
     * Turn a JS object into an NBT compound.
     *
     * <p><b>Read carefully the description</b> of {@link #createCompoundFromJS(Object)}
     * for information about JS to NBT object conversion limitations!</p>
     *
     * @example
     *    var list = mappet.createListFromJS([1, 2, 3, 4, 5, 6]);
     *
     *    // [1,2,3,4,5,6]
     *    c.send(list.stringify());
     *
     * @param jsObject Object
     * @returns {@link INBTList}
     */
    createListFromJS(jsObject: Object): INBTList
    /**
     * Create an item stack out of string NBT.
     *
     * @example
     *    var item = mappet.createItemNBT("{id:\"minecraft:enchanted_book\",Count:1b,tag:{StoredEnchantments:[{lvl:4s,id:4s}]},Damage:0s}");
     *
     *    // It will output "minecraft:enchanted_book"
     *    c.send(item.getItem().getId());
     *
     * @param nbt string
     * @returns {@link IScriptItemStack} - an item stack from the string NBT data, or an empty item stack
 if the data doesn't have a valid reference to an existing item
     */
    createItemNBT(nbt: string): IScriptItemStack
    /**
     * Create an item stack out of string NBT.
     *
     * @example
     *    var tag = mappet.createCompound("{id:\"minecraft:diamond_hoe\",Count:1b}");
     *    var item = mappet.createItemNBT(tag);
     *
     *    // {id:"minecraft:diamond_hoe",Count:1b,Damage:0s}
     *    c.send(item.serialize());
     *
     * @param compound INBTCompound
     * @returns {@link IScriptItemStack} - an item stack from the NBT data, or an empty item stack if the
 data doesn't have a valid reference to an existing item
     */
    createItem(compound: INBTCompound): IScriptItemStack
    /**
     * Create an item stack with item ID.
     *
     * @example
     *    var item = mappet.createItem("minecraft:diamond");
     *
     *    // {id:"minecraft:diamond",Count:1b,Damage:0s}
     *    c.send(item.serialize());
     *
     * @param itemId string
     * @returns {@link IScriptItemStack} - an item stack with an item specified by ID, or an empty item
 stack if the block doesn't exist
     */
    createItem(itemId: string): IScriptItemStack
    /**
     * Create an item stack with item ID, count
     *
     * @example
     *    var item = mappet.createItem("minecraft:diamond", 64);
     *
     *    // {id:"minecraft:diamond",Count:64b,Damage:0s}
     *    c.send(item.serialize());
     *
     * @param itemId string
     * @param count number
     * @returns {@link IScriptItemStack} - an item stack with an item specified by ID, or an empty item
 stack if the block doesn't exist
     */
    createItem(itemId: string, count: number): IScriptItemStack
    /**
     * Create an item stack with item ID, count and meta
     *
     * @example
     *    var damaged_hoe = mappet.createItem("minecraft:diamond_hoe", 64, 5);
     *
     *    // {id:"minecraft:diamond_hoe",Count:64b,Damage:5s}
     *    c.send(damaged_hoe.serialize());
     *
     * @param itemId string
     * @param count number
     * @param meta number
     * @returns {@link IScriptItemStack} - an item stack with an item specified by ID, or an empty item
 stack if the block doesn't exist
     */
    createItem(itemId: string, count: number, meta: number): IScriptItemStack
    /**
     * Create an item stack with block ID.
     *
     * @example
     *    var stone = mappet.createBlockItem("minecraft:stone");
     *
     *    // {id:"minecraft:stone",Count:1b,Damage:0s}
     *    c.send(stone.serialize());
     *
     * @param blockId string
     * @returns {@link IScriptItemStack} - an item stack with an item specified by ID, or an empty item
 stack if the block doesn't exist
     */
    createBlockItem(blockId: string): IScriptItemStack
    /**
     * Create an item stack with block ID and count.
     *
     * @example
     *    var stone = mappet.createBlockItem("minecraft:stone", 64);
     *
     *    // {id:"minecraft:stone",Count:64b,Damage:0s}
     *    c.send(stone.serialize());
     *
     * @param blockId string
     * @param count number
     * @returns {@link IScriptItemStack} - an item stack with an item specified by ID, or an empty item
 stack if the block doesn't exist
     */
    createBlockItem(blockId: string, count: number): IScriptItemStack
    /**
     * Create an item stack with block ID, count and meta.
     *
     * @example
     *    var andesite = mappet.createBlockItem("minecraft:stone", 64, 5);
     *
     *    // {id:"minecraft:stone",Count:64b,Damage:5s}
     *    c.send(andesite.serialize());
     *
     * @param blockId string
     * @param count number
     * @param meta number
     * @returns {@link IScriptItemStack} - an item stack with block specified by ID, or an empty item
 stack if the block doesn't exist
     */
    createBlockItem(blockId: string, count: number, meta: number): IScriptItemStack
    /**
     * Get Minecraft particle type by its name.
     *
     * <p>You can find out all of the particle types by typing in <code>/particle</code>
     * command, and looking up the completion of the first argument (i.e. press tab after
     * typing in <code>/particle</code> and a space).</p>
     *
     * @example
     *    var explode = mappet.getParticleType("explode");
     *    var pos = c.getSubject().getPosition();
     *
     *    c.getWorld().spawnParticles(explode, true, pos.x, pos.y + 1, pos.z, 50, 0.5, 0.5, 0.5, 0.1);
     *
     * @param type string
     * @returns {@link EnumParticleTypes}
     */
    getParticleType(type: string): EnumParticleTypes
    /**
     * Get Minecraft potion effect by its name.
     *
     * <p>You can find out all of the particle types by typing in <code>/effect</code>
     * command, and looking up the completion of the second argument (i.e. press tab after
     * typing in <code>/particle Player</code> and a space).</p>
     *
     * @example
     *    var slowness = mappet.getPotion("slowness");
     *
     *    c.getSubject().applyPotion(slowness, 200, 1, false);
     *
     * @param type string
     * @returns {@link Potion}
     */
    getPotion(type: string): Potion
    /**
     * Create a morph out of string NBT.
     *
     * @example
     *    var morph = mappet.createMorph("{Name:\"blockbuster.alex\"}");
     *
     *    // Assuming c.getSubject() is a player
     *    c.getSubject().setMorph(morph);
     *
     * @param nbt string
     * @returns {@link AbstractMorph}
     */
    createMorph(nbt: string): AbstractMorph
    /**
     * Create a morph out of NBT.
     *
     * @example
     *    var tag = mappet.createCompound();
     *
     *    tag.setString("Name", "blockbuster.alex");
     *
     *    var morph = mappet.createMorph(tag);
     *
     *    // Assuming c.getSubject() is a player
     *    c.getSubject().setMorph(morph);
     *
     * @param compound INBTCompound
     * @returns {@link AbstractMorph}
     */
    createMorph(compound: INBTCompound): AbstractMorph
    /**
     * Create a UI. You can send it to the player by using
     * {@link IScriptPlayer#openUI(IMappetUIBuilder)} method.
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI().background();
     *        var label = ui.label("Hello, world!").background(0x88000000);
     *
     *        label.rxy(0.5, 0.5).wh(80, 20).anchor(0.5).labelAnchor(0.5);
     *
     *        c.getSubject().openUI(ui);
     *    }
     *
     * @returns {@link IMappetUIBuilder}
     */
    createUI(): IMappetUIBuilder
    /**
     * Create a UI with a script handler. You can send it to the
     * player by using {@link IScriptPlayer#openUI(IMappetUIBuilder)} method.
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI(c, "handler").background();
     *        var label = ui.label("Hello, world!").background(0x88000000);
     *        var button = ui.button("Push me!").id("button");
     *
     *        label.rxy(0.5, 0.5).wh(80, 20).anchor(0.5).labelAnchor(0.5);
     *        label.rx(0.5).ry(0.5, 25).wh(80, 20).anchor(0.5);
     *
     *        c.getSubject().openUI(ui);
     *    }
     *
     *    function handler(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *
     *        if (uiContext.getLast() === "button")
     *        {
     *            // Button was pressed
     *        }
     *    }
     *
     * @param event IScriptEvent
     * @param function string
     * @returns {@link IMappetUIBuilder}
     */
    createUI(event: IScriptEvent, func: string): IMappetUIBuilder
    /**
     * Create a UI with a script handler. You can send it to the
     * player by using {@link IScriptPlayer#openUI(IMappetUIBuilder)} method.
     *
     * <p>Script and function arguments allow to point to the function in some
     * script, which it will be responsible for handling the user input from
     * scripted UI.</p>
     *
     * <p>In the UI handler, you can access subject's UI context ({@link IMappetUIContext})
     * which has all the necessary methods to handle user's input.</p>
     *
     * @example
     *    // ui.js
     *    function main(c)
     *    {
     *        var ui = mappet.createUI("handler", "main").background();
     *        var label = ui.label("Hello, world!").background(0x88000000);
     *        var button = ui.button("Push me!").id("button");
     *
     *        label.rxy(0.5, 0.5).wh(80, 20).anchor(0.5).labelAnchor(0.5);
     *        label.rx(0.5).ry(0.5, 25).wh(80, 20).anchor(0.5);
     *
     *        c.getSubject().openUI(ui);
     *    }
     *
     *    // handler.js
     *    function main(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *
     *        if (uiContext.getLast() === "button")
     *        {
     *            // Button was pressed
     *        }
     *    }
     *
     * @param script string
     * @param function string
     * @returns {@link IMappetUIBuilder}
     */
    createUI(script: string, func: string): IMappetUIBuilder
    /**
     * Get a global arbitrary object.
     *
     * @example
     *    var number = mappet.get("number");
     *
     *    if (number === null || number === undefined)
     *    {
     *        number = 42;
     *        mappet.set("number", number);
     *    }
     *
     * @param key string
     * @returns {@link Object}
     */
    get(key: string): Object
    /**
     * Set a global arbitrary object during server's existence (other scripts
     * can access this data too).
     *
     * @example
     *    var number = mappet.get("number");
     *
     *    if (number === null || number === undefined)
     *    {
     *        number = 42;
     *        mappet.set("number", number);
     *    }
     *
     * @param key string
     * @param object Object
     * @returns {@link void}
     */
    set(key: string, object: Object): void
    /**
     * Dump the simple representation of given non-JS object into the string (to see
     * what fields and methods are available for use).
     *
     * @example
     *    var morph = mappet.createMorph("{Name:\"blockbuster.alex\"}");
     *
     *    c.send(mappet.dump(morph));
     *
     * @param object Object
     * @returns {@link string}
     */
    dump(object: Object): string
    /**
     * Dump given non-JS object into the string (to see what fields and methods are
     * available for use).
     *
     * @example
     *    var morph = mappet.createMorph("{Name:\"blockbuster.alex\"}");
     *
     *    c.send(mappet.dump(morph, true));
     *
     * @param object Object
     * @param simple boolean
     * @returns {@link string}
     */
    dump(object: Object, simple: boolean): string
    /**
     * Generate a random number between 0 and the given max value (but not
     * including the maximum value).
     *
     * @example
     *    var randomNumber = mappet.random(10);
     *
     *    c.send(randomNumber);
     *
     * @param max number
     * @returns {@link number}
     */
    random(max: number): number
    /**
     * Generate a random number between the given min value and the given max value
     * (but not including the maximum value).
     *
     * @example
     *    var randomNumber = mappet.random(5, 10);
     *
     *    c.send(randomNumber);
     *
     * @param min number
     * @param max number
     * @returns {@link number}
     */
    random(min: number, max: number): number
    /**
     * Generate a random number between the given min value and the given max value
     * (but not including the maximum value) with given seed.
     *
     * @example
     *    var randomNumber = mappet.random(5, 10, 4141241);
     *
     *    c.send(randomNumber);
     *
     * @param min number
     * @param max number
     * @param seed number
     * @returns {@link number}
     */
    random(min: number, max: number, seed: number): number
    /**
     * Return Minecraft's formatting code.
     *
     * <p>Following colors are supported: black, dark_blue, dark_green, dark_aqua,
     * dark_red, dark_purple, gold, gray, dark_gray, blue, green, aqua, red,
     * light_purple, yellow, white</p>
     *
     * <p>Following styles are supported: obfuscated, bold, strikethrough, underline,
     * italic, reset.</p>
     *
     * @example
     *    var style = mappet.style("dark_blue", "bold", "underline");
     *
     *    c.send(style + "This text is in blue!");
     *
     * @param codes string
     * @returns {@link string}
     */
    style(codes: string): string
    /**
     * Return a mappet logger instance.
     *
     * @returns {@link IMappetLogger}
     */
    getLogger(): IMappetLogger
    /**
     * Return a mappet entity/player/npc by given minecraft entity.
     *
     * @example
     *    function main(c)
     *    {
     *        var s = c.getSubject();
     *        var minecraftPlayer = s.minecraftPlayer;
     *        var mappetPlayer = mappet.getMappetEntity(minecraftPlayer);
     *        c.send(mappetPlayer.name);
     *    }
     *
     * @param minecraftEntity Entity
     * @returns {@link IScriptEntity}
     */
    getMappetEntity(minecraftEntity: Entity): IScriptEntity
    /**
     * Create a ScriptVector.
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link ScriptVector}
     */
    vector(x: number, y: number, z: number): ScriptVector
    /**
     * Create an empty (0, 0) 2D vector.
     *
     * @returns {@link Vector2d}
     */
    vector2(): Vector2d
    /**
     * Create a 2D vector.
     *
     * @example
     *    var a = mappet.vector2(1, 0);
     *    var b = mappet.vector2(-1, 1);
     *
     *    a.normalize();
     *    b.normalize();
     *
     *    c.send("Dot product of a and b is: " + a.dot(b));
     *
     * @param x number
     * @param y number
     * @returns {@link Vector2d}
     */
    vector2(x: number, y: number): Vector2d
    /**
     * Copy a 2D vector.
     *
     * @example
     *    var a = mappet.vector2(25, 17);
     *    var b = mappet.vector2(a);
     *
     *    b.x += 40;
     *    b.y -= 5;
     *
     *    var d = mappet.vector2(b);
     *
     *    d.sub(a);
     *
     *    c.send("Distance between a and b is: " + d.length());
     *
     * @param v Vector2d
     * @returns {@link Vector2d}
     */
    vector2(v: Vector2d): Vector2d
    /**
     * Create an empty (0, 0, 0) 3D vector.
     *
     * @returns {@link Vector3d}
     */
    vector3(): Vector3d
    /**
     * Create a 3D vector.
     *
     * @example
     *    var look = c.getSubject().getLook();
     *    var a = mappet.vector3(look.x, look.y, look.z);
     *    var b = mappet.vector3(0, 0, 1);
     *
     *    a.normalize();
     *    b.normalize();
     *
     *    c.send("Dot product of entity's look vector and positive Z is: " + a.dot(b));
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link Vector3d}
     */
    vector3(x: number, y: number, z: number): Vector3d
    /**
     * Copy a 3D vector.
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *    var a = mappet.vector3(pos.x, pos.y, pos.z);
     *    var b = mappet.vector3(10, 4, 50);
     *
     *    var d = mappet.vector3(b);
     *
     *    d.sub(a);
     *
     *    c.send("Distance between you and point (10, 4, 50) is: " + d.length());
     *
     * @param v Vector3d
     * @returns {@link Vector3d}
     */
    vector3(v: Vector3d): Vector3d
    /**
     * Create a 4D vector.
     *
     * @returns {@link Vector4d}
     */
    vector4(): Vector4d
    /**
     * Create a 4D vector.
     *
     * @param x number
     * @param y number
     * @param z number
     * @param w number
     * @returns {@link Vector4d}
     */
    vector4(x: number, y: number, z: number, w: number): Vector4d
    /**
     * Copy a 4D vector.
     *
     * @param v Vector4d
     * @returns {@link Vector4d}
     */
    vector4(v: Vector4d): Vector4d
    /**
     * Create an identity 3x3 matrix.
     *
     * @example
     *    var v = mappet.vector3(0, 0, 1);
     *    var rotation = mappet.matrix3();
     *
     *    rotation.rotY(Math.PI / 2);
     *    rotation.transform(v);
     *
     *    c.send("Final point is: " + v);
     *
     * @returns {@link Matrix3d}
     */
    matrix3(): Matrix3d
    /**
     * Copy a 3x3 matrix.
     *
     * @param m Matrix3d
     * @returns {@link Matrix3d}
     */
    matrix3(m: Matrix3d): Matrix3d
    /**
     * Create an identity 4x4 matrix.
     *
     * @example
     *    var v = mappet.vector4(0, 0, 1, 1);
     *    var rotation = mappet.matrix4();
     *
     *    rotation.rotY(Math.PI / 2);
     *
     *    var translation = mappet.matrix4();
     *
     *    translation.setTranslation(mappet.vector3(0, 4, 0));
     *    rotation.mul(translation);
     *    rotation.transform(v);
     *
     *    c.send("Final point is: " + v.x + ", " + v.y + ", " + v.z);
     *
     * @returns {@link Matrix4d}
     */
    matrix4(): Matrix4d
    /**
     * Copy a 4x4 matrix.
     *
     * @param m Matrix4d
     * @returns {@link Matrix4d}
     */
    matrix4(m: Matrix4d): Matrix4d
    /**
     * Create a bounding box.
     *
     * @example
     *    function main(c)
     *    {
     *        var subject = c.getSubject();
     *        var subjectPosition = subject.getPosition();
     *        var box = mappet.box(-10, 4, -10, 10, 6, 10);
     *        if (box.contains(subjectPosition)){
     *            c.send("the player in in the box")
     *        }
     *    }
     *
     * @param minX number
     * @param minY number
     * @param minZ number
     * @param maxX number
     * @param maxY number
     * @param maxZ number
     * @returns {@link ScriptBox}
     */
    box(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): ScriptBox
    /**
     * Determines whether a point is located inside a bounding volume specified by two corners.
     * This method works with different vector types (2D, 3D, and 4D).
     *
     * @example
     *    var pos = c.getSubject().getPosition();
     *    var point = mappet.vector3(pos.x, pos.y, pos.z);
     *    var bound1 = mappet.vector3(0, 0, 0);
     *    var bound2 = mappet.vector3(10, 10, 10);
     *    var isInside = mappet.isPointInBounds(point, bound1, bound2);
     *    c.send("Is the point inside the bounding volume? " + isInside);
     *
     * @param point Object
     * @param bound1 Object
     * @param bound2 Object
     * @returns {@link boolean} - true if the point is inside the bounding volume, false otherwise.
     */
    isPointInBounds(point: Object, bound1: Object, bound2: Object): boolean
    /**
     * Converts an object to an INBTCompound representation.
     *
     * @param object Object
     * @returns {@link INBTCompound} - The INBTCompound representation of the object or null if the object is not of the expected types.
     */
    toNBT(object: Object): INBTCompound
    /**
     * Formates strings (placeholders).
     *
     * @example
     *    // Example:
     *    var name = "Steve";
     *    var age = 18;
     *    var message = mappet.format("Hello %s, you are %d years old!", name, age);
     *    c.send(message);
     *
     *    // You can also use the positional arguments:
     *    var s = c.getSubject();
     *    var pos = s.getPosition();
     *    var message = mappet.format("Hello %1$s, you are in x:%2$.2f, y:%3$.2f, z:%4$.2f!", s.getName(), pos.x, pos.y, pos.z);
     *    s.send(message);
     *
     * @param format string
     * @param args Object
     * @returns {@link string} - formatted string
     */
    format(format: string, args: Object): string
}

declare interface IScriptEvent {
    readonly script: string
    readonly function: string
    readonly subject: IScriptEntity
    readonly object: IScriptEntity
    readonly player: IScriptPlayer
    readonly NPC: IScriptNpc
    readonly world: IScriptWorld
    readonly server: IScriptServer
    readonly values: Map
    /**
     * Get script's ID to which this event was passed to.
     *
     * @returns {@link string}
     */
    getScript(): string
    /**
     * Get script's function name.
     *
     * @returns {@link string}
     */
    getFunction(): string
    /**
     * Get subject (primary) entity that was passed into the event.
     *
     * @returns {@link IScriptEntity}
     */
    getSubject(): IScriptEntity
    /**
     * Get object (secondary) entity that was passed into the event.
     *
     * @returns {@link IScriptEntity}
     */
    getObject(): IScriptEntity
    /**
     * Get the first player from either subject or object (or <code>null</code>, if there is no player).
     *
     * @returns {@link IScriptPlayer}
     */
    getPlayer(): IScriptPlayer
    /**
     * Get the first Mappet NPC from either subject or object (or <code>null</code>, if there is no NPC).
     *
     * @returns {@link IScriptNpc}
     */
    getNPC(): IScriptNpc
    /**
     * Get the world in which this event happened.
     *
     * @returns {@link IScriptWorld}
     */
    getWorld(): IScriptWorld
    /**
     * Get the server in which this event happened.
     *
     * @returns {@link IScriptServer}
     */
    getServer(): IScriptServer
    /**
     * Get a map of extra context values that was passed into the event.
     *
     * @returns {@link Map}
     */
    getValues(): Map
    /**
     * Get a value for given key (might be a <code>null</code>).
     *
     * @param key string
     * @returns {@link Object}
     */
    getValue(key: string): Object
    /**
     * Set a value for given key in extra data.
     *
     * @param key string
     * @param value Object
     * @returns {@link void}
     */
    setValue(key: string, value: Object): void
    /**
     * Cancel the trigger event.
     *
     * <p>Depending on the type of event, it can prevent the
     * default behavior (for example for chat trigger, if you cancel it, it won't
     * send the message into the chat).</p>
     *
     * @example
     *    // Assuming this script was attached to global trigger "On block placed,"
     *    // this script will cancel placing of the block by a player
     *    function main(c)
     *    {
     *        if (c.getValue("block") === "minecraft:stone")
     *        {
     *            c.cancel();
     *        }
     *    }
     *
     * @returns {@link void}
     */
    cancel(): void
    /**
     * Schedule execution of the same script (with same function)
     * given ticks forward.
     *
     * <p>Read {@link #scheduleScript(String, String, int)} for more information.</p>
     *
     * @example
     *    function main(c)
     *    {
     *        var states = c.getServer().getStates();
     *        var counter = states.getNumber("counter");
     *
     *        if (counter < 10)
     *        {
     *            c.send(counter + " Mississippi...");
     *            states.add("counter", 1);
     *
     *            c.scheduleScript(20);
     *        }
     *        else
     *        {
     *            states.reset("counter");
     *            c.send("Here I go!");
     *        }
     *    }
     *
     * @param delay number
     * @returns {@link void}
     */
    scheduleScript(delay: number): void
    /**
     * Schedule execution of the same script with given function
     * given ticks forward.
     *
     * <p>Read {@link #scheduleScript(String, String, int)} for more information.</p>
     *
     * @example
     *    function main(c)
     *    {
     *        // Schedule script execution of function other
     *        // within same script a second later
     *        c.scheduleScript("other", 20);
     *    }
     *
     *    function other(c)
     *    {
     *        c.send("A second ago, function \"main\" told me to say \"hi\" to you... :)")
     *    }
     *
     * @param function string
     * @param delay number
     * @returns {@link void}
     */
    scheduleScript(func: string, delay: number): void
    /**
     * Schedule execution of given script with specific function
     * given ticks forward.
     *
     * <p>When scheduling a script, it will use same data which were passed
     * into current script's function. I.e. subject, object, world, server
     * and values.</p>
     *
     * <p><b>ProTip</b>: if you put some values into this context using
     * {@link #setValue(String, Object)}, then that value will be also available
     * when the scheduled script will be executed.</p>
     *
     * @example
     *    // Script "a"
     *    function main(c)
     *    {
     *        // As ProTip states, you can pass some value using
     *        // setValue() and getValue() event's functions
     *        c.setValue("message", "Hello!");
     *
     *        // Schedule script "b" execution a second later
     *        c.scheduleScript("b", "main", 20);
     *    }
     *
     *    // Script "b"
     *    function main(c)
     *    {
     *        c.send("A second ago, script \"a\" told me deliver this message: " + c.getValue("message"));
     *    }
     *
     * @param script string
     * @param function string
     * @param delay number
     * @returns {@link void}
     */
    scheduleScript(script: string, func: string, delay: number): void
    /**
     * Schedule a JavaScript function (instead of script). Once the timer has expired,
     * given function will be called with this context as the only argument.
     *
     * @example
     *    function main(c)
     *    {
     *        c.scheduleScript(60, function (context)
     *        {
     *            context.send("This was called three seconds later!");
     *        });
     *    }
     *
     * @param delay number
     * @param function ScriptObjectMirror
     * @returns {@link void}
     */
    scheduleScript(delay: number, func: (c: IScriptEvent) => void): void
    /**
     * Schedule a function (instead of script). Once the timer has expired,
     * given function will be called with this context as the only argument.
     *
     * @param delay number
     * @param consumer function
     * @returns {@link void}
     */
    scheduleScript(delay: number, consumer: (c: IScriptEvent) => void): void
    /**
     * Execute a command.
     *
     * @example
     *    c.executeCommand("/kick Creeper501");
     *
     * @param command string
     * @returns {@link number} - How many successful commands were run. 0 - command errored, 1 - command was successful,
 2 or above - multiple commands were executed using target selectors.
     */
    executeCommand(command: string): number
    /**
     * Send a message to all players in the chat.
     *
     * @example
     *    c.send("Hi :)");
     *
     * @param message string
     * @returns {@link void}
     */
    send(message: string): void
}

declare interface IScriptItemStack {
    readonly minecraftItemStack: ItemStack
    readonly item: IScriptItem
    readonly maxCount: number
    count: number
    meta: number
    data: INBTCompound
    displayName: string
    readonly loreList: List<string>
    readonly canDestroyBlocks: List<string>
    readonly canPlaceOnBlocks: List<string>
    repairCost: number
    /**
     * Get Minecraft item stack instance. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @returns {@link ItemStack}
     */
    getMinecraftItemStack(): ItemStack
    /**
     * Whether this item is empty.
     *
     * @returns {@link boolean}
     */
    isEmpty(): boolean
    /**
     * Get item stack's item.
     *
     * @returns {@link IScriptItem}
     */
    getItem(): IScriptItem
    /**
     * Get a copy of item stack.
     *
     * @returns {@link IScriptItemStack}
     */
    copy(): IScriptItemStack
    /**
     * Get item stack's maximum size.
     *
     * @returns {@link number}
     */
    getMaxCount(): number
    /**
     * Get item stack's count.
     *
     * @returns {@link number}
     */
    getCount(): number
    /**
     * Set item stack's count.
     *
     * @param count number
     * @returns {@link void}
     */
    setCount(count: number): void
    /**
     * Get item stack's meta.
     *
     * @returns {@link number}
     */
    getMeta(): number
    /**
     * Set item stack's meta.
     *
     * @param meta number
     * @returns {@link void}
     */
    setMeta(meta: number): void
    /**
     * Check whether an item stack has an NBT compound tag.
     *
     * @returns {@link boolean}
     */
    hasData(): boolean
    /**
     * Get item stack's NBT compound tag.
     *
     * @returns {@link INBTCompound}
     */
    getData(): INBTCompound
    /**
     * Replace item stack's NBT compound tag.
     *
     * @param tag INBTCompound
     * @returns {@link void}
     */
    setData(tag: INBTCompound): void
    /**
     * Serialize item stack to an NBT compound.
     *
     * @returns {@link INBTCompound}
     */
    serialize(): INBTCompound
    /**
     * Get display name of the item stack.
     *
     * @returns {@link string}
     */
    getDisplayName(): string
    /**
     * Set display name of the item stack.
     *
     * @param name string
     * @returns {@link void}
     */
    setDisplayName(name: string): void
    /**
     * Get lore of the item stack.
     *
     * @param index number
     * @returns {@link string}
     */
    getLore(index: number): string
    /**
     * Get all lore lines of the item stack as a list.
     *
     * @returns {@link List}
     */
    getLoreList(): List<string>
    /**
     * Set lore of the item stack.
     *
     * @param index number
     * @param lore string
     * @returns {@link void}
     */
    setLore(index: number, lore: string): void
    /**
     * Add a lore line to the item stack.
     *
     * @param lore string
     * @returns {@link void}
     */
    addLore(lore: string): void
    /**
     * Remove all lore lines from the item stack.
     *
     * @returns {@link void}
     */
    clearAllLores(): void
    /**
     * Remove a lore line from the item stack.
     *
     * @param index number
     * @returns {@link void}
     */
    clearLore(index: number): void
    /**
     * Clear all enchantments from the item stack.
     *
     * @returns {@link void}
     */
    clearAllEnchantments(): void
    /**
     * Get a list of all blocks the item stack can destroy.
     *
     * @returns {@link List}
     */
    getCanDestroyBlocks(): List<string>
    /**
     * Add a block that the item stack can destroy.
     *
     * @param block string
     * @returns {@link void}
     */
    addCanDestroyBlock(block: string): void
    /**
     * Clear all blocks that the item stack can destroy.
     *
     * @returns {@link void}
     */
    clearAllCanDestroyBlocks(): void
    /**
     * Clear a block that the item stack can destroy.
     *
     * @param block string
     * @returns {@link void}
     */
    clearCanDestroyBlock(block: string): void
    /**
     * Get a list of all blocks the item stack can place on.
     *
     * @returns {@link List}
     */
    getCanPlaceOnBlocks(): List<string>
    /**
     * Add a block that the item stack can place on.
     *
     * @param block string
     * @returns {@link void}
     */
    addCanPlaceOnBlock(block: string): void
    /**
     * Clear all blocks that the item stack can place on.
     *
     * @returns {@link void}
     */
    clearAllCanPlaceOnBlocks(): void
    /**
     * Clear a block that the item stack can place on.
     *
     * @param block string
     * @returns {@link void}
     */
    clearCanPlaceOnBlock(block: string): void
    /**
     * Get repair cost of the item stack.
     *
     * @returns {@link number}
     */
    getRepairCost(): number
    /**
     * Set repair cost of the item stack.
     *
     * @param cost number
     * @returns {@link void}
     */
    setRepairCost(cost: number): void
    /**
     * Check if an item stack is unbreakable.
     *
     * @returns {@link boolean}
     */
    isUnbreakable(): boolean
    /**
     * Set whether an item stack is unbreakable or not.
     *
     * @param unbreakable boolean
     * @returns {@link void}
     */
    setUnbreakable(unbreakable: boolean): void
    /**
     * Add/remove more items to the stack.
     *
     * @param amount number
     * @returns {@link void}
     */
    add(amount: number): void
    /**
     * Check if this item stack is equal to another item stack.
     *
     * @param other ScriptItemStack
     * @returns {@link boolean}
     */
    equals(other: IScriptItemStack): boolean
}

declare interface IScriptItem {
    readonly minecraftItem: Item
    readonly id: string
    /**
     * Get Minecraft item instance. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @returns {@link Item}
     */
    getMinecraftItem(): Item
    /**
     * Get item's ID like "minecraft:stick" or "minecraft:diamond_hoe"
     *
     * @returns {@link string}
     */
    getId(): string
    /**
     * Check whether given item is same as this one
     *
     * @param item IScriptItem
     * @returns {@link boolean}
     */
    isSame(item: IScriptItem): boolean
}

declare interface IScriptInventory {
    readonly minecraftInventory: IInventory
    name: string
    /**
     * Get Minecraft inventory instance. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @returns {@link IInventory}
     */
    getMinecraftInventory(): IInventory
    /**
     * Check whether this inventory is empty.
     *
     * @returns {@link boolean}
     */
    isEmpty(): boolean
    /**
     * Return the maximum amount of item stacks in this inventory.
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    var inventory = c.getSubject().getInventory();
     *    var item = mappet.createItem("minecraft:stick");
     *
     *    for (var i = 0; i < inventory.size(); i++)
     *    {
     *        // We do a little bit of trolling
     *        inventory.setStack(i, item);
     *    }
     *
     * @returns {@link number}
     */
    size(): number
    /**
     * Get stack in slot at given index.
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    var inventory = c.getSubject().getInventory();
     *    var first = inventory.getStack(0);
     *
     *    if (first.isEmpty())
     *    {
     *        // Give a stick into first player's hotbar slot
     *        inventory.setStack(0, mappet.createItem("minecraft:stick"));
     *    }
     *
     * @param index number
     * @returns {@link IScriptItemStack} - an item stack at given index
     */
    getStack(index: number): IScriptItemStack
    /**
     * Remove a stack at given index
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    var inventory = c.getSubject().getInventory();
     *    var first = inventory.removeStack(0);
     *
     *    if (first.isEmpty())
     *    {
     *        c.getSubject().send("Oh... you had nothing...");
     *    }
     *    else
     *    {
     *        c.getSubject().send("Ha-ha, I stole your " + first.getItem().getId());
     *    }
     *
     * @param index number
     * @returns {@link IScriptItemStack} - removed item stack
     */
    removeStack(index: number): IScriptItemStack
    /**
     * Replace given stack at index.
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    var inventory = c.getSubject().getInventory();
     *
     *    inventory.setStack(4, mappet.createItem("minecraft:diamond_sword"));
     *
     * @param index number
     * @param stack IScriptItemStack
     * @returns {@link void}
     */
    setStack(index: number, stack: IScriptItemStack): void
    /**
     * Empty the inventory.
     *
     * @example
     *    // Assuming that c.getSubject() is a player
     *    c.getSubject().getInventory().clear();
     *
     * @returns {@link void}
     */
    clear(): void
    /**
     * Get basic inventory's name. This works only for inventories that support
     * naming, like chests.
     *
     * @returns {@link string}
     */
    getName(): string
    /**
     * Whether this inventory has a name. This works only for inventories that
     * support naming, like chests.
     *
     * @returns {@link boolean}
     */
    hasCustomName(): boolean
    /**
     * Set basic inventory's name. This works only for inventories that
     * support naming, like chests.
     *
     * @param name string
     * @returns {@link void}
     */
    setName(name: string): void
}

declare interface IMappetLogger {
    /**
     * Logging a message with <b>ERROR</b> level.
     *
     * @param message string
     * @returns {@link void}
     */
    error(message: string): void
    /**
     * Logging a message with <b>WARNING</b> level.
     *
     * @param message string
     * @returns {@link void}
     */
    warning(message: string): void
    /**
     * Logging a message with <b>INFO</b> level.
     *
     * @param message string
     * @returns {@link void}
     */
    info(message: string): void
    /**
     * Logging a message with <b>DEBUG</b> level.
     *
     * @param message string
     * @returns {@link void}
     */
    debug(message: string): void
}

declare interface IMappetUIContext {
    readonly data: INBTCompound
    readonly last: string
    readonly hotkey: string
    readonly context: string
    /**
     * Get the NBT compound of the UI data.
     *
     * <p>This data is formed by the UI components that have ID. The data will
     * be populated only when the UI elements will actually change their values.
     * Until then this data will be empty.</p>
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI(c, "handler").background();
     *        var name = ui.textbox().id("name");
     *        var lastname = ui.textbox().id("lastname");
     *
     *        // Place two text fields in the middle of the screen
     *        name.rxy(0.5, 0.5).wh(140, 20).anchor(0.5);
     *        lastname.rx(0.5).ry(0.5, 25).wh(140, 20).anchor(0.5);
     *
     *        c.getSubject().openUI(ui);
     *    }
     *
     *    function handler(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *
     *        // If the user will input first in the name text box, the data
     *        // will be just {name:"John"}. If the user will input first
     *        // the lastname, then the data will be {lastname:"Appleseed"}.
     *        // Once both fields will be edited, you'll get:
     *        // {name:"John",lastname:"Appleseed"}
     *        c.send(uiContext.getData().stringify());
     *    }
     *
     * @returns {@link INBTCompound}
     */
    getData(): INBTCompound
    /**
     * Returns whether the UI was just closed.
     *
     * <p>The return value is <code>true</code> only when the user closed the
     * screen, and the UI context is about to get cleared from the player.</p>
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI(c, "handler").background();
     *        var button = ui.button("Push me").id("button");
     *
     *        // Place a button in the middle of the screen
     *        button.rxy(0.5, 0.5).wh(80, 20).anchor(0.5);
     *        c.getSubject().openUI(ui);
     *    }
     *
     *    function handler(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *
     *        // Check if the user closed the screen
     *        if (uiContext.isClosed())
     *        {
     *            // Do something with the data
     *            c.getSubject().send("Welcome back to the world!");
     *        }
     *    }
     *
     * @returns {@link boolean}
     */
    isClosed(): boolean
    /**
     * Get the ID of last edited UI component.
     *
     * <p>If there were multiple UI elements were changed (see {@link UIComponent#updateDelay(int)}),
     * then only the last one will be provided.</p>
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI(c, "handler").background();
     *        var title = ui.label("...").id("title");
     *        var name = ui.textbox().id("name");
     *        var lastname = ui.textbox().id("lastname");
     *
     *        // Place two text fields in the middle of the screen
     *        name.rxy(0.5, 0.5).wh(140, 20).anchor(0.5);
     *        lastname.rx(0.5).ry(0.5, 25).wh(140, 20).anchor(0.5);
     *        title.rx(0.5).y(20).wh(140, 20).anchorX(0.5);
     *        title.labelAnchor(0.5, 0.5);
     *
     *        c.getSubject().openUI(ui);
     *    }
     *
     *    function handler(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *        var last = uiContext.getLast();
     *
     *        // Depending on the last value, update the title accordingly
     *        if (last === "name")
     *        {
     *            uiContext.get("title").label("Name: " + uiContext.getData().getString("name"));
     *        }
     *        else if (last === "lastname")
     *        {
     *            uiContext.get("title").label("Last name: " + uiContext.getData().getString("lastname"));
     *        }
     *    }
     *
     * @returns {@link string}
     */
    getLast(): string
    /**
     * Get the ID of the last pressed hot key.
     *
     * <p>If no keybind was pressed, it will be an empty string (<code>""</code>).
     * See {@link UIComponent#keybind(int, String, String, boolean, boolean, boolean)} method
     * for an example.</p>
     *
     * @returns {@link string}
     */
    getHotkey(): string
    /**
     * Get the ID of the last context menu item.
     *
     * <p>If no context menu was activated, it will be an empty string (<code>""</code>).
     * See {@link UIComponent#context(String, String, String, int)} method for an example.</p>
     *
     * @returns {@link string}
     */
    getContext(): string
    /**
     * Returns a UI component by given ID or <code>null</code>. You can use this
     * in the handler script of the UI to change certain properties.
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI(c, "handler").background();
     *        var button = ui.button("Push me").id("button");
     *
     *        // Place a button in the middle of the screen
     *        button.rxy(0.5, 0.5).wh(80, 20).anchor(0.5);
     *        c.getSubject().openUI(ui);
     *    }
     *
     *    function handler(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *
     *        if (uiContext.getLast() === "button")
     *        {
     *            uiContext.get("button").label("Push me harder!");
     *        }
     *    }
     *
     * @param id string
     * @returns {@link UIComponent}
     */
    get(id: string): UIComponent
    /**
     * Sends UI changes to the player.
     *
     * <p>If you edited the UI context's component data using {@link IMappetUIContext#get(String)}
     * outside of the UI handler script (UI context, after executing the handler script, sends the
     * changed data afterwards automatically), you need to manually send the data to the player
     * using this function.</p>
     *
     * @example
     *    // ui.js
     *    function main(c)
     *    {
     *        var ui = mappet.createUI().background();
     *        var button = ui.button("Push me").id("button");
     *
     *        // Place a button in the middle of the screen
     *        button.rxy(0.5, 0.5).wh(80, 20).anchor(0.5);
     *        c.getSubject().openUI(ui);
     *    }
     *
     *    // other.js
     *    function main(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *
     *        // Assuming that UI context is still present (i.e. the UI is still open)
     *        if (uiContext)
     *        {
     *            uiContext.get("button").label("Too late!");
     *            uiContext.sendToPlayer();
     *        }
     *    }
     *
     * @returns {@link void}
     */
    sendToPlayer(): void
}

declare interface IMappetUIBuilder {
    readonly current: UILayoutComponent
    /**
     * Get current UI component on to which it adds children components.
     *
     * <p>It's useful only after using {@link IMappetUIBuilder#layout()},
     * {@link IMappetUIBuilder#column(int)}, {@link IMappetUIBuilder#row(int)}, and
     * {@link IMappetUIBuilder#grid(int)} to being able to position layout element.</p>
     *
     * @returns {@link UIComponent}
     */
    getCurrent(): UILayoutComponent
    /**
     * Enable default background (subtle gradient of two half transparent dark colors).
     *
     * @returns {@link IMappetUIBuilder}
     */
    background(): IMappetUIBuilder
    /**
     * Disable an ability for players to manually close opened screens built with an API
     * by pressing escape.
     *
     * <p><b>BEWARE</b>: players will get stuck if you won't provide a way to close your
     * custom UI manually. ProTip: use {@link IScriptPlayer#closeUI()} to close player's
     * screen.</p>
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI(c, "handler").notClosable().background();
     *        var close = ui.icon("close").id("exit");
     *
     *        ui.text("[oTo close this screen, gently click on the button in the top right corner...").rxy(0.5, 0.5).w(200).anchor(0.5);
     *
     *        close.rx(1, -25).y(5).wh(20, 20);
     *        c.getSubject().openUI(ui);
     *    }
     *
     *    function handler(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *
     *        if (uiContext.getLast() === "exit")
     *        {
     *            c.getSubject().closeUI();
     *        }
     *    }
     *
     * @returns {@link IMappetUIBuilder}
     */
    notClosable(): IMappetUIBuilder
    /**
     * Toggle closability of this UI screen.
     *
     * @param closable boolean
     * @returns {@link IMappetUIBuilder}
     */
    closable(closable: boolean): IMappetUIBuilder
    /**
     * Toggle pausing of this UI screen.
     *
     * @param paused boolean
     * @returns {@link IMappetUIBuilder}
     */
    paused(paused: boolean): IMappetUIBuilder
    /**
     * Create and insert a UI component based on its ID into UI being built by this builder.
     *
     * <p>This method is future proof for in case other modders will be adding their own
     * components, and the only way to create 3rd party UI components is using this method by
     * providing the ID of 3rd party UI component.</p>
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI().background();
     *        var label = ui.create("label").label("Welcome, [l" + c.getSubject().getName() + "[r!");
     *
     *        label.rxy(0.5, 0.5).wh(100, 20).anchor(0.5);
     *        label.color(0x00ee22).background(0x88000000).labelAnchor(0.5);
     *
     *        c.getSubject().openUI(ui);
     *    }
     *
     * @param id string
     * @returns {@link UIComponent}
     */
    create(id: string): UIComponent
    /**
     * Create and insert a graphics UI component into UI being built by this builder.
     *
     * <p>Check {@link UIGraphicsComponent} for description and examples.</p>
     *
     * @returns {@link UIGraphicsComponent}
     */
    graphics(): UIGraphicsComponent
    /**
     * Create and insert a button UI component into UI being built by this builder.
     *
     * <p>Check {@link UIButtonComponent} for description and examples.</p>
     *
     * @param label string
     * @returns {@link UIButtonComponent}
     */
    button(label: string): UIButtonComponent
    /**
     * Create and insert an icon button UI component into UI being built by this builder.
     *
     * <p>Check {@link UIIconButtonComponent} for description and examples.</p>
     *
     * @param icon string
     * @returns {@link UIIconButtonComponent}
     */
    icon(icon: string): UIIconButtonComponent
    /**
     * Create and insert a label UI component into UI being built by this builder.
     *
     * <p>Check {@link UILabelComponent} for description and examples.</p>
     *
     * @param label string
     * @returns {@link UILabelComponent}
     */
    label(label: string): UILabelComponent
    /**
     * Create and insert a text UI component into UI being built by this builder.
     *
     * <p>Check {@link UILabelComponent} for description and examples.</p>
     *
     * @param text string
     * @returns {@link UITextComponent}
     */
    text(text: string): UITextComponent
    /**
     * Create and insert a textbox UI component into UI being built by this builder.
     *
     * <p>Check {@link UITextboxComponent} for description and examples.</p>
     *
     * @returns {@link UITextboxComponent}
     */
    textbox(): UITextboxComponent
    /**
     * Create and insert a textbox UI component into UI, with default value filled,
     * being built by this builder.
     *
     * <p>Check {@link UITextboxComponent} for description and examples.</p>
     *
     * @param text string
     * @returns {@link UITextboxComponent}
     */
    textbox(text: string): UITextboxComponent
    /**
     * Create and insert a textbox UI component into UI, with default value filled
     * and maximum length, being built by this builder.
     *
     * <p>Check {@link UITextboxComponent} for description and examples.</p>
     *
     * @param text string
     * @param maxLength number
     * @returns {@link UITextboxComponent}
     */
    textbox(text: string, maxLength: number): UITextboxComponent
    /**
     * Create and insert a textarea UI component into UI being built by this builder.
     *
     * <p>Check {@link UITextareaComponent} for description and examples.</p>
     *
     * @returns {@link UITextareaComponent}
     */
    textarea(): UITextareaComponent
    /**
     * Create and insert a textarea UI component into UI, with default value filled,
     * being built by this builder.
     *
     * <p>Check {@link UITextareaComponent} for description and examples.</p>
     *
     * @param text string
     * @returns {@link UITextareaComponent}
     */
    textarea(text: string): UITextareaComponent
    /**
     * Create and insert a toggle UI component into UI being built by this builder.
     *
     * <p>Check {@link UIToggleComponent} for description and examples.</p>
     *
     * @param label string
     * @returns {@link UIToggleComponent}
     */
    toggle(label: string): UIToggleComponent
    /**
     * Create and insert a toggle UI component into UI, with default toggled state,
     * being built by this builder.
     *
     * <p>Check {@link UIToggleComponent} for description and examples.</p>
     *
     * @param label string
     * @param state boolean
     * @returns {@link UIToggleComponent}
     */
    toggle(label: string, state: boolean): UIToggleComponent
    /**
     * Create and insert a trackpad UI component into UI being built by this builder.
     *
     * <p>Check {@link UITrackpadComponent} for description and examples.</p>
     *
     * @returns {@link UITrackpadComponent}
     */
    trackpad(): UITrackpadComponent
    /**
     * Create and insert a trackpad UI component into UI, with default filled value,
     * being built by this builder.
     *
     * <p>Check {@link UITrackpadComponent} for description and examples.</p>
     *
     * @param value number
     * @returns {@link UITrackpadComponent}
     */
    trackpad(value: number): UITrackpadComponent
    /**
     * Create and insert a string list UI component into UI, with list of possible
     * values in the list, being built by this builder.
     *
     * <p>Check {@link UIStringListComponent} for description and examples.</p>
     *
     * @param values List
     * @returns {@link UIStringListComponent}
     */
    stringList(values: string[]): UIStringListComponent
    /**
     * Create and insert a string list UI component into UI, with list of possible
     * values in the list and selected index by default, being built by this builder.
     *
     * <p>Check {@link UIStringListComponent} for description and examples.</p>
     *
     * @param values List
     * @param selected number
     * @returns {@link UIStringListComponent}
     */
    stringList(values: string[], selected: number): UIStringListComponent
    /**
     * Create and insert an item stack UI component into UI being built by this builder.
     *
     * <p>Check {@link UIStackComponent} for description and examples.</p>
     *
     * @returns {@link UIStackComponent}
     */
    item(): UIStackComponent
    /**
     * Create and insert an item stack UI component into UI, with default item stack
     * picked, being built by this builder.
     *
     * <p>Check {@link UIStackComponent} for description and examples.</p>
     *
     * @param stack IScriptItemStack
     * @returns {@link UIStackComponent}
     */
    item(stack: IScriptItemStack): UIStackComponent
    /**
     * Create and insert a morph UI component into UI being built by this builder.
     *
     * <p>Check {@link UIMorphComponent} for description and examples.</p>
     *
     * @param morph AbstractMorph
     * @returns {@link UIMorphComponent}
     */
    morph(morph: AbstractMorph): UIMorphComponent
    /**
     * Create and insert a morph UI component into UI, with a flag whether the player
     * can pick or edit the morph, being built by this builder.
     *
     * <p>Check {@link UIMorphComponent} for description and examples.</p>
     *
     * @param morph AbstractMorph
     * @param editing boolean
     * @returns {@link UIMorphComponent}
     */
    morph(morph: AbstractMorph, editing: boolean): UIMorphComponent
    /**
     * Create and insert a click area UI component into UI being built by this builder.
     *
     * <p>Check {@link UIClickComponent} for description and examples.</p>
     *
     * @returns {@link UIClickComponent}
     */
    click(): UIClickComponent
    /**
     * Create and insert a layout UI component into UI being built by this builder.
     *
     * <p>Check {@link UILayoutComponent} for description and examples.</p>
     *
     * @returns {@link IMappetUIBuilder}
     */
    layout(): IMappetUIBuilder
    /**
     * Create and insert a column layout UI component into UI being built by this builder.
     *
     * <p>Check {@link UILayoutComponent} for description and examples.</p>
     *
     * @param margin number
     * @returns {@link IMappetUIBuilder}
     */
    column(margin: number): IMappetUIBuilder
    /**
     * Create and insert a column layout UI component into UI being built by this builder.
     *
     * <p>Check {@link UILayoutComponent} for description and examples.</p>
     *
     * @param margin number
     * @param padding number
     * @returns {@link IMappetUIBuilder}
     */
    column(margin: number, padding: number): IMappetUIBuilder
    /**
     * Create and insert a row layout UI component into UI being built by this builder.
     *
     * <p>Check {@link UILayoutComponent} for description and examples.</p>
     *
     * @param margin number
     * @returns {@link IMappetUIBuilder}
     */
    row(margin: number): IMappetUIBuilder
    /**
     * Create and insert a row layout UI component into UI being built by this builder.
     *
     * <p>Check {@link UILayoutComponent} for description and examples.</p>
     *
     * @param margin number
     * @param padding number
     * @returns {@link IMappetUIBuilder}
     */
    row(margin: number, padding: number): IMappetUIBuilder
    /**
     * Create and insert a grid layout UI component into UI being built by this builder.
     *
     * <p>Check {@link UILayoutComponent} for description and examples.</p>
     *
     * @param margin number
     * @returns {@link IMappetUIBuilder}
     */
    grid(margin: number): IMappetUIBuilder
    /**
     * Create and insert a grid layout UI component into UI being built by this builder.
     *
     * <p>Check {@link UILayoutComponent} for description and examples.</p>
     *
     * @param margin number
     * @param padding number
     * @returns {@link IMappetUIBuilder}
     */
    grid(margin: number, padding: number): IMappetUIBuilder
}

declare interface IMappetStates {
    /**
     * Add some value to existing state by ID.
     *
     * @example
     *    var states = c.getServer().getStates();
     *
     *    states.add("total_spending", 20);
     *    c.send("Total spending is now " + states.getNumber("total_spending"));
     *
     * @param id string
     * @param value number
     * @returns {@link number} - original value plus the provided value
     */
    add(id: string, value: number): number
    /**
     * Set numeric value to existing state by ID.
     *
     * @example
     *    var states = c.getServer().getStates();
     *
     *    states.setNumber("total_spending", 1000000001);
     *    c.send("Total spending is now " + states.getNumber("total_spending"));
     *
     * @param id string
     * @param value number
     * @returns {@link void}
     */
    setNumber(id: string, value: number): void
    /**
     * Set string value to existing state by ID.
     *
     * @example
     *    var states = c.getSubject().getStates();
     *
     *    states.setString("name", "Jeff");
     *    c.getSubject().send("Your name is " + states.getString("name"));
     *
     * @param id string
     * @param value string
     * @returns {@link void}
     */
    setString(id: string, value: string): void
    /**
     * Get a numeric value of a state by given ID.
     *
     * @example
     *    var states = c.getServer().getStates();
     *
     *    c.send("Total spending is " + states.getNumber("total_spending"));
     *
     * @param id string
     * @returns {@link number} - state value, or 0 if no state found
     */
    getNumber(id: string): number
    /**
     * Check if a state instance of number.
     *
     * @example
     *    var states = c.getServer().getStates();
     *
     *    c.send("State is number: " + states.isNumber("state_number"));
     *
     * @param id string
     * @returns {@link boolean}
     */
    isNumber(id: string): boolean
    /**
     * Get a string value of a state by given ID.
     *
     * @example
     *    var states = c.getSubject().getStates();
     *
     *    c.send("Your RPG class is: " + states.getString("class"));
     *
     * @param id string
     * @returns {@link string} - state value, or empty string if no state found
     */
    getString(id: string): string
    /**
     * Check if a state instance of string.
     *
     * @example
     *    var states = c.getServer().getStates();
     *
     *    c.send("State is string: " + states.isString("state_string"));
     *
     * @param id string
     * @returns {@link boolean}
     */
    isString(id: string): boolean
    /**
     * Removes a state by given ID.
     *
     * @example
     *    var states = c.getServer().getStates();
     *
     *    // The city has been defaulted
     *    states.reset("total_spendings");
     *
     * @param id string
     * @returns {@link void}
     */
    reset(id: string): void
    /**
     * Removes multiple states by using mask.
     *
     * @example
     *    var states = c.getServer().getStates();
     *
     *    // Remove all states that start with "regions."
     *    states.resetMasked("regions.*");
     *
     * @param id string
     * @returns {@link void}
     */
    resetMasked(id: string): void
    /**
     * Remove all states.
     *
     * @example
     *    var states = c.getServer().getStates();
     *
     *    // Game over
     *    states.clear();
     *
     * @returns {@link void}
     */
    clear(): void
    /**
     * Check whether state by given ID exists.
     *
     * @example
     *    var states = c.getSubject().getStates();
     *    var name = states.has("name") ? states.getString("name") : "Jeff";
     *
     *    c.getSubject().send("Your name is " + name);
     *
     * @param id string
     * @returns {@link boolean}
     */
    has(id: string): boolean
    /**
     * Get IDs of all states.
     *
     * @example
     *    var states = c.getSubject().getStates().keys();
     *
     *    for each (var key in states)
     *    {
     *        c.send("Server has state: " + key);
     *    }
     *
     * @returns {@link Set}
     */
    keys(): Set<string>
}

declare interface IMappetSchematic {
    /**
     * Uses to copy blocks from world to schematic.
     *
     * @example
     *    function main(c)
     *    {
     *        var schematic = c.world.createSchematic();
     *        schematic.loadFromWorld(0, 4, 0, 4, 8, 4).saveToFile("mySchematic").place(0, 4, 4).place(0, 4, 8);
     *    }
     *
     * @param x1 number
     * @param y1 number
     * @param z1 number
     * @param x2 number
     * @param y2 number
     * @param z2 number
     * @returns {@link IMappetSchematic}
     */
    loadFromWorld(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): IMappetSchematic
    /**
     * Places schematic's blocks into the world.
     *
     * @example
     *    function main(c)
     *    {
     *         var schematic = c.world.createSchematic();
     *         schematic.loadFromFile("myTestSchematic").place(0, 0, 0, true, true);
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @param replaceBlocks boolean
     * @param placeAir boolean
     * @returns {@link IMappetSchematic}
     */
    place(x: number, y: number, z: number, replaceBlocks: boolean, placeAir: boolean): IMappetSchematic
    /**
     * Places schematic's blocks into the world.
     *
     * @example
     *    function main(c)
     *    {
     *         var schematic = c.world.createSchematic();
     *         schematic.loadFromFile("myTestSchematic").place(0, 0, 0, true);
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @param replaceBlocks boolean
     * @returns {@link IMappetSchematic}
     */
    place(x: number, y: number, z: number, replaceBlocks: boolean): IMappetSchematic
    /**
     * Places schematic's blocks into the world.
     *
     * @example
     *    function main(c)
     *    {
     *         var schematic = c.world.createSchematic();
     *         schematic.loadFromFile("myTestSchematic").place(0, 0, 0);
     *    }
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link IMappetSchematic}
     */
    place(x: number, y: number, z: number): IMappetSchematic
    /**
     * Uses to save schematic.
     *
     * @example
     *    function main(c)
     *    {
     *        var schematic = c.world.createSchematic();
     *        schematic.loadFromWorld(0, 4, 0, 4, 8, 4).saveToFile("mySchematic");
     *    }
     *
     * @param name string
     * @returns {@link IMappetSchematic}
     */
    saveToFile(name: string): IMappetSchematic
    /**
     * Uses to get schematic from file.
     *
     * @example
     *    function main(c)
     *    {
     *        var schematic = c.world.createSchematic();
     *        schematic.loadFromFile("mySchematic").place(0, 4, 4);
     *    }
     *
     * @param name string
     * @returns {@link IMappetSchematic}
     */
    loadFromFile(name: string): IMappetSchematic
}

declare interface IMappetQuests {
    readonly ids: Set<string>
    /**
     * Check whether these quests have a quest by given ID.
     *
     * @example
     *    if (c.getSubject().getQuests().has("important_quest"))
     *    {
     *        // � is section symbol
     *        c.getSubject().send("You can't do this until you finish �6Important quest�r!");
     *    }
     *
     * @param id string
     * @returns {@link boolean}
     */
    has(id: string): boolean
    /**
     * Add a quest into these quests by given ID.
     *
     * @example
     *    if (c.getSubject().getQuests().add("important_quest"))
     *    {
     *        c.getSubject().send("Check your quests!");
     *    }
     *    else
     *    {
     *        c.getSubject().send("You already have this quest, huh...");
     *    }
     *
     * @param id string
     * @returns {@link boolean} - <code>true</code> if a quest was successfully added, <code>false</code> if
 player has already this quest, or if the quest doesn't exist.
     */
    add(id: string): boolean
    /**
     * Check whether a quest by given ID can be completed.
     *
     * @example
     *    if (c.getSubject().getQuests().isComplete("important_quest"))
     *    {
     *        c.getSubject().send("I think you should bring this quest back to Steve!");
     *    }
     *
     * @param id string
     * @returns {@link boolean}
     */
    isComplete(id: string): boolean
    /**
     * Complete (and reward) the quest in these quests by given ID.
     *
     * @example
     *    if (c.getSubject().getQuests().complete("important_quest"))
     *    {
     *        c.getSubject().send("Important quest was successfully completed!");
     *    }
     *    else
     *    {
     *        c.getSubject().send("Finish your objectives first...");
     *    }
     *
     * @param id string
     * @returns {@link boolean} - <code>true</code> if player was rewarded and quest was removed from the
 quests list, <code>false</code> if the quest by given ID isn't present.
     */
    complete(id: string): boolean
    /**
     * Remove the quest from these quests by given ID.
     *
     * @example
     *    if (c.getSubject().getQuests().decline("important_quest"))
     *    {
     *        c.getSubject().send("You failed the objective... you'll need to retake quest  !");
     *    }
     *
     * @param id string
     * @returns {@link boolean} - <code>true</code> if the quest was removed, <code>false</code> if the
 quest wasn't even present in these quests.
     */
    decline(id: string): boolean
    /**
     * Get all present quests' IDs.
     *
     * @example
     *    var quests = c.getSubject().getQuests();
     *    var ids = quests.getIds();
     *    var completedAll = true;
     *
     *    for each (var id in ids)
     *    {
     *        if (!quests.isComplete(id))
     *        {
     *            completedAll = false;
     *
     *            break;
     *        }
     *    }
     *
     *    if (completedAll)
     *    {
     *        c.getSubject().send("You need to complete all before you can do this...");
     *    }
     *
     * @returns {@link Set}
     */
    getIds(): Set<string>
}

declare interface INBTList extends INBT {
    readonly NBTTagList: NBTTagList
    /**
     * Get raw NBT tag list. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @returns {@link NBTTagList}
     */
    getNBTTagList(): NBTTagList
    /**
     * Check whether this list has an element at given index (instead of
     * checking manually for index to be within 0..size-1 range)
     *
     * @param index number
     * @returns {@link boolean}
     */
    has(index: number): boolean
    /**
     * Remove an element at given index
     *
     * @param index number
     * @returns {@link void}
     */
    remove(index: number): void
    /**
     * Get byte (8-bit integer) value at given index
     *
     * @param index number
     * @returns {@link number}
     */
    getByte(index: number): number
    /**
     * Set byte (8-bit integer) value at given index
     *
     * @param index number
     * @param value number
     * @returns {@link void}
     */
    setByte(index: number, value: number): void
    /**
     * Add byte (8-bit integer) value at the end of the list
     *
     * @param value number
     * @returns {@link void}
     */
    addByte(value: number): void
    /**
     * Get short (16-bit integer) value at given index
     *
     * @param index number
     * @returns {@link number}
     */
    getShort(index: number): number
    /**
     * Set short (16-bit integer) value at given index
     *
     * @param index number
     * @param value number
     * @returns {@link void}
     */
    setShort(index: number, value: number): void
    /**
     * Add short (16-bit integer) value at the end of the list
     *
     * @param value number
     * @returns {@link void}
     */
    addShort(value: number): void
    /**
     * Get integer (32-bit integer) value at given index
     *
     * @param index number
     * @returns {@link number}
     */
    getInt(index: number): number
    /**
     * Set integer (32-bit integer) value at given index
     *
     * @param index number
     * @param value number
     * @returns {@link void}
     */
    setInt(index: number, value: number): void
    /**
     * Add integer (32-bit integer) value at the end of the list
     *
     * @param value number
     * @returns {@link void}
     */
    addInt(value: number): void
    /**
     * Get long (64-bit integer) value at given index
     *
     * @param index number
     * @returns {@link number}
     */
    getLong(index: number): number
    /**
     * Set long (64-bit integer) value at given index
     *
     * @param index number
     * @param value number
     * @returns {@link void}
     */
    setLong(index: number, value: number): void
    /**
     * Add long (64-bit integer) value at the end of the list
     *
     * @param value number
     * @returns {@link void}
     */
    addLong(value: number): void
    /**
     * Get float (32-bit floating point number) value at given index
     *
     * @param index number
     * @returns {@link number}
     */
    getFloat(index: number): number
    /**
     * Set float (32-bit floating point number) value at given index
     *
     * @param index number
     * @param value number
     * @returns {@link void}
     */
    setFloat(index: number, value: number): void
    /**
     * Add float (32-bit floating point number) value at the end of the list
     *
     * @param value number
     * @returns {@link void}
     */
    addFloat(value: number): void
    /**
     * Get double (64-bit floating point number) value at given index
     *
     * @param index number
     * @returns {@link number}
     */
    getDouble(index: number): number
    /**
     * Set double (64-bit floating point number) value at given index
     *
     * @param index number
     * @param value number
     * @returns {@link void}
     */
    setDouble(index: number, value: number): void
    /**
     * Add double (64-bit floating point number) value at the end of the list
     *
     * @param value number
     * @returns {@link void}
     */
    addDouble(value: number): void
    /**
     * Get string value at given index
     *
     * @param index number
     * @returns {@link string}
     */
    getString(index: number): string
    /**
     * Set string value at given index
     *
     * @param index number
     * @param value string
     * @returns {@link void}
     */
    setString(index: number, value: string): void
    /**
     * Add string value at the end of the list
     *
     * @param value string
     * @returns {@link void}
     */
    addString(value: string): void
    /**
     * Get boolean (true or false) value at given index
     *
     * @param index number
     * @returns {@link boolean}
     */
    getBoolean(index: number): boolean
    /**
     * Set boolean (true or false) value at given index
     *
     * @param index number
     * @param value boolean
     * @returns {@link void}
     */
    setBoolean(index: number, value: boolean): void
    /**
     * Add boolean (true or false) value at the end of the list
     *
     * @param value boolean
     * @returns {@link void}
     */
    addBoolean(value: boolean): void
    /**
     * Get NBT compound at given index
     *
     * @param index number
     * @returns {@link INBTCompound}
     */
    getCompound(index: number): INBTCompound
    /**
     * Set NBT compound at given index
     *
     * @param index number
     * @param value INBTCompound
     * @returns {@link void}
     */
    setCompound(index: number, value: INBTCompound): void
    /**
     * Add NBT compound at the end of the list
     *
     * @param value INBTCompound
     * @returns {@link void}
     */
    addCompound(value: INBTCompound): void
    /**
     * Get NBT list at given index
     *
     * @param index number
     * @returns {@link INBTList}
     */
    getList(index: number): INBTList
    /**
     * Set NBT list at given index
     *
     * @param index number
     * @param value INBTList
     * @returns {@link void}
     */
    setList(index: number, value: INBTList): void
    /**
     * Add NBT list at the end of the list
     *
     * @param value INBTList
     * @returns {@link void}
     */
    addList(value: INBTList): void
    /**
     * Turns a NBT list into a Java array.
     *
     * @example
     *    var tag = mappet.createCompound("{id:[0,2,4]}");
     *
     *    c.send(tag.get("id").toArray()[1]); // 2
     *
     * @returns {@link Object} - an array of the list's elements
     */
    toArray(): Object
}

declare interface INBTCompound extends INBT {
    readonly NBTTagCompound: NBTTagCompound
    readonly NBTTagComound: NBTTagCompound
    /**
     * Get raw NBT tag compound. <b>BEWARE:</b> you need to know the MCP
     * mappings in order to directly call methods on this instance!
     *
     * @returns {@link NBTTagCompound}
     */
    getNBTTagCompound(): NBTTagCompound
    /**
     * Deprecated version of {@link #getNBTTagCompound} to avoid errors
     * in existing scripts. Use the other method!
     *
     * @returns {@link NBTTagCompound}
     */
    getNBTTagComound(): NBTTagCompound
    /**
     * Check whether this NBT compound has a value by given key.
     *
     * @param key string
     * @returns {@link boolean}
     */
    has(key: string): boolean
    /**
     * Remove a value by given key.
     *
     * @param key string
     * @returns {@link void}
     */
    remove(key: string): void
    /**
     * Get all keys.
     *
     * @returns {@link Set}
     */
    keys(): Set<string>
    /**
     * Get byte (8-bit integer) value by given key.
     *
     * @param key string
     * @returns {@link number}
     */
    getByte(key: string): number
    /**
     * Set byte (8-bit integer) value by given key.
     *
     * @param key string
     * @param value number
     * @returns {@link void}
     */
    setByte(key: string, value: number): void
    /**
     * Get short (16-bit integer) value by given key.
     *
     * @param key string
     * @returns {@link number}
     */
    getShort(key: string): number
    /**
     * Set short (16-bit integer) value by given key.
     *
     * @param key string
     * @param value number
     * @returns {@link void}
     */
    setShort(key: string, value: number): void
    /**
     * Get integer (32-bit integer) value by given key.
     *
     * @param key string
     * @returns {@link number}
     */
    getInt(key: string): number
    /**
     * Set integer (32-bit integer) value by given key.
     *
     * @param key string
     * @param value number
     * @returns {@link void}
     */
    setInt(key: string, value: number): void
    /**
     * Get long (64-bit integer) value by given key.
     *
     * @param key string
     * @returns {@link number}
     */
    getLong(key: string): number
    /**
     * Set long (64-bit integer) value by given key.
     *
     * @param key string
     * @param value number
     * @returns {@link void}
     */
    setLong(key: string, value: number): void
    /**
     * Get float (32-bit floating point number) value by given key.
     *
     * @param key string
     * @returns {@link number}
     */
    getFloat(key: string): number
    /**
     * Set float (32-bit floating point number) value by given key.
     *
     * @param key string
     * @param value number
     * @returns {@link void}
     */
    setFloat(key: string, value: number): void
    /**
     * Get double (64-bit floating point number) value by given key.
     *
     * @param key string
     * @returns {@link number}
     */
    getDouble(key: string): number
    /**
     * Set double (64-bit floating point number) value by given key.
     *
     * @param key string
     * @param value number
     * @returns {@link void}
     */
    setDouble(key: string, value: number): void
    /**
     * Get string value by given key.
     *
     * @param key string
     * @returns {@link string}
     */
    getString(key: string): string
    /**
     * Set string value by given key.
     *
     * @param key string
     * @param value string
     * @returns {@link void}
     */
    setString(key: string, value: string): void
    /**
     * Get boolean (true or false) value by given key.
     *
     * @param key string
     * @returns {@link boolean}
     */
    getBoolean(key: string): boolean
    /**
     * Set boolean (true or false) value by given key.
     *
     * @param key string
     * @param value boolean
     * @returns {@link void}
     */
    setBoolean(key: string, value: boolean): void
    /**
     * Get NBT compound by given key.
     *
     * @param key string
     * @returns {@link INBTCompound}
     */
    getCompound(key: string): INBTCompound
    /**
     * Set NBT compound by given key.
     *
     * @param key string
     * @param value INBTCompound
     * @returns {@link void}
     */
    setCompound(key: string, value: INBTCompound): void
    /**
     * Get NBT list by given key.
     *
     * @param key string
     * @returns {@link INBTList}
     */
    getList(key: string): INBTList
    /**
     * Set NBT list by given key.
     *
     * @param key string
     * @param value INBTList
     * @returns {@link void}
     */
    setList(key: string, value: INBTList): void
    /**
     * Set arbitrary NBT.
     *
     * @example
     *    var compound = mappet.createCompound();
     *
     *    compound.setNBT("stack", '{id:"minecraft:diamond",Count:64b}');
     *
     *    // {stack:{id:"minecraft:diamond",Count:64b}}
     *    print(compound.stringify());
     *
     * @param key string
     * @param nbt string
     * @returns {@link boolean} - Whether given NBT code was successfully was inserted.
     */
    setNBT(key: string, nbt: string): boolean
    /**
     * Get the value of in this compound by given key of the raw type. Following
     * value types are possible (depending on whatever was found in the compound):
     * INBTCompound, INBTList, String, Double, Long, Float, Int, Short, Byte, or
     * null if the value is absent by given key.
     *
     * @example
     *    var tag = mappet.createCompound("{id:\"minecraft:diamond_hoe\",Count:1b}");
     *
     *    c.send(tag.get("id"));
     *    c.send(tag.get("Count"));
     *
     * @param key string
     * @returns {@link Object} - the value found by that key or null
     */
    get(key: string): Object
    /**
     * Check if this compound is equal to given compound (order of keys doesn't matter).
     *
     * @example
     *    var tag1 = mappet.createCompound("{id:\"minecraft:diamond_hoe\",Count:1b}");
     *    var tag2 = mappet.createCompound("{Count:1b,id:\"minecraft:diamond_hoe\"}");
     *
     *    c.send(tag1.equals(tag2));
     *
     * @param compound INBTCompound
     * @returns {@link boolean} - whether this compound is equal to the given compound
     */
    equals(compound: INBTCompound): boolean
    /**
     * Adds a new compound to this compound.
     *
     * @example
     *    var tag = mappet.createCompound();
     *    tag.addCompound("compound");
     *    tag.get("compound").setString("x", "123")
     *    c.send(tag) //{compound:{x:"123"}}
     *
     * @param key string
     * @returns {@link void}
     */
    addCompound(key: string): void
    /**
     * Dumps to a JSON String.
     * It first replaces the key-value colons with the proper JSON format.
     * Then, it creates a pattern to match the desired numeric literals and boolean values.
     * It checks if the current matched pattern is "0b" or "1b"
     * and replaces them with "false" and "true" respectively.
     * For the other cases, it removes the last character from the matched pattern,
     * effectively removing the type literal.
     *
     * @example
     *    var tag = mappet.createCompound("{id:\"minecraft:diamond_hoe\",Count:1b}");
     *    c.send(tag.dumpJSON());
     *
     * @returns {@link string}
     */
    dumpJSON(): string
}

declare interface INBT {
    /**
     * Check whether this NBT data is an NBT compound.
     *
     * @returns {@link boolean}
     */
    isCompound(): boolean
    /**
     * Check whether this NBT data is an NBT list.
     *
     * @returns {@link boolean}
     */
    isList(): boolean
    /**
     * Convert this NBT structure to string.
     *
     * @returns {@link string}
     */
    stringify(): string
    /**
     * Check whether this NBT tag is empty.
     *
     * @returns {@link boolean}
     */
    isEmpty(): boolean
    /**
     * Get the size (amount of elements) in this NBT tag.
     *
     * @returns {@link number}
     */
    size(): number
    /**
     * Create a copy of this NBT tag.
     *
     * @returns {@link INBT}
     */
    copy(): INBT
    /**
     * Add given NBT data's values on top of this one.
     *
     * @param nbt INBT
     * @returns {@link void}
     */
    combine(nbt: INBT): void
    /**
     * Check whether given NBT tag is same as this one.
     *
     * @param nbt INBT
     * @returns {@link boolean}
     */
    isSame(nbt: INBT): boolean
}

declare interface UITrackpadComponent extends UIComponent {
    readonly defaultUpdateDelay: number
    /**
     * Set the value that of trackpad component.
     *
     * @param value number
     * @returns {@link UITrackpadComponent}
     */
    value(value: number): this
    /**
     * Set the minimum that this trackpad component can let the user pick.
     *
     * @param min number
     * @returns {@link UITrackpadComponent}
     */
    min(min: number): this
    /**
     * Set the maximum that this trackpad component can let the user pick.
     *
     * @param max number
     * @returns {@link UITrackpadComponent}
     */
    max(max: number): this
    /**
     * Set this trackpad component to accept only whole numbers.
     *
     * @returns {@link UITrackpadComponent}
     */
    integer(): this
    /**
     * Toggle integer option, when passed <code>true</code> then this trackpad
     * component will accept only whole numbers, and when passed <code>false</code>,
     * then both whole and floating point numbers can be accepted by this trackpad.
     *
     * @param integer boolean
     * @returns {@link UITrackpadComponent}
     */
    integer(integer: boolean): this
    /**
     * Convenience method that allows to set minimum and maximum, i.e. value range,
     * that this trackpad field can accept.
     *
     * @param min number
     * @param max number
     * @returns {@link UITrackpadComponent}
     */
    limit(min: number, max: number): this
    /**
     * Convenience method that allows to set minimum, maximum, and integer options
     * that this trackpad field can accept.
     *
     * @param min number
     * @param max number
     * @param integer boolean
     * @returns {@link UITrackpadComponent}
     */
    limit(min: number, max: number, integer: boolean): this
    /**
     * Changes the amplitudes of this trackpad fields, i.e. how much value changes when
     * moving the cursor horizontally. Weak (<code>Alt</code> amplitude gets set 5 times
     * weaker than input value, and strong (<code>Shift</code>) amplitude gets set 5 times
     * stronger than input value.
     *
     * @param normal number
     * @returns {@link UITrackpadComponent}
     */
    amplitudes(normal: number): this
    /**
     * Changes the amplitudes of this trackpad fields, i.e. how much value changes when
     * moving the cursor horizontally.
     *
     * @param normal number
     * @param weak number
     * @param strong number
     * @returns {@link UITrackpadComponent}
     */
    amplitudes(normal: number, weak: number, strong: number): this
    /**
     * Changes the incremental value of this trackpad fields, i.e. how much being added
     * or subtracted when user presses &lt; and &gt; buttons on the sides of the
     * trackpad value.
     *
     * @param increment number
     * @returns {@link UITrackpadComponent}
     */
    increment(increment: number): this
}

declare interface UIToggleComponent extends UILabelBaseComponent {
    /**
     * Change component's toggled state.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    uiContext.get("toggle").state(true);
     *
     * @param state boolean
     * @returns {@link UIToggleComponent}
     */
    state(state: boolean): this
}

declare interface UITextComponent extends UILabelBaseComponent {
    /**
     * Change text's anchor point which determines where text will
     * be rendered relative to component's frame horizontally.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Position the text's content in the center of its frame
     *    uiContext.get("text").textAnchor(0.5);
     *
     * @param anchor number
     * @returns {@link UITextComponent}
     */
    textAnchor(anchor: number): this
}

declare interface UITextboxComponent extends UILabelBaseComponent {
    readonly defaultUpdateDelay: number
    /**
     * Change component's max length (how many character max can be inputted).
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    uiContext.get("textbox").maxLength(68);
     *
     * @param maxLength number
     * @returns {@link UITextboxComponent}
     */
    maxLength(maxLength: number): this
    /**
     * Disable textbox's background.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    uiContext.get("textbox").noBackground();
     *
     * @returns {@link UITextboxComponent}
     */
    noBackground(): this
}

declare interface UITextareaComponent extends UILabelBaseComponent {
    readonly defaultUpdateDelay: number
    /**
     * Disable textarea's background.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    uiContext.get("textarea").noBackground();
     *
     * @returns {@link UITextareaComponent}
     */
    noBackground(): this
}

declare interface UIStringListComponent extends UIComponent {
    /**
     * Replace values within this string list.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Replace values in strings
     *    uiContext.get("strings").values("Tomato", "Cucumber", "Pepper", "Cabbage");
     *
     * @param values string
     * @returns {@link UIStringListComponent}
     */
    values(values: string[]|List<string>): this
    /**
     * Replace values within this string list.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    var vegetables = ["Tomato", "Cucumber", "Pepper", "Cabbage"];
     *
     *    // Replace values in strings
     *    uiContext.get("strings").values(vegetables);
     *
     * @param values List
     * @returns {@link UIStringListComponent}
     */
    values(values: string[]|List<string>): this
    /**
     * Replace values within this string list.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    var vegetables = ["Tomato", "Cucumber", "Pepper", "Cabbage"];
     *
     *    // Replace values in strings
     *    uiContext.get("strings").setValues(vegetables);
     *
     * @param values List
     * @returns {@link UIStringListComponent}
     */
    setValues(values: string[]|List<string>): this
    /**
     * Returns values of this string list.
     *
     * @example
     *    var values = uiContext.get("strings").getValues();
     *
     *    for (var i in values)
     *    {
     *        c.send(values[i]);
     *    }
     *
     * @returns {@link List}
     */
    getValues(): List<string>
    /**
     * Set the currently selected element.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Set first string in the list to be selected
     *    uiContext.get("strings").selected(0);
     *
     * @param selected number
     * @returns {@link UIStringListComponent}
     */
    selected(selected: number): this
    /**
     * Set component's solid color background.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Set half transparent black background
     *    uiContext.get("strings").background();
     *
     * @returns {@link UIStringListComponent}
     */
    background(): this
    /**
     * Set component's solid color background.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Set half transparent toxic green background
     *    uiContext.get("strings").background(0x8800ff00);
     *
     * @param background number
     * @returns {@link UIStringListComponent}
     */
    background(background: number): this
}

declare interface UIStackComponent extends UIComponent {
    readonly defaultUpdateDelay: number
    /**
     * Set item stack component's item from scripts.
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI().background();
     *        var stack = ui.item().id("stack").tooltip("An exhibit D.", 1);
     *
     *        stack.rxy(0.5, 0.5).wh(24, 24).anchor(0.5);
     *        stack.stack(mappet.createItem("minecraft:diamond_sword"));
     *        c.getSubject().openUI(ui);
     *    }
     *
     * @param stack IScriptItemStack
     * @returns {@link UIStackComponent}
     */
    stack(stack: IScriptItemStack): this
    /**
     * Set item stack component's item. See the example in {@link #stack(IScriptItemStack)}.
     *
     * @param stack ItemStack
     * @returns {@link UIStackComponent}
     */
    stack(stack: ItemStack): this
    /**
     * Determines whether to show the trackpad with the number of items setting.
     *
     * @param flag boolean
     * @returns {@link UIStackComponent}
     */
    count(flag: boolean): this
    /**
     * Determines whether to show the search button.
     *
     * @param flag boolean
     * @returns {@link UIStackComponent}
     */
    search(flag: boolean): this
}

declare interface UIParentComponent extends UIComponent {
}

declare interface UIMorphComponent extends UIComponent {
    readonly defaultUpdateDelay: number
    /**
     * Set display morph.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Set Alex morph
     *    uiContext.get("morph").morph(mappet.createMorph('{Name:"blockbuster.alex"}'));
     *
     * @param morph AbstractMorph
     * @returns {@link UIMorphComponent}
     */
    morph(morph: AbstractMorph): this
    /**
     * Enable an ability for players to pick or edit the morph.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Enable morph editing
     *    uiContext.get("morph").editing();
     *
     * @returns {@link UIMorphComponent}
     */
    editing(): this
    /**
     * Toggle an ability for players to pick or edit the morph.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Disable morph editing
     *    uiContext.get("morph").editing(false);
     *
     * @param editing boolean
     * @returns {@link UIMorphComponent}
     */
    editing(editing: boolean): this
    /**
     * Change camera's orbit position in the morph component. The default camera position (<code>0</code>,
     * <code>1</code>, <code>0</code>).
     *
     * <p>ProTip: you can enable UI debug option in Ctrl + 0 &gt; Mappet, you can position the morph
     * after running the script, right click somewhere within its frame, and click Copy camera
     * information... context menu item. It will copy the configuration of camera, which you can
     * paste into the code.</p>
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Set camera position
     *    uiContext.get("morph").position(0, 1, 0.5);
     *
     * @param x number
     * @param y number
     * @param z number
     * @returns {@link UIMorphComponent}
     */
    position(x: number, y: number, z: number): this
    /**
     * Change camera orbit rotation in the morph component. The default camera rotation (<code>0</code>, <code>0</code>).
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Set camera rotation
     *    uiContext.get("morph").rotation(15, 0);
     *
     * @param pitch number
     * @param yaw number
     * @returns {@link UIMorphComponent}
     */
    rotation(pitch: number, yaw: number): this
    /**
     * Change camera distance from camera orbit position in the morph component. The default
     * camera distance is <code>2</code>.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Set camera distance
     *    uiContext.get("morph").distance(4);
     *
     * @param distance number
     * @returns {@link UIMorphComponent}
     */
    distance(distance: number): this
    /**
     * Change camera Field of View in the morph component. The default FOV is <code>70</code>.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Set camera FOV
     *    uiContext.get("morph").fov(50);
     *
     * @param fov number
     * @returns {@link UIMorphComponent}
     */
    fov(fov: number): this
}

declare interface UILayoutComponent extends UIParentComponent {
    /**
     * Enables scrolling. This option works only with {@link IMappetUIBuilder#column(int)}
     * layout component.
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI().background();
     *        var column = ui.column(4, 10);
     *
     *        column.getCurrent().scroll().rxy(0.5, 0.5).wh(200, 200).anchor(0.5);
     *
     *        column.label("Name").h(8);
     *        column.textbox().id("name").h(20);
     *        column.label("Last name").h(8);
     *        column.textbox().id("lastname").h(20);
     *
     *        column.toggle("I agree to ToS").id("toggle").h(14);
     *        column.text("The terms of service are following: you agree that your data will be used by an AI to generate funny cat and dog videos based entirely on your name and lastname.\n\nYou also agree to give us your time to view those videos, because we said so.").color(0xaaaaaa, false).marginTop(8);
     *
     *        for (var i = 0; i < 10; i++)
     *        {
     *            column.button("Button " + (i + 1)).h(20);
     *        }
     *
     *        column.text("These 10 buttons above demonstrate the ability of this layout element to scroll down.").marginTop(12);
     *
     *        c.getSubject().openUI(ui);
     *    }
     *
     * @returns {@link UILayoutComponent}
     */
    scroll(): this
    /**
     * Set manually scroll size of the layout element. This works only with
     * basic {@link IMappetUIBuilder#layout()} component.
     *
     * <p>If {@link UILayoutComponent#horizontal()} was enabled earlier,
     * then this value will change the max scrollable to width, rather than
     * height.</p>
     *
     * @example
     *    function main(c)
     *    {
     *        var size = 400;
     *
     *        var ui = mappet.createUI().background();
     *
     *        // Demonstration of manual vertical scroll area
     *        var vertical = ui.layout();
     *
     *        vertical.getCurrent().scroll().scrollSize(size).rxy(0.25, 0.5).wh(150, 200).anchor(0.5);
     *        vertical.button("Top left").xy(10, 10).wh(100, 20);
     *        vertical.button("Middle").rx(0.5, -50).y(size / 2 - 10).wh(100, 20);
     *        vertical.button("Bottom right").rx(1, -110).y(size - 30).wh(100, 20);
     *
     *        ui.label("Vertical scroll").background(0x88000000).rx(0.25).ry(0.5, -120).wh(100, 20).anchorX(0.5).labelAnchor(0.5, 0);
     *
     *        // Demonstration of manual horizontal scroll area
     *        var horizontal = ui.layout();
     *
     *        horizontal.getCurrent().scroll().horizontal().scrollSize(size).rxy(0.75, 0.5).wh(150, 200).anchor(0.5);
     *        horizontal.button("Top left").xy(10, 10).wh(100, 20);
     *        horizontal.button("Middle").x(size / 2 - 50).ry(0.5, -10).wh(100, 20);
     *        horizontal.button("Bottom right").x(size - 110).ry(1, -30).wh(100, 20);
     *
     *        ui.label("Horizontal scroll").background(0x88000000).rx(0.75).ry(0.5, -120).wh(100, 20).anchorX(0.5).labelAnchor(0.5, 0);
     *
     *        c.getSubject().openUI(ui);
     *    }
     *
     * @param scrollSize number
     * @returns {@link UILayoutComponent}
     */
    scrollSize(scrollSize: number): this
    /**
     * Enables horizontal mode. This usable when {@link UILayoutComponent#scroll()}
     * is enabled.
     *
     * @returns {@link UILayoutComponent}
     */
    horizontal(): this
    /**
     * Per component width (in pixels) that should be sustained within
     * {@link IMappetUIBuilder#grid(int)} layout type. This doesn't work with any other
     * component than grid.
     *
     * @param width number
     * @returns {@link UILayoutComponent}
     */
    width(width: number): this
    /**
     * How many components per row that should be placed within
     * {@link IMappetUIBuilder#grid(int)} layout type. This option doesn't work with
     * any other component than grid.
     *
     * @param items number
     * @returns {@link UILayoutComponent}
     */
    items(items: number): this
}

declare interface UILabelComponent extends UILabelBaseComponent {
    /**
     * Change background color of this label component by providing hex ARGB.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Add a half transparent black background
     *    uiContext.get("label").background(0x88000000);
     *
     * @param background number
     * @returns {@link UILabelComponent}
     */
    background(background: number): this
    /**
     * Change text's anchor point which determines where text will be rendered
     * relative to component's frame both vertically and horizontally.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Position the label's text in the middle of its frame
     *    uiContext.get("label").labelAnchor(0.5);
     *
     * @param anchor number
     * @returns {@link UILabelComponent}
     */
    labelAnchor(anchor: number): this
    /**
     * Change text's anchor point which determines where text will be rendered
     * relative to component's frame, with separate vertical and horizontal
     * anchors.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Position the label's text in the middle only vertically
     *    uiContext.get("label").labelAnchor(0, 0.5);
     *
     * @param anchorX number
     * @param anchorY number
     * @returns {@link UILabelComponent}
     */
    labelAnchor(anchorX: number, anchorY: number): this
}

declare interface UILabelBaseComponent extends UIComponent {
    /**
     * Change text color of this component by providing hex RGB.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Set label's text color to toxic green
     *    uiContext.get("component").color(0x00ff00);
     *
     * @param color number
     * @returns {@link UILabelBaseComponent}
     */
    color(color: number): this
    /**
     * Change text color of this component by providing hex RGB.
     * Optionally enable text shadow.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Set label's text color to black (and without text shadow)
     *    uiContext.get("component").color(0x000000, false);
     *
     * @param color number
     * @param shadow boolean
     * @returns {@link UILabelBaseComponent}
     */
    color(color: number, shadow: boolean): this
    /**
     * Set label for label, toggle and text UI components, or change
     * the input value for textbox and textarea components.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *
     *    // Assuming that title is a label UI component
     *    uiContext.get("title").label("Application form");
     *
     *    // Assuming that prerequisites is a text UI component
     *    uiContext.get("prerequisites").label("This is an application form for enrolling into H.P. Lovecraft's book club.\n\n* - are required fields");
     *
     *    // Assuming that fullname is a textbox UI component
     *    uiContext.get("fullname").label("John Smith");
     *
     *    // Assuming that description is a textarea UI component
     *    uiContext.get("description").label("I'm John Smith, I'm from Alaska, and I like fishing.");
     *
     *    // Assuming that adult is a toggle UI component
     *    uiContext.get("adult").label("Adult");
     *
     * @param label string
     * @returns {@link UILabelBaseComponent}
     */
    label(label: string): this
}

declare interface UIIconButtonComponent extends UIComponent {
    /**
     * Change icon component's icon.
     *
     * <p>You can find out all available icons by entering following line into
     * Mappet's REPL (it returns a Java Set):</p>
     *
     * @example
     *    Java.type("mchorse.mclib.client.gui.utils.IconRegistry").icons.keySet()
     *
     * @param icon string
     * @returns {@link UIIconButtonComponent}
     */
    icon(icon: string): this
}

declare interface UIGraphicsComponent extends UIComponent {
    /**
     * Draw a solid colored rectangle.
     *
     * @param color number
     * @returns {@link Graphic}
     */
    rect(color: number): Graphic
    /**
     * Draw a solid colored rectangle relative to graphics component's frame.
     *
     * @param x number
     * @param y number
     * @param w number
     * @param h number
     * @param color number
     * @returns {@link Graphic}
     */
    rect(x: number, y: number, w: number, h: number, color: number): Graphic
    /**
     * Draw a vertical gradient rectangle.
     *
     * @param primary number
     * @param secondary number
     * @returns {@link Graphic}
     */
    gradient(primary: number, secondary: number): Graphic
    /**
     * Draw a vertical/horizontal gradient rectangle.
     *
     * @param primary number
     * @param secondary number
     * @param horizontal boolean
     * @returns {@link Graphic}
     */
    gradient(primary: number, secondary: number, horizontal: boolean): Graphic
    /**
     * Draw a vertical gradient rectangle relative to graphics component's frame.
     *
     * @param x number
     * @param y number
     * @param w number
     * @param h number
     * @param primary number
     * @param secondary number
     * @returns {@link Graphic}
     */
    gradient(x: number, y: number, w: number, h: number, primary: number, secondary: number): Graphic
    /**
     * Draw a gradient rectangle relative to graphics component's frame.
     *
     * @param x number
     * @param y number
     * @param w number
     * @param h number
     * @param primary number
     * @param secondary number
     * @param horizontal boolean
     * @returns {@link Graphic}
     */
    gradient(x: number, y: number, w: number, h: number, primary: number, secondary: number, horizontal: boolean): Graphic
    /**
     * Draw an image.
     *
     * @param image string
     * @param textureWidth number
     * @param textureHeight number
     * @returns {@link Graphic}
     */
    image(image: string, textureWidth: number, textureHeight: number): Graphic
    /**
     * Draw an image.
     *
     * @param image string
     * @param textureWidth number
     * @param textureHeight number
     * @param primary number
     * @returns {@link Graphic}
     */
    image(image: string, textureWidth: number, textureHeight: number, primary: number): Graphic
    /**
     * Draw an image relative to graphics component's frame.
     *
     * <p>Image argument is a so called "resource location." For example, if you want
     * to draw pig's skin on the screen you can input "minecraft:textures/entity/pig/pig.png"
     * and it will draw it on the screen.</p>
     *
     * <p>If you have Blockbuster enabled, it can also display images from internet
     * by inputting image's URL. Although, sometimes it won't work due to incorrect headers
     * that doesn't identify a web-browser.</p>
     *
     * @param image string
     * @param x number
     * @param y number
     * @param w number
     * @param h number
     * @returns {@link Graphic}
     */
    image(image: string, x: number, y: number, w: number, h: number): Graphic
    /**
     * Draw an image relative to graphics component's frame with known texture size.
     *
     * @param image string
     * @param x number
     * @param y number
     * @param w number
     * @param h number
     * @param textureWidth number
     * @param textureHeight number
     * @returns {@link Graphic}
     */
    image(image: string, x: number, y: number, w: number, h: number, textureWidth: number, textureHeight: number): Graphic
    /**
     * Draw an image relative to graphics component's frame with known texture size and color.
     *
     * @param image string
     * @param x number
     * @param y number
     * @param w number
     * @param h number
     * @param textureWidth number
     * @param textureHeight number
     * @param primary number
     * @returns {@link Graphic}
     */
    image(image: string, x: number, y: number, w: number, h: number, textureWidth: number, textureHeight: number, primary: number): Graphic
    /**
     * Draw a text label relative to graphics component's frame.
     *
     * @param text string
     * @param x number
     * @param y number
     * @param color number
     * @returns {@link Graphic}
     */
    text(text: string, x: number, y: number, color: number): Graphic
    /**
     * Draw a text label with an anchor relative to graphics component's frame.
     *
     * @param text string
     * @param x number
     * @param y number
     * @param color number
     * @param anchorX number
     * @param anchorY number
     * @returns {@link Graphic}
     */
    text(text: string, x: number, y: number, color: number, anchorX: number, anchorY: number): Graphic
    /**
     * Draw a text label with an anchor relative to graphics component's frame.
     *
     * @param text string
     * @param x number
     * @param y number
     * @param w number
     * @param h number
     * @param color number
     * @param anchorX number
     * @param anchorY number
     * @returns {@link Graphic}
     */
    text(text: string, x: number, y: number, w: number, h: number, color: number, anchorX: number, anchorY: number): Graphic
    /**
     * Draw a McLib icon relative to graphics component's frame.
     *
     * <p>Most of the icons are <code>16x16</code> so keep that in mind.</p>
     *
     * @param icon string
     * @param x number
     * @param y number
     * @param color number
     * @returns {@link Graphic}
     */
    icon(icon: string, x: number, y: number, color: number): Graphic
    /**
     * Draw a McLib icon with an anchor relative to graphics component's frame.
     *
     * @param icon string
     * @param x number
     * @param y number
     * @param color number
     * @param anchorX number
     * @param anchorY number
     * @returns {@link Graphic}
     */
    icon(icon: string, x: number, y: number, color: number, anchorX: number, anchorY: number): Graphic
    /**
     * Draw a drop shadow.
     *
     * @param primary number
     * @param secondary number
     * @param offset number
     * @returns {@link Graphic}
     */
    shadow(primary: number, secondary: number, offset: number): Graphic
    /**
     * Draw a drop shadow.
     *
     * @param x number
     * @param y number
     * @param w number
     * @param h number
     * @param primary number
     * @param secondary number
     * @param offset number
     * @returns {@link Graphic}
     */
    shadow(x: number, y: number, w: number, h: number, primary: number, secondary: number, offset: number): Graphic
}

declare interface UIComponent {
    readonly defaultUpdateDelay: number
    /**
     * Set the ID of the component.
     *
     * <p>Without ID, the data that can be inputted by players won't be sent
     * into the script handler, so it is <b>required</b> to set component's
     * ID if you want to receive the data from the component.</p>
     *
     * <p><b>BEWARE</b>: multiple components must not share same ID, if they will
     * it will certainly cause bugs in the data that you'll be receiving from the
     * client and the way you retrieve components using {@link IMappetUIContext#get(String)}.</p>
     *
     * @param id string
     * @returns {@link UIComponent}
     */
    id(id: string): this
    /**
     * Set a tooltip that will be displayed at the bottom of component's frame.
     *
     * @param tooltip string
     * @returns {@link UIComponent}
     */
    tooltip(tooltip: string): this
    /**
     * Set a tooltip that will be displayed at specified side of component's frame.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    uiContext.get("component").tooltip("Enter your full name", 1);
     *
     * @param tooltip string
     * @param direction number
     * @returns {@link UIComponent}
     */
    tooltip(tooltip: string, direction: number): this
    /**
     * Set component's visibility. Hiding components also disables any user input,
     * i.e. despite button being invisible, it can't be clicked.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    uiContext.get("button").visible(false);
     *
     * @param visible boolean
     * @returns {@link UIComponent}
     */
    visible(visible: boolean): this
    /**
     * Toggle component's user input. When the component is disabled, it can't
     * receive any user input: no inputting text into or focusing textbox and
     * textareas, no clicking on click area, icon button, or button, etc.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    uiContext.get("button").enabled(false);
     *
     * @param enabled boolean
     * @returns {@link UIComponent}
     */
    enabled(enabled: boolean): this
    /**
     * Set margin to all sides.
     *
     * <p><b>IMPORTANT</b>: margins affect positioning only within layout component.
     * They do absolutely nothing outside of column, row and grid layout components.</p>
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    uiContext.get("button").margin(10);
     *
     * @param margin number
     * @returns {@link UIComponent}
     */
    margin(margin: number): this
    /**
     * Set top margin. See {@link #margin(int)} method for more information about
     * restrictions.
     *
     * @param margin number
     * @returns {@link UIComponent}
     */
    marginTop(margin: number): this
    /**
     * Set bottom margin. See {@link #margin(int)} method for more information
     * about restrictions.
     *
     * @param margin number
     * @returns {@link UIComponent}
     */
    marginBottom(margin: number): this
    /**
     * Set left margin. See {@link #margin(int)} method for more information about
     * restrictions.
     *
     * @param margin number
     * @returns {@link UIComponent}
     */
    marginLeft(margin: number): this
    /**
     * Set right margin. See {@link #margin(int)} method for more information about
     * restrictions.
     *
     * @param margin number
     * @returns {@link UIComponent}
     */
    marginRight(margin: number): this
    /**
     * Add a keybind with no modifiers. See {@link #keybind(int, String, String, boolean, boolean)} for proper example.
     *
     * @param keyCode number
     * @param action string
     * @param label string
     * @returns {@link UIComponent}
     */
    keybind(keyCode: number, action: string, label: string): this
    /**
     * Add a keybind with optional Control modifier.
     * See {@link #keybind(int, String, String, boolean, boolean)} for proper example.
     *
     * @param keyCode number
     * @param action string
     * @param label string
     * @param ctrl boolean
     * @returns {@link UIComponent}
     */
    keybind(keyCode: number, action: string, label: string, ctrl: boolean): this
    /**
     * Add a keybind with optional Control and/or Shift modifier(s).
     * See {@link #keybind(int, String, String, boolean, boolean)} for proper example.
     *
     * @param keyCode number
     * @param action string
     * @param label string
     * @param ctrl boolean
     * @param shift boolean
     * @returns {@link UIComponent}
     */
    keybind(keyCode: number, action: string, label: string, ctrl: boolean, shift: boolean): this
    /**
     * Add a keybind optionally with Control, Shift, and Alt key modifiers (i.e. while holding).
     *
     * @example
     *    // For more reference, check this page to find the list of all key codes:
     *    // https://minecraft.fandom.com/wiki/Key_codes/Keyboard1
     *    //
     *    function main(c)
     *    {
     *        var ui = mappet.createUI(c, "handler").background();
     *        var button = ui.icon("upload").id("icon");
     *
     *        // 203 = Arrow left
     *        ui.getCurrent().keybind(203, "left", "Change icon to left");
     *        // 205 = Arrow right
     *        ui.getCurrent().keybind(205, "right", "Change icon to right");
     *        button.rxy(0.5, 0.5).wh(20, 20).anchor(0.5);
     *        c.getSubject().openUI(ui);
     *    }
     *
     *    function handler(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *        var key = uiContext.getHotkey();
     *
     *        if (key === "left")
     *        {
     *            uiContext.get("icon").icon("leftload");
     *        }
     *        else if (key === "right")
     *        {
     *            uiContext.get("icon").icon("rightload");
     *        }
     *    }
     *
     * @param keyCode number
     * @param action string
     * @param label string
     * @param ctrl boolean
     * @param shift boolean
     * @param alt boolean
     * @returns {@link UIComponent}
     */
    keybind(keyCode: number, action: string, label: string, ctrl: boolean, shift: boolean, alt: boolean): this
    /**
     * Add a context menu item.
     *
     * @param icon string
     * @param action string
     * @param label string
     * @returns {@link UIComponent}
     */
    context(icon: string, action: string, label: string): this
    /**
     * Add a context menu item.
     *
     * @example
     *    function main(c)
     *    {
     *        var ui = mappet.createUI(c, "handler").background();
     *        var label = ui.label("Hello!").id("label").tooltip("Right click me...");
     *
     *        label.rxy(0.5, 0.5).wh(160, 20).anchor(0.5).labelAnchor(0.5);
     *        label.context("bubble", "a", "How are you?");
     *        label.context("remove", "b", "...", 0xff0033);
     *
     *        c.getSubject().openUI(ui);
     *    }
     *
     *    function handler(c)
     *    {
     *        var uiContext = c.getSubject().getUIContext();
     *        var data = uiContext.getData();
     *
     *        if (uiContext.getLast() === "textbox")
     *        {
     *            c.getSubject().send("Your name is: " + data.getString("textbox"));
     *        }
     *
     *        var item = uiContext.getContext();
     *
     *        if (item === "a")
     *        {
     *            uiContext.get("label").label("I'm fine, and you?");
     *        }
     *        else if (item === "b")
     *        {
     *            uiContext.get("label").label("");
     *        }
     *    }
     *
     * @param icon string
     * @param action string
     * @param label string
     * @param color number
     * @returns {@link UIComponent}
     */
    context(icon: string, action: string, label: string, color: number): this
    /**
     * Set X in pixels relative to parent component.
     *
     * @param value number
     * @returns {@link UIComponent}
     */
    x(value: number): this
    /**
     * Set X relative in percents to parent component. Passed value should be
     * <code>0..1</code>, where <code>0</code> is fully left, and <code>1</code> is fully right.
     *
     * @param value number
     * @returns {@link UIComponent}
     */
    rx(value: number): this
    /**
     * Set X relative in percents to parent component with offset. Passed value should be
     * <code>0..1</code>, where <code>0</code> is fully left, and <code>1</code> is fully right.
     *
     * @param value number
     * @param offset number
     * @returns {@link UIComponent}
     */
    rx(value: number, offset: number): this
    /**
     * Set Y in pixels relative to parent component.
     *
     * @param value number
     * @returns {@link UIComponent}
     */
    y(value: number): this
    /**
     * Set Y relative in percents to parent component. Passed value should be
     * <code>0..1</code>, where <code>0</code> is fully top, and <code>1</code> is fully bottom.
     *
     * @param value number
     * @returns {@link UIComponent}
     */
    ry(value: number): this
    /**
     * Set Y relative in percents to parent component with offset. Passed value should be
     * <code>0..1</code>, where <code>0</code> is fully top, and <code>1</code> is fully bottom.
     *
     * @param value number
     * @param offset number
     * @returns {@link UIComponent}
     */
    ry(value: number, offset: number): this
    /**
     * Set width in pixels.
     *
     * @param value number
     * @returns {@link UIComponent}
     */
    w(value: number): this
    /**
     * Set width relative in percents to parent component. Passed value should be
     * <code>0..1</code>, where <code>0</code> is element will be <code>0%</code> of
     * parent component's width, and <code>1</code> is <code>100%</code> of parent's
     * component width.
     *
     * @param value number
     * @returns {@link UIComponent}
     */
    rw(value: number): this
    /**
     * Set width relative in percents to parent component with offset. Passed value should be
     * <code>0..1</code>, where <code>0</code> is element will be <code>0%</code> of
     * parent component's width, and <code>1</code> is <code>100%</code> of parent's
     * component width.
     *
     * @param value number
     * @param offset number
     * @returns {@link UIComponent}
     */
    rw(value: number, offset: number): this
    /**
     * Set height in pixels.
     *
     * @param value number
     * @returns {@link UIComponent}
     */
    h(value: number): this
    /**
     * Set height relative in percents to parent component. Passed value should be
     * <code>0..1</code>, where <code>0</code> is element will be <code>0%</code> of
     * parent component's height, and <code>1</code> is <code>100%</code> of parent's
     * component height.
     *
     * @param value number
     * @returns {@link UIComponent}
     */
    rh(value: number): this
    /**
     * Set height relative in percents to parent component with offset. Passed value should be
     * <code>0..1</code>, where <code>0</code> is element will be <code>0%</code> of
     * parent component's height, and <code>1</code> is <code>100%</code> of parent's
     * component height.
     *
     * @param value number
     * @param offset number
     * @returns {@link UIComponent}
     */
    rh(value: number, offset: number): this
    /**
     * Set X and Y in pixels relative to parent component.
     *
     * @param x number
     * @param y number
     * @returns {@link UIComponent}
     */
    xy(x: number, y: number): this
    /**
     * Set X and Y in pixels in percentage relative to parent component.
     *
     * @param x number
     * @param y number
     * @returns {@link UIComponent}
     */
    rxy(x: number, y: number): this
    /**
     * Set width and height in pixels.
     *
     * @param w number
     * @param h number
     * @returns {@link UIComponent}
     */
    wh(w: number, h: number): this
    /**
     * Set relative width and height in percentage relative to parent component.
     *
     * @param w number
     * @param h number
     * @returns {@link UIComponent}
     */
    rwh(w: number, h: number): this
    /**
     * Set horizontal and vertical alignment anchor.
     *
     * @param anchor number
     * @returns {@link UIComponent}
     */
    anchor(anchor: number): this
    /**
     * Set horizontal and vertical alignment anchor.
     *
     * @param anchorX number
     * @param anchorY number
     * @returns {@link UIComponent}
     */
    anchor(anchorX: number, anchorY: number): this
    /**
     * Set horizontal alignment anchor.
     *
     * @param anchor number
     * @returns {@link UIComponent}
     */
    anchorX(anchor: number): this
    /**
     * Set vertical alignment anchor.
     *
     * @param anchor number
     * @returns {@link UIComponent}
     */
    anchorY(anchor: number): this
    /**
     * Set update delay in milliseconds (<code>1000</code> = <code>1</code> second).
     *
     * <p>Update delay allows to limit how frequently data gets sent from the client
     * to the hanlder script.</p>
     *
     * @example
     *    // Assuming that ui is a IMappetUIBuilder
     *
     *    // Change text box's update delay to 1 second meaning
     *    // that a second after user didn't type anything into
     *    // the text box it will send all the data to the handler script
     *    ui.textbox().id("name").updateDelay(1000);
     *
     * @param updateDelay number
     * @returns {@link UIComponent}
     */
    updateDelay(updateDelay: number): this
}

declare interface UIClickComponent extends UIComponent {
}

declare interface UIButtonComponent extends UILabelBaseComponent {
    /**
     * Change button's background color by providing hex RGB.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    uiContext.get("button").background(0x00ff00);
     *
     * @param background number
     * @returns {@link UIButtonComponent}
     */
    background(background: number): this
    /**
     * Disable button's background.
     *
     * @example
     *    // Assuming that uiContext is a IMappetUIContext
     *    uiContext.get("button").noBackground();
     *
     * @returns {@link UIButtonComponent}
     */
    noBackground(): this
}

declare interface TextGraphic {
}

declare interface ShadowGraphic {
}

declare interface RectGraphic {
}

declare interface ImageGraphic {
}

declare interface IconGraphic {
}

declare interface Graphic {
    /**
     * Set X in pixels relative to parent component.
     *
     * @param value number
     * @returns {@link Graphic}
     */
    x(value: number): Graphic
    /**
     * Set X relative in percents to parent component. Passed value should be
     * <code>0..1</code>, where <code>0</code> is fully left, and <code>1</code> is fully right.
     *
     * @param value number
     * @returns {@link Graphic}
     */
    rx(value: number): Graphic
    /**
     * Set X relative in percents to parent component with offset. Passed value should be
     * <code>0..1</code>, where <code>0</code> is fully left, and <code>1</code> is fully right.
     *
     * @param value number
     * @param offset number
     * @returns {@link Graphic}
     */
    rx(value: number, offset: number): Graphic
    /**
     * Set Y in pixels relative to parent component.
     *
     * @param value number
     * @returns {@link Graphic}
     */
    y(value: number): Graphic
    /**
     * Set Y relative in percents to parent component. Passed value should be
     * <code>0..1</code>, where <code>0</code> is fully top, and <code>1</code> is fully bottom.
     *
     * @param value number
     * @returns {@link Graphic}
     */
    ry(value: number): Graphic
    /**
     * Set Y relative in percents to parent component with offset. Passed value should be
     * <code>0..1</code>, where <code>0</code> is fully top, and <code>1</code> is fully bottom.
     *
     * @param value number
     * @param offset number
     * @returns {@link Graphic}
     */
    ry(value: number, offset: number): Graphic
    /**
     * Set width in pixels.
     *
     * @param value number
     * @returns {@link Graphic}
     */
    w(value: number): Graphic
    /**
     * Set width relative in percents to parent component. Passed value should be
     * <code>0..1</code>, where <code>0</code> is element will be <code>0%</code> of
     * parent component's width, and <code>1</code> is <code>100%</code> of parent's
     * component width.
     *
     * @param value number
     * @returns {@link Graphic}
     */
    rw(value: number): Graphic
    /**
     * Set width relative in percents to parent component with offset. Passed value should be
     * <code>0..1</code>, where <code>0</code> is element will be <code>0%</code> of
     * parent component's width, and <code>1</code> is <code>100%</code> of parent's
     * component width.
     *
     * @param value number
     * @param offset number
     * @returns {@link Graphic}
     */
    rw(value: number, offset: number): Graphic
    /**
     * Set height in pixels.
     *
     * @param value number
     * @returns {@link Graphic}
     */
    h(value: number): Graphic
    /**
     * Set height relative in percents to parent component. Passed value should be
     * <code>0..1</code>, where <code>0</code> is element will be <code>0%</code> of
     * parent component's height, and <code>1</code> is <code>100%</code> of parent's
     * component height.
     *
     * @param value number
     * @returns {@link Graphic}
     */
    rh(value: number): Graphic
    /**
     * Set height relative in percents to parent component with offset. Passed value should be
     * <code>0..1</code>, where <code>0</code> is element will be <code>0%</code> of
     * parent component's height, and <code>1</code> is <code>100%</code> of parent's
     * component height.
     *
     * @param value number
     * @param offset number
     * @returns {@link Graphic}
     */
    rh(value: number, offset: number): Graphic
    /**
     * Set X and Y in pixels relative to parent component.
     *
     * @param x number
     * @param y number
     * @returns {@link Graphic}
     */
    xy(x: number, y: number): Graphic
    /**
     * Set X and Y in pixels in percentage relative to parent component.
     *
     * @param x number
     * @param y number
     * @returns {@link Graphic}
     */
    rxy(x: number, y: number): Graphic
    /**
     * Set width and height in pixels.
     *
     * @param w number
     * @param h number
     * @returns {@link Graphic}
     */
    wh(w: number, h: number): Graphic
    /**
     * Set relative width and height in percentage relative to parent component.
     *
     * @param w number
     * @param h number
     * @returns {@link Graphic}
     */
    rwh(w: number, h: number): Graphic
    /**
     * Set both X and Y anchor point of this graphic object.
     *
     * @param anchor number
     * @returns {@link Graphic}
     */
    anchor(anchor: number): Graphic
    /**
     * Set X and Y anchor point of this graphic object individually.
     *
     * @param x number
     * @param y number
     * @returns {@link Graphic}
     */
    anchor(x: number, y: number): Graphic
    /**
     * Set X anchor point of this graphic object.
     *
     * @param x number
     * @returns {@link Graphic}
     */
    anchorX(x: number): Graphic
    /**
     * Set Y anchor point of this graphic object.
     *
     * @param y number
     * @returns {@link Graphic}
     */
    anchorY(y: number): Graphic
    /**
     * Set this graphic to display only when when mouse is over it.
     *
     * @returns {@link Graphic}
     */
    hoverOnly(): Graphic
}

declare interface GradientGraphic {
}

declare interface TileEntity extends MinecraftClass {
}

declare interface IBlockState extends MinecraftClass {
}

declare interface EntityPlayerMP extends MinecraftClass {
}

declare interface AbstractMorph extends MinecraftClass {
}

declare interface EntityNpc extends MinecraftClass {
}

declare interface Entity extends MinecraftClass {
}

declare interface Potion extends MinecraftClass {
}

declare interface World extends MinecraftClass {
}

declare interface EnumParticleTypes extends MinecraftClass {
}

declare interface MinecraftServer extends MinecraftClass {
}

declare interface RayTraceResult extends MinecraftClass {
}

declare interface Vector2d extends MinecraftClass {
}

declare interface Vector3d extends MinecraftClass {
}

declare interface Vector4d extends MinecraftClass {
}

declare interface Matrix3d extends MinecraftClass {
}

declare interface Matrix4d extends MinecraftClass {
}

declare interface ItemStack extends MinecraftClass {
}

declare interface Item extends MinecraftClass {
}

declare interface IInventory extends MinecraftClass {
}

declare interface NBTTagList extends MinecraftClass {
}

declare interface NBTTagCompound extends MinecraftClass {
}

declare interface List<T> extends JavaCollection<T> {
}

declare interface Map {
}

declare interface Set<T> extends JavaCollection<T> {
}

declare interface JavaCollection<T> {
}

declare interface JavaAccessor {
    /**
     * Turns Java collection into JS array
     *
     * @param collection JavaCollection<T>
     * @returns {@link T[]}
     */
    from<T>(collection: JavaCollection<T>): T[]
    /**
     * Takes a string with the fully qualified Java class name, and returns the corresponding <b>JavaClass</b> function object.
     *
     * @param className string
     * @returns {@link any}
     */
    type(className: string): MinecraftClass
}

declare const Java: JavaAccessor;

declare const mappet: IScriptFactory;

declare interface MinecraftClass {
    [key: string]: any
}


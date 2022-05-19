//SCRIPTING API

declare interface IMappetQuests{
    add(questID:string):boolean
    complete(questID:string):boolean
    decline(questID:string):boolean
    //TODO
    readonly ids:number[]
    has(questID:string):boolean
    isComplete(questID:string):boolean
}

declare interface IMappetStates{
    add(stateID:string, double:number):number
    clear():void
    getNumber(stateID:string):number
    getString(stateID:string):string
    has(stateID:string):boolean
    //TODO
    keys():string[]
    reset(stateID:string):void
    resetMasked(stateID:string):void
    setNumber(stateID:string, value:number):void
    setString(stateID:string, value:string):void
}

declare interface IMappetUIBuilder{
    background():IMappetUIBuilder
    button(label:string):UIButtonComponent
    click():UIClickComponent
    closable(closable:boolean):IMappetUIBuilder
    column(margin:number, padding:number):IMappetUIBuilder
    column(margin:number):IMappetUIBuilder
    create(id:string):UIComponent
    readonly current:UILayoutComponent
    graphics():UIGraphicsComponent
    grid(margin:number, padding:number):IMappetUIBuilder
    grid(margin:number):IMappetUIBuilder
    icon(icon:string):UIIconButtonComponent
    item(stack:IScriptItemStack):UIStackComponent
    item():UIStackComponent
    label(label:string):UILabelComponent
    layout():IMappetUIBuilder
    morph(morph:AbstractMorph, editing:boolean):UIMorphComponent
    morph(morph:AbstractMorph):UIMorphComponent
    notClosable():IMappetUIBuilder
    row(margin:number, padding:number):IMappetUIBuilder
    row(margin:number):IMappetUIBuilder
    stringList(values:any[], selected:number):UIStringListComponent
    stringList(values:any[]):UIStringListComponent
    text(text:string):UITextComponent
    textarea(text:string):UITextareaComponent
    textarea():UITextareaComponent
    textbox(text:string, maxLength:number):UITextboxComponent
    textbox(text:string):UITextboxComponent
    textbox():UITextboxComponent
    toggle(label:string, state:boolean):UIToggleComponent
    toggle(label:string):UIToggleComponent
    trackpad(value:number):UITrackpadComponent
    trackpad():UITrackpadComponent
}

declare interface IMappetUIContext{
    get(id:string):anyUIComponent
    readonly context:IMappetUIContext
    readonly data:INBTCompound
    readonly hotkey:string
    readonly last:string
    isClosed():boolean
    sendToPlayer():void
}

declare interface INBT{
    combine(NBT:INBT):void
    copy():INBT
    isCompound():boolean
    isEmpty():boolean
    isList():boolean
    isSame(NBT:INBT):boolean
    size():number
    stringify():string
}

declare interface INBTCompound{
    getBoolean(key:string):boolean
    getByte(key:string):number
    getCompound(key:string):INBTCompound
    getDouble(key:string):number
    getFloat(key:string):number
    getInt(key:string):number
    getList(key:string):INBTList
    getLong(key:string):number
    getNBTTagComound():any
    getShort(key:string):number
    getString(key:string):string
    has(key:string):boolean
    //TODO
    keys():string[]
    remove(key:string):void
    setBoolean(key:string, value:boolean):void
    setByte(key:string, value:number):void
    setCompound(key:string, value:INBTCompound):void
    setDouble(key:string, value:number):void
    setFloat(key:string, value:number):void
    setInt(key:string, value:number):void
    setList(key:string, value:INBTList):void
    setLong(key:string, value:number):void
    setNBT(key:string, nbt:string):boolean
    setShort(key:string, value:number):void
    setString(key:string, value:string):void
}

declare interface INBTList{
    addBoolean(value:boolean):void
    addByte(value:number):void
    addCompound(value:INBTCompound):void
    addDouble(value:number):void
    addFloat(value:number):void
    addInt(value:number):void
    addList(value:INBTList):void
    addLong(value:number):void
    addShort(value:number):void
    addString(value:string):void
    getBoolean(index:number):boolean
    getByte(index:number):number
    getCompound(index:number):INBTCompound
    getDouble(index:number):number
    getFloat(index:number):number
    getInt(index:number):number
    getList(index:number):INBTList
    getLong(index:number):number
    getNBTTagList():any
    getShort(index:number):number
    getString(index:number):string
    has(index:number):boolean
    remove(index:number):void
    setBoolean(index:number, value:boolean):void
    setByte(index:number, value:number):void
    setCompound(index:number, value:INBTCompound):void
    setDouble(index:number, value:number):void
    setFloat(index:number, value:number):void
    setInt(index:number, value:number):void
    setList(index:number, value:INBTList):void
    setLong(index:number, value:number):void
    setShort(index:number, value:number):void
    setString(index:number, value:string):void
}

declare interface IScriptBlockState{
    getBlockId():string
    getMeta():number
    getMinecraftBlockState():any
    isAir():boolean
    isSame(blockState:IScriptBlockState):boolean
    isSameBlock(blockState:IScriptBlockState):boolean
}

declare interface IScriptEntity{

    readonly x:number
    readonly y:number
    readonly z:number
    applyPotion(potion:Potion, duration:number, amplifier:number, particles:boolean):void
    clearPotions():void
    damage(health:number):void
    damageAs(entity:IScriptEntity, health:number):void
    damageWithItemAs(player:IScriptPlayer):void
    displayMorph(morph:AbstractMorph, expiration:number, x:number, y:number, z:number, rotate:boolean):void
    displayMorph(morph:AbstractMorph, expiration:number, x:number, y:number, z:number, yaw:number, pitch:number, rotate:boolean):void
    displayMorph(morph:AbstractMorph, expiration:number, x:number, y:number, z:number):void
    readonly entityData:INBTCompound
    readonly entityId:string
    fallDistance:number
    fullData:INBTCompound
    readonly height:number
    hp:number
    readonly look:ScriptVector
    mainhandItem:IScriptItemStack
    maxHp:number
    readonly minecraftEntity:any
    readonly motion:ScriptVector
    readonly name:string
    offItem:IScriptItemStack
    readonly pitch:number
    readonly position:ScriptVector
    readonly rotations:ScriptVector
    readonly states:IMappetStates
    target:IScriptEntity
    readonly ticks:number
    readonly uniqueId:string
    readonly width:number
    readonly yaw:number
    readonly yawHead:number
    readonly world:IScriptWorld
    hasPotion(potion:Potion):boolean
    isAIEnabled():boolean
    isBurning():boolean
    isLivingBase():boolean
    isNpc():boolean
    isPlayer():boolean
    isSame(entity:IScriptEntity):boolean
    isSneaking():boolean
    isSprinting():boolean
    kill():void
    rayTrace(maxDistance:number):IScriptRayTrace
    rayTraceBlock(maxDistance:number):IScriptRayTrace
    remove():void
    removePotion(potion:Potion):boolean
    setAIEnabled(enabled:boolean):void
    setBurning(seconds:number):void
    setMorph(morph:AbstractMorph):void
    setMotion(x:number, y:number, z:number):void
    setPosition(x:number, y:number, z:number):void
    setRotations(pitch:number, yay:number, yawHead:number):void
    setSpeed(speed:number):void
    swingArm(arm:0|1):void
    swingArm():void
}

declare interface IScriptEvent{
    cancel():void
    executeCommand(command:string):number
    readonly function:string
    readonly NPC:IScriptNpc
    readonly world:IScriptWorld
    readonly object:IScriptEntity
    readonly player:IScriptPlayer
    readonly script:string
    readonly server:IScriptServer
    readonly subject:IScriptEntity
    getValue(key:string):object
    readonly values:any
    send(message:string):void
    scheduleScript(delay:number, func:Function):void
    scheduleScript(delay:number):void
    scheduleScript(script:string, func:string, delay:number):void
}


declare interface IScriptFactory{
    createBlockItem(blockId:string, count:number, meta:number):IScriptItemStack
    createBlockItem(blockId:string, count:number):IScriptItemStack
    createBlockItem(blockId:string):IScriptItemStack
    createBlockState(blockId:string, meta:number):IScriptBlockState
    createCompound(nbt:string):INBTCompound
    createCompound():INBTCompound
    createCompoundFromJS(jsObject:object):INBTCompound
    createItem(compound:INBTCompound):IScriptItemStack
    createItem(itemId:string, count:number, meta:number):IScriptItemStack
    createItem(itemId:string, count:number):IScriptItemStack
    createItem(itemId:string):IScriptItemStack
    createItemNBT(nbt:string):IScriptItemStack
    createList(nbt:string):INBTList
    createList():INBTList
    createListFromJS(jsObject:object):INBTList
    createMorph(compound:INBTCompound):AbstractMorph
    createMorph(nbt:string):AbstractMorph
    createUI(event:IScriptEvent, func:string):IMappetUIBuilder
    createUI(script:string, func:string):IMappetUIBuilder
    createUI():IMappetUIBuilder
    dump(object:object, simple:boolean):string
    dump(object:object):string
    get(key:string):string
    getParticleType(type:string):EnumParticleTypes
    getPotion(type:string):Potion
    set(key:string, object:object):void
}

declare interface IScriptInventory{
    clear():void
    readonly minecraftInventory:any
    name:string
    getStack(index:number):IScriptItemStack
    hasCustomName():boolean
    isEmpty():boolean
    removeStack(index:number):IScriptItemStack
    setStack(index:number, stack:IScriptItemStack):void
    size():number
}

declare interface  IScriptItem{
    readonly id:string
    readonly minecraftItem:any
    isSame(item:IScriptItem):boolean
}

declare interface IScriptItemStack{
    count:number
    data:INBTCompound
    readonly item:IScriptItem
    meta:number
    minecraftItemStack:any
    hasData():boolean
    isEmpty():boolean
    serialize():INBTCompound
}

declare interface IScriptNpc extends IScriptEntity{
    readonly mappetNpc:any
    readonly npcId:string
}

declare interface IScriptPlayer extends IScriptEntity{
    addXp(points:number):void
    changeHUDMorph(id:string, index:number, morph:AbstractMorph):void
    closeAllHUD():void
    closeHUD(id:string):void
    closeUI():void
    readonly enderChest:IScriptInventory
    readonly inventory:IScriptInventory
    gamemode:number
    readonly minecraftPlayer:any
    readonly quests:IMappetQuests
    readonly skin:string
    readonly UIContext:IMappetUIContext
    getXpLevel():number
    getXpPoints():number
    openUI(builder:IMappetUIBuilder, defaultData:boolean):boolean
    openUI(builder:IMappetUIBuilder):boolean
    playSound(event:string, x:number, y:number, z:number, volume:number, pitch:number):void
    playSound(event:string, x:number, y:number, z:number):void
    playStaticSound(event:string, volume:number, pitch:number):void
    send(message:string):void
    sendActionBar(title:string):void
    sendRaw(message:INBT):void
    sendSubtitle(title:string):void
    sendTitle(title:string):void
    sendTitleDurations(fadeIn:number, idle:number, fadeOut:number):void
    setupHUD(id:string):boolean
    setXp(level:number, points:number)
}

declare interface  IScriptRayTrace{
    readonly block:ScriptVector
    readonly entity:IScriptEntity
    readonly hitPosition:ScriptVector
    readonly minecraftRayTraceResult:any
    isBlock():boolean
    isEntity():boolean
    isMissed():boolean
}

declare interface IScriptServer{
    readonly allPlayers:IScriptPlayer[]
    getEntities(targetSelector:string):IScriptEntity[]
    getEntity(uuid:string):IScriptEntity
    readonly minecraftServer:any
    getPlayer(username:string):IScriptPlayer
    readonly states:IMappetStates
    getWorld(dimension:number):IScriptWorld
}

declare interface IScriptTileEntity{
    data:INBTCompound
    readonly id:string
    readonly minecraftTileEntity:any
    readonly tileData:INBTCompound
    isInvalid():boolean
}

declare interface IScriptWorld{
    displayMorph(morph:AbstractMorph, expiration:number, x:number, y:number, z:number, yaw:number, pitch:number, range:number):void
    displayMorph(morph:AbstractMorph, expiration:number, x:number, y:number, z:number, yaw:number, pitch:number):void
    displayMorph(morph:AbstractMorph, expiration:number, x:number, y:number, z:number, range:number):void
    displayMorph(morph:AbstractMorph, expiration:number, x:number, y:number, z:number):void
    dropItemStack(stack:IScriptItemStack, x:number, y:number, z:number, mx:number, my:number, mz:number):IScriptEntity
    dropItemStack(stack:IScriptItemStack, x:number, y:number, z:number):IScriptEntity
    getBlock(x:number, y:number, z:number):IScriptBlockState
    readonly dimensionId:number
    getEntities(x1:number, y1:number, z1:number, x2:number, y2:number, z2:number):IScriptEntity[]
    getEntities(x1:number, y1:number, z1:number, radius:number):IScriptEntity[]
    getInventory(x:number, y:number, z:number):IScriptInventory
    readonly minecraftWorld:any
    getTileEntity(x:number, y:number, z:number):IScriptTileEntity
    time:number
    readonly totalTime:number
    hasInventory(x:number, y:number, z:number):boolean
    hasTileEntity(x:number, y:number, z:number):boolean
    isRaining():boolean
    playSound(event:string, x:number, y:number, z:number, volume:number, pitch:number):void
    playSound(event:string, x:number, y:number, z:number):void
    setBlock(state:IScriptBlockState, x:number, y:number, z:number):void
    setRaining(raining:boolean):void
    spawnEntity(id:string, x:number, y:number, z:number, compound:INBTCompound):IScriptEntity
    spawnEntity(id:string, x:number, y:number, z:number):IScriptEntity
    spawnNpc(id:string, x:number, y:number, z:number):IScriptEntity
    spawnNpc(id:string, state:string, x:number, y:number, z:number):IScriptEntity
    spawnParticles(type:EnumParticleTypes, longDistance:boolean, x:number, y:number, z:number, n:number, dx:number, dy:number, dz:number, speed:number, args:number):void
    spawnParticles(player:IScriptPlayer, type:EnumParticleTypes, longDistance:boolean, x:number, y:number, z:number, n:number, dx:number, dy:number, dz:number, speed:number, args:number):void
}

//UI API

declare interface Graphic{
    anchor(x:number, y:number):Graphic
    anchor(anchor:number):Graphic
    anchorY(x:number):Graphic
    anchorX(x:number):Graphic
    h(value:number):Graphic
    hoverOnly():Graphic
    rh(value:number, offset:number):Graphic
    rh(value:number):Graphic
    rw(value:number, offset:number):Graphic
    rw(value:number):Graphic
    rwh(w:number, h:number):Graphic
    rx(value:number, offset:number):Graphic
    rx(value:number):Graphic
    rxy(x:number, y:number):Graphic
    ry(value:number, offset:number):Graphic
    ry(value:number):Graphic
    w(value:number):Graphic
    wh(w:number, h:number):Graphic
    x(value:number):Graphic
    xy(x:number, y:number):Graphic
    y(y:number):Graphic
}

declare interface UIButtonComponent extends UIComponent{
    apply(element:any, context:IMappetUIContext):any
    applyProperty(context:IMappetUIContext, key:string, element:any):void
    background(background:number):UIButtonComponent
    color(color:number, shadow:boolean):UIButtonComponent
    color(color:number):UIButtonComponent
    deserializeNBT(tag:any):void
    label(label:string):UIButtonComponent
    noBackground():UIButtonComponent
    serializeNBT(tag:any):void
}

declare interface UIClickComponent extends UIComponent{

}

declare interface UIComponent{
    anchor(x:number, y:number):this
    anchor(anchor:number):this
    anchorY(x:number):this
    anchorX(x:number):this
    context(icon:string, action:string, label:string, color:number):this
    context(icon:string, action:string, label:string):this
    createContext(menu:any, element:any, context:IMappetUIContext):void
    enabled(enabled:boolean):this
    h(value:number):this
    id(id:string):this
    keybind(keyCode:number, action:string, label:string, ctrl:boolean, shift:boolean, alt:boolean):this
    keybind(keyCode:number, action:string, label:string, ctrl:boolean, shift:boolean):this
    keybind(keyCode:number, action:string, label:string, ctrl:boolean):this
    keybind(keyCode:number, action:string, label:string):this
    margin(margin:number):this
    marginBottom(margin:number):this
    marginLeft(margin:number):this
    marginRight(margin:number):this
    marginTop(margin:number):this
    resetContext(element:any, context:IMappetUIContext):void
    rh(value:number, offset:number):this
    rh(value:number):this
    rw(value:number, offset:number):this
    rw(value:number):this
    rwh(w:number, h:number):this
    rx(value:number, offset:number):this
    rx(value:number):this
    rxy(x:number, y:number):this
    ry(value:number, offset:number):this
    ry(value:number):this
    tooltip(tooltip:string, direction:0|1|2|3):this
    tooltip(tooltip:string):this
    updateDelay(updateDelay:number):this
    visible(visible:boolean):this
    w(value:number):this
    wh(w:number, h:number):this
    x(value:number):this
    xy(x:number, y:number):this
    y(value:number):this
}

declare interface UIGraphicsComponent extends UIComponent{
    gradient(primary:number, secondary:number, horizontal:boolean):Graphic
    gradient(x:number, y:number, w:number, h:number, primary:number, secondary:number, horizontal:boolean):Graphic
    gradient(x:number, y:number, w:number, h:number, primary:number, secondary:number):Graphic
    gradient(primary:number, secondary:number):Graphic
    icon(icon:string, x:number, y:number, color:number, anchorX:number, anchorY:number):Graphic
    icon(icon:string, x:number, y:number, color:number):Graphic
    image(image:string, x:number, y:number, w:number, h:number, textureWidth:number, textureHeight:number, primary:number):Graphic
    image(image:string, x:number, y:number, w:number, h:number, textureWidth:number, textureHeight:number):Graphic
    image(image:string, x:number, y:number, w:number, h:number):Graphic
    image(image:string, textureWidth:number, textureHeight:number, primary:number):Graphic
    image(image:string, textureWidth:number, textureHeight:number):Graphic
    rect(x:number, y:number, w:number, h:number, color:number):Graphic
    rect(color:number):Graphic
    removeAll():UIGraphicsComponent
    shadow(x:number, y:number, w:number, h:number, primary:number, secondary:number, offset:number):Graphic
    shadow(primary:number, secondary:number, offset:number):Graphic
    text(text:string, x:number, y:number, color:number, anchorX:number, anchorY:number):Graphic
    text(text:string, x:number, y:number, color:number, anchorX:number, anchorY:number):Graphic
    text(text:string, x:number, y:number, color:number):Graphic
}

declare interface UIIconButtonComponent extends UIComponent{
    icon(icon:string)
}

declare interface UILabelComponent extends UIComponent{
    apply(element:any, context:IMappetUIContext):any
    applyProperty(context:IMappetUIContext, key:string, element:any):void
    background(background:number):UILabelComponent
    color(color:number, shadow:boolean):UILabelComponent
    color(color:number):UILabelComponent
    label(label:number):UILabelComponent
    labelAnchor(anchorX:number, anchorY:number):UILabelComponent
    labelAnchor(anchor:number):UILabelComponent
    label(anchor:number):UILabelComponent
}

declare interface UILayoutComponent extends UIComponent, IMappetUIBuilder{
    horizontal():UILayoutComponent
    items(items:number):UILayoutComponent
    scroll():UILayoutComponent
    scrollSize(scrollSize:number):UILayoutComponent
    width(width:number):UILayoutComponent
}

declare interface UIMorphComponent extends UIComponent{
    createContext(menu:any, element:any, context:IMappetUIContext):void
    distance(distance:number):UIMorphComponent
    editing(editing:boolean):UIMorphComponent
    editing():UIMorphComponent
    fov(fov:number):UIMorphComponent
    morph(morph:AbstractMorph):UIMorphComponent
    position(x:number, y:number, z:number):UIMorphComponent
    resetContext(element:any, context:IMappetUIContext):void
    rotation(pitch:number, yaw:number):UIMorphComponent
}

declare interface UIStackComponent extends UIComponent{
    stack(stack:IScriptItemStack):UIStackComponent
    stack(stack:any):UIStackComponent
}

declare interface UIStringListComponent extends UIComponent{
    background(background:number):UIStringListComponent
    background():UIStringListComponent
    selected(selected:number):UIStringListComponent
    values(values:any[]):UIStringListComponent
    values(values:string):UIStringListComponent
}

declare interface UITextareaComponent extends UIComponent{
    apply(element:any, context:IMappetUIContext):any
    applyProperty(context:IMappetUIContext, key:string, element:any):void
    background(background:number):UITextareaComponent
    color(color:number, shadow:boolean):UITextareaComponent
    color(color:number):UITextareaComponent
    label(label:string):UITextareaComponent
    noBackground():UITextareaComponent
}

declare interface UITextboxComponent extends UIComponent{
    apply(element:any, context:IMappetUIContext):any
    applyProperty(context:IMappetUIContext, key:string, element:any):void
    color(color:number, shadow:boolean):UITextboxComponent
    color(color:number):UITextboxComponent
    label(label:string):UITextboxComponent
    maxLength(maxLength:number):UITextboxComponent
    noBackground():UITextboxComponent
}

declare interface UITextComponent extends UIComponent{
    apply(element:any, context:IMappetUIContext):any
    applyProperty(context:IMappetUIContext, key:string, element:any):void
    color(color:number, shadow:boolean):UITextComponent
    color(color:number):UITextComponent
    deserializeNBT(tag:any):void
    label(label:string):UITextComponent
    serializeNBT(tag:any):void
    textAnchor(anchor:number):UITextComponent
}

declare interface UIToggleComponent extends UIComponent{
    apply(element:any, context:IMappetUIContext):any
    applyProperty(context:IMappetUIContext, key:string, element:any):void
    color(color:number, shadow:boolean):UIToggleComponent
    color(color:number):UIToggleComponent
    label(label:string):UIToggleComponent
    state(state:boolean):UIToggleComponent
}

declare interface UITrackpadComponent extends UIComponent{
    amplitudes(normal:number, weak:number, strong:number):UITrackpadComponent
    amplitudes(normal:number):UITrackpadComponent
    increment(increment:number):UITrackpadComponent
    integer(integer:boolean):UITrackpadComponent
    integer():UITrackpadComponent
    limit(min:number, max:number, integer:boolean):UITrackpadComponent
    limit(min:number, max:number):UITrackpadComponent
    max( max:number):UITrackpadComponent
    min(min:number):UITrackpadComponent
    value(value:number):UITrackpadComponent
}

//Utils
type anyUIComponent = UITrackpadComponent
    |UIToggleComponent
    |UITextboxComponent
    |UIMorphComponent
    |UITextComponent
    |UIStringListComponent
    |UIStackComponent
    |UILayoutComponent
    |UILabelComponent
    |UIGraphicsComponent
    |UIButtonComponent
    |UIIconButtonComponent
    |UIClickComponent

type ScriptVector = {
    readonly x:number,
    readonly y:number,
    readonly z:number,
}
type Potion = any
type EnumParticleTypes = any
type AbstractMorph = any








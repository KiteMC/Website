# 基础指令

## 1. 玩家常用指令

### 随机传送 (Random Teleport)
- `/rtp`：将玩家随机传送到一个安全的位置。

### 玩家传送 (Teleport)
- `/tpa <玩家名>`：请求传送到指定玩家的位置。
- `/tpa <玩家名> <目标玩家名>`：请求将指定玩家传送到目标玩家的位置。
- `/tpaccept`：接受传送请求。
- `/tpdeny`：拒绝传送请求。

### 家的设置与传送 (Home)
- `/sethome <家名>`：设置一个名为 `<家名>` 的家。
- `/home <家名>`：传送到名为 `<家名>` 的家。
- `/delhome <家名>`：删除名为 `<家名>` 的家。
- `/homes`：列出所有已设置的家。

### 假玩家 (FakePlayer)
- `/fp spawn <玩家名>`：生成指定名称的假玩家
- `/fp kill <玩家名>`：移除指定假玩家
- `/fp tp <玩家名>`：传送至指定假玩家位置
- `/fp tphere <玩家名>`：将假玩家传送至当前位置
- `/fp invsee <玩家名>`：查看假玩家背包内容

## 2. nightcore
- `/nightcore [help]`：所有插件命令的列表.

- `/nightcore reload`：重新加载插件（仅限 config）.

- `/nightcore checkperm <player>`：检查玩家的权限数据.

- `/nightcore dumpitem`：获取手上物品的 NBT 字符串.

## 3. AntiPopup
- `/antipopup setup`：在控制台运行，禁用 `enforce-secure-profile`.

- `/antipopup reload`：重新加载配置文件.

## 4. AntiSeedCracker
- `/antiseedcracker reload`：重新加载插件配置.

## 5. AuthMe
- `/authme login <username> <password>`：玩家登录.

- `/authme register <password> <password>`：玩家注册.

- `/authme logout`：玩家注销.

- `/authme forceauth`：强制所有玩家登录.

- `/authme reload`：重新加载插件配置.

## 6. BellCommand
- `/bc give <player> <itemID> [amount]`：给予玩家指定的命令物品.

- `/bc list`：查看可用的命令物品列表.

- `/bc reload`：重新加载插件配置.

:::tip
The plugin is no longer maintained after version #13
:::

## 7. Chunky
- `/chunky start`：开始新的区块生成任务.

- `/chunky pause`：暂停当前的区块生成任务.

- `/chunky continue`：继续运行当前或保存的区块生成任务.

- `/chunky cancel`：停止当前的区块生成任务并取消进度.

- `/chunky world [world]`：设置当前选择的世界.

- `/chunky shape <shape>`：设置生成的形状.

- `/chunky center [<x> <z>]`：设置当前中心块位置.

- `/chunky radius <radius>`：设置当前半径.

- `/chunky worldborder`：将中心和半径设置为选定世界的边界.

- `/chunky spawn`：将中心设置为出生点.

- `/chunky corners <x1> <z1> <x2> <z2>`：通过角坐标设置选择区域.

- `/chunky pattern <pattern>`：设置首选生成模式.

- `/chunky selection`：显示当前选择.

- `/chunky silent`：切换显示更新消息.

- `/chunky quiet <interval>`：设置更新消息的静音间隔（秒）.

- `/chunky progress`：在游戏中显示所有任务的预生成进度.

- `/chunky reload`：重新加载配置.

- `/chunky trim`：删除选择区域外的区块.

## 8. CommandAPI
- **无基础指令**：CommandAPI 是一个用于创建自定义命令的开发工具，主要用于插件开发，不提供直接的玩家指令.

## 9. ExcellentEnchants
- `/excellentenchants [help]`：显示插件所有命令.

- `/excellentenchants reload`：重载插件.

- `/excellentenchants book <玩家> <附魔书名字> <等级>`：给玩家特定附魔书.

- `/excellentenchants tierbook <玩家> <品质> <等级>`：给予玩家随机品质附魔书.

- `/excellentenchants enchant <附魔名称> <等级>`：附魔手中物品，等级设置为0清除附魔.

- `/excellentenchants list`：打开所有附魔书界面.

## 10. Jobs
- `/jobs reload`：重载插件.

- `/jobs signupdate [职业名]`：手动更新某个职业的排行告示牌.

- `/jobs convert`：转移玩家数据.

- `/jobs give [玩家名] [职业名] [items/limiteditems] [物品名]`：给予职业物品.

- `/jobs pointboost [职业名] [加成倍数]`：给予所有玩家指定职业点数加成.

- `/jobs moneyboost [职业名] [加成倍数]`：给予所有玩家指定职业金币加成.

- `/jobs expboost [职业名] [加成倍数]`：给予所有玩家指定职业经验加成.

- `/jobs removeexp [玩家名] [职业名] [XP量]`：扣除指定玩家指定职业指定数量的经验.

- `/jobs grantxp [玩家名] [职业名] [XP量]`：给予指定玩家指定职业指定数量的经验.

- `/jobs fireall [玩家名]`：强行让某个玩家辞退它加入的所有职业.

- `/jobs fire [玩家名] [职业名]`：强行让某个玩家辞退它加入的某个职业.

- `/jobs bp`：查找你附近十格内受到保护的方块.

- `/jobs employ [玩家名] [职业名]`：强行让某玩家加入某职业.

- `/jobs demote [玩家名] [职业名] [级数]`：扣除指定玩家指定职业指定数量的等级.

- `/jobs promote [玩家名] [职业名] [级数]`：给予指定玩家指定职业指定数量的等级.

- `/jobs exp [玩家名] [职业名] set/add/take [数量]`：编辑玩家指定职业的经验.

- `/jobs explored`：查看哪些玩家探索了这个区块.

- `/jobs transfer [玩家名] [旧职业] [新职业]`：将玩家当前加入的一个职业转为另一个职业.

- `/jobs blockinfo`：显示鼠标所指方块的信息.

- `/jobs iteminfo`：查看手中物品的信息.

- `/jobs archive [玩家名]`：查看该玩家加入的职业.

- `/jobs placeholders`：查看插件变量.

- `/jobs playerinfo [玩家名] [职业名] [奖励类型]`：查看指定玩家指定职业的之夜奖励类型列表.

- `/jobs glog`：查看全服统计数据.

- `/jobs log [玩家名]`：查看指定玩家统计数据.

- `/jobs toggle actionbar/bossbar`：切换奖励提示的显示类型.

- `/jobs leaveall`：辞退你所有加入的职业.

- `/jobs leave [职业名]`：辞退某个你已加入的职业.

- `/jobs shop`：打开职业商店.

- `/jobs edititembouns list/add/remove [职业名] [加成物品ID]`：编辑加成物品.

- `/jobs editquests`：编辑当前已有任务.

- `/jobs skipquest [职业名] [任务名] [玩家名]`：使玩家跳过某个任务并重新获取一个新任务.

- `/jobs resetquest [玩家名] [职业名]`：重置指定玩家的任务数据.

- `/jobs limit [玩家名]`：查看指定玩家职业奖励限制信息.

- `/jobs resetlimit [玩家名]`：重置指定玩家职业奖励限制信息.

- `/jobs gtop`：显示全服排名前X位的玩家.

- `/jobs top [职业名]`：显示某职业的排行榜.

- `/jobs editpoints set/add/take [玩家名] [数量]`：编辑玩家指定职业的点数信息.

- `/jobs editjobs`：编辑当前职业.

- `/jobs points [玩家名]`：显示某玩家的点数信息.

- `/jobs stats [玩家名]`：显示指定玩家所加入职业的统计信息.

- `/jobs quests [玩家名]`：列出指定玩家正在进行的任务.

- `/jobs clearownership [玩家名]`：删除玩家方块的所有权.

- `/jobs area add/remove/info/list`：编辑职业限制区域.

- `/jobs bouns [职业名]`：显示职业加成.

- `/jobs info [职业名] [奖励类型]`：查看指定职业指定的奖励类型对应的奖励数.

- `/jobs browse`：列出你当前可加入的职业.

- `/jobs itembouns`：显示物品加成信息.

- `/jobs join [职业名]`：加入指定职业.

## 11. LuckPerms
- `/lp user <username> permission set <permission>`：为指定玩家设置权限.

- `/lp group <groupname> permission set <permission>`：为指定群组设置权限.

- `/lp user <username> parent add <groupname>`：将玩家添加到指定群组.

- `/lp group <groupname> parent add <parentgroup>`：设置群组的父级群组.

- `/lp user <username> info`：查看玩家的权限信息.

- `/lp group <groupname> info`：查看群组的权限信息.

- `/lp reload`：重新加载插件配置.

## 12. MiniMOTD
- `/minimotd reload`：重载插件配置.

## 13. Orebfuscator
- **无基础指令**：Orebfuscator 是一个反X射线插件，主要通过配置文件进行设置，不提供直接的玩家指令.

## 14. PlaceholderAPI
- `/papi bcparse <玩家|--null|me> <内容>`：解析占位符内容并广播给指定玩家或所有人.

- `/papi cmdparse <玩家|me> <内容>`：解析占位符内容并作为命令执行.

- `/papi parse <玩家|--null|me> <内容>`：解析占位符内容并输出结果.

- `/papi parserel <玩家> <玩家> <内容>`：解析占位符内容，基于两个玩家的关系.

- `/papi ecloud status`：查看 PlaceholderAPI 云扩展服务的状态.

- `/papi ecloud clear`：清除所有已下载的云扩展.

- `/papi ecloud download <变量扩展名称> [版本]`：下载指定的云扩展，可指定版本.

- `/papi ecloud update <变量扩展名称/all>`：更新指定扩展或所有扩展.

- `/papi ecloud info <变量扩展名称> [版本]`：查看扩展的详细信息.

- `/papi ecloud list <all|<作者>|installed> [页数]`：列出所有、指定作者或已安装的扩展.

- `/papi ecloud placeholders <变量扩展名称>`：列出扩展支持的占位符.

- `/papi ecloud refresh`：刷新云扩展列表.

- `/papi info <变量扩展名称>`：查看本地扩展的详细信息.

- `/papi list`：列出所有已安装的扩展.

- `/papi register <jar文件名>`：注册一个扩展文件.

- `/papi unregister <变量扩展名称>`：注销一个扩展.

## 15. Plan
- **无基础指令**：Plan 是一个玩家数据分析插件，主要通过Web界面查看统计信息，不提供直接的玩家指令.

## 16. PlayerDataRollback
- `/pld backup create <backup name>`：创建玩家数据备份.

- `/pld list (xd/xm/xy)`：列出指定时间段内的备份.

- `/pld page <number>`：浏览备份列表的分页.

- `/pld rollback <playername> <backup name>`：回滚指定玩家的数据到指定备份.

- `/pld rollbackall <backup name>`：回滚所有玩家的数据到指定备份.

- `/pld backup remove <backup name>`：删除指定备份.

- `/pld backup removeall <xd/xm/xy>`：删除指定时间段内的所有备份.

## 17. PlayerMenu
- `/plm reload`：重载插件.

- `/plm create (大小)`：创建菜单.

- `/plm view [菜单名]`：编辑菜单.

- `/plm getMaterial`：获取物品材质.

- `/plm open [菜单名] (变量来源玩家名)`：玩家自己打开菜单.

- `/plm close`：关闭菜单（1.2.1+）.

- `/plm adminOpen [菜单名] [玩家名] (变量来源玩家名)`：给玩家打开对应菜单界面（1.3.1+）.

- `/plm clock`：获取当前配置的物品菜单（1.3.3+）.

## 18. ProtocolLib
- `/protocol config`：重新加载配置文件.

- `/protocol check`：检查 BukkitDev 上的新版本.

- `/protocol version`：显示当前正在运行的 ProtocolLib 版本.

- `/protocol timings`：切换测量每个插件花费的 CPU 时间.

- `/protocol listeners`：显示哪些插件正在使用 ProtocolLib，以及它们正在拦截的数据包类型.

- `/packetlog [file/console]`：将数据包的十六进制表示记录到文件或控制台.

## 19. QuickShop-Hikari
- `/quickshop create <price> [item]`：创建一个商店.

- `/quickshop price <price>`：更改商店的买卖价格.

- `/quickshop buy`：将商店设置为购买模式.

- `/quickshop sell`：将商店设置为出售模式.

- `/quickshop setowner <player>`：更改商店的所有者.

- `/quickshop unlimited`：切换商店的无限模式.

- `/quickshop clean`：清理所有没有库存的商店.

- `/quickshop find <item>`：查找最近的出售指定物品的商店.

- `/quickshop info`：显示 QuickShop 的信息.

- `/quickshop debug`：启用/禁用调试模式.

- `/quickshop paste`：收集有用的信息并将其粘贴到 Pastebin.

- `/quickshop export`：导出所有商店数据到一个 ZIP 文件.

- `/quickshop recovery`：从 TXT 文件或 Paste 恢复所有商店.

- `/quickshop cleanghost`：移除所有损坏的商店.

- `/quickshop removeworld`：移除指定世界中的所有商店.

- `/quickshop name`：为商店命名或取消命名.

- `/quickshop permission`：调整商店的权限.

- `/quickshop database`：查看和管理 QuickShop-Hikari 的状态.

- `/quickshop benefit`：查看和管理商店的福利.

## 20. Residence
- `/res create <name>`：创建一个新的领地.

- `/res delete <name>`：删除一个领地.

- `/res list`：列出所有领地.

- `/res info <name>`：查看领地信息.

- `/res claim`：声称当前所在区域为领地.

- `/res setflag <name> <flag> <value>`：设置领地的标志（如允许或禁止建造）.

- `/res setgroup <name> <group>`：设置领地的访问权限组.

- `/res setowner <name> <player>`：设置领地的所有者.

- `/res reload`：重新加载 Residence 配置.

## 21. kinsRestorer
- `/skin <player>`：玩家可以通过此命令更改自己的皮肤.

- `/skin reload`：重新加载 SkinsRestorer 配置.

- `/skin list`：列出可用的皮肤.

- `/skin set <player> <skin>`：管理员可以为其他玩家设置皮肤.

## 22. TAB
- `/tab reload`: 卸载本插件，然后读取被修改后的配置文件并重新加载插件.

- `/tab <玩家/组/玩家uuid> <名称> <属性> [值]`: 为一个组或者玩家更改其对应属性的值.

- `/tab <玩家/组/玩家uuid> <名称> remove`: 移除该组或者玩家的所有数据.

- `/tab debug [玩家]`: 展示服务端的版本、插件版本、权限组选择逻辑和排序类型.

- `/tab cpu`: 显示10秒后插件的大致CPU使用率.

- `/tab announce bar <名称> <时长>`: 给所有在线玩家展示指定名称的BOSS条信息，可指定持续时长(秒).

- `/tab send bar <玩家> <名称> <时长>`: 向指定玩家展示指定名称的BOSS条信息，可指定持续时长(秒).

- `/tab announce scoreboard <名称> <时长>`: 向所有玩家展示指定名称的计分板，可指定持续时长(秒).

- `/tab scoreboard show <名称> [玩家]`: 展示指定名称的计分板.

- `/tab ntpreview`: 预览无限制名称标签模式下的头顶显示效果.

- `/tab parse <文本>`: 测试变量符替换效果.

- `/tab setcollision <玩家> <true|false>`: 设置玩家是否会和其他实体碰撞.

## 23. Vault
- `无基础指令`：Vault 是一个用于管理经济系统的插件，主要用于游戏经济系统，不提供直接的玩家指令.

## 24. ViaVersion
- `/viaversion reload`：从硬盘重载配置文件.

- `/viaversion help`：显示插件帮助信息.

- `/viaversion debug`：切换调试模式，在控制台和日志中输出数据包翻译信息.

- `/viaversion autoteam`：切换是否自动将计分板玩家分组以避免冲突.

- `/viaversion pps`：显示在线玩家每秒发送的数据包数量.

- `/viaversion dontbugme`：切换是否自动检查更新.

- `/viaversion list`：显示在线玩家使用的版本列表.

- `/viaversion displayleaks`：尝试寻找内存泄露（内部调试用）.

- `/viaversion dump`：导出服务器信息（版本、插件配置等），用于反馈问题.

## 25. WorldAliasVariables
- `/wav reload`：重载配置文件.

- `/wav set <世界名> <别名>`：设置世界别名.

- `/wav list`：查看所有世界别名.

## 26. WorldManager
- `/worldmanager create <worldname>`：创建一个新的世界.

- `/worldmanager delete <worldname>`：删除一个世界.

- `/worldmanager list`：列出所有世界.

- `/worldmanager load <worldname>`：加载一个世界.

- `/worldmanager unload <worldname>`：卸载一个世界.

- `/worldmanager setspawn <worldname>`：设置一个世界的出生点.

- `/worldmanager reload`：重新加载 WorldManager 配置.

## 27. fakeplayer
- `/fp spawn <playername>`：生成一个假玩家.

- `/fp kill <playername>`：杀死一个假玩家

- `/fp killall`：杀死所有假玩家

- `/fp list`：列出所有假玩家

- `/fp tp <playername>`：传送到一个假玩家.

- `/fp tphere <playername>`：将一个假玩家传送到你所在的位置.

- `/fp invsee <playername>`：查看假玩家的背包.

- `/fp reload`：重新加载 fakeplayer 配置.

## 28. floodgate
- `无基础指令`：floodgate 是一个用于处理 Bedrock 版本玩家连接的插件，主要用于服务器跨平台支持，不提供直接的玩家指令.

:::tip
The plugin is no longer maintained after version #13
:::
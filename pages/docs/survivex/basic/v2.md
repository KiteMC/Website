# Basic Commands

## 1. Player Common Commands

### Random Teleport
- `/rtp`：Teleport the player to a random safe location.

### Player Teleport
- `/tpa <player_name>`：Request to teleport to the specified player's location.
- `/tpa <player_name> <target_player_name>`：Request to teleport the specified player to the target player's location.
- `/tpaccept`：Accept teleport request.
- `/tpdeny`：Deny teleport request.

### Home Setting and Teleport
- `/sethome <home_name>`：Set a home named `<home_name>`.
- `/home <home_name>`：Teleport to the home named `<home_name>`.
- `/delhome <home_name>`：Delete the home named `<home_name>`.
- `/homes`：List all set homes.

### FakePlayer
- `/fp spawn <player_name>`：Spawn a fake player with the specified name
- `/fp kill <player_name>`：Remove the specified fake player
- `/fp tp <player_name>`：Teleport to the specified fake player's location
- `/fp tphere <player_name>`：Teleport the fake player to your current location
- `/fp invsee <player_name>`：View the fake player's inventory contents

## 2. nightcore
- `/nightcore [help]`：List of all plugin commands.

- `/nightcore reload`：Reload the plugin (config only).

- `/nightcore checkperm <player>`：Check player's permission data.

- `/nightcore dumpitem`：Get the NBT string of the item in hand.

## 3. AntiPopup
- `/antipopup setup`：Run in console to disable `enforce-secure-profile`.

- `/antipopup reload`：Reload configuration file.

## 4. AuthMe
- `/authme login <username> <password>`：Player login.

- `/authme register <password> <password>`：Player registration.

- `/authme logout`：Player logout.

- `/authme forceauth`：Force all players to login.

- `/authme reload`：Reload plugin configuration.

## 5. BellCommand
- `/bc give <player> <itemID> [amount]`：Give the specified command item to a player.

- `/bc list`：View available command item list.

- `/bc reload`：Reload plugin configuration.

:::tip
The plugin is no longer maintained after version #13
:::

## 6. Chunky
- `/chunky start`：Start a new chunk generation task.

- `/chunky pause`：Pause the current chunk generation task.

- `/chunky continue`：Continue running the current or saved chunk generation task.

- `/chunky cancel`：Stop the current chunk generation task and cancel progress.

- `/chunky world [world]`：Set the currently selected world.

- `/chunky shape <shape>`：Set the generation shape.

- `/chunky center [<x> <z>]`：Set the current center block position.

- `/chunky radius <radius>`：Set the current radius.

- `/chunky worldborder`：Set center and radius to the selected world's border.

- `/chunky spawn`：Set center to spawn point.

- `/chunky corners <x1> <z1> <x2> <z2>`：Set selection area through corner coordinates.

- `/chunky pattern <pattern>`：Set preferred generation pattern.

- `/chunky selection`：Show current selection.

- `/chunky silent`：Toggle update message display.

- `/chunky quiet <interval>`：Set silent interval for update messages (seconds).

- `/chunky progress`：Show pre-generation progress of all tasks in-game.

- `/chunky reload`：Reload configuration.

- `/chunky trim`：Delete chunks outside the selection area.

## 7. CommandAPI
- **No basic commands**：CommandAPI is a development tool for creating custom commands, mainly used for plugin development, and does not provide direct player commands.

## 8. ExcellentEnchants
- `/excellentenchants [help]`：Display all plugin commands.

- `/excellentenchants reload`：Reload the plugin.

- `/excellentenchants book <player> <enchantment_book_name> <level>`：Give a specific enchantment book to a player.

- `/excellentenchants tierbook <player> <quality> <level>`：Give a random quality enchantment book to a player.

- `/excellentenchants enchant <enchantment_name> <level>`：Enchant the item in hand, set level to 0 to clear enchantment.

- `/excellentenchants list`：Open all enchantment book interface.

## 9. Jobs
- `/jobs reload`：Reload the plugin.

- `/jobs signupdate [job_name]`：Manually update a job's ranking sign.

- `/jobs convert`：Transfer player data.

- `/jobs give [player_name] [job_name] [items/limiteditems] [item_name]`：Give job items.

- `/jobs pointboost [job_name] [multiplier]`：Give all players specified job point boost.

- `/jobs moneyboost [job_name] [multiplier]`：Give all players specified job money boost.

- `/jobs expboost [job_name] [multiplier]`：Give all players specified job experience boost.

- `/jobs removeexp [player_name] [job_name] [XP_amount]`：Deduct specified XP from specified player's specified job.

- `/jobs grantxp [player_name] [job_name] [XP_amount]`：Give specified XP to specified player's specified job.

- `/jobs fireall [player_name]`：Force a player to quit all jobs they joined.

- `/jobs fire [player_name] [job_name]`：Force a player to quit a specific job they joined.

- `/jobs bp`：Find protected blocks within 10 blocks around you.

- `/jobs employ [player_name] [job_name]`：Force a player to join a job.

- `/jobs demote [player_name] [job_name] [levels]`：Deduct specified levels from specified player's specified job.

- `/jobs promote [player_name] [job_name] [levels]`：Give specified levels to specified player's specified job.

- `/jobs exp [player_name] [job_name] set/add/take [amount]`：Edit player's specified job experience.

- `/jobs explored`：View which players explored this chunk.

- `/jobs transfer [player_name] [old_job] [new_job]`：Transfer a player from one job to another.

- `/jobs blockinfo`：Display information about the block you're pointing at.

- `/jobs iteminfo`：View information about the item in hand.

- `/jobs archive [player_name]`：View jobs this player joined.

- `/jobs placeholders`：View plugin variables.

- `/jobs playerinfo [player_name] [job_name] [reward_type]`：View specified player's specified job reward type list.

- `/jobs glog`：View server-wide statistics.

- `/jobs log [player_name]`：View specified player's statistics.

- `/jobs toggle actionbar/bossbar`：Toggle reward notification display type.

- `/jobs leaveall`：Quit all jobs you joined.

- `/jobs leave [job_name]`：Quit a specific job you joined.

- `/jobs shop`：Open job shop.

- `/jobs edititembouns list/add/remove [job_name] [boost_item_ID]`：Edit boost items.

- `/jobs editquests`：Edit current existing quests.

- `/jobs skipquest [job_name] [quest_name] [player_name]`：Make a player skip a quest and get a new one.

- `/jobs resetquest [player_name] [job_name]`：Reset specified player's quest data.

- `/jobs limit [player_name]`：View specified player's job reward limit information.

- `/jobs resetlimit [player_name]`：Reset specified player's job reward limit information.

- `/jobs gtop`：Display top X players server-wide.

- `/jobs top [job_name]`：Display a job's leaderboard.

- `/jobs editpoints set/add/take [player_name] [amount]`：Edit player's specified job point information.

- `/jobs editjobs`：Edit current jobs.

- `/jobs points [player_name]`：Display a player's point information.

- `/jobs stats [player_name]`：Display statistics of jobs the specified player joined.

- `/jobs quests [player_name]`：List quests the specified player is currently doing.

- `/jobs clearownership [player_name]`：Delete player's block ownership.

- `/jobs area add/remove/info/list`：Edit job restriction areas.

- `/jobs bouns [job_name]`：Display job bonuses.

- `/jobs info [job_name] [reward_type]`：View specified job's specified reward type reward amount.

- `/jobs browse`：List jobs you can currently join.

- `/jobs itembouns`：Display item bonus information.

- `/jobs join [job_name]`：Join a specified job.

## 10. LuckPerms
- `/lp user <username> permission set <permission>`：Set permission for specified player.

- `/lp group <groupname> permission set <permission>`：Set permission for specified group.

- `/lp user <username> parent add <groupname>`：Add player to specified group.

- `/lp group <groupname> parent add <parentgroup>`：Set group's parent group.

- `/lp user <username> info`：View player's permission information.

- `/lp group <groupname> info`：View group's permission information.

- `/lp reload`：Reload plugin configuration.

## 11. MiniMOTD
- `/minimotd reload`：Reload plugin configuration.

## 12. PlaceholderAPI
- `/papi bcparse <player|--null|me> <content>`：Parse placeholder content and broadcast to specified player or everyone.

- `/papi cmdparse <player|me> <content>`：Parse placeholder content and execute as command.

- `/papi parse <player|--null|me> <content>`：Parse placeholder content and output result.

- `/papi parserel <player> <player> <content>`：Parse placeholder content based on relationship between two players.

- `/papi ecloud status`：View PlaceholderAPI cloud extension service status.

- `/papi ecloud clear`：Clear all downloaded cloud extensions.

- `/papi ecloud download <variable_extension_name> [version]`：Download specified cloud extension, version can be specified.

- `/papi ecloud update <variable_extension_name/all>`：Update specified extension or all extensions.

- `/papi ecloud info <variable_extension_name> [version]`：View extension's detailed information.

- `/papi ecloud list <all|<author>|installed> [page]`：List all, specified author, or installed extensions.

- `/papi ecloud placeholders <variable_extension_name>`：List placeholders supported by the extension.

- `/papi ecloud refresh`：Refresh cloud extension list.

- `/papi info <variable_extension_name>`：View local extension's detailed information.

- `/papi list`：List all installed extensions.

- `/papi register <jar_filename>`：Register an extension file.

- `/papi unregister <variable_extension_name>`：Unregister an extension.

## 13. PlayerDataRollback
- `/pld backup create <backup_name>`：Create player data backup.

- `/pld list (xd/xm/xy)`：List backups within specified time period.

- `/pld page <number>`：Browse backup list pagination.

- `/pld rollback <playername> <backup_name>`：Rollback specified player's data to specified backup.

- `/pld rollbackall <backup_name>`：Rollback all players' data to specified backup.

- `/pld backup remove <backup_name>`：Delete specified backup.

- `/pld backup removeall <xd/xm/xy>`：Delete all backups within specified time period.

## 14. PlayerMenu
- `/plm reload`：Reload the plugin.

- `/plm create (size)`：Create a menu.

- `/plm view [menu_name]`：Edit menu.

- `/plm getMaterial`：Get item material.

- `/plm open [menu_name] (variable_source_player_name)`：Player opens menu themselves.

- `/plm close`：Close menu (1.2.1+).

- `/plm adminOpen [menu_name] [player_name] (variable_source_player_name)`：Open corresponding menu interface for player (1.3.1+).

- `/plm clock`：Get current configured item menu (1.3.3+).

## 15. ProtocolLib
- `/protocol config`：Reload configuration file.

- `/protocol check`：Check for new versions on BukkitDev.

- `/protocol version`：Display current running ProtocolLib version.

- `/protocol timings`：Toggle measuring CPU time spent by each plugin.

- `/protocol listeners`：Show which plugins are using ProtocolLib and what packet types they're intercepting.

- `/packetlog [file/console]`：Log packet hexadecimal representation to file or console.

## 16. QuickShop-Hikari
- `/quickshop create <price> [item]`：Create a shop.

- `/quickshop price <price>`：Change shop's buy/sell price.

- `/quickshop buy`：Set shop to buy mode.

- `/quickshop sell`：Set shop to sell mode.

- `/quickshop setowner <player>`：Change shop owner.

- `/quickshop unlimited`：Toggle shop's unlimited mode.

- `/quickshop clean`：Clean all shops without inventory.

- `/quickshop find <item>`：Find nearest shop selling specified item.

- `/quickshop info`：Display QuickShop information.

- `/quickshop debug`：Enable/disable debug mode.

- `/quickshop paste`：Collect useful information and paste to Pastebin.

- `/quickshop export`：Export all shop data to a ZIP file.

- `/quickshop recovery`：Recover all shops from TXT file or Paste.

- `/quickshop cleanghost`：Remove all corrupted shops.

- `/quickshop removeworld`：Remove all shops in specified world.

- `/quickshop name`：Name shop or remove name.

- `/quickshop permission`：Adjust shop permissions.

- `/quickshop database`：View and manage QuickShop-Hikari status.

- `/quickshop benefit`：View and manage shop benefits.

## 17. Residence
- `/res create <name>`：Create a new residence.

- `/res delete <name>`：Delete a residence.

- `/res list`：List all residences.

- `/res info <name>`：View residence information.

- `/res claim`：Claim current area as residence.

- `/res setflag <name> <flag> <value>`：Set residence flag (such as allow or forbid building).

- `/res setgroup <name> <group>`：Set residence access permission group.

- `/res setowner <name> <player>`：Set residence owner.

- `/res reload`：Reload Residence configuration.

## 18. SkinsRestorer
- `/skin <player>`：Players can change their own skin through this command.

- `/skin reload`：Reload SkinsRestorer configuration.

- `/skin list`：List available skins.

- `/skin set <player> <skin>`：Administrators can set skin for other players.

## 19. TAB
- `/tab reload`: Unload this plugin, then read the modified configuration file and reload the plugin.

- `/tab <player/group/player_uuid> <name> <property> [value]`: Change the corresponding property value for a group or player.

- `/tab <player/group/player_uuid> <name> remove`: Remove all data for that group or player.

- `/tab debug [player]`: Display server version, plugin version, permission group selection logic and sorting type.

- `/tab cpu`: Show approximate CPU usage of the plugin after 10 seconds.

- `/tab announce bar <name> <duration>`: Show BOSS bar information with specified name to all online players, duration can be specified (seconds).

- `/tab send bar <player> <name> <duration>`: Show BOSS bar information with specified name to specified player, duration can be specified (seconds).

- `/tab announce scoreboard <name> <duration>`: Show scoreboard with specified name to all players, duration can be specified (seconds).

- `/tab scoreboard show <name> [player]`: Show scoreboard with specified name.

- `/tab ntpreview`: Preview head display effect in unlimited name tag mode.

- `/tab parse <text>`: Test variable replacement effect.

- `/tab setcollision <player> <true|false>`: Set whether player will collide with other entities.

## 20. Vault
- **No basic commands**：Vault is a plugin for managing economic systems, mainly used for game economic systems, and does not provide direct player commands.

## 21. ViaVersion
- `/viaversion reload`：Reload configuration file from hard drive.

- `/viaversion help`：Display plugin help information.

- `/viaversion debug`：Toggle debug mode, output packet translation information in console and logs.

- `/viaversion autoteam`：Toggle whether to automatically group scoreboard players to avoid conflicts.

- `/viaversion pps`：Display number of packets sent per second by online players.

- `/viaversion dontbugme`：Toggle whether to automatically check for updates.

- `/viaversion list`：Display version list used by online players.

- `/viaversion displayleaks`：Try to find memory leaks (internal debug use).

- `/viaversion dump`：Export server information (version, plugin configuration, etc.) for feedback issues.

## 22. WorldAliasVariables
- `/wav reload`：Reload configuration file.

- `/wav set <world_name> <alias>`：Set world alias.

- `/wav list`：View all world aliases.

## 23. WorldManager
- `/worldmanager create <worldname>`：Create a new world.

- `/worldmanager delete <worldname>`：Delete a world.

- `/worldmanager list`：List all worlds.

- `/worldmanager load <worldname>`：Load a world.

- `/worldmanager unload <worldname>`：Unload a world.

- `/worldmanager setspawn <worldname>`：Set a world's spawn point.

- `/worldmanager reload`：Reload WorldManager configuration.

## 24. fakeplayer
- `/fp spawn <playername>`：Spawn a fake player.

- `/fp kill <playername>`：Kill a fake player

- `/fp killall`：Kill all fake players

- `/fp list`：List all fake players

- `/fp tp <playername>`：Teleport to a fake player.

- `/fp tphere <playername>`：Teleport a fake player to your location.

- `/fp invsee <playername>`：View a fake player's inventory.

- `/fp reload`：Reload fakeplayer configuration.

## 25. floodgate
- **No basic commands**：floodgate is a plugin for handling Bedrock version player connections, mainly used for server cross-platform support, and does not provide direct player commands.

:::tip
The plugin is no longer maintained after version #13
:::
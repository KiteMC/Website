# 插件指令

## 主指令

```
/vmc [子命令] [参数...]
```

## 子命令列表

| 子命令      | 权限              | 说明                                 | 用法示例                                 |
|-------------|-------------------|--------------------------------------|------------------------------------------|
| help        | 所有人            | 显示帮助信息                         | `/vmc help`                              |
| reload      | verifymc.admin    | 重载插件配置和资源                   | `/vmc reload`                            |
| add         | verifymc.admin    | 添加玩家到白名单（支持邮箱）         | `/vmc add <玩家名> <邮箱>`               |
| remove      | verifymc.admin    | 从白名单移除玩家                     | `/vmc remove <玩家名>`                   |
| port        | 所有人            | 显示当前 Web 管理后台端口            | `/vmc port`                              |

---

## 指令详细说明

### `/vmc help`
- 显示所有可用子命令及其说明。

### `/vmc reload`
- 重新加载插件配置文件和资源文件。
- 需要 `verifymc.admin` 权限。

### `/vmc add <玩家名> <邮箱>`
- 将指定玩家添加到白名单，并绑定邮箱。
- 需要 `verifymc.admin` 权限。
- 例如：`/vmc add Steve steve@example.com`

### `/vmc remove <玩家名>`
- 从白名单中移除指定玩家。
- 需要 `verifymc.admin` 权限。
- 例如：`/vmc remove Steve`

### `/vmc port`
- 显示当前 Web 管理后台的端口号。
- 所有人可用。

## 权限说明

- `verifymc.use`：允许使用 VerifyMC 插件的基础功能（默认所有人）。
- `verifymc.admin`：允许使用管理相关指令（如 reload、add、remove），默认仅 OP。
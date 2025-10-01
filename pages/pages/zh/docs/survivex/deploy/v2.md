# Linux 开服教程

## 1. 部署 MCSManager
请参考[MCSManager部署教程](https://docs.mcsmanager.com/zh_cn/)

### 1.1 连接服务器节点
请参考[MCSManager连接服务器节点教程](https://docs.mcsmanager.com/zh_cn/advanced/distributed.html)

## 2. 部署 Docker 环境
使用apt部署.
```bash
# 更新软件包索引
sudo apt-get update

# 安装必要依赖包
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 添加Docker官方GPG密钥
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 设置稳定版仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新软件包索引（应用新仓库配置）
sudo apt-get update

# 安装Docker引擎
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# 验证安装结果
docker --version

# 设置docker开机自启和启动docker
systemctl enable docker && systemctl start docker

# 检查是否安装成功，若安装成功会显示 Docker version x.x.x
docker -v
```

如果失败, 请使用下面的指令.
```bash
# 安装docker
curl -sSL https://get.daocloud.io/docker | sh

# 设置docker开机自启和启动docker
systemctl enable docker && systemctl start docker

# 检查是否安装成功，若安装成功会显示 Docker version x.x.x
docker -v
```

## 3. 配置 Docker 镜像源
```bash
# 创建或修改 /etc/docker/daemon.json 文件
apt install nano && nano /etc/docker/daemon.json

# 然后输入下面内容:（输入完后按Ctrl+O，然后回车保存，接着按Ctrl+X退出编辑器）
{
  "registry-mirrors": ["https://docker.1panelproxy.com"]
}

# 重启docker服务
systemctl restart docker.service
```

# Java 环境准备

## 4. 创建JDK镜像
点击下图所示位置**创建JDK 21**.

![节点-镜像管理](https://survivex.cn-nb1.rains3.com/basic/v1/x2.png)

![新增镜像](https://survivex.cn-nb1.rains3.com/basic/v1/x3.png)

![使用 DockerFile 自定义创建](https://survivex.cn-nb1.rains3.com/basic/v1/x6.png)

**填入以下内容**

```dockerfile
FROM openjdk:21
RUN mkdir -p /workspace
ENV LANG=zh_CN.UTF-8
ENV LANGUAGE=zh_CN.UTF-8
ENV LC_ALL=zh_CN.UTF-8
ENV TZ=Asia/Shanghai
WORKDIR /workspace
```

![填写内容](https://survivex.cn-nb1.rains3.com/basic/v1/x5.png)
点击创建镜像即可.

# 服务端部署流程

## 5. 创建服务端应用
点击下图所示位置**创建服务器应用**.

![创建应用](https://survivex.cn-nb1.rains3.com/basic/v1/x7.png)

**依次点击** : Minecraft Java版游戏服务器 -> localhost:24444 (不一定) -> 上传服务端文件压缩包


具体配置参数说明：

```md
**实例名称** : 任意

**启动命令** : ./start.sh

**服务端文件目录** : [留空]

**上传服务端压缩包** : [上传SurviveX服务端压缩包]
```
## 6. 容器虚拟化配置
点击下图所示位置**设置服务器虚拟化**.

![创建应用](https://survivex.cn-nb1.rains3.com/basic/v1/x8.png)


容器虚拟化配置要求：

```md
**启用 Docker 容器** : true

**更变容器默认工作目录** : true

**网络模式** : host

**Docker 镜像** : [选择您创建的JDK 21镜像]
```

![配置内容](https://survivex.cn-nb1.rains3.com/basic/v1/x9.png)


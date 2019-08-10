# 部署记录

## Staging部署：

1. ### 准备：

   - 准备好appsettings.Staging.json文件；
   - 准备好docker-compose.staging.yml文件；
   - 准备好OrchardCore.Cms.Web下的Dockerfile文件；
   - 准备好OrchardCore.Cms.Web下的publish.ps1文件；

2. ### 编译：

   - 终端，打开PowerShell，cd到OrchardCore.Cms.Web目录

   - 执行：

   - & .\publish.ps1

   - 验证

     如有需要，执行:

     docker run -d -p 17000:17000 --name ycweb hmo/orchardcorecmsweb 在本地启动container，并验证是否成功

   - 如不成功，修改后再次执行上述步骤

3. ### push

   根据：<https://cr.console.aliyun.com/repository/cn-shenzhen/yic/orchardcorecmsweb/details>

   - docker login --username=陌悦辰 registry.cn-shenzhen.aliyuncs.com
   - docker tag *[imageId]* registry.cn-shenzhen.aliyuncs.com/yic/orchardcorecmsweb:stag
   - docker push registry.cn-shenzhen.aliyuncs.com/yic/orchardcorecmsweb:stag

4. ## pull

   到Staging服务器上：

   - docker pull registry.cn-shenzhen.aliyuncs.com/yic/orchardcorecmsweb:stag

5. ## 准备文件夹
   - cd 至部署处。
   以下步骤，如需要则执行：
   - 建立appdata；
   - 复制开发环境App_Data内容(可用WinSCP)到appdata文件夹
   - 确保Sites下对应站点目录（Default）下的appsettings.json中的连接字符串符合stag环境。比如Server=.;database=ycplatform;uid=xxx;pwd=xxx;

6. ## 准备数据库
   以下步骤如需要则执行：
   - 准备数据库。确保数据库服务器上建立了数据库ycplatform，编码与开发环境同（utf8mb4，utf8mb4_unicode_ci）；
   - 准备数据库和数据脚本，在库ycplatform上执行。
   
7. ## 运行
   
    docker run -d -p 17000:17000 --name ycweb --mount type=bind,source=${PWD}/appdata,target=/app/App_Data registry.cn-shenzhen.aliyuncs.com/yic/orchardcorecmsweb:stag
    

说明，本来是用-v而不是--mount的，但怎么都无法挂载，也没有异常提示。用--mount加type可以。

8. ## nginx
   首次应添加配置文件ycweb.conf至conf.d下。参见项目docker目录下对应文件。
   这里需要注意的是，如果只部署了一个网站，则ssl处这么定义：
    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/nr.woyue.org/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/nr.woyue.org/privkey.pem; # managed by Certbot
   
   如果已经部署过网站，则ssl处这么定义：
    listen 443 ssl; # managed by Certbot
    即可。

9. ## 自动重启
   即docker重启自动也重启container。上面的docker run指令都没有考虑到这一点，需要事后调用：
    docker update --restart=always container名称或Id
   可以修改run指令直接添加restart always.

10. ## 其他问题
    用上面方式复制完毕后，发现还有两个问题：
    
    - 未登录时访问/admin会跳转到登录页面login，但这个页面是http的，导致访问失败；可以尝试nginx中强制跳转ssl解决。
    - 本地化沿袭开发环境还是zh-CN，但进到Localization界面默认语言竟然是空。不明原因。但只要不切换语言，应该不影响使用。如果要切换语言，因为添加Culture里面已经没有zh-CN了，所以很可能切不回来。

export default {
  label: "第一部分：基础篇(293题)",
  topics: [
    {
      topic_num: 1,
      question: "前端需要注意哪些SEO",
      answer: [
        "合理的title、description、keywords：搜索对着三项权重逐个减小，title值强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面title要有所不同；description把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面description有所不同；keywords列举出重要关键词即可。",
        "语义化的HTML代码，符合W3C规范；语义化代码让搜索引擎容易理解网页。",
        "重要内容HTML代码放在最前：搜索引擎抓取HTML顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取。",
        "重要内容不要用js输出：爬虫不会执行js获取内容。",
        "少用iframe：搜索引擎不会抓取iframe中的内容。",
        "非装饰性图片必须加alt。",
        "提高网站速度：网站速度是搜索引擎排序的一个重要指标。",
      ],
      _classify: ["HTML 、HTTP 、web综合问题"],
    },
    {
      topic_num: 2,
      question: "<img> 的 title 和 alt 有什么区别",
      answer:
        "通常当鼠标滑动到元素上的时候显示。alt是<img>的特有属性，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅读图片。可提高图片可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。",
      _classify: ["HTML 、HTTP 、web综合问题"],
    },
    {
      topic_num: 3,
      question: "HTTP的几种请求方法用途",
      answer: [
        {
          title: "GET方法",
          content: "发送一个请求来取得服务器上的某一资源。",
        },
        {
          title: "POST方法",
          content: "向URL指定的资源提交数据或附加新的数据。",
        },
        {
          title: "PUT方法",
          content: "跟POST方法很像，也是向服务器提交数据。但是，它们之间有不同。PUT指定了资源在服务器上的位置，而POST没有。",
        },
        {
          title: "HEAD方法",
          content: "只请求页面的首部。",
        },
        {
          title: "DELETE方法",
          content: "删除服务器上的某资源。",
        },
        {
          title: "OPTIONS方法",
          content: "它用于获取当前URL所支持的方法。如果请求成功，会有一个Allow的头包含类似“GET, POST”这样的信息。",
        },
        {
          title: "TRACE方法",
          content: "TRACE方法被用于激发一个远程的，应用层的请求消息回路。",
        },
        {
          title: "CONNECT方法",
          content: "把请求连接转换到透明的TCP/IP通道。",
        },
      ],
      _classify: ["HTML 、HTTP 、web综合问题"],
    },
    {
      topic_num: 4,
      question: "从浏览器地址栏输入url到显示页面的步骤",
      answer: [
        {
          title: "基础版本",
          content: [
            "浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求。",
            "服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）。",
            "浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）。",
            "载入解析到的资源文件，渲染页面，完成。",
          ],
        },
        {
          title: "详细版",
          content: [
            "在浏览器地址栏输入URL。",
            "浏览器查看缓存，如果请求资源在缓存中并且新鲜，跳转到转码步骤。",
            "如果资源未缓存，发起新请求。",
            "如果已缓存，检验是否足够新鲜，足够新鲜直接提供给客户端，否则与服务器进行验证。",
            "检验新鲜通常有两个HTTP头进行控制Expires和Cache-Control：HTTP1.0提供Expires，值为一个绝对时间表示缓存新鲜日期；HTTP1.1增加了Cache-Control: max-age=，值为以秒为单位的最大新鲜时间。",
            "浏览器解析URL获取协议，主机，端口，path。",
            "浏览器组装一个HTTP（GET）请求报文。",
            "浏览器获取主机地址，过程如下：浏览器缓存、本机缓存、hosts文件、路由器缓存、ISP DNS缓存、DNS递归查询（可能存在负载均衡导致每次IP不一样）。",
            "打开一个socket与目标IP地址，端口建立TCP链接，三次握手如下：客户端发送一个TCP的SYN=1，Seq=x的包到服务器端口；服务器发回SYN=1，ACK=X+1，Seq=Y的响应包；客户端发送ACK=Y+1，Seq=Z。",
            "TCP链接建立后发送HTTP请求。",
            "服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用HTTP_Host头部判断请求的服务程序。",
            "服务器检查HTTP请求头是否包含缓存验证信息如果验证缓存新鲜，返回304等对应状态码。",
            "处理程序读取完整请求并准备HTTP响应，可能需要查询数据库等操作。",
            "服务器将响应报文通过TCP连接发送回浏览器。",
            "浏览器接收HTTP响应，然后根据情况选择关闭TCP连接或者保留重用，关闭TCP连接的四次握手如下：主动方发送Fin=1，Ack=Z，Seq=X报文；被动方发送ACK=X+1，Seq=Z报文；被动方发送Fin=1，ACK=X，Seq=Y报文；主动方发送ACK=Y，Seq=X报文。",
            "浏览器检查响应状态码：是否为1XX，3XX，4XX，5XX，这些情况处理与2XX不同。",
            "如果资源可缓存，进行缓存。",
            "对响应进行解码（例如gzip压缩）。",
            "根据资源类型决定如何处理（假设资源为HTML文档）。",
            "解析HTML文档，构件DOM树，下载资源，构造CSSOM树，执行js脚本，这些操作没有严格的先后顺序，以下分别解释。",
            "构建DOM树：Tokenizing：根据HTML规范将字符流解析为标记；Lexing：词法分析将标记转换为对象并定义属性和规则；DOM construction：根据HTML标记关系将对象组成DOM树。",
            "解析过程中遇到图片、样式表、js文件，启动下载。",
            "构建CSSOM树：Node：根据标记创建节点；CSSOM：节点创建CSSOM树。",
            "根据DOM树和CSSOM树构建渲染树：从DOM树的根节点遍历所有可见节点，不可见节点包括：1）script，meta这样本身不可见的标签；2）被CSS隐藏的节点，如display：none；对每一个可见节点，找到恰当的CSSOM规则并应用；发布可视节点的内容和计算样式。",
            "js解析如下：浏览器创建Document对象并解析HTML，将解析到的元素和文本节点添加到文档中，此时document.readystate为loading；HTML解析器遇到没有async和defer的script时，将他们添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且在脚本下载和执行时解析器会暂停。这样就可以用document.write()把文本插入到输入流中。同步脚本经常简单定义函数和注册事件处理程序，他们可以遍历和操作script和他们之前的文档内容；当解析器遇到设置了async属性的script时，开始下载脚本并继续解析文档。脚本会在它下载完成后尽快执行，但是解析器不会停下来等它下载。异步脚本禁止使用document.write()，它们可以访问自己script和之前的文档元素；当文档完成解析，document.readState变成interactive；所有defen脚本会按照文件出现的顺序执行，延迟脚本能访问完整文档树，禁止使用document.write()；浏览器在Document对象上触发DOMContentLoaded事件；此时文档完全解析完成，浏览器可能还在等待如图片等内容加载，等这些内容完成载入并且所有异步脚本完成载入和执行，document.readState变为complete，window触发load事件。",
            "显示页面（HTML解析过程中会逐步显示页面）。",
          ],
        },
      ],
      _classify: ["HTML 、HTTP 、web综合问题"],
    },
    {
      topic_num: 5,
      question: "如何进行网站性能优化",
      answer: [
        {
          title: "content方面",
          content: ["减少HTTP请求：合并文件、CSS精灵、inline Image。", "减少DNS查询：DNS缓存、将资源分布到恰当数量的主机名。", "减少DOM元素数量。"],
        },
        {
          title: "Server方面",
          content: ["使用CDN。", "配置ETag。", "对组件使用Gzip压缩。"],
        },
        {
          title: "Cookie方面",
          content: ["减小cookie大小。"],
        },
        {
          title: "css方面",
          content: ["将样式表放到页面顶部。", "不使用CSS表达式。", "使用<link>不使用@import。"],
        },
        {
          title: "Javascript方面",
          content: ["将脚本放到页面底部。", "将javascript和css从外部引入。", "压缩javascript和css。", "删除不需要的脚本。"],
        },
        {
          title: "图片方面",
          content: ["优化图片：根据实际颜色需要选择色深、压缩。", "优化css精灵。", "不要在HTML中拉伸图片。"],
        },
      ],
      _classify: ["HTML 、HTTP 、web综合问题"],
    },
    {
      topic_num: 6,
      question: "HTTP状态码及其含义",
      answer: [
        {
          title: "1XX：信息状态码",
          content: ["100 Continue 继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息。"],
        },
        {
          title: "2XX：成功状态码",
          content: ["200 OK 正常返回信息。", "201 Created 请求成功并且服务器创建了新的资源。", "202 Accepted 服务器已接受请求，但尚未处理。"],
        },
        {
          title: "3XX：重定向",
          content: [
            "301 Moved Permanently 请求的网页已永久移动到新位置。",
            "302 Found 临时性重定向。",
            "303 See Other 临时性重定向，且总是使用GET请求新的URI。",
            "304 Not Modified 自从上次请求后，请求的网页未修改过。",
          ],
        },
        {
          title: "4XX：客户端错误",
          content: [
            "400 Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。",
            "401 Unauthorized 请求未授权。",
            "403 Forbidden 禁止访问。",
            "404 Not Found 找不到如何与URI相匹配的资源。",
          ],
        },
        {
          title: "5XX：服务器错误",
          content: ["500 Internal Server Error 最常见的服务器端错误。", "503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。"],
        },
      ],
      _classify: ["HTML 、HTTP 、web综合问题"],
    },
    {
      topic_num: 7,
      question: "语义化的理解",
      answer: [
        "用正确的标签做正确的事情！",
        "HTML语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的。",
        "搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于SEO。",
        "使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。",
      ],
      _classify: ["HTML 、HTTP 、web综合问题"],
    },
    {
      topic_num: 8,
      question: "介绍一下你对浏览器内核的理解？",
      answer: [
        "主要分成两部分：渲染引擎（layout engineer或Rendering Engine）和JS引擎。",
        "渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其他需要编辑、显示网络内容的应用程序都需要内核。",
        "JS引擎则：解析和执行javascript来实现网页的动态效果。",
        "最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。",
      ],
      _classify: ["HTML 、HTTP 、web综合问题"],
    },
    {
      topic_num: 9,
      question: "html5有哪些新特性、移除了那些元素？",
      answer: [
        "HTML5现在已经不是SGML的子集，主要是关于图像、位置、存储、多任务等功能的增加。",
        {
          title: "绘画canvas",
          content: "用于媒介回放的video和audio元素。",
        },
        {
          title: "本地离线存储",
          content: "localStorage长期存储数据，浏览器关闭后数据不丢失；sessionStorage的数据在浏览器关闭后自动删除。",
        },
        {
          title: "语意化更好的内容元素",
          content: "比如article、footer、header、nav、section。",
        },
        {
          title: "表单控件",
          content: "calendar、date、time、email、url、search。",
        },
        {
          title: "新的技术",
          content: "webworker、websocket、Geolocation。",
        },
        {
          title: "移除的元素",
          content: ["纯表现的元素：basefont、big、center、font、s、strike、tt、u。", "对可用性产生负面影响的元素：frame、frameset、noframes。"],
        },
        {
          title: "支持HTML5新标签",
          content: [
            "IE8/IE7/IE6支持通过document.createElement方法产生的标签。",
            "可以利用这一特性让这些浏览器支持HTML5新标签。",
            "浏览器支持新标签后，还需要添加标签默认的样式。",
            "当然也可以直接使用成熟的框架，比如html5shim。",
          ],
        },
      ],
      _classify: ["HTML 、HTTP 、web综合问题"],
    },
    {
      topic_num: 10,
      question: "HTML5的离线储存怎么使用，工作原理能不能解释一下？",
      answer: [
        "在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。",
        "原理：HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。",
        {
          title: "如何使用",
          content: [
            "页面头部像下面一样加入一个manifest的属性：<html manifest='cache.manifest'>。",
            "在cache.manifest文件的编写离线存储的资源：CACHE MANIFEST #v0.11 CACHE: js/app.js css/style.css NETWORK: resourse/logo.png FALLBACK: /offline.html。",
          ],
        },
      ],
      _classify: ["HTML 、HTTP 、web综合问题"],
    },
  ],
};

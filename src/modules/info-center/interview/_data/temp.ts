export default [
  {
    question: "前端需要注意哪些SEO",
    answer: [
      "合理的 title 、 description 、 keywords ：搜索对着三项权重逐个减小，title值强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面 title 要有所不同；description 把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可。",
      "语义化的 HTML 代码，符合W3C规范；语义化代码让搜索引擎容易理解网页。",
      "重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取。",
      "重要内容不要用 js 输出：爬虫不会执行js获取内容。",
      "少用 iframe：搜索引擎不会抓取 iframe 中的内容。",
      "非装饰性图片必须加 alt。",
      "提高网站速度：网站速度是搜索引擎排序的一个重要指标。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "<img> 的 title 和 alt 有什么区别",
    answer: [
      "通常当鼠标滑动到元素上的时候显示。",
      "alt 是 <img> 的特有属性，是图片内容的等价描述，用于图片无法加载时显示、读屏器阅读图片。可提醒用户高可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "HTTP的几种请求方法用途",
    answer: [
      "GET 方法：发送一个请求来取得服务器上的某一资源。",
      "POST 方法：向 URL 指定的资源提交数据或附加新的数据。",
      "PUT 方法：跟 POST 方法很像，也是向服务器提交数据。但是，它们之间有不同。",
      "HEAD 方法：只请求页面的首部。",
      "DELETE 方法：删除服务器上的某资源。",
      "OPTIONS 方法：它用于获取当前 URL 所支持的方法。如果请求成功，会有一个 Allow 的头包含类似“GET, POST”这样的信息。",
      "TRACE 方法：TRACE 方法被用于激发一个远程的，应用层的请求消息回路。",
      "CONNECT 方法：把请求连接转换到透明的 TCP/IP 通道。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "从浏览器地址栏输入url到显示页面的步骤",
    answer: [
      "基础版本：浏览器根据请求的 URL 交给 DNS 域名解析，找到真实 IP ，向服务器发起请求；服务器交给后台处理完成后返回数据，浏览器接收文件（ HTML、JS、CSS 、图象等）；浏览器对加载到的资源（ HTML、JS、CSS 等）进行语法解析，建立相应的内部数据结构（如 HTML 的 DOM ）；载入解析到的资源文件，渲染页面，完成。",
      "详细版：1. 在浏览器地址栏输入URL。2. 浏览器查看缓存，如果请求资源在缓存中并且新鲜，跳转到转码步骤。3. 检验新鲜通常有两个HTTP头进行控制 Expires 和 Cache-Control。4. 浏览器解析URL获取协议，主机，端口，path。5. 浏览器组装一个HTTP（GET）请求报文。6. 浏览器获取主机地址，过程如下：浏览器缓存、本机缓存、hosts文件、路由器缓存、ISP DNS缓存、DNS递归查询（可能存在负载均衡导致每次IP不一样）。7. 打开一个socket与目标IP地址，端口建立TCP链接，三次握手如下：客户端发送一个TCP的SYN=1，Seq=x的包到服务器端口；服务器发回SYN=1， ACK=X+1， Seq=Y的响应包；客户端发送ACK=Y+1， Seq=Z。8. TCP链接建立后发送HTTP请求。9. 服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用HTTP_Host头部判断请求的服务程序。10. 服务器检查HTTP请求头是否包含缓存验证信息如果验证缓存新鲜，返回304等对应状态码。11. 处理程序读取完整请求并准备HTTP响应，可能需要查询数据库等操作。12. 服务器将响应报文通过TCP连接发送回浏览器。13. 浏览器接收HTTP响应，然后根据情况选择关闭TCP连接或者保留重用，关闭TCP连接的四次握手如下：主动方发送Fin=1， Ack=Z， Seq= X报文；被动方发送ACK=X+1， Seq= Z报文；被动方发送Fin=1， ACK=X， Seq= Y报文；主动方发送ACK=Y， Seq= X报文。14. 浏览器检查响应状态码：是否为1XX， 3XX， 4XX， 5XX，这些情况处理与2XX不同。15. 如果资源可缓存，进行缓存。16. 对响应进行解码（例如gzip压缩）。17. 根据资源类型决定如何处理（假设资源为HTML文档）。18. 解析HTML文档，构件DOM树，下载资源，构造CSSOM树，执行js脚本，这些操作没有严格的先后顺序。19. 构建DOM树：Tokenizing：根据HTML规范将字符流解析为标记；Lexing：词法分析将标记转换为对象并定义属性和规则；DOM construction：根据HTML标记关系将对象组成DOM树。20. 解析过程中遇到图片、样式表、js文件，启动下载。21. 构建CSSOM树：Node：根据标记创建节点；CSSOM：节点创建CSSOM树。22. 根据DOM树和CSSOM树构建渲染树：从DOM树的根节点遍历所有可见节点，不可见节点包括：1）script，meta 这样本身不可见的标签。2)被CSS隐藏的节点，如 display：none；对每一个可见节点，找到恰当的CSSOM规则并应用；发布可视节点的内容和计算样式。23. js解析如下：浏览器创建Document对象并解析HTML，将解析到的元素和文本节点添加到文档中，此时document.readystate为loading；HTML解析器遇到没有async和defer的script时，将他们添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且在脚本下载和执行时解析器会暂停。这样就可以用document.write()把文本插入到输入流中。同步脚本经常简单定义函数和注册事件处理程序，他们可以遍历和操作script和他们之前的文档内容；当解析器遇到设置了async属性的script时，开始下载脚本并继续解析文档。脚本会在它下载完成后尽快执行，但是解析器不会停下来等它下载。异步脚本禁止使用document.write()，它们可以访问自己script和之前的文档元素；当文档完成解析，document.readState变成interactive；所有defen脚本会按照文件出现的顺序执行，延迟脚本能访问完整文档树，禁止使用document.write()；浏览器在Document对象上触发DOMContentLoaded事件；此时文档完全解析完成，浏览器可能还在等待如图片等内容加载，等这些内容完成载入并且所有异步脚本完成载入和执行，document.readState变为complete，window触发load事件。24. 显示页面（HTML解析过程中会逐步显示页面）。",
      "详细简版：1. 从浏览器接收 url 到开启⽹络请求线程 ( 这⼀部分可以展开浏览器的机制以及进程与线程之间的关系)2. 开启⽹络线程到发出⼀个完整的 HTTP 请求 ( 这⼀部分涉及到dns查询， TCP/IP 请求，五层因特⽹协议栈等知识)3. 从服务器接收到请求到对应后台接收到请求 ( 这⼀部分可能涉及到负载均衡， 安全拦截以及后台内部的处理等等)4. 后台和前台的 HTTP 交互 ( 这⼀部分包括 HTTP 头部 、响应码 、报文结构 、 cookie 等知识， 可以提下静态资源的 cookie 优化， 以及编码解码， 如 gzip 压缩等)2023/4 第⼀部分：基础篇 | EncodeStudio 5.单独拎出来的缓存问题， HTTP 的缓存 ( 这部分包括http缓存头部， ETag ， catchcontrol 等)6. 浏览器接收到 HTTP 数据包后的解析流程 ( 解析 html -词法分析然后解析成 dom 树 、解析 css 生成 css 规则树 、合并成 render 树，然后 layout 、 painting 渲染 、复合图层的合成 、 GPU 绘制 、外链资源的处理 、 loaded 和 DOMContentLoaded 等)7. CSS 的可视化格式模型 ( 元素的渲染规则， 如包含块，控制框， BFC ， IFC 等概念)8. JS 引擎解析过程 ( JS 的解释阶段，预处理阶段，执⾏阶段生成执⾏上下文， VO ，作用域链 、回收机制等等)9. 其它 ( 可以拓展不同的知识模块， 如跨域，web安全， hybrid 模式等等内容)",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "如何进行网站性能优化",
    answer: [
      "content 方面：减少 HTTP 请求：合并文件、 CSS 精灵、 inline Image；减少 DNS 查询： DNS 缓存、将资源分布到恰当数量的主机名；减少 DOM 元素数量。",
      "Server 方面：使用 CDN；配置 ETag；对组件使用 Gzip 压缩。",
      "Cookie 方面：减小 cookie 大小。",
      "css 方面：将样式表放到页面顶部；不使用 CSS 表达式；使用 <link> 不使用 @import。",
      "Javascript 方面：将脚本放到页面底部；将 javascript 和 css 从外部引入；压缩 javascript 和 css；删除不需要的脚本。",
      "图片方面：优化图片：根据实际颜色需要选择色深、压缩；优化 css 精灵；不要在 HTML 中拉伸图片。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "HTTP状态码及其含义",
    answer: [
      "1XX ：信息状态码：100 Continue 继续，一般在发送 post 请求时，已发送了 http header 之后服务端将返回此信息，表示确认，之后发送具体参数信息。",
      "2XX ：成功状态码：200 OK 正常返回信息；201 Created 请求成功并且服务器创建了新的资源；202 Accepted 服务器已接受请求，但尚未处理。",
      "3XX ：重定向：301 Moved Permanently 请求的网页已永久移动到新位置；302 Found 临时性重定向；303 See Other 临时性重定向，且总是使用 GET 请求新的 URI；304 Not Modified 自从上次请求后，请求的网页未修改过。",
      "4XX ：客户端错误：400 Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求；401 Unauthorized 请求未授权；403 Forbidden 禁止访问；404 Not Found 找不到如何与 URI 相匹配的资源。",
      "5XX：服务器错误：500 Internal Server Error 最常见的服务器端错误；503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "语义化的理解",
    answer: [
      "用正确的标签做正确的事情！",
      "HTML 语义化就是让页面的内容结构化，便于对浏览器、搜索引擎解析；",
      "在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的。",
      "搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重，利于 SEO。",
      "使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "介绍一下你对浏览器内核的理解？",
    answer: [
      "主要分成两部分：渲染引擎（layout engineer 或 Rendering Engine）和 JS 引擎。",
      "渲染引擎：负责取得网页的内容（HTML 、 XML 、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其他需要编辑、显示网络内容的应用程序都需要内核。",
      "JS 引擎则：解析和执行 javascript 来实现网页的动态效果。",
      "最开始渲染引擎和 JS 引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "html5有哪些新特性、移除了那些元素？",
    answer: [
      "HTML5 现在已经不是 SGML 的子集，主要是关于图像、位置、存储、多任务等功能的增加。绘画 canvas；用于媒介回放的 video 和 audio 元素；本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；sessionStorage 的数据在浏览器关闭后自动删除；语意化更好的内容元素，比如 article 、 footer 、 header 、 nav 、 section；表单控件， calendar 、 date 、 time 、 email 、 url 、 search；新的技术 webworker 、 websocket 、 Geolocation。",
      "移除的元素：纯表现的元素： basefont 、 big 、 center 、 font 、 s 、 strike 、 tt 、 u；对可用性产生负面影响的元素： frame 、 frameset 、 noframes。",
      "支持 HTML5 新标签：IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签；可以利用这一特性让这些浏览器支持 HTML5 新标签；浏览器支持新标签后，还需要添加标签默认的样式；",
      "当然也可以直接使用成熟的框架，比如 html5shim。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "HTML5 的离线储存怎么使用，工作原理能不能解释一下？",
    answer: [
      "在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。",
      "原理：HTML5 的离线存储是基于一个新建的 .appcache 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。",
      "如何使用：页面头部像下面一样加入一个 manifest 的属性：在 cache.manifest 文件的编写离线存储的资源；在离线状态时，操作 window.applicationCache 进行需求实现。CACHE MANIFEST #v0.11 CACHE: js/app.js css/style.css NETWORK: resourse/logo.png FALLBACK: /offline.html",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢",
    answer: [
      "在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app，那么浏览器就会根据manifest文件的内容下载相应的资源并且进行离线存储。如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。离线的情况下，浏览器就直接使用离线存储的资源。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "请描述一下 cookies，sessionStorage 和 localStorage 的区别？",
    answer: [
      "cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。存储大小：cookie 数据大小不能超过4k；sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到5M或更大。有期时间：localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；sessionStorage 数据在当前浏览器窗口关闭后自动删除；cookie 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "iframe有那些缺点？",
    answer: [
      "iframe 会阻塞主页面的 Onload 事件；搜索引擎的检索程序无法解读这种页面，不利于 SEO；iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载；使用 iframe 之前需要考虑这两个缺点。如果需要使用 iframe ，最好是通过 javascript 动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "WEB标准以及W3C标准是什么？",
    answer: ["标签闭合、标签小写、不乱嵌套、使用外链 css 和 js 、结构行为表现的分离。"],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "xhtml和html有什么区别？",
    answer: [
      "一个是功能上的差别：主要是 XHTML 可兼容各大浏览器、手机以及 PDA ，并且浏览器也能快速正确地编译网页。另外是书写习惯的差别：XHTML 元素必须被正确地嵌套，闭合，区分大小写，文档必须拥有根元素。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "Doctype作用？严格模式与混杂模式如何区分？它们有何意义？",
    answer: [
      "页面被加载时，link 会同时被加载，而 @import 页面被加载时，link 会同时被加载，而 @import 引用的 CSS 会等到页面被加载完再加载 import 只在 IE5 以上才能识别，而 link 是 XHTML 标签，无兼容问题 link 方式的样式的权重高于 @import 的权重。<!DOCTYPE> 声明位于文档中的最前面，处于 <html> 标签之前。告知浏览器的解析器，用什么文档类型 规范来解析这个文档。严格模式的排版和 JS 运行模式是以该浏览器支持的最标准运行。在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。DOCTYPE 不存在或格式不正确会导致文档以混杂模式呈现。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "行内元素有哪些？块级元素有哪些？空(void)元素有那些？行内元素和块级元素有什么区别？",
    answer: [
      "行内元素有：a b span img input select strong。块级元素有：div u1 o1 l1 d1 dt dd h1 h2 h3 h4... p。空元素：<br> <hr> <img> <input> <link> <meta>。行内元素不可以设置宽高，不独占一行。块级元素可以设置宽高，独占一行。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "HTML全局属性(global attribute)有哪些",
    answer: [
      "class :为元素设置类标识；data-* :为元素增加自定义属性；draggable :设置元素是否可拖拽；id :元素 id，文档内唯一；lang :元素内容的的语言；style :行内 css 样式；title :元素相关的建议信息。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "Canvas和SVG有什么区别？",
    answer: [
      "svg 绘制出来的每一个图形的元素都是独立的 DOM 节点，能够方便的绑定事件或用来修改。canvas 输出的是一整幅画布。svg 输出的图形是矢量图形，后期可以修改参数来自由放大缩小，不会失真和锯齿。而 canvas 输出标量画布，就像一张图片一样，放大会失真或者锯齿。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "HTML5 为什么只需要写 <!DOCTYPE HTML>",
    answer: [
      "HTML5 不基于 SQML，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为。而 HTML4.01 基于 SQML，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型。",
    ],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
  {
    question: "如何在页面上实现一个圆形的可点击区域？",
    answer: ["svg；", "border-radius；", "纯 js 实现 需要求一个点在不在图上简单算法、获取鼠标坐标等等。"],
    _classify: ["HTML 、HTTP 、web综合问题"],
  },
];

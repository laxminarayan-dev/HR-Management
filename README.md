## React Course Info

<h1>Date: 09/07/2025</h1>

1. Wrap element 1) <></> //bad practice 2) Fragment 3) All Html element
   <br/> <h3>Note: return only return single element</h3>

2. expression

   1. {} // number.string,boolean,opration,element,component,object,array,variable,function

3. css in react

   1. inline
      {{}}
   2. external

4. react routing ( navigation )
   1. npm i react-router-dom
   2. import

<br/> <h3>Note : replace class - className</h3>

<h1>Date: 10/07/2025</h1>

1. Git, Github
   1. About Git:
      1. tracking changes source data
      2. open-source
      3. distributed version control
   2. git command list
      <br/> <h3>Note: local project name and repo must have same name</h3>
      1. git init
      2. git login and create repo
      3. git remote -v //check connection
      4. git remote add origin <path>
      5. git add --all / git add .
      6. git commit -m "comment"
      7. git pull origin main
      8. git push -u origin main
      9. git clone <path>

<br/> <h3>link : https://github.com/shashipandey100192/modelprojectvip</h3>

2. react-icon
   1. npm i react-icon
   2. import perticular icon
   3. inject
3. type of page
   1. full page (have multiple comp)
      1. landing
      2. dashborad
      3. home
   2. blank page (have single comp)
      1. login
      2. register
      3. error
      4. forgot

<h1>Date: 14/07/2025</h1>

1. Nested Routing
   1. Outlet
2. React Hooks (Function) added from react ver-16 (current ver-19)
   1. List Hooks
      1. useState()
      2. useEffect()
      3. useForm()
      4. useNavigate()
      5. useRef()
   2. Rules of Hooks
      1. can't define inside a function
      2. can't define inside a loop
      3. can't define in bottom of function
3. useState()
   1. used for re-render / update template or DOM (without refresh)

## MongoDB (database)

<h1>Date: 15/07/2025</h1>

1. mongodb plateform

   1. mongodb community edition (local) // download and install
   2. mongodb enterprise (Advance)
   3. mongodb Atlas (cloud DB)

2. mongodb tool

   1. mongodb compass (GUI) // download and install
   2. mongodb shell (CLI) // download and paste in c drive

<h1>Date: 16/07/2025</h1>

<h3> mongodb atlas (cloud) </h3>

1. Login and Signup
2. create company or organization
3. create project
4. create db
5. create cluster
6. database access
7. network access (add IP ) (0.0.0.0/0 for all)
8. connect atlas to mongodb compass

## NodeJS

1. generate package.json

   1. npm init
   2. npm init -y

2. http codes
   <br/>
   <br/>
   {
   <br/>
   "100": "Continue",
   <br/>
   "101": "Switching Protocols",
   <br/>
   "102": "Processing",
   <br/>
   "103": "Early Hints",
   <br/>
   "200": "OK",
   <br/>
   "201": "Created",
   <br/>
   "202": "Accepted",
   <br/>
   "203": "Non-Authoritative Information",
   <br/>
   "204": "No Content",
   <br/>
   "205": "Reset Content",
   <br/>
   "206": "Partial Content",
   <br/>
   "207": "Multi-Status",
   <br/>
   "208": "Already Reported",
   <br/>
   "226": "IM Used",
   <br/>
   "300": "Multiple Choices",
   <br/>
   "301": "Moved Permanently",
   <br/>
   "302": "Found",
   <br/>
   "303": "See Other",
   <br/>
   "304": "Not Modified",
   <br/>
   "305": "Use Proxy",
   <br/>
   "307": "Temporary Redirect",
   <br/>
   "308": "Permanent Redirect",
   <br/>
   "400": "Bad Request",
   <br/>
   "401": "Unauthorized",
   <br/>
   "402": "Payment Required",
   <br/>
   "403": "Forbidden",
   <br/>
   "404": "Not Found",
   <br/>
   "405": "Method Not Allowed",
   <br/>
   "406": "Not Acceptable",
   <br/>
   "407": "Proxy Authentication Required",
   <br/>
   "408": "Request Timeout",
   <br/>
   "409": "Conflict",
   <br/>
   "410": "Gone",
   <br/>
   "411": "Length Required",
   <br/>
   "412": "Precondition Failed",
   <br/>
   "413": "Payload Too Large",
   <br/>
   "414": "URI Too Long",
   <br/>
   "415": "Unsupported Media Type",
   <br/>
   "416": "Range Not Satisfiable",
   <br/>
   "417": "Expectation Failed",
   <br/>
   "418": "I'm a Teapot",
   <br/>
   "421": "Misdirected Request",
   <br/>
   "422": "Unprocessable Entity",
   <br/>
   "423": "Locked",
   <br/>
   "424": "Failed Dependency",
   <br/>
   "425": "Too Early",
   <br/>
   "426": "Upgrade Required",
   <br/>
   "428": "Precondition Required",
   <br/>
   "429": "Too Many Requests",
   <br/>
   "431": "Request Header Fields Too Large",
   <br/>
   "451": "Unavailable For Legal Reasons",
   <br/>
   "500": "Internal Server Error",
   <br/>
   "501": "Not Implemented",
   <br/>
   "502": "Bad Gateway",
   <br/>
   "503": "Service Unavailable",
   <br/>
   "504": "Gateway Timeout",
   <br/>
   "505": "HTTP Version Not Supported",
   <br/>
   "506": "Variant Also Negotiates",
   <br/>
   "507": "Insufficient Storage",
   <br/>
   "508": "Loop Detected",
   <br/>
   "509": "Bandwidth Limit Exceeded",
   <br/>
   "510": "Not Extended",
   <br/>
   "511": "Network Authentication Required"
   <br/>
   }

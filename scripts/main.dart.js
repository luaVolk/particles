(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isc=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isu)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="c"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="n"){processStatics(init.statics[b2]=b3.n,b4)
delete b3.n}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=g,e=b7[g],d
if(typeof e=="string")d=b7[++g]
else{d=e
e=b8}if(typeof d=="number"){f=d
d=b7[++g]}b6[b8]=b6[e]=d
var a0=[d]
d.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){d=b7[g]
if(typeof d!="function")break
if(!b9)d.$stubName=b7[++g]
a0.push(d)
if(d.$stubName){b6[d.$stubName]=d
c0.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=b7[g]
var a2=b7[g]
b7=b7.slice(++g)
var a3=b7[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=b7[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=b7[2]
if(typeof b3=="number")b7[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof b7[b4]=="number")b7[b4]=b7[b4]+b
b4++}for(var a1=0;a1<b2;a1++){b7[b4]=b7[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,b7,b9,b8,a4)
b6[b8].$getter=d
d.$getterStub=true
if(b9)c0.push(a2)
b6[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(receiver) {"+"if (c === null) c = "+"H.bw"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, true, name);"+"return new c(this, funcs[0], receiver, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.bw"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, false, name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g=null
return a0?function(){if(g===null)g=H.bw(this,d,e,f,true,false,a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.cT=function(){}
var dart=[["","",,H,{"^":"",ik:{"^":"c;a"}}],["","",,J,{"^":"",
bz:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
aJ:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.by==null){H.hz()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(P.bo("Return interceptor for "+H.b(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bh()]
if(v!=null)return v
v=H.hC(a)
if(v!=null)return v
if(typeof a=="function")return C.C
y=Object.getPrototypeOf(a)
if(y==null)return C.n
if(y===Object.prototype)return C.n
if(typeof w=="function"){Object.defineProperty(w,$.$get$bh(),{value:C.j,enumerable:false,writable:true,configurable:true})
return C.j}return C.j},
u:{"^":"c;",
C:function(a,b){return a===b},
gv:function(a){return H.a5(a)},
j:["bs",function(a){return"Instance of '"+H.am(a)+"'"}],
"%":"ArrayBuffer|Blob|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|DOMError|File|MediaError|Navigator|NavigatorConcurrentHardware|NavigatorUserMediaError|OverconstrainedError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber"},
dM:{"^":"u;",
j:function(a){return String(a)},
gv:function(a){return a?519018:218159},
$iscQ:1},
bT:{"^":"u;",
C:function(a,b){return null==b},
j:function(a){return"null"},
gv:function(a){return 0},
$isD:1},
bi:{"^":"u;",
gv:function(a){return 0},
j:["bt",function(a){return String(a)}]},
ek:{"^":"bi;"},
ao:{"^":"bi;"},
ak:{"^":"bi;",
j:function(a){var z=a[$.$get$bN()]
if(z==null)return this.bt(a)
return"JavaScript function for "+H.b(J.ax(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
ah:{"^":"u;$ti",
u:function(a,b){if(!!a.fixed$length)H.y(P.o("add"))
a.push(b)},
aD:function(a,b,c){if(!!a.fixed$length)H.y(P.o("removeRange"))
P.aS(b,c,a.length,null,null,null)
a.splice(b,c-b)},
bq:function(a,b,c,d,e){var z,y,x
if(!!a.immutable$list)H.y(P.o("setRange"))
P.aS(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
y=J.H(d)
if(e+z>y.gk(d))throw H.e(H.dJ())
if(e<b)for(x=z-1;x>=0;--x)a[b+x]=y.h(d,e+x)
else for(x=0;x<z;++x)a[b+x]=y.h(d,e+x)},
X:function(a,b,c,d){return this.bq(a,b,c,d,0)},
Y:function(a,b){if(!!a.immutable$list)H.y(P.o("sort"))
H.c8(a,b)},
B:function(a,b){var z
for(z=0;z<a.length;++z)if(J.l(a[z],b))return!0
return!1},
j:function(a){return P.bf(a,"[","]")},
gA:function(a){return new J.dc(a,a.length,0)},
gv:function(a){return H.a5(a)},
gk:function(a){return a.length},
sk:function(a,b){if(!!a.fixed$length)H.y(P.o("set length"))
if(b<0)throw H.e(P.an(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(b>=a.length||b<0)throw H.e(H.aa(a,b))
return a[b]},
i:function(a,b,c){if(!!a.immutable$list)H.y(P.o("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.aa(a,b))
if(b>=a.length||b<0)throw H.e(H.aa(a,b))
a[b]=c},
t:function(a,b){var z,y
z=C.b.t(a.length,C.i.gk(b))
y=H.Z([],[H.P(a,0)])
this.sk(y,z)
this.X(y,0,a.length,a)
this.X(y,a.length,z,b)
return y},
$isB:1,
n:{
dL:function(a,b){return J.bg(H.Z(a,[b]))},
bg:function(a){a.fixed$length=Array
return a}}},
ij:{"^":"ah;$ti"},
dc:{"^":"c;a,b,c,0d",
gw:function(){return this.d},
p:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.d3(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ai:{"^":"u;",
cd:function(a,b){var z
if(typeof b!=="number")throw H.e(H.J(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gaz(b)
if(this.gaz(a)===z)return 0
if(this.gaz(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaz:function(a){return a===0?1/a<0:a<0},
cw:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(P.o(""+a+".toInt()"))},
G:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.e(P.o(""+a+".floor()"))},
O:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(P.o(""+a+".round()"))},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
t:function(a,b){if(typeof b!=="number")throw H.e(H.J(b))
return a+b},
Z:function(a,b){if(typeof b!=="number")throw H.e(H.J(b))
return a-b},
W:function(a,b){if(typeof b!=="number")throw H.e(H.J(b))
return a*b},
bv:function(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.b2(a,b)},
F:function(a,b){return(a|0)===a?a/b|0:this.b2(a,b)},
b2:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.e(P.o("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
b0:function(a,b){var z
if(a>0)z=this.c5(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
c5:function(a,b){return b>31?0:a>>>b},
ad:function(a,b){if(typeof b!=="number")throw H.e(H.J(b))
return a<b},
aI:function(a,b){if(typeof b!=="number")throw H.e(H.J(b))
return a>b},
aH:function(a,b){if(typeof b!=="number")throw H.e(H.J(b))
return a>=b},
$isb0:1,
$isz:1},
bS:{"^":"ai;",$isY:1},
bR:{"^":"ai;"},
aj:{"^":"u;",
b8:function(a,b){if(b<0)throw H.e(H.aa(a,b))
if(b>=a.length)H.y(H.aa(a,b))
return a.charCodeAt(b)},
a_:function(a,b){if(b>=a.length)throw H.e(H.aa(a,b))
return a.charCodeAt(b)},
t:function(a,b){if(typeof b!=="string")throw H.e(P.b8(b,null,null))
return a+b},
af:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.e(P.aR(b,null,null))
if(b>c)throw H.e(P.aR(b,null,null))
if(c>a.length)throw H.e(P.aR(c,null,null))
return a.substring(b,c)},
ae:function(a,b){return this.af(a,b,null)},
cz:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.a_(z,0)===133){x=J.dN(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.b8(z,w)===133?J.dO(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
W:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.e(C.o)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
ce:function(a,b,c){if(c>a.length)throw H.e(P.an(c,0,a.length,null,null))
return H.hK(a,b,c)},
B:function(a,b){return this.ce(a,b,0)},
j:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gk:function(a){return a.length},
h:function(a,b){if(b>=a.length||b<0)throw H.e(H.aa(a,b))
return a[b]},
$isp:1,
n:{
bU:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dN:function(a,b){var z,y
for(z=a.length;b<z;){y=C.e.a_(a,b)
if(y!==32&&y!==13&&!J.bU(y))break;++b}return b},
dO:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.e.b8(a,z)
if(y!==32&&y!==13&&!J.bU(y))break}return b}}}}],["","",,H,{"^":"",
dJ:function(){return new P.aH("Too few elements")},
c8:function(a,b){H.aG(a,0,J.A(a)-1,b)},
aG:function(a,b,c,d){if(c-b<=32)H.eB(a,b,c,d)
else H.eA(a,b,c,d)},
eB:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.H(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.v(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.i(a,w,y.h(a,v))
w=v}y.i(a,w,x)}},
eA:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.b.F(c-b+1,6)
y=b+z
x=c-z
w=C.b.F(b+c,2)
v=w-z
u=w+z
t=J.H(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.v(d.$2(s,r),0)){n=r
r=s
s=n}if(J.v(d.$2(p,o),0)){n=o
o=p
p=n}if(J.v(d.$2(s,q),0)){n=q
q=s
s=n}if(J.v(d.$2(r,q),0)){n=q
q=r
r=n}if(J.v(d.$2(s,p),0)){n=p
p=s
s=n}if(J.v(d.$2(q,p),0)){n=p
p=q
q=n}if(J.v(d.$2(r,o),0)){n=o
o=r
r=n}if(J.v(d.$2(r,q),0)){n=q
q=r
r=n}if(J.v(d.$2(p,o),0)){n=o
o=p
p=n}t.i(a,y,s)
t.i(a,w,q)
t.i(a,x,o)
t.i(a,v,t.h(a,b))
t.i(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.l(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
l=h
m=g
break}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)<0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.h(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=g}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=h
break}}f=!1}e=m-1
t.i(a,b,t.h(a,e))
t.i(a,e,r)
e=l+1
t.i(a,c,t.h(a,e))
t.i(a,e,p)
H.aG(a,b,m-2,d)
H.aG(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.l(d.$2(t.h(a,m),r),0);)++m
for(;J.l(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)===0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=g}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=h
break}}H.aG(a,m,l,d)}else H.aG(a,m,l,d)},
bP:{"^":"aC;"},
c_:{"^":"c;a,b,c,0d",
gw:function(){return this.d},
p:function(){var z,y,x,w
z=this.a
y=J.H(z)
x=y.gk(z)
if(this.b!==x)throw H.e(P.ad(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a7(z,w);++this.c
return!0}},
dZ:{"^":"aC;a,b,$ti",
gA:function(a){var z=this.a
return new H.c1(z.gA(z),this.b)},
gk:function(a){return this.a.a.a},
$asaC:function(a,b){return[b]},
n:{
e_:function(a,b,c,d){return new H.dy(a,b,[c,d])}}},
dy:{"^":"dZ;a,b,$ti"},
c1:{"^":"dK;0a,b,c",
p:function(){var z=this.b
if(z.p()){this.a=this.c.$1(z.d)
return!0}this.a=null
return!1},
gw:function(){return this.a}}}],["","",,H,{"^":"",
aM:function(a){var z=init.mangledGlobalNames[a]
if(typeof z==="string")return z
z="minified:"+a
return z},
ht:function(a){return init.types[a]},
cY:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.n(a).$isa2},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ax(a)
if(typeof z!=="string")throw H.e(H.J(a))
return z},
a5:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
eu:function(a,b){var z,y,x,w,v,u
if(typeof a!=="string")H.y(H.J(a))
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return
y=z[3]
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return}if(b<2||b>36)throw H.e(P.an(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.e.a_(w,u)|32)>x)return}return parseInt(a,b)},
et:function(a){var z,y
if(typeof a!=="string")H.y(H.J(a))
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return
z=parseFloat(a)
if(isNaN(z)){y=J.b6(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return}return z},
am:function(a){return H.el(a)+H.cF(H.av(a),0,null)},
el:function(a){var z,y,x,w,v,u,t,s,r
z=J.n(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.u||!!z.$isao){u=C.m(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.aM(w.length>1&&C.e.a_(w,0)===36?C.e.ae(w,1):w)},
C:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
es:function(a){return a.b?H.C(a).getUTCFullYear()+0:H.C(a).getFullYear()+0},
eq:function(a){return a.b?H.C(a).getUTCMonth()+1:H.C(a).getMonth()+1},
em:function(a){return a.b?H.C(a).getUTCDate()+0:H.C(a).getDate()+0},
en:function(a){return a.b?H.C(a).getUTCHours()+0:H.C(a).getHours()+0},
ep:function(a){return a.b?H.C(a).getUTCMinutes()+0:H.C(a).getMinutes()+0},
er:function(a){return a.b?H.C(a).getUTCSeconds()+0:H.C(a).getSeconds()+0},
eo:function(a){return a.b?H.C(a).getUTCMilliseconds()+0:H.C(a).getMilliseconds()+0},
aa:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a1(!0,b,"index",null)
z=J.A(a)
if(b<0||b>=z)return P.aP(b,a,"index",null,z)
return P.aR(b,"index",null)},
J:function(a){return new P.a1(!0,a,null,null)},
e:function(a){var z
if(a==null)a=new P.bk()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.d4})
z.name=""}else z.toString=H.d4
return z},
d4:function(){return J.ax(this.dartException)},
y:function(a){throw H.e(a)},
d3:function(a){throw H.e(P.ad(a))},
a_:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.hO(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.b0(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bj(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.c3(H.b(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$cf()
u=$.$get$cg()
t=$.$get$ch()
s=$.$get$ci()
r=$.$get$cm()
q=$.$get$cn()
p=$.$get$ck()
$.$get$cj()
o=$.$get$cp()
n=$.$get$co()
m=v.D(y)
if(m!=null)return z.$1(H.bj(y,m))
else{m=u.D(y)
if(m!=null){m.method="call"
return z.$1(H.bj(y,m))}else{m=t.D(y)
if(m==null){m=s.D(y)
if(m==null){m=r.D(y)
if(m==null){m=q.D(y)
if(m==null){m=p.D(y)
if(m==null){m=s.D(y)
if(m==null){m=o.D(y)
if(m==null){m=n.D(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.c3(y,m))}}return z.$1(new H.eO(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.c9()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a1(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.c9()
return a},
X:function(a){var z
if(a==null)return new H.cC(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.cC(a)},
cS:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.i(0,a[y],a[x])}return b},
hB:function(a,b,c,d,e,f){switch(b){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.e(new P.fg("Unsupported number of arguments for wrapped closure"))},
N:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.hB)
a.$identity=z
return z},
dk:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b[0]
y=z.$callName
if(!!J.n(d).$isB){z.$reflectionInfo=d
x=H.ex(z).r}else x=d
w=e?Object.create(new H.eC().constructor.prototype):Object.create(new H.b9(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.K
$.K=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=H.bK(a,z,f)
t.$reflectionInfo=d}else{w.$static_name=g
t=z}if(typeof x=="number")s=function(h,i){return function(){return h(i)}}(H.ht,x)
else if(typeof x=="function")if(e)s=x
else{r=f?H.bJ:H.ba
s=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,r)}else throw H.e("Error in reflectionInfo.")
w.$S=s
w[y]=t
for(q=t,p=1;p<b.length;++p){o=b[p]
n=o.$callName
if(n!=null){o=e?o:H.bK(a,o,f)
w[n]=o}if(p===c){o.$reflectionInfo=d
q=o}}w["call*"]=q
w.$R=z.$R
w.$D=z.$D
return v},
dh:function(a,b,c,d){var z=H.ba
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bK:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.dj(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.dh(y,!w,z,b)
if(y===0){w=$.K
$.K=w+1
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.ac
if(v==null){v=H.aO("self")
$.ac=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.K
$.K=w+1
t+=H.b(w)
w="return function("+t+"){return this."
v=$.ac
if(v==null){v=H.aO("self")
$.ac=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
di:function(a,b,c,d){var z,y
z=H.ba
y=H.bJ
switch(b?-1:a){case 0:throw H.e(H.ez("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
dj:function(a,b){var z,y,x,w,v,u,t,s
z=$.ac
if(z==null){z=H.aO("self")
$.ac=z}y=$.bI
if(y==null){y=H.aO("receiver")
$.bI=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.di(w,!u,x,b)
if(w===1){z="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
y=$.K
$.K=y+1
return new Function(z+H.b(y)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
y=$.K
$.K=y+1
return new Function(z+H.b(y)+"}")()},
bw:function(a,b,c,d,e,f,g){return H.dk(a,b,c,d,!!e,!!f,g)},
hI:function(a,b){throw H.e(H.dg(a,H.aM(b.substring(3))))},
b2:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.n(a)[b]
else z=!0
if(z)return a
H.hI(a,b)},
cR:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[z]
else return a.$S()}return},
aI:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.cR(J.n(a))
if(z==null)return!1
return H.cE(z,null,b,null)},
hc:function(a){var z,y
z=J.n(a)
if(!!z.$isf){y=H.cR(z)
if(y!=null)return H.hJ(y)
return"Closure"}return H.am(a)},
hN:function(a){throw H.e(new P.dq(a))},
cW:function(a){return init.getIsolateTag(a)},
Z:function(a,b){a.$ti=b
return a},
av:function(a){if(a==null)return
return a.$ti},
iE:function(a,b,c){return H.aw(a["$as"+H.b(c)],H.av(b))},
hs:function(a,b,c,d){var z=H.aw(a["$as"+H.b(c)],H.av(b))
return z==null?null:z[d]},
P:function(a,b){var z=H.av(a)
return z==null?null:z[b]},
hJ:function(a){return H.W(a,null)},
W:function(a,b){if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.aM(a[0].builtin$cls)+H.cF(a,1,b)
if(typeof a=="function")return H.aM(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+H.b(a)
return H.b(b[b.length-a-1])}if('func' in a)return H.h3(a,b)
if('futureOr' in a)return"FutureOr<"+H.W("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
h3:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
if("bounds" in a){z=a.bounds
if(b==null){b=H.Z([],[P.p])
y=null}else y=b.length
x=b.length
for(w=z.length,v=w;v>0;--v)b.push("T"+(x+v))
for(u="<",t="",v=0;v<w;++v,t=", "){u=C.e.t(u+t,b[b.length-v-1])
s=z[v]
if(s!=null&&s!==P.c)u+=" extends "+H.W(s,b)}u+=">"}else{u=""
y=null}r=!!a.v?"void":H.W(a.ret,b)
if("args" in a){q=a.args
for(p=q.length,o="",n="",m=0;m<p;++m,n=", "){l=q[m]
o=o+n+H.W(l,b)}}else{o=""
n=""}if("opt" in a){k=a.opt
o+=n+"["
for(p=k.length,n="",m=0;m<p;++m,n=", "){l=k[m]
o=o+n+H.W(l,b)}o+="]"}if("named" in a){j=a.named
o+=n+"{"
for(p=H.hp(j),i=p.length,n="",m=0;m<i;++m,n=", "){h=p[m]
o=o+n+H.W(j[h],b)+(" "+H.b(h))}o+="}"}if(y!=null)b.length=y
return u+"("+o+") => "+r},
cF:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bm("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.W(u,c)}return"<"+z.j(0)+">"},
aw:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
a9:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.av(a)
y=J.n(a)
if(y[b]==null)return!1
return H.cN(H.aw(y[d],z),null,c,null)},
cN:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.I(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.I(a[y],b,c[y],d))return!1
return!0},
iC:function(a,b,c){return a.apply(b,H.aw(J.n(b)["$as"+H.b(c)],H.av(b)))},
I:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="c"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="c"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.I(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="D")return!0
if('func' in c)return H.cE(a,b,c,d)
if('func' in a)return c.builtin$cls==="ig"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.I("type" in a?a.type:null,b,x,d)
else if(H.I(a,b,x,d))return!0
else{if(!('$is'+"L" in y.prototype))return!1
w=y.prototype["$as"+"L"]
v=H.aw(w,z?a.slice(1):null)
return H.I(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.cN(H.aw(r,z),b,u,d)},
cE:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.I(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.I(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.I(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.I(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.hG(m,b,l,d)},
hG:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.I(c[w],d,a[w],b))return!1}return!0},
iD:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
hC:function(a){var z,y,x,w,v,u
z=$.cX.$1(a)
y=$.b_[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b3[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.cM.$2(a,z)
if(z!=null){y=$.b_[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b3[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.b4(x)
$.b_[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.b3[z]=x
return x}if(v==="-"){u=H.b4(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.d_(a,x)
if(v==="*")throw H.e(P.bo(z))
if(init.leafTags[z]===true){u=H.b4(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.d_(a,x)},
d_:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bz(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
b4:function(a){return J.bz(a,!1,null,!!a.$isa2)},
hF:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.b4(z)
else return J.bz(z,c,null,null)},
hz:function(){if(!0===$.by)return
$.by=!0
H.hA()},
hA:function(){var z,y,x,w,v,u,t,s
$.b_=Object.create(null)
$.b3=Object.create(null)
H.hv()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.d1.$1(v)
if(u!=null){t=H.hF(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
hv:function(){var z,y,x,w,v,u,t
z=C.z()
z=H.a8(C.w,H.a8(C.B,H.a8(C.l,H.a8(C.l,H.a8(C.A,H.a8(C.x,H.a8(C.y(C.m),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cX=new H.hw(v)
$.cM=new H.hx(u)
$.d1=new H.hy(t)},
a8:function(a,b){return a(b)||b},
hK:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
iB:[function(a){return a},"$1","cG",4,0,14],
hL:function(a,b,c,d){var z,y,x,w,v,u
for(z=b.c8(0,a),z=new H.bp(z.a,z.b,z.c),y=0,x="";z.p();x=w){w=z.d
v=w.b
u=v.index
w=x+H.b(H.cG().$1(C.e.af(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.cG().$1(C.e.ae(a,y)))
return z.charCodeAt(0)==0?z:z},
hM:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=b.b4(0,a,d)
y=new H.bp(z.a,z.b,z.c)
if(!y.p())return a
x=y.d
w=H.b(c.$1(x))
z=x.b.index
v=x.gba()
u=P.aS(z,v,a.length,null,null,null)
t=a.substring(0,z)
s=a.substring(u)
return t+w+s},
ew:{"^":"c;a,b,c,d,e,f,r,0x",n:{
ex:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.bg(z)
y=z[0]
x=z[1]
return new H.ew(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
eM:{"^":"c;a,b,c,d,e,f",
D:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
n:{
M:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.Z([],[P.p])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.eM(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
aW:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
cl:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
e0:{"^":"x;a,b",
j:function(a){var z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
return"NoSuchMethodError: method not found: '"+z+"' on null"},
n:{
c3:function(a,b){return new H.e0(a,b==null?null:b.method)}}},
dR:{"^":"x;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
n:{
bj:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.dR(a,y,z?null:b.receiver)}}},
eO:{"^":"x;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
hO:{"^":"f:3;a",
$1:function(a){if(!!J.n(a).$isx)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
cC:{"^":"c;a,0b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isU:1},
f:{"^":"c;",
j:function(a){return"Closure '"+H.am(this).trim()+"'"},
gbp:function(){return this},
gbp:function(){return this}},
cc:{"^":"f;"},
eC:{"^":"cc;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.aM(z)+"'"}},
b9:{"^":"cc;a,b,c,d",
C:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.b9))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.a5(this.a)
else y=typeof z!=="object"?J.a0(z):H.a5(z)
return(y^H.a5(this.b))>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+("Instance of '"+H.am(z)+"'")},
n:{
ba:function(a){return a.a},
bJ:function(a){return a.c},
aO:function(a){var z,y,x,w,v
z=new H.b9("self","target","receiver","name")
y=J.bg(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
df:{"^":"x;a",
j:function(a){return this.a},
n:{
dg:function(a,b){return new H.df("CastError: "+H.b(P.bc(a))+": type '"+H.hc(a)+"' is not a subtype of type '"+b+"'")}}},
ey:{"^":"x;a",
j:function(a){return"RuntimeError: "+H.b(this.a)},
n:{
ez:function(a){return new H.ey(a)}}},
aD:{"^":"dW;a,0b,0c,0d,0e,0f,r,$ti",
gk:function(a){return this.a},
gaB:function(){return new H.bX(this,[H.P(this,0)])},
gcA:function(a){var z=H.P(this,0)
return H.e_(new H.bX(this,[z]),new H.dQ(this),z,H.P(this,1))},
a6:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bL(z,a)}else{y=this.cl(a)
return y}},
cl:function(a){var z=this.d
if(z==null)return!1
return this.ay(this.aq(z,J.a0(a)&0x3ffffff),a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.a0(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.a0(w,b)
x=y==null?null:y.b
return x}else return this.cm(b)},
cm:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.aq(z,J.a0(a)&0x3ffffff)
x=this.ay(y,a)
if(x<0)return
return y[x].b},
i:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.ar()
this.b=z}this.aL(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ar()
this.c=y}this.aL(y,b,c)}else{x=this.d
if(x==null){x=this.ar()
this.d=x}w=J.a0(b)&0x3ffffff
v=this.aq(x,w)
if(v==null)this.av(x,w,[this.as(b,c)])
else{u=this.ay(v,b)
if(u>=0)v[u].b=c
else v.push(this.as(b,c))}}},
a8:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(P.ad(this))
z=z.c}},
aL:function(a,b,c){var z=this.a0(a,b)
if(z==null)this.av(a,b,this.as(b,c))
else z.b=c},
aW:function(){this.r=this.r+1&67108863},
as:function(a,b){var z,y
z=new H.dS(a,b)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.aW()
return z},
ay:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.l(a[y].a,b))return y
return-1},
j:function(a){return P.c0(this)},
a0:function(a,b){return a[b]},
aq:function(a,b){return a[b]},
av:function(a,b,c){a[b]=c},
bO:function(a,b){delete a[b]},
bL:function(a,b){return this.a0(a,b)!=null},
ar:function(){var z=Object.create(null)
this.av(z,"<non-identifier-key>",z)
this.bO(z,"<non-identifier-key>")
return z}},
dQ:{"^":"f;a",
$1:function(a){return this.a.h(0,a)},
$S:function(){var z=this.a
return{func:1,ret:H.P(z,1),args:[H.P(z,0)]}}},
dS:{"^":"c;a,b,0c,0d"},
bX:{"^":"bP;a,$ti",
gk:function(a){return this.a.a},
gA:function(a){var z,y
z=this.a
y=new H.dT(z,z.r)
y.c=z.e
return y},
B:function(a,b){return this.a.a6(b)}},
dT:{"^":"c;a,b,0c,0d",
gw:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.e(P.ad(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
hw:{"^":"f:3;a",
$1:function(a){return this.a(a)}},
hx:{"^":"f;a",
$2:function(a,b){return this.a(a,b)}},
hy:{"^":"f;a",
$1:function(a){return this.a(a)}},
dP:{"^":"c;a,b,0c,0d",
j:function(a){return"RegExp/"+this.a+"/"},
gbW:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.bV(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
ci:function(a){var z=this.b.exec(a)
if(z==null)return
return new H.cB(this,z)},
b4:function(a,b,c){if(c>b.length)throw H.e(P.an(c,0,b.length,null,null))
return new H.eU(this,b,c)},
c8:function(a,b){return this.b4(a,b,0)},
bT:function(a,b){var z,y
z=this.gbW()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.cB(this,y)},
n:{
bV:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.e(P.bd("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
cB:{"^":"c;a,b",
gba:function(){var z=this.b
return z.index+z[0].length},
h:function(a,b){return this.b[b]},
$isc2:1},
eU:{"^":"dH;a,b,c",
gA:function(a){return new H.bp(this.a,this.b,this.c)},
$asaC:function(){return[P.c2]}},
bp:{"^":"c;a,b,c,0d",
gw:function(){return this.d},
p:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.bT(z,y)
if(x!=null){this.d=x
w=x.gba()
this.c=x.b.index===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}}}],["","",,H,{"^":"",
hp:function(a){return J.dL(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
hH:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":""}],["","",,P,{"^":"",
eW:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.hd()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.N(new P.eY(z),1)).observe(y,{childList:true})
return new P.eX(z,y,x)}else if(self.setImmediate!=null)return P.he()
return P.hf()},
iu:[function(a){self.scheduleImmediate(H.N(new P.eZ(a),0))},"$1","hd",4,0,2],
iv:[function(a){self.setImmediate(H.N(new P.f_(a),0))},"$1","he",4,0,2],
iw:[function(a){P.bn(C.q,a)},"$1","hf",4,0,2],
bn:function(a,b){var z=C.b.F(a.a,1000)
return P.fQ(z<0?0:z,b)},
ce:function(a,b){var z=C.b.F(a.a,1000)
return P.fR(z<0?0:z,b)},
h7:function(a,b){if(H.aI(a,{func:1,args:[P.c,P.U]}))return b.bh(a)
if(H.aI(a,{func:1,args:[P.c]}))return a
throw H.e(P.b8(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
h5:function(){var z,y
for(;z=$.a7,z!=null;){$.aq=null
y=z.b
$.a7=y
if(y==null)$.ap=null
z.a.$0()}},
iA:[function(){$.bu=!0
try{P.h5()}finally{$.aq=null
$.bu=!1
if($.a7!=null)$.$get$bq().$1(P.cP())}},"$0","cP",0,0,1],
cK:function(a){var z=new P.cr(a)
if($.a7==null){$.ap=z
$.a7=z
if(!$.bu)$.$get$bq().$1(P.cP())}else{$.ap.b=z
$.ap=z}},
hb:function(a){var z,y,x
z=$.a7
if(z==null){P.cK(a)
$.aq=$.ap
return}y=new P.cr(a)
x=$.aq
if(x==null){y.b=z
$.aq=y
$.a7=y}else{y.b=x.b
x.b=y
$.aq=y
if(y.b==null)$.ap=y}},
d2:function(a){var z=$.k
if(C.c===z){P.V(null,null,C.c,a)
return}z.toString
P.V(null,null,z,z.aw(a))},
cJ:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.a_(x)
y=H.X(x)
w=$.k
w.toString
P.ar(null,null,w,z,y)}},
h6:[function(a,b){var z=$.k
z.toString
P.ar(null,null,z,a,b)},function(a){return P.h6(a,null)},"$2","$1","hg",4,2,4],
iz:[function(){},"$0","cO",0,0,1],
ha:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.a_(u)
y=H.X(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.d8(x)
w=t
v=x.gbr()
c.$2(w,v)}}},
fX:function(a,b,c,d){var z=a.U()
if(!!J.n(z).$isL&&z!==$.$get$aB())z.bn(new P.h_(b,c,d))
else b.I(c,d)},
fY:function(a,b){return new P.fZ(a,b)},
h0:function(a,b,c){var z=a.U()
if(!!J.n(z).$isL&&z!==$.$get$aB())z.bn(new P.h1(b,!0))
else b.P(!0)},
eK:function(a,b){var z=$.k
if(z===C.c){z.toString
return P.bn(a,b)}return P.bn(a,z.aw(b))},
eL:function(a,b){var z,y
z=$.k
if(z===C.c){z.toString
return P.ce(a,b)}y=z.b5(b,P.cd)
$.k.toString
return P.ce(a,y)},
ar:function(a,b,c,d,e){var z={}
z.a=d
P.hb(new P.h8(z,e))},
cH:function(a,b,c,d){var z,y
y=$.k
if(y===c)return d.$0()
$.k=c
z=y
try{y=d.$0()
return y}finally{$.k=z}},
cI:function(a,b,c,d,e){var z,y
y=$.k
if(y===c)return d.$1(e)
$.k=c
z=y
try{y=d.$1(e)
return y}finally{$.k=z}},
h9:function(a,b,c,d,e,f){var z,y
y=$.k
if(y===c)return d.$2(e,f)
$.k=c
z=y
try{y=d.$2(e,f)
return y}finally{$.k=z}},
V:function(a,b,c,d){var z=C.c!==c
if(z)d=!(!z||!1)?c.aw(d):c.c9(d)
P.cK(d)},
eY:{"^":"f:0;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
eX:{"^":"f;a,b,c",
$1:function(a){var z,y
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
eZ:{"^":"f;a",
$0:function(){this.a.$0()}},
f_:{"^":"f;a",
$0:function(){this.a.$0()}},
cD:{"^":"c;a,0b,c",
bx:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.N(new P.fT(this,b),0),a)
else throw H.e(P.o("`setTimeout()` not found."))},
by:function(a,b){if(self.setTimeout!=null)this.b=self.setInterval(H.N(new P.fS(this,a,Date.now(),b),0),a)
else throw H.e(P.o("Periodic timer."))},
$iscd:1,
n:{
fQ:function(a,b){var z=new P.cD(!0,0)
z.bx(a,b)
return z},
fR:function(a,b){var z=new P.cD(!1,0)
z.by(a,b)
return z}}},
fT:{"^":"f;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
fS:{"^":"f;a,b,c,d",
$0:function(){var z,y,x,w
z=this.a
y=z.c+1
x=this.b
if(x>0){w=Date.now()-this.c
if(w>(y+1)*x)y=C.b.bv(w,x)}z.c=y
this.d.$1(z)}},
f0:{"^":"ct;a,$ti"},
f1:{"^":"f5;dx,0dy,0fr,x,0a,0b,0c,d,e,0f,0r",
at:function(){},
au:function(){}},
cs:{"^":"c;L:c<,$ti",
ga1:function(){return this.c<4},
bR:function(){var z=this.r
if(z!=null)return z
z=new P.G(0,$.k,[null])
this.r=z
return z},
b_:function(a){var z,y
z=a.fr
y=a.dy
if(z==null)this.d=y
else z.dy=y
if(y==null)this.e=z
else y.fr=z
a.fr=a
a.dy=a},
c6:function(a,b,c,d){var z,y,x
if((this.c&4)!==0){if(c==null)c=P.cO()
z=new P.fc($.k,0,c)
z.c2()
return z}z=$.k
y=new P.f1(0,this,z,d?1:0)
y.bw(a,b,c,d)
y.fr=y
y.dy=y
y.dx=this.c&1
x=this.e
this.e=y
y.dy=null
y.fr=x
if(x==null)this.d=y
else x.dy=y
if(this.d===y)P.cJ(this.a)
return y},
bY:function(a){var z
if(a.dy===a)return
z=a.dx
if((z&2)!==0)a.dx=z|4
else{this.b_(a)
if((this.c&2)===0&&this.d==null)this.aj()}return},
ag:["bu",function(){if((this.c&4)!==0)return new P.aH("Cannot add new events after calling close")
return new P.aH("Cannot add new events while doing an addStream")}],
u:[function(a,b){if(!this.ga1())throw H.e(this.ag())
this.a4(b)},"$1","gc7",5,0,7],
b7:function(a){var z
if((this.c&4)!==0)return this.r
if(!this.ga1())throw H.e(this.ag())
this.c|=4
z=this.bR()
this.S()
return z},
aU:function(a){var z,y,x,w
z=this.c
if((z&2)!==0)throw H.e(P.aU("Cannot fire new event. Controller is already firing an event"))
y=this.d
if(y==null)return
x=z&1
this.c=z^3
for(;y!=null;){z=y.dx
if((z&1)===x){y.dx=z|2
a.$1(y)
z=y.dx^=1
w=y.dy
if((z&4)!==0)this.b_(y)
y.dx&=4294967293
y=w}else y=y.dy}this.c&=4294967293
if(this.d==null)this.aj()},
aj:function(){if((this.c&4)!==0&&this.r.a===0)this.r.ai(null)
P.cJ(this.b)}},
fN:{"^":"cs;a,b,c,0d,0e,0f,0r,$ti",
ga1:function(){return P.cs.prototype.ga1.call(this)&&(this.c&2)===0},
ag:function(){if((this.c&2)!==0)return new P.aH("Cannot fire new event. Controller is already firing an event")
return this.bu()},
a4:function(a){var z=this.d
if(z==null)return
if(z===this.e){this.c|=2
z.aK(a)
this.c&=4294967293
if(this.d==null)this.aj()
return}this.aU(new P.fO(a))},
S:function(){if(this.d!=null)this.aU(new P.fP())
else this.r.ai(null)}},
fO:{"^":"f;a",
$1:function(a){a.aK(this.a)}},
fP:{"^":"f;",
$1:function(a){a.bG()}},
f4:{"^":"c;$ti"},
eV:{"^":"f4;a,$ti"},
cv:{"^":"c;0a,b,c,d,e",
cn:function(a){if(this.c!==6)return!0
return this.b.b.aF(this.d,a.a)},
ck:function(a){var z,y
z=this.e
y=this.b.b
if(H.aI(z,{func:1,args:[P.c,P.U]}))return y.cr(z,a.a,a.b)
else return y.aF(z,a.a)}},
G:{"^":"c;L:a<,b,0c1:c<,$ti",
bl:function(a,b,c){var z,y
z=$.k
if(z!==C.c){z.toString
if(b!=null)b=P.h7(b,z)}y=new P.G(0,$.k,[c])
this.ah(new P.cv(y,b==null?1:3,a,b))
return y},
cv:function(a,b){return this.bl(a,null,b)},
bn:function(a){var z,y
z=$.k
y=new P.G(0,z,this.$ti)
if(z!==C.c)z.toString
this.ah(new P.cv(y,8,a,null))
return y},
c4:function(a){this.a=4
this.c=a},
ah:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.ah(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.V(null,null,z,new P.fi(this,a))}},
aZ:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.aZ(a)
return}this.a=u
this.c=y.c}z.a=this.a3(a)
y=this.b
y.toString
P.V(null,null,y,new P.fp(z,this))}},
a2:function(){var z=this.c
this.c=null
return this.a3(z)},
a3:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
P:function(a){var z,y
z=this.$ti
if(H.a9(a,"$isL",z,"$asL"))if(H.a9(a,"$isG",z,null))P.aY(a,this)
else P.cw(a,this)
else{y=this.a2()
this.a=4
this.c=a
P.a6(this,y)}},
I:[function(a,b){var z=this.a2()
this.a=8
this.c=new P.aN(a,b)
P.a6(this,z)},function(a){return this.I(a,null)},"cB","$2","$1","gaQ",4,2,4],
ai:function(a){var z
if(H.a9(a,"$isL",this.$ti,"$asL")){this.bD(a)
return}this.a=1
z=this.b
z.toString
P.V(null,null,z,new P.fk(this,a))},
bD:function(a){var z
if(H.a9(a,"$isG",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.V(null,null,z,new P.fo(this,a))}else P.aY(a,this)
return}P.cw(a,this)},
bA:function(a,b){var z
this.a=1
z=this.b
z.toString
P.V(null,null,z,new P.fj(this,a,b))},
$isL:1,
n:{
cw:function(a,b){var z,y,x
b.a=1
try{a.bl(new P.fl(b),new P.fm(b),null)}catch(x){z=H.a_(x)
y=H.X(x)
P.d2(new P.fn(b,z,y))}},
aY:function(a,b){var z,y
for(;z=a.a,z===2;)a=a.c
if(z>=4){y=b.a2()
b.a=a.a
b.c=a.c
P.a6(b,y)}else{y=b.c
b.a=2
b.c=a
a.aZ(y)}},
a6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.a
v=v.b
y.toString
P.ar(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
P.a6(z.a,b)}y=z.a
s=y.c
x.a=w
x.b=s
v=!w
if(v){u=b.c
u=(u&1)!==0||u===8}else u=!0
if(u){u=b.b
r=u.b
if(w){q=y.b
q.toString
q=q==null?r==null:q===r
if(!q)r.toString
else q=!0
q=!q}else q=!1
if(q){y=y.b
v=s.a
u=s.b
y.toString
P.ar(null,null,y,v,u)
return}p=$.k
if(p==null?r!=null:p!==r)$.k=r
else p=null
y=b.c
if(y===8)new P.fs(z,x,b,w).$0()
else if(v){if((y&1)!==0)new P.fr(x,b,s).$0()}else if((y&2)!==0)new P.fq(z,x,b).$0()
if(p!=null)$.k=p
y=x.b
if(!!J.n(y).$isL){if(y.a>=4){o=u.c
u.c=null
b=u.a3(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.aY(y,u)
return}}n=b.b
o=n.c
n.c=null
b=n.a3(o)
y=x.a
v=x.b
if(!y){n.a=4
n.c=v}else{n.a=8
n.c=v}z.a=n
y=n}}}},
fi:{"^":"f;a,b",
$0:function(){P.a6(this.a,this.b)}},
fp:{"^":"f;a,b",
$0:function(){P.a6(this.b,this.a.a)}},
fl:{"^":"f:0;a",
$1:function(a){var z=this.a
z.a=0
z.P(a)}},
fm:{"^":"f:8;a",
$2:function(a,b){this.a.I(a,b)},
$1:function(a){return this.$2(a,null)}},
fn:{"^":"f;a,b,c",
$0:function(){this.a.I(this.b,this.c)}},
fk:{"^":"f;a,b",
$0:function(){var z,y
z=this.a
y=z.a2()
z.a=4
z.c=this.b
P.a6(z,y)}},
fo:{"^":"f;a,b",
$0:function(){P.aY(this.b,this.a)}},
fj:{"^":"f;a,b,c",
$0:function(){this.a.I(this.b,this.c)}},
fs:{"^":"f;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.bj(w.d)}catch(v){y=H.a_(v)
x=H.X(v)
if(this.d){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.aN(y,x)
u.a=!0
return}if(!!J.n(z).$isL){if(z instanceof P.G&&z.gL()>=4){if(z.gL()===8){w=this.b
w.b=z.gc1()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.cv(new P.ft(t),null)
w.a=!1}}},
ft:{"^":"f:9;a",
$1:function(a){return this.a}},
fr:{"^":"f;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.aF(x.d,this.c)}catch(w){z=H.a_(w)
y=H.X(w)
x=this.a
x.b=new P.aN(z,y)
x.a=!0}}},
fq:{"^":"f;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.cn(z)&&w.e!=null){v=this.b
v.b=w.ck(z)
v.a=!1}}catch(u){y=H.a_(u)
x=H.X(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.aN(y,x)
s.a=!0}}},
cr:{"^":"c;a,0b"},
aV:{"^":"c;$ti",
B:function(a,b){var z,y
z={}
y=new P.G(0,$.k,[P.cQ])
z.a=null
z.a=this.H(new P.eF(z,this,b,y),!0,new P.eG(y),y.gaQ())
return y},
gk:function(a){var z,y
z={}
y=new P.G(0,$.k,[P.Y])
z.a=0
this.H(new P.eH(z,this),!0,new P.eI(z,y),y.gaQ())
return y}},
eF:{"^":"f;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.ha(new P.eD(a,this.c),new P.eE(z,y),P.fY(z.a,y))},
$S:function(){return{func:1,ret:P.D,args:[H.P(this.b,0)]}}},
eD:{"^":"f;a,b",
$0:function(){return J.l(this.a,this.b)}},
eE:{"^":"f;a,b",
$1:function(a){if(a)P.h0(this.a.a,this.b,!0)}},
eG:{"^":"f;a",
$0:function(){this.a.P(!1)}},
eH:{"^":"f;a,b",
$1:function(a){++this.a.a},
$S:function(){return{func:1,ret:P.D,args:[H.P(this.b,0)]}}},
eI:{"^":"f;a,b",
$0:function(){this.b.P(this.a.a)}},
ca:{"^":"c;"},
ct:{"^":"fK;",
gv:function(a){return(H.a5(this.a)^892482866)>>>0},
C:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.ct))return!1
return b.a===this.a}},
f5:{"^":"f2;",
aX:function(){return this.x.bY(this)},
at:function(){},
au:function(){}},
f2:{"^":"c;L:e<",
bw:function(a,b,c,d){var z,y
z=this.d
z.toString
this.a=a
y=b==null?P.hg():b
if(H.aI(y,{func:1,ret:-1,args:[P.c,P.U]}))this.b=z.bh(y)
else if(H.aI(y,{func:1,ret:-1,args:[P.c]}))this.b=y
else H.y(P.b7("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace."))
this.c=c==null?P.cO():c},
U:function(){var z=this.e&=4294967279
if((z&8)===0)this.aN()
z=$.$get$aB()
return z},
aN:function(){var z,y
z=this.e|=8
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.r=null
this.f=this.aX()},
aK:function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.a4(a)
else this.aM(new P.f9(a))},
bG:function(){var z=this.e
if((z&8)!==0)return
z|=2
this.e=z
if(z<32)this.S()
else this.aM(C.p)},
at:function(){},
au:function(){},
aX:function(){return},
aM:function(a){var z,y
z=this.r
if(z==null){z=new P.fL(0)
this.r=z}z.u(0,a)
y=this.e
if((y&64)===0){y|=64
this.e=y
if(y<128)this.r.aJ(this)}},
a4:function(a){var z=this.e
this.e=z|32
this.d.bk(this.a,a)
this.e&=4294967263
this.bF((z&4)!==0)},
S:function(){this.aN()
this.e|=16
new P.f3(this).$0()},
bF:function(a){var z,y,x
z=this.e
if((z&64)!==0&&this.r.c==null){z&=4294967231
this.e=z
if((z&4)!==0)if(z<128){y=this.r
y=y==null||y.c==null}else y=!1
else y=!1
if(y){z&=4294967291
this.e=z}}for(;!0;a=x){if((z&8)!==0){this.r=null
return}x=(z&4)!==0
if(a===x)break
this.e=z^32
if(x)this.at()
else this.au()
z=this.e&=4294967263}if((z&64)!==0&&z<128)this.r.aJ(this)}},
f3:{"^":"f;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=y|42
z.d.aE(z.c)
z.e&=4294967263}},
fK:{"^":"aV;",
H:function(a,b,c,d){return this.a.c6(a,d,c,!0===b)}},
fb:{"^":"c;0aa:a@"},
f9:{"^":"fb;b,0a",
bf:function(a){a.a4(this.b)}},
fa:{"^":"c;",
bf:function(a){a.S()},
gaa:function(){return},
saa:function(a){throw H.e(P.aU("No events after a done."))}},
fE:{"^":"c;L:a<",
aJ:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.d2(new P.fF(this,a))
this.a=1}},
fF:{"^":"f;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gaa()
z.b=w
if(w==null)z.c=null
x.bf(this.b)}},
fL:{"^":"fE;0b,0c,a",
u:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saa(b)
this.c=b}}},
fc:{"^":"c;a,L:b<,c",
c2:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.V(null,null,z,this.gc3())
this.b|=2},
U:function(){return $.$get$aB()},
S:[function(){var z=this.b&=4294967293
if(z>=4)return
this.b=z|1
this.a.aE(this.c)},"$0","gc3",0,0,1]},
h_:{"^":"f;a,b,c",
$0:function(){return this.a.I(this.b,this.c)}},
fZ:{"^":"f:10;a,b",
$2:function(a,b){P.fX(this.a,this.b,a,b)}},
h1:{"^":"f;a,b",
$0:function(){return this.a.P(this.b)}},
cd:{"^":"c;"},
aN:{"^":"c;cg:a>,br:b<",
j:function(a){return H.b(this.a)},
$isx:1},
fU:{"^":"c;"},
h8:{"^":"f;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bk()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
x=H.e(z)
x.stack=y.j(0)
throw x}},
fG:{"^":"fU;",
aE:function(a){var z,y,x
try{if(C.c===$.k){a.$0()
return}P.cH(null,null,this,a)}catch(x){z=H.a_(x)
y=H.X(x)
P.ar(null,null,this,z,y)}},
cu:function(a,b){var z,y,x
try{if(C.c===$.k){a.$1(b)
return}P.cI(null,null,this,a,b)}catch(x){z=H.a_(x)
y=H.X(x)
P.ar(null,null,this,z,y)}},
bk:function(a,b){return this.cu(a,b,null)},
ca:function(a){return new P.fI(this,a)},
c9:function(a){return this.ca(a,null)},
aw:function(a){return new P.fH(this,a)},
b5:function(a,b){return new P.fJ(this,a,b)},
h:function(a,b){return},
cq:function(a){if($.k===C.c)return a.$0()
return P.cH(null,null,this,a)},
bj:function(a){return this.cq(a,null)},
ct:function(a,b){if($.k===C.c)return a.$1(b)
return P.cI(null,null,this,a,b)},
aF:function(a,b){return this.ct(a,b,null,null)},
cs:function(a,b,c){if($.k===C.c)return a.$2(b,c)
return P.h9(null,null,this,a,b,c)},
cr:function(a,b,c){return this.cs(a,b,c,null,null,null)},
cp:function(a){return a},
bh:function(a){return this.cp(a,null,null,null)}},
fI:{"^":"f;a,b",
$0:function(){return this.a.bj(this.b)}},
fH:{"^":"f;a,b",
$0:function(){return this.a.aE(this.b)}},
fJ:{"^":"f;a,b,c",
$1:function(a){return this.a.bk(this.b,a)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
d:function(a,b,c){return H.cS(a,new H.aD(0,0,[b,c]))},
bY:function(a,b){return new H.aD(0,0,[a,b])},
a3:function(){return new H.aD(0,0,[null,null])},
dU:function(a){return H.cS(a,new H.aD(0,0,[null,null]))},
bZ:function(a,b,c,d){return new P.fy(0,0,[d])},
dI:function(a,b,c){var z,y
if(P.bv(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$as()
y.push(a)
try{P.h4(a,z)}finally{y.pop()}y=P.cb(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bf:function(a,b,c){var z,y,x
if(P.bv(a))return b+"..."+c
z=new P.bm(b)
y=$.$get$as()
y.push(a)
try{x=z
x.a=P.cb(x.gJ(),a,", ")}finally{y.pop()}y=z
y.a=y.gJ()+c
y=z.gJ()
return y.charCodeAt(0)==0?y:y},
bv:function(a){var z,y
for(z=0;y=$.$get$as(),z<y.length;++z)if(a===y[z])return!0
return!1},
h4:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gA(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.p())return
w=H.b(z.gw())
b.push(w)
y+=w.length+2;++x}if(!z.p()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gw();++x
if(!z.p()){if(x<=4){b.push(H.b(t))
return}v=H.b(t)
u=b.pop()
y+=v.length+2}else{s=z.gw();++x
for(;z.p();t=s,s=r){r=z.gw();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
c0:function(a){var z,y,x
z={}
if(P.bv(a))return"{...}"
y=new P.bm("")
try{$.$get$as().push(a)
x=y
x.a=x.gJ()+"{"
z.a=!0
a.a8(0,new P.dX(z,y))
z=y
z.a=z.gJ()+"}"}finally{$.$get$as().pop()}z=y.gJ()
return z.charCodeAt(0)==0?z:z},
fy:{"^":"fu;a,0b,0c,0d,0e,0f,r,$ti",
gA:function(a){var z=new P.cz(this,this.r)
z.c=this.e
return z},
gk:function(a){return this.a},
B:function(a,b){var z,y
if(b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else{y=this.bK(b)
return y}},
bK:function(a){var z=this.d
if(z==null)return!1
return this.aT(this.bU(z,a),a)>=0},
u:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cA()
this.b=z}return this.bJ(z,b)}else{y=this.bI(b)
return y}},
bI:function(a){var z,y,x
z=this.d
if(z==null){z=P.cA()
this.d=z}y=this.aR(a)
x=z[y]
if(x==null)z[y]=[this.al(a)]
else{if(this.aT(x,a)>=0)return!1
x.push(this.al(a))}return!0},
bJ:function(a,b){if(a[b]!=null)return!1
a[b]=this.al(b)
return!0},
aP:function(){this.r=this.r+1&67108863},
al:function(a){var z,y
z=new P.fz(a)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.aP()
return z},
aR:function(a){return J.a0(a)&0x3ffffff},
bU:function(a,b){return a[this.aR(b)]},
aT:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(a[y].a===b)return y
return-1},
n:{
cA:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fz:{"^":"c;a,0b,0c"},
cz:{"^":"c;a,b,0c,0d",
gw:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.e(P.ad(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}},
n:{
fA:function(a,b){var z=new P.cz(a,b)
z.c=a.e
return z}}},
fu:{"^":"c6;"},
dH:{"^":"aC;"},
dV:{"^":"fB;",$isB:1},
S:{"^":"c;$ti",
gA:function(a){return new H.c_(a,this.gk(a),0)},
a7:function(a,b){return this.h(a,b)},
B:function(a,b){var z,y
z=this.gk(a)
for(y=0;y<z;++y){this.h(a,y)
if(z!==this.gk(a))throw H.e(P.ad(a))}return!1},
u:function(a,b){var z=this.gk(a)
this.sk(a,z+1)
this.i(a,z,b)},
bH:function(a,b,c){var z,y,x
z=this.gk(a)
y=c-b
for(x=c;x<z;++x)this.i(a,x-y,this.h(a,x))
this.sk(a,z-y)},
Y:function(a,b){H.c8(a,b)},
t:function(a,b){var z=H.Z([],[H.hs(this,a,"S",0)])
C.h.sk(z,C.b.t(this.gk(a),C.i.gk(b)))
C.h.X(z,0,this.gk(a),a)
C.h.X(z,this.gk(a),z.length,b)
return z},
aD:function(a,b,c){P.aS(b,c,this.gk(a),null,null,null)
if(c>b)this.bH(a,b,c)},
j:function(a){return P.bf(a,"[","]")}},
dW:{"^":"dY;"},
dX:{"^":"f:11;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
dY:{"^":"c;$ti",
a8:function(a,b){var z,y
for(z=J.bE(this.gaB());z.p();){y=z.gw()
b.$2(y,this.h(0,y))}},
a6:function(a){return J.w(this.gaB(),a)},
gk:function(a){return J.A(this.gaB())},
j:function(a){return P.c0(this)},
$isa4:1},
c7:{"^":"c;$ti",
j:function(a){return P.bf(this,"{","}")},
aA:function(a,b){var z,y
z=this.gA(this)
if(!z.p())return""
if(b===""){y=""
do y+=H.b(z.d)
while(z.p())}else{y=H.b(z.d)
for(;z.p();)y=y+b+H.b(z.d)}return y.charCodeAt(0)==0?y:y},
$isc5:1},
c6:{"^":"c7;"},
fB:{"^":"c+S;"}}],["","",,P,{"^":"",
m:function(a,b,c){var z=H.eu(a,c)
if(z!=null)return z
throw H.e(P.bd(a,null,null))},
ab:function(a,b){var z=H.et(a)
if(z!=null)return z
throw H.e(P.bd("Invalid double",a,null))},
dz:function(a){if(a instanceof H.f)return a.j(0)
return"Instance of '"+H.am(a)+"'"},
aT:function(a,b,c){return new H.dP(a,H.bV(a,!1,b,!1))},
bc:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ax(a)
if(typeof a==="string")return JSON.stringify(a)
return P.dz(a)},
d0:function(a){H.hH(a)},
cQ:{"^":"c;"},
"+bool":0,
bb:{"^":"c;a,b",
u:function(a,b){return P.dr(C.b.t(this.a,b.gcC()),this.b)},
C:function(a,b){if(b==null)return!1
if(!(b instanceof P.bb))return!1
return this.a===b.a&&this.b===b.b},
gv:function(a){var z=this.a
return(z^C.b.b0(z,30))&1073741823},
j:function(a){var z,y,x,w,v,u,t
z=P.ds(H.es(this))
y=P.ay(H.eq(this))
x=P.ay(H.em(this))
w=P.ay(H.en(this))
v=P.ay(H.ep(this))
u=P.ay(H.er(this))
t=P.dt(H.eo(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
n:{
dr:function(a,b){var z
if(Math.abs(a)<=864e13)z=!1
else z=!0
if(z)H.y(P.b7("DateTime is outside valid range: "+a))
return new P.bb(a,b)},
ds:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
dt:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
ay:function(a){if(a>=10)return""+a
return"0"+a}}},
b0:{"^":"z;"},
"+double":0,
R:{"^":"c;a",
t:function(a,b){return new P.R(C.b.t(this.a,b.gbQ()))},
Z:function(a,b){return new P.R(this.a-b.a)},
W:function(a,b){return new P.R(C.d.O(this.a*b))},
ad:function(a,b){return C.b.ad(this.a,b.gbQ())},
aI:function(a,b){return this.a>b.a},
aH:function(a,b){return this.a>=b.a},
C:function(a,b){if(b==null)return!1
if(!(b instanceof P.R))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
j:function(a){var z,y,x,w,v
z=new P.dx()
y=this.a
if(y<0)return"-"+new P.R(0-y).j(0)
x=z.$1(C.b.F(y,6e7)%60)
w=z.$1(C.b.F(y,1e6)%60)
v=new P.dw().$1(y%1e6)
return""+C.b.F(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
n:{
dv:function(a,b,c,d,e,f){return new P.R(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
dw:{"^":"f;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
dx:{"^":"f;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
x:{"^":"c;"},
bk:{"^":"x;",
j:function(a){return"Throw of null."}},
a1:{"^":"x;a,b,c,d",
gap:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gao:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gap()+y+x
if(!this.a)return w
v=this.gao()
u=P.bc(this.b)
return w+v+": "+H.b(u)},
n:{
b7:function(a){return new P.a1(!1,null,null,a)},
b8:function(a,b,c){return new P.a1(!0,a,b,c)}}},
bl:{"^":"a1;e,f,a,b,c,d",
gap:function(){return"RangeError"},
gao:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
n:{
ev:function(a){return new P.bl(null,null,!1,null,null,a)},
aR:function(a,b,c){return new P.bl(null,null,!0,a,b,"Value not in range")},
an:function(a,b,c,d,e){return new P.bl(b,c,!0,a,d,"Invalid value")},
aS:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.an(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.e(P.an(b,a,c,"end",f))
return b}return c}}},
dG:{"^":"a1;e,k:f>,a,b,c,d",
gap:function(){return"RangeError"},
gao:function(){if(J.b5(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
n:{
aP:function(a,b,c,d,e){var z=e!=null?e:J.A(b)
return new P.dG(b,z,!0,a,c,"Index out of range")}}},
eP:{"^":"x;a",
j:function(a){return"Unsupported operation: "+this.a},
n:{
o:function(a){return new P.eP(a)}}},
eN:{"^":"x;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
n:{
bo:function(a){return new P.eN(a)}}},
aH:{"^":"x;a",
j:function(a){return"Bad state: "+this.a},
n:{
aU:function(a){return new P.aH(a)}}},
dl:{"^":"x;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bc(z))+"."},
n:{
ad:function(a){return new P.dl(a)}}},
e1:{"^":"c;",
j:function(a){return"Out of Memory"},
$isx:1},
c9:{"^":"c;",
j:function(a){return"Stack Overflow"},
$isx:1},
dq:{"^":"x;a",
j:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
fg:{"^":"c;a",
j:function(a){return"Exception: "+this.a}},
dB:{"^":"c;a,b,c",
j:function(a){var z,y,x
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.b(z):"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.e.af(x,0,75)+"..."
return y+"\n"+x},
n:{
bd:function(a,b,c){return new P.dB(a,b,c)}}},
Y:{"^":"z;"},
"+int":0,
aC:{"^":"c;$ti",
B:function(a,b){var z
for(z=this.gA(this);z.p();)if(J.l(z.gw(),b))return!0
return!1},
gk:function(a){var z,y
z=this.gA(this)
for(y=0;z.p();)++y
return y},
j:function(a){return P.dI(this,"(",")")}},
dK:{"^":"c;"},
B:{"^":"c;$ti"},
"+List":0,
a4:{"^":"c;$ti"},
D:{"^":"c;",
gv:function(a){return P.c.prototype.gv.call(this,this)},
j:function(a){return"null"}},
"+Null":0,
z:{"^":"c;"},
"+num":0,
c:{"^":";",
C:function(a,b){return this===b},
gv:function(a){return H.a5(this)},
j:function(a){return"Instance of '"+H.am(this)+"'"},
toString:function(){return this.j(this)}},
c2:{"^":"c;"},
c5:{"^":"bP;"},
U:{"^":"c;"},
p:{"^":"c;"},
"+String":0,
bm:{"^":"c;J:a<",
gk:function(a){return this.a.length},
j:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
n:{
cb:function(a,b,c){var z=J.bE(b)
if(!z.p())return a
if(c.length===0){do a+=H.b(z.gw())
while(z.p())}else{a+=H.b(z.gw())
for(;z.p();)a=a+c+H.b(z.gw())}return a}}}}],["","",,W,{"^":"",
de:function(a,b,c){var z={}
z.type=b
return new self.Blob(a,z)},
bQ:function(a,b,c){var z=document.createElement("img")
return z},
aZ:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
cy:function(a,b,c,d){var z,y
z=W.aZ(W.aZ(W.aZ(W.aZ(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
bt:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.f8(a)
if(!!J.n(z).$isae)return z
return}else return a},
h2:function(a){var z
if(!!J.n(a).$isbO)return a
z=new P.eS([],[],!1)
z.c=!0
return z.aG(a)},
cL:function(a,b){var z=$.k
if(z===C.c)return a
if(a==null)return
return z.b5(a,b)},
ag:{"^":"az;","%":"HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
hP:{"^":"ag;",
j:function(a){return String(a)},
"%":"HTMLAnchorElement"},
hQ:{"^":"ag;",
j:function(a){return String(a)},
"%":"HTMLAreaElement"},
hR:{"^":"F;0k:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
hS:{"^":"f6;0k:length=","%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
dp:{"^":"c;"},
bO:{"^":"F;",
gV:function(a){return new W.aX(a,"mousemove",!1,[W.al])},
$isbO:1,
"%":"Document|HTMLDocument|XMLDocument"},
hT:{"^":"u;",
j:function(a){return String(a)},
"%":"DOMException"},
du:{"^":"u;",
j:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
C:function(a,b){if(b==null)return!1
if(!H.a9(b,"$isaE",[P.z],"$asaE"))return!1
return a.left===b.left&&a.top===b.top&&a.width===b.width&&a.height===b.height},
gv:function(a){return W.cy(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gl:function(a){return a.x},
gm:function(a){return a.y},
$isaE:1,
$asaE:function(){return[P.z]},
"%":";DOMRectReadOnly"},
hU:{"^":"u;0k:length=",
u:function(a,b){return a.add(b)},
B:function(a,b){return a.contains(b)},
"%":"DOMTokenList"},
fh:{"^":"dV;a,$ti",
gk:function(a){return this.a.length},
h:function(a,b){return this.a[b]},
i:function(a,b,c){throw H.e(P.o("Cannot modify list"))},
sk:function(a,b){throw H.e(P.o("Cannot modify list"))},
Y:function(a,b){throw H.e(P.o("Cannot sort list"))},
gV:function(a){return new W.br(this,!1,"mousemove",[W.al])}},
az:{"^":"F;",
gax:function(a){return new W.fd(a)},
j:function(a){return a.localName},
gV:function(a){return new W.cu(a,"mousemove",!1,[W.al])},
$isaz:1,
"%":";Element"},
aA:{"^":"u;",
gac:function(a){return W.bt(a.target)},
$isaA:1,
"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
ae:{"^":"u;",
a5:function(a,b,c,d){if(c!=null)this.bz(a,b,c,d)},
T:function(a,b,c){return this.a5(a,b,c,null)},
bz:function(a,b,c,d){return a.addEventListener(b,H.N(c,1),d)},
bZ:function(a,b,c,d){return a.removeEventListener(b,H.N(c,1),!1)},
$isae:1,
"%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest;EventTarget"},
ie:{"^":"ag;0k:length=","%":"HTMLFormElement"},
ih:{"^":"fw;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aP(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.e(P.o("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.e(P.o("Cannot resize immutable List."))},
a7:function(a,b){return a[b]},
$isa2:1,
$asa2:function(){return[W.F]},
$asS:function(){return[W.F]},
$isB:1,
$asB:function(){return[W.F]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
dD:{"^":"dE;",
cD:function(a,b,c,d,e,f){return a.open(b,c)},
co:function(a,b,c){return a.open(b,c)},
"%":"XMLHttpRequest"},
dE:{"^":"ae;","%":";XMLHttpRequestEventTarget"},
dF:{"^":"ag;","%":"HTMLImageElement"},
aQ:{"^":"ag;0cb:checked=,0bm:value=",$isaQ:1,"%":"HTMLInputElement"},
bW:{"^":"cq;",$isbW:1,"%":"KeyboardEvent"},
al:{"^":"cq;",
gbe:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.T(a.offsetX,a.offsetY,[P.z])
else{z=a.target
if(!J.n(W.bt(z)).$isaz)throw H.e(P.o("offsetX is only supported on elements"))
y=W.bt(z)
z=a.clientX
x=a.clientY
w=[P.z]
v=y.getBoundingClientRect()
u=new P.T(z,x,w).Z(0,new P.T(v.left,v.top,w))
return new P.T(J.bH(u.a),J.bH(u.b),w)}},
$isal:1,
"%":"DragEvent|MouseEvent|PointerEvent|WheelEvent"},
F:{"^":"ae;",
j:function(a){var z=a.nodeValue
return z==null?this.bs(a):z},
B:function(a,b){return a.contains(b)},
"%":"Attr|DocumentFragment|DocumentType|ShadowRoot;Node"},
im:{"^":"fD;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aP(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.e(P.o("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.e(P.o("Cannot resize immutable List."))},
a7:function(a,b){return a[b]},
$isa2:1,
$asa2:function(){return[W.F]},
$asS:function(){return[W.F]},
$isB:1,
$asB:function(){return[W.F]},
"%":"NodeList|RadioNodeList"},
aF:{"^":"ag;0k:length=,0bm:value=",$isaF:1,"%":"HTMLSelectElement"},
cq:{"^":"aA;","%":"CompositionEvent|FocusEvent|TextEvent|TouchEvent;UIEvent"},
eQ:{"^":"ae;",
N:function(a,b){this.E(a)
return this.c0(a,W.cL(b,P.z))},
c0:function(a,b){return a.requestAnimationFrame(H.N(b,1))},
E:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gV:function(a){return new W.aX(a,"mousemove",!1,[W.al])},
"%":"DOMWindow|Window"},
ix:{"^":"du;",
j:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
C:function(a,b){if(b==null)return!1
if(!H.a9(b,"$isaE",[P.z],"$asaE"))return!1
return a.left===b.left&&a.top===b.top&&a.width===b.width&&a.height===b.height},
gv:function(a){return W.cy(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gl:function(a){return a.x},
gm:function(a){return a.y},
"%":"ClientRect|DOMRect"},
iy:{"^":"fW;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aP(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.e(P.o("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.e(P.o("Cannot resize immutable List."))},
a7:function(a,b){return a[b]},
$isa2:1,
$asa2:function(){return[W.F]},
$asS:function(){return[W.F]},
$isB:1,
$asB:function(){return[W.F]},
"%":"MozNamedAttrMap|NamedNodeMap"},
fd:{"^":"bL;a",
M:function(){var z,y,x,w,v
z=P.bZ(null,null,null,P.p)
for(y=this.a.className.split(" "),x=y.length,w=0;w<x;++w){v=J.b6(y[w])
if(v.length!==0)z.u(0,v)}return z},
bo:function(a){this.a.className=a.aA(0," ")},
gk:function(a){return this.a.classList.length},
b6:function(a){this.a.className=""},
B:function(a,b){var z=this.a.classList.contains(b)
return z},
u:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.add(b)
return!y}},
aX:{"^":"aV;a,b,c,$ti",
H:function(a,b,c,d){return W.bs(this.a,this.b,a,!1)},
a9:function(a){return this.H(a,null,null,null)}},
cu:{"^":"aX;a,b,c,$ti"},
br:{"^":"aV;a,b,c,$ti",
H:function(a,b,c,d){var z,y,x,w
z=H.P(this,0)
y=this.$ti
x=new W.fM(new H.aD(0,0,[[P.aV,z],[P.ca,z]]),y)
x.a=new P.fN(null,x.gcc(x),0,y)
for(z=this.a,z=new H.c_(z,z.gk(z),0),w=this.c;z.p();)x.u(0,new W.aX(z.d,w,!1,y))
z=x.a
z.toString
return new P.f0(z,[H.P(z,0)]).H(a,b,c,d)},
a9:function(a){return this.H(a,null,null,null)}},
fe:{"^":"ca;a,b,c,d,e",
U:function(){var z,y,x
z=this.b
if(z==null)return
y=this.d
x=y!=null
if(x)if(x)J.d6(z,this.c,y,!1)
this.b=null
this.d=null
return},
n:{
bs:function(a,b,c,d){var z=W.cL(new W.ff(c),W.aA)
if(z!=null&&!0)J.d7(a,b,z,!1)
return new W.fe(0,a,b,z,!1)}}},
ff:{"^":"f;a",
$1:function(a){return this.a.$1(a)}},
fM:{"^":"c;0a,b,$ti",
u:function(a,b){var z,y
z=this.b
if(z.a6(b))return
y=this.a
z.i(0,b,W.bs(b.a,b.b,y.gc7(y),!1))},
b7:[function(a){var z,y,x
for(z=this.b,y=z.gcA(z),x=y.a,y=new H.c1(x.gA(x),y.b);y.p();)y.a.U()
if(z.a>0){z.f=null
z.e=null
z.d=null
z.c=null
z.b=null
z.a=0
z.aW()}this.a.b7(0)},"$0","gcc",1,0,1]},
be:{"^":"c;",
gA:function(a){return new W.dA(a,this.gk(a),-1)},
u:function(a,b){throw H.e(P.o("Cannot add to immutable List."))},
Y:function(a,b){throw H.e(P.o("Cannot sort immutable List."))},
aD:function(a,b,c){throw H.e(P.o("Cannot removeRange on immutable List."))}},
dA:{"^":"c;a,b,c,0d",
p:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.a(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gw:function(){return this.d}},
f7:{"^":"c;a",
a5:function(a,b,c,d){return H.y(P.o("You can only attach EventListeners to your own window."))},
T:function(a,b,c){return this.a5(a,b,c,null)},
$isae:1,
n:{
f8:function(a){if(a===window)return a
else return new W.f7(a)}}},
f6:{"^":"u+dp;"},
fv:{"^":"u+S;"},
fw:{"^":"fv+be;"},
fC:{"^":"u+S;"},
fD:{"^":"fC+be;"},
fV:{"^":"u+S;"},
fW:{"^":"fV+be;"}}],["","",,P,{"^":"",
hh:function(a){var z,y
z=new P.G(0,$.k,[null])
y=new P.eV(z,[null])
a.then(H.N(new P.hi(y),1))["catch"](H.N(new P.hj(y),1))
return z},
eR:{"^":"c;",
bb:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
aG:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
if(Math.abs(y)<=864e13)x=!1
else x=!0
if(x)H.y(P.b7("DateTime is outside valid range: "+y))
return new P.bb(y,!0)}if(a instanceof RegExp)throw H.e(P.bo("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.hh(a)
w=Object.getPrototypeOf(a)
if(w===Object.prototype||w===null){v=this.bb(a)
x=this.b
u=x[v]
z.a=u
if(u!=null)return u
u=P.a3()
z.a=u
x[v]=u
this.cj(a,new P.eT(z,this))
return z.a}if(a instanceof Array){t=a
v=this.bb(t)
x=this.b
u=x[v]
if(u!=null)return u
s=J.H(t)
r=s.gk(t)
u=this.c?new Array(r):t
x[v]=u
for(x=J.at(u),q=0;q<r;++q)x.i(u,q,this.aG(s.h(t,q)))
return u}return a}},
eT:{"^":"f:12;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.aG(b)
J.i(z,a,y)
return y}},
eS:{"^":"eR;a,b,c",
cj:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.d3)(z),++x){w=z[x]
b.$2(w,a[w])}}},
hi:{"^":"f:5;a",
$1:function(a){var z=this.a.a
if(z.a!==0)H.y(P.aU("Future already completed"))
z.ai(a)
return}},
hj:{"^":"f:5;a",
$1:function(a){var z,y
z=a==null?new P.bk():a
y=this.a.a
if(y.a!==0)H.y(P.aU("Future already completed"))
$.k.toString
y.bA(z,null)
return}},
bL:{"^":"c6;",
b3:function(a){var z=$.$get$bM().b
if(typeof a!=="string")H.y(H.J(a))
if(z.test(a))return a
throw H.e(P.b8(a,"value","Not a valid class token"))},
j:function(a){return this.M().aA(0," ")},
gA:function(a){var z=this.M()
return P.fA(z,z.r)},
gk:function(a){return this.M().a},
B:function(a,b){this.b3(b)
return this.M().B(0,b)},
u:function(a,b){this.b3(b)
return this.bc(new P.dm(b))},
b6:function(a){this.bc(new P.dn())},
bc:function(a){var z,y
z=this.M()
y=a.$1(z)
this.bo(z)
return y},
$asc7:function(){return[P.p]},
$asc5:function(){return[P.p]}},
dm:{"^":"f;a",
$1:function(a){return a.u(0,this.a)}},
dn:{"^":"f;",
$1:function(a){if(a.a>0){a.f=null
a.e=null
a.d=null
a.c=null
a.b=null
a.a=0
a.aP()}return}}}],["","",,P,{"^":"",it:{"^":"aA;0ac:target=","%":"IDBVersionChangeEvent"}}],["","",,P,{"^":"",
cx:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fx:{"^":"c;",
bd:function(a){if(a<=0||a>4294967296)throw H.e(P.ev("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
q:function(){return Math.random()}},
T:{"^":"c;l:a>,m:b>,$ti",
j:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
C:function(a,b){var z,y,x
if(b==null)return!1
if(!H.a9(b,"$isT",[P.z],null))return!1
z=this.a
y=J.O(b)
x=y.gl(b)
if(z==null?x==null:z===x){z=this.b
y=y.gm(b)
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){var z,y,x
z=J.a0(this.a)
y=J.a0(this.b)
y=P.cx(P.cx(0,z),y)
x=536870911&y+((67108863&y)<<3)
x^=x>>>11
return 536870911&x+((16383&x)<<15)},
t:function(a,b){return new P.T(C.d.t(this.a,C.i.gl(b)),C.d.t(this.b,b.gm(b)),this.$ti)},
Z:function(a,b){return new P.T(this.a-b.a,this.b-b.b,this.$ti)},
W:function(a,b){return new P.T(this.a*b,this.b*b,this.$ti)}}}],["","",,P,{"^":"",hV:{"^":"r;0l:x=,0m:y=","%":"SVGFEBlendElement"},hW:{"^":"r;0l:x=,0m:y=","%":"SVGFEColorMatrixElement"},hX:{"^":"r;0l:x=,0m:y=","%":"SVGFEComponentTransferElement"},hY:{"^":"r;0l:x=,0m:y=","%":"SVGFECompositeElement"},hZ:{"^":"r;0l:x=,0m:y=","%":"SVGFEConvolveMatrixElement"},i_:{"^":"r;0l:x=,0m:y=","%":"SVGFEDiffuseLightingElement"},i0:{"^":"r;0l:x=,0m:y=","%":"SVGFEDisplacementMapElement"},i1:{"^":"r;0l:x=,0m:y=","%":"SVGFEFloodElement"},i2:{"^":"r;0l:x=,0m:y=","%":"SVGFEGaussianBlurElement"},i3:{"^":"r;0l:x=,0m:y=","%":"SVGFEImageElement"},i4:{"^":"r;0l:x=,0m:y=","%":"SVGFEMergeElement"},i5:{"^":"r;0l:x=,0m:y=","%":"SVGFEMorphologyElement"},i6:{"^":"r;0l:x=,0m:y=","%":"SVGFEOffsetElement"},i7:{"^":"r;0l:x=,0m:y=","%":"SVGFEPointLightElement"},i8:{"^":"r;0l:x=,0m:y=","%":"SVGFESpecularLightingElement"},i9:{"^":"r;0l:x=,0m:y=","%":"SVGFESpotLightElement"},ia:{"^":"r;0l:x=,0m:y=","%":"SVGFETileElement"},ib:{"^":"r;0l:x=,0m:y=","%":"SVGFETurbulenceElement"},ic:{"^":"r;0l:x=,0m:y=","%":"SVGFilterElement"},id:{"^":"af;0l:x=,0m:y=","%":"SVGForeignObjectElement"},dC:{"^":"af;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},af:{"^":"r;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},ii:{"^":"af;0l:x=,0m:y=","%":"SVGImageElement"},il:{"^":"r;0l:x=,0m:y=","%":"SVGMaskElement"},io:{"^":"r;0l:x=,0m:y=","%":"SVGPatternElement"},ip:{"^":"dC;0l:x=,0m:y=","%":"SVGRectElement"},dd:{"^":"bL;a",
M:function(){var z,y,x,w,v,u
z=this.a.getAttribute("class")
y=P.bZ(null,null,null,P.p)
if(z==null)return y
for(x=z.split(" "),w=x.length,v=0;v<w;++v){u=J.b6(x[v])
if(u.length!==0)y.u(0,u)}return y},
bo:function(a){this.a.setAttribute("class",a.aA(0," "))}},r:{"^":"az;",
gax:function(a){return new P.dd(a)},
gV:function(a){return new W.cu(a,"mousemove",!1,[W.al])},
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},iq:{"^":"af;0l:x=,0m:y=","%":"SVGSVGElement"},eJ:{"^":"af;","%":"SVGTextPathElement;SVGTextContentElement"},ir:{"^":"eJ;0l:x=,0m:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},is:{"^":"af;0l:x=,0m:y=","%":"SVGUseElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,U,{"^":"",e2:{"^":"c;a,b,c,d,0e,0ab:f<,0r,0l:x>,0m:y>,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx,0fy,go",
aO:function(a){var z,y,x,w,v,u,t
for(z=this.a,y=this.go,x=a!=null,w=0;w<J.A(J.a(z.x.h(0,"particles"),"array"));++w){v=J.a(J.a(z.x.h(0,"particles"),"array"),w)
u=this.x-v.x
t=this.y-v.y
if(Math.sqrt(u*u+t*t)<=this.f+v.f){this.x=x?a.h(0,"x"):y.q()*z.d
this.y=x?a.h(0,"y"):y.q()*z.e
this.bE()}}},
bE:function(){return this.aO(null)},
an:function(a,b,c,d,e,f){var z,y,x,w
z=e*f
y=e/f
x=3.141592653589793-3.141592653589793*(180*(y-2)/y)/180
a.save()
a.beginPath()
a.translate(b,c)
a.moveTo(0,0)
for(w=0;w<z;++w){a.lineTo(d,0)
a.translate(d,0)
a.rotate(x)}a.restore()},
b9:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
switch(a){case"circle":z=this.a.c
y=this.x
x=this.y
z.toString
z.arc(y,x,b,0,6.283185307179586,!1)
break
case"edge":case"square":z=b*2
this.a.c.rect(this.x-b,this.y-b,z,z)
break
case"triangle":this.an(this.a.c,this.x-b,this.y+b/1.66,b*2,3,2)
break
case"polygon":z=this.a
this.an(z.c,this.x-b/(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides")/3.5),this.y-b/0.76,b*2.66/(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides")/3),J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides"),1)
break
case"star":z=this.a
y=b*2
this.an(z.c,this.x-y/(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides")/4),this.y-b/1.52,y*2.66/(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides")/3),J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides"),2)
break
case"heart":z=b/2
w=this.x-z
v=this.y-z
y=this.a
x=b/4
u=v+x
y.c.moveTo(w,u)
x=w+x
y.c.quadraticCurveTo(w,v,x,v)
t=w+z
y.c.quadraticCurveTo(t,v,t,u)
s=b*3/4
r=w+s
y.c.quadraticCurveTo(t,v,r,v)
q=w+b
y.c.quadraticCurveTo(q,v,q,u)
z=v+z
s=v+s
y.c.quadraticCurveTo(q,z,r,s)
y.c.lineTo(t,v+b)
y.c.lineTo(x,s)
y.c.quadraticCurveTo(w,z,w,u)
break
case"char":case"character":z=this.a
z.c.font=H.b(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"character"),"style"))+" "+H.b(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"character"),"weight"))+" "+J.bF(b)*2+"px "+H.b(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"character"),"font"))
y=this.cy
x=this.x
u=this.y
t=b/2
if(c)z.c.strokeText(y,x-t,u+t)
else{z=z.c
z.toString
z.fillText(y,x-t,u+t)}break
case"image":z=this.a
p=J.l(J.a(z.x.h(0,"tmp"),"img_type"),"svg")?this.cx.h(0,"obj"):J.a(z.x.h(0,"tmp"),"img_obj")
if(p!=null)new U.e5(this,b).$1(p)
break}},
cf:function(a,b){return this.b9(a,b,!1)},
bN:function(){var z,y,x,w
z=J.a(this.a.x.h(0,"tmp"),"source_svg")
y=P.aT("#([0-9A-F]{3,6})",!1,!1)
z.toString
x=(self.URL||self.webkitURL).createObjectURL(W.de([H.hL(z,y,new U.e3(this),null)],"image/svg+xml;charset=utf-8",null))
w=W.bQ(null,null,null)
C.k.T(w,"load",new U.e4(this,w,x))
w.src=x},
n:{
c4:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q
z=P.p
y=P.bY(z,null)
x=new U.e2(c,y,d,b,C.a)
w=J.a(J.a(c.x.h(0,"particles"),"size"),"random")?C.a.q():1
w*=J.a(J.a(c.x.h(0,"particles"),"size"),"value")
x.f=w
if(J.a(J.a(J.a(c.x.h(0,"particles"),"size"),"anim"),"enable")){x.z=!1
v=J.a(J.a(J.a(c.x.h(0,"particles"),"size"),"anim"),"speed")/100
x.db=v
if(!J.a(J.a(J.a(c.x.h(0,"particles"),"size"),"anim"),"sync"))x.db=v*C.a.q()}v=d!=null
u=v?d.h(0,"x"):C.a.q()*c.d
x.x=u
v=v?d.h(0,"y"):C.a.q()*c.e
x.y=v
t=w*2
if(u>c.d-t)x.x=u-w
else if(u<t)x.x=u+w
if(v>c.e-t)x.y=v-w
else if(v<t)x.y=v+w
if(J.a(J.a(c.x.h(0,"particles"),"move"),"bounce"))x.aO(d)
if(!!J.n(a.h(0,"value")).$isB)y.i(0,"rgb",M.b1(J.a(a.h(0,"value"),C.d.G(C.a.q()*J.A(J.a(J.a(c.x.h(0,"particles"),"color"),"value"))))))
else if(!!J.n(a.h(0,"value")).$isa4){if(J.a(a.h(0,"value"),"r")!=null&&J.a(a.h(0,"value"),"g")!=null&&J.a(a.h(0,"value"),"b")!=null)y.i(0,"rgb",P.d(["r",J.a(a.h(0,"value"),"r"),"g",J.a(a.h(0,"value"),"g"),"b",J.a(a.h(0,"value"),"b")],z,null))
if(J.a(a.h(0,"value"),"h")!=null&&J.a(a.h(0,"value"),"s")!=null&&J.a(a.h(0,"value"),"l")!=null){w=[z]
y.i(0,"hsl",P.d([H.Z(["h"],w),J.a(a.h(0,"value"),"h"),H.Z(["s"],w),J.a(a.h(0,"value"),"s"),H.Z(["l"],w),J.a(a.h(0,"value"),"l")],[P.B,P.p],null))}}else if(J.l(a.h(0,"value"),"random"))y.i(0,"rgb",P.d(["r",C.d.G(C.a.q()*256),"g",C.d.G(C.a.q()*256),"b",C.d.G(C.a.q()*256)],z,P.Y))
else{w=a.h(0,"value")
if(typeof w==="string"){y.i(0,"value",a.h(0,"value"))
y.i(0,"rgb",M.b1(a.h(0,"value")))}}y=J.a(J.a(c.x.h(0,"particles"),"opacity"),"random")?C.a.q():1
x.d=y*J.a(J.a(c.x.h(0,"particles"),"opacity"),"value")
if(J.a(J.a(J.a(c.x.h(0,"particles"),"opacity"),"anim"),"enable")){x.Q=!1
x.fy=J.a(J.a(J.a(c.x.h(0,"particles"),"opacity"),"anim"),"speed")/100
if(!J.a(J.a(J.a(c.x.h(0,"particles"),"opacity"),"anim"),"sync"))x.fy=x.fy*C.a.q()}y=P.z
switch(J.a(J.a(c.x.h(0,"particles"),"move"),"direction")){case"top":s=P.d(["x",0,"y",-1],z,y)
break
case"top-right":s=P.d(["x",0.5,"y",-0.5],z,y)
break
case"right":s=P.d(["x",1,"y",-0.0],z,y)
break
case"bottom-right":s=P.d(["x",0.5,"y",0.5],z,y)
break
case"bottom":s=P.d(["x",0,"y",1],z,y)
break
case"bottom-left":s=P.d(["x",-0.5,"y",1],z,y)
break
case"left":s=P.d(["x",-1,"y",0],z,y)
break
case"top-left":s=P.d(["x",-0.5,"y",-0.5],z,y)
break
default:s=P.d(["x",0,"y",0],z,y)
break}if(J.a(J.a(c.x.h(0,"particles"),"move"),"straight")){x.dx=s.h(0,"x")
x.dy=s.h(0,"y")
if(J.a(J.a(c.x.h(0,"particles"),"move"),"parallax")){x.dx=J.q(s.h(0,"x"),x.f)
x.dy=J.q(s.h(0,"y"),x.f)}else if(J.a(J.a(c.x.h(0,"particles"),"move"),"random")){x.dx=x.dx*C.a.q()
x.dy=x.dy*C.a.q()}}else if(J.a(J.a(c.x.h(0,"particles"),"move"),"parallax")){x.dx=(J.E(s.h(0,"x"),C.a.bd(2))-0.5)*x.f
x.dy=(J.E(s.h(0,"y"),C.a.bd(2))-0.5)*x.f}else{x.dx=J.E(s.h(0,"x"),C.a.q())-0.5
x.dy=J.E(s.h(0,"y"),C.a.q())-0.5}x.fr=x.dx
x.fx=x.dy
r=J.a(J.a(c.x.h(0,"particles"),"shape"),"type")
if(typeof r==="string")x.ch=r
else{z=J.n(r)
if(!!z.$isB)x.ch=z.h(r,C.d.G(C.a.q()*z.gk(r)))}z=x.ch
if(z==="image"){q=J.a(c.x.h(0,"particles"),"shape")
z=P.dU(["src",J.a(q.h(0,"image"),"src"),"ratio",J.a(q.h(0,"image"),"width")/J.a(q.h(0,"image"),"height")])
x.cx=z
if(J.l(z.h(0,"ratio"),0))x.cx.i(0,"ratio",1)
if(J.l(J.a(J.a(c.x.h(0,"particles"),"tmp"),"img_type"),"svg")&&J.a(J.a(c.x.h(0,"particles"),"tmp"),"source_svg")!=null){x.bN()
if(J.a(J.a(c.x.h(0,"particles"),"tmp"),"pushing"))x.cx.i(0,"loaded",!1)}}else if(z==="char"||z==="character"){z=J.a(J.a(J.a(c.x.h(0,"particles"),"shape"),"character"),"value")
if(typeof z==="string")x.cy=J.a(J.a(J.a(c.x.h(0,"particles"),"shape"),"character"),"value")
else if(!!J.n(J.a(J.a(J.a(c.x.h(0,"particles"),"shape"),"character"),"value")).$isB)x.cy=J.a(J.a(J.a(J.a(c.x.h(0,"particles"),"shape"),"character"),"value"),C.d.G(C.a.q()*J.A(J.a(J.a(J.a(c.x.h(0,"particles"),"shape"),"character"),"value"))))}return x}}},e5:{"^":"f:0;a,b",
$1:function(a){var z,y,x
z=this.a
y=this.b
x=y*2
z.a.c.drawImage(a,z.x-y,z.y-y,x,x/z.cx.h(0,"ratio"))}},e3:{"^":"f;a",
$1:function(a){var z,y
z=this.a
y=z.b
return y.h(0,"rgb")?"rgba("+H.b(J.a(y.h(0,"rgb"),"r"))+","+H.b(J.a(y.h(0,"rgb"),"g"))+","+H.b(J.a(y.h(0,"rgb"),"b"))+","+H.b(z.d)+")":"hsla("+H.b(J.a(y.h(0,"hsl"),"h"))+","+H.b(J.a(y.h(0,"hsl"),"s"))+"%,"+H.b(J.a(y.h(0,"hsl"),"l"))+"%,"+H.b(z.d)+")"}},e4:{"^":"f;a,b,c",
$1:function(a){var z,y
z=this.a
z.cx.i(0,"obj",this.b)
z.cx.i(0,"loaded",!0);(self.URL||self.webkitURL).revokeObjectURL(this.c)
z=z.a.x.h(0,"tmp")
y=J.H(z)
y.i(z,"count_svg",J.E(y.h(z,"count_svg"),1))}}}],["","",,Y,{"^":"",e6:{"^":"c;a,0b,0c,0d,0e,0f,r,x,y,0z,Q",
bM:function(){var z,y,x,w,v,u
z=document
y=z.getElementById(this.a)
x=y.getElementsByClassName("particles-js-canvas-el")
if(x.length>0)for(;x.length>0;){w=x[0]
v=w.parentNode
if(v!=null)v.removeChild(w)}u=z.createElement("canvas")
u.className="particles-js-canvas-el"
w=u.style
w.width="100%"
w=u.style
w.height="100%"
this.b=y.appendChild(u)
z=z.querySelector("#"+this.a+" > .particles-js-canvas-el")
this.b=z
z.toString
this.c=z.getContext("2d")},
bC:function(){var z=this.b
z.width=this.d
z.height=this.e
z=J.a(J.a(this.x.h(0,"interactivity"),"events"),"resize")
if(z)C.f.T(window,"resize",new Y.e9(this))},
aY:function(){for(var z=0;z<J.a(J.a(this.x.h(0,"particles"),"number"),"value");++z)J.bB(J.a(this.x.h(0,"particles"),"array"),U.c4(J.a(this.x.h(0,"particles"),"color"),J.a(J.a(this.x.h(0,"particles"),"opacity"),"value"),this,null))
J.bG(J.a(this.x.h(0,"particles"),"array"),new Y.eg())},
bX:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
for(z=P.p,y=P.z,x=this.r,w=0;w<J.A(J.a(this.x.h(0,"particles"),"array"));++w){v=J.a(J.a(this.x.h(0,"particles"),"array"),w)
if(J.a(J.a(this.x.h(0,"particles"),"move"),"enable")){u=J.a(J.a(this.x.h(0,"particles"),"move"),"speed")/2
v.x=v.x+v.dx*u
v.y=v.y+v.dy*u}if(J.a(J.a(J.a(this.x.h(0,"particles"),"opacity"),"anim"),"enable")){if(v.Q===!0){if(v.d>=J.a(J.a(this.x.h(0,"particles"),"opacity"),"value"))v.Q=!1
t=v.d+v.fy
v.d=t}else{if(v.d<=J.a(J.a(J.a(this.x.h(0,"particles"),"opacity"),"anim"),"opacity_min"))v.Q=!0
t=v.d-v.fy
v.d=t}if(t<0)v.d=0}if(J.a(J.a(J.a(this.x.h(0,"particles"),"size"),"anim"),"enable")){if(v.z===!0){if(v.f>=J.a(J.a(this.x.h(0,"particles"),"size"),"value"))v.z=!1
t=v.f+v.db
v.f=t}else{if(v.f<=J.a(J.a(J.a(this.x.h(0,"particles"),"size"),"anim"),"size_min"))v.z=!0
t=v.f-v.db
v.f=t}if(t<0)v.f=0}t=J.l(J.a(J.a(this.x.h(0,"particles"),"move"),"out_mode"),"bounce")
s=this.d
r=this.e
if(t){t=v.f
q=P.d(["x_left",t,"x_right",s,"y_top",t,"y_bottom",r],z,y)}else{t=v.f
p=-t
q=P.d(["x_left",p,"x_right",s+t,"y_top",p,"y_bottom",r+t],z,y)}t=v.x
s=v.f
if(t-s>this.d){v.x=q.h(0,"x_left")
v.y=x.q()*this.e}else if(t+s<0){v.x=q.h(0,"x_right")
v.y=x.q()*this.e}t=v.y
s=v.f
if(t-s>this.e){v.y=q.h(0,"y_top")
v.x=x.q()*this.d}else if(t+s<0){v.y=q.h(0,"y_bottom")
v.x=x.q()*this.d}switch(J.a(J.a(this.x.h(0,"particles"),"move"),"out_mode")){case"bounce":t=v.x
s=v.f
if(t+s>this.d)v.dx=-v.dx
else if(t-s<0)v.dx=-v.dx
t=v.y
if(t+s>this.e)v.dy=-v.dy
else if(t-s<0)v.dy=-v.dy
break}if(J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"grab"))if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"enable")&&J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"grab")&&J.l(J.a(this.x.h(0,"interactivity"),"status"),"mousemove")){o=v.x-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_x")
n=v.y-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_y")
m=Math.sqrt(o*o+n*n)
if(m<=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"distance")){l=J.Q(J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"line_linked"),"opacity"),m/(1/J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"line_linked"),"opacity"))/J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"distance"))
if(l>0){k=J.a(J.a(this.x.h(0,"particles"),"line_linked"),"color_rgb_line")
this.c.strokeStyle="rgba("+H.b(k.h(0,"r"))+","+H.b(k.h(0,"g"))+","+H.b(k.h(0,"b"))+","+H.b(l)+")"
this.c.lineWidth=J.a(J.a(this.x.h(0,"particles"),"line_linked"),"width")
this.c.beginPath()
this.c.moveTo(v.x,v.y)
this.c.lineTo(J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_x"),J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_y"))
this.c.stroke()
this.c.closePath()
if(J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"outer_shape"),"enable")){this.c.beginPath()
j=!J.l(J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"outer_shape"),"type"),"inherit")?J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"outer_shape"),"type"):v.ch
if(!J.l(J.a(J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"outer_shape"),"stroke"),"color"),"inherit")){i=M.b1(J.a(J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"outer_shape"),"stroke"),"color"))
this.c.strokeStyle="rgba("+H.b(i.h(0,"r"))+","+H.b(i.h(0,"g"))+","+H.b(i.h(0,"b"))+","+H.b(l)+")"}if(!J.l(J.a(J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"outer_shape"),"stroke"),"width"),"inherit"))this.c.lineWidth=J.a(J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"outer_shape"),"stroke"),"width")
v.b9(j,J.E(J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"outer_shape"),"size"),v.f),!0)
this.c.stroke()
this.c.closePath()}}}}if(J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"bubble")||J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"bubble"))this.bB(v)
if(J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"repulse")||J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"repulse"))this.c_(v)
if(J.a(J.a(this.x.h(0,"particles"),"line_linked"),"enable")||J.a(J.a(J.a(this.x.h(0,"particles"),"move"),"attract"),"enable"))for(h=w+1;h<J.A(J.a(this.x.h(0,"particles"),"array"));++h){g=J.a(J.a(this.x.h(0,"particles"),"array"),h)
if(J.a(J.a(this.x.h(0,"particles"),"line_linked"),"enable")){f=v.x-g.x
e=v.y-g.y
d=Math.sqrt(f*f+e*e)
if(d<=J.a(J.a(this.x.h(0,"particles"),"line_linked"),"distance")){l=J.Q(J.a(J.a(this.x.h(0,"particles"),"line_linked"),"opacity"),d/(1/J.a(J.a(this.x.h(0,"particles"),"line_linked"),"opacity"))/J.a(J.a(this.x.h(0,"particles"),"line_linked"),"distance"))
if(l>0){k=J.a(J.a(this.x.h(0,"particles"),"line_linked"),"color_rgb_line")
this.c.strokeStyle="rgba("+H.b(k.h(0,"r"))+","+H.b(k.h(0,"g"))+","+H.b(k.h(0,"b"))+","+H.b(l)+")"
this.c.lineWidth=J.a(J.a(this.x.h(0,"particles"),"line_linked"),"width")
this.c.beginPath()
this.c.moveTo(v.x,v.y)
this.c.lineTo(g.x,g.y)
this.c.stroke()
this.c.closePath()}}}if(J.a(J.a(J.a(this.x.h(0,"particles"),"move"),"attract"),"enable")){f=v.x-g.x
e=v.y-g.y
if(Math.sqrt(f*f+e*e)<=J.a(J.a(this.x.h(0,"particles"),"line_linked"),"distance")){c=f/J.q(J.a(J.a(J.a(this.x.h(0,"particles"),"move"),"attract"),"rotateX"),1000)
b=e/J.q(J.a(J.a(J.a(this.x.h(0,"particles"),"move"),"attract"),"rotateY"),1000)
v.dx=v.dx-c
v.dy=v.dy-b
g.dx=g.dx+c
g.dy=g.dy+b}}if(J.a(J.a(this.x.h(0,"particles"),"move"),"bounce")){f=v.x-g.x
e=v.y-g.y
t=v.f
s=g.f
if(Math.sqrt(f*f+e*e)<=t+s){v.dx=-v.dx
v.dy=-v.dy
g.dx=-g.dx
g.dy=-g.dy}}}}},
K:function(){var z,y,x,w,v,u,t
this.c.clearRect(0,0,this.d,this.e)
this.bX()
for(z=0;z<J.A(J.a(this.x.h(0,"particles"),"array"));++z){y=J.a(J.a(this.x.h(0,"particles"),"array"),z)
x=y.r
x=x!=null?x:y.f
w=y.e
w=w!=null?w:y.d
v=y.b
u=v.h(0,"rgb")!=null?"rgba("+H.b(J.a(v.h(0,"rgb"),"r"))+","+H.b(J.a(v.h(0,"rgb"),"g"))+","+H.b(J.a(v.h(0,"rgb"),"b"))+","+H.b(w)+")":"hsla("+H.b(J.a(v.h(0,"hsl"),"h"))+","+H.b(J.a(v.h(0,"hsl"),"s"))+"%,"+H.b(J.a(v.h(0,"hsl"),"l"))+"%,"+H.b(w)+")"
v=y.a
t=v.c
t.fillStyle=u
t.beginPath()
y.cf(y.ch,x)
v.c.closePath()
if(J.v(J.a(J.a(J.a(v.x.h(0,"particles"),"shape"),"stroke"),"width"),0)){v.c.strokeStyle=J.a(J.a(J.a(v.x.h(0,"particles"),"shape"),"stroke"),"color")
v.c.lineWidth=J.a(J.a(J.a(v.x.h(0,"particles"),"shape"),"stroke"),"width")
v.c.stroke()}v.c.fill()}},
aC:function(a,b){var z,y,x,w,v,u,t,s,r,q
J.i(J.a(this.x.h(0,"particles"),"tmp"),"pushing",!0)
for(z=a-1,y=P.p,x=P.z,w=this.r,v=b!=null,u=0;u<a;++u){t=J.a(this.x.h(0,"particles"),"array")
s=J.a(this.x.h(0,"particles"),"color")
r=J.a(J.a(this.x.h(0,"particles"),"opacity"),"value")
q=v?b.h(0,"pos_x"):w.q()*this.d
J.bB(t,U.c4(s,r,this,P.d(["x",q,"y",v?b.h(0,"pos_y"):w.q()*this.e],y,x)))
if(u===z){if(!J.a(J.a(this.x.h(0,"particles"),"move"),"enable"))this.K()
J.i(J.a(this.x.h(0,"particles"),"tmp"),"pushing",!1)}}J.bG(J.a(this.x.h(0,"particles"),"array"),new Y.ej())},
bg:function(a){return this.aC(a,null)},
bi:function(a){J.da(J.a(this.x.h(0,"particles"),"array"),0,a)
if(!J.a(J.a(this.x.h(0,"particles"),"move"),"enable"))this.K()},
bB:function(a){var z,y,x,w,v,u,t,s,r,q,p
if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"enable")&&J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"bubble")&&J.l(J.a(this.x.h(0,"interactivity"),"status"),"mousemove")){z=a.x-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_x")
y=a.y-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_y")
x=Math.sqrt(z*z+y*y)
w=1-x/J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"distance")
v=new Y.e7(a)
if(x<=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"distance")){if(w>=0&&J.l(J.a(this.x.h(0,"interactivity"),"status"),"mousemove")){if(!J.l(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"size"),J.a(J.a(this.x.h(0,"particles"),"size"),"value"))){u=J.v(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"size"),J.a(J.a(this.x.h(0,"particles"),"size"),"value"))
t=a.f
s=this.x
if(u){r=t+J.q(J.a(J.a(J.a(s.h(0,"interactivity"),"modes"),"bubble"),"size"),w)
if(r>=0)a.r=r}else{u=J.a(J.a(J.a(s.h(0,"interactivity"),"modes"),"bubble"),"size")
r=a.f-(t-u)*w
if(r>0)a.r=r
else a.r=0}}if(!J.l(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity"),J.a(J.a(this.x.h(0,"particles"),"opacity"),"value"))){u=J.v(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity"),J.a(J.a(this.x.h(0,"particles"),"opacity"),"value"))
t=this.x
if(u){q=J.q(J.a(J.a(J.a(t.h(0,"interactivity"),"modes"),"bubble"),"opacity"),w)
if(q>a.d&&q<=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity"))a.e=q}else{q=a.d-J.q(J.Q(J.a(J.a(t.h(0,"particles"),"opacity"),"value"),J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity")),w)
if(q<a.d&&q>=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity"))a.e=q}}}}else v.$0()
if(J.l(J.a(this.x.h(0,"interactivity"),"status"),"mouseleave"))v.$0()}else if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"enable")&&J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"bubble")){if(J.a(this.x.h(0,"tmp"),"bubble_clicking")){z=a.x-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"click_pos_x")
y=a.y-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"click_pos_y")
x=Math.sqrt(z*z+y*y)
p=(Date.now()-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"click_time"))/1000
if(p>J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"duration"))J.i(this.x.h(0,"tmp"),"bubble_duration_end",!0)
if(p>J.q(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"duration"),2)){J.i(this.x.h(0,"tmp"),"bubble_clicking",!1)
J.i(this.x.h(0,"tmp"),"bubble_duration_end",!1)}}else{x=null
p=null}v=new Y.e8(this,a)
if(J.a(this.x.h(0,"tmp"),"bubble_clicking")){v.$8(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"size"),J.a(J.a(this.x.h(0,"particles"),"size"),"value"),a.r,a.f,"size",x,p,null)
v.$8(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity"),J.a(J.a(this.x.h(0,"particles"),"opacity"),"value"),a.e,a.d,"opacity",x,p,null)}}},
c_:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"enable")&&J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"repulse")&&J.l(J.a(this.x.h(0,"interactivity"),"status"),"mousemove")){z=a.x-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_x")
y=a.y-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_y")
x=Math.sqrt(z*z+y*y)
w=P.p
v=P.b0
u=P.d(["x",z/x,"y",y/x],w,v)
t=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"repulse"),"distance")
s=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"repulse"),"strength")
r=Math.min(Math.max(1/t*(-1*Math.pow(x/t,2)+1)*t*s,0),50)
q=P.d(["x",a.x+J.q(u.h(0,"x"),r),"y",a.y+J.q(u.h(0,"y"),r)],w,v)
if(J.l(J.a(J.a(this.x.h(0,"particles"),"move"),"out_mode"),"bounce")){if(J.Q(q.h(0,"x"),a.f)>0&&J.b5(J.E(q.h(0,"x"),a.f),this.d))a.x=q.h(0,"x")
if(J.Q(q.h(0,"y"),a.f)>0&&J.b5(J.E(q.h(0,"y"),a.f),this.e))a.y=q.h(0,"y")}else{a.x=q.h(0,"x")
a.y=q.h(0,"y")}}else if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"enable")&&J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"repulse")){J.a(this.x.h(0,"tmp"),"repulse_finish")
w=J.a(this.x.h(0,"tmp"),"repulse_finish")
if(w){w=this.x.h(0,"tmp")
v=J.H(w)
v.i(w,"repulse_count",J.E(v.h(w,"repulse_count"),1))
if(J.l(J.a(this.x.h(0,"tmp"),"repulse_count"),J.A(J.a(this.x.h(0,"particles"),"array"))))J.i(this.x.h(0,"tmp"),"repulse_finish",!0)}if(J.a(this.x.h(0,"tmp"),"repulse_clicking")){t=Math.pow(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"repulse"),"distance")/6,3)
p=J.Q(J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"click_pos_x"),a.x)
o=J.Q(J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"click_pos_y"),a.y)
n=p*p+o*o
if(n<=t)new Y.eh(this,o,p,a,-t/n).$0()}else if(J.l(J.a(this.x.h(0,"tmp"),"repulse_clicking"),!1)){a.dx=a.fr
a.dy=a.fx}}},
bS:function(){var z,y
z=J.l(J.a(this.x.h(0,"interactivity"),"detect_on"),"window")
y=this.x
if(z)J.i(y.h(0,"interactivity"),"el",window)
else J.i(y.h(0,"interactivity"),"el",this.b)
if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"enable")||J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"enable")){J.d9(J.a(this.x.h(0,"interactivity"),"el")).a9(new Y.eb(this))
J.bC(J.a(this.x.h(0,"interactivity"),"el"),"mouseleave",new Y.ec(this))}if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"enable"))J.bC(J.a(this.x.h(0,"interactivity"),"el"),"click",new Y.ed(this))},
am:function(){var z,y,x,w
if(J.a(J.a(J.a(this.x.h(0,"particles"),"number"),"density"),"enable")){z=this.b
y=z.width*z.height/1000
if(J.a(this.x.h(0,"tmp"),"retina"))y/=this.f*2
x=C.v.G(y*J.a(J.a(this.x.h(0,"particles"),"number"),"value")/J.a(J.a(J.a(this.x.h(0,"particles"),"number"),"density"),"value_area"))
w=J.A(J.a(this.x.h(0,"particles"),"array"))-x
if(w<0)this.bg(Math.abs(w))
else this.bi(w)}},
bV:function(a){var z,y
J.i(this.x.h(0,"tmp"),"img_error",null)
if(!J.l(J.a(J.a(J.a(this.x.h(0,"particles"),"shape"),"image"),"src"),""))if(a==="svg"){z=new XMLHttpRequest()
C.t.co(z,"GET",J.a(J.a(J.a(this.x.h(0,"particles"),"shape"),"image"),"src"))
W.bs(z,"readystatechange",new Y.ee(this,z),!1)
z.send()}else{y=W.bQ(null,null,null)
C.k.T(y,"load",new Y.ef(this,y))
y.src=J.a(J.a(J.a(this.x.h(0,"particles"),"shape"),"image"),"src")}else{P.d0("Error Particles - No image.src")
J.i(this.x.h(0,"tmp"),"img_error",!0)}},
bP:[function(a){var z,y
if(J.l(J.a(J.a(this.x.h(0,"particles"),"shape"),"type"),"image")){if(J.l(J.a(this.x.h(0,"tmp"),"img_type"),"svg")){if(J.d5(J.a(this.x.h(0,"tmp"),"count_svg"),J.a(J.a(this.x.h(0,"particles"),"number"),"value"))){this.K()
if(!J.a(J.a(this.x.h(0,"particles"),"move"),"enable")){z=window
y=this.z
C.f.E(z)
z.cancelAnimationFrame(y)}else this.z=C.f.N(window,this.gR())}else if(!J.a(this.x.h(0,"tmp"),"img_error"))this.z=C.f.N(window,this.gR())}else if(J.a(this.x.h(0,"tmp"),"img_obj")!=null){this.K()
if(!J.a(J.a(this.x.h(0,"particles"),"move"),"enable")){z=window
y=this.z
C.f.E(z)
z.cancelAnimationFrame(y)}else this.z=C.f.N(window,this.gR())}else if(!J.a(this.x.h(0,"tmp"),"img_error"))this.z=C.f.N(window,this.gR())}else{this.K()
if(!J.a(J.a(this.x.h(0,"particles"),"move"),"enable")){z=window
y=this.z
C.f.E(z)
z.cancelAnimationFrame(y)}else this.z=C.f.N(window,this.gR())}this.Q.$0()},function(){return this.bP(null)},"aS","$1","$0","gR",0,2,13],
ak:function(){var z,y
if(J.l(J.a(J.a(this.x.h(0,"particles"),"shape"),"type"),"image")){z=J.l(J.a(this.x.h(0,"tmp"),"img_type"),"svg")&&J.a(this.x.h(0,"tmp"),"source_svg")==null
y=this.x
if(z)J.i(y.h(0,"tmp"),"checkAnimFrame",C.f.N(window,J.a(this.x.h(0,"tmp"),"checkAnimFrame")))
else{z=window
y=J.a(y.h(0,"tmp"),"checkAnimFrame")
C.f.E(z)
z.cancelAnimationFrame(y)
if(!J.a(this.x.h(0,"tmp"),"img_error")){this.aV()
this.aS()}}}else{this.aV()
this.aS()}},
aV:function(){var z,y,x
J.i(J.a(this.x.h(0,"particles"),"line_linked"),"color_rgb_line",M.b1(J.a(J.a(this.x.h(0,"particles"),"line_linked"),"color")))
J.i(this.x.h(0,"tmp"),"obj",P.d(["size_value",J.a(J.a(this.x.h(0,"particles"),"size"),"value"),"size_anim_speed",J.a(J.a(J.a(this.x.h(0,"particles"),"size"),"anim"),"speed"),"move_speed",J.a(J.a(this.x.h(0,"particles"),"move"),"speed"),"line_linked_distance",J.a(J.a(this.x.h(0,"particles"),"line_linked"),"distance"),"line_linked_width",J.a(J.a(this.x.h(0,"particles"),"line_linked"),"width"),"mode_grab_distance",J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"distance"),"mode_bubble_distance",J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"distance"),"mode_bubble_size",J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"size"),"mode_repulse_distance",J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"repulse"),"distance")],P.p,null))
if(this.x.h(0,"retina_detect")&&window.devicePixelRatio>1){this.f=window.devicePixelRatio
J.i(this.x.h(0,"tmp"),"retina",!0)}else{this.f=1
J.i(this.x.h(0,"tmp"),"retina",!1)}z=this.b
y=C.d.O(z.offsetWidth)
x=this.f
this.d=y*x
this.e=C.d.O(z.offsetHeight)*x
J.i(J.a(this.x.h(0,"particles"),"size"),"value",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"size_value"),this.f))
J.i(J.a(J.a(this.x.h(0,"particles"),"size"),"anim"),"speed",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"size_anim_speed"),this.f))
J.i(J.a(this.x.h(0,"particles"),"move"),"speed",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"move_speed"),this.f))
J.i(J.a(this.x.h(0,"particles"),"line_linked"),"distance",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"line_linked_distance"),this.f))
J.i(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"distance",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"mode_grab_distance"),this.f))
J.i(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"distance",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"mode_bubble_distance"),this.f))
J.i(J.a(this.x.h(0,"particles"),"line_linked"),"width",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"line_linked_width"),this.f))
J.i(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"size",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"mode_bubble_size"),this.f))
J.i(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"repulse"),"distance",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"mode_repulse_distance"),this.f))
this.bC()
this.c.fillRect(0,0,this.d,this.e)
this.aY()
this.am()},
b1:function(){if(J.w(J.a(J.a(this.x.h(0,"particles"),"shape"),"type"),"image")){J.i(this.x.h(0,"tmp"),"img_type",J.db(J.a(J.a(J.a(this.x.h(0,"particles"),"shape"),"image"),"src"),J.A(J.a(J.a(J.a(this.x.h(0,"particles"),"shape"),"image"),"src"))-3))
this.bV(J.a(this.x.h(0,"tmp"),"img_type"))}else this.ak()}},e9:{"^":"f;a",
$1:function(a){var z,y,x
z=this.a
y=z.b
z.d=C.d.O(y.offsetWidth)
z.e=C.d.O(y.offsetHeight)
if(z.x.h(0,"tmp").a6("retina")&&J.a(z.x.h(0,"tmp"),"retina")){y=z.d
x=z.f
z.d=y*x
z.e=z.e*x}y=z.b
y.width=z.d
y.height=z.e
if(!J.a(J.a(z.x.h(0,"particles"),"move"),"enable")){J.i(z.x.h(0,"particles"),"array",[])
z.aY()
z.K()
z.am()}z.am()}},eg:{"^":"f:6;",
$2:function(a,b){return J.bD(a.gab(),b.gab())}},ej:{"^":"f:6;",
$2:function(a,b){return J.bD(a.gab(),b.gab())}},e7:{"^":"f;a",
$0:function(){var z=this.a
z.e=z.d
z.r=z.f}},e8:{"^":"f;a,b",
$8:function(a,b,c,d,e,f,g,h){var z
if(a!=b){z=this.a
if(!J.a(z.x.h(0,"tmp"),"bubble_duration_end"))if(f<=J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"bubble"),"distance")){if((c!=null?c:d)!=a){h=d-g*(d-a)/J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"bubble"),"duration")
if(e==="size")this.b.r=h
if(e==="opacity")this.b.e=h}}else{if(e==="size")this.b.r=null
if(e==="opacity")this.b.e=null}else if(c!=null){h=a+(a-(d-g*(d-a)/J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"bubble"),"duration")))
if(e==="size")this.b.r=h
if(e==="opacity")this.b.e=h}}}},eh:{"^":"f;a,b,c,d,e",
$0:function(){var z,y,x,w
z=Math.atan2(this.b,this.c)
y=this.d
x=this.e
y.dx=x*Math.cos(z)
y.dy=x*Math.sin(z)
x=this.a
if(J.l(J.a(J.a(x.x.h(0,"particles"),"move"),"out_mode"),"bounce")){w=P.d(["x",y.x+y.dx,"y",y.y+y.dy],P.p,P.b0)
if(J.v(J.E(w.h(0,"x"),y.f),x.d))y.dx=-y.dx
else if(J.Q(w.h(0,"x"),y.f)<0)y.dx=-y.dx
if(J.v(J.E(w.h(0,"y"),y.f),x.e))y.dy=-y.dy
else if(J.Q(w.h(0,"y"),y.f)<0)y.dy=-y.dy}}},eb:{"^":"f;a",
$1:function(a){var z,y,x,w,v
a.clientY
z=this.a
if(J.l(J.a(z.x.h(0,"interactivity"),"detect_on"),"window")){y=a.clientX
x=a.clientY}else{w=J.O(a)
y=w.gbe(a).a
if(y==null)y=a.clientX
x=w.gbe(a).b
if(x==null)x=a.clientY}J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_x",y)
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_y",x)
if(J.a(z.x.h(0,"tmp"),"retina")){w=J.a(z.x.h(0,"interactivity"),"mouse")
v=J.H(w)
v.i(w,"pos_x",J.q(v.h(w,"pos_x"),z.f))
w=J.a(z.x.h(0,"interactivity"),"mouse")
v=J.H(w)
v.i(w,"pos_y",J.q(v.h(w,"pos_y"),z.f))}J.i(z.x.h(0,"interactivity"),"status","mousemove")}},ec:{"^":"f:0;a",
$1:function(a){var z=this.a
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_x",null)
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_y",null)
J.i(z.x.h(0,"interactivity"),"status","mouseleave")}},ed:{"^":"f:0;a",
$1:function(a){var z=this.a
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"click_pos_x",J.a(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_x"))
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"click_pos_y",J.a(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_y"))
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"click_time",Date.now())
if(J.a(J.a(J.a(z.x.h(0,"interactivity"),"events"),"onclick"),"enable")){if(J.w(J.a(J.a(J.a(z.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"push"))if(J.a(J.a(z.x.h(0,"particles"),"move"),"enable"))z.aC(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"push"),"particles_nb"),J.a(z.x.h(0,"interactivity"),"mouse"))
else if(J.l(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"push"),"particles_nb"),1))z.aC(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"push"),"particles_nb"),J.a(z.x.h(0,"interactivity"),"mouse"))
else if(J.v(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"push"),"particles_nb"),1))z.bg(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"push"),"particles_nb"))
if(J.w(J.a(J.a(J.a(z.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"remove"))z.bi(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"remove"),"particles_nb"))
if(J.w(J.a(J.a(J.a(z.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"bubble"))J.i(z.x.h(0,"tmp"),"bubble_clicking",!0)
if(J.w(J.a(J.a(J.a(z.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"repulse")){J.i(z.x.h(0,"tmp"),"repulse_clicking",!0)
J.i(z.x.h(0,"tmp"),"repulse_count",0)
J.i(z.x.h(0,"tmp"),"repulse_finish",!1)
P.eK(P.dv(0,0,0,J.bF(J.q(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"repulse"),"duration"),1000)),0,0),new Y.ea(z))}}}},ea:{"^":"f;a",
$0:function(){J.i(this.a.x.h(0,"tmp"),"repulse_clicking",!1)}},ee:{"^":"f;a,b",
$1:function(a){var z,y
z=this.b
if(z.readyState===4){y=this.a
if(z.status===200){J.i(y.x.h(0,"tmp"),"source_svg",W.h2(z.response))
y.ak()}else{P.d0("Error Particles - Image not found")
J.i(y.x.h(0,"tmp"),"img_error",!0)}}}},ef:{"^":"f;a,b",
$1:function(a){var z=this.a
J.i(z.x.h(0,"tmp"),"img_obj",this.b)
z.ak()}},ei:{"^":"f;",
$0:function(){}}}],["","",,M,{"^":"",
bx:function(a,b){var z=P.bY(P.p,null)
a.a8(0,new M.hn(b,a,z))
b.a8(0,new M.ho(a,z))
return z},
b1:function(a){var z,y,x
z=P.aT("^#?([a-f\\d])([a-f\\d])([a-f\\d])$",!1,!1)
a.length
a=H.hM(a,z,new M.hu(),0)
y=P.aT("^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$",!1,!1).ci(a)
if(y!=null){x=y.b
x=P.d(["r",P.m(x[1],null,16),"g",P.m(x[2],null,16),"b",P.m(x[3],null,16)],P.p,P.Y)}else x=null
return x},
hn:{"^":"f;a,b,c",
$2:function(a,b){var z,y,x
z=this.a
if(z.h(0,a)!=null){y=this.b
x=this.c
if(!!J.n(y.h(0,a)).$isa4)x.i(0,a,M.bx(y.h(0,a),z.h(0,a)))
else x.i(0,a,z.h(0,a))}else this.c.i(0,a,b)}},
ho:{"^":"f;a,b",
$2:function(a,b){if(this.a.h(0,a)==null)this.b.i(0,a,b)}},
hu:{"^":"f;",
$1:function(a){var z,y
z=a.b
y=z[1]
return C.e.t(C.e.t(C.e.t(C.e.t(J.E(y,y),z[2]),z[2]),z[3]),z[3])}}}],["","",,F,{"^":"",
cZ:function(){var z,y,x,w,v
z=P.p
y=P.c
x=P.Y
w=P.z
z=new Y.e6("particles",C.a,P.d(["particles",P.d(["number",P.d(["value",100,"density",P.d(["enable",!0,"value_area",800],z,y)],z,y),"color",P.d(["value","#fff"],z,z),"shape",P.d(["type","circle","stroke",P.d(["width",0,"color","#ff0000"],z,y),"polygon",P.d(["nb_sides",5],z,x),"character",P.d(["value","P","font","arial","style","normal","weight","normal"],z,z),"image",P.d(["src","particle.png","width",100,"height",100],z,y)],z,y),"opacity",P.d(["value",1,"random",!1,"anim",P.d(["enable",!1,"speed",2,"opacity_min",0,"sync",!1],z,y)],z,y),"size",P.d(["value",10,"random",!1,"anim",P.d(["enable",!1,"speed",20,"size_min",0,"sync",!1],z,y)],z,y),"line_linked",P.d(["enable",!0,"distance",100,"color","#FFFFFF","opacity",1,"width",1],z,y),"move",P.d(["enable",!0,"speed",6,"direction","none","random",!1,"straight",!1,"out_mode","out","bounce",!1,"parallax",!1,"attract",P.d(["enable",!1,"rotateX",3000,"rotateY",3000],z,y)],z,y),"array",[],"tmp",P.a3()],z,y),"interactivity",P.d(["detect_on","canvas","events",P.d(["onhover",P.d(["enable",!0,"mode","grab"],z,y),"onclick",P.d(["enable",!0,"mode","push"],z,y),"resize",!0],z,y),"modes",P.d(["grab",P.d(["distance",100,"line_linked",P.d(["opacity",1],z,x),"outer_shape",P.d(["enable",!1,"type","inherit","size",20,"stroke",P.d(["width","inherit","color","inherit"],z,z)],z,y)],z,y),"bubble",P.d(["distance",100,"size",40,"duration",0.4,"opacity",8,"speed",3],z,w),"repulse",P.d(["distance",200,"strength",100,"duration",0.4],z,w),"push",P.d(["particles_nb",4],z,x),"remove",P.d(["particles_nb",2],z,x)],z,[P.a4,P.p,P.c]),"mouse",P.a3()],z,y),"retina_detect",!1,"fn",P.d(["interact",P.a3(),"modes",P.a3(),"vendors",P.a3()],z,[P.a4,,,]),"tmp",P.a3()],z,null),null,new Y.ei())
z.bM()
y=z.y
if(y!=null)z.x=M.bx(z.x,y)
z.bS()
z.b1()
$.aL=z
F.hk()
F.bA()
v=new W.fh(document.querySelectorAll("input, select"),[W.az])
new W.br(v,!1,"change",[W.aA]).a9(new F.hD())
new W.br(v,!1,"keyup",[W.bW]).a9(new F.hE())},
hk:function(){var z,y,x,w
z={}
y=document
x=y.getElementById("fps")
w=y.getElementById("total")
z.a=0
$.aL.Q=new F.hl(z)
P.eL(C.r,new F.hm(z,x,w))},
h:function(a){var z=document.getElementById(a)
if(!!J.n(z).$isaF)return z
else return H.b2(z,"$isaQ")},
bA:function(){var z,y,x,w,v,u,t,s
z=$.aL
y=P.p
x=P.c
w=P.d(["value",P.m(J.j(F.h("particles-number-value")),null,null),"density",P.d(["enable",J.t(F.h("particles-number-density-enable")),"value_area",P.m(J.j(F.h("particles-number-density-value_area")),null,null)],y,null)],y,x)
v=document
u=[P.B,,]
t=P.Y
s=P.z
z.y=P.d(["particles",P.d(["number",w,"color",P.d(["value",F.aK(v.getElementById("particles-color-value"))],y,u),"shape",P.d(["type",F.aK(v.getElementById("particles-shape-type")),"stroke",P.d(["width",P.m(J.j(F.h("particles-shape-stroke-width")),null,null),"color",J.j(F.h("particles-shape-stroke-color"))],y,null),"polygon",P.d(["nb_sides",P.m(J.j(F.h("particles-shape-polygon-nb_sides")),null,null)],y,t),"image",P.d(["src",J.j(F.h("particles-shape-image-src")),"width",P.m(J.j(F.h("particles-shape-image-width")),null,null),"height",P.m(J.j(F.h("particles-shape-image-height")),null,null)],y,null),"character",P.d(["value",F.aK(v.getElementById("particles-shape-character-value"))],y,u)],y,x),"opacity",P.d(["value",P.ab(J.j(F.h("particles-opacity-value")),null),"random",J.t(F.h("particles-opacity-random")),"anim",P.d(["enable",J.t(F.h("particles-opacity-anim-enable")),"speed",P.m(J.j(F.h("particles-opacity-anim-speed")),null,null),"opacity_min",P.ab(J.j(F.h("particles-opacity-anim-opacity_min")),null),"sync",J.t(F.h("particles-opacity-anim-sync"))],y,null)],y,null),"size",P.d(["value",P.m(J.j(F.h("particles-size-value")),null,null),"random",J.t(F.h("particles-size-random")),"anim",P.d(["enable",J.t(F.h("particles-size-anim-enable")),"speed",P.m(J.j(F.h("particles-size-anim-speed")),null,null),"size_min",P.m(J.j(F.h("particles-size-anim-size_min")),null,null),"sync",J.t(F.h("particles-size-anim-sync"))],y,null)],y,null),"line_linked",P.d(["enable",J.t(F.h("particles-line_linked-enable")),"distance",P.m(J.j(F.h("particles-line_linked-distance")),null,null),"color",J.j(F.h("particles-line_linked-color")),"opacity",P.ab(J.j(F.h("particles-line_linked-opacity")),null),"width",P.m(J.j(F.h("particles-line_linked-width")),null,null)],y,null),"move",P.d(["enable",J.t(F.h("particles-move-enable")),"speed",P.m(J.j(F.h("particles-move-speed")),null,null),"direction",J.j(F.h("particles-move-direction")),"random",J.t(F.h("particles-move-random")),"straight",J.t(F.h("particles-move-straight")),"out_mode",J.j(F.h("particles-move-out_mode")),"parallax",J.t(F.h("particles-move-parallax")),"bounce",J.t(F.h("particles-move-bounce")),"attract",P.d(["enable",J.t(F.h("particles-move-attract-enable")),"rotateX",P.m(J.j(F.h("particles-move-attract-rotateX")),null,null),"rotateY",P.m(J.j(F.h("particles-move-attract-rotateY")),null,null)],y,null)],y,null)],y,[P.a4,P.p,,]),"interactivity",P.d(["detect_on",J.j(F.h("interactivity-detect_on")),"events",P.d(["onhover",P.d(["enable",J.t(F.h("interactivity-events-onhover-enable")),"mode",F.aK(v.getElementById("interactivity-events-onhover-mode"))],y,null),"onclick",P.d(["enable",J.t(F.h("interactivity-events-onclick-enable")),"mode",F.aK(v.getElementById("interactivity-events-onclick-mode"))],y,null),"resize",J.t(F.h("interactivity-events-resize"))],y,null),"modes",P.d(["grab",P.d(["distance",P.m(J.j(F.h("interactivity-modes-grab-distance")),null,null),"line_linked",P.d(["opacity",P.ab(J.j(F.h("interactivity-modes-grab-line_linked-opacity")),null)],y,P.b0),"outer_shape",P.d(["enable",J.t(F.h("interactivity-modes-grab-outer_shape-enable")),"type",J.j(F.h("interactivity-modes-grab-outer_shape-type")),"size",P.m(J.j(F.h("interactivity-modes-grab-outer_shape-size")),null,null),"stroke",P.d(["width",P.m(J.j(F.h("interactivity-modes-grab-outer_shape-stroke-width")),null,null),"color",J.j(F.h("interactivity-modes-grab-outer_shape-stroke-color"))],y,null)],y,null)],y,x),"bubble",P.d(["distance",P.m(J.j(F.h("interactivity-modes-bubble-distance")),null,null),"size",P.m(J.j(F.h("interactivity-modes-bubble-size")),null,null),"duration",P.ab(J.j(F.h("interactivity-modes-bubble-duration")),null),"opacity",P.ab(J.j(F.h("interactivity-modes-bubble-opacity")),null),"speed",P.m(J.j(F.h("interactivity-modes-bubble-speed")),null,null)],y,s),"repulse",P.d(["distance",P.m(J.j(F.h("interactivity-modes-repulse-distance")),null,null),"strength",P.m(J.j(F.h("interactivity-modes-repulse-strength")),null,null),"duration",P.ab(J.j(F.h("interactivity-modes-repulse-duration")),null)],y,s),"push",P.d(["particles_nb",P.m(J.j(F.h("interactivity-modes-push-particles_nb")),null,null)],y,t),"remove",P.d(["particles_nb",P.m(J.j(F.h("interactivity-modes-remove-particles_nb")),null,null)],y,t)],y,[P.a4,P.p,P.c])],y,null),"retina_detect",J.t(F.h("retina_detect"))],y,null)
y=$.aL
y.toString
t=window
s=J.a(y.x.h(0,"tmp"),"checkAnimFrame")
C.f.E(t)
t.cancelAnimationFrame(s)
s=window
t=y.z
C.f.E(s)
s.cancelAnimationFrame(t)
J.i(y.x.h(0,"tmp"),"source_svg",null)
J.i(y.x.h(0,"tmp"),"img_obj",null)
J.i(y.x.h(0,"tmp"),"count_svg",0)
J.i(y.x.h(0,"particles"),"array",[])
y.c.clearRect(0,0,y.d,y.e)
y.x=M.bx(y.x,y.y)
y.b1()},
aK:function(a){var z,y,x,w
z=a.querySelectorAll("input, select")
y=[]
for(x=0;x<z.length;++x){w=z[x]
if(!!J.n(w).$isaF)y.push(w.value)
else y.push(H.b2(w,"$isaQ").value)}return y},
hD:{"^":"f;",
$1:function(a){var z,y
F.bA()
z=J.O(a)
if(!!J.n(z.gac(a)).$isaF){y=H.b2(z.gac(a),"$isaF")
y.setAttribute("value",y.value)}else{y=H.b2(z.gac(a),"$isaQ")
y.setAttribute("value",y.value)}}},
hE:{"^":"f;",
$1:function(a){F.bA()}},
hl:{"^":"f;a",
$0:function(){++this.a.a}},
hm:{"^":"f;a,b,c",
$1:function(a){var z,y,x
z=this.b
y=this.a
z.textContent=C.b.j(y.a)
this.c.textContent=J.ax(J.A(J.a($.aL.x.h(0,"particles"),"array")))
x=J.O(z)
if(y.a<30)x.gax(z).u(0,"has-text-danger")
else x.gax(z).b6(0)
y.a=0}}},1]]
setupProgram(dart,0,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bS.prototype
return J.bR.prototype}if(typeof a=="string")return J.aj.prototype
if(a==null)return J.bT.prototype
if(typeof a=="boolean")return J.dM.prototype
if(a.constructor==Array)return J.ah.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ak.prototype
return a}if(a instanceof P.c)return a
return J.aJ(a)}
J.hq=function(a){if(typeof a=="number")return J.ai.prototype
if(typeof a=="string")return J.aj.prototype
if(a==null)return a
if(a.constructor==Array)return J.ah.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ak.prototype
return a}if(a instanceof P.c)return a
return J.aJ(a)}
J.H=function(a){if(typeof a=="string")return J.aj.prototype
if(a==null)return a
if(a.constructor==Array)return J.ah.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ak.prototype
return a}if(a instanceof P.c)return a
return J.aJ(a)}
J.at=function(a){if(a==null)return a
if(a.constructor==Array)return J.ah.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ak.prototype
return a}if(a instanceof P.c)return a
return J.aJ(a)}
J.au=function(a){if(typeof a=="number")return J.ai.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.ao.prototype
return a}
J.cU=function(a){if(typeof a=="number")return J.ai.prototype
if(typeof a=="string")return J.aj.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.ao.prototype
return a}
J.cV=function(a){if(typeof a=="string")return J.aj.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.ao.prototype
return a}
J.O=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.ak.prototype
return a}if(a instanceof P.c)return a
return J.aJ(a)}
J.hr=function(a){if(a==null)return a
if(!(a instanceof P.c))return J.ao.prototype
return a}
J.E=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.hq(a).t(a,b)}
J.l=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).C(a,b)}
J.d5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.au(a).aH(a,b)}
J.v=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.au(a).aI(a,b)}
J.b5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.au(a).ad(a,b)}
J.q=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.cU(a).W(a,b)}
J.Q=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.au(a).Z(a,b)}
J.a=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.cY(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.H(a).h(a,b)}
J.i=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.cY(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.at(a).i(a,b,c)}
J.d6=function(a,b,c,d){return J.O(a).bZ(a,b,c,d)}
J.bB=function(a,b){return J.at(a).u(a,b)}
J.bC=function(a,b,c){return J.O(a).T(a,b,c)}
J.d7=function(a,b,c,d){return J.O(a).a5(a,b,c,d)}
J.bD=function(a,b){return J.cU(a).cd(a,b)}
J.w=function(a,b){return J.H(a).B(a,b)}
J.t=function(a){return J.O(a).gcb(a)}
J.d8=function(a){return J.hr(a).gcg(a)}
J.a0=function(a){return J.n(a).gv(a)}
J.bE=function(a){return J.at(a).gA(a)}
J.A=function(a){return J.H(a).gk(a)}
J.d9=function(a){return J.O(a).gV(a)}
J.j=function(a){return J.O(a).gbm(a)}
J.da=function(a,b,c){return J.at(a).aD(a,b,c)}
J.bF=function(a){return J.au(a).O(a)}
J.bG=function(a,b){return J.at(a).Y(a,b)}
J.db=function(a,b){return J.cV(a).ae(a,b)}
J.bH=function(a){return J.au(a).cw(a)}
J.ax=function(a){return J.n(a).j(a)}
J.b6=function(a){return J.cV(a).cz(a)}
var $=I.p
C.t=W.dD.prototype
C.k=W.dF.prototype
C.u=J.u.prototype
C.h=J.ah.prototype
C.v=J.bR.prototype
C.b=J.bS.prototype
C.i=J.bT.prototype
C.d=J.ai.prototype
C.e=J.aj.prototype
C.C=J.ak.prototype
C.n=J.ek.prototype
C.j=J.ao.prototype
C.f=W.eQ.prototype
C.o=new P.e1()
C.p=new P.fa()
C.a=new P.fx()
C.c=new P.fG()
C.q=new P.R(0)
C.r=new P.R(1e6)
C.w=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.x=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.l=function(hooks) { return hooks; }

C.y=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.z=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.A=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.B=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.m=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
$.K=0
$.ac=null
$.bI=null
$.cX=null
$.cM=null
$.d1=null
$.b_=null
$.b3=null
$.by=null
$.a7=null
$.ap=null
$.aq=null
$.bu=!1
$.k=C.c
$.aL=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["bN","$get$bN",function(){return H.cW("_$dart_dartClosure")},"bh","$get$bh",function(){return H.cW("_$dart_js")},"cf","$get$cf",function(){return H.M(H.aW({
toString:function(){return"$receiver$"}}))},"cg","$get$cg",function(){return H.M(H.aW({$method$:null,
toString:function(){return"$receiver$"}}))},"ch","$get$ch",function(){return H.M(H.aW(null))},"ci","$get$ci",function(){return H.M(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cm","$get$cm",function(){return H.M(H.aW(void 0))},"cn","$get$cn",function(){return H.M(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ck","$get$ck",function(){return H.M(H.cl(null))},"cj","$get$cj",function(){return H.M(function(){try{null.$method$}catch(z){return z.message}}())},"cp","$get$cp",function(){return H.M(H.cl(void 0))},"co","$get$co",function(){return H.M(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bq","$get$bq",function(){return P.eW()},"aB","$get$aB",function(){var z=new P.G(0,C.c,[P.D])
z.c4(null)
return z},"as","$get$as",function(){return[]},"bM","$get$bM",function(){return P.aT("^\\S+$",!0,!1)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:P.D,args:[,]},{func:1,ret:-1},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,args:[,]},{func:1,ret:-1,args:[P.c],opt:[P.U]},{func:1,ret:-1,args:[,]},{func:1,ret:P.Y,args:[,,]},{func:1,ret:-1,args:[P.c]},{func:1,ret:P.D,args:[,],opt:[,]},{func:1,ret:[P.G,,],args:[,]},{func:1,ret:P.D,args:[,P.U]},{func:1,ret:P.D,args:[,,]},{func:1,args:[,,]},{func:1,ret:-1,opt:[,]},{func:1,ret:P.p,args:[P.p]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.hN(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.cT=a.cT
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(F.cZ,[])
else F.cZ([])})})()
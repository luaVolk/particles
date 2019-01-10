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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.cV=function(){}
var dart=[["","",,H,{"^":"",io:{"^":"c;a"}}],["","",,J,{"^":"",
bz:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
aJ:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.by==null){H.hC()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(P.bp("Return interceptor for "+H.b(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bh()]
if(v!=null)return v
v=H.hF(a)
if(v!=null)return v
if(typeof a=="function")return C.C
y=Object.getPrototypeOf(a)
if(y==null)return C.n
if(y===Object.prototype)return C.n
if(typeof w=="function"){Object.defineProperty(w,$.$get$bh(),{value:C.i,enumerable:false,writable:true,configurable:true})
return C.i}return C.i},
u:{"^":"c;",
C:function(a,b){return a===b},
gv:function(a){return H.a5(a)},
j:["bq",function(a){return"Instance of '"+H.ao(a)+"'"}],
"%":"ArrayBuffer|Blob|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|DOMError|File|MediaError|Navigator|NavigatorConcurrentHardware|NavigatorUserMediaError|OverconstrainedError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber"},
dQ:{"^":"u;",
j:function(a){return String(a)},
gv:function(a){return a?519018:218159},
$iscS:1},
bT:{"^":"u;",
C:function(a,b){return null==b},
j:function(a){return"null"},
gv:function(a){return 0},
$isC:1},
bi:{"^":"u;",
gv:function(a){return 0},
j:["br",function(a){return String(a)}]},
eo:{"^":"bi;"},
aq:{"^":"bi;"},
am:{"^":"bi;",
j:function(a){var z=a[$.$get$bN()]
if(z==null)return this.br(a)
return"JavaScript function for "+H.b(J.az(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
aj:{"^":"u;$ti",
u:function(a,b){if(!!a.fixed$length)H.y(P.n("add"))
a.push(b)},
aA:function(a,b,c){if(!!a.fixed$length)H.y(P.n("removeRange"))
P.aS(b,c,a.length,null,null,null)
a.splice(b,c-b)},
bo:function(a,b,c,d,e){var z,y,x
if(!!a.immutable$list)H.y(P.n("setRange"))
P.aS(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
y=J.H(d)
if(e+z>y.gk(d))throw H.e(H.dN())
if(e<b)for(x=z-1;x>=0;--x)a[b+x]=y.h(d,e+x)
else for(x=0;x<z;++x)a[b+x]=y.h(d,e+x)},
V:function(a,b,c,d){return this.bo(a,b,c,d,0)},
W:function(a,b){if(!!a.immutable$list)H.y(P.n("sort"))
H.c8(a,b)},
B:function(a,b){var z
for(z=0;z<a.length;++z)if(J.l(a[z],b))return!0
return!1},
j:function(a){return P.bf(a,"[","]")},
gA:function(a){return new J.dg(a,a.length,0)},
gv:function(a){return H.a5(a)},
gk:function(a){return a.length},
sk:function(a,b){if(!!a.fixed$length)H.y(P.n("set length"))
if(b<0)throw H.e(P.ap(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(b>=a.length||b<0)throw H.e(H.ab(a,b))
return a[b]},
i:function(a,b,c){if(!!a.immutable$list)H.y(P.n("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.ab(a,b))
if(b>=a.length||b<0)throw H.e(H.ab(a,b))
a[b]=c},
t:function(a,b){var z,y
z=C.b.t(a.length,C.h.gk(b))
y=H.Z([],[H.P(a,0)])
this.sk(y,z)
this.V(y,0,a.length,a)
this.V(y,a.length,z,b)
return y},
$isA:1,
n:{
dP:function(a,b){return J.bg(H.Z(a,[b]))},
bg:function(a){a.fixed$length=Array
return a}}},
im:{"^":"aj;$ti"},
dg:{"^":"c;a,b,c,0d",
gw:function(){return this.d},
p:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.d6(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ak:{"^":"u;",
cc:function(a,b){var z
if(typeof b!=="number")throw H.e(H.K(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gaw(b)
if(this.gaw(a)===z)return 0
if(this.gaw(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaw:function(a){return a===0?1/a<0:a<0},
cw:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(P.n(""+a+".toInt()"))},
F:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.e(P.n(""+a+".floor()"))},
M:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(P.n(""+a+".round()"))},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
t:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a+b},
X:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a-b},
U:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a*b},
bt:function(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.b0(a,b)},
E:function(a,b){return(a|0)===a?a/b|0:this.b0(a,b)},
b0:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.e(P.n("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
aZ:function(a,b){var z
if(a>0)z=this.c3(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
c3:function(a,b){return b>31?0:a>>>b},
aa:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a<b},
aF:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a>b},
aE:function(a,b){if(typeof b!=="number")throw H.e(H.K(b))
return a>=b},
$isb0:1,
$isv:1},
bS:{"^":"ak;",$isI:1},
bR:{"^":"ak;"},
al:{"^":"u;",
b6:function(a,b){if(b<0)throw H.e(H.ab(a,b))
if(b>=a.length)H.y(H.ab(a,b))
return a.charCodeAt(b)},
Y:function(a,b){if(b>=a.length)throw H.e(H.ab(a,b))
return a.charCodeAt(b)},
t:function(a,b){if(typeof b!=="string")throw H.e(P.b7(b,null,null))
return a+b},
ac:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.e(P.aR(b,null,null))
if(b>c)throw H.e(P.aR(b,null,null))
if(c>a.length)throw H.e(P.aR(c,null,null))
return a.substring(b,c)},
ab:function(a,b){return this.ac(a,b,null)},
cz:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.Y(z,0)===133){x=J.dR(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.b6(z,w)===133?J.dS(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
U:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.e(C.o)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
cd:function(a,b,c){if(c>a.length)throw H.e(P.ap(c,0,a.length,null,null))
return H.hN(a,b,c)},
B:function(a,b){return this.cd(a,b,0)},
j:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gk:function(a){return a.length},
h:function(a,b){if(b>=a.length||b<0)throw H.e(H.ab(a,b))
return a[b]},
$isp:1,
n:{
bU:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
dR:function(a,b){var z,y
for(z=a.length;b<z;){y=C.e.Y(a,b)
if(y!==32&&y!==13&&!J.bU(y))break;++b}return b},
dS:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.e.b6(a,z)
if(y!==32&&y!==13&&!J.bU(y))break}return b}}}}],["","",,H,{"^":"",
dN:function(){return new P.aH("Too few elements")},
c8:function(a,b){H.aG(a,0,J.z(a)-1,b)},
aG:function(a,b,c,d){if(c-b<=32)H.eF(a,b,c,d)
else H.eE(a,b,c,d)},
eF:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.H(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.w(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.i(a,w,y.h(a,v))
w=v}y.i(a,w,x)}},
eE:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.b.E(c-b+1,6)
y=b+z
x=c-z
w=C.b.E(b+c,2)
v=w-z
u=w+z
t=J.H(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.w(d.$2(s,r),0)){n=r
r=s
s=n}if(J.w(d.$2(p,o),0)){n=o
o=p
p=n}if(J.w(d.$2(s,q),0)){n=q
q=s
s=n}if(J.w(d.$2(r,q),0)){n=q
q=r
r=n}if(J.w(d.$2(s,p),0)){n=p
p=s
s=n}if(J.w(d.$2(q,p),0)){n=p
p=q
q=n}if(J.w(d.$2(r,o),0)){n=o
o=r
r=n}if(J.w(d.$2(r,q),0)){n=q
q=r
r=n}if(J.w(d.$2(p,o),0)){n=o
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
bP:{"^":"aD;"},
c_:{"^":"c;a,b,c,0d",
gw:function(){return this.d},
p:function(){var z,y,x,w
z=this.a
y=J.H(z)
x=y.gk(z)
if(this.b!==x)throw H.e(P.af(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a5(z,w);++this.c
return!0}},
e2:{"^":"aD;a,b,$ti",
gA:function(a){var z=this.a
return new H.c1(z.gA(z),this.b)},
gk:function(a){return this.a.a.a},
$asaD:function(a,b){return[b]},
n:{
e3:function(a,b,c,d){return new H.dC(a,b,[c,d])}}},
dC:{"^":"e2;a,b,$ti"},
c1:{"^":"dO;0a,b,c",
p:function(){var z=this.b
if(z.p()){this.a=this.c.$1(z.d)
return!0}this.a=null
return!1},
gw:function(){return this.a}}}],["","",,H,{"^":"",
aM:function(a){var z=init.mangledGlobalNames[a]
if(typeof z==="string")return z
z="minified:"+a
return z},
hw:function(a){return init.types[a]},
d0:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.o(a).$isa2},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.az(a)
if(typeof z!=="string")throw H.e(H.K(a))
return z},
a5:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
ey:function(a,b){var z,y,x,w,v,u
if(typeof a!=="string")H.y(H.K(a))
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return
y=z[3]
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return}if(b<2||b>36)throw H.e(P.ap(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.e.Y(w,u)|32)>x)return}return parseInt(a,b)},
ex:function(a){var z,y
if(typeof a!=="string")H.y(H.K(a))
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return
z=parseFloat(a)
if(isNaN(z)){y=J.b5(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return}return z},
ao:function(a){return H.ep(a)+H.cH(H.ax(a),0,null)},
ep:function(a){var z,y,x,w,v,u,t,s,r
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.u||!!z.$isaq){u=C.m(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.aM(w.length>1&&C.e.Y(w,0)===36?C.e.ab(w,1):w)},
B:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
ew:function(a){return a.b?H.B(a).getUTCFullYear()+0:H.B(a).getFullYear()+0},
eu:function(a){return a.b?H.B(a).getUTCMonth()+1:H.B(a).getMonth()+1},
eq:function(a){return a.b?H.B(a).getUTCDate()+0:H.B(a).getDate()+0},
er:function(a){return a.b?H.B(a).getUTCHours()+0:H.B(a).getHours()+0},
et:function(a){return a.b?H.B(a).getUTCMinutes()+0:H.B(a).getMinutes()+0},
ev:function(a){return a.b?H.B(a).getUTCSeconds()+0:H.B(a).getSeconds()+0},
es:function(a){return a.b?H.B(a).getUTCMilliseconds()+0:H.B(a).getMilliseconds()+0},
ab:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a1(!0,b,"index",null)
z=J.z(a)
if(b<0||b>=z)return P.aQ(b,a,"index",null,z)
return P.aR(b,"index",null)},
K:function(a){return new P.a1(!0,a,null,null)},
e:function(a){var z
if(a==null)a=new P.bk()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.d7})
z.name=""}else z.toString=H.d7
return z},
d7:function(){return J.az(this.dartException)},
y:function(a){throw H.e(a)},
d6:function(a){throw H.e(P.af(a))},
a_:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.hR(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.aZ(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bj(H.b(y)+" (Error "+w+")",null))
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
if(l)return z.$1(H.c3(y,m))}}return z.$1(new H.eS(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.c9()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a1(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.c9()
return a},
Y:function(a){var z
if(a==null)return new H.cD(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.cD(a)},
cU:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.i(0,a[y],a[x])}return b},
hE:function(a,b,c,d,e,f){switch(b){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.e(new P.fk("Unsupported number of arguments for wrapped closure"))},
O:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.hE)
a.$identity=z
return z},
dp:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b[0]
y=z.$callName
if(!!J.o(d).$isA){z.$reflectionInfo=d
x=H.eB(z).r}else x=d
w=e?Object.create(new H.eG().constructor.prototype):Object.create(new H.b8(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.L
$.L=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=H.bK(a,z,f)
t.$reflectionInfo=d}else{w.$static_name=g
t=z}if(typeof x=="number")s=function(h,i){return function(){return h(i)}}(H.hw,x)
else if(typeof x=="function")if(e)s=x
else{r=f?H.bJ:H.b9
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
dl:function(a,b,c,d){var z=H.b9
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bK:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.dn(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.dl(y,!w,z,b)
if(y===0){w=$.L
$.L=w+1
u="self"+H.b(w)
w="return function(){var "+u+" = this."
v=$.ae
if(v==null){v=H.aO("self")
$.ae=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.L
$.L=w+1
t+=H.b(w)
w="return function("+t+"){return this."
v=$.ae
if(v==null){v=H.aO("self")
$.ae=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
dm:function(a,b,c,d){var z,y
z=H.b9
y=H.bJ
switch(b?-1:a){case 0:throw H.e(H.eD("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
dn:function(a,b){var z,y,x,w,v,u,t,s
z=$.ae
if(z==null){z=H.aO("self")
$.ae=z}y=$.bI
if(y==null){y=H.aO("receiver")
$.bI=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.dm(w,!u,x,b)
if(w===1){z="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
y=$.L
$.L=y+1
return new Function(z+H.b(y)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
y=$.L
$.L=y+1
return new Function(z+H.b(y)+"}")()},
bw:function(a,b,c,d,e,f,g){return H.dp(a,b,c,d,!!e,!!f,g)},
hL:function(a,b){throw H.e(H.dk(a,H.aM(b.substring(3))))},
d_:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.hL(a,b)},
cT:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[z]
else return a.$S()}return},
aI:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.cT(J.o(a))
if(z==null)return!1
return H.cG(z,null,b,null)},
hf:function(a){var z,y
z=J.o(a)
if(!!z.$isf){y=H.cT(z)
if(y!=null)return H.hM(y)
return"Closure"}return H.ao(a)},
hQ:function(a){throw H.e(new P.du(a))},
cY:function(a){return init.getIsolateTag(a)},
Z:function(a,b){a.$ti=b
return a},
ax:function(a){if(a==null)return
return a.$ti},
iG:function(a,b,c){return H.ay(a["$as"+H.b(c)],H.ax(b))},
hv:function(a,b,c,d){var z=H.ay(a["$as"+H.b(c)],H.ax(b))
return z==null?null:z[d]},
P:function(a,b){var z=H.ax(a)
return z==null?null:z[b]},
hM:function(a){return H.X(a,null)},
X:function(a,b){if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.aM(a[0].builtin$cls)+H.cH(a,1,b)
if(typeof a=="function")return H.aM(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+H.b(a)
return H.b(b[b.length-a-1])}if('func' in a)return H.h6(a,b)
if('futureOr' in a)return"FutureOr<"+H.X("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
h6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
if("bounds" in a){z=a.bounds
if(b==null){b=H.Z([],[P.p])
y=null}else y=b.length
x=b.length
for(w=z.length,v=w;v>0;--v)b.push("T"+(x+v))
for(u="<",t="",v=0;v<w;++v,t=", "){u=C.e.t(u+t,b[b.length-v-1])
s=z[v]
if(s!=null&&s!==P.c)u+=" extends "+H.X(s,b)}u+=">"}else{u=""
y=null}r=!!a.v?"void":H.X(a.ret,b)
if("args" in a){q=a.args
for(p=q.length,o="",n="",m=0;m<p;++m,n=", "){l=q[m]
o=o+n+H.X(l,b)}}else{o=""
n=""}if("opt" in a){k=a.opt
o+=n+"["
for(p=k.length,n="",m=0;m<p;++m,n=", "){l=k[m]
o=o+n+H.X(l,b)}o+="]"}if("named" in a){j=a.named
o+=n+"{"
for(p=H.hs(j),i=p.length,n="",m=0;m<i;++m,n=", "){h=p[m]
o=o+n+H.X(j[h],b)+(" "+H.b(h))}o+="}"}if(y!=null)b.length=y
return u+"("+o+") => "+r},
cH:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bn("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.X(u,c)}return"<"+z.j(0)+">"},
ay:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aa:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.ax(a)
y=J.o(a)
if(y[b]==null)return!1
return H.cP(H.ay(y[d],z),null,c,null)},
cP:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.J(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.J(a[y],b,c[y],d))return!1
return!0},
iE:function(a,b,c){return a.apply(b,H.ay(J.o(b)["$as"+H.b(c)],H.ax(b)))},
J:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="c"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="c"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.J(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="C")return!0
if('func' in c)return H.cG(a,b,c,d)
if('func' in a)return c.builtin$cls==="ij"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.J("type" in a?a.type:null,b,x,d)
else if(H.J(a,b,x,d))return!0
else{if(!('$is'+"M" in y.prototype))return!1
w=y.prototype["$as"+"M"]
v=H.ay(w,z?a.slice(1):null)
return H.J(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.cP(H.ay(r,z),b,u,d)},
cG:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.J(a.ret,b,c.ret,d))return!1
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
for(p=0;p<t;++p)if(!H.J(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.J(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.J(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.hJ(m,b,l,d)},
hJ:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.J(c[w],d,a[w],b))return!1}return!0},
iF:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
hF:function(a){var z,y,x,w,v,u
z=$.cZ.$1(a)
y=$.b_[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b2[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.cO.$2(a,z)
if(z!=null){y=$.b_[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.b2[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.b3(x)
$.b_[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.b2[z]=x
return x}if(v==="-"){u=H.b3(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.d2(a,x)
if(v==="*")throw H.e(P.bp(z))
if(init.leafTags[z]===true){u=H.b3(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.d2(a,x)},
d2:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bz(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
b3:function(a){return J.bz(a,!1,null,!!a.$isa2)},
hI:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.b3(z)
else return J.bz(z,c,null,null)},
hC:function(){if(!0===$.by)return
$.by=!0
H.hD()},
hD:function(){var z,y,x,w,v,u,t,s
$.b_=Object.create(null)
$.b2=Object.create(null)
H.hy()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.d4.$1(v)
if(u!=null){t=H.hI(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
hy:function(){var z,y,x,w,v,u,t
z=C.z()
z=H.a8(C.w,H.a8(C.B,H.a8(C.l,H.a8(C.l,H.a8(C.A,H.a8(C.x,H.a8(C.y(C.m),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cZ=new H.hz(v)
$.cO=new H.hA(u)
$.d4=new H.hB(t)},
a8:function(a,b){return a(b)||b},
hN:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
iD:[function(a){return a},"$1","cI",4,0,16],
hO:function(a,b,c,d){var z,y,x,w,v,u
for(z=b.c6(0,a),z=new H.bq(z.a,z.b,z.c),y=0,x="";z.p();x=w){w=z.d
v=w.b
u=v.index
w=x+H.b(H.cI().$1(C.e.ac(a,y,u)))+H.b(c.$1(w))
y=u+v[0].length}z=x+H.b(H.cI().$1(C.e.ab(a,y)))
return z.charCodeAt(0)==0?z:z},
hP:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=b.b2(0,a,d)
y=new H.bq(z.a,z.b,z.c)
if(!y.p())return a
x=y.d
w=H.b(c.$1(x))
z=x.b.index
v=x.gb8()
u=P.aS(z,v,a.length,null,null,null)
t=a.substring(0,z)
s=a.substring(u)
return t+w+s},
eA:{"^":"c;a,b,c,d,e,f,r,0x",n:{
eB:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.bg(z)
y=z[0]
x=z[1]
return new H.eA(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
eQ:{"^":"c;a,b,c,d,e,f",
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
N:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.Z([],[P.p])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.eQ(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
aW:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
cl:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
e4:{"^":"x;a,b",
j:function(a){var z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
return"NoSuchMethodError: method not found: '"+z+"' on null"},
n:{
c3:function(a,b){return new H.e4(a,b==null?null:b.method)}}},
dV:{"^":"x;a,b,c",
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
return new H.dV(a,y,z?null:b.receiver)}}},
eS:{"^":"x;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
hR:{"^":"f:3;a",
$1:function(a){if(!!J.o(a).$isx)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
cD:{"^":"c;a,0b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isV:1},
f:{"^":"c;",
j:function(a){return"Closure '"+H.ao(this).trim()+"'"},
gbn:function(){return this},
gbn:function(){return this}},
cc:{"^":"f;"},
eG:{"^":"cc;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.aM(z)+"'"}},
b8:{"^":"cc;a,b,c,d",
C:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.b8))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.a5(this.a)
else y=typeof z!=="object"?J.a0(z):H.a5(z)
return(y^H.a5(this.b))>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+("Instance of '"+H.ao(z)+"'")},
n:{
b9:function(a){return a.a},
bJ:function(a){return a.c},
aO:function(a){var z,y,x,w,v
z=new H.b8("self","target","receiver","name")
y=J.bg(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
dj:{"^":"x;a",
j:function(a){return this.a},
n:{
dk:function(a,b){return new H.dj("CastError: "+H.b(P.bb(a))+": type '"+H.hf(a)+"' is not a subtype of type '"+b+"'")}}},
eC:{"^":"x;a",
j:function(a){return"RuntimeError: "+H.b(this.a)},
n:{
eD:function(a){return new H.eC(a)}}},
aE:{"^":"e_;a,0b,0c,0d,0e,0f,r,$ti",
gk:function(a){return this.a},
gay:function(){return new H.bX(this,[H.P(this,0)])},
gcA:function(a){var z=H.P(this,0)
return H.e3(new H.bX(this,[z]),new H.dU(this),z,H.P(this,1))},
a4:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.bJ(z,a)}else{y=this.ck(a)
return y}},
ck:function(a){var z=this.d
if(z==null)return!1
return this.av(this.an(z,J.a0(a)&0x3ffffff),a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.Z(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.Z(w,b)
x=y==null?null:y.b
return x}else return this.cl(b)},
cl:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.an(z,J.a0(a)&0x3ffffff)
x=this.av(y,a)
if(x<0)return
return y[x].b},
i:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.ao()
this.b=z}this.aI(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ao()
this.c=y}this.aI(y,b,c)}else{x=this.d
if(x==null){x=this.ao()
this.d=x}w=J.a0(b)&0x3ffffff
v=this.an(x,w)
if(v==null)this.as(x,w,[this.ap(b,c)])
else{u=this.av(v,b)
if(u>=0)v[u].b=c
else v.push(this.ap(b,c))}}},
a6:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(P.af(this))
z=z.c}},
aI:function(a,b,c){var z=this.Z(a,b)
if(z==null)this.as(a,b,this.ap(b,c))
else z.b=c},
aU:function(){this.r=this.r+1&67108863},
ap:function(a,b){var z,y
z=new H.dW(a,b)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.aU()
return z},
av:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.l(a[y].a,b))return y
return-1},
j:function(a){return P.c0(this)},
Z:function(a,b){return a[b]},
an:function(a,b){return a[b]},
as:function(a,b,c){a[b]=c},
bM:function(a,b){delete a[b]},
bJ:function(a,b){return this.Z(a,b)!=null},
ao:function(){var z=Object.create(null)
this.as(z,"<non-identifier-key>",z)
this.bM(z,"<non-identifier-key>")
return z}},
dU:{"^":"f;a",
$1:function(a){return this.a.h(0,a)},
$S:function(){var z=this.a
return{func:1,ret:H.P(z,1),args:[H.P(z,0)]}}},
dW:{"^":"c;a,b,0c,0d"},
bX:{"^":"bP;a,$ti",
gk:function(a){return this.a.a},
gA:function(a){var z,y
z=this.a
y=new H.dX(z,z.r)
y.c=z.e
return y},
B:function(a,b){return this.a.a4(b)}},
dX:{"^":"c;a,b,0c,0d",
gw:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.e(P.af(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
hz:{"^":"f:3;a",
$1:function(a){return this.a(a)}},
hA:{"^":"f;a",
$2:function(a,b){return this.a(a,b)}},
hB:{"^":"f;a",
$1:function(a){return this.a(a)}},
dT:{"^":"c;a,b,0c,0d",
j:function(a){return"RegExp/"+this.a+"/"},
gbU:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.bV(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
cg:function(a){var z=this.b.exec(a)
if(z==null)return
return new H.cC(this,z)},
b2:function(a,b,c){if(c>b.length)throw H.e(P.ap(c,0,b.length,null,null))
return new H.eY(this,b,c)},
c6:function(a,b){return this.b2(a,b,0)},
bR:function(a,b){var z,y
z=this.gbU()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.cC(this,y)},
n:{
bV:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.e(P.bc("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
cC:{"^":"c;a,b",
gb8:function(){var z=this.b
return z.index+z[0].length},
h:function(a,b){return this.b[b]},
$isc2:1},
eY:{"^":"dL;a,b,c",
gA:function(a){return new H.bq(this.a,this.b,this.c)},
$asaD:function(){return[P.c2]}},
bq:{"^":"c;a,b,c,0d",
gw:function(){return this.d},
p:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.bR(z,y)
if(x!=null){this.d=x
w=x.gb8()
this.c=x.b.index===w?w+1:w
return!0}}this.d=null
this.b=null
return!1}}}],["","",,H,{"^":"",
hs:function(a){return J.dP(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
hK:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":""}],["","",,P,{"^":"",
f_:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.hg()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.O(new P.f1(z),1)).observe(y,{childList:true})
return new P.f0(z,y,x)}else if(self.setImmediate!=null)return P.hh()
return P.hi()},
iw:[function(a){self.scheduleImmediate(H.O(new P.f2(a),0))},"$1","hg",4,0,2],
ix:[function(a){self.setImmediate(H.O(new P.f3(a),0))},"$1","hh",4,0,2],
iy:[function(a){P.bo(C.q,a)},"$1","hi",4,0,2],
bo:function(a,b){var z=C.b.E(a.a,1000)
return P.fT(z<0?0:z,b)},
ce:function(a,b){var z=C.b.E(a.a,1000)
return P.fU(z<0?0:z,b)},
ha:function(a,b){if(H.aI(a,{func:1,args:[P.c,P.V]}))return b.bf(a)
if(H.aI(a,{func:1,args:[P.c]}))return a
throw H.e(P.b7(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
h8:function(){var z,y
for(;z=$.a7,z!=null;){$.as=null
y=z.b
$.a7=y
if(y==null)$.ar=null
z.a.$0()}},
iC:[function(){$.bu=!0
try{P.h8()}finally{$.as=null
$.bu=!1
if($.a7!=null)$.$get$br().$1(P.cR())}},"$0","cR",0,0,1],
cM:function(a){var z=new P.cr(a)
if($.a7==null){$.ar=z
$.a7=z
if(!$.bu)$.$get$br().$1(P.cR())}else{$.ar.b=z
$.ar=z}},
he:function(a){var z,y,x
z=$.a7
if(z==null){P.cM(a)
$.as=$.ar
return}y=new P.cr(a)
x=$.as
if(x==null){y.b=z
$.as=y
$.a7=y}else{y.b=x.b
x.b=y
$.as=y
if(y.b==null)$.ar=y}},
d5:function(a){var z=$.k
if(C.c===z){P.W(null,null,C.c,a)
return}z.toString
P.W(null,null,z,z.at(a))},
cL:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.a_(x)
y=H.Y(x)
w=$.k
w.toString
P.at(null,null,w,z,y)}},
h9:[function(a,b){var z=$.k
z.toString
P.at(null,null,z,a,b)},function(a){return P.h9(a,null)},"$2","$1","hj",4,2,4],
iB:[function(){},"$0","cQ",0,0,1],
hd:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.a_(u)
y=H.Y(u)
$.k.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.dc(x)
w=t
v=x.gbp()
c.$2(w,v)}}},
h_:function(a,b,c,d){var z=a.S()
if(!!J.o(z).$isM&&z!==$.$get$aC())z.bl(new P.h2(b,c,d))
else b.H(c,d)},
h0:function(a,b){return new P.h1(a,b)},
h3:function(a,b,c){var z=a.S()
if(!!J.o(z).$isM&&z!==$.$get$aC())z.bl(new P.h4(b,!0))
else b.N(!0)},
eO:function(a,b){var z=$.k
if(z===C.c){z.toString
return P.bo(a,b)}return P.bo(a,z.at(b))},
eP:function(a,b){var z,y
z=$.k
if(z===C.c){z.toString
return P.ce(a,b)}y=z.b3(b,P.cd)
$.k.toString
return P.ce(a,y)},
at:function(a,b,c,d,e){var z={}
z.a=d
P.he(new P.hb(z,e))},
cJ:function(a,b,c,d){var z,y
y=$.k
if(y===c)return d.$0()
$.k=c
z=y
try{y=d.$0()
return y}finally{$.k=z}},
cK:function(a,b,c,d,e){var z,y
y=$.k
if(y===c)return d.$1(e)
$.k=c
z=y
try{y=d.$1(e)
return y}finally{$.k=z}},
hc:function(a,b,c,d,e,f){var z,y
y=$.k
if(y===c)return d.$2(e,f)
$.k=c
z=y
try{y=d.$2(e,f)
return y}finally{$.k=z}},
W:function(a,b,c,d){var z=C.c!==c
if(z)d=!(!z||!1)?c.at(d):c.c7(d)
P.cM(d)},
f1:{"^":"f:0;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
f0:{"^":"f;a,b,c",
$1:function(a){var z,y
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
f2:{"^":"f;a",
$0:function(){this.a.$0()}},
f3:{"^":"f;a",
$0:function(){this.a.$0()}},
cE:{"^":"c;a,0b,c",
bv:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.O(new P.fW(this,b),0),a)
else throw H.e(P.n("`setTimeout()` not found."))},
bw:function(a,b){if(self.setTimeout!=null)this.b=self.setInterval(H.O(new P.fV(this,a,Date.now(),b),0),a)
else throw H.e(P.n("Periodic timer."))},
$iscd:1,
n:{
fT:function(a,b){var z=new P.cE(!0,0)
z.bv(a,b)
return z},
fU:function(a,b){var z=new P.cE(!1,0)
z.bw(a,b)
return z}}},
fW:{"^":"f;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
fV:{"^":"f;a,b,c,d",
$0:function(){var z,y,x,w
z=this.a
y=z.c+1
x=this.b
if(x>0){w=Date.now()-this.c
if(w>(y+1)*x)y=C.b.bt(w,x)}z.c=y
this.d.$1(z)}},
f4:{"^":"ct;a,$ti"},
f5:{"^":"f9;dx,0dy,0fr,x,0a,0b,0c,d,e,0f,0r",
aq:function(){},
ar:function(){}},
cs:{"^":"c;K:c<,$ti",
ga_:function(){return this.c<4},
bP:function(){var z=this.r
if(z!=null)return z
z=new P.G(0,$.k,[null])
this.r=z
return z},
aY:function(a){var z,y
z=a.fr
y=a.dy
if(z==null)this.d=y
else z.dy=y
if(y==null)this.e=z
else y.fr=z
a.fr=a
a.dy=a},
c4:function(a,b,c,d){var z,y,x
if((this.c&4)!==0){if(c==null)c=P.cQ()
z=new P.fg($.k,0,c)
z.c0()
return z}z=$.k
y=new P.f5(0,this,z,d?1:0)
y.bu(a,b,c,d)
y.fr=y
y.dy=y
y.dx=this.c&1
x=this.e
this.e=y
y.dy=null
y.fr=x
if(x==null)this.d=y
else x.dy=y
if(this.d===y)P.cL(this.a)
return y},
bW:function(a){var z
if(a.dy===a)return
z=a.dx
if((z&2)!==0)a.dx=z|4
else{this.aY(a)
if((this.c&2)===0&&this.d==null)this.ag()}return},
ad:["bs",function(){if((this.c&4)!==0)return new P.aH("Cannot add new events after calling close")
return new P.aH("Cannot add new events while doing an addStream")}],
u:[function(a,b){if(!this.ga_())throw H.e(this.ad())
this.a2(b)},"$1","gc5",5,0,7],
b5:function(a){var z
if((this.c&4)!==0)return this.r
if(!this.ga_())throw H.e(this.ad())
this.c|=4
z=this.bP()
this.P()
return z},
aS:function(a){var z,y,x,w
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
if((z&4)!==0)this.aY(y)
y.dx&=4294967293
y=w}else y=y.dy}this.c&=4294967293
if(this.d==null)this.ag()},
ag:function(){if((this.c&4)!==0&&this.r.a===0)this.r.af(null)
P.cL(this.b)}},
fQ:{"^":"cs;a,b,c,0d,0e,0f,0r,$ti",
ga_:function(){return P.cs.prototype.ga_.call(this)&&(this.c&2)===0},
ad:function(){if((this.c&2)!==0)return new P.aH("Cannot fire new event. Controller is already firing an event")
return this.bs()},
a2:function(a){var z=this.d
if(z==null)return
if(z===this.e){this.c|=2
z.aH(a)
this.c&=4294967293
if(this.d==null)this.ag()
return}this.aS(new P.fR(a))},
P:function(){if(this.d!=null)this.aS(new P.fS())
else this.r.af(null)}},
fR:{"^":"f;a",
$1:function(a){a.aH(this.a)}},
fS:{"^":"f;",
$1:function(a){a.bE()}},
f8:{"^":"c;$ti"},
eZ:{"^":"f8;a,$ti"},
cw:{"^":"c;0a,b,c,d,e",
cm:function(a){if(this.c!==6)return!0
return this.b.b.aC(this.d,a.a)},
cj:function(a){var z,y
z=this.e
y=this.b.b
if(H.aI(z,{func:1,args:[P.c,P.V]}))return y.cr(z,a.a,a.b)
else return y.aC(z,a.a)}},
G:{"^":"c;K:a<,b,0c_:c<,$ti",
bj:function(a,b,c){var z,y
z=$.k
if(z!==C.c){z.toString
if(b!=null)b=P.ha(b,z)}y=new P.G(0,$.k,[c])
this.ae(new P.cw(y,b==null?1:3,a,b))
return y},
cv:function(a,b){return this.bj(a,null,b)},
bl:function(a){var z,y
z=$.k
y=new P.G(0,z,this.$ti)
if(z!==C.c)z.toString
this.ae(new P.cw(y,8,a,null))
return y},
c2:function(a){this.a=4
this.c=a},
ae:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.ae(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.W(null,null,z,new P.fl(this,a))}},
aX:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.aX(a)
return}this.a=u
this.c=y.c}z.a=this.a1(a)
y=this.b
y.toString
P.W(null,null,y,new P.fs(z,this))}},
a0:function(){var z=this.c
this.c=null
return this.a1(z)},
a1:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
N:function(a){var z,y
z=this.$ti
if(H.aa(a,"$isM",z,"$asM"))if(H.aa(a,"$isG",z,null))P.aY(a,this)
else P.cx(a,this)
else{y=this.a0()
this.a=4
this.c=a
P.a6(this,y)}},
H:[function(a,b){var z=this.a0()
this.a=8
this.c=new P.aN(a,b)
P.a6(this,z)},function(a){return this.H(a,null)},"cB","$2","$1","gaN",4,2,4],
af:function(a){var z
if(H.aa(a,"$isM",this.$ti,"$asM")){this.bB(a)
return}this.a=1
z=this.b
z.toString
P.W(null,null,z,new P.fn(this,a))},
bB:function(a){var z
if(H.aa(a,"$isG",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.W(null,null,z,new P.fr(this,a))}else P.aY(a,this)
return}P.cx(a,this)},
by:function(a,b){var z
this.a=1
z=this.b
z.toString
P.W(null,null,z,new P.fm(this,a,b))},
$isM:1,
n:{
cx:function(a,b){var z,y,x
b.a=1
try{a.bj(new P.fo(b),new P.fp(b),null)}catch(x){z=H.a_(x)
y=H.Y(x)
P.d5(new P.fq(b,z,y))}},
aY:function(a,b){var z,y
for(;z=a.a,z===2;)a=a.c
if(z>=4){y=b.a0()
b.a=a.a
b.c=a.c
P.a6(b,y)}else{y=b.c
b.a=2
b.c=a
a.aX(y)}},
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
P.at(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
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
P.at(null,null,y,v,u)
return}p=$.k
if(p==null?r!=null:p!==r)$.k=r
else p=null
y=b.c
if(y===8)new P.fv(z,x,b,w).$0()
else if(v){if((y&1)!==0)new P.fu(x,b,s).$0()}else if((y&2)!==0)new P.ft(z,x,b).$0()
if(p!=null)$.k=p
y=x.b
if(!!J.o(y).$isM){if(y.a>=4){o=u.c
u.c=null
b=u.a1(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.aY(y,u)
return}}n=b.b
o=n.c
n.c=null
b=n.a1(o)
y=x.a
v=x.b
if(!y){n.a=4
n.c=v}else{n.a=8
n.c=v}z.a=n
y=n}}}},
fl:{"^":"f;a,b",
$0:function(){P.a6(this.a,this.b)}},
fs:{"^":"f;a,b",
$0:function(){P.a6(this.b,this.a.a)}},
fo:{"^":"f:0;a",
$1:function(a){var z=this.a
z.a=0
z.N(a)}},
fp:{"^":"f:8;a",
$2:function(a,b){this.a.H(a,b)},
$1:function(a){return this.$2(a,null)}},
fq:{"^":"f;a,b,c",
$0:function(){this.a.H(this.b,this.c)}},
fn:{"^":"f;a,b",
$0:function(){var z,y
z=this.a
y=z.a0()
z.a=4
z.c=this.b
P.a6(z,y)}},
fr:{"^":"f;a,b",
$0:function(){P.aY(this.b,this.a)}},
fm:{"^":"f;a,b,c",
$0:function(){this.a.H(this.b,this.c)}},
fv:{"^":"f;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.bh(w.d)}catch(v){y=H.a_(v)
x=H.Y(v)
if(this.d){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.aN(y,x)
u.a=!0
return}if(!!J.o(z).$isM){if(z instanceof P.G&&z.gK()>=4){if(z.gK()===8){w=this.b
w.b=z.gc_()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.cv(new P.fw(t),null)
w.a=!1}}},
fw:{"^":"f:9;a",
$1:function(a){return this.a}},
fu:{"^":"f;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.aC(x.d,this.c)}catch(w){z=H.a_(w)
y=H.Y(w)
x=this.a
x.b=new P.aN(z,y)
x.a=!0}}},
ft:{"^":"f;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.cm(z)&&w.e!=null){v=this.b
v.b=w.cj(z)
v.a=!1}}catch(u){y=H.a_(u)
x=H.Y(u)
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
y=new P.G(0,$.k,[P.cS])
z.a=null
z.a=this.G(new P.eJ(z,this,b,y),!0,new P.eK(y),y.gaN())
return y},
gk:function(a){var z,y
z={}
y=new P.G(0,$.k,[P.I])
z.a=0
this.G(new P.eL(z,this),!0,new P.eM(z,y),y.gaN())
return y}},
eJ:{"^":"f;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.hd(new P.eH(a,this.c),new P.eI(z,y),P.h0(z.a,y))},
$S:function(){return{func:1,ret:P.C,args:[H.P(this.b,0)]}}},
eH:{"^":"f;a,b",
$0:function(){return J.l(this.a,this.b)}},
eI:{"^":"f;a,b",
$1:function(a){if(a)P.h3(this.a.a,this.b,!0)}},
eK:{"^":"f;a",
$0:function(){this.a.N(!1)}},
eL:{"^":"f;a,b",
$1:function(a){++this.a.a},
$S:function(){return{func:1,ret:P.C,args:[H.P(this.b,0)]}}},
eM:{"^":"f;a,b",
$0:function(){this.b.N(this.a.a)}},
ca:{"^":"c;"},
ct:{"^":"fN;",
gv:function(a){return(H.a5(this.a)^892482866)>>>0},
C:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.ct))return!1
return b.a===this.a}},
f9:{"^":"f6;",
aV:function(){return this.x.bW(this)},
aq:function(){},
ar:function(){}},
f6:{"^":"c;K:e<",
bu:function(a,b,c,d){var z,y
z=this.d
z.toString
this.a=a
y=b==null?P.hj():b
if(H.aI(y,{func:1,ret:-1,args:[P.c,P.V]}))this.b=z.bf(y)
else if(H.aI(y,{func:1,ret:-1,args:[P.c]}))this.b=y
else H.y(P.b6("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace."))
this.c=c==null?P.cQ():c},
S:function(){var z=this.e&=4294967279
if((z&8)===0)this.aK()
z=$.$get$aC()
return z},
aK:function(){var z,y
z=this.e|=8
if((z&64)!==0){y=this.r
if(y.a===1)y.a=3}if((z&32)===0)this.r=null
this.f=this.aV()},
aH:function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.a2(a)
else this.aJ(new P.fd(a))},
bE:function(){var z=this.e
if((z&8)!==0)return
z|=2
this.e=z
if(z<32)this.P()
else this.aJ(C.p)},
aq:function(){},
ar:function(){},
aV:function(){return},
aJ:function(a){var z,y
z=this.r
if(z==null){z=new P.fO(0)
this.r=z}z.u(0,a)
y=this.e
if((y&64)===0){y|=64
this.e=y
if(y<128)this.r.aG(this)}},
a2:function(a){var z=this.e
this.e=z|32
this.d.bi(this.a,a)
this.e&=4294967263
this.bD((z&4)!==0)},
P:function(){this.aK()
this.e|=16
new P.f7(this).$0()},
bD:function(a){var z,y,x
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
if(x)this.aq()
else this.ar()
z=this.e&=4294967263}if((z&64)!==0&&z<128)this.r.aG(this)}},
f7:{"^":"f;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=y|42
z.d.aB(z.c)
z.e&=4294967263}},
fN:{"^":"aV;",
G:function(a,b,c,d){return this.a.c4(a,d,c,!0===b)}},
ff:{"^":"c;0a8:a@"},
fd:{"^":"ff;b,0a",
bd:function(a){a.a2(this.b)}},
fe:{"^":"c;",
bd:function(a){a.P()},
ga8:function(){return},
sa8:function(a){throw H.e(P.aU("No events after a done."))}},
fH:{"^":"c;K:a<",
aG:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.d5(new P.fI(this,a))
this.a=1}},
fI:{"^":"f;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.ga8()
z.b=w
if(w==null)z.c=null
x.bd(this.b)}},
fO:{"^":"fH;0b,0c,a",
u:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sa8(b)
this.c=b}}},
fg:{"^":"c;a,K:b<,c",
c0:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.W(null,null,z,this.gc1())
this.b|=2},
S:function(){return $.$get$aC()},
P:[function(){var z=this.b&=4294967293
if(z>=4)return
this.b=z|1
this.a.aB(this.c)},"$0","gc1",0,0,1]},
h2:{"^":"f;a,b,c",
$0:function(){return this.a.H(this.b,this.c)}},
h1:{"^":"f:10;a,b",
$2:function(a,b){P.h_(this.a,this.b,a,b)}},
h4:{"^":"f;a,b",
$0:function(){return this.a.N(this.b)}},
cd:{"^":"c;"},
aN:{"^":"c;cf:a>,bp:b<",
j:function(a){return H.b(this.a)},
$isx:1},
fX:{"^":"c;"},
hb:{"^":"f;a,b",
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
fJ:{"^":"fX;",
aB:function(a){var z,y,x
try{if(C.c===$.k){a.$0()
return}P.cJ(null,null,this,a)}catch(x){z=H.a_(x)
y=H.Y(x)
P.at(null,null,this,z,y)}},
cu:function(a,b){var z,y,x
try{if(C.c===$.k){a.$1(b)
return}P.cK(null,null,this,a,b)}catch(x){z=H.a_(x)
y=H.Y(x)
P.at(null,null,this,z,y)}},
bi:function(a,b){return this.cu(a,b,null)},
c8:function(a){return new P.fL(this,a)},
c7:function(a){return this.c8(a,null)},
at:function(a){return new P.fK(this,a)},
b3:function(a,b){return new P.fM(this,a,b)},
h:function(a,b){return},
cq:function(a){if($.k===C.c)return a.$0()
return P.cJ(null,null,this,a)},
bh:function(a){return this.cq(a,null)},
ct:function(a,b){if($.k===C.c)return a.$1(b)
return P.cK(null,null,this,a,b)},
aC:function(a,b){return this.ct(a,b,null,null)},
cs:function(a,b,c){if($.k===C.c)return a.$2(b,c)
return P.hc(null,null,this,a,b,c)},
cr:function(a,b,c){return this.cs(a,b,c,null,null,null)},
co:function(a){return a},
bf:function(a){return this.co(a,null,null,null)}},
fL:{"^":"f;a,b",
$0:function(){return this.a.bh(this.b)}},
fK:{"^":"f;a,b",
$0:function(){return this.a.aB(this.b)}},
fM:{"^":"f;a,b,c",
$1:function(a){return this.a.bi(this.b,a)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
d:function(a,b,c){return H.cU(a,new H.aE(0,0,[b,c]))},
bY:function(a,b){return new H.aE(0,0,[a,b])},
a3:function(){return new H.aE(0,0,[null,null])},
dY:function(a){return H.cU(a,new H.aE(0,0,[null,null]))},
bZ:function(a,b,c,d){return new P.fB(0,0,[d])},
dM:function(a,b,c){var z,y
if(P.bv(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$au()
y.push(a)
try{P.h7(a,z)}finally{y.pop()}y=P.cb(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bf:function(a,b,c){var z,y,x
if(P.bv(a))return b+"..."+c
z=new P.bn(b)
y=$.$get$au()
y.push(a)
try{x=z
x.a=P.cb(x.gI(),a,", ")}finally{y.pop()}y=z
y.a=y.gI()+c
y=z.gI()
return y.charCodeAt(0)==0?y:y},
bv:function(a){var z,y
for(z=0;y=$.$get$au(),z<y.length;++z)if(a===y[z])return!0
return!1},
h7:function(a,b){var z,y,x,w,v,u,t,s,r,q
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
y=new P.bn("")
try{$.$get$au().push(a)
x=y
x.a=x.gI()+"{"
z.a=!0
a.a6(0,new P.e0(z,y))
z=y
z.a=z.gI()+"}"}finally{$.$get$au().pop()}z=y.gI()
return z.charCodeAt(0)==0?z:z},
fB:{"^":"fx;a,0b,0c,0d,0e,0f,r,$ti",
gA:function(a){var z=new P.cA(this,this.r)
z.c=this.e
return z},
gk:function(a){return this.a},
B:function(a,b){var z,y
if(b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else{y=this.bI(b)
return y}},
bI:function(a){var z=this.d
if(z==null)return!1
return this.aR(this.bS(z,a),a)>=0},
u:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cB()
this.b=z}return this.bH(z,b)}else{y=this.bG(b)
return y}},
bG:function(a){var z,y,x
z=this.d
if(z==null){z=P.cB()
this.d=z}y=this.aO(a)
x=z[y]
if(x==null)z[y]=[this.ai(a)]
else{if(this.aR(x,a)>=0)return!1
x.push(this.ai(a))}return!0},
bH:function(a,b){if(a[b]!=null)return!1
a[b]=this.ai(b)
return!0},
aM:function(){this.r=this.r+1&67108863},
ai:function(a){var z,y
z=new P.fC(a)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.aM()
return z},
aO:function(a){return J.a0(a)&0x3ffffff},
bS:function(a,b){return a[this.aO(b)]},
aR:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(a[y].a===b)return y
return-1},
n:{
cB:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
fC:{"^":"c;a,0b,0c"},
cA:{"^":"c;a,b,0c,0d",
gw:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.e(P.af(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}},
n:{
fD:function(a,b){var z=new P.cA(a,b)
z.c=a.e
return z}}},
fx:{"^":"c6;"},
dL:{"^":"aD;"},
dZ:{"^":"fE;",$isA:1},
T:{"^":"c;$ti",
gA:function(a){return new H.c_(a,this.gk(a),0)},
a5:function(a,b){return this.h(a,b)},
B:function(a,b){var z,y
z=this.gk(a)
for(y=0;y<z;++y){this.h(a,y)
if(z!==this.gk(a))throw H.e(P.af(a))}return!1},
u:function(a,b){var z=this.gk(a)
this.sk(a,z+1)
this.i(a,z,b)},
bF:function(a,b,c){var z,y,x
z=this.gk(a)
y=c-b
for(x=c;x<z;++x)this.i(a,x-y,this.h(a,x))
this.sk(a,z-y)},
W:function(a,b){H.c8(a,b)},
t:function(a,b){var z=H.Z([],[H.hv(this,a,"T",0)])
C.f.sk(z,C.b.t(this.gk(a),C.h.gk(b)))
C.f.V(z,0,this.gk(a),a)
C.f.V(z,this.gk(a),z.length,b)
return z},
aA:function(a,b,c){P.aS(b,c,this.gk(a),null,null,null)
if(c>b)this.bF(a,b,c)},
j:function(a){return P.bf(a,"[","]")}},
e_:{"^":"e1;"},
e0:{"^":"f:11;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
e1:{"^":"c;$ti",
a6:function(a,b){var z,y
for(z=J.bE(this.gay());z.p();){y=z.gw()
b.$2(y,this.h(0,y))}},
a4:function(a){return J.E(this.gay(),a)},
gk:function(a){return J.z(this.gay())},
j:function(a){return P.c0(this)},
$isa4:1},
c7:{"^":"c;$ti",
j:function(a){return P.bf(this,"{","}")},
ax:function(a,b){var z,y
z=this.gA(this)
if(!z.p())return""
if(b===""){y=""
do y+=H.b(z.d)
while(z.p())}else{y=H.b(z.d)
for(;z.p();)y=y+b+H.b(z.d)}return y.charCodeAt(0)==0?y:y},
$isc5:1},
c6:{"^":"c7;"},
fE:{"^":"c+T;"}}],["","",,P,{"^":"",
m:function(a,b,c){var z=H.ey(a,c)
if(z!=null)return z
throw H.e(P.bc(a,null,null))},
ac:function(a,b){var z=H.ex(a)
if(z!=null)return z
throw H.e(P.bc("Invalid double",a,null))},
dD:function(a){if(a instanceof H.f)return a.j(0)
return"Instance of '"+H.ao(a)+"'"},
aT:function(a,b,c){return new H.dT(a,H.bV(a,!1,b,!1))},
bb:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.az(a)
if(typeof a==="string")return JSON.stringify(a)
return P.dD(a)},
d3:function(a){H.hK(a)},
cS:{"^":"c;"},
"+bool":0,
ba:{"^":"c;a,b",
u:function(a,b){return P.dv(C.b.t(this.a,b.gcD()),this.b)},
C:function(a,b){if(b==null)return!1
if(!(b instanceof P.ba))return!1
return this.a===b.a&&this.b===b.b},
gv:function(a){var z=this.a
return(z^C.b.aZ(z,30))&1073741823},
j:function(a){var z,y,x,w,v,u,t
z=P.dw(H.ew(this))
y=P.aA(H.eu(this))
x=P.aA(H.eq(this))
w=P.aA(H.er(this))
v=P.aA(H.et(this))
u=P.aA(H.ev(this))
t=P.dx(H.es(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
n:{
dv:function(a,b){var z
if(Math.abs(a)<=864e13)z=!1
else z=!0
if(z)H.y(P.b6("DateTime is outside valid range: "+a))
return new P.ba(a,b)},
dw:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
dx:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
aA:function(a){if(a>=10)return""+a
return"0"+a}}},
b0:{"^":"v;"},
"+double":0,
S:{"^":"c;a",
t:function(a,b){return new P.S(C.b.t(this.a,b.gbO()))},
X:function(a,b){return new P.S(this.a-b.a)},
U:function(a,b){return new P.S(C.d.M(this.a*b))},
aa:function(a,b){return C.b.aa(this.a,b.gbO())},
aF:function(a,b){return this.a>b.a},
aE:function(a,b){return this.a>=b.a},
C:function(a,b){if(b==null)return!1
if(!(b instanceof P.S))return!1
return this.a===b.a},
gv:function(a){return this.a&0x1FFFFFFF},
j:function(a){var z,y,x,w,v
z=new P.dB()
y=this.a
if(y<0)return"-"+new P.S(0-y).j(0)
x=z.$1(C.b.E(y,6e7)%60)
w=z.$1(C.b.E(y,1e6)%60)
v=new P.dA().$1(y%1e6)
return""+C.b.E(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
n:{
dz:function(a,b,c,d,e,f){return new P.S(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
dA:{"^":"f;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
dB:{"^":"f;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
x:{"^":"c;"},
bk:{"^":"x;",
j:function(a){return"Throw of null."}},
a1:{"^":"x;a,b,c,d",
gam:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gal:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gam()+y+x
if(!this.a)return w
v=this.gal()
u=P.bb(this.b)
return w+v+": "+H.b(u)},
n:{
b6:function(a){return new P.a1(!1,null,null,a)},
b7:function(a,b,c){return new P.a1(!0,a,b,c)}}},
bl:{"^":"a1;e,f,a,b,c,d",
gam:function(){return"RangeError"},
gal:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
n:{
ez:function(a){return new P.bl(null,null,!1,null,null,a)},
aR:function(a,b,c){return new P.bl(null,null,!0,a,b,"Value not in range")},
ap:function(a,b,c,d,e){return new P.bl(b,c,!0,a,d,"Invalid value")},
aS:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.ap(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.e(P.ap(b,a,c,"end",f))
return b}return c}}},
dK:{"^":"a1;e,k:f>,a,b,c,d",
gam:function(){return"RangeError"},
gal:function(){if(J.b4(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
n:{
aQ:function(a,b,c,d,e){var z=e!=null?e:J.z(b)
return new P.dK(b,z,!0,a,c,"Index out of range")}}},
eT:{"^":"x;a",
j:function(a){return"Unsupported operation: "+this.a},
n:{
n:function(a){return new P.eT(a)}}},
eR:{"^":"x;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
n:{
bp:function(a){return new P.eR(a)}}},
aH:{"^":"x;a",
j:function(a){return"Bad state: "+this.a},
n:{
aU:function(a){return new P.aH(a)}}},
dq:{"^":"x;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.bb(z))+"."},
n:{
af:function(a){return new P.dq(a)}}},
e5:{"^":"c;",
j:function(a){return"Out of Memory"},
$isx:1},
c9:{"^":"c;",
j:function(a){return"Stack Overflow"},
$isx:1},
du:{"^":"x;a",
j:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
fk:{"^":"c;a",
j:function(a){return"Exception: "+this.a}},
dF:{"^":"c;a,b,c",
j:function(a){var z,y,x
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.b(z):"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.e.ac(x,0,75)+"..."
return y+"\n"+x},
n:{
bc:function(a,b,c){return new P.dF(a,b,c)}}},
I:{"^":"v;"},
"+int":0,
aD:{"^":"c;$ti",
B:function(a,b){var z
for(z=this.gA(this);z.p();)if(J.l(z.gw(),b))return!0
return!1},
gk:function(a){var z,y
z=this.gA(this)
for(y=0;z.p();)++y
return y},
j:function(a){return P.dM(this,"(",")")}},
dO:{"^":"c;"},
A:{"^":"c;$ti"},
"+List":0,
a4:{"^":"c;$ti"},
C:{"^":"c;",
gv:function(a){return P.c.prototype.gv.call(this,this)},
j:function(a){return"null"}},
"+Null":0,
v:{"^":"c;"},
"+num":0,
c:{"^":";",
C:function(a,b){return this===b},
gv:function(a){return H.a5(this)},
j:function(a){return"Instance of '"+H.ao(this)+"'"},
toString:function(){return this.j(this)}},
c2:{"^":"c;"},
c5:{"^":"bP;"},
V:{"^":"c;"},
p:{"^":"c;"},
"+String":0,
bn:{"^":"c;I:a<",
gk:function(a){return this.a.length},
j:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
n:{
cb:function(a,b,c){var z=J.bE(b)
if(!z.p())return a
if(c.length===0){do a+=H.b(z.gw())
while(z.p())}else{a+=H.b(z.gw())
for(;z.p();)a=a+c+H.b(z.gw())}return a}}}}],["","",,W,{"^":"",
d8:function(){return window},
di:function(a,b,c){var z={}
z.type=b
return new self.Blob(a,z)},
bQ:function(a,b,c){var z=document.createElement("img")
return z},
aZ:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
cz:function(a,b,c,d){var z,y
z=W.aZ(W.aZ(W.aZ(W.aZ(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
cF:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.fc(a)
if(!!J.o(z).$isag)return z
return}else return a},
h5:function(a){var z
if(!!J.o(a).$isbO)return a
z=new P.eW([],[],!1)
z.c=!0
return z.aD(a)},
cN:function(a,b){var z=$.k
if(z===C.c)return a
if(a==null)return
return z.b3(a,b)},
ai:{"^":"aB;","%":"HTMLAudioElement|HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
hS:{"^":"ai;",
j:function(a){return String(a)},
"%":"HTMLAnchorElement"},
hT:{"^":"ai;",
j:function(a){return String(a)},
"%":"HTMLAreaElement"},
hU:{"^":"F;0k:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
hV:{"^":"fa;0k:length=","%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
dt:{"^":"c;"},
bO:{"^":"F;",
gT:function(a){return new W.aX(a,"mousemove",!1,[W.an])},
$isbO:1,
"%":"Document|HTMLDocument|XMLDocument"},
hW:{"^":"u;",
j:function(a){return String(a)},
"%":"DOMException"},
dy:{"^":"u;",
j:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
C:function(a,b){if(b==null)return!1
if(!H.aa(b,"$isaF",[P.v],"$asaF"))return!1
return a.left===b.left&&a.top===b.top&&a.width===b.width&&a.height===b.height},
gv:function(a){return W.cz(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gl:function(a){return a.x},
gm:function(a){return a.y},
$isaF:1,
$asaF:function(){return[P.v]},
"%":";DOMRectReadOnly"},
hX:{"^":"u;0k:length=",
u:function(a,b){return a.add(b)},
B:function(a,b){return a.contains(b)},
"%":"DOMTokenList"},
cv:{"^":"dZ;a,$ti",
gk:function(a){return this.a.length},
h:function(a,b){return this.a[b]},
i:function(a,b,c){throw H.e(P.n("Cannot modify list"))},
sk:function(a,b){throw H.e(P.n("Cannot modify list"))},
W:function(a,b){throw H.e(P.n("Cannot sort list"))},
gT:function(a){return new W.bs(this,!1,"mousemove",[W.an])}},
aB:{"^":"F;",
gau:function(a){return new W.fh(a)},
j:function(a){return a.localName},
gT:function(a){return new W.cu(a,"mousemove",!1,[W.an])},
$isaB:1,
"%":";Element"},
aP:{"^":"u;",$isaP:1,"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
ag:{"^":"u;",
a3:function(a,b,c,d){if(c!=null)this.bx(a,b,c,d)},
R:function(a,b,c){return this.a3(a,b,c,null)},
bx:function(a,b,c,d){return a.addEventListener(b,H.O(c,1),d)},
bX:function(a,b,c,d){return a.removeEventListener(b,H.O(c,1),!1)},
$isag:1,
"%":";EventTarget"},
ii:{"^":"ai;0k:length=","%":"HTMLFormElement"},
ik:{"^":"fz;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aQ(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.e(P.n("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.e(P.n("Cannot resize immutable List."))},
a5:function(a,b){return a[b]},
$isa2:1,
$asa2:function(){return[W.F]},
$asT:function(){return[W.F]},
$isA:1,
$asA:function(){return[W.F]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
dH:{"^":"dI;",
cE:function(a,b,c,d,e,f){return a.open(b,c)},
cn:function(a,b,c){return a.open(b,c)},
"%":"XMLHttpRequest"},
dI:{"^":"ag;","%":";XMLHttpRequestEventTarget"},
dJ:{"^":"ai;","%":"HTMLImageElement"},
be:{"^":"ai;0ca:checked=,0bk:value=",$isbe:1,"%":"HTMLInputElement"},
bW:{"^":"cq;",$isbW:1,"%":"KeyboardEvent"},
an:{"^":"cq;",
gbc:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.U(a.offsetX,a.offsetY,[P.v])
else{z=a.target
if(!J.o(W.cF(z)).$isaB)throw H.e(P.n("offsetX is only supported on elements"))
y=W.cF(z)
z=a.clientX
x=a.clientY
w=[P.v]
v=y.getBoundingClientRect()
u=new P.U(z,x,w).X(0,new P.U(v.left,v.top,w))
return new P.U(J.bH(u.a),J.bH(u.b),w)}},
$isan:1,
"%":"DragEvent|MouseEvent|PointerEvent|WheelEvent"},
F:{"^":"ag;",
j:function(a){var z=a.nodeValue
return z==null?this.bq(a):z},
B:function(a,b){return a.contains(b)},
"%":"Attr|DocumentFragment|DocumentType|ShadowRoot;Node"},
iq:{"^":"fG;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aQ(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.e(P.n("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.e(P.n("Cannot resize immutable List."))},
a5:function(a,b){return a[b]},
$isa2:1,
$asa2:function(){return[W.F]},
$asT:function(){return[W.F]},
$isA:1,
$asA:function(){return[W.F]},
"%":"NodeList|RadioNodeList"},
bm:{"^":"ai;0k:length=,0bk:value=",$isbm:1,"%":"HTMLSelectElement"},
cq:{"^":"aP;","%":"CompositionEvent|FocusEvent|TextEvent|TouchEvent;UIEvent"},
eU:{"^":"ag;",
cF:[function(a,b){this.aQ(a)
return this.bZ(a,W.cN(b,P.v))},"$1","gcp",5,0,12],
cC:[function(a,b){this.aQ(a)
a.cancelAnimationFrame(b)},"$1","gc9",5,0,13],
bZ:function(a,b){return a.requestAnimationFrame(H.O(b,1))},
aQ:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gT:function(a){return new W.aX(a,"mousemove",!1,[W.an])},
"%":"DOMWindow|Window"},
iz:{"^":"dy;",
j:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
C:function(a,b){if(b==null)return!1
if(!H.aa(b,"$isaF",[P.v],"$asaF"))return!1
return a.left===b.left&&a.top===b.top&&a.width===b.width&&a.height===b.height},
gv:function(a){return W.cz(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gl:function(a){return a.x},
gm:function(a){return a.y},
"%":"ClientRect|DOMRect"},
iA:{"^":"fZ;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aQ(b,a,null,null,null))
return a[b]},
i:function(a,b,c){throw H.e(P.n("Cannot assign element of immutable List."))},
sk:function(a,b){throw H.e(P.n("Cannot resize immutable List."))},
a5:function(a,b){return a[b]},
$isa2:1,
$asa2:function(){return[W.F]},
$asT:function(){return[W.F]},
$isA:1,
$asA:function(){return[W.F]},
"%":"MozNamedAttrMap|NamedNodeMap"},
fh:{"^":"bL;a",
L:function(){var z,y,x,w,v
z=P.bZ(null,null,null,P.p)
for(y=this.a.className.split(" "),x=y.length,w=0;w<x;++w){v=J.b5(y[w])
if(v.length!==0)z.u(0,v)}return z},
bm:function(a){this.a.className=a.ax(0," ")},
gk:function(a){return this.a.classList.length},
b4:function(a){this.a.className=""},
B:function(a,b){var z=this.a.classList.contains(b)
return z},
u:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.add(b)
return!y}},
aX:{"^":"aV;a,b,c,$ti",
G:function(a,b,c,d){return W.bt(this.a,this.b,a,!1)},
a7:function(a){return this.G(a,null,null,null)}},
cu:{"^":"aX;a,b,c,$ti"},
bs:{"^":"aV;a,b,c,$ti",
G:function(a,b,c,d){var z,y,x,w
z=H.P(this,0)
y=this.$ti
x=new W.fP(new H.aE(0,0,[[P.aV,z],[P.ca,z]]),y)
x.a=new P.fQ(null,x.gcb(x),0,y)
for(z=this.a,z=new H.c_(z,z.gk(z),0),w=this.c;z.p();)x.u(0,new W.aX(z.d,w,!1,y))
z=x.a
z.toString
return new P.f4(z,[H.P(z,0)]).G(a,b,c,d)},
a7:function(a){return this.G(a,null,null,null)}},
fi:{"^":"ca;a,b,c,d,e",
S:function(){var z,y,x
z=this.b
if(z==null)return
y=this.d
x=y!=null
if(x)if(x)J.da(z,this.c,y,!1)
this.b=null
this.d=null
return},
n:{
bt:function(a,b,c,d){var z=W.cN(new W.fj(c),W.aP)
if(z!=null&&!0)J.db(a,b,z,!1)
return new W.fi(0,a,b,z,!1)}}},
fj:{"^":"f;a",
$1:function(a){return this.a.$1(a)}},
fP:{"^":"c;0a,b,$ti",
u:function(a,b){var z,y
z=this.b
if(z.a4(b))return
y=this.a
z.i(0,b,W.bt(b.a,b.b,y.gc5(y),!1))},
b5:[function(a){var z,y,x
for(z=this.b,y=z.gcA(z),x=y.a,y=new H.c1(x.gA(x),y.b);y.p();)y.a.S()
if(z.a>0){z.f=null
z.e=null
z.d=null
z.c=null
z.b=null
z.a=0
z.aU()}this.a.b5(0)},"$0","gcb",1,0,1]},
bd:{"^":"c;",
gA:function(a){return new W.dE(a,this.gk(a),-1)},
u:function(a,b){throw H.e(P.n("Cannot add to immutable List."))},
W:function(a,b){throw H.e(P.n("Cannot sort immutable List."))},
aA:function(a,b,c){throw H.e(P.n("Cannot removeRange on immutable List."))}},
dE:{"^":"c;a,b,c,0d",
p:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.a(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gw:function(){return this.d}},
fb:{"^":"c;a",
a3:function(a,b,c,d){return H.y(P.n("You can only attach EventListeners to your own window."))},
R:function(a,b,c){return this.a3(a,b,c,null)},
$isag:1,
n:{
fc:function(a){if(a===window)return a
else return new W.fb(a)}}},
fa:{"^":"u+dt;"},
fy:{"^":"u+T;"},
fz:{"^":"fy+bd;"},
fF:{"^":"u+T;"},
fG:{"^":"fF+bd;"},
fY:{"^":"u+T;"},
fZ:{"^":"fY+bd;"}}],["","",,P,{"^":"",
hk:function(a){var z,y
z=new P.G(0,$.k,[null])
y=new P.eZ(z,[null])
a.then(H.O(new P.hl(y),1))["catch"](H.O(new P.hm(y),1))
return z},
eV:{"^":"c;",
b9:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
aD:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
if(Math.abs(y)<=864e13)x=!1
else x=!0
if(x)H.y(P.b6("DateTime is outside valid range: "+y))
return new P.ba(y,!0)}if(a instanceof RegExp)throw H.e(P.bp("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.hk(a)
w=Object.getPrototypeOf(a)
if(w===Object.prototype||w===null){v=this.b9(a)
x=this.b
u=x[v]
z.a=u
if(u!=null)return u
u=P.a3()
z.a=u
x[v]=u
this.ci(a,new P.eX(z,this))
return z.a}if(a instanceof Array){t=a
v=this.b9(t)
x=this.b
u=x[v]
if(u!=null)return u
s=J.H(t)
r=s.gk(t)
u=this.c?new Array(r):t
x[v]=u
for(x=J.av(u),q=0;q<r;++q)x.i(u,q,this.aD(s.h(t,q)))
return u}return a}},
eX:{"^":"f:14;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.aD(b)
J.i(z,a,y)
return y}},
eW:{"^":"eV;a,b,c",
ci:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.d6)(z),++x){w=z[x]
b.$2(w,a[w])}}},
hl:{"^":"f:5;a",
$1:function(a){var z=this.a.a
if(z.a!==0)H.y(P.aU("Future already completed"))
z.af(a)
return}},
hm:{"^":"f:5;a",
$1:function(a){var z,y
z=a==null?new P.bk():a
y=this.a.a
if(y.a!==0)H.y(P.aU("Future already completed"))
$.k.toString
y.by(z,null)
return}},
bL:{"^":"c6;",
b1:function(a){var z=$.$get$bM().b
if(typeof a!=="string")H.y(H.K(a))
if(z.test(a))return a
throw H.e(P.b7(a,"value","Not a valid class token"))},
j:function(a){return this.L().ax(0," ")},
gA:function(a){var z=this.L()
return P.fD(z,z.r)},
gk:function(a){return this.L().a},
B:function(a,b){this.b1(b)
return this.L().B(0,b)},
u:function(a,b){this.b1(b)
return this.ba(new P.dr(b))},
b4:function(a){this.ba(new P.ds())},
ba:function(a){var z,y
z=this.L()
y=a.$1(z)
this.bm(z)
return y},
$asc7:function(){return[P.p]},
$asc5:function(){return[P.p]}},
dr:{"^":"f;a",
$1:function(a){return a.u(0,this.a)}},
ds:{"^":"f;",
$1:function(a){if(a.a>0){a.f=null
a.e=null
a.d=null
a.c=null
a.b=null
a.a=0
a.aM()}return}}}],["","",,P,{"^":""}],["","",,P,{"^":"",
cy:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fA:{"^":"c;",
bb:function(a){if(a<=0||a>4294967296)throw H.e(P.ez("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
q:function(){return Math.random()}},
U:{"^":"c;l:a>,m:b>,$ti",
j:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
C:function(a,b){var z,y,x
if(b==null)return!1
if(!H.aa(b,"$isU",[P.v],null))return!1
z=this.a
y=J.R(b)
x=y.gl(b)
if(z==null?x==null:z===x){z=this.b
y=y.gm(b)
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){var z,y,x
z=J.a0(this.a)
y=J.a0(this.b)
y=P.cy(P.cy(0,z),y)
x=536870911&y+((67108863&y)<<3)
x^=x>>>11
return 536870911&x+((16383&x)<<15)},
t:function(a,b){return new P.U(C.d.t(this.a,C.h.gl(b)),C.d.t(this.b,b.gm(b)),this.$ti)},
X:function(a,b){return new P.U(this.a-b.a,this.b-b.b,this.$ti)},
U:function(a,b){return new P.U(this.a*b,this.b*b,this.$ti)}}}],["","",,P,{"^":"",hY:{"^":"r;0l:x=,0m:y=","%":"SVGFEBlendElement"},hZ:{"^":"r;0l:x=,0m:y=","%":"SVGFEColorMatrixElement"},i_:{"^":"r;0l:x=,0m:y=","%":"SVGFEComponentTransferElement"},i0:{"^":"r;0l:x=,0m:y=","%":"SVGFECompositeElement"},i1:{"^":"r;0l:x=,0m:y=","%":"SVGFEConvolveMatrixElement"},i2:{"^":"r;0l:x=,0m:y=","%":"SVGFEDiffuseLightingElement"},i3:{"^":"r;0l:x=,0m:y=","%":"SVGFEDisplacementMapElement"},i4:{"^":"r;0l:x=,0m:y=","%":"SVGFEFloodElement"},i5:{"^":"r;0l:x=,0m:y=","%":"SVGFEGaussianBlurElement"},i6:{"^":"r;0l:x=,0m:y=","%":"SVGFEImageElement"},i7:{"^":"r;0l:x=,0m:y=","%":"SVGFEMergeElement"},i8:{"^":"r;0l:x=,0m:y=","%":"SVGFEMorphologyElement"},i9:{"^":"r;0l:x=,0m:y=","%":"SVGFEOffsetElement"},ia:{"^":"r;0l:x=,0m:y=","%":"SVGFEPointLightElement"},ib:{"^":"r;0l:x=,0m:y=","%":"SVGFESpecularLightingElement"},ic:{"^":"r;0l:x=,0m:y=","%":"SVGFESpotLightElement"},id:{"^":"r;0l:x=,0m:y=","%":"SVGFETileElement"},ie:{"^":"r;0l:x=,0m:y=","%":"SVGFETurbulenceElement"},ig:{"^":"r;0l:x=,0m:y=","%":"SVGFilterElement"},ih:{"^":"ah;0l:x=,0m:y=","%":"SVGForeignObjectElement"},dG:{"^":"ah;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},ah:{"^":"r;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},il:{"^":"ah;0l:x=,0m:y=","%":"SVGImageElement"},ip:{"^":"r;0l:x=,0m:y=","%":"SVGMaskElement"},ir:{"^":"r;0l:x=,0m:y=","%":"SVGPatternElement"},is:{"^":"dG;0l:x=,0m:y=","%":"SVGRectElement"},dh:{"^":"bL;a",
L:function(){var z,y,x,w,v,u
z=this.a.getAttribute("class")
y=P.bZ(null,null,null,P.p)
if(z==null)return y
for(x=z.split(" "),w=x.length,v=0;v<w;++v){u=J.b5(x[v])
if(u.length!==0)y.u(0,u)}return y},
bm:function(a){this.a.setAttribute("class",a.ax(0," "))}},r:{"^":"aB;",
gau:function(a){return new P.dh(a)},
gT:function(a){return new W.cu(a,"mousemove",!1,[W.an])},
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},it:{"^":"ah;0l:x=,0m:y=","%":"SVGSVGElement"},eN:{"^":"ah;","%":"SVGTextPathElement;SVGTextContentElement"},iu:{"^":"eN;0l:x=,0m:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},iv:{"^":"ah;0l:x=,0m:y=","%":"SVGUseElement"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,U,{"^":"",e6:{"^":"c;a,b,c,d,0e,0a9:f<,0r,0l:x>,0m:y>,0z,0Q,0ch,0cx,0cy,0db,0dx,0dy,0fr,0fx,0fy,go",
aL:function(a){var z,y,x,w,v,u,t
for(z=this.a,y=this.go,x=a!=null,w=0;w<J.z(J.a(z.x.h(0,"particles"),"array"));++w){v=J.a(J.a(z.x.h(0,"particles"),"array"),w)
u=this.x-v.x
t=this.y-v.y
if(Math.sqrt(u*u+t*t)<=this.f+v.f){this.x=x?a.h(0,"x"):y.q()*z.d
this.y=x?a.h(0,"y"):y.q()*z.e
this.bC()}}},
bC:function(){return this.aL(null)},
ak:function(a,b,c,d,e,f){var z,y,x,w
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
b7:function(a,b,c){var z,y,x,w,v,u
switch(a){case"circle":z=this.a.c
y=this.x
x=this.y
z.toString
z.arc(y,x,b,0,6.283185307179586,!1)
break
case"edge":case"square":z=b*2
this.a.c.rect(this.x-b,this.y-b,z,z)
break
case"triangle":this.ak(this.a.c,this.x-b,this.y+b/1.66,b*2,3,2)
break
case"polygon":z=this.a
this.ak(z.c,this.x-b/(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides")/3.5),this.y-b/0.76,b*2.66/(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides")/3),J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides"),1)
break
case"star":z=this.a
y=b*2
this.ak(z.c,this.x-y/(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides")/4),this.y-b/1.52,y*2.66/(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides")/3),J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"polygon"),"nb_sides"),2)
break
case"char":case"character":z=this.a
z.c.font=H.b(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"character"),"style"))+" "+H.b(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"character"),"weight"))+" "+J.bF(b)*2+"px "+H.b(J.a(J.a(J.a(z.x.h(0,"particles"),"shape"),"character"),"font"))
y=this.cy
x=this.x
w=this.y
v=b/2
if(c)z.c.strokeText(y,x-v,w+v)
else{z=z.c
z.toString
z.fillText(y,x-v,w+v)}break
case"image":z=this.a
u=J.l(J.a(z.x.h(0,"tmp"),"img_type"),"svg")?this.cx.h(0,"obj"):J.a(z.x.h(0,"tmp"),"img_obj")
if(u!=null)new U.e9(this,b).$1(u)
break}},
ce:function(a,b){return this.b7(a,b,!1)},
bL:function(){var z,y,x,w
z=J.a(this.a.x.h(0,"tmp"),"source_svg")
y=P.aT("#([0-9A-F]{3,6})",!1,!1)
z.toString
x=(self.URL||self.webkitURL).createObjectURL(W.di([H.hO(z,y,new U.e7(this),null)],"image/svg+xml;charset=utf-8",null))
w=W.bQ(null,null,null)
C.k.R(w,"load",new U.e8(this,w,x))
w.src=x},
n:{
c4:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q
z=P.p
y=P.bY(z,null)
x=new U.e6(c,y,d,b,C.a)
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
if(J.a(J.a(c.x.h(0,"particles"),"move"),"bounce"))x.aL(d)
if(!!J.o(a.h(0,"value")).$isA)y.i(0,"rgb",M.b1(J.a(a.h(0,"value"),C.d.F(C.a.q()*J.z(J.a(J.a(c.x.h(0,"particles"),"color"),"value"))))))
else if(!!J.o(a.h(0,"value")).$isa4){if(J.a(a.h(0,"value"),"r")!=null&&J.a(a.h(0,"value"),"g")!=null&&J.a(a.h(0,"value"),"b")!=null)y.i(0,"rgb",P.d(["r",J.a(a.h(0,"value"),"r"),"g",J.a(a.h(0,"value"),"g"),"b",J.a(a.h(0,"value"),"b")],z,null))
if(J.a(a.h(0,"value"),"h")!=null&&J.a(a.h(0,"value"),"s")!=null&&J.a(a.h(0,"value"),"l")!=null){w=[z]
y.i(0,"hsl",P.d([H.Z(["h"],w),J.a(a.h(0,"value"),"h"),H.Z(["s"],w),J.a(a.h(0,"value"),"s"),H.Z(["l"],w),J.a(a.h(0,"value"),"l")],[P.A,P.p],null))}}else if(J.l(a.h(0,"value"),"random"))y.i(0,"rgb",P.d(["r",C.d.F(C.a.q()*256),"g",C.d.F(C.a.q()*256),"b",C.d.F(C.a.q()*256)],z,P.I))
else{w=a.h(0,"value")
if(typeof w==="string"){y.i(0,"value",a.h(0,"value"))
y.i(0,"rgb",M.b1(a.h(0,"value")))}}y=J.a(J.a(c.x.h(0,"particles"),"opacity"),"random")?C.a.q():1
x.d=y*J.a(J.a(c.x.h(0,"particles"),"opacity"),"value")
if(J.a(J.a(J.a(c.x.h(0,"particles"),"opacity"),"anim"),"enable")){x.Q=!1
x.fy=J.a(J.a(J.a(c.x.h(0,"particles"),"opacity"),"anim"),"speed")/100
if(!J.a(J.a(J.a(c.x.h(0,"particles"),"opacity"),"anim"),"sync"))x.fy=x.fy*C.a.q()}y=P.v
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
x.dy=x.dy*C.a.q()}}else if(J.a(J.a(c.x.h(0,"particles"),"move"),"parallax")){x.dx=(J.D(s.h(0,"x"),C.a.bb(2))-0.5)*x.f
x.dy=(J.D(s.h(0,"y"),C.a.bb(2))-0.5)*x.f}else{x.dx=J.D(s.h(0,"x"),C.a.q())-0.5
x.dy=J.D(s.h(0,"y"),C.a.q())-0.5}x.fr=x.dx
x.fx=x.dy
r=J.a(J.a(c.x.h(0,"particles"),"shape"),"type")
if(typeof r==="string")x.ch=r
else{z=J.o(r)
if(!!z.$isA)x.ch=z.h(r,C.d.F(C.a.q()*z.gk(r)))}z=x.ch
if(z==="image"){q=J.a(c.x.h(0,"particles"),"shape")
z=P.dY(["src",J.a(q.h(0,"image"),"src"),"ratio",J.a(q.h(0,"image"),"width")/J.a(q.h(0,"image"),"height")])
x.cx=z
if(J.l(z.h(0,"ratio"),0))x.cx.i(0,"ratio",1)
if(J.l(J.a(J.a(c.x.h(0,"particles"),"tmp"),"img_type"),"svg")&&J.a(J.a(c.x.h(0,"particles"),"tmp"),"source_svg")!=null){x.bL()
if(J.a(J.a(c.x.h(0,"particles"),"tmp"),"pushing"))x.cx.i(0,"loaded",!1)}}else if(z==="char"||z==="character"){z=J.a(J.a(J.a(c.x.h(0,"particles"),"shape"),"character"),"value")
if(typeof z==="string")x.cy=J.a(J.a(J.a(c.x.h(0,"particles"),"shape"),"character"),"value")
else if(!!J.o(J.a(J.a(J.a(c.x.h(0,"particles"),"shape"),"character"),"value")).$isA)x.cy=J.a(J.a(J.a(J.a(c.x.h(0,"particles"),"shape"),"character"),"value"),C.d.F(C.a.q()*J.z(J.a(J.a(J.a(c.x.h(0,"particles"),"shape"),"character"),"value"))))}return x}}},e9:{"^":"f:0;a,b",
$1:function(a){var z,y,x
z=this.a
y=this.b
x=y*2
z.a.c.drawImage(a,z.x-y,z.y-y,x,x/z.cx.h(0,"ratio"))}},e7:{"^":"f;a",
$1:function(a){var z,y
z=this.a
y=z.b
return y.h(0,"rgb")?"rgba("+H.b(J.a(y.h(0,"rgb"),"r"))+","+H.b(J.a(y.h(0,"rgb"),"g"))+","+H.b(J.a(y.h(0,"rgb"),"b"))+","+H.b(z.d)+")":"hsla("+H.b(J.a(y.h(0,"hsl"),"h"))+","+H.b(J.a(y.h(0,"hsl"),"s"))+"%,"+H.b(J.a(y.h(0,"hsl"),"l"))+"%,"+H.b(z.d)+")"}},e8:{"^":"f;a,b,c",
$1:function(a){var z,y
z=this.a
z.cx.i(0,"obj",this.b)
z.cx.i(0,"loaded",!0);(self.URL||self.webkitURL).revokeObjectURL(this.c)
z=z.a.x.h(0,"tmp")
y=J.H(z)
y.i(z,"count_svg",J.D(y.h(z,"count_svg"),1))}}}],["","",,Y,{"^":"",ea:{"^":"c;a,0b,0c,0d,0e,0f,r,x,y,0z,Q",
bK:function(){var z,y,x,w,v,u
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
bA:function(){var z=this.b
z.width=this.d
z.height=this.e
z=J.a(J.a(this.x.h(0,"interactivity"),"events"),"resize")
if(z)C.j.R(window,"resize",new Y.ed(this))},
aW:function(){for(var z=0;z<J.a(J.a(this.x.h(0,"particles"),"number"),"value");++z)J.bB(J.a(this.x.h(0,"particles"),"array"),U.c4(J.a(this.x.h(0,"particles"),"color"),J.a(J.a(this.x.h(0,"particles"),"opacity"),"value"),this,null))
J.bG(J.a(this.x.h(0,"particles"),"array"),new Y.ek())},
bV:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
for(z=P.p,y=P.v,x=this.r,w=0;w<J.z(J.a(this.x.h(0,"particles"),"array"));++w){v=J.a(J.a(this.x.h(0,"particles"),"array"),w)
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
break}if(J.E(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"grab"))if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"enable")&&J.E(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"grab")&&J.l(J.a(this.x.h(0,"interactivity"),"status"),"mousemove")){o=v.x-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_x")
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
v.b7(j,J.D(J.a(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"outer_shape"),"size"),v.f),!0)
this.c.stroke()
this.c.closePath()}}}}if(J.E(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"bubble")||J.E(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"bubble"))this.bz(v)
if(J.E(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"repulse")||J.E(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"repulse"))this.bY(v)
if(J.a(J.a(this.x.h(0,"particles"),"line_linked"),"enable")||J.a(J.a(J.a(this.x.h(0,"particles"),"move"),"attract"),"enable"))for(h=w+1;h<J.z(J.a(this.x.h(0,"particles"),"array"));++h){g=J.a(J.a(this.x.h(0,"particles"),"array"),h)
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
J:function(){var z,y,x,w,v,u,t
this.c.clearRect(0,0,this.d,this.e)
this.bV()
for(z=0;z<J.z(J.a(this.x.h(0,"particles"),"array"));++z){y=J.a(J.a(this.x.h(0,"particles"),"array"),z)
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
y.ce(y.ch,x)
v.c.closePath()
if(J.w(J.a(J.a(J.a(v.x.h(0,"particles"),"shape"),"stroke"),"width"),0)){v.c.strokeStyle=J.a(J.a(J.a(v.x.h(0,"particles"),"shape"),"stroke"),"color")
v.c.lineWidth=J.a(J.a(J.a(v.x.h(0,"particles"),"shape"),"stroke"),"width")
v.c.stroke()}v.c.fill()}},
az:function(a,b){var z,y,x,w,v,u,t,s,r,q
J.i(J.a(this.x.h(0,"particles"),"tmp"),"pushing",!0)
for(z=a-1,y=P.p,x=P.v,w=this.r,v=b!=null,u=0;u<a;++u){t=J.a(this.x.h(0,"particles"),"array")
s=J.a(this.x.h(0,"particles"),"color")
r=J.a(J.a(this.x.h(0,"particles"),"opacity"),"value")
q=v?b.h(0,"pos_x"):w.q()*this.d
J.bB(t,U.c4(s,r,this,P.d(["x",q,"y",v?b.h(0,"pos_y"):w.q()*this.e],y,x)))
if(u===z){if(!J.a(J.a(this.x.h(0,"particles"),"move"),"enable"))this.J()
J.i(J.a(this.x.h(0,"particles"),"tmp"),"pushing",!1)}}J.bG(J.a(this.x.h(0,"particles"),"array"),new Y.en())},
be:function(a){return this.az(a,null)},
bg:function(a){J.de(J.a(this.x.h(0,"particles"),"array"),0,a)
if(!J.a(J.a(this.x.h(0,"particles"),"move"),"enable"))this.J()},
bz:function(a){var z,y,x,w,v,u,t,s,r,q,p
if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"enable")&&J.E(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"bubble")&&J.l(J.a(this.x.h(0,"interactivity"),"status"),"mousemove")){z=a.x-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_x")
y=a.y-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_y")
x=Math.sqrt(z*z+y*y)
w=1-x/J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"distance")
v=new Y.eb(a)
if(x<=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"distance")){if(w>=0&&J.l(J.a(this.x.h(0,"interactivity"),"status"),"mousemove")){if(!J.l(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"size"),J.a(J.a(this.x.h(0,"particles"),"size"),"value"))){u=J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"size"),J.a(J.a(this.x.h(0,"particles"),"size"),"value"))
t=a.f
s=this.x
if(u){r=t+J.q(J.a(J.a(J.a(s.h(0,"interactivity"),"modes"),"bubble"),"size"),w)
if(r>=0)a.r=r}else{u=J.a(J.a(J.a(s.h(0,"interactivity"),"modes"),"bubble"),"size")
r=a.f-(t-u)*w
if(r>0)a.r=r
else a.r=0}}if(!J.l(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity"),J.a(J.a(this.x.h(0,"particles"),"opacity"),"value"))){u=J.w(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity"),J.a(J.a(this.x.h(0,"particles"),"opacity"),"value"))
t=this.x
if(u){q=J.q(J.a(J.a(J.a(t.h(0,"interactivity"),"modes"),"bubble"),"opacity"),w)
if(q>a.d&&q<=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity"))a.e=q}else{q=a.d-J.q(J.Q(J.a(J.a(t.h(0,"particles"),"opacity"),"value"),J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity")),w)
if(q<a.d&&q>=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity"))a.e=q}}}}else v.$0()
if(J.l(J.a(this.x.h(0,"interactivity"),"status"),"mouseleave"))v.$0()}else if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"enable")&&J.E(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"bubble")){if(J.a(this.x.h(0,"tmp"),"bubble_clicking")){z=a.x-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"click_pos_x")
y=a.y-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"click_pos_y")
x=Math.sqrt(z*z+y*y)
p=(Date.now()-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"click_time"))/1000
if(p>J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"duration"))J.i(this.x.h(0,"tmp"),"bubble_duration_end",!0)
if(p>J.q(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"duration"),2)){J.i(this.x.h(0,"tmp"),"bubble_clicking",!1)
J.i(this.x.h(0,"tmp"),"bubble_duration_end",!1)}}else{x=null
p=null}v=new Y.ec(this,a)
if(J.a(this.x.h(0,"tmp"),"bubble_clicking")){v.$8(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"size"),J.a(J.a(this.x.h(0,"particles"),"size"),"value"),a.r,a.f,"size",x,p,null)
v.$8(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"opacity"),J.a(J.a(this.x.h(0,"particles"),"opacity"),"value"),a.e,a.d,"opacity",x,p,null)}}},
bY:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"enable")&&J.E(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"mode"),"repulse")&&J.l(J.a(this.x.h(0,"interactivity"),"status"),"mousemove")){z=a.x-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_x")
y=a.y-J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"pos_y")
x=Math.sqrt(z*z+y*y)
w=P.p
v=P.b0
u=P.d(["x",z/x,"y",y/x],w,v)
t=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"repulse"),"distance")
s=J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"repulse"),"strength")
r=Math.min(Math.max(1/t*(-1*Math.pow(x/t,2)+1)*t*s,0),50)
q=P.d(["x",a.x+J.q(u.h(0,"x"),r),"y",a.y+J.q(u.h(0,"y"),r)],w,v)
if(J.l(J.a(J.a(this.x.h(0,"particles"),"move"),"out_mode"),"bounce")){if(J.Q(q.h(0,"x"),a.f)>0&&J.b4(J.D(q.h(0,"x"),a.f),this.d))a.x=q.h(0,"x")
if(J.Q(q.h(0,"y"),a.f)>0&&J.b4(J.D(q.h(0,"y"),a.f),this.e))a.y=q.h(0,"y")}else{a.x=q.h(0,"x")
a.y=q.h(0,"y")}}else if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"enable")&&J.E(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"mode"),"repulse")){J.a(this.x.h(0,"tmp"),"repulse_finish")
w=J.a(this.x.h(0,"tmp"),"repulse_finish")
if(w){w=this.x.h(0,"tmp")
v=J.H(w)
v.i(w,"repulse_count",J.D(v.h(w,"repulse_count"),1))
if(J.l(J.a(this.x.h(0,"tmp"),"repulse_count"),J.z(J.a(this.x.h(0,"particles"),"array"))))J.i(this.x.h(0,"tmp"),"repulse_finish",!0)}if(J.a(this.x.h(0,"tmp"),"repulse_clicking")){t=Math.pow(J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"repulse"),"distance")/6,3)
p=J.Q(J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"click_pos_x"),a.x)
o=J.Q(J.a(J.a(this.x.h(0,"interactivity"),"mouse"),"click_pos_y"),a.y)
n=p*p+o*o
if(n<=t)new Y.el(this,o,p,a,-t/n).$0()}else if(J.l(J.a(this.x.h(0,"tmp"),"repulse_clicking"),!1)){a.dx=a.fr
a.dy=a.fx}}},
bQ:function(){var z,y
z=J.l(J.a(this.x.h(0,"interactivity"),"detect_on"),"window")
y=this.x
if(z)J.i(y.h(0,"interactivity"),"el",window)
else J.i(y.h(0,"interactivity"),"el",this.b)
if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onhover"),"enable")||J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"enable")){J.dd(J.a(this.x.h(0,"interactivity"),"el")).a7(new Y.ef(this))
J.bC(J.a(this.x.h(0,"interactivity"),"el"),"mouseleave",new Y.eg(this))}if(J.a(J.a(J.a(this.x.h(0,"interactivity"),"events"),"onclick"),"enable"))J.bC(J.a(this.x.h(0,"interactivity"),"el"),"click",new Y.eh(this))},
aj:function(){var z,y,x,w
if(J.a(J.a(J.a(this.x.h(0,"particles"),"number"),"density"),"enable")){z=this.b
y=z.width*z.height/1000
if(J.a(this.x.h(0,"tmp"),"retina"))y/=this.f*2
x=C.v.F(y*J.a(J.a(this.x.h(0,"particles"),"number"),"value")/J.a(J.a(J.a(this.x.h(0,"particles"),"number"),"density"),"value_area"))
w=J.z(J.a(this.x.h(0,"particles"),"array"))-x
if(w<0)this.be(Math.abs(w))
else this.bg(w)}},
bT:function(a){var z,y
J.i(this.x.h(0,"tmp"),"img_error",null)
if(!J.l(J.a(J.a(J.a(this.x.h(0,"particles"),"shape"),"image"),"src"),""))if(a==="svg"){z=new XMLHttpRequest()
C.t.cn(z,"GET",J.a(J.a(J.a(this.x.h(0,"particles"),"shape"),"image"),"src"))
W.bt(z,"readystatechange",new Y.ei(this,z),!1)
z.send()}else{y=W.bQ(null,null,null)
C.k.R(y,"load",new Y.ej(this,y))
y.src=J.a(J.a(J.a(this.x.h(0,"particles"),"shape"),"image"),"src")}else{P.d3("Error Particles - No image.src")
J.i(this.x.h(0,"tmp"),"img_error",!0)}},
bN:[function(a){if(J.l(J.a(J.a(this.x.h(0,"particles"),"shape"),"type"),"image")){if(J.l(J.a(this.x.h(0,"tmp"),"img_type"),"svg")){if(J.d9(J.a(this.x.h(0,"tmp"),"count_svg"),J.a(J.a(this.x.h(0,"particles"),"number"),"value"))){this.J()
if(!J.a(J.a(this.x.h(0,"particles"),"move"),"enable"))$.$get$a9().$1(this.z)
else this.z=$.$get$ad().$1(this.gO())}else if(!J.a(this.x.h(0,"tmp"),"img_error"))this.z=$.$get$ad().$1(this.gO())}else if(J.a(this.x.h(0,"tmp"),"img_obj")!=null){this.J()
if(!J.a(J.a(this.x.h(0,"particles"),"move"),"enable"))$.$get$a9().$1(this.z)
else this.z=$.$get$ad().$1(this.gO())}else if(!J.a(this.x.h(0,"tmp"),"img_error"))this.z=$.$get$ad().$1(this.gO())}else{this.J()
if(!J.a(J.a(this.x.h(0,"particles"),"move"),"enable"))$.$get$a9().$1(this.z)
else this.z=$.$get$ad().$1(this.gO())}this.Q.$0()},function(){return this.bN(null)},"aP","$1","$0","gO",0,2,15],
ah:function(){if(J.l(J.a(J.a(this.x.h(0,"particles"),"shape"),"type"),"image"))if(J.l(J.a(this.x.h(0,"tmp"),"img_type"),"svg")&&J.a(this.x.h(0,"tmp"),"source_svg")==null)J.i(this.x.h(0,"tmp"),"checkAnimFrame",$.$get$ad().$1(J.a(this.x.h(0,"tmp"),"checkAnimFrame")))
else{$.$get$a9().$1(J.a(this.x.h(0,"tmp"),"checkAnimFrame"))
if(!J.a(this.x.h(0,"tmp"),"img_error")){this.aT()
this.aP()}}else{this.aT()
this.aP()}},
aT:function(){var z,y,x
J.i(J.a(this.x.h(0,"particles"),"line_linked"),"color_rgb_line",M.b1(J.a(J.a(this.x.h(0,"particles"),"line_linked"),"color")))
J.i(this.x.h(0,"tmp"),"obj",P.d(["size_value",J.a(J.a(this.x.h(0,"particles"),"size"),"value"),"size_anim_speed",J.a(J.a(J.a(this.x.h(0,"particles"),"size"),"anim"),"speed"),"move_speed",J.a(J.a(this.x.h(0,"particles"),"move"),"speed"),"line_linked_distance",J.a(J.a(this.x.h(0,"particles"),"line_linked"),"distance"),"line_linked_width",J.a(J.a(this.x.h(0,"particles"),"line_linked"),"width"),"mode_grab_distance",J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"distance"),"mode_bubble_distance",J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"distance"),"mode_bubble_size",J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"size"),"mode_repulse_distance",J.a(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"repulse"),"distance")],P.p,null))
if(this.x.h(0,"retina_detect")&&window.devicePixelRatio>1){this.f=window.devicePixelRatio
J.i(this.x.h(0,"tmp"),"retina",!0)}else{this.f=1
J.i(this.x.h(0,"tmp"),"retina",!1)}z=this.b
y=C.d.M(z.offsetWidth)
x=this.f
this.d=y*x
this.e=C.d.M(z.offsetHeight)*x
J.i(J.a(this.x.h(0,"particles"),"size"),"value",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"size_value"),this.f))
J.i(J.a(J.a(this.x.h(0,"particles"),"size"),"anim"),"speed",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"size_anim_speed"),this.f))
J.i(J.a(this.x.h(0,"particles"),"move"),"speed",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"move_speed"),this.f))
J.i(J.a(this.x.h(0,"particles"),"line_linked"),"distance",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"line_linked_distance"),this.f))
J.i(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"grab"),"distance",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"mode_grab_distance"),this.f))
J.i(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"distance",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"mode_bubble_distance"),this.f))
J.i(J.a(this.x.h(0,"particles"),"line_linked"),"width",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"line_linked_width"),this.f))
J.i(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"bubble"),"size",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"mode_bubble_size"),this.f))
J.i(J.a(J.a(this.x.h(0,"interactivity"),"modes"),"repulse"),"distance",J.q(J.a(J.a(this.x.h(0,"tmp"),"obj"),"mode_repulse_distance"),this.f))
this.bA()
this.c.fillRect(0,0,this.d,this.e)
this.aW()
this.aj()},
b_:function(){if(J.E(J.a(J.a(this.x.h(0,"particles"),"shape"),"type"),"image")){J.i(this.x.h(0,"tmp"),"img_type",J.df(J.a(J.a(J.a(this.x.h(0,"particles"),"shape"),"image"),"src"),J.z(J.a(J.a(J.a(this.x.h(0,"particles"),"shape"),"image"),"src"))-3))
this.bT(J.a(this.x.h(0,"tmp"),"img_type"))}else this.ah()}},ed:{"^":"f;a",
$1:function(a){var z,y,x
z=this.a
y=z.b
z.d=C.d.M(y.offsetWidth)
z.e=C.d.M(y.offsetHeight)
if(z.x.h(0,"tmp").a4("retina")&&J.a(z.x.h(0,"tmp"),"retina")){y=z.d
x=z.f
z.d=y*x
z.e=z.e*x}y=z.b
y.width=z.d
y.height=z.e
if(!J.a(J.a(z.x.h(0,"particles"),"move"),"enable")){J.i(z.x.h(0,"particles"),"array",[])
z.aW()
z.J()
z.aj()}z.aj()}},ek:{"^":"f:6;",
$2:function(a,b){return J.bD(a.ga9(),b.ga9())}},en:{"^":"f:6;",
$2:function(a,b){return J.bD(a.ga9(),b.ga9())}},eb:{"^":"f;a",
$0:function(){var z=this.a
z.e=z.d
z.r=z.f}},ec:{"^":"f;a,b",
$8:function(a,b,c,d,e,f,g,h){var z
if(a!=b){z=this.a
if(!J.a(z.x.h(0,"tmp"),"bubble_duration_end"))if(f<=J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"bubble"),"distance")){if((c!=null?c:d)!=a){h=d-g*(d-a)/J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"bubble"),"duration")
if(e==="size")this.b.r=h
if(e==="opacity")this.b.e=h}}else{if(e==="size")this.b.r=null
if(e==="opacity")this.b.e=null}else if(c!=null){h=a+(a-(d-g*(d-a)/J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"bubble"),"duration")))
if(e==="size")this.b.r=h
if(e==="opacity")this.b.e=h}}}},el:{"^":"f;a,b,c,d,e",
$0:function(){var z,y,x,w
z=Math.atan2(this.b,this.c)
y=this.d
x=this.e
y.dx=x*Math.cos(z)
y.dy=x*Math.sin(z)
x=this.a
if(J.l(J.a(J.a(x.x.h(0,"particles"),"move"),"out_mode"),"bounce")){w=P.d(["x",y.x+y.dx,"y",y.y+y.dy],P.p,P.b0)
if(J.w(J.D(w.h(0,"x"),y.f),x.d))y.dx=-y.dx
else if(J.Q(w.h(0,"x"),y.f)<0)y.dx=-y.dx
if(J.w(J.D(w.h(0,"y"),y.f),x.e))y.dy=-y.dy
else if(J.Q(w.h(0,"y"),y.f)<0)y.dy=-y.dy}}},ef:{"^":"f;a",
$1:function(a){var z,y,x,w,v
a.clientY
z=this.a
if(J.l(J.a(z.x.h(0,"interactivity"),"detect_on"),"window")){y=a.clientX
x=a.clientY}else{w=J.R(a)
y=w.gbc(a).a
if(y==null)y=a.clientX
x=w.gbc(a).b
if(x==null)x=a.clientY}J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_x",y)
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_y",x)
if(J.a(z.x.h(0,"tmp"),"retina")){w=J.a(z.x.h(0,"interactivity"),"mouse")
v=J.H(w)
v.i(w,"pos_x",J.q(v.h(w,"pos_x"),z.f))
w=J.a(z.x.h(0,"interactivity"),"mouse")
v=J.H(w)
v.i(w,"pos_y",J.q(v.h(w,"pos_y"),z.f))}J.i(z.x.h(0,"interactivity"),"status","mousemove")}},eg:{"^":"f:0;a",
$1:function(a){var z=this.a
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_x",null)
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_y",null)
J.i(z.x.h(0,"interactivity"),"status","mouseleave")}},eh:{"^":"f:0;a",
$1:function(a){var z=this.a
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"click_pos_x",J.a(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_x"))
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"click_pos_y",J.a(J.a(z.x.h(0,"interactivity"),"mouse"),"pos_y"))
J.i(J.a(z.x.h(0,"interactivity"),"mouse"),"click_time",Date.now())
if(J.a(J.a(J.a(z.x.h(0,"interactivity"),"events"),"onclick"),"enable"))switch(J.a(J.a(J.a(z.x.h(0,"interactivity"),"events"),"onclick"),"mode")){case"push":if(J.a(J.a(z.x.h(0,"particles"),"move"),"enable"))z.az(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"push"),"particles_nb"),J.a(z.x.h(0,"interactivity"),"mouse"))
else if(J.l(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"push"),"particles_nb"),1))z.az(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"push"),"particles_nb"),J.a(z.x.h(0,"interactivity"),"mouse"))
else if(J.w(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"push"),"particles_nb"),1))z.be(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"push"),"particles_nb"))
break
case"remove":z.bg(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"remove"),"particles_nb"))
break
case"bubble":J.i(z.x.h(0,"tmp"),"bubble_clicking",!0)
break
case"repulse":J.i(z.x.h(0,"tmp"),"repulse_clicking",!0)
J.i(z.x.h(0,"tmp"),"repulse_count",0)
J.i(z.x.h(0,"tmp"),"repulse_finish",!1)
P.eO(P.dz(0,0,0,J.bF(J.q(J.a(J.a(J.a(z.x.h(0,"interactivity"),"modes"),"repulse"),"duration"),1000)),0,0),new Y.ee(z))
break}}},ee:{"^":"f;a",
$0:function(){J.i(this.a.x.h(0,"tmp"),"repulse_clicking",!1)}},ei:{"^":"f;a,b",
$1:function(a){var z,y
z=this.b
if(z.readyState===4){y=this.a
if(z.status===200){J.i(y.x.h(0,"tmp"),"source_svg",W.h5(z.response))
y.ah()}else{P.d3("Error Particles - Image not found")
J.i(y.x.h(0,"tmp"),"img_error",!0)}}}},ej:{"^":"f;a,b",
$1:function(a){var z=this.a
J.i(z.x.h(0,"tmp"),"img_obj",this.b)
z.ah()}},em:{"^":"f;",
$0:function(){}}}],["","",,M,{"^":"",
bx:function(a,b){var z=P.bY(P.p,null)
a.a6(0,new M.hq(b,a,z))
b.a6(0,new M.hr(a,z))
return z},
b1:function(a){var z,y,x
z=P.aT("^#?([a-f\\d])([a-f\\d])([a-f\\d])$",!1,!1)
a.length
a=H.hP(a,z,new M.hx(),0)
y=P.aT("^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$",!1,!1).cg(a)
if(y!=null){x=y.b
x=P.d(["r",P.m(x[1],null,16),"g",P.m(x[2],null,16),"b",P.m(x[3],null,16)],P.p,P.I)}else x=null
return x},
hq:{"^":"f;a,b,c",
$2:function(a,b){var z,y,x
z=this.a
if(z.h(0,a)!=null){y=this.b
x=this.c
if(!!J.o(y.h(0,a)).$isa4)x.i(0,a,M.bx(y.h(0,a),z.h(0,a)))
else x.i(0,a,z.h(0,a))}else this.c.i(0,a,b)}},
hr:{"^":"f;a,b",
$2:function(a,b){if(this.a.h(0,a)==null)this.b.i(0,a,b)}},
hx:{"^":"f;",
$1:function(a){var z,y
z=a.b
y=z[1]
return C.e.t(C.e.t(C.e.t(C.e.t(J.D(y,y),z[2]),z[2]),z[3]),z[3])}}}],["","",,F,{"^":"",
d1:function(){var z,y,x,w
z=P.p
y=P.c
x=P.I
w=P.v
z=new Y.ea("particles",C.a,P.d(["particles",P.d(["number",P.d(["value",100,"density",P.d(["enable",!0,"value_area",800],z,y)],z,y),"color",P.d(["value","#fff"],z,z),"shape",P.d(["type","circle","stroke",P.d(["width",0,"color","#ff0000"],z,y),"polygon",P.d(["nb_sides",5],z,x),"character",P.d(["value","P","font","arial","style","normal","weight","normal"],z,z),"image",P.d(["src","particle.png","width",100,"height",100],z,y)],z,y),"opacity",P.d(["value",1,"random",!1,"anim",P.d(["enable",!1,"speed",2,"opacity_min",0,"sync",!1],z,y)],z,y),"size",P.d(["value",10,"random",!1,"anim",P.d(["enable",!1,"speed",20,"size_min",0,"sync",!1],z,y)],z,y),"line_linked",P.d(["enable",!0,"distance",100,"color","#FFFFFF","opacity",1,"width",1],z,y),"move",P.d(["enable",!0,"speed",6,"direction","none","random",!1,"straight",!1,"out_mode","out","bounce",!1,"parallax",!1,"attract",P.d(["enable",!1,"rotateX",3000,"rotateY",3000],z,y)],z,y),"array",[],"tmp",P.a3()],z,y),"interactivity",P.d(["detect_on","canvas","events",P.d(["onhover",P.d(["enable",!0,"mode","grab"],z,y),"onclick",P.d(["enable",!0,"mode","push"],z,y),"resize",!0],z,y),"modes",P.d(["grab",P.d(["distance",100,"line_linked",P.d(["opacity",1],z,x),"outer_shape",P.d(["enable",!1,"type","inherit","size",20,"stroke",P.d(["width","inherit","color","inherit"],z,z)],z,y)],z,y),"bubble",P.d(["distance",100,"size",40,"duration",0.4,"opacity",8,"speed",3],z,w),"repulse",P.d(["distance",200,"strength",100,"duration",0.4],z,w),"push",P.d(["particles_nb",4],z,x),"remove",P.d(["particles_nb",2],z,x)],z,[P.a4,P.p,P.c]),"mouse",P.a3()],z,y),"retina_detect",!1,"fn",P.d(["interact",P.a3(),"modes",P.a3(),"vendors",P.a3()],z,[P.a4,,,]),"tmp",P.a3()],z,null),null,new Y.em())
z.bK()
y=z.y
if(y!=null)z.x=M.bx(z.x,y)
z.bQ()
z.b_()
$.aL=z
F.hn()
F.bA()
z=document
y=[W.aB]
new W.bs(new W.cv(z.querySelectorAll("input, select"),y),!1,"change",[W.aP]).a7(new F.hG())
new W.bs(new W.cv(z.querySelectorAll("input, select"),y),!1,"keyup",[W.bW]).a7(new F.hH())},
hn:function(){var z,y,x,w
z={}
y=document
x=y.getElementById("fps")
w=y.getElementById("total")
z.a=0
$.aL.Q=new F.ho(z)
P.eP(C.r,new F.hp(z,x,w))},
h:function(a){var z=document.getElementById(a)
if(!!J.o(z).$isbm)return z
else return H.d_(z,"$isbe")},
bA:function(){var z,y,x,w,v,u,t,s
z=$.aL
y=P.p
x=P.c
w=P.d(["value",P.m(J.j(F.h("particles-number-value")),null,null),"density",P.d(["enable",J.t(F.h("particles-number-density-enable")),"value_area",P.m(J.j(F.h("particles-number-density-value_area")),null,null)],y,null)],y,x)
v=document
u=[P.A,,]
t=P.I
s=P.v
z.y=P.d(["particles",P.d(["number",w,"color",P.d(["value",F.aK(v.getElementById("particles-color-value"))],y,u),"shape",P.d(["type",F.aK(v.getElementById("particles-shape-type")),"stroke",P.d(["width",P.m(J.j(F.h("particles-shape-stroke-width")),null,null),"color",J.j(F.h("particles-shape-stroke-color"))],y,null),"polygon",P.d(["nb_sides",P.m(J.j(F.h("particles-shape-polygon-nb_sides")),null,null)],y,t),"image",P.d(["src",J.j(F.h("particles-shape-image-src")),"width",P.m(J.j(F.h("particles-shape-image-width")),null,null),"height",P.m(J.j(F.h("particles-shape-image-height")),null,null)],y,null),"character",P.d(["value",F.aK(v.getElementById("particles-shape-character-value"))],y,u)],y,x),"opacity",P.d(["value",P.ac(J.j(F.h("particles-opacity-value")),null),"random",J.t(F.h("particles-opacity-random")),"anim",P.d(["enable",J.t(F.h("particles-opacity-anim-enable")),"speed",P.m(J.j(F.h("particles-opacity-anim-speed")),null,null),"opacity_min",P.ac(J.j(F.h("particles-opacity-anim-opacity_min")),null),"sync",J.t(F.h("particles-opacity-anim-sync"))],y,null)],y,null),"size",P.d(["value",P.m(J.j(F.h("particles-size-value")),null,null),"random",J.t(F.h("particles-size-random")),"anim",P.d(["enable",J.t(F.h("particles-size-anim-enable")),"speed",P.m(J.j(F.h("particles-size-anim-speed")),null,null),"size_min",P.m(J.j(F.h("particles-size-anim-size_min")),null,null),"sync",J.t(F.h("particles-size-anim-sync"))],y,null)],y,null),"line_linked",P.d(["enable",J.t(F.h("particles-line_linked-enable")),"distance",P.m(J.j(F.h("particles-line_linked-distance")),null,null),"color",J.j(F.h("particles-line_linked-color")),"opacity",P.ac(J.j(F.h("particles-line_linked-opacity")),null),"width",P.m(J.j(F.h("particles-line_linked-width")),null,null)],y,null),"move",P.d(["enable",J.t(F.h("particles-move-enable")),"speed",P.m(J.j(F.h("particles-move-speed")),null,null),"direction",J.j(F.h("particles-move-direction")),"random",J.t(F.h("particles-move-random")),"straight",J.t(F.h("particles-move-straight")),"out_mode",J.j(F.h("particles-move-out_mode")),"parallax",J.t(F.h("particles-move-parallax")),"bounce",J.t(F.h("particles-move-bounce")),"attract",P.d(["enable",J.t(F.h("particles-move-attract-enable")),"rotateX",P.m(J.j(F.h("particles-move-attract-rotateX")),null,null),"rotateY",P.m(J.j(F.h("particles-move-attract-rotateY")),null,null)],y,null)],y,null)],y,[P.a4,P.p,,]),"interactivity",P.d(["detect_on",J.j(F.h("interactivity-detect_on")),"events",P.d(["onhover",P.d(["enable",J.t(F.h("interactivity-events-onhover-enable")),"mode",F.aK(v.getElementById("interactivity-events-onhover-mode"))],y,null),"onclick",P.d(["enable",J.t(F.h("interactivity-events-onclick-enable")),"mode",F.aK(v.getElementById("interactivity-events-onclick-mode"))],y,null),"resize",J.t(F.h("interactivity-events-resize"))],y,null),"modes",P.d(["grab",P.d(["distance",P.m(J.j(F.h("interactivity-modes-grab-distance")),null,null),"line_linked",P.d(["opacity",P.ac(J.j(F.h("interactivity-modes-grab-line_linked-opacity")),null)],y,P.b0),"outer_shape",P.d(["enable",J.t(F.h("interactivity-modes-grab-outer_shape-enable")),"type",J.j(F.h("interactivity-modes-grab-outer_shape-type")),"size",P.m(J.j(F.h("interactivity-modes-grab-outer_shape-size")),null,null),"stroke",P.d(["width",P.m(J.j(F.h("interactivity-modes-grab-outer_shape-stroke-width")),null,null),"color",J.j(F.h("interactivity-modes-grab-outer_shape-stroke-color"))],y,null)],y,null)],y,x),"bubble",P.d(["distance",P.m(J.j(F.h("interactivity-modes-bubble-distance")),null,null),"size",P.m(J.j(F.h("interactivity-modes-bubble-size")),null,null),"duration",P.ac(J.j(F.h("interactivity-modes-bubble-duration")),null),"opacity",P.ac(J.j(F.h("interactivity-modes-bubble-opacity")),null),"speed",P.m(J.j(F.h("interactivity-modes-bubble-speed")),null,null)],y,s),"repulse",P.d(["distance",P.m(J.j(F.h("interactivity-modes-repulse-distance")),null,null),"strength",P.m(J.j(F.h("interactivity-modes-repulse-strength")),null,null),"duration",P.ac(J.j(F.h("interactivity-modes-repulse-duration")),null)],y,s),"push",P.d(["particles_nb",P.m(J.j(F.h("interactivity-modes-push-particles_nb")),null,null)],y,t),"remove",P.d(["particles_nb",P.m(J.j(F.h("interactivity-modes-remove-particles_nb")),null,null)],y,t)],y,[P.a4,P.p,P.c])],y,null),"retina_detect",J.t(F.h("retina_detect"))],y,null)
y=$.aL
y.toString
$.$get$a9().$1(J.a(y.x.h(0,"tmp"),"checkAnimFrame"))
$.$get$a9().$1(y.z)
J.i(y.x.h(0,"tmp"),"source_svg",null)
J.i(y.x.h(0,"tmp"),"img_obj",null)
J.i(y.x.h(0,"tmp"),"count_svg",0)
J.i(y.x.h(0,"particles"),"array",[])
y.c.clearRect(0,0,y.d,y.e)
y.x=M.bx(y.x,y.y)
y.b_()},
aK:function(a){var z,y,x,w
z=a.querySelectorAll("input, select")
y=[]
for(x=0;x<z.length;++x){w=z[x]
if(!!J.o(w).$isbm)y.push(w.value)
else y.push(H.d_(w,"$isbe").value)}return y},
hG:{"^":"f;",
$1:function(a){F.bA()}},
hH:{"^":"f;",
$1:function(a){F.bA()}},
ho:{"^":"f;a",
$0:function(){++this.a.a}},
hp:{"^":"f;a,b,c",
$1:function(a){var z,y,x
z=this.b
y=this.a
z.textContent=C.b.j(y.a)
this.c.textContent=J.az(J.z(J.a($.aL.x.h(0,"particles"),"array")))
x=J.R(z)
if(y.a<30)x.gau(z).u(0,"has-text-danger")
else x.gau(z).b4(0)
y.a=0}}},1]]
setupProgram(dart,0,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bS.prototype
return J.bR.prototype}if(typeof a=="string")return J.al.prototype
if(a==null)return J.bT.prototype
if(typeof a=="boolean")return J.dQ.prototype
if(a.constructor==Array)return J.aj.prototype
if(typeof a!="object"){if(typeof a=="function")return J.am.prototype
return a}if(a instanceof P.c)return a
return J.aJ(a)}
J.ht=function(a){if(typeof a=="number")return J.ak.prototype
if(typeof a=="string")return J.al.prototype
if(a==null)return a
if(a.constructor==Array)return J.aj.prototype
if(typeof a!="object"){if(typeof a=="function")return J.am.prototype
return a}if(a instanceof P.c)return a
return J.aJ(a)}
J.H=function(a){if(typeof a=="string")return J.al.prototype
if(a==null)return a
if(a.constructor==Array)return J.aj.prototype
if(typeof a!="object"){if(typeof a=="function")return J.am.prototype
return a}if(a instanceof P.c)return a
return J.aJ(a)}
J.av=function(a){if(a==null)return a
if(a.constructor==Array)return J.aj.prototype
if(typeof a!="object"){if(typeof a=="function")return J.am.prototype
return a}if(a instanceof P.c)return a
return J.aJ(a)}
J.aw=function(a){if(typeof a=="number")return J.ak.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aq.prototype
return a}
J.cW=function(a){if(typeof a=="number")return J.ak.prototype
if(typeof a=="string")return J.al.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aq.prototype
return a}
J.cX=function(a){if(typeof a=="string")return J.al.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aq.prototype
return a}
J.R=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.am.prototype
return a}if(a instanceof P.c)return a
return J.aJ(a)}
J.hu=function(a){if(a==null)return a
if(!(a instanceof P.c))return J.aq.prototype
return a}
J.D=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ht(a).t(a,b)}
J.l=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).C(a,b)}
J.d9=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>=b
return J.aw(a).aE(a,b)}
J.w=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aw(a).aF(a,b)}
J.b4=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aw(a).aa(a,b)}
J.q=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.cW(a).U(a,b)}
J.Q=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aw(a).X(a,b)}
J.a=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.d0(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.H(a).h(a,b)}
J.i=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.d0(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.av(a).i(a,b,c)}
J.da=function(a,b,c,d){return J.R(a).bX(a,b,c,d)}
J.bB=function(a,b){return J.av(a).u(a,b)}
J.bC=function(a,b,c){return J.R(a).R(a,b,c)}
J.db=function(a,b,c,d){return J.R(a).a3(a,b,c,d)}
J.bD=function(a,b){return J.cW(a).cc(a,b)}
J.E=function(a,b){return J.H(a).B(a,b)}
J.t=function(a){return J.R(a).gca(a)}
J.dc=function(a){return J.hu(a).gcf(a)}
J.a0=function(a){return J.o(a).gv(a)}
J.bE=function(a){return J.av(a).gA(a)}
J.z=function(a){return J.H(a).gk(a)}
J.dd=function(a){return J.R(a).gT(a)}
J.j=function(a){return J.R(a).gbk(a)}
J.de=function(a,b,c){return J.av(a).aA(a,b,c)}
J.bF=function(a){return J.aw(a).M(a)}
J.bG=function(a,b){return J.av(a).W(a,b)}
J.df=function(a,b){return J.cX(a).ab(a,b)}
J.bH=function(a){return J.aw(a).cw(a)}
J.az=function(a){return J.o(a).j(a)}
J.b5=function(a){return J.cX(a).cz(a)}
var $=I.p
C.t=W.dH.prototype
C.k=W.dJ.prototype
C.u=J.u.prototype
C.f=J.aj.prototype
C.v=J.bR.prototype
C.b=J.bS.prototype
C.h=J.bT.prototype
C.d=J.ak.prototype
C.e=J.al.prototype
C.C=J.am.prototype
C.n=J.eo.prototype
C.i=J.aq.prototype
C.j=W.eU.prototype
C.o=new P.e5()
C.p=new P.fe()
C.a=new P.fA()
C.c=new P.fJ()
C.q=new P.S(0)
C.r=new P.S(1e6)
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
$.L=0
$.ae=null
$.bI=null
$.cZ=null
$.cO=null
$.d4=null
$.b_=null
$.b2=null
$.by=null
$.a7=null
$.ar=null
$.as=null
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
I.$lazy(y,x,w)}})(["bN","$get$bN",function(){return H.cY("_$dart_dartClosure")},"bh","$get$bh",function(){return H.cY("_$dart_js")},"cf","$get$cf",function(){return H.N(H.aW({
toString:function(){return"$receiver$"}}))},"cg","$get$cg",function(){return H.N(H.aW({$method$:null,
toString:function(){return"$receiver$"}}))},"ch","$get$ch",function(){return H.N(H.aW(null))},"ci","$get$ci",function(){return H.N(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cm","$get$cm",function(){return H.N(H.aW(void 0))},"cn","$get$cn",function(){return H.N(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ck","$get$ck",function(){return H.N(H.cl(null))},"cj","$get$cj",function(){return H.N(function(){try{null.$method$}catch(z){return z.message}}())},"cp","$get$cp",function(){return H.N(H.cl(void 0))},"co","$get$co",function(){return H.N(function(){try{(void 0).$method$}catch(z){return z.message}}())},"br","$get$br",function(){return P.f_()},"aC","$get$aC",function(){var z=new P.G(0,C.c,[P.C])
z.c2(null)
return z},"au","$get$au",function(){return[]},"bM","$get$bM",function(){return P.aT("^\\S+$",!0,!1)},"ad","$get$ad",function(){return C.j.gcp(W.d8())},"a9","$get$a9",function(){return C.j.gc9(W.d8())}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:P.C,args:[,]},{func:1,ret:-1},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,args:[,]},{func:1,ret:-1,args:[P.c],opt:[P.V]},{func:1,ret:-1,args:[,]},{func:1,ret:P.I,args:[,,]},{func:1,ret:-1,args:[P.c]},{func:1,ret:P.C,args:[,],opt:[,]},{func:1,ret:[P.G,,],args:[,]},{func:1,ret:P.C,args:[,P.V]},{func:1,ret:P.C,args:[,,]},{func:1,ret:P.I,args:[{func:1,ret:-1,args:[P.v]}]},{func:1,ret:-1,args:[P.I]},{func:1,args:[,,]},{func:1,ret:-1,opt:[,]},{func:1,ret:P.p,args:[P.p]}]
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
if(x==y)H.hQ(d||a)
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
Isolate.cV=a.cV
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
if(typeof dartMainRunner==="function")dartMainRunner(F.d1,[])
else F.d1([])})})()
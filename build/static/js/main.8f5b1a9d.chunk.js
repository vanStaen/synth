(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],[,,,,,,,,,,,,,,,,,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),i=n.n(a),s=n(8),c=n.n(s),r=(n(17),n(3)),o=n(9),u=n(10),l=n(6),m={C:[16.35,32.7,65.41,130.81,261.63,523.25,1046.5,2093],Db:[17.32,34.65,69.3,138.59,277.18,554.37,1108.73,2217.46],D:[18.35,36.71,73.42,146.83,293.66,587.33,1174.66,2349.32],Eb:[19.45,38.89,77.78,155.56,311.13,622.25,1244.51,2489.02],E:[20.6,41.2,82.41,164.81,329.63,659.26,1318.51,2637.02],F:[21.83,43.65,87.31,174.61,349.23,698.46,1396.91,2793.83],Gb:[23.12,46.25,92.5,185,369.99,739.99,1479.98,2959.96],G:[24.5,49,98,196,392,783.99,1567.98,3135.96],Ab:[25.96,51.91,103.83,207.65,415.3,830.61,1661.22,3322.44],A:[27.5,55,110,220,440,880,1760,3520],Bb:[29.14,58.27,116.54,233.08,466.16,932.33,1864.66,3729.31],B:[30.87,61.74,123.47,246.94,493.88,987.77,1975.53,3951.07]};function d(e,t){return m[e][t-1]}var b=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];var j=function(e,t){var n=t.freq,a=t.name,i=t.audioContext,s=(t.primaryFilter,t.sineGain),c=t.squareGain,r=t.noiseGain,o=i.createGain();o.gain.setValueAtTime(0,0),o.connect(s);var u=i.createGain();u.gain.setValueAtTime(0,0),u.connect(c);var l=i.createGain();l.gain.setValueAtTime(0,0),l.connect(r);var m=i.createOscillator();m.frequency.setValueAtTime(n,0),m.type="sine",m.connect(o),m.start();var d=i.createOscillator();d.frequency.setValueAtTime(n,0),d.type="square",d.connect(u),d.start();for(var b=i.createBuffer(1,1*i.sampleRate,i.sampleRate),j=b.getChannelData(0),v=0;v<b.length;v++)j[v]=2*Math.random()-1;i.resume();var f=i.createBufferSource();f.buffer=b,f.connect(l),f.loop=!0,f.start(),e.addNote(n,a,o,m,u,d,l,f)},v=new(function(){function e(){Object(o.a)(this,e),this.notes=[],Object(l.b)(this,{notes:l.c,addNote:l.a})}return Object(u.a)(e,[{key:"createAllNotes",value:function(e){!function(e,t){var n=t.audioContext,a=t.primaryFilter,i=t.sineGain,s=t.squareGain,c=t.noiseGain;b.forEach((function(t){var r;for(r=1;r<9;r++)j(e,{freq:d(t,r),name:"".concat(t).concat(r),audioContext:n,primaryFilter:a,sineGain:i,squareGain:s,noiseGain:c})}))}(this,e)}},{key:"addNote",value:function(e,t,n,a,i,s,c,r){var o={freq:e,name:t,sineNoteGain:n,sineOsc:a,squareNoteGain:i,squareOsc:s,noiseNoteGain:c,noise:r};this.notes.push(o)}}]),e}()),f=n(43);var p=n.p+"static/media/knob.8deadf84.svg",O=(n(19),n(0)),h=function(e){var t=e.value,n=e.name,i=e.min,s=e.max,c=e.multiply,o=e.dispatch,u=e.title,l=e.unit,m=e.color,d=Object(a.useState)(!1),b=Object(r.a)(d,2),j=b[0],v=b[1],f=Object(a.useState)(t),h=Object(r.a)(f,2),x=h[0],V=h[1],y=Object(a.useState)(0),g=Object(r.a)(y,2),N=g[0],G=g[1],q=Object(a.useState)(!1),A=Object(r.a)(q,2),T=A[0],w=A[1];Object(a.useEffect)((function(){document.getElementById(u).setAttribute("draggable","false"),V(x*c);var e=function(e,t,n,a,i){return e*i/(n-t)+a}(x,i,s,-90,310);document.getElementById(u).style.setProperty("transform","rotate(".concat(e,"deg)"))}),[u,V,c,i,s]);var E=Object(a.useCallback)((function(e){window.addEventListener("mouseup",k),G(e.clientY),w(!0)}),[G,w]),k=Object(a.useCallback)((function(){window.removeEventListener("mouseup",k),G(0),w(!1)}),[G,w]),C=Object(a.useCallback)((function(){T||G(0)}),[T,G]),_=Object(a.useCallback)((function(e){if(0!==N&&T){var t=e.clientY,a=N-t+50;a>100&&(a=100),a<0&&(a=0);var r=3.1*a-90,l=(s-i)*(r- -90)/310;document.getElementById(u).style.setProperty("transform","rotate(".concat(r,"deg)")),o({type:n,value:l}),V(Math.round(l*c))}}),[N,T,i,s,c,u,o]);return Object(O.jsxs)("div",{className:"knob",onMouseEnter:function(){return v(!0)},onMouseLeave:function(){return v(!1)},children:[Object(O.jsx)("img",{src:p,id:u,className:"knob__image",onMouseDown:E,onMouseMove:_,onMouseLeave:C,style:m?{filter:"hue-rotate(180deg) sepia(20%)"}:{}}),j?Object(O.jsxs)("span",{className:"knob__value",children:[x,l]}):Object(O.jsx)("span",{className:"knob__name",children:u})]})},x=(n(21),function(e){var t=e.value,n=e.name,i=e.min,s=e.max,c=e.dispatch,r=e.title,o=Object(a.useCallback)((function(e){c({type:n,value:parseInt(e.target.value,10)}),console.log(e.target.value)}),[]);return Object(O.jsxs)("div",{className:"slider",children:[Object(O.jsx)("input",{className:"slider__input",type:"range",id:"".concat(n,"_slider"),name:n,min:i,max:s,step:"1",defaultValue:t,onChange:o}),Object(O.jsx)("label",{htmlFor:"slider",className:"slider__title",children:r})]})}),V=(n(22),function(){var e=Object(a.useState)(2),t=Object(r.a)(e,2);t[0],t[1];return Object(O.jsxs)("div",{className:"Preset",children:[Object(O.jsxs)("select",{name:"rpeset",id:"preset",className:"Preset__dropdown",children:[Object(O.jsx)("option",{value:"1",children:"First Preset"}),Object(O.jsx)("option",{value:"2",children:"Sinus Only"}),Object(O.jsx)("option",{value:"3",children:"Noise Only"}),Object(O.jsx)("option",{value:"4",children:"All-to-the-Max"})]}),Object(O.jsx)("label",{htmlFor:"htmlFor",className:"Preset__title",children:"Choose a preset"})]})}),y=(n(23),function(e){var t=e.dispatch,n=e.state;return Object(O.jsx)("div",{className:"ControlGrid__container",children:Object(O.jsxs)(f.a,{container:!0,spacing:2,children:[Object(O.jsx)(f.a,{item:!0,xs:12,children:Object(O.jsxs)("div",{className:"ControlGrid__gridItem",children:[Object(O.jsx)(h,{value:n.mainVolume,name:"mainVolume",dispatch:t,title:"vol",min:0,max:.1,multiply:1e3,unit:"%"}),Object(O.jsx)(h,{value:n.noiseVolume,name:"noiseVolume",dispatch:t,title:"noise",min:.01,max:1,multiply:100,unit:"%"}),Object(O.jsx)(h,{value:n.sineVolume,name:"sineVolume",dispatch:t,title:"sin",min:.01,max:1,multiply:100,unit:"%"}),Object(O.jsx)(h,{value:n.squareVolume,name:"squareVolume",dispatch:t,title:"square",min:.01,max:.8,multiply:100,unit:"%"}),Object(O.jsx)(h,{value:n.filterFreq,name:"filterFreq",dispatch:t,title:"filter",min:30,max:2e4,multiply:1,unit:"hz",color:!0})]})}),Object(O.jsx)(f.a,{item:!0,xs:12,children:Object(O.jsxs)("div",{className:"ControlGrid__gridItem",children:[Object(O.jsx)(h,{value:n.mainVolume,name:"mainVolume",dispatch:t,title:"Attack",min:0,max:.1,multiply:1e3,unit:"%"}),Object(O.jsx)(h,{value:n.noiseVolume,name:"noiseVolume",dispatch:t,title:"Decay",min:.01,max:1,multiply:100,unit:"%"}),Object(O.jsx)(h,{value:n.sineVolume,name:"sineVolume",dispatch:t,title:"Sustain",min:.01,max:1,multiply:100,unit:"%"}),Object(O.jsx)(h,{value:n.squareVolume,name:"squareVolume",dispatch:t,title:"Release",min:.01,max:.8,multiply:100,unit:"%"})]})}),Object(O.jsx)(f.a,{item:!0,xs:5,children:Object(O.jsx)(x,{value:n.octave,name:"octave",dispatch:t,title:"Octave Select",min:1,max:9})}),Object(O.jsx)(f.a,{item:!0,xs:5,children:Object(O.jsx)(V,{})})]})})}),g=(n(28),{a:"C",w:"Db",s:"D",e:"Eb",d:"E",f:"F",t:"Gb",g:"G",z:"Ab",h:"A",u:"Bb",j:"B"});function N(e,t){var n=document.getElementById(g[e]);g[e].includes("b")?null===n||void 0===n||n.classList.toggle("black__pressed",t):null===n||void 0===n||n.classList.toggle("white__pressed",t)}var G=[{note:"C",className:"white e"},{note:"Db",className:"black ds"},{note:"D",className:"white d"},{note:"Eb",className:"black cs"},{note:"E",className:"white c"},{note:"F",className:"white b"},{note:"Gb",className:"black as"},{note:"G",className:"white a"},{note:"Ab",className:"black gs"},{note:"A",className:"white g"},{note:"Bb",className:"black fs"},{note:"B",className:"white f"}],q=function(e){var t=e.playNoteHandler,n=e.stopNoteHandler,i=e.octave,s=Object(a.useState)(window.innerWidth),c=Object(r.a)(s,2),o=(c[0],c[1]),u=function(){o(window.innerWidth)};return Object(a.useEffect)((function(){return window.addEventListener("resize",u),function(){window.removeEventListener("resize",u)}}),[o]),function(e){var t=e.playNoteHandler,n=e.stopNoteHandler,i=e.octave;Object(a.useEffect)((function(){var e=function(e){var n=e.key.toLowerCase();n in g&&(N(n,!0),t(d(g[n],i)))},a=function(e){var t=e.key.toLowerCase();t in g&&(N(t,!1),n(d(g[t],i)))};return document.addEventListener("keydown",e),document.addEventListener("keyup",a),function(){document.removeEventListener("keydown",e),document.removeEventListener("keyup",a)}}))}(e),Object(O.jsx)("div",{children:Object(O.jsx)("ul",{className:"set",children:G.map((function(e){return Object(O.jsx)("li",{id:e.note,className:e.className,onMouseDown:function(){return t(d(e.note,i))},onMouseUp:function(){return n(d(e.note,i))},onMouseLeave:function(){return n(d(e.note,i))}},e.note)}))})})},A=n(2);function T(e,t){switch(t.type){case"octave":return Object(A.a)(Object(A.a)({},e),{},{octave:t.value});case"mainVolume":return Object(A.a)(Object(A.a)({},e),{},{mainVolume:t.value});case"noiseVolume":return Object(A.a)(Object(A.a)({},e),{},{noiseVolume:t.value});case"sineVolume":return Object(A.a)(Object(A.a)({},e),{},{sineVolume:t.value});case"mainVolume":return Object(A.a)(Object(A.a)({},e),{},{mainVolume:t.value});case"filterFreq":return Object(A.a)(Object(A.a)({},e),{},{filterFreq:t.value});default:throw new Error}}n(29);var w=function(){var e=Object(a.useReducer)(T,{octave:5,mainVolume:.05,noiseVolume:1,sineVolume:1,squareVolume:1,filterFreq:5e3}),t=Object(r.a)(e,2),n=t[0],i=t[1],s=Object(a.useMemo)((function(){var e=new AudioContext,t=e.createAnalyser(),a=e.createGain();a.gain.setValueAtTime(n.mainVolume,0),a.connect(e.destination);var i=e.createBiquadFilter();i.type="lowpass",i.frequency.value=n.filterFreq,i.connect(a);var s=e.createGain();s.gain.setValueAtTime(n.sineVolume,0),s.connect(i);var c=e.createGain();c.gain.setValueAtTime(n.squareVolume,0),c.connect(i);var r=e.createGain();return r.gain.setValueAtTime(n.noiseVolume,0),r.connect(i),v.createAllNotes({audioContext:e,primaryFilter:i,sineGain:s,squareGain:c,noiseGain:r}),{audioContext:e,visualizer:t,primaryFilter:i,primaryGainControl:a,sineGain:s,squareGain:c,noiseGain:r}}),[]),c=s.audioContext,o=s.primaryFilter,u=s.primaryGainControl,l=s.sineGain,m=s.squareGain,d=s.noiseGain;Object(a.useEffect)((function(){o.frequency.value=Math.round(n.filterFreq)}),[n.filterFreq]),Object(a.useEffect)((function(){u.gain.setValueAtTime(n.mainVolume,c.currentTime)}),[n.mainVolume]),Object(a.useEffect)((function(){l.gain.setValueAtTime(n.sineVolume,c.currentTime),m.gain.setValueAtTime(n.squareVolume,c.currentTime),d.gain.setValueAtTime(n.noiseVolume,c.currentTime)}),[n.sineVolume,n.squareVolume,n.noiseVolume]);var b=Object(a.useCallback)((function(e){c.resume();var t=v.notes.find((function(t){return t.freq==e}));t&&(t.sineNoteGain.gain.setValueAtTime(n.sineVolume,c.currentTime),t.squareNoteGain.gain.setValueAtTime(n.squareVolume,c.currentTime),t.noiseNoteGain.gain.setValueAtTime(n.noiseVolume,c.currentTime))}),[v.notes,c]),j=Object(a.useCallback)((function(e){var t=v.notes.find((function(t){return t.freq==e}));if(t){var n=t.sineNoteGain;n.gain.setValueAtTime(n.gain.value,c.currentTime),n.gain.exponentialRampToValueAtTime(1e-6,c.currentTime+.03);var a=t.squareNoteGain;a.gain.setValueAtTime(a.gain.value,c.currentTime),a.gain.exponentialRampToValueAtTime(1e-6,c.currentTime+.03);var i=t.noiseNoteGain;i.gain.setValueAtTime(i.gain.value,c.currentTime),i.gain.exponentialRampToValueAtTime(1e-6,c.currentTime+.03)}}),[v.notes,c]);return Object(O.jsx)("div",{className:"App",children:Object(O.jsxs)("header",{className:"App-header",children:[Object(O.jsx)("div",{id:"oscilloscope"}),Object(O.jsx)(y,{dispatch:i,state:n}),Object(O.jsx)(q,{playNoteHandler:b,stopNoteHandler:j,octave:n.octave})]})})};c.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(w,{})}),document.getElementById("root"))}],[[30,1,2]]]);
//# sourceMappingURL=main.8f5b1a9d.chunk.js.map
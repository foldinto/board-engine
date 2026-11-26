/* Fixed desk geometry. Positions are persisted; rendering never rearranges notes. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.LaterBoard=api;})(typeof window==='undefined'?globalThis:window,()=>{
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  function geometry(width,mobile){const gap=mobile?9:24,columns=mobile?2:4;return {width,gap,height:mobile?720:740,w:(width-36-gap*(columns-1))/columns,h:mobile?316:326,pad:18};}
  function bounds(g){return {x:Math.max(g.pad,g.width-g.w-g.pad),y:g.height-g.h-g.pad};}
  function point(p,g){const b=bounds(g);return {x:clamp((p.u??.5)*b.x,g.pad,b.x),y:g.preserveY?Math.max(g.pad,p.y??24):clamp(p.y??24,g.pad,b.y)};}
  function constrain(p,g){const b=bounds(g);return {x:clamp(p.x,g.pad,b.x),y:clamp(p.y,g.pad,b.y)}}
  function dragPoint(start,pointer,frame,g){return constrain({x:start.x+pointer.x-start.pointerX+start.boardX-frame.x+frame.scrollX-start.scrollX,y:start.y+pointer.y-start.pointerY+start.boardY-frame.y+frame.scrollY-start.scrollY},g)}
  function normalized(p,g){const b=bounds(g);return {u:clamp(p.x,g.pad,b.x)/b.x,y:g.preserveY?Math.max(g.pad,p.y):clamp(p.y,g.pad,b.y)};}
  function overlap(a,b,g,aHeight=g.h,bHeight=g.h){return Math.max(0,Math.min(a.x+g.w,b.x+g.w)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.y+aHeight,b.y+bHeight)-Math.max(a.y,b.y))/(g.w*aHeight);}
  function center(g){return {x:(g.width-g.w)/2,y:24};}
  function add(positions,id,g,visit){const target=center(g);for(const [other,p] of Object.entries(positions)){if(other!==id&&p.nudgedVisit!==visit&&overlap(point(p,g),target,g,g.heights?.[other]||g.h,g.heights?.[id]||g.h)>.2){p.y=g.preserveY?Math.max(g.pad,p.y+16):clamp(p.y+16,g.pad,bounds(g).y);p.nudgedVisit=visit;}}
    positions[id]={...normalized(target,g),z:Math.max(0,...Object.values(positions).map(p=>p.z||0))+1,nudgedVisit:visit};return positions[id];}
  function move(positions,id,p,g){const old=positions[id]||{};positions[id]={...old,...normalized(constrain(p,g),g),z:Math.max(0,...Object.values(positions).map(p=>p.z||0))+1};return positions[id];}
  function groups(ids,positions,g){const result=[];const sorted=[...ids].sort((a,b)=>(positions[b]?.z||0)-(positions[a]?.z||0));for(const id of sorted){const p=point(positions[id]||{},g);let parent=null,best=.65;for(const group of result){const score=overlap(p,group.point,g,g.heights?.[id]||g.h,g.heights?.[group.id]||g.h);if(score>best){parent=group;best=score}}if(parent)parent.ids.push(id);else result.push({id,point:p,ids:[id]});}return result;}
  // A temporary reading layout; it never receives or mutates saved desk positions.
  function compact(ids,g){const gap=g.gap??(g.w<200?9:24),columns=Math.max(1,Math.floor((g.width-2*g.pad+gap+.01)/(g.w+gap))),points={};let y=24;for(let i=0;i<ids.length;i+=columns){const row=ids.slice(i,i+columns);row.forEach((id,column)=>{points[id]={x:g.pad+column*(g.w+gap),y}});y+=Math.max(...row.map(id=>g.heights?.[id]||g.h))+24}return {points,columns,height:ids.length?y:0};}
  /* Tidy layout (2026-11-10 Claude): ids arrive newest first; each card drops into the currently shortest
     column (leftmost on a tie), so mixed card heights never leave holes and reading order stays left-to-right. */
  function masonry(ids,g,start){const gap=g.gap??(g.w<200?9:24),columns=Math.max(1,Math.floor((g.width-2*g.pad+gap+.01)/(g.w+gap))),tops=Array.from({length:columns},(_,c)=>Math.max(24,start?.[c]||0)),points={};for(const id of ids){let column=0;for(let c=1;c<columns;c++)if(tops[c]<tops[column]-.5)column=c;points[id]={x:g.pad+column*(g.w+gap),y:tops[column]};tops[column]+=(g.heights?.[id]||g.h)+24}return {points,columns,height:ids.length?Math.max(...tops):0};}
  function drift(positions,g){for(const p of Object.values(positions))p.y=g.preserveY?Math.max(g.pad,p.y+12):clamp(p.y+12,g.pad,bounds(g).y);}
  function shouldDrift(state,now){return !!state.lastSeen&&now-state.lastSeen>=6*3600000&&(!state.lastDrift||now-state.lastDrift>=24*3600000);}
  return {geometry,bounds,point,constrain,dragPoint,normalized,overlap,center,add,move,groups,compact,masonry,drift,shouldDrift};
});

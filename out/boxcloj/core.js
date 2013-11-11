// Compiled by ClojureScript 0.0-2014
goog.provide('boxcloj.core');
goog.require('cljs.core');
goog.require('boxcloj.maths');
goog.require('boxcloj.maths');
goog.require('clojure.string');
goog.require('clojure.string');
boxcloj.core.log = (function log(message){return console.log(message);
});
boxcloj.core.b2vec = (function b2vec(x,y){var vec = Box2D.Common.Math.b2Vec2;return (new vec(x,y));
});
boxcloj.core.rand_color = (function rand_color(){return [cljs.core.str("rgb("),cljs.core.str(clojure.string.join.call(null,",",cljs.core.take.call(null,3,cljs.core.repeatedly.call(null,(function (){return cljs.core.rand_int.call(null,255);
})))))].join('');
});
boxcloj.core.getAnimFrameType = (function getAnimFrameType(){var or__3128__auto__ = window.requestAnimationFrame;if(cljs.core.truth_(or__3128__auto__))
{return or__3128__auto__;
} else
{var or__3128__auto____$1 = window.webkitRequestAnimationFrame;if(cljs.core.truth_(or__3128__auto____$1))
{return or__3128__auto____$1;
} else
{var or__3128__auto____$2 = window.mozAnimationFrame;if(cljs.core.truth_(or__3128__auto____$2))
{return or__3128__auto____$2;
} else
{var or__3128__auto____$3 = window.oAnimationFrame;if(cljs.core.truth_(or__3128__auto____$3))
{return or__3128__auto____$3;
} else
{return window.msAnimationFrame;
}
}
}
}
});
boxcloj.core.setAnimFrame = (function setAnimFrame(){return window.requestAnimFrame = boxcloj.core.getAnimFrameType.call(null);
});
boxcloj.core.setAnimFrame.call(null);
boxcloj.core.canvas = document.getElementById("c");
boxcloj.core.ctx = boxcloj.core.canvas.getContext("2d");
boxcloj.core.SCALE = 30;
boxcloj.core.GRAVITY = 0.1;
boxcloj.core.NUM_CIRCLES = 10;
boxcloj.core.MAX_SIZE = 5;
boxcloj.core.MAX_INIT_VEL = 3;
boxcloj.core.RESTITUTION = 0.8;
boxcloj.core.FRICTION = 0.5;
boxcloj.core.pair_list = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
boxcloj.core.selected_circles = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
boxcloj.core.scale = (function scale(canvas,dim){boxcloj.core.height = (function height(){return (canvas.height / boxcloj.core.SCALE);
});
boxcloj.core.width = (function width(){return (canvas.width / boxcloj.core.SCALE);
});
if(cljs.core._EQ_.call(null,dim,new cljs.core.Keyword(null,"height","height",4087841945)))
{return boxcloj.core.height.call(null);
} else
{if(cljs.core._EQ_.call(null,dim,new cljs.core.Keyword(null,"width","width",1127031096)))
{return boxcloj.core.width.call(null);
} else
{return null;
}
}
});
boxcloj.core.centered_rand_int = (function centered_rand_int(n){return (cljs.core.rand_int.call(null,n) - (n / 2));
});
boxcloj.core.paired_QMARK_ = (function paired_QMARK_(node){return cljs.core.some.call(null,(function (p1__15620_SHARP_){return cljs.core.contains_QMARK_.call(null,p1__15620_SHARP_,node);
}),cljs.core.deref.call(null,boxcloj.core.pair_list));
});
boxcloj.core.draw_all_BANG_ = (function draw_all_BANG_(nodes){var node = cljs.core.first.call(null,nodes);var nodes__$1 = cljs.core.rest.call(null,nodes);while(true){
if(cljs.core.truth_(node))
{if(cljs.core.truth_(boxcloj.core.paired_QMARK_.call(null,node)))
{boxcloj.core.color = "#995522";
} else
{boxcloj.core.color = "black";
}
boxcloj.core.draw_BANG_.call(null,boxcloj.core.color,boxcloj.core.get_draw_args.call(null,node));
{
var G__15621 = cljs.core.first.call(null,nodes__$1);
var G__15622 = cljs.core.rest.call(null,nodes__$1);
node = G__15621;
nodes__$1 = G__15622;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.draw_BANG_ = (function draw_BANG_(color,p__15623){var vec__15625 = p__15623;var x = cljs.core.nth.call(null,vec__15625,0,null);var y = cljs.core.nth.call(null,vec__15625,1,null);var r = cljs.core.nth.call(null,vec__15625,2,null);boxcloj.core.ctx.fillStyle = color;
boxcloj.core.ctx.lineWidth = 1;
boxcloj.core.ctx.strokeStyle = "#335588";
boxcloj.core.ctx.beginPath();
boxcloj.core.ctx.arc(x,y,r,0,(2 * Math.PI),false);
boxcloj.core.ctx.fill();
return boxcloj.core.ctx.stroke();
});
boxcloj.core.draw_from_to_BANG_ = (function draw_from_to_BANG_(x1,y1,x2,y2){boxcloj.core.ctx.lineWidth = 0.5;
boxcloj.core.ctx.strokeStyle = "aaa";
boxcloj.core.ctx.beginPath();
boxcloj.core.ctx.moveTo(x1,y1);
boxcloj.core.ctx.lineTo(x2,y2);
return boxcloj.core.ctx.stroke();
});
boxcloj.core.draw_connection_BANG_ = (function draw_connection_BANG_(pair){var vec__15629 = cljs.core.map.call(null,boxcloj.core.get_draw_args,pair);var vec__15630 = cljs.core.nth.call(null,vec__15629,0,null);var x1 = cljs.core.nth.call(null,vec__15630,0,null);var y1 = cljs.core.nth.call(null,vec__15630,1,null);var r1 = cljs.core.nth.call(null,vec__15630,2,null);var vec__15631 = cljs.core.nth.call(null,vec__15629,1,null);var x2 = cljs.core.nth.call(null,vec__15631,0,null);var y2 = cljs.core.nth.call(null,vec__15631,1,null);var r2 = cljs.core.nth.call(null,vec__15631,2,null);return boxcloj.core.draw_from_to_BANG_.call(null,x1,y1,x2,y2);
});
boxcloj.core.process_pairs_BANG_ = (function process_pairs_BANG_(pairs){var seq__15636 = cljs.core.seq.call(null,pairs);var chunk__15637 = null;var count__15638 = 0;var i__15639 = 0;while(true){
if((i__15639 < count__15638))
{var pair = cljs.core._nth.call(null,chunk__15637,i__15639);boxcloj.core.update_force_BANG_.call(null,pair);
boxcloj.core.draw_connection_BANG_.call(null,pair);
{
var G__15640 = seq__15636;
var G__15641 = chunk__15637;
var G__15642 = count__15638;
var G__15643 = (i__15639 + 1);
seq__15636 = G__15640;
chunk__15637 = G__15641;
count__15638 = G__15642;
i__15639 = G__15643;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__15636);if(temp__4092__auto__)
{var seq__15636__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__15636__$1))
{var c__3844__auto__ = cljs.core.chunk_first.call(null,seq__15636__$1);{
var G__15644 = cljs.core.chunk_rest.call(null,seq__15636__$1);
var G__15645 = c__3844__auto__;
var G__15646 = cljs.core.count.call(null,c__3844__auto__);
var G__15647 = 0;
seq__15636 = G__15644;
chunk__15637 = G__15645;
count__15638 = G__15646;
i__15639 = G__15647;
continue;
}
} else
{var pair = cljs.core.first.call(null,seq__15636__$1);boxcloj.core.update_force_BANG_.call(null,pair);
boxcloj.core.draw_connection_BANG_.call(null,pair);
{
var G__15648 = cljs.core.next.call(null,seq__15636__$1);
var G__15649 = null;
var G__15650 = 0;
var G__15651 = 0;
seq__15636 = G__15648;
chunk__15637 = G__15649;
count__15638 = G__15650;
i__15639 = G__15651;
continue;
}
}
} else
{return null;
}
}
break;
}
});
boxcloj.core.update_force_BANG_ = (function update_force_BANG_(pair){var vec__15661 = cljs.core.map.call(null,boxcloj.core.get_draw_args,pair);var vec__15662 = cljs.core.nth.call(null,vec__15661,0,null);var x1 = cljs.core.nth.call(null,vec__15662,0,null);var y1 = cljs.core.nth.call(null,vec__15662,1,null);var r1 = cljs.core.nth.call(null,vec__15662,2,null);var vec__15663 = cljs.core.nth.call(null,vec__15661,1,null);var x2 = cljs.core.nth.call(null,vec__15663,0,null);var y2 = cljs.core.nth.call(null,vec__15663,1,null);var r2 = cljs.core.nth.call(null,vec__15663,2,null);var vecs = cljs.core.PersistentVector.fromArray([boxcloj.core.b2vec.call(null,(x2 - x1),(y2 - y1)),boxcloj.core.b2vec.call(null,(x1 - x2),(y1 - y2))], true);var seq__15664 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.list,pair,vecs));var chunk__15665 = null;var count__15666 = 0;var i__15667 = 0;while(true){
if((i__15667 < count__15666))
{var vec__15668 = cljs.core._nth.call(null,chunk__15665,i__15667);var body = cljs.core.nth.call(null,vec__15668,0,null);var velocity = cljs.core.nth.call(null,vec__15668,1,null);body.ApplyForce(velocity,body.GetWorldCenter());
{
var G__15670 = seq__15664;
var G__15671 = chunk__15665;
var G__15672 = count__15666;
var G__15673 = (i__15667 + 1);
seq__15664 = G__15670;
chunk__15665 = G__15671;
count__15666 = G__15672;
i__15667 = G__15673;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__15664);if(temp__4092__auto__)
{var seq__15664__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__15664__$1))
{var c__3844__auto__ = cljs.core.chunk_first.call(null,seq__15664__$1);{
var G__15674 = cljs.core.chunk_rest.call(null,seq__15664__$1);
var G__15675 = c__3844__auto__;
var G__15676 = cljs.core.count.call(null,c__3844__auto__);
var G__15677 = 0;
seq__15664 = G__15674;
chunk__15665 = G__15675;
count__15666 = G__15676;
i__15667 = G__15677;
continue;
}
} else
{var vec__15669 = cljs.core.first.call(null,seq__15664__$1);var body = cljs.core.nth.call(null,vec__15669,0,null);var velocity = cljs.core.nth.call(null,vec__15669,1,null);body.ApplyForce(velocity,body.GetWorldCenter());
{
var G__15678 = cljs.core.next.call(null,seq__15664__$1);
var G__15679 = null;
var G__15680 = 0;
var G__15681 = 0;
seq__15664 = G__15678;
chunk__15665 = G__15679;
count__15666 = G__15680;
i__15667 = G__15681;
continue;
}
}
} else
{return null;
}
}
break;
}
});
boxcloj.core.get_draw_args = (function get_draw_args(node){var x = (node.GetPosition().x * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"width","width",1127031096)));var y = (node.GetPosition().y * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"height","height",4087841945)));var r = (node.GetFixtureList().GetShape().m_radius * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"width","width",1127031096)));return cljs.core.PersistentVector.fromArray([x,y,r], true);
});
boxcloj.core.get_nodes = (function get_nodes(world){var node = world.GetBodyList();var nodes = cljs.core.List.EMPTY;while(true){
if(cljs.core.not.call(null,node))
{return nodes;
} else
{if(cljs.core.truth_(node.GetFixtureList()))
{{
var G__15682 = node.GetNext();
var G__15683 = cljs.core.cons.call(null,node,nodes);
node = G__15682;
nodes = G__15683;
continue;
}
} else
{{
var G__15684 = node.GetNext();
var G__15685 = nodes;
node = G__15684;
nodes = G__15685;
continue;
}
}
}
break;
}
});
boxcloj.core.distance_to = (function distance_to(pt1,pt2){return boxcloj.maths.sqrt.call(null,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.map.call(null,boxcloj.maths.square,cljs.core.map.call(null,cljs.core._,pt1,pt2))));
});
boxcloj.core.click_in_circ_QMARK_ = (function click_in_circ_QMARK_(click_point,node){var vec__15687 = boxcloj.core.get_draw_args.call(null,node);var x = cljs.core.nth.call(null,vec__15687,0,null);var y = cljs.core.nth.call(null,vec__15687,1,null);var r = cljs.core.nth.call(null,vec__15687,2,null);return (boxcloj.core.distance_to.call(null,click_point,cljs.core.PersistentVector.fromArray([x,y], true)) < r);
});
boxcloj.core.get_circle_at = (function get_circle_at(pt){return cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.partial.call(null,boxcloj.core.click_in_circ_QMARK_,pt),boxcloj.core.get_nodes.call(null,boxcloj.core.world)));
});
boxcloj.core.canvas.addEventListener("mousedown",(function (e){var x = e.pageX;var y = e.pageY;var circle = boxcloj.core.get_circle_at.call(null,cljs.core.PersistentVector.fromArray([x,y], true));if(cljs.core.truth_(circle))
{if((cljs.core.count.call(null,cljs.core.deref.call(null,boxcloj.core.selected_circles)) < 2))
{return cljs.core.swap_BANG_.call(null,boxcloj.core.selected_circles,cljs.core.conj,circle);
} else
{if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,boxcloj.core.selected_circles)),2))
{cljs.core.swap_BANG_.call(null,boxcloj.core.pair_list,cljs.core.conj,cljs.core.deref.call(null,boxcloj.core.selected_circles));
return cljs.core.reset_BANG_.call(null,boxcloj.core.selected_circles,cljs.core.PersistentHashSet.EMPTY);
} else
{return null;
}
}
} else
{return null;
}
}));
boxcloj.core.update = (function update(){boxcloj.core.world.Step((1 / 60),10,10);
boxcloj.core.ctx.clearRect(0,0,1000,1000);
boxcloj.core.draw_all_BANG_.call(null,boxcloj.core.get_nodes.call(null,boxcloj.core.world));
boxcloj.core.world.ClearForces();
boxcloj.core.process_pairs_BANG_.call(null,cljs.core.deref.call(null,boxcloj.core.pair_list));
return requestAnimFrame(update);
});
boxcloj.core.init = (function init(){var dynamics = Box2D.Dynamics;var collision = Box2D.Collision;var shapes = collision.Shapes;var b2body_def = dynamics.b2BodyDef;var b2body = dynamics.b2Body;var b2fixture_def = dynamics.b2FixtureDef;var b2fixture = dynamics.b2Fixture;var b2world = dynamics.b2World;var b2circle = shapes.b2CircleShape;var b2poly = shapes.b2PolygonShape;var b2contact_listner = dynamics.b2ContactListener;var fix_def = (new b2fixture_def());var body_def = (new b2body_def());var position = body_def.position;boxcloj.core.world = (new b2world(boxcloj.core.b2vec.call(null,0,0),true));
fix_def.density = 1;
fix_def.friction = boxcloj.core.FRICTION;
fix_def.restitution = boxcloj.core.RESTITUTION;
var contact_listener_15688 = dynamics.b2ContactListener;var listener_15689 = (new contact_listener_15688());listener_15689.BeginContact = (function (c){return boxcloj.core.log.call(null,c);
});
boxcloj.core.world.SetContactListener(listener_15689);
body_def.type = b2body.b2_staticBody;
fix_def.shape = (new b2poly());
var wall_map_15690 = cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"x","x",1013904362),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1], true),new cljs.core.Keyword(null,"y","y",1013904363),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1,(boxcloj.core.SCALE / 2)], true),new cljs.core.Keyword(null,"width","width",1127031096),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2),1], true),new cljs.core.Keyword(null,"height","height",4087841945),cljs.core.PersistentVector.fromArray([1,(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2)], true)], true);var n_15691 = 0;while(true){
if((n_15691 < 4))
{position.x = cljs.core.nth.call(null,wall_map_15690.call(null,new cljs.core.Keyword(null,"x","x",1013904362)),n_15691);
position.y = cljs.core.nth.call(null,wall_map_15690.call(null,new cljs.core.Keyword(null,"y","y",1013904363)),n_15691);
fix_def.shape.SetAsBox(cljs.core.nth.call(null,wall_map_15690.call(null,new cljs.core.Keyword(null,"width","width",1127031096)),n_15691),cljs.core.nth.call(null,wall_map_15690.call(null,new cljs.core.Keyword(null,"height","height",4087841945)),n_15691));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__15692 = (n_15691 + 1);
n_15691 = G__15692;
continue;
}
} else
{}
break;
}
body_def.type = b2body.b2_dynamicBody;
var n = 0;while(true){
if((n < boxcloj.core.NUM_CIRCLES))
{fix_def.shape = (new b2circle(((boxcloj.core.MAX_SIZE * cljs.core.rand.call(null)) + 0.2)));
position.x = cljs.core.rand_int.call(null,boxcloj.core.SCALE);
position.y = cljs.core.rand_int.call(null,boxcloj.core.SCALE);
body_def.linearVelocity = boxcloj.core.b2vec.call(null,boxcloj.core.centered_rand_int.call(null,boxcloj.core.MAX_INIT_VEL),boxcloj.core.centered_rand_int.call(null,boxcloj.core.MAX_INIT_VEL));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__15693 = (n + 1);
n = G__15693;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.init.call(null);
requestAnimFrame(boxcloj.core.update);

//# sourceMappingURL=core.js.map